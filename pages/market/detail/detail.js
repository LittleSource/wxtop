// pages/market/detail/detail.js
const app = getApp()
var _self = null
Page({
    data: {
        scrollHeight: 500, //滚动区域高度
        TabCur: 0,
        MainCur: 0,
        VerticalNavTop: 0,
        load: true,
        animation: false, //是否展示购物车动画
        marketInfo: {}, //商家信息
        mainCate: [], //商品分类
        product: {}, //所有商品
        goodCount: 0, //购物车内商品计数
        priceSum: 0.00,
        shoppingCart: [],
        showShoppingcartModel: 0, //是否展示购物车模态框
        productInfo: {}, //模态框展示的商品对象
        showProductModel: 0 //是否展示商品信息模态框
    },
    onLoad(options) {
        _self = this
        var marketid = parseInt(options.marketid);
        if (!marketid){
            wx.showModal({
                title: '提示',
                content: '该商家不存在',
                success:function(){
                    wx.switchTab({
                        url: '/pages/index/index',
                    })
                }
            })
        }else{
            app.topReq({
                loadType: 1,
                url: app.globalData.serviceSrc + 'market/market/getAllInfo',
                method: 'GET',
                data: {
                    marketid: marketid
                },
                success: function (res) {
                    _self.setData({
                        marketInfo: res.data.marketInfo,
                        product: res.data.product,
                        mainCate: res.data.cates
                    })
                    _self.initCateProduct() //初始化商品数据
                }
            })
        }
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
    onShow() {
        //app.checkLogin('/pages/index/index', 1)
    },
    /**
     * 封装一个函数获取dom节点的信息
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
     * 初始化商品和分类
     */
    initCateProduct() {
        var cates_ = this.data.mainCate
        var product_ = this.data.product
        //为了滚动事件给分类加入序列化的id_属性
        for (let i = 0; i < cates_.length; i++) {
            cates_[i].id_ = i
        }
        //为了商品减号按钮给商品加入count属性
        for (var c in product_) {
            for (let i = 0; i < product_[c].length; i++) {
                product_[c][i].count = 0
            }
        }
        this.setData({
            product: product_,
            mainCate: cates_
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
                let view = wx.createSelectorQuery().select("#main-" + mainCate[i].id_);
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
        _self.setData({
            animation: true
        })
        setTimeout(function() {
            _self.setData({
                animation: false
            })
        }, 1000)
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
            product.cateindex = e.currentTarget.dataset.cateindex
            product.productindex = productindex //储存索引用于model框的btn
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
    },

    /**
     * 清空购物车
     */
    clearShoppingcart() {
        wx.showModal({
            title: '提示',
            content: '确定清空购物车吗？',
            success(res) {
                if (res.confirm && _self.data.shoppingCart.length > 0) {
                    _self.setData({
                        shoppingCart: [],
                        goodCount: 0,
                        showShoppingcartModel: 0,
                        priceSum: 0.00
                    })
                    _self.initCateProduct()
                    wx.showToast({
                        title: '购物车已清空'
                    })
                }
            }
        })
    },

    /**
     * 购物车模态框开关
     */
    switchModel(e) {
        if (this.data.shoppingCart.length > 0) {
            this.setData({
                showShoppingcartModel: e.currentTarget.dataset.modelshow
            })
        }
    },

    /**
     * 模态框add按钮点击事件
     */
    modelBtn(e) {
        var product = this.data.shoppingCart[e.currentTarget.dataset.index]
        e.currentTarget.dataset.cateindex = product.cateindex
        e.currentTarget.dataset.productindex = product.productindex
        e.currentTarget.dataset.product = product
        if (e.currentTarget.dataset.btntype) {
            this.addBtn(e)
        } else {
            if (this.data.shoppingCart.length == 1 && this.data.shoppingCart[0].count == 1) {
                this.setData({
                    showShoppingcartModel: 0
                })
            }
            this.reduceBtn(e)
        }
    },

    /**
     * 展示商品信息
     */
    showProductInfo(e) {
        this.setData({
            productInfo: e.currentTarget.dataset.product,
            showProductModel: 1
        })
    },

    /**
     * 提交订单到收银台界面
     */
    goCheckstand() {
        if (this.data.shoppingCart.length > 0) {
            getApp().globalData.shoppingCart = this.data.shoppingCart
            wx.navigateTo({
                url: '/pages/market/checkstand/checkstand'
            })
        }
    },

    /**
     * 配置分享
     */
    onShareAppMessage(option) {
        var message = {
            title: this.data.marketInfo.title,
            path: '/pages/market/detail/detail'
        }
        if (option.from == 'button') {
            message.title = this.data.marketInfo.title + '的这个' + this.data.productInfo.title + '超级好吃，你也快来尝尝吧'
            message.imageUrl = this.data.productInfo.img
        }
        return message
    }
})