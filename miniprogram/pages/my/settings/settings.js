// pages/my/pages/settings.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.setData({
            loginStatus: app.global.loginStatus
        })
    },

    /**
     * 点击登出按钮事件处理函数
     */
    onLogout() {
        app.global.loginStatus = false
        wx.navigateBack()
    }
})