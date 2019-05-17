//app.js
var graceRequest = require("./utils/request.js");//引入封装好的请求
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
        //尝试获取登陆Storage
        const userInfo = wx.getStorageSync('userInfo')
        if (userInfo) {
            this.globalData.userInfo = userInfo
        }
    },
    globalData: {
        serviceSrc: 'https://apii.ym998.cn/',
        userInfo: null,
        school: {
            id:0,
            title:'定位中...'
        }
    },
    graceRequest: graceRequest
})