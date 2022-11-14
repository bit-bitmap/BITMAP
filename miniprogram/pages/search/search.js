// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pagesize:3,
        datalist:[

        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       
    },

    searchinput:function(e){
        console.log(e.detail)
        var inputvalue = e.detail.value;
        console.log(inputvalue)
        if (inputvalue) {
            wx.cloud.database().collection("articlelist")
            .where({
                title:wx.cloud.database().RegExp({
                    regexp: inputvalue,
                    options:'i'
                }),
                flag:true
            })
            .get()
            .then(res => {
                console.log("获取到了",res)
                this.setData({
                    datalist:res.data
                })
            })
        } else {
            this.setData({
                datalist:[]
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    goContent(event){
        console.log("点击获取的数据",event.currentTarget.dataset.id)
        wx.navigateTo({
            url: '/pages/content/content?id='+event.currentTarget.dataset.id,
          })
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