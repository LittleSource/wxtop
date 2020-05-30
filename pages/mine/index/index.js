// pages/mine/index/index.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面展示
     */
    onShow: function() {
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },
    goLogin:function(){
        wx.navigateTo({
            url: '/pages/common/login/login?url=/pages/mine/index/index&istab=1',
        })
    },
    //点击头像的跳转操作(登录页/个人设置页)
    goUserSetting: function() {
        if (this.data.userInfo) { //若登陆了跳转设置界面

        } else {
            this.goLogin()
        }
    },
    //临时函数
    tempfun: function() {
        wx.showToast({
            title: '即将上线，敬请期待',
            icon: 'none'
        })
    },

    goOrder: function () {
        if (app.globalData.userInfo == null) {
            wx.showToast({
                title: '您还未登录哦',
                icon: 'none'
            })
            setTimeout(function () {
                _self.goLogin()
            }, 1000)
        } else {
            // wx.showToast({
            //     title: '即将上线，敬请期待',
            //     icon: 'none'
            // })
            wx.navigateTo({
                url: '/pages/mine/order/order'
            })
        }
    },
    goConsociation(){
        wx.navigateTo({
          url: '/pages/common/consociation/consociation',
        })
    },
    goMenu: function(e) {
        if (app.globalData.userInfo == null) {
            wx.showToast({
                title: '您还未登录哦',
                icon: 'none'
            })
            setTimeout(function () {
                _self.goLogin()
            }, 1000)
        } else {
            let url = e.currentTarget.dataset.url;
            wx.navigateTo({
                url: url
            })
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})