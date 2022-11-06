// pages/content/content.js
let shoucang = false
let dianzan = false
Page({

    /**
     * 页面的初始数据
     */
    data:{
        imgurl1:"../../images/shoucang-no.png",
        imgurl2:"../../images/like-no.png",
        datalist:[],

        cateItems: [
            {
              cate_id: 1,
              cate_name: "学习",
              ishaveChild: true,
              children:
              [
                {
                  child_id: 1,
                  name: '选课',
                },
                {
                  child_id: 2,
                  name: '作业',
                },
                {
                  child_id: 3,
                  name: '考试',
                },
                {
                  child_id: 4,
                  name: '保研',
                },
                {
                    child_id: 5,
                    name: '考研',
                  },
                {
                  child_id: 6,
                  name: '留学',
                },
                {
                    child_id: 7,
                    name: '辅导/组队',
                  }
              ]
            },
            {
                cate_id: 2,
                cate_name: "生活",
                ishaveChild: true,
                children:
                [
                  {
                    child_id: 1,
                    name: '趣事',
                  },
                  {
                    child_id: 2,
                    name: '捞人/群',
                  },
                  {
                    child_id: 3,
                    name: '提醒/吐槽',
                  },
                  {
                    child_id: 4,
                    name: '表白/征婚',
                  },
                  {
                    child_id: 5,
                    name: '失物',
                  },
                  {
                    child_id: 6,
                    name: '推荐',
                  },
                  {
                    child_id: 7,
                    name: '假期',
                  }
                ]
              },
            {
              cate_id: 3,
              cate_name: "运动",
              ishaveChild: true,
              children:
              [
                {
                  child_id: 1,
                  name: '比赛',
                },
                {
                  child_id: 2,
                  name: '田径',
                },
                {
                  child_id: 3,
                  name: '球类',
                },
                {
                  child_id: 4,
                  name: '场地',
                },
                {
                    child_id: 5,
                    name: '健康',
                  },
                  {
                    child_id: 6,
                    name: '课程',
                  },
                  {
                    child_id: 7,
                    name: '其他',
                  }
              ]
            },
            {
              cate_id: 4,
              cate_name: "美食",
              ishaveChild: true,
              children:
              [
                {
                  child_id: 1,
                  name: '美食分享',
                },
                {
                  child_id: 2,
                  name: '外卖推荐',
                },
                {
                  child_id: 3,
                  name: '踩坑避雷',
                },
                {
                  child_id: 4,
                  name: '养生专区',
                }
              ]
            },
            {
                cate_id: 5,
                cate_name: "活动",
                ishaveChild: true,
                children:
                [
                  {
                    child_id: 1,
                    name: '志愿者服务',
                  },
                  {
                    child_id: 2,
                    name: '社团活动',
                  },
                  {
                    child_id: 3,
                    name: '假期出行',
                  },
                  {
                    child_id: 4,
                    name: '校园活动',
                  }
                ]
              }
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
    onLoad() {
        wx.cloud.database().collection('contentDetail')
        .get()
        .then(res =>{
            console.log("获取成功",res)
            this.setData({
                datalist:res.data
            })
        })
        .catch(res =>{
            console.log("获取失败",res)
        })
    },

})