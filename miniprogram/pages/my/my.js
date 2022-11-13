// pages/my/my.js
const app = getApp()
const db = wx.cloud.database()
const account = db.collection("account")
const articlelist = db.collection("articlelist")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        myInfo: {
            avatar: "",
            name: "",
            info: ""
        },
        articles: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        // Initialize info panel
        const avatar = app.global.loginStatus
            ? "../../images/myset.png" : "../../images/my.png"
        const name = app.global.loginStatus
            ? this.data.myInfo.name : "Please login"
        const info = app.global.loginStatus
            ? this.data.myInfo.info : ""

        this.setData({
            loginStatus: app.global.loginStatus,
            avatar: avatar,
            name: name,
            info: info
        })

        // 更新个人文章列表
        if (app.global.loginStatus) {
            // 获取个人文章 id
            const ids = (await account.doc(app.global.id).get()).data.articles
            // 显示文章数量不超过 3 个
            const length = (ids.length < 3) ? ids.length : 3
            // 获取每篇文章的信息
            let articles = []
            for (let i = 0; i < length; i++) {
                let article = (await articlelist.doc(ids[i]).get()).data
                articles.push(article)
            }
            this.setData({ articles: articles })
        }

    },


    /**
     * 点击登录按钮
     */
    async onLogin() {
        // 使用 openid 获取个人信息
        let data = (
            await account.where({
                _openid: app.global.openid
            }).get()
        ).data[0]
        app.global.id = data._id
        this.data.myInfo.info = data.info
        this.data.myInfo.name = data.name
        app.global.loginStatus = true
        // Refresh page with login status
        this.onShow()
    },

    /**
     * 点击编辑按钮
     */
    onEdit() {
        wx.navigateTo({
            url: 'profile/profile',
        })
    }
})
