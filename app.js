//app.js
var requestUtils = require("./utils/request.js");//引入封装好的请求
App({
    onLaunch: function () {
        console.log('onLaunch')
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
    globalData: {
        serviceSrc: 'http://123.151.0.32/',
        userInfo: null,
        school: {
            id:0,
            title:'定位中...'
        }
    },
    topReq: requestUtils.request
})