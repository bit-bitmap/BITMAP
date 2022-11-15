// pages/upload/upload.js
const app = getApp()
var upbaseimages = []  //上传数据库的图片
var upbasetitle = ""  //标题
var upbasetext = ""  //内容
var upbasecate = ""
var upbasearticlesID = []
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

        studycate: [{ subid: "101xuanke", subname: "选课", checked: false }, { subid: "102zuoye", subname: "作业", checked: false }, { subid: "103kaoshi", subname: "考试", checked: false }, { subid: "104baoyan", subname: "保研", checked: false }, { subid: "105kaoyan", subname: "考研", checked: false }, { subid: "106liuxue", subname: "留学", checked: false }, { subid: "107fudao", subname: "辅导/组队", checked: false }],

        lifecate: [{ id: 1, subid: "201qushi", subname: "趣事", checked: false }, { id: 2, subid: "202laoren", subname: "捞人/群", checked: false }, { id: 3, subid: "203tixing", subname: "提醒", checked: false }, { id: 4, subid: "204biaobai", subname: "表白/征婚", checked: false }, { id: 5, subid: "205shiwu", subname: "失物", checked: false }, { id: 6, subid: "206tuijian", subname: "推荐", checked: false }, { id: 7, subid: "207jiaqi", subname: "假期", checked: false }],

        sportcate: [{ id: 1, subid: "301bisai", subname: "比赛", checked: false }, { id: 2, subid: "302tianjing", subname: "田径", checked: false }, { id: 3, subid: "303qiulei", subname: "球类", checked: false }, { id: 4, subid: "304changdi", subname: "场地", checked: false }, { id: 5, subid: "305jiankang", subname: "健康", checked: false }, { id: 6, subid: "306kecheng", subname: "课程", checked: false }, { id: 7, subid: "307qita", subname: "其他", checked: false }],

        foodcate: [{ id: 1, subid: "401meishi", subname: "美食分享", checked: false }, { id: 2, subid: "402waimai", subname: "外卖推荐", checked: false }, { id: 3, subid: "403caikeng", subname: "踩坑避雷", checked: false }, { id: 4, subid: "404yangsheng", subname: "养生专区", checked: false }],

        activitycate: [{ id: 1, subid: "501bisai", subname: "比赛", checked: false }, { id: 2, subid: "502shetuan", subname: "社团活动", checked: false }, { id: 3, subid: "503jiaqi", subname: "假期出行", checked: false }, { id: 4, subid: "504xiaoyuan", subname: "校园活动", checked: false }],

        image: [],  //云数据库中articlelist存储的图片网址
        isNineImages: true,  //是否显示上传"+"按键
        isSubmit: false,  //article是否发表
        isAccess: false,  //article是否通过审核
        buttoncatedisp: "多种分类，任意选择",
        ImageNumMax: 8,
        isUpImagesSuccess: false
    },

    //大类选择 单选
    handlecatechoose(e) {
        let catebig = e.detail.value
        this.setData({
            usercatebig: catebig
        })
        // console.log(catebig)
    },
    //小类选择 多选
    smallcateschoose(e) {
        let that = this
        let catebig = that.data.usercatebig
        if (catebig == 0) {
            upbasecate="101xuanke"
        }
        if (catebig == 1) {
            upbasecate="201qushi"
        }
        if (catebig == 2) {
            upbasecate="301bisai"
        }
        if (catebig == 3) {
            upbasecate="401meishi"
        }
        if (catebig == 4) {
            upbasecate="501bisai"
        }
    },

    //标题字数动态监测，实时获取标题文本
    inputtitleNum: function (e) {
        var value = e.detail.value;
        var length = parseInt(value.length);
        upbasetitle = value;
        // console.log(value.length)
        this.setData({
            titleNum: length
        });

    },
    //实时获取内容文本
    inputtext(e) {
        var value = e.detail.value;
        var length = parseInt(value.length);
        // console.log(value.length)
        upbasetext = value;
        this.setData({
            textNum: length
        });
    },

    //点击保存
    handleFormSave(e) {
        let that = this
    },
    //点击发表
    handleFormSubmit() {
        let that = this
        // if (app.global.loginStatus) {
        if (that.data.textNum < 5 || that.data.titleNum == 0) {
            if (that.data.textNum < 5 && that.data.titleNum == 0) {
                wx.showToast({
                    title: '未填写资讯标题且内容字数不足5个字',
                    icon: 'none'
                })
            }
            if (that.data.textNum < 5 && that.data.titleNum != 0) {
                wx.showToast({
                    title: '内容字数不足5个字',
                    icon: 'none'
                })
            }
            if (that.data.textNum >= 5 && that.data.titleNum == 0) {
                wx.showToast({
                    title: '未填写资讯标题',
                    icon: 'none'
                })
            }
        } else {
            //资讯图片存入云存储
            that.handleFormSubmitImages()
            setTimeout(() => {
                that.handleFormSubmitImages()
            }, 2000)
            // console.log("up", upbaseimages)
            //资讯内容、图片存入云数据库
            setTimeout(() => {
                that.upbaseImagesDB()
            }, 2000)
            that.setData({
                textNum:0,
                textwritten:"",
                titleNum:0,
                titlewritten:"",
                Imagespath: [],
                usercatebig: 5,
                image: [],  //云数据库中articlelist存储的图片网址
                isNineImages: true,  //是否显示上传"+"按键
                isSubmit: false,  //article是否发表
                isAccess: false,  //article是否通过审核
                buttoncatedisp: "多种分类，任意选择",
                ImageNumMax: 8,
                isUpImagesSuccess: false
            })
        }
        // } else {
        //     wx.showToast({
        //       title: '请登录后再编辑',
        //       icon:'none'
        //     })
        // }
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
                // console.log(result.tempFilePaths)
                let tempArr = that.data.Imagespath.concat(result.tempFilePaths)
                that.setData({
                    //将图片显示于界面
                    //将上传的图片地址赋值给Imagespath
                    Imagespath: tempArr
                })
                console.log("Imagespath", tempArr)
                if (that.data.Imagespath.length >= that.data.ImageNumMax) {
                    that.setData({
                        isNineImages: false
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
                isNineImages: true
            })
        }
    },
    //将图片上传到云存储
    async handleFormSubmitImages() {
        let that = this
        let address = app.global.openid
        //云存储图片
        wx.showLoading({
            title: '上传中',
        })
        let time = Date.parse(new Date()) / 1000
        console.log(that.data.Imagespath.length)
        for (let i = 0; i < that.data.Imagespath.length; i++) {
            wx.cloud.uploadFile({
                //上传多张图片-时间戳，保证用户上传的图片不会重复
                cloudPath: address + '.png/' + time + i,  //上传图片到云存储的命名
                filePath: that.data.Imagespath[i], //图片的临时地址
            }).then(res => {
                // get resource ID
                wx.showToast({
                    title: '上传成功',
                })
                that.setData({
                    isUpImagesSuccess: true
                })
                //   console.log(res.fileID,i)
                upbaseimages[i] = res.fileID
            }).catch(error => {
                // handle error
                console.log(error)
                wx.showToast({
                    title: '上传失败',
                    icon: 'error'
                })
            })
        }
        console.log("upbase的值", upbaseimages)
    },

    // 随机产生六位的字符串
