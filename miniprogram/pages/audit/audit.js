// pages/audit/audit.js
let ID = ''
let OpenID = ''
let flag = false
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: '',
        name: '',
        likes: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        ID = options.id
        console.log("接收的id", options.id)
        wx.cloud.database().collection("articlelist").doc(options.id)
            .get()
            .then(res => {
                console.log("接收成功", res)
                this.setData({
                    detail: res.data,
                    flag: res.data.flag,
                })
            })
            .catch(res => {
                console.log("接收失败", res)
            })
        wx.cloud.database().collection("account").where({
            articles: options.id
        })
            .get()
            .then(res => {
                console.log("接收成功", res)
                this.setData({
                    name: res.data[0].name
                })
            }).catch(res => {
                console.log("接收失败", res)
            })
    },

    auditS() {
        flag = !flag
        wx.cloud.callFunction({
            name: "ChangeCondition",
            data: {
                action: "shenhe",
                id: ID,
                flag: flag
            }
        }).then(res => {
            console.log("改变审核状态成功", res)
            this.setData({
                flag: flag
            })
        })
            .catch(res => {
                console.log("改变审核状态失败", res)
            })
        wx.navigateTo({
            url: '/pages/audit0/audit0',
        })
    },

    auditF() {
        wx.navigateTo({
            url: '/pages/audit0/audit0',
        })
    },
})