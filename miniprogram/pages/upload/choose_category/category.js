// pages/category/category.js
Page({
    data: {
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
              image: "./搜索.png"
            },
            {
              child_id: 2,
              name: '作业',
              image: "./数学.png"
            },
            {
              child_id: 3,
              name: '考试',
              image: "./划重点.png"
            },
            {
              child_id: 4,
              name: '保研',
              image: "./趋势.png"
            },
            {
                child_id: 5,
                name: '考研',
                image: "./增长.png"
              },
            {
              child_id: 6,
              name: '留学',
              image: "./体检.png"
            },
            {
                child_id: 7,
                name: '辅导/组队',
                image: "./指导.png"
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
                image: "./拨浪鼓.png"
              },
              {
                child_id: 2,
                name: '捞人/群',
                image: "./添加好友.png"
              },
              {
                child_id: 3,
                name: '提醒/吐槽',
                image: "./通知.png"
              },
              {
                child_id: 4,
                name: '表白/征婚',
                image: "./心心相印.png"
              },
              {
                child_id: 5,
                name: '失物',
                image: "./提醒.png"
              },
              {
                child_id: 6,
                name: '推荐',
                image: "./点赞.png"
              },
              {
                child_id: 7,
                name: '假期',
                image: "./干杯.png"
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
              image: "./奖杯.png"
            },
            {
              child_id: 2,
              name: '田径',
              image: "./运动.png"
            },
            {
              child_id: 3,
              name: '球类',
              image: "./篮球.png"
            },
            {
              child_id: 4,
              name: '场地',
              image: "./场地.png"
            },
            {
                child_id: 5,
                name: '健康',
                image: "./运动健康.png"
              },
              {
                child_id: 6,
                name: '课程',
                image: "./03_游泳.png"
              },
              {
                child_id: 7,
                name: '其他',
                image: "./其他.png"
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
              image: "./鸡腿.png"
            },
            {
              child_id: 2,
              name: '外卖推荐',
              image: "./汉堡.png"
            },
            {
              child_id: 3,
              name: '踩坑避雷',
              image: "./差评.png"
            },
            {
              child_id: 4,
              name: '养生专区',
              image: "./养生.png"
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
                image: "./志愿者活动.png"
              },
              {
                child_id: 2,
                name: '社团活动',
                image: "./社团活动.png"
              },
              {
                child_id: 3,
                name: '假期出行',
                image: "./22-旅行.png"
              },
              {
                child_id: 4,
                name: '校园活动',
                image: "./微活动.png"
              }
             
            ]
          }
      ],
      curNav: 1,
      curIndex: 0
    },
//   //gotoo
//   gotoo(){
//      wx.navigateTo({
//        url: '/pages/info/info',
      
//      })
//   },
    //事件处理函数  
    switchRightTab: function (e) {
      // 获取item项的id，和数组的下标值  
      let id = e.target.dataset.id,
        index = parseInt(e.target.dataset.index);
      // 把点击到的某一项，设为当前index  
      this.setData({
        curNav: id,
        curIndex: index
      })
    }
  }) 