// pages/expressage/index/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [{
            id: 0,
            url: 'http://tcdn.ym-top.com/expressage/swiper1.png'
        }, {
            id: 1,
                url: 'http://tcdn.ym-top.com/expressage/swiper2.png',
        }, {
            id: 2,
            url: 'https://icloud.9ykm.cn/app/banner/mmexport3.jpg'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.checkLogin('/pages/expressage/index/index',0)
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