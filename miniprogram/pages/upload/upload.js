// pages/upload/upload.js
const app = getApp()
var util = require('../../utils/util.js')
var upbasetime = ""  //点击发表的时间
var upbaseimages = []  //上传数据库的图片
var upbasetitle = ""  //上传数据库的标题
var upbasetext = ""  //上传数据库的资讯内容
var upbasecate = []  //上传数据库的分类数组，可以属于多个小类
var upbasearticlesID = []  //上传数据库的文章ID
let db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        titleNum: 0,
        textNum: 0,
        titlewritten: "",
        textwritten: "",
        titleplaceholder: "好的标题让别人更容易关注你~",
        textplaceholder: "至少5个字嗷~",
        Imagespath: [],
        usercatebig: 5,

        choosecate: [
            { id: 0, name: '学习', choose: false },
            { id: 1, name: '生活', choose: false },
            { id: 2, name: '运动', choose: false },
            { id: 3, name: '美食', choose: false },
            { id: 4, name: '活动', choose: false }
        ],

        studycate: [{ id: 1, subid: "101xuanke", subname: "选课", checked: false }, { id: 2, subid: "102zuoye", subname: "作业", checked: false }, { id: 3, subid: "103kaoshi", subname: "考试", checked: false }, { id: 4, subid: "104baoyan", subname: "保研", checked: false }, { id: 5, subid: "105kaoyan", subname: "考研", checked: false }, { id: 6, subid: "106liuxue", subname: "留学", checked: false }, { id: 7, subid: "107fudao", subname: "辅导/组队", checked: false }],

        lifecate: [{ id: 1, subid: "201qushi", subname: "趣事", checked: false }, { id: 2, subid: "202laoren", subname: "捞人/群", checked: false }, { id: 3, subid: "203tixing", subname: "提醒", checked: false }, { id: 4, subid: "204biaobai", subname: "表白/征婚", checked: false }, { id: 5, subid: "205shiwu", subname: "失物", checked: false }, { id: 6, subid: "206tuijian", subname: "推荐", checked: false }, { id: 7, subid: "207jiaqi", subname: "假期", checked: false }],

        sportcate: [{ id: 1, subid: "301bisai", subname: "比赛", checked: false }, { id: 2, subid: "302tianjing", subname: "田径", checked: false }, { id: 3, subid: "303qiulei", subname: "球类", checked: false }, { id: 4, subid: "304changdi", subname: "场地", checked: false }, { id: 5, subid: "305jiankang", subname: "健康", checked: false }, { id: 6, subid: "306kecheng", subname: "课程", checked: false }, { id: 7, subid: "307qita", subname: "其他", checked: false }],

        foodcate: [{ id: 1, subid: "401meishi", subname: "美食分享", checked: false }, { id: 2, subid: "402waimai", subname: "外卖推荐", checked: false }, { id: 3, subid: "403caikeng", subname: "踩坑避雷", checked: false }, { id: 4, subid: "404yangsheng", subname: "养生专区", checked: false }],

        activitycate: [{ id: 1, subid: "501bisai", subname: "比赛", checked: false }, { id: 2, subid: "502shetuan", subname: "社团活动", checked: false }, { id: 3, subid: "503jiaqi", subname: "假期出行", checked: false }, { id: 4, subid: "504xiaoyuan", subname: "校园活动", checked: false }],

        image: [],  //云数据库中articlelist存储的图片网址
        isEightImages: true,  //是否显示上传"+"按键
        isAccess: false,  //article是否通过审核
        isChoosecatebig: false,
        ImageNumMax: 8,
        isUpImagesSuccess: false,
    },

    //大类选择 单选
    handlecatechoose(e) {
        const catebig = e.detail.value
        this.setData({
            usercatebig: catebig,
            isChoosecatebig: false
        })
    },

    //小类选择 多选
    smallcateschoose(e) {
        console.log("分类选择", e.detail.value)
        upbasecate = e.detail.value
        if (upbasecate.length != 0) {
            this.setData({
                isChoosecatebig: true
            })
        } else {
            this.setData({
                isChoosecatebig: false
            })
        }
    },

    //标题字数动态监测，实时获取标题文本
    inputtitleNum(e) {
        const value = e.detail.value;
        const length = parseInt(value.length);
        upbasetitle = value;
        this.setData({
            titleNum: length
        });

    },
    //实时获取内容文本
    inputtext(e) {
        const value = e.detail.value;
        const length = parseInt(value.length);
        // console.log(value.length)
        upbasetext = value;
        this.setData({
            textNum: length
        });
    },

    //点击发表
    handleFormSubmit() {
        let that = this
        if (app.global.loginStatus) { //判断登录状态
            if (that.data.textNum < 5 || that.data.titleNum == 0) {
                if (that.data.textNum < 5 && that.data.titleNum == 0) {
                    if (that.data.isChoosecatebig) {
                        wx.showToast({
                            title: '未填写资讯标题且内容字数不足5个字',
                            icon: 'none'
                        })
                    } else {
                        wx.showToast({
                            title: '未填写资讯标题,内容字数不足5个字,且未选择分类',
                            icon: 'none'
                        })
                    }
                }
                if (that.data.textNum < 5 && that.data.titleNum != 0) {
                    if (that.data.isChoosecatebig) {
                        wx.showToast({
                            title: '内容字数不足5个字',
                            icon: 'none'
                        })
                    } else {
                        wx.showToast({
                            title: '内容字数不足5个字,且未选择分类',
                            icon: 'none'
                        })
                    }
                }
                if (that.data.textNum >= 5 && that.data.titleNum == 0) {
                    if (that.data.isChoosecatebig) {
                        wx.showToast({
                            title: '未填写资讯标题',
                            icon: 'none'
                        })
                    } else {
                        wx.showToast({
                            title: '未填写资讯标题,且未选择分类',
                            icon: 'none'
                        })
                    }
                }
            } else {
                upbasetime = util.formatTime(new Date())
                wx.showLoading({
                    title: '上传中',
                })
                //资讯图片存入云存储
                that.handleFormSubmitImages()
                setTimeout(() => {
                    that.handleFormSubmitImages()
                }, 2000)
                //资讯内容、图片存入云数据库
                setTimeout(() => {
                    that.upbaseDB()
                }, 2000)
                if (that.data.isUpImagesSuccess || (that.data.Imagespath.length == 0)) {
                    wx.showToast({
                        title: '上传成功，再写一篇吧',
                        icon: 'none'
                    })
                    //上传成功，上传页清空
                    that.setData({
                        choosecate: [
                            { id: 0, name: '学习', choose: false },
                            { id: 1, name: '生活', choose: false },
                            { id: 2, name: '运动', choose: false },
                            { id: 3, name: '美食', choose: false },
                            { id: 4, name: '活动', choose: false }
                        ],
                        textNum: 0,
                        textwritten: "",
                        titleNum: 0,
                        titlewritten: "",
                        Imagespath: [],
                        usercatebig: 5,
                        image: [],  //云数据库中articlelist存储的图片网址
                        isEightImages: true,  //是否显示上传"+"按键
                        isSubmit: false,  //article是否发表
                        isAccess: false,  //article是否通过审核
                        isUpImagesSuccess: false
                    })
                }
            }
        } else {
            wx.showToast({
                title: '请登录后再编辑资讯',
                icon: 'none',
                duration: 900
            })
        }
    },

    //将图片上传并显示
    async handleUpImages() {
        let that = this
        wx.chooseImage({
            // 同时选中的图片的数量
            count: that.data.ImageNumMax - that.data.Imagespath.length,
            // 图片的格式  原图  压缩（手机）
            sizeType: ['original', 'compressed'],
            // 图片的来源  相册  照相机（手机）
            sourceType: ['album', 'camera'],
            success: (result) => {
                let tempArr = that.data.Imagespath.concat(result.tempFilePaths)
                that.setData({
                    //将图片显示于界面
                    //将上传的图片地址赋值给Imagespath
                    Imagespath: tempArr
                })
                console.log("Imagespath", tempArr)
                if (that.data.Imagespath.length >= that.data.ImageNumMax) {
                    that.setData({
                        isEightImages: false
                    })
                }
            }
        })
    },
    //预览图片 全屏显示
    viewimage(e) {
        let that = this
        //获取所点击图片序号
        let index = e.currentTarget.dataset.index
        let item = that.data.Imagespath[index]
        console.log(index)
        //显示所点击图片
        wx.previewImage({
            current: item,
            urls: that.data.Imagespath,//需要预览图片的http链接列表
        })
    },
    //删除图片
    handleRemoveImages: function (e) {
        let that = this
        upbaseimages = []
        //获取被点击的组件的索引
        const index = e.currentTarget.dataset;
        //获取data中的图片数组
        let arr = this.data.Imagespath;
        //删除元素
        arr.splice(index, 1);
        this.setData({
            Imagespath: arr
        })
        console.log("ImagespathRemove", arr)
        if (that.data.Imagespath.length < that.data.ImageNumMax) {
            that.setData({
                isEightImages: true
            })
        }
    },
    //将图片上传到云存储
    async handleFormSubmitImages() {
        let that = this
        let sumuploadsucess = 0
        let address = app.global.openid
        //云存储图片
        let time = Date.parse(new Date()) / 1000
        console.log(that.data.Imagespath.length)
        for (let i = 0; i < that.data.Imagespath.length; i++) {
            wx.cloud.uploadFile({
                //上传多张图片-时间戳，保证用户上传的图片不会重复
                cloudPath: address + '.png/' + time + i,  //上传图片到云存储的命名
                filePath: that.data.Imagespath[i], //图片的临时地址
            }).then(res => {
                // get resource ID
                sumuploadsucess = sumuploadsucess + 1
                //   console.log(res.fileID,i)
                upbaseimages[i] = res.fileID
            }).catch(error => {
                // handle error
                console.log(error)
                wx.showToast({
                    title: '上传失败',
                    icon: 'error',
                    duration: 900
                })
            })
        }
        //判断所有图片是否均成功上传至云存储
        if (sumuploadsucess == that.data.Imagespath.length - 1) {
            that.setData({
                isUpImagesSuccess: true
            })
        } console.log("upbase的值", upbaseimages)
    },

    //资讯上传至云数据库文章列表，添加文章ID至对应用户列表
    async upbaseDB() {
        console.log("upbase的值", upbaseimages)
        let that = this;
        //文章列表
        console.log("time", upbasetime)
        const articleidget = (await db.collection("articlelist").add({
            data: {
                time: upbasetime,
                image: upbaseimages,
                title: upbasetitle,
                detail: upbasetext,
                cate: upbasecate,
                flag: that.data.isAccess,
                dianzan: false,
                like: 0,
                views: 0,
                shoucang: false,
                comments: []
            }
        }))._id
        upbasearticlesID = articleidget
        //用户列表
        const userarticle = (await db.collection("account").doc(app.global.id).get()).data.articles
        console.log(userarticle)
        userarticle.push(upbasearticlesID)
        db.collection("account").doc(app.global.id).update({
            data: {
                articles: userarticle
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        // 获取 open id
        wx.cloud.callFunction({
            name: "quickstartFunctions",
            data: { type: "getOpenId" }
        }).then(res => {
            app.global.openid = res.result.openid
            console.log("openid", app.global.openid)
        }).catch(err => {
            console.log("openid", err)
        })

        //退出页面提醒
        // wx.enableAlertBeforeUnload({
        //     message: "确定要退出页面吗？",//弹窗文案
        //     success: function (res) { //成功回调
        //     },
        //     fail: function (errMsg) { //失败回调
        //     },
        //     complete: function () { //调用结束
        //     }
        // })
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