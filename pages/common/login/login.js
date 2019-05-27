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
    onLoad: function(options) {

    },
    /**
     * 登录按钮点击事件
     */
    onGetUserInfo: function(e) {
        if (e.detail.errMsg == 'getUserInfo:ok') {
            var userData = {
                rawData: e.detail.rawData,
                signature: e.detail.signature,
                iv: e.detail.iv
            }
            wx.login({
                success(res) {
                    app.topReq({
                        loadType: 1,
                        url: app.globalData.serviceSrc + 'common/login/login',
                        method: 'POST',
                        data: {
                            code: res.code,
                            userData: userData
                        },
                        success: function(res) {
                            e.detail.userInfo.token = res.data.token
                            e.detail.userInfo.openid = res.data.openid
                            getApp().globalData.userInfo = e.detail.userInfo
                            wx.setStorage({
                                key: 'userInfo',
                                data: e.detail.userInfo
                            })
                            wx.showToast({
                                title: '登录成功'
                            })
                            setTimeout(function() {
                                wx.navigateBack()
                            }, 800)
                        }
                    })
                },
                fail(e) {
                    wx.showToast({
                        title: '登录失败:' + e.errMsg
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
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})