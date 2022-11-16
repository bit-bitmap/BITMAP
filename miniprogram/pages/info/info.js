// pages/audit0/audit0.js
const colorDark = 'rgba(255, 255, 255, .8)'
const colorLight = 'rgba(0, 0, 0, .9)'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isEndOfList: false,
        pagesize: 5,
        pagenum: 1,
        info: "",
        datalist: [

        ],
        guanfang: [

        ]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        wx.cloud.database().collection("articlelist").where({ guanfang: true })
            .get()
            .then(res => {
                console.log("获取成功l ", res)
                this.setData({
                    guanfang: res.data
                })
            })
            .catch(res => {
                console.log("获取失败", res)
            })
        wx.cloud.database().collection("articlelist")
            .where({ flag: true })
            .limit(this.data.pagesize)
            .get()
            .then(res => {
                console.log("获取成功l ", res)
                this.setData({
                    datalist: res.data
                })
            })
    },

    //搜索函数
    search() {

    },
    goContent(event) {
        console.log("点击获取的数据", event.currentTarget.dataset.id)
        wx.navigateTo({
            url: '/pages/content/content?id=' + event.currentTarget.dataset.id,
        })
    },

    /**
     * 跳转到详情页
     */

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

    topRefresh(
        pagenum = this.data.pagenum,
        pagesize = this.data.pagesize
    ) {
        wx.cloud.database().collection("articlelist")
            .where({ flag: true })
            .limit(this.data.pagesize)
            .skip(pagenum * pagesize)
            .get()
            .then(res => {
                console.log("获取成功上 ", res)
                this.setData({
                    datalist: res.data,
                    pagenum: pagenum + 1,
                    isEndOfList: res.data.length < this.data.pagesize ? true : false

                })
            })
    },

    async bottomRefresh(
        pagenum = this.data.pagenum,
        pagesize = this.data.pagesize
    ) {
        const res = await wx.cloud.database().collection("articlelist")
            .where({ flag: true })
            .limit(this.data.pagesize)
            .skip(pagenum * pagesize)
            .get()
        this.setData({
            datalist: [...this.data.datalist, ...res.data],
            pagenum: pagenum + 1,
            isEndOfList: res.data.length < this.data.pagesize ? true : false

        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        if (this.data.isEndOfList) {
            wx.showToast({
                title: '别刷了没有了',
                icon: 'error'
            })
        } else {
            this.topRefresh()
        }
        //停止下拉刷新
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (this.data.isEndOfList) {
            wx.showToast({
                title: '别刷了没有了',
                icon: 'error'
            })
        } else {
            this.bottomRefresh()
        }
        //停止下拉刷新
        wx.stopPullDownRefresh();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },



})

