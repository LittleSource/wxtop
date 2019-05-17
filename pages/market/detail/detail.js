// pages/market/detail/detail.js
const app = getApp()
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        scrollHeight: 200,
        TabCur: 0,
        MainCur: 0,
        VerticalNavTop: 0,
        load: true,
        list: [],
        goodCount: 0, //购物车内商品计数
        shoppingCart: []
    },
    onLoad() {
        this.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight - (app.globalData.CustomBar + app.globalData.StatusBar) - 95
        })
        let list = [{}];
        for (let i = 0; i < 10; i++) {
            list[i] = {};
            list[i].name = String.fromCharCode(65 + i);
            list[i].id = i;
        }
        this.setData({
            list: list,
            listCur: list[0]
        })
    },
    goBack() {
        let pages = getCurrentPages();
        if (pages.length == 1) {
            this.goHome()
        } else {
            wx.navigateBack()
        }
    },
    goHome() {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            MainCur: e.currentTarget.dataset.id,
            VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
        })
    },
    VerticalMain(e) {
        let that = this;
        let list = this.data.list;
        let tabHeight = 0;
        if (this.data.load) {
            for (let i = 0; i < list.length; i++) {
                let view = wx.createSelectorQuery().select("#main-" + list[i].id);
                view.fields({
                    size: true
                }, data => {
                    list[i].top = tabHeight;
                    tabHeight = tabHeight + data.height;
                    list[i].bottom = tabHeight;
                }).exec();
            }
            that.setData({
                load: false,
                list: list
            })
        }
        let scrollTop = e.detail.scrollTop + 20;
        for (let i = 0; i < list.length; i++) {
            if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
                that.setData({
                    VerticalNavTop: (list[i].id - 1) * 50,
                    TabCur: list[i].id
                })
                return false
            }
        }
    },
    addBtn(e) {
        this.setData({
            goodCount: ++this.data.goodCount
        })
    },
    callKefu(){
        wx.makePhoneCall({
            phoneNumber: '17320285191'
        })
    }
})