// pages/common/payresult/payresult.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result:false,//支付是否成功
        url:'',//查看订单的url
        price:-0.01,//价格
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let result = parseInt(options.result)
        if (result){//支付成功
            this.setData({
                result:true,
                price: options.price,
                url:options.url
            })
        }else{
            this.setData({
                url: options.url
            })
        }
    },
    goHome:function(){
        wx.switchTab({
            url: '/pages/index/index'
        })
    },
    goOrder:function(){
        wx.redirectTo({
            url: this.data.url
        })
    }
})