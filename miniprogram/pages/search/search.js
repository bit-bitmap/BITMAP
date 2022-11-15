// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showRecommend: true, // 是否显示推荐列表
        pagesize: 3,
        datalist: [],
        recommandlist: [] // 推荐列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            // 若有传入参数，则不显示推荐列表
            showRecommend: Object.keys(options).length == 0,
            options
        })
        console.log(options)
        // 给推荐列表拉取数据
        wx.cloud.database().collection("articlelist")
            .where({ flag: true })
            .orderBy('like', 'desc')
            .limit(this.data.pagesize)
            .get()
            .then(res => {
                console.log("获取成功l ", res)
                this.setData({
                    recommandlist: res.data
                })
            })
    },

    // 搜索函数，根据输入的数据实时查询并展示
    searchinput(e) {
        const inputvalue = e.detail.value;
        console.log(inputvalue)
        if (inputvalue) {
            wx.cloud.database().collection("articlelist")
                .where({
                    title: wx.cloud.database().RegExp({
                        regexp: inputvalue,
                        options: 'i'
                    }),
                    flag: true,
                    _openid: this.data.options._openid
                })
                .get()
                .then(res => {
                    console.log("获取到了", res, this.data.options._openid)
                    this.setData({
                        datalist: res.data
                    })
                })
        } else {
            this.setData({
                datalist: []
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    // 跳转到详情页函数
    goContent(event) {
        console.log("点击获取的数据", event.currentTarget.dataset.id)
        wx.navigateTo({
            url: '../content/content?id=' + event.currentTarget.dataset.id,
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