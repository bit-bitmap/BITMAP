// pages/my/my.js
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
        this.setData({ avatar: "../../images/myset.png" })
        for (var i = 0; i < this.data.contactList.length; i++) {
            var date = new Date(this.data.contactList[i].time * 1000)
            this.setData({
                ["contactList[" + i + "].timeString"]: date.toDateString()
            })
        }
    },
    onEdit() {
        this.setData({ dialogShow: true })
        this.setData({ buttons: [{ text: '取消' }, { text: '确定' }] })
    },
    tapDialogButton() {
        this.setData({ dialogShow: false })
    },

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

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
