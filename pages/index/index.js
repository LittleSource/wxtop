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
        footImg:{
            width:592,
            height:333
        },
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
    onLoad: function (options) {
        _self = this
        if (options.invite){
            getApp().globalData.invite = options.invite
        }
        _self.getSchoolInfo()
        var bi = this.data.footImg.height / this.data.footImg.width
        try {
            const res = wx.getSystemInfoSync()
            this.setData({
                footImg: {
                    width: res.screenWidth,
                    height: res.screenWidth * bi
                }
            })
        } catch (e) {
            // Do something when catch error
        }
        app.topReq({
            loadType: 1,
            url: app.globalData.serviceSrc + 'common/index/iconList',
            method: 'GET',
            data: {},
            success: function (res) {
                _self.setData({
                   iconList: res.data.iconList
                })
            }
        })
    },
    onShow: function () {
        this.setData({
            userInfo: app.globalData.userInfo,
            school: app.globalData.school
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
        if(app.globalData.userInfo == null){
            wx.showToast({
                title: '您还未登录哦',
                icon: 'none'
            })
            setTimeout(function () {
                wx.navigateTo({
                    url: '/pages/common/login/login?url=/pages/index/index&istab=1'
                })
            }, 1000)
        } else if (app.globalData.school.id == 0){
            wx.showToast({
                title: '请选择您的学校',
                icon: 'none'
            })
            _self.setData({
                modalShow: true
            })
        }else{
            var index = e.currentTarget.dataset.index
            if (_self.data.iconList[index].url) {
                wx.navigateTo({
                    url: _self.data.iconList[index].url
                })
            } else {
                wx.showToast({
                    title: '即将上线，敬请期待',
                    icon: 'none'
                })
            }
        }
    }
})