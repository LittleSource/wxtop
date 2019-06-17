// pages/expressage/index/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://icloud.9ykm.cn/app/banner/mmexport1.jpg'
        }, {
            id: 1,
            type: 'image',
            url: 'https://icloud.9ykm.cn/app/banner/mmexport2.jpg',
        }, {
            id: 2,
            type: 'image',
            url: 'https://icloud.9ykm.cn/app/banner/mmexport3.jpg'
        }],
        notice: [
            "①学校门口和菜鸟驿站都可以代取哦",
            "②无论是小姐姐还是小哥哥都可以送到宿舍",
            "③小件(2KG及以下)2元，大件(2KG以上)3元"
        ],
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