// pages/my/my.js
const app = getApp()
const db = wx.cloud.database()
const account = db.collection("account")
import utils from "../../utils.js"
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
        iconList: [
            { icon: 'bellring-on', name: '关注' },
            { icon: 'contacts', name: '粉丝' },
            { icon: 'email', name: '通知' }
        ],
        contactList: [
            {
                avatar: "../../images/收藏.png",
                name: '联系人1',
                message: '您吃了吗您内？',
                time: 1111111111,
                timeString: ''
            },
            {
                avatar: "../../images/categoryset.png",
                name: '联系人2',
                message: 'Hello World!',
                time: 111111111,
                timeString: ''
            },
            {
                avatar: "../../images/myset.png",
                name: '联系人3',
                message: 'O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo',
                time: 11111111,
                timeString: ''
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
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

        // Initialize contact list
        for (let i = 0; i < this.data.contactList.length; i++) {
            let date = new Date(this.data.contactList[i].time * 1000)
            this.setData({
                ["contactList[" + i + "].timeString"]: date.toDateString()
            })
        }
    },


    /**
     * 点击登录按钮
     */
    async onLogin() {
        // 获取 openid
        let res = await account.where({ _openid: app.global.openid }).get()
        let id = res.data[0]._id
        // 获取 id
        res = await account.doc(id).get()
        console.log(res)
        this.data.myInfo.info = res.data.info
        this.data.myInfo.name = res.data.name
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
