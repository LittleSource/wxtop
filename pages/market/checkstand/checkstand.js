// pages/market/checkstand/checkstand.js
var topPay = require("../../../utils/top-pay.js"); //引入封装topPay
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shoppingCart: [],
        totalPrice: 888.88,
        address: null,
        remark: '',
        addressShow: false,
        textareaShow: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        _self = this
        _self.setData({
            shoppingCart: app.globalData.shoppingCart
        })
        _self.countTotalPrice()
    },

    /**
     * 计算总价
     */
    countTotalPrice: function() {
        var sum = 0.00
        for (let product of this.data.shoppingCart) {
            sum += product.price * product.count
        }
        this.setData({
            totalPrice: sum.toFixed(2)
        })
    },
    /**
     * 获取地址
     */
    getAddress() {
        wx.chooseAddress({
            success(res) {
                var address_ = {
                    name: res.userName,
                    phone: res.telNumber,
                    detail: res.cityName + res.countyName + res.detailInfo
                }
                _self.setData({
                    address: address_
                })
            },
            fail() {
                //引导打开授权设置页
                _self.setData({
                    addressShow: true,
                    textareaShow: false
                })
            }
        })
    },
    addressModelClose: function() {
        _self.setData({
            textareaShow: true
        })
    },
    /**
     * 监听备注输入框输入事件
     */
    getRemark: function(e) {
        _self.setData({
            remark: e.detail.value
        })
    },

    /**
     * 发起付款
     */
    submitOrder() {
        if (!this.data.address) {
            wx.showToast({
                title: '您还未选择收货地址',
                icon: 'none',
                success: function() {
                    _self.getAddress()
                }
            })
        } else if (this.data.shoppingCart.length <= 0) {
            wx.showToast({
                title: '购物车数据异常,请重新下单',
                icon: 'none',
                success: function() {
                    wx.navigateBack()
                }
            })
        } else {
            //发起订单
            app.topReq({
                loadType: 1,
                url: app.globalData.serviceSrc + 'payment/market/createOrder',
                method: 'POST',
                data: {
                    token: app.globalData.userInfo.token,
                    shoppingCart: _self.data.shoppingCart,
                    address: _self.data.address,
                    remark: _self.data.remark
                },
                success: function(res) {
                    topPay.startPay(res.data, '/pages/', _self.data.totalPrice)
                }
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})