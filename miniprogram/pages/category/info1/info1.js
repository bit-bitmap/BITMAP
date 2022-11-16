// pages/info/info.js
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        lujing1: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            lujing1: app.global.lujing
        })

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.xianshixuanke();
    },

    /**
     * 渲染文章
     */
    xianshixuanke() {
        wx.cloud.database().collection("articlelist").where({
            cate: this.data.lujing1
        }).get()
            .then(res => {
                console.log(res)
                this.setData({
                    wenzhanglist: res.data
                })
            })
    },

    /**
     * 跳转到详情页
     */
    goContent(event) {
        console.log("点击获取的数据", event.currentTarget.dataset.id)
        wx.navigateTo({
            url: '/pages/content/content?id=' + event.currentTarget.dataset.id,
        })
    },

})