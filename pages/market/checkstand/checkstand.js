// pages/market/checkstand/checkstand.js
const app = getApp()
var _self = null
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        shoppingCart:[],
        totalPrice:888.88,
        address:null,
        remark:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        _self = this
        _self.setData({
            shoppingCart:app.globalData.shoppingCart
        })
        _self.countTotalPrice()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 计算总价
     */
    countTotalPrice: function(){
        var sum = 0.00
        for(let product of this.data.shoppingCart){
            sum += product.price * product.count
        }
        this.setData({
            totalPrice: sum.toFixed(2)
        })
    },
    /**
     * 获取地址
     */
    getAddress(){
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
                wx.showToast({
                    title: '获取地址信息失败！',
                    icon: 'none'
                })
                //引导打开授权设置页
            }
        })
    },

    /**
     * 监听备注输入框输入事件
     */
    getRemark:function(e){
        _self.setData({
            remark: e.detail.value
        })
    },

    /**
     * 发起付款
     */
    submitOrder(){
        if(!this.data.address){
            wx.showToast({
                title:'您还未选择收货地址',
                icon:'none'
            })
            this.getAddress()
        }else if(this.data.shoppingCart.length <= 0){
            wx.showToast({
                title: '购物车数据异常',
                icon: 'none'
            })
        }else{
            wx.showToast({
                title: '即将上线，敬请期待',
                icon: 'none'
            })
            //发起订单
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})