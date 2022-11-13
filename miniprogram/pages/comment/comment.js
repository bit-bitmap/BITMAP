// pages/comment/comment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        titleNum:0
    },
    inputNum: function (e) {
        var value=e.detail.value;
        var length=parseInt(value.length);
        this.setData({
            titleNum: length
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

  
})