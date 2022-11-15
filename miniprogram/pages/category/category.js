// pages/category/category.js
const app= getApp()
Page({
    data: {
      cateItems: [],
      curNav: 1,
      curIndex: 0
    },
  //gotoo
  gotoo1(e){
      console.log(e)
      app.global.lujing=e.currentTarget.dataset.lujing

        wx.navigateTo({
          url: "/pages/category/info1/info1"
        })

    },


  data: {
    cateItems:[]
},
onLoad() {
    let id = "c03e4445636783da00a89451791c4eca",
    index = parseInt(0);
  // 把点击到的某一项，设为当前index  
  this.setData({
    curNav: id,
    curIndex: index
  })
    wx.cloud.database().collection("categorybig")
    .get()
    .then(res=>{
        console.log("获取成功",res)
        this.setData({
            cateItems:res.data
        })
    })
    .catch(res=>{
        console.log("获取失败",res)
    })
},
    //事件处理函数  
    switchRightTab: function (e) {
      // 获取item项的id，和数组的下标值  
      console.log(e)
      let id = e.target.dataset.id,
        index = parseInt(e.target.dataset.index);
      // 把点击到的某一项，设为当前index  
      this.setData({
        curNav: id,
        curIndex: index
      })
      console.log(this.data.cateItems[this.data.curIndex].children)
    }
  }) 