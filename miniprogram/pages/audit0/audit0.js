// pages/audit0/audit0.js
const colorDark = 'rgba(255, 255, 255, .8)'
const colorLight = 'rgba(0, 0, 0, .9)'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isEndOfList: false,
        pagesize: 100,
        pagenum : 1,
        info: "",
        datalist:[
            
        ],
        guanfang:[
            
        ]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        wx.cloud.database().collection("articlelist").where({guanfang:true})
        .get()
        .then(res=>{
            console.log("获取成功l ",res)
            this.setData({
                guanfang:res.data
            })
        })
        .catch(res=>{
            console.log("获取失败",res)
        })
        wx.cloud.database().collection("articlelist")
        .where({flag:false})
        .limit(this.data.pagesize)
        .get()
        .then(res=>{
            console.log("获取成功l ",res)
            this.setData({
                datalist:res.data
            })
        })
    },
    
    //搜索函数
    search(){
        
    },

    // getData: function(num) {
    //     wx.cloud.database().collection("articlelist")
    //       .where({flag:true})
    //       .skip(num?num:this.data.list.length)
    //       .limit(this.data.limit)
    //       .get()
    //       .then(res => {
    //         this.setData({
    //           datalist: [...this.data.datalist, ...res.data], //合并数据
    //           isEndOfList: res.data.length < this.data.limit ? true : false //判断是否结束
    //         })
    //       })
    //   },


    /**
     * 跳转到详情页
     */
    goAudit(event){
        console.log("点击获取的数据",event.currentTarget.dataset.id)
        wx.navigateTo({
            url: '/pages/audit/audit?id='+event.currentTarget.dataset.id,
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
    onRefresh:function(){
      //导航条加载动画
      wx.showNavigationBarLoading()
      //loading 提示框
      wx.showLoading({
        title: '别刷了没有了',
      })
      console.log("下拉刷新啦");
      setTimeout(function () {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        //停止下拉刷新
        wx.stopPullDownRefresh();
      }, 2000)
    },
    
    topRefresh:function(
        pagenum=this.data.pagenum,
        pagesize=this.data.pagesize
    ) {
        wx.cloud.database().collection("articlelist")
        .where({flag:false})
        .limit(this.data.pagesize)
        .skip(pagenum*pagesize)
        .get()
        .then(res => {
            console.log("获取成功上 ",res)    
            this.setData({
                  datalist:res.data, 
                  pagenum: pagenum+1,
                  isEndOfList: res.data.length < this.data.pagesize ? true : false
                })
              })
    },

    bottomRefresh:function(
        pagenum=this.data.pagenum,
        pagesize=this.data.pagesize
    ) {
        wx.cloud.database().collection("articlelist")
        .where({flag:false})
        .limit(this.data.pagesize)
        .skip(pagenum*pagesize)
        .get()
        .then(res => {
                this.setData({
                  datalist: [...this.data.datalist, ...res.data], 
                  pagenum: pagenum+1,
                  isEndOfList: res.data.length < this.data.pagesize ? true : false 
                })
              })
    },

    onPullDownRefresh:function() {
        
        if (this.data.isEndOfList== true ) {
            this.onRefresh()
        } else {
            this.topRefresh()
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    
    onReachBottom() {
        if (this.data.isEndOfList== true ) {
            this.onRefresh()
        } else {
            this.bottomRefresh()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})