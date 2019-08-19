//index.js
//获取应用实例
const app = getApp()
var topSchool = require("../../utils/top-school.js"); //引入封装topSchool
var _self = null
Page({
    data: {
        modalShow: false,
        addressShow: false,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        userInfo: null,
        school: app.globalData.school,
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'http://tcdn.ym-top.com/common/welcome.jpg'
        }],
        iconList: [{
            icon: 'creativefill',
            color: 'red',
            name: '新生指南',
            url: '/pages/guide/index/index'
        }, {
            icon: 'discoverfill',
            color: 'blue',
            name: '校园宽带',
            url: '/pages/campusnet/index/index'
        }, {
            icon: 'deliver_fill',
            color: 'green',
            name: '快递服务',
            url: '/pages/expressage/index/index'
        }, {
            icon: 'sponsorfill',
            color: 'yellow',
            name: '兼职信息',
            url: ''
        }]
    },
    onLoad: function () {
        _self = this
        _self.getSchoolInfo()
        app.topReq({
            loadType: 1,
            url: app.globalData.serviceSrc + 'common/index/iconList',
            method: 'GET',
            data: {},
            success: function (res) {
                //_self.setData({
                //    iconList: res.data.iconList
                //})
            }
        })
    },
    onShow: function () {
        this.setData({
            userInfo: app.globalData.userInfo,
        })
    },
    showModel: function () {
        this.setData({
            modalShow: true
        })
    },
    getSchoolInfo: function () {
        if (getApp().globalData.school.id) {
            return
        }
        //获取学校位置信息
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                topSchool.getLocationSchool({
                    success: function (school) {
                        getApp().globalData.school = school
                        _self.setData({
                            school: school
                        })
                        wx.setStorage({ //缓存school列表
                            key: 'school',
                            data: school
                        })
                    },
                    fail: function (error) {
                        _self.setData({
                            school: error
                        })
                        wx.showToast({
                            title: '请选择您的学校',
                            icon: 'none'
                        })
                        _self.setData({
                            modalShow: true
                        })
                    }
                })
            },
            fail(failObj) {
                _self.setData({
                    addressShow: true
                })
            }
        })
    },
    updateSchool: function () {
        _self.setData({
            school: app.globalData.school
        })
    },
    goSwitch: function (e) {
        app.checkLogin('/pages/index/index', 1, function () {
            var index = e.currentTarget.dataset.index
            if (_self.data.iconList[index].url) {
                wx.navigateTo({
                    url: _self.data.iconList[index].url
                })
            } else {
                wx.showToast({
                    title: '暂未开放',
                    icon: 'none'
                })
            }
        })
    }
})