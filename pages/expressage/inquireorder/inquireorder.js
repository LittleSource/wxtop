// pages/expressage/inquireorder/inquireorder.js
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList: [],
        model:{
            show:false,
            content:''
        },
        currentPage: 1,
        lastPage: 2,
        loadingShow: false,
        loadingStyle: ['bg-gray load-icon loading', 'bg-gray over', , 'bg-red erro'],
        loadingIndex: -1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        _self = this
        //获取缓存
        const expressageOrderList = wx.getStorageSync('expressageOrderList')
        if (expressageOrderList) {
            _self.setData({
                orderList: expressageOrderList
            })
        }
        wx.startPullDownRefresh()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        app.topReq({
            loadType: 2,
            url: app.globalData.serviceSrc + '/expressage/Select/order',
            method: 'POST',
            data: {
                openid: app.globalData.userInfo.openid,
                page: 1
            },
            success: function (res) {
                for (let i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].order_data = JSON.parse(res.data.data[i].order_data)
                }
                _self.setData({
                    orderList: res.data.data,
                    currentPage: _self.data.currentPage++,
                    lastPage: res.data.last_page
                })
                wx.setStorage({ //缓存列表数据
                    key: 'expressageOrderList',
                    data: res.data.data
                })
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (this.data.lastPage != this.data.currentPage && this.data.loadType != 0) {
            _self.setData({
                loadingShow: true,
                loadingIndex: 0
            })
            app.topReq({
                loadType: -1,
                url: app.globalData.serviceSrc + '/expressage/Select/order',
                method: 'POST',
                data: {
                    openid: app.globalData.userInfo.openid,
                    page: this.data.lastPage
                },
                success: function(res) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].order_data = JSON.parse(res.data.data[i].order_data)
                    }
                    _self.setData({
                        orderList: _self.data.orderList.concat(res.data.data),
                        lastPage: res.data.last_page,
                        currentPage: res.data.current_page,
                        loadingIndex: 1
                    })
                }
            })
        }
    },
    /**
     * 点击取件短信model展示短信
     */
    showMessage: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            model:{
                show:true,
                content: this.data.orderList[index].order_data.shortmessage
            }
        })
    },
    customerService: function () {
        wx.makePhoneCall({
            phoneNumber: app.configData.expressagedqphone
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})