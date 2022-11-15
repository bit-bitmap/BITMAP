// pages/my/my.js
const app = getApp()
const db = wx.cloud.database()
const account = db.collection('account')
const articlelist = db.collection('articlelist')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        myInfo: {
            avatar: '',
            name: '',
            info: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        wx.showLoading()
        // 获取 open id
        const result = (await wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'getOpenId'
            }
        })).result
        app.global.openid = result.openid
        wx.hideLoading()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
        // 更新个人信息
        this.setData({
            loginStatus: app.global.loginStatus,
            avatar: app.global.loginStatus
                ? '../../images/myset.png'
                : '../../images/my.png',
            name: app.global.loginStatus
                ? this.data.myInfo.name
                : 'Please login',
            info: app.global.loginStatus
                ? this.data.myInfo.info
                : '',
            _openid: app.global.openid
        })
        if (!app.global.loginStatus)
            this.setData({
                articles: []
            })
    },


    /**
     * 点击登录按钮
     */
    async onLogin() {
        wx.showLoading()
        // 使用 openid 获取个人信息
        const data = (
            await account.where({
                _openid: app.global.openid
            }).get()
        ).data[0]
        // 判断是否注册
        if (data) {
            // 刷新用户信息
            app.global.id = data._id
            this.data.myInfo.info = data.info
            this.data.myInfo.name = data.name
            app.global.loginStatus = true
            await this.onShow()
            await this.refreshArticles()
        } else {
            // 显示注册提示
            wx.showModal({
                title: '您尚未注册',
                content: '现在注册？'
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
        wx.hideLoading()
    },

    /**
     * 点击编辑按钮
     */
    onEdit() {
        wx.navigateTo({
            url: 'profile/profile?edit',
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
    */
    async onPullDownRefresh() {
        if (app.global.loginStatus) {
            await this.onLogin()
        }
        wx.stopPullDownRefresh()
    },

    async refreshArticles() {
        // 更新个人文章列表
        let articles = []
        if (app.global.loginStatus) {
            // 获取个人文章 id 列表
            const ids = (
                await account.doc(app.global.id).get()
            ).data.articles
            if (ids) {
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
        }
        this.setData({
            articles: articles
        })
    }
})
