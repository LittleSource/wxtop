// pages/manage/moneyrecord/moneyrecord.js
var topDate = require("../../../utils/date.js"); //引入封装date.js
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recordList: [],
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
        const recordList_ = wx.getStorageSync('recordList')
        if (recordList_) {
            _self.setData({
                recordList: recordList_
            })
        }
        wx.startPullDownRefresh()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        app.topReq({
            loadType: 2,
            url: app.globalData.serviceSrc + 'manage/common/moneyRecord',
            method: 'POST',
            data: {
                token: app.globalData.userInfo.token,
                page: 1
            },
            success: function (res) {
                for (let i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].add_date = topDate.fromTimer2(res.data.data[i].add_date);
                }
                //如果只有一页
                if (res.data.last_page == 1) {
                    _self.setData({
                        loadingShow: true,
                        loadingIndex: 1
                    })
                }
                _self.setData({
                    recordList: res.data.data,
                    currentPage: res.data.current_page,
                    lastPage: res.data.last_page
                })
                wx.setStorage({ //缓存列表数据
                    key: 'recordList',
                    data: res.data.data
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
                url: app.globalData.serviceSrc + 'manage/common/moneyRecord',
                method: 'POST',
                data: {
                    token: app.globalData.userInfo.token,
                    page: this.data.lastPage
                },
                success: function (res) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].add_date = topDate.fromTimer(res.data.data[i].add_date);
                    }
                    let loadingIndex_ = -1
                    if (res.data.last_page == res.data.last_page) {//如果到最后一页
                        loadingIndex_ = 1
                    }
                    _self.setData({
                        recordList: _self.data.recordList.concat(res.data.data),
                        lastPage: res.data.last_page,
                        currentPage: res.data.current_page,
                        loadingIndex: loadingIndex_
                    })
                }
            })
        }
    }
})