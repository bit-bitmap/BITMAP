// pages/upload/upload.js
let upbase=[]
let db=wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      titleNum: 0,
      titlewritten:"",
      textwritten: "",
      titleplaceholder:"好的标题让别人更容易关注你~",
      textplaceholder:"至少5个字嗷~",
      Imagespath:[],
      src:[]
    },

//标题字数动态监测
inputNum: function (e) {
    var value=e.detail.value;
    var length=parseInt(value.length);
    this.setData({
        titleNum: length
    });
},

//点击上传图片
// handleChooseImages: function() {
//   wx.chooseImage({
//     // 同时选中的图片的数量
//     count: 9,
//     // 图片的格式  原图  压缩
//     sizeType: ['original', 'compressed'],
//     // 图片的来源  相册  照相机
//     sourceType: ['album', 'camera'],
//     success: (result) => {
//       this.setData({
//         // 图片数组 进行拼接 
//         Imagespath: [...this.data.Imagespath, ...result.tempFilePaths]
//       })
//     }
//   })
// },

// handleRemoveImages: function(e){
//     // 2 获取被点击的组件的索引
//     const { index } = e.currentTarget.dataset;
//     // 3 获取data中的图片数组
//     let { Imagespath } = this.data;
//     // 4 删除元素
//     Imagespath.splice(index, 1);
//     this.setData({
//       Imagespath
//     })
// },

//预览图片 全屏显示
viewimage(){
  let that=this
  wx.previewImage({
    urls: that.data.Imagespath ,//需要预览图片的http链接列表
  })
},
//将图片上传到云数据库
handleUpImagesCloud(){
  let that=this
  wx.showLoading({
    title: '上传中',
  })
  let time=Date.parse(new Date())/1000
  console.log(that.data.Imagespath.length)
  for(let i=0;i<that.data.Imagespath.length;i++) {
    wx.cloud.uploadFile({
      //上传多张图片-时间戳，保证用户上传的图片不会重复
      cloudPath: 'example.png/'+time+i,  //上传图片到云存储的命名
      filePath: that.data.Imagespath[i], //图片的临时地址
    }).then(res => {
      // get resource ID
      wx.showToast({
        title: '上传成功',
      })
      // console.log(res.fileID,i)
      upbase[i]=res.fileID
    }).catch(error => {
      // handle error
      console.log(error)
    })
  }
},

upbase(){
  console.log("upbase的值",upbase)
  db.collection("baseimage_test").add({
    data:{
      src:upbase
    }
  }).then(res=>{
    wx.showToast({
      title: '上传成功',
    })
  })
},
//显示数据库中的图片
basemessage(){
  let that=this
  db.collection("baseimage_test").get()
  .then(res=>{
    // console.log(res)
    that.setData({
      src:res.data
    })
  })
},

handleUpImages(){
  let that=this
  wx.chooseImage({
    // 同时选中的图片的数量
    count: 9,
    // 图片的格式  原图  压缩（手机）
    sizeType: ['original', 'compressed'],
    // 图片的来源  相册  照相机（手机）
    sourceType: ['album', 'camera'],
    success: (result) => {
      console.log(result.tempFilePaths)
      that.setData({
        //将图片显示于界面
        //将上传的图片地址赋值给Imagespath
        Imagespath: result.tempFilePaths
      })
    }
  })
},

// 文本域的输入的事件
handleTextInput(e) {
  this.setData({
    textwritten: e.detail.value
  })
},
// 提交按钮的点击
handleFormSubmit() {
  // 1 获取文本域的内容 图片数组
  const { textwritten, Imagespath } = this.data;
  // 2 合法性的验证
  if (!textwritten.trim()) {
    // 不合法
    wx.showToast({
      title: '输入不合法',
      icon: 'none',
      mask: true
    });
    return;
  }

  // 准备上传图片 到专门的图片服务器 
  // 上传文件的 api 不支持 多个文件同时上传  遍历数组 挨个上传 
  // 显示正在等待的图片
  wx.showLoading({
    title: "正在上传中",
    mask: true
  });

  // 判断有没有需要上传的图片数组
  if (chooseImgs.length != 0) {
    chooseImgs.forEach((v, i) => {
      wx.uploadFile({
        // 图片要上传到哪里
        url: 'https://images.ac.cn/Home/Index/UploadAction/',
        // 被上传的文件的路径
        filePath: v,
        // 上传的文件的名称 后台来获取文件  file
        name: "file",
        // 顺带的文本信息
        formData: {},
        success: (result) => {
          console.log(result);
          let url = JSON.parse(result.data).url;
          this.UpLoadImgs.push(url);

          // 所有的图片都上传完毕了才触发  
          if (i === chooseImgs.length - 1) {

            wx.hideLoading();


            console.log("把文本的内容和外网的图片数组 提交到后台中");
            //  提交都成功了
            // 重置页面
            this.setData({
              textwritten: "",
              chooseImgs: []
            })
            // 返回上一个页面
            wx.navigateBack({
              delta: 1
            });

          }
        }
      });
    })
  }else{
    wx.hideLoading();
      
    console.log("只是提交了文本");
    wx.navigateBack({
      delta: 1
    });
      
  }
},

 /**监听编辑器初始化完成时触发 */
//  onBindReadyEditor(e) {
//   console.log('onBindReadyEditor---------------->', e.detail)
//   e.detail.setContents('666')
// },

/**编辑器内容改变时触发 */
// onBindInputEditor(e) {
//   console.log("onBindInputEditor--------------------------->", e.detail)   
// },
 /**编辑器失去焦点 */
//  onBindBlurEditor(e) {
//   console.log("onBindBlurEditor--------------------------->", e.detail)
//  },

//选择分类
gotoCategory: function() {
  // wx.switchTab({
  //   url: '/pages/category/category',
  // })
  wx.navigateTo({
    url: 'choose_category/category',
  })
},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})