// pages/search/search.js
let db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showRecommend: true, // 是否显示推荐列表
        searchFocus: true, // 搜索框是否自动聚焦
        pagesize: 3,
        datalist: [],
        recommandlist: [] // 推荐列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const hasOptions = Object.keys(options).length > 0
        this.setData({
            // 若有传入参数，则不显示推荐列表
            showRecommend: !hasOptions,
            searchFocus: !hasOptions,
            options,
            hasOptions
        })
        console.log(options)
        // 给推荐列表拉取数据
        db.collection("articlelist")
            .where({ flag: true })
            .orderBy('like', 'desc')
            .limit(this.data.pagesize)
            .get()
            .then(res => {
                console.log("获取成功l ", res)
                this.setData({
                    recommandlist: res.data
                })
                // 页面加载后手动进行一次“搜索”
                this.searchinput({
                    detail: {
                        value: ''
                    }
                })
            })
    },

    // 搜索函数，根据输入的数据实时查询并展示
    searchinput(e) {
        const inputvalue = e.detail.value;
        console.log(inputvalue)
        // 仅在搜索词不为空时进行搜索
        // 有传入参数时也总是搜索，此时显示全部文章
        if (inputvalue || this.data.hasOptions) {
            // 将标题关键词和传入参数合并为一个对象
            const conditions = Object.assign(
                this.data.options,
                {
                    title: db.RegExp({
                        regexp: inputvalue,
                        options: 'i'
                    }),
                    flag: true
                })
            db.collection("articlelist")
                .where(conditions)
                .get()
                .then(res => {
                    console.log("获取到了", res)
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