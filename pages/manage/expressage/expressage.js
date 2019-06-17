// pages/manage/expressage/expressage.js
var topDate = require("../../../utils/date.js"); //引入封装date.js
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList: [],
        currentPage: 1,
        lastPage: 2,
        loadingShow: false,
        loadingStyle: ['bg-gray load-icon loading', 'bg-gray over', , 'bg-red erro'],
        loadingIndex: -1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _self = this
        //获取缓存
        const serveid = wx.getStorageSync('serveid')
        if (serveid) {
            wx.startPullDownRefresh()
        }else{
            wx.showToast({
                title: '您无权限进入此页!',
                icon:'none'
            })
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        app.topReq({
            loadType: 2,
            url: app.globalData.serviceSrc + 'manage/expressage/selectorder',
            method: 'POST',
            data: {
                token: app.globalData.userInfo.token,
                page: 1
            },
            success: function (res) {
                for (let i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].order_data = JSON.parse(res.data.data[i].order_data);
                    res.data.data[i].create_time = topDate.fromTimer(res.data.data[i].create_time);
                }
                //如果只有一页
                if (res.data.last_page == 1) {
                    _self.setData({
                        loadingShow: true,
                        loadingIndex: 1
                    })
                }
                _self.setData({
                    orderList: res.data.data,
                    currentPage: res.data.current_page,
                    lastPage: res.data.last_page
                })
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.loadingIndex != 1 && this.data.loadingIndex != 0) {
            _self.setData({
                loadingShow: true,
                loadingIndex: 0
            })
            app.topReq({
                loadType: -1,
                url: app.globalData.serviceSrc+'manage/expressage/selectorder',
                method: 'POST',
                data: {
                    token: app.globalData.userInfo.token,
                    page: this.data.lastPage
                },
                success: function (res) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].order_data = JSON.parse(res.data.data[i].order_data)
                    }
                    let loadingIndex_ = -1
                    if (res.data.last_page == res.data.last_page) {//如果到最后一页
                        loadingIndex_ = 1
                    }
                    _self.setData({
                        orderList: _self.data.orderList.concat(res.data.data),
                        lastPage: res.data.last_page,
                        currentPage: res.data.current_page,
                        loadingIndex: loadingIndex_
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