// pages/content/content.js
let shoucang = false
let dianzan = false
Page({

    /**
     * 页面的初始数据
     */
    data:{
        detail:'',
        imgurl1:"../../images/shoucang-no.png",
        imgurl2:"../../images/like-no.png",
        Author:[
            {
                author_id:1,
                author_name:"作者A"
            },
            {
                author_id:2,
                author_name:"作者B"
            },
        ]

    },

    clickMe(){
        if(shoucang){
            this.setData({
                imgurl1:"../../images/shoucang-no.png"
            })
            shoucang=false
        }else{
            this.setData({
                imgurl1:"../../images/shoucang-yes.png"
            })
            shoucang=true
        }
    },

    favorMe(){
        if(dianzan){
            this.setData({
                imgurl2:"../../images/like-no.png"
            })
            dianzan=false
        }else{
            this.setData({
                imgurl2:"../../images/like-yes.png"
            })
            dianzan=true
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log("接收的id",options.id)
        wx.cloud.database().collection("articlelist").doc(options.id)
        .get()
        .then(res=>{
            console.log("接收成功",res)
            this.setData({
                detail:res.data
            })
        })
        .catch(res=>{
            console.log("接收失败",res)
        })
    },

})