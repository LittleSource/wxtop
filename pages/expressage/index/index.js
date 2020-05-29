// pages/expressage/index/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [{
            id: 0,
            url: 'https://cdn.ymkj8.com/topschool/expressage/swiper1.png'
        }, {
            id: 1,
            url: 'https://cdn.ymkj8.com/topschool/expressage/swiper4.png',
        }, {
            id: 2,
            url: 'https://cdn.ymkj8.com/topschool/expressage/swiper2.png'
        }, {
            id: 3,
            url: 'https://cdn.ymkj8.com/topschool/expressage/swiper3.png'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (app.globalData.userInfo == null) {
            wx.showToast({
                title: '您还未登录哦',
                icon: 'none'
            })
            setTimeout(function () {
                wx.navigateTo({
                    url: '/pages/common/login/login?url=/pages/expressage/index/index'
                })
            }, 1500)
        }
    },

    tempfun:function(){
        wx.showToast({
            title: '即将上线，敬请期待',
            icon: 'none'
        })
    },

    inquireorder:function(){
        wx.navigateTo({
            url: '/pages/expressage/inquireorder/inquireorder',
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})