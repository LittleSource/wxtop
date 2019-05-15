//app.js
var graceRequest = require("./utils/request.js");//引入封装好的请求
App({
    onLaunch: function () {
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
        
    },
    globalData: {
        serviceSrc: 'https://apii.ym998.cn/',
        hasLogin: false,
        userInfo: null,
        school: {
            id:0,
            title:'定位中...',
            name:'',
            image:''
        }
    },
    graceRequest: graceRequest
})