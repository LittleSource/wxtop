// pages/common/getphone/getphone.js
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isTabBar: false,
        url: '',
        type: 1,//0是老生 1是新生
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },
    onGetPhoneNumber: function (e) {
        if (e.detail.errMsg != 'getPhoneNumber:ok') {
            return;
        }
        app.topReq({
            loadType: 1,
            url: app.globalData.serviceSrc + 'common/login/getPhoneNumber',
            method: 'POST',
            data: {
                openid:app.globalData.userInfo.openid,
                type:_self.data.type,
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
            },
            success: function (res) {
                getApp().globalData.userInfo.phone = res.data.phone
                wx.showToast({
                    title: '注册成功'
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
                }, 1000)
            }
        })
    },
    isNew() {
        this.setData({
            type: 1
        })
    }, 
    isOld() {
        this.setData({
            type: 0
        })
    }
})