randomWord() {undefined

    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    var nums = "";
    
    for (var i = 0; i < 6; i++) {undefined
    var id = parseInt(Math.random() * 61);
      nums += chars[id];
    }
    return nums;
  },
  
    //图片上传至云数据库
    async upbaseImagesDB() {
        console.log("upbase的值", upbaseimages)
        let that = this;
        var articleidget=that.randomWord()
         await db.collection("articlelist").add({
            data: {
                articleid: articleidget,
                image: upbaseimages,
                title: upbasetitle,
                detail: upbasetext,
                cate:  upbasecate,
                flag: that.data.isAccess,
                dianzan: false,
                like: 0,
                views: 0,
                shoucang: false,
                comments: []
            }
        })

        wx.showToast({
            title: '上传成功',
        })
        var userarticle = []
        console.log(articleidget)
        upbasearticlesID = articleidget
        userarticle = (await db.collection("account").where({
            _openid: app.global.openid
        }).get()).data.article
        console.log(userarticle)
        db.collection("account").where({
            _openid: app.global.openid
        })
        // .update({ article: userarticle.push(upbasearticlesID) })
        //     .then(res => {
        //         wx.showToast({
        //             title: '上传成功',
        //         })
        //         // upbasearticlesID = res.data
        //     })
        // }).catch(error => {
        //     // handle error
        //     console.log(error)
        // })

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
            wx.enableAlertBeforeUnload({
                message: "确定要退出页面吗？",//弹窗文案
                success: function (res) { //成功回调

                },
                fail: function (errMsg) { //失败回调

                },
                complete: function () { //调用结束

                }
            })
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