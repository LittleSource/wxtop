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
    },

    /**
     * 组件的初始数据
     */
    data: {
        model: {
            show: false,
            content: ''
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
        * 点击取件短信model展示短信
        */
        _showMessage(){
            this.setData({
                model: {
                    show: true,
                    content: this.data.order.order_data.shortmessage
                }
            })
        },
        _customerService(){
            app.topReq({
                loadType: 1,
                url: app.globalData.serviceSrc + '/expressage/Select/servePhone',
                method: 'POST',
                data: {
                    school: this.data.order.order_data.school,
                    type: this.data.order.order_data.type
                },
                success: function (res) {
                    wx.makePhoneCall({
                        phoneNumber: res.data.phone
                    })
                }
            })
        }
    }
})
