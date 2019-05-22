// pages/market/detail/detail.js
const app = getApp()
var _self = null
Page({
    data: {
        scrollHeight: 200, //滚动区域高度
        TabCur: 0,
        MainCur: 0,
        VerticalNavTop: 0,
        load: true,
        marketInfo: {}, //商家信息
        mainCate: [], //商品分类
        product: {}, //所有商品
        goodCount: 0, //购物车内商品计数
        priceSum: 0.00,
        shoppingCart: []
    },
    onLoad() {
        _self = this
        app.topReq({
            loadType: 1,
            url: app.globalData.serviceSrc + 'market/market/getAllInfo',
            method: 'GET',
            data: {
                marketId: 1
            },
            success: function(res) {
                console.log(res.data)
                //为了滚动事件给分类加入序列化的id_属性
                for (let i = 0; i < res.data.cates.length; i++) {
                    res.data.cates[i].id_ = i
                }
                //为了商品减号按钮给商品加入count属性
                for (var c in res.data.product) {
                    for (let i = 0; i < res.data.product[c].length; i++) {
                        res.data.product[c][i].count = 0
                    }
                }

                _self.setData({
                    marketInfo: res.data.marketInfo,
                    product: res.data.product,
                    mainCate: res.data.cates
                })
            }
        })
    },
    onReady() {
        var bottomBarHeight = 0
        this.queryNodeHeight({
            node: 'bottomBar',
            success: function(res) {
                bottomBarHeight = res[0].height
            }
        })
        var marketCardHeight = 0
        this.queryNodeHeight({
            node: 'marketCard',
            success: function(res) {
                marketCardHeight = res[0].height
                //计算滚动区域高度
                _self.setData({
                    scrollHeight: wx.getSystemInfoSync().windowHeight - (app.globalData.CustomBar + bottomBarHeight + marketCardHeight)
                })
            }
        })
    },
    /**
     * 封装一个函数获取节点的信息
     */
    queryNodeHeight(nodeObj) {
        var query = this.createSelectorQuery()
        query.select('#' + nodeObj.node).boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function(res) {
            nodeObj.success(res)
        })
    },
    /**
     * 左边分类点击事件
     */
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            MainCur: e.currentTarget.dataset.id,
            VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
        })
    },
    /**
     * 监听商品区域滚动事件
     */
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
                    VerticalNavTop: (mainCate[i].id_ - 1) * 50,
                    TabCur: mainCate[i].id_
                })
                return false
            }
        }
    },
    reduceBtn(e) {
        //操作商品product的count - 1
        let product_ = this.data.product
        let key = Object.keys(product_)[e.currentTarget.dataset.cateindex]
        let productindex = e.currentTarget.dataset.productindex
        product_[key][productindex].count--;
        //计算价钱
        let priceSum_ = this.data.priceSum - parseFloat(product_[key][productindex].price)
        priceSum_ = Math.round(priceSum_ * 100) / 100
        //购物车操作
        let product = e.currentTarget.dataset.product
        let shoppingCart_ = this.data.shoppingCart
        var index = this.findProduct(product)
        if (shoppingCart_[index].count == 1) { //商品数量为1从购物车移除
            shoppingCart_.splice(index, 1)
        } else {
            shoppingCart_[index].count--
        }

        this.setData({
            priceSum: priceSum_,
            product: product_,
            shoppingCart: shoppingCart_,
            goodCount: --this.data.goodCount > 0 ? this.data.goodCount : 0
        })
    },
    addBtn(e) {
        //操作商品product的count + 1
        let product_ = this.data.product
        let key = Object.keys(product_)[e.currentTarget.dataset.cateindex]
        let productindex = e.currentTarget.dataset.productindex
        product_[key][productindex].count++;
        //计算价钱
        let priceSum_ = this.data.priceSum + parseFloat(product_[key][productindex].price)
        priceSum_ = Math.round(priceSum_ * 100) / 100
        //购物车操作
        let product = e.currentTarget.dataset.product
        let shoppingCart_ = this.data.shoppingCart
        var index = this.findProduct(product)
        if (index == -1) {
            product.count = 1
            shoppingCart_[this.data.shoppingCart.length] = product
        } else {
            shoppingCart_[index].count++;
        }
        _self.setData({
            priceSum: priceSum_,
            product: product_,
            shoppingCart: shoppingCart_,
            goodCount: ++this.data.goodCount
        })
    },
    /**
     * 从购物车shoppingCart查找商品
     * return 找到返回索引 未找到返回 -1
     */
    findProduct(product) {
        var result = -1;
        for (let i = 0; i < this.data.shoppingCart.length; i++) {
            if (product.id == this.data.shoppingCart[i].id) {
                result = i;
                break;
            }
        }
        return result;
    }
})