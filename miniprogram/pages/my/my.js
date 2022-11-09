// pages/my/my.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        iconList: [
            {
                icon: 'bellring-on',
                name: '关注'
            },
            {
                icon: 'contacts',
                name: '粉丝'
            },
            {
                icon: 'email',
                name: '通知'
            }
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
            ? "My Name" : "Please login"
        const info = app.global.loginStatus
            ? "My personal info" : ""

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
    onLogin() {
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
