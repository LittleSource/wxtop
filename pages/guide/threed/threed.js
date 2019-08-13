// pages/guide/threed/threed.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        url:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var globalData = getApp().globalData
        this.setData({
            url: globalData.serviceSrc +'common/threed/govr?id='+globalData.school.id
        })
        console.log(this.data.url)
    },

    findById: function (id) {
        for (let school of this.data.vrList) {
            if (school.id == id) {
                return school.url;
            }
        }
        return false;
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})