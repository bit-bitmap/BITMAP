// pages/my/profile/profile.js
const app = getApp()
const db = wx.cloud.database()
const account = db.collection('account')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        form: {
            username: '',
            department: '',
            grade: '',
            phone: '',
            date: '',
            description: ''
        },
        textCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        wx.showLoading()
        // 若传入参数包含 edit，用户已登录，则获取已有资料
        if (options.edit && app.global.loginStatus) {
            // 获取个人信息并填入
            let data = (await account.doc(app.global.id).get()).data
            this.setData({
                form: {
                    username: data.name,
                    department: data.college,
                    grade: data.grade,
                    phone: data.phone,
                    birthday: data.birthday,
                    info: data.info
                },
                textCount: data.info.length
            })
        }
    },

    /**
     * 事件处理函数--监听输入变更
     */
    formInputChange(e) {
        // 根据输入框的 field 更新相应变量
        const { field } = e.currentTarget.dataset
        this.setData({
            [`form.${field}`]: e.detail.value
        })
        // 更新输入框计数器
        if (field == 'info') {
            this.setData({
                textCount: e.detail.value.length
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
    async onSave() {
        wx.showLoading()
        const form = this.data.form
        // 判断用户名是否为空
        if (form.username && form.username.length == 0) {
            await wx.hideLoading()
            await wx.showToast({
                title: '姓名不能为空',
                icon: 'error'
            })
            return
        }
        // 判断个人简介字数是否超限
        if (form.info && form.info.length > 100) {
            await wx.hideLoading()
            await wx.showToast({
                title: '个人简介太长啦',
                icon: 'error'
            })
            return
        }
        // 将上传数据包装为对象
        const data = {
            articles: [],
            birthday: form.birthday,
            college: form.department,
            grade: form.grade,
            info: form.info,
            phone: form.phone,
            name: form.username
        }
        if (app.global.loginStatus) {
            await account.doc(app.global.id).update({
                data
            })
        } else {
            await account.add({
                data
            })
        }
        wx.hideLoading()
        wx.navigateBack()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.hideLoading()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    }
})