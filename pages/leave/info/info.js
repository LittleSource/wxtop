var date = require("../../../utils/date.js");
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        number:0,
        todayDate:'',
        data:null,
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _self = this
        this.setData({
            userInfo: app.globalData.userInfo
        })
        var nowdata = date.formatDateTime((new Date()).getTime() / 1000)
        var todayDate_ = nowdata[1]+'/'+nowdata[2]
        var number_ = ""+nowdata[0]+nowdata[1]+nowdata[2]+nowdata[3]+nowdata[4]+nowdata[5]
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('info', function (data) {
            data.startDate = data.startDate.replace(/-/g, '/');
            data.endDate = data.endDate.replace(/-/g, '/');
            _self.setData({
                userInfo: app.globalData.userInfo,
                data:data,
                number:number_,
                todayDate: todayDate_
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})