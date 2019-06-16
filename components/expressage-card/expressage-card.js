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
            color:'yellow',
            checked: false,
        }, {
            value: 3,
            name: '已完成',
            color:'blue',
            checked: false,
        }, {
            value: 4,
            name: '已退款',
            color:'grey',
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
            if (this.data.manage && this.data.order.status != 4) {
                this.__initCheckbox()//初始化
                this.setData({
                    statusDialog: true,
                })
                let _checkbox = this.data.checkbox
                for (let i = 0; i < _checkbox.length; i++){
                    if (_checkbox[i].value == this.data.order.status){
                        _checkbox[i].checked = true;
                        break;
                    }
                }
                this.setData({
                    checkbox: _checkbox
                });
            }
        },

        //订单状态对话框选择事件
        _chooseStatusDialog(e){
            let index = e.currentTarget.dataset.index
            this.__initCheckbox()//初始化
            let _checkbox = this.data.checkbox
            _checkbox[index].checked = true
            this.setData({
                checkbox: _checkbox
            })
        },

        //确定修改订单状态
        _changeOrderStatus(){
            let index = -1
            for(let i = 0;i < this.data.checkbox.length; i++){
                if (this.data.checkbox[i].checked){
                    index = i;
                    break;
                }
            }
            //判断是否有选择且选择的与当前订单状态不一致
            if (index != -1 && this.data.checkbox[index].value != this.data.order.status){
                app.topReq({
                    loadType: 1,
                    url: app.globalData.serviceSrc + '',
                    method: 'POST',
                    data: {
                        openid:'',
                        token:'',
                        orderid:'',
                    },
                    success: function (res) {
                        
                    }
                })
            }
            console.log('dsadsad')
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
        }
    }
})