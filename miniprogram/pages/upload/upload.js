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
      textNum: 0,
      titlewritten:"",
      textwritten: "",
      titleplaceholder:"好的标题让别人更容易关注你~",
      textplaceholder:"至少5个字嗷~",
      Imagespath:[],
      choosecatebig: 0,
      choosecatesmall:[],
      image:[],  //云数据库中articlelist存储的图片网址
      isNineImages:true,  //是否显示上传"+"按键
      isSubmit:false,  //article是否发表
      isAccess:false,  //article是否通过审核
      buttoncatedisp:"多种分类，任意选择",
      ImageNumMax:8
    },

//标题字数动态监测，实时获取标题文本
inputtitleNum: function (e) {
    var value=e.detail.value;
    var length=parseInt(value.length);
    upbasetitle = value;
    // console.log(value.length)
    this.setData({
        titleNum: length
    });

},
//实时获取内容文本
inputtext(e){
    var value=e.detail.value;
    var length=parseInt(value.length);
    // console.log(value.length)
    upbasetext = value;
    this.setData({
        textNum: length
    });
},

//点击保存
handleFormSave(e){
    let that = this
},
//点击发表
handleFormSubmit(e){
    let that=this
    if (that.data.textNum<5 || that.data.titleNum==0) {
        if (that.data.textNum<5 && that.data.titleNum==0) {
            wx.showToast({
                title: '未填写资讯标题且内容字数不足5个字',
                icon: 'none'
              })
        }
        if (that.data.textNum<5 && that.data.titleNum!=0) {
            wx.showToast({
                title: '内容字数不足5个字',
                icon: 'none'
              })
        }
        if (that.data.textNum>=5 && that.data.titleNum==0) {
            wx.showToast({
                title: '未填写资讯标题',
                icon: 'none'
              })
        }
    } else {
    //资讯内容存入数据库
      this.handleFormSubmitText_Images()
    }
},

//将图片上传并显示
handleUpImages(){
    let that=this
    wx.chooseImage({
      // 同时选中的图片的数量
      count: that.data.ImageNumMax-that.data.Imagespath.length,
      // 图片的格式  原图  压缩（手机）
      sizeType: ['original', 'compressed'],
      // 图片的来源  相册  照相机（手机）
      sourceType: ['album', 'camera'],
      success: (result) => {
        // console.log(result.tempFilePaths)
        let tempArr = that.data.Imagespath.concat(result.tempFilePaths)
        that.setData({
          //将图片显示于界面
          //将上传的图片地址赋值给Imagespath
          Imagespath: tempArr
        })
        if (that.data.Imagespath.length>=that.data.ImageNumMax) {
            that.setData({
                isNineImages:false
            })
        }
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
//删除图片
handleRemoveImages: function(e){
    let that=this
    //获取被点击的组件的索引
    const index = e.currentTarget.dataset;
    //获取data中的图片数组
    let arr= this.data.Imagespath;
    //删除元素
    arr.splice(index, 1);
    this.setData({
      Imagespath:arr
    })
    if (that.data.Imagespath.length<that.data.ImageNumMax) {
        that.setData({
            isNineImages:true
        })
    }
},
//将图片上传到云存储、云数据库
handleFormSubmitText_Images(){
  let that=this
  let address=app.global.openid
  //云存储图片
  wx.showLoading({
    title: '上传中',
  })
  let time=Date.parse(new Date())/1000
  console.log(that.data.Imagespath.length)
  for(let i=0;i<that.data.Imagespath.length;i++) {
    wx.cloud.uploadFile({
      //上传多张图片-时间戳，保证用户上传的图片不会重复
      cloudPath: address+'.png/'+time+i,  //上传图片到云存储的命名
      filePath: that.data.Imagespath[i], //图片的临时地址
    }).then(res => {
      // get resource ID
      wx.showToast({
        title: '上传成功',
      })
    //   console.log(res.fileID,i)
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
      image:upbase,
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

//选择分类
actionchoosecate: function() {
  var that = this;
  that.popup.changeRange(); //调用子组件内的函数
},

// 显示数据库中的图片
// basemessage(){
//   let that=this
//   db.collection("articlelist").get()
//   .then(res=>{
//     // console.log(res)
//     that.setData({
//       image:res.data
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
            console.log("openid",app.global.openid)
        }).catch(err => {
            console.log("openid",err)
        })

        //退出页面提醒
        wx.enableAlertBeforeUnload({ 
            message:"确定要退出页面吗？",//弹窗文案
            success:function(res){ //成功回调
               
            }, 
            fail:function(errMsg){ //失败回调
               
            },
            complete:function(){ //调用结束
            
            }
          }) 
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
      var that=this;
      that.popup = that.selectComponent("#choosecate"); //获取
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