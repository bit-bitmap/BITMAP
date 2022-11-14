// pages/upload/upload.js
const app = getApp()
let upbase=[]  //上传数据库的图片
let upbasetitle=""  //标题
let upbasetext=""  //内容
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
      choosecate: 0,
    //   image:[],  //云数据库中articlelist存储的图片网址
      isNineImages:true,  //是否显示上传"+"按键
      isSubmit:false,  //article是否发表
      isAccess:false  //article是否通过审核
    },

//标题字数动态监测，实时获取标题文本
inputtitleNum: function (e) {
    var value=e.detail.value;
    var length=parseInt(value.length);
    upbasetitle = value;
    this.setData({
        titleNum: length
    });
},
//实时获取内容文本
inputtext(e){
    var value=e.detail.value;
    upbasetext = value;
},

handleFormSubmit(e){
    db.collection("articlelist").add({
        data:{
          title: upbasetitle,
          detail: upbasetext
        }
      }).then(res=>{
        wx.showToast({
          title: '上传成功',
        })
      }).catch(error => {
        // handle error
        console.log(error)
      })
},

handleRemoveImages: function(e){
    //获取被点击的组件的索引
    const index = e.currentTarget.dataset;
    //获取data中的图片数组
    let arr= this.data.Imagespath;
    //删除元素
    arr.splice(index, 1);
    this.setData({
      Imagespath:arr
    })
},

//将图片上传并显示
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
      //   wx.showLoading({
      //     title: '上传中',
      //   })
      }
    })
  },
//预览图片 全屏显示
viewimage(e){
  let that=this
  //获取所点击图片序号
  let index=e.currentTarget.dataset.index
  let item=that.data.Imagespath[index]
  console.log(index)
  //显示所点击图片
  wx.previewImage({
    current: item,
    urls: that.data.Imagespath ,//需要预览图片的http链接列表
  })
},

//将图片上传到云存储、云数据库
handleFormSubmitImages(){
  let that=this
  //云存储图片
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
  //云数据库
  that.upbase()
},
//图片上传至云数据库
upbase(){
  console.log("upbase的值",upbase)
  db.collection("articlelist").add({
    data:{
      image:upbase
    }
  }).then(res=>{
    wx.showToast({
      title: '上传成功',
    })
  }).catch(error => {
    // handle error
    console.log(error)
  })
},

//显示数据库中的图片
// basemessage(){
//   let that=this
//   db.collection("baseimage_test").get()
//   .then(res=>{
//     // console.log(res)
//     that.setData({
//       src:res.data
//     })
//   })
// },

// 文本域的输入的事件
// handleTextInput(e) {
//   this.setData({
//     textwritten: e.detail.value
//   })
// },
// 提交按钮的点击
// handleFormSubmit() {
//   // 1 获取文本域的内容 图片数组
//   const { textwritten, Imagespath } = this.data;
//   // 2 合法性的验证
//   if (!textwritten.trim()) {
//     // 不合法
//     wx.showToast({
//       title: '输入不合法',
//       icon: 'none',
//       mask: true
//     });
//     return;
//   }

//   // 判断有没有需要上传的图片数组
//   if (chooseImgs.length != 0) {
//     chooseImgs.forEach((v, i) => {
//       wx.uploadFile({
//         // 图片要上传到哪里
//         url: 'https://images.ac.cn/Home/Index/UploadAction/',
//         // 被上传的文件的路径
//         filePath: v,
//         // 上传的文件的名称 后台来获取文件  file
//         name: "file",
//         // 顺带的文本信息
//         formData: {},
//         success: (result) => {
//           console.log(result);
//           let url = JSON.parse(result.data).url;
//           this.UpLoadImgs.push(url);

//           // 所有的图片都上传完毕了才触发  
//           if (i === chooseImgs.length - 1) {

//             wx.hideLoading();

//           }
//         }
//       });
//     })
//   }else{
//     wx.hideLoading();
      
//     console.log("只是提交了文本");
//     wx.navigateBack({
//       delta: 1
//     });
      
//   }
// },

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
    onLoad() {
        // 获取 open id
        wx.cloud.callFunction({
            name: "quickstartFunctions",
            data: { type: "getOpenId" }
        }).then(res => {
            app.global.openid = res.result.openid
        }).catch(err => {
            console.log("openid",err)
        })
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