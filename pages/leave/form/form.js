// pages/expressage/placeorder/placeorder.js
const app = getApp()
var date = require("../../../utils/date.js");
var _self = null
Page({
    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        class: '20计算机',
        cause: '',
        vehicle: '',
        line: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        duration:'',
        type: ['事假', '病假', '婚假', '产假', '陪产假', '其他'],
        index: 0,
        examineAvatar: '',
        examineName: '',
        copyAvatar: '',
        copyName: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _self = this
        var nowdate = date.formatDateTime((new Date()).getTime() / 1000)
        this.setData({
            startDate: nowdate[0] + '-' + nowdate[1] + '-' + nowdate[2],
            startTime: nowdate[3] + ':' + nowdate[4],
            endDate: nowdate[0] + '-' + nowdate[1] + '-' + nowdate[2],
            endTime: nowdate[3] + ':' + nowdate[4]
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    /*
     *快递规格改变触发
     */
    typeChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },
    startDateChange: function (e) {
        console.log(e)
        this.setData({
            startDate: e.detail.value
        })
    },
    startTimeChange: function (e) {
        this.setData({
            startTime: e.detail.value
        })
    },
    endDateChange: function (e) {
        this.setData({
            endDate: e.detail.value
        })
    },
    endTimeChange: function (e) {
        this.setData({
            endTime: e.detail.value
        })
    },
    chooseCopyAvatar: function () {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success(res) {
                _self.setData({
                    copyAvatar: res.tempFilePaths[0]
                })
            }
        })
    },
    chooseExamineAvatar: function () {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success(res) {
                _self.setData({
                    examineAvatar: res.tempFilePaths[0]
                })
            }
        })
    },
    /*
     *用户提交表单事件
     */
    formSubmit(e) {
        var data = e.detail.value
        data.startDate = this.data.startDate
        data.startTime = this.data.startTime
        data.endDate = this.data.endDate
        data.endTime = this.data.endTime
        data.examineAvatar = this.data.examineAvatar
        data.copyAvatar = this.data.copyAvatar
        var pass = true
        Object.getOwnPropertyNames(data).forEach(function(key){
            if(data[key] == ''){
                pass = false
            }
        })
        if(pass){
            wx.navigateTo({
                url: '/pages/leave/message/message',
                success: function (res) {
                    console.log(res)
                    res.eventChannel.emit('info', data)
                }
            })
        }else{
            wx.showToast({
                title: '所有值不能为空,请检查!',
                icon: "none"
            })
        }
    }
})