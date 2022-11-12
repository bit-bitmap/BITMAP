// pages/my/profile/profile.js
const app = getApp()
const db = wx.cloud.database()
const account = db.collection("account")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        form: {
            username: "",
            department: "",
            phone: "",
            date: "",
            description: ""
        },
        textCounter: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        // let res = await account.doc(app.global.id).get()

    },

    /**
     * 事件处理函数--监听输入变更
     */
    formInputChange(e) {
        // 根据输入框的 field 更新相应变量
        const { field } = e.currentTarget.dataset
        this.setData({
            ["form.${field}"]: e.detail.value
        })
        // 更新输入框计数器
        if (field == "description") {
            this.setData({
                textCounter: e.detail.value.length
            })
        }
    },

    /**
     * 取消按钮事件处理函数
     */
    onCancel() {
        wx.navigateBack()
    },

    /**
     * 保存按钮事件处理函数
     */
    onSave() {
        // todo：上传信息
        wx.navigateBack()
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