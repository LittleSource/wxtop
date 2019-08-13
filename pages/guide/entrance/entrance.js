// pages/guide/entrance/entrance.js
var SchoolEntrance = require('../../../data/school-entrance.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:'',
        entrance:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            title: getApp().globalData.school.name+'入学须知',
            entrance: SchoolEntrance.findById(getApp().globalData.school.id)
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})