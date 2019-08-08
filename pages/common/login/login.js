// pages/common/login/login.js
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isTabBar: false,
        url: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        _self = this
        if (options.url) {
            this.setData({
                url: options.url
            })
        }
        if (options.isbar && parseInt(options.isbar)) {
            this.setData({
                isTabBar: true
            })
        }
    },
    /**
     * 登录按钮点击事件
     */
    onGetUserInfo: function(e) {
        if (e.detail.errMsg == 'getUserInfo:ok') {
            wx.login({
                success(res) {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: function (userData) {
                            app.topReq({
                                loadType: 1,
                                url: app.globalData.serviceSrc + 'common/login/login',
                                method: 'POST',
                                data: {
                                    code: res.code,
                                    userData: userData
                                },
                                success: function (res) {
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
                                    setTimeout(function () {
                                        if (_self.data.isbar) {
                                            wx.switchTab({
                                                url: _self.data.url
                                            })
                                        } else {
                                            wx.reLaunch({
                                                url: _self.data.url
                                            })
                                        }
                                    }, 2000)
                                }
                            })
                        }
                    });
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
    }
})