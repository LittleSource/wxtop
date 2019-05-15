// pages/common/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    bindGetUserInfo: function (e) {
        if (e.detail.errMsg == 'getUserInfo:ok') {
            //请求后端
            console.log(e.detail.rawData)
            console.log(e.detail.signature)
            console.log(e.detail.iv)
            
            getApp().globalData.userInfo = e.detail.userInfo
            wx.setStorage({
                key: 'userInfo',
                data: e.detail.userInfo
            })
            wx.navigateBack()
        } else {
            wx.showToast({
                title: '您取消授权，登录失败！',
                icon: 'none'
            })
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})