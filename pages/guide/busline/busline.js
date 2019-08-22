// pages/guide/busline/busline.js
var SchoolBusline = require('../../../data/school-busline.js')
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
        this.setData({
            title: getApp().globalData.school.name + '乘车路线',
            environmental: SchoolBusline.findById(getApp().globalData.school.id)
        })
    },

    showimage: function (e) {
        wx.previewImage({
            current: e.target.dataset.url, // 当前显示图片的http链接
            urls: [e.target.dataset.url] // 需要预览的图片http链接列表
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})