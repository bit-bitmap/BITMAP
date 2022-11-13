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
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        wx.showLoading({
            title: '加载中',
        })

        // 获取 open id
        wx.cloud.callFunction({
            name: "quickstartFunctions",
            data: { type: "getOpenId" }
        }).then(res => {
            app.global.openid = res.result.openid
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        // 更新个人信息
        this.setData({
            loginStatus: app.global.loginStatus,
            avatar: app.global.loginStatus
                ? "../../images/myset.png"
                : "../../images/my.png",
            name: app.global.loginStatus
                ? this.data.myInfo.name
                : "Please login",
            info: app.global.loginStatus
                ? this.data.myInfo.info
                : ""
        })

        // 更新个人文章列表
        let articles = []
        if (app.global.loginStatus) {
            // 获取个人文章 id 列表
            const ids = (
                await account.doc(app.global.id).get()
            ).data.articles
            // 显示文章数量不超过 3 个
            const length = (ids.length < 3) ? ids.length : 3
            // 根据 id 列表获取每篇文章的信息
            for (let i = 0; i < length; i++) {
                const article = (
                    await articlelist.doc(ids[i]).get()
                ).data
                articles.push(article)
            }
        }
        this.setData({
            articles: articles
        })
        wx.hideLoading()
    },


    /**
     * 点击登录按钮
     */
    async onLogin() {
        wx.showLoading({
            title: '加载中'
        })
        // 使用 openid 获取个人信息
        const res = (
            await account.where({
                _openid: app.global.openid
            }).get()
        )
        const data = res.data[0]
        // 判断是否注册
        if (data) {
            // 刷新用户信息
            app.global.id = data._id
            this.data.myInfo.info = data.info
            this.data.myInfo.name = data.name
            app.global.loginStatus = true
            this.onShow()
        } else {
            // 显示注册提示
            wx.showModal({
                title: "您尚未注册",
                content: "现在注册？"
            }).then(res => {
                if (res.confirm) {
                    wx.navigateTo({
                        url: 'profile/profile',
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },

    /**
     * 点击编辑按钮
     */
    onEdit() {
        wx.navigateTo({
            url: 'profile/profile?edit',
        })
    }
})
