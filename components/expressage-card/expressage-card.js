// components/expressage-card/expressage-card.js
const app = getApp()
Component({
    /**
     * 组件的一些选项
     */
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        order: {
            type: Object,
            default: ''
        },
        manage: {
            type: Boolean,
            default: false
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        model: {
            show: false,
            content: ''
        },
        statusDialog: false,
        checkbox: [{
            value: 2,
            name: '处理中',
            color: 'yellow',
            checked: false,
        }, {
            value: 3,
            name: '已完成',
            color: 'blue',
            checked: false,
        }, {
            value: 4,
            name: '已退款',
            color: 'grey',
            checked: false,
        }],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //初始化Checkbox的checked值全为false
        __initCheckbox() {
            let _checkbox = this.data.checkbox
            for (let i = 0; i < _checkbox.length; i++) {
                _checkbox[i].checked = false;
            }
            this.setData({
                checkbox: _checkbox
            });
        },

        //展示订单处理对话框
        _showStatusDialog() {
            if (this.data.manage && this.data.order.status != 4 && this.data.order.status != 0) {
                this.__initCheckbox() //初始化
                this.setData({
                    statusDialog: true,
                })
                let _checkbox = this.data.checkbox
                for (let i = 0; i < _checkbox.length; i++) {
                    if (_checkbox[i].value == this.data.order.status) {
                        _checkbox[i].checked = true;
                        break;
                    }
                }
                this.setData({
                    checkbox: _checkbox
                })
            }else{
                wx.showToast({
                    title: '该订单未支付或已退款，无权操作',
                    icon:'none'
                })
            }
        },

        //订单状态对话框选择事件
        _chooseStatusDialog(e) {
            let index = e.currentTarget.dataset.index
            this.__initCheckbox() //初始化
            let _checkbox = this.data.checkbox
            _checkbox[index].checked = true
            this.setData({
                checkbox: _checkbox
            })
        },

        //确定修改订单状态
        _changeOrderStatus() {
            var _self = this
            let index = -1
            for (let i = 0; i < this.data.checkbox.length; i++) {
                if (this.data.checkbox[i].checked) {
                    index = i;
                    break;
                }
            }
            //判断是否有选择且选择的与当前订单状态不一致
            if (index != -1 && this.data.checkbox[index].value != this.data.order.status) {
                app.topReq({
                    loadType: 1,
                    url: app.globalData.serviceSrc + 'manage/expressage/changestatus',
                    method: 'POST',
                    data: {
                        token: app.globalData.userInfo.token,
                        outTradeNo: _self.data.order.out_trade_no,
                        status: _self.data.checkbox[index].value,
                    },
                    success: function(res) {
                        wx.showToast({
                            title:'操作成功'
                        })
                        let order_ = _self.data.order
                        order_.status = res.data.status
                        _self.setData({
                            order: order_
                        })
                    }
                })
            }
        },

        //点击取件短信model展示短信
        _showMessage() {
            this.setData({
                model: {
                    show: true,
                    content: this.data.order.order_data.shortmessage
                }
            })
        },

        //联系客服
        _customerService() {
            app.topReq({
                loadType: 1,
                url: app.globalData.serviceSrc + '/expressage/Select/servePhone',
                method: 'POST',
                data: {
                    school: this.data.order.order_data.school,
                    type: this.data.order.order_data.type
                },
                success: function(res) {
                    wx.makePhoneCall({
                        phoneNumber: res.data.phone
                    })
                }
            })
        },
        //复制部分订单信息
        _copyInfo(){
            let orderData = this.data.order.order_data
            var info = '姓名:' + orderData.name + '|手机号:' + orderData.phone + '|宿舍号:' + orderData.dorNo + '|短信内容:' + orderData.shortmessage
            wx.setClipboardData({
                data: info
            })
        },

        //支付按钮发起支付
        _continuePay(){
            var _self = this
            if(this.data.order.status == 0){
                app.topReq({
                    loadType: 1,
                    url: app.globalData.serviceSrc + 'payment/expressage/continuePay',
                    method: 'POST',
                    data: {
                        outTradeNo:_self.data.order.out_trade_no
                    },
                    success: function (res) {
                        wx.requestPayment({
                            timeStamp: res.data.timeStamp,
                            nonceStr: res.data.nonceStr,
                            package: res.data.package,
                            signType: res.data.signType,
                            paySign: res.data.paySign,
                            success(res) {
                                wx.showToast({
                                    title: '支付成功'
                                })
                                let order_ = _self.data.order
                                order_.status = 1//设置订单为已支付状态
                                _self.setData({
                                    order: order_
                                })
                            },
                            fail(e) {
                                var msg = '';
                                if (e.errMsg == "requestPayment:fail cancel"){
                                    msg = '您已取消支付'
                                }else{
                                    msg = '呀，发生未知错误啦!请稍后再试'
                                }
                                wx.showToast({
                                    title: msg,
                                    icon: "none"
                                })
                            }
                        })
                    }
                })
            }
        }
    }
})