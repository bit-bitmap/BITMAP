// pages/content/content.js
let shoucang = false
let dianzan = false
let pinglun = ''
let comments = []
let like = 0
let ID = ''
let OpenID = ''
let commentsname = ''
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data:{
        titleNum: 0,
        titlewritten:"",
        detail:'',
        imgurl1:"../../images/shoucang-no.png",
        imgurl2:"../../images/like-no.png",
        comments:[],
        name:'',
        commentname:'',
        likes:0,
        // time:""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        ID = options.id
        console.log("接收的id",options.id)
        wx.cloud.database().collection("articlelist").doc(options.id)
        .get()
        .then(res=>{
            console.log("接收成功",res)
            like = res.data.like
            dianzan = res.data.dianzan
            shoucang = res.data.shoucang
            this.setData({
                likes:like,
                detail:res.data,
                imgurl2: dianzan ? "../../images/like-yes.png" : "../../images/like-no.png",
                imgurl1: shoucang ? "../../images/shoucang-yes.png" : "../../images/shoucang-no.png",
                comments: res.data.comments,
            })
        })
        .catch(res=>{
            console.log("接收失败",res)
        })
        wx.cloud.database().collection("account").where({
            articles:options.id
        })
        .get()
        .then(res=>{
            console.log("接收成功",res)
            this.setData({
                name:res.data[0].name
            })
        }).catch(res=>{
            console.log("接收失败",res)
        })
        /**
         * 获取登录ID
         */
        wx.cloud.callFunction({
            name: "quickstartFunctions",
            data: { type: "getOpenId" }
        }).then(res => {
            app.global.openid = res.result.openid
            console.log("获取openid成功", app.global.openid)
            OpenID = app.global.openid
        }).catch(err => {
            console.log("获取openid失败", err)
        })
    },

    /**
     * 修改点赞、收藏状态
     */
    clickMe(){
        this.setData({
            imgurl1: shoucang ? "../../images/shoucang-no.png" : "../../images/shoucang-yes.png"
        })
        shoucang = !shoucang

        wx.cloud.callFunction({
            name:"ChangeCondition",
            data:{
                action:"shoucang",
                id:ID,
                shoucang:shoucang
            }
        }).then(res=>{
            console.log("改变收藏状态成功",res)
        })
        .catch(res=>{
            console.log("改变收藏状态失败",res)
        })
    },
    favorMe(){
        console.log("获取点赞状态",like)
        this.setData({
            imgurl2: dianzan ? "../../images/like-no.png" : "../../images/like-yes.png"
        })
        dianzan = !dianzan
        if(dianzan==true){
            like++
        }else{
            like--
        }
        console.log("获取点赞状态",like)
        this.setData({
            likes:like
        })
        let likenum = this.data.likes
        wx.cloud.callFunction({
            name:"ChangeCondition",
            data:{
                action:"dianzan",
                id:ID,
                dianzan:dianzan,
                like:likenum
            }
        }).then(res=>{
            console.log("改变点赞状态成功",like)
        })
        .catch(res=>{
            console.log("改变点赞状态失败",res)
        })
    },
    /**
     * 评论字数动态监测/上传评论内容
     */
    getContent(e) {
        pinglun = e.detail.value
        console.log("获取内容",pinglun)
        var value=e.detail.value;
        var length=parseInt(value.length);
        this.setData({
            titleNum: length
        });
        /**
         * 获取用户名
         */
        wx.cloud.database().collection("account").where({
            _openid:app.global.openid
        }).get()
        .then(res=>{
            console.log("获取用户名成功",res.data[0].name)
            commentsname = res.data[0].name
            console.log("获取用户名成功",commentsname)
        }).catch(res=>{
            console.log("获取用户名失败",res)
        })
    },
    /**
     * 评论发布、显示评论者用户名
     */
    contentUp(){
        if(pinglun<1){
            wx.showToast({
                icon:"none",
                title: '评论不能为空',
            })
            return
        }
        let commentItem = {}
        commentItem.who = commentsname
        commentItem.content = pinglun
        let commentArr = this.data.comments
        commentArr.push(commentItem)
        console.log("添加后的评论",commentArr)
        wx.cloud.callFunction({
            name:"ChangeCondition",
            data:{
                id:ID,
                action:"pinglun",
                comments:commentArr
            }
        }).then(res=>{
            console.log("评论成功",res)
            this.setData({
                comments:commentArr,
                titlewritten:'',
                titleNum:0
            })
        }).catch(res=>{
            console.log("评论失败",res)
        })
    },

})