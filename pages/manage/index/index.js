// pages/manage/index/index.js
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
        if (app.globalData.userInfo == null){
            wx.showToast({
                title: '请先登录!',
                icon:'none'
            })
            setTimeout(function(){
                wx.navigateBack()
            },1000)
        }
    },
    /**
     * 快递服务鉴权
     */
    kdserve:function(){
        //获取缓存
        const serveid = wx.getStorageSync('serveid')
        if (serveid) {
            wx.navigateTo({
                url: '/pages/manage/expressage/expressage',
            })
        }else{
            app.topReq({
                loadType: 1,
                url: app.globalData.serviceSrc + 'manage/auth/expressage',
                method: 'POST',
                data: {
                    openid: app.globalData.userInfo.openid,
                    token: app.globalData.userInfo.token
                },
                success: function (res) {
                    wx.setStorage({ //缓存列表数据
                        key: 'serveid',
                        data: res.data.serveid
                    })
                    wx.navigateTo({
                        url: '/pages/manage/expressage/expressage',
                    })
                }
            })
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})