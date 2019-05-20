// pages/common/login/login.js
const app = getApp()
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

    onGetUserInfo: function (e) {
        if (e.detail.errMsg == 'getUserInfo:ok') {
            var userData = {
                rawData: e.detail.rawData,
                signature: e.detail.signature,
                iv: e.detail.iv
            }
            wx.login({
                success(res) {
                    app.topReq.post({
                        loadType: 1,
                        url: app.globalData.serviceSrc + 'common/login/login',
                        data: {
                            code: res.code,
                            userData: userData
                        },
                        success: function (res) {
                            e.detail.userInfo.token = res.data.token
                            getApp().globalData.userInfo = e.detail.userInfo
                            wx.setStorage({
                                key: 'userInfo',
                                data: e.detail.userInfo
                            })
                            wx.navigateBack()
                        }
                    })
                }
            })
        } else {
            wx.showToast({
                title: '您取消授权，登录失败！',
                icon: 'none'
            })
        }
    },
    getPhoneNumber: function (e) {
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
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