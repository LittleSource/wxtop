// pages/market/detail/detail.js
const app = getApp()
var _self = null
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
        marketInfo: {}, //商家信息
        mainCate: [],   //商品分类
        product: {},    //所有商品
        goodCount: 0,   //购物车内商品计数
        shoppingCart: []
    },
    onLoad() {
        _self = this
        this.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight - (app.globalData.CustomBar + app.globalData.StatusBar) - 95
        })
        app.topReq.get({
            loadType: 1,
            url: app.globalData.serviceSrc + 'market/market/getAllInfo',
            data: {
                marketId: 1
            },
            success: function(res) {
                _self.setData({
                    marketInfo: res.data.marketInfo,
                    product: res.data.product,
                    mainCate: res.data.cates
                })
            }
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
        let mainCate = this.data.mainCate;
        let tabHeight = 0;
        if (this.data.load) {
            for (let i = 0; i < mainCate.length; i++) {
                let view = wx.createSelectorQuery().select("#main-" + mainCate[i].id);
                view.fields({
                    size: true
                }, data => {
                    mainCate[i].top = tabHeight;
                    tabHeight = tabHeight + data.height;
                    mainCate[i].bottom = tabHeight;
                }).exec();
            }
            that.setData({
                load: false,
                mainCate: mainCate
            })
        }
        let scrollTop = e.detail.scrollTop + 20;
        for (let i = 0; i < mainCate.length; i++) {
            if (scrollTop > mainCate[i].top && scrollTop < mainCate[i].bottom) {
                that.setData({
                    VerticalNavTop: (mainCate[i].id - 1) * 50,
                    TabCur: mainCate[i].id
                })
                return false
            }
        }
    },
    reduceBtn(e) {
        this.setData({
            goodCount: --this.data.goodCount > 0 ? this.data.goodCount : 0
        })
    },
    addBtn(e) {
        this.setData({
            goodCount: ++this.data.goodCount
        })
    }
})