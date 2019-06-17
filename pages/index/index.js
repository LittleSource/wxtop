//index.js
//获取应用实例
const app = getApp()
var topSchool = require("../../utils/top-school.js");//引入封装topSchool
var _self = null
Page({
    data: {
        modalShow: false,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        userInfo: null,
        school: app.globalData.school,
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://icloud.9ykm.cn/app/banner/mmexport2.jpg'
        }, {
            id: 1,
            type: 'image',
            url: 'https://icloud.9ykm.cn/app/banner/mmexport1.jpg',
        }, {
            id: 2,
            type: 'image',
            url: 'https://icloud.9ykm.cn/app/banner/mmexport3.jpg'
        }],
        iconList: [
        // {
        //     icon: 'likefill',
        //     color: 'orange',
        //     name: '表白墙',
        //     url: '/pages/confession/index/index'
        // }, 
        {
            icon: 'shopfill',
            color: 'cyan',
            name: '订外卖',
            url: '/pages/market/detail/detail'
        }, {
            icon: 'cartfill',
            color: 'blue',
            name: '逛超市',
            url: '/pages/market/index/index'
        }, {
            icon: 'deliver_fill',
            color: 'olive',
            name: '快递服务',
            url: '/pages/expressage/index/index'
        }, {
            icon: 'choicenessfill',
            color: 'purple',
            name: '免押租车'
        }
        // , {
        //     icon: 'questionfill',
        //     color: 'mauve',
        //     name: '帮助反馈'
        // }
        ]
    },
    onLoad: function () {
        _self = this
        //获取学校位置信息
        topSchool.getLocationSchool({
            success: function (school) {
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
    updateSchool: function () {
        _self.setData({
            school: app.globalData.school
        })
    },
    goSwitch: function (e) {
        if (!this.data.userInfo) {
            app.checkLogin('/pages/index/index', 1)
        } else {
            var index = e.currentTarget.dataset.index
            if (this.data.iconList[index].url) {
                wx.navigateTo({
                    url: this.data.iconList[index].url
                })
            } else {
                wx.showToast({
                    title: '暂未开放',
                    icon: 'none'
                })
            }
        }
    }
})
