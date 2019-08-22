// pages/expressage/index/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [{
            id: 0,
            url: 'http://tcdn.ym-top.com/expressage/swiper1.png'
        }, {
            id: 1,
            url: 'http://tcdn.ym-top.com/expressage/swiper4.png',
        }, {
            id: 2,
            url: 'http://tcdn.ym-top.com/expressage/swiper2.png'
        }, {
            id: 3,
            url: 'http://tcdn.ym-top.com/expressage/swiper3.png'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        app.checkLogin('/pages/expressage/index/index', 0)
    },
    tempfun:function(){
        wx.showToast({
            title: '即将上线，敬请期待',
            icon: 'none'
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})