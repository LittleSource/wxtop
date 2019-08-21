// pages/campusnet/index/index.js
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isYuyue: false,
        swiperList: [{
            id: 0,
            url: 'http://tcdn.ym-top.com/common/kuadai.jpg'
        }, {
            id: 1,
            url: 'http://tcdn.ym-top.com/common/kuadai2.jpg',
        }],
        schoolTitle: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _self = this
        var school = getApp().globalData.school;
        if (!school.id) {
            wx.showModal({
                title: '提示',
                content: '请等待定位完成或选择您的学校！',
                success(res) {
                    wx.navigateBack()
                }
            })
        } else {
            _self.setData({
                schoolTitle: school.title
            })
            app.topReq({
                loadType: 1,
                url: app.globalData.serviceSrc + 'campusnet/Appointment/select',
                method: 'POST',
                data: {
                    token: app.globalData.userInfo.token,
                },
                success: function (res) {
                    if (res.data != null) {
                        _self.setData({
                            isYuyue: true
                        })
                    }
                }
            })
        }
    },

    yuyue: function () {
        console.log(app.globalData.userInfo)
        app.topReq({
            loadType: 1,
            url: app.globalData.serviceSrc + 'campusnet/Appointment/submit',
            method: 'POST',
            data: {
                token: app.globalData.userInfo.token,
                school: app.globalData.school.title,
                phone: app.globalData.userInfo.phone
            },
            success: function (res) {
                wx.showToast({
                    title: '预约成功',
                })
                _self.setData({
                    isYuyue: true
                })
            }
        })

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})