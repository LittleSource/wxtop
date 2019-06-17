module.exports = {
    startPay: function (PayData,url,price) {
        wx.requestPayment({
            timeStamp: PayData.timeStamp,
            nonceStr: PayData.nonceStr,
            package: PayData.package,
            signType: PayData.signType,
            paySign: PayData.paySign,
            success(res) {
                wx.redirectTo({
                    url: '/pages/common/payresult/payresult?result=1&price='+price+'&url='+url
                })
            },
            fail(e) {
                var msg = '';
                if (e.errMsg == "requestPayment:fail cancel") {
                    wx.redirectTo({
                        url: '/pages/common/payresult/payresult?result=0&url=' + url
                    })
                } else {
                    wx.showToast({
                        title: '呀，发生未知错误啦!请稍后再试' + e.errMsg,
                        icon: "none"
                    })
                }
                
            }
        })
    }
}