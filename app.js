//app.js
var requestUtils = require("./utils/request.js"); //引入封装好的请求
App({
    onLaunch: function() {
        var _self = this
        //获取系统信息
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let custom = wx.getMenuButtonBoundingClientRect();
                this.globalData.Custom = custom;
                this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
            }
        })
        
        //尝试获取Storage
        const userInfo = wx.getStorageSync('userInfo')
        const school = wx.getStorageSync('school')
        if (userInfo) {
            this.globalData.userInfo = userInfo
        }
        if (school) {
            this.globalData.school = school
        }
    },
    checkLogin: function(url, istab, callback) {
        if (this.globalData.userInfo == null) {
            wx.showToast({
                title: '您还未登录哦',
                icon: 'none'
            })
            setTimeout(function() {
                wx.navigateTo({
                    url: '/pages/common/login/login?url=' + url + '&istab' + istab
                })
            }, 1000)
        }else{
            callback()
        }
    },
    globalData: {
        serviceSrc: 'https://wxtop.52ym.vip/',//https://wxtapi.52ym.vip/
        userInfo: null,
        invite:'TOP校园',
        school: {
            id: 0,
            title: '定位中...'
        },
        shoppingCart: []
    },
    configData: {

    },
    topReq: requestUtils.request
})