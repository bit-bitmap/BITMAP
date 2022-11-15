App({
    /**
     * 小程序全局变量
     */
    global: {
        openid: "",
        id: "",
        loginStatus: false,
        lujing:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLaunch: function () {
        // 初始化云开发
        wx.cloud.init({
            env: "cloud1-3g52quh891d8cf4e"
        })
    },

})
