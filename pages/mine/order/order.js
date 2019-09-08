// pages/mine/order/order.js
var topDate = require("../../../utils/date.js"); //引入封装date.js
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        title: ['全部', '待付款','待处理','待收货','已退款'],
        orderList: [],
        currentPage: 1,
        lastPage: 2,
        loadingShow: false,
        loadingStyle: ['bg-gray load-icon loading', 'bg-gray over', , 'bg-red erro'],
        loadingIndex: -1
    },

    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id
        })
        wx.startPullDownRefresh()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _self = this
        wx.startPullDownRefresh()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        _self.setData({
            loadingShow: false
        })
        app.topReq({
            loadType: 2,
            url: app.globalData.serviceSrc + 'market/order/select',
            method: 'POST',
            data: {
                token: app.globalData.userInfo.token,
                page: 1,
                status: _self.data.TabCur
            },
            success: function (res) {
                for (let i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].shopping_cart = JSON.parse(res.data.data[i].shopping_cart);
                    res.data.data[i].create_time = topDate.fromTimer(res.data.data[i].create_time);
                }
                //如果只有一页
                if (res.data.last_page == 1 && res.data.data.length>0) {
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
                wx.setStorage({ //缓存列表数据
                    key: 'orderList',
                    data: res.data.data
                })
                console.log(_self.data.orderList)
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
                url: app.globalData.serviceSrc + 'expressage/Select/order',
                method: 'POST',
                data: {
                    token: app.globalData.userInfo.token,
                    page: this.data.lastPage,
                    status: _self.data.TabCur
                },
                success: function (res) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].shopping_cart = JSON.parse(res.data.data[i].shopping_cart);
                        res.data.data[i].create_time = topDate.fromTimer(res.data.data[i].create_time);
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