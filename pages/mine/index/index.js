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
    goMenu: function(e) {
        let url = e.currentTarget.dataset.url;
        if (this.data.userInfo) {
            wx.navigateTo({
                url: url
            })
        } else {
            this.goLogin()
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})