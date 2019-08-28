// pages/manage/index/index.js
const app = getApp()
var _self = null
Page({
    /**
     * 页面的初始数据
     */
    data: {
        balance:'0.00',//余额
        today:'0.00',//今日收入
        todayOrder:0,//今日订单
        yesterday:'0.00'//昨日收入
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        _self = this
        //合作用户鉴权
        const isServe = wx.getStorageSync('isServe')//获取缓存
        if (isServe) {
            this.getMoneyCount()
        } else {
            app.topReq({
                loadType: 1,
                url: app.globalData.serviceSrc + 'manage/common/auth',
                method: 'POST',
                data: {
                    token: app.globalData.userInfo.token
                },
                success: function(res) {
                    if (res.data.serve_type) {
                        wx.setStorage({ //缓存
                            key: 'isServe',
                            data: true
                        })
                        _self.getMoneyCount()
                    }else{
                        wx.showToast({
                            title: '您还不是合作用户哦',
                            icon:'none',
                        })
                        setTimeout(function(){
                            wx.redirectTo({
                                url: '/pages/common/consociation/consociation'
                            })
                        },1500)
                    }
                }
            })
        }
    },
    getMoneyCount: function() {
        app.topReq({
            loadType: 1,
            url: app.globalData.serviceSrc + 'manage/common/moneyCount',
            method: 'POST',
            data: {
                token: app.globalData.userInfo.token
            },
            success: function (res) {
                _self.setData({
                    balance: res.data.balance,
                    today: res.data.today,
                    todayOrder: res.data.todayOrder,
                    yesterday: res.data.yesterday
                })
            }
        })
    },
    /**
     * 超市服务鉴权
     */
    marketSever:function(){
        wx.showToast({
            title: '请前往TOP校园商家版APP管理店铺',
            icon: 'none',
        })
        // wx.navigateTo({
        //     url: '/pages/manage/market/index/index',
        // })
    },
    /**
     * 快递服务鉴权
     */
    kdserve: function() {
        //获取缓存
        const serveid = wx.getStorageSync('serveid')
        if (serveid) {
            wx.navigateTo({
                url: '/pages/manage/expressage/expressage',
            })
        } else {
            app.topReq({
                loadType: 1,
                url: app.globalData.serviceSrc + 'manage/expressage/getServeId',
                method: 'POST',
                data: {
                    token: app.globalData.userInfo.token
                },
                success: function(res) {
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
    onShareAppMessage: function() {

    }
})