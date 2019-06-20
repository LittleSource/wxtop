// components/address-model/address-model.js
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
        type: {
            type: String,
            default: '位置'
        },
        isShow: {
            type: Boolean,
            default: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        _close() {
            this.setData({
                isShow: false
            })
            this.triggerEvent('close')
        },
        _settingAfter(e){
            if (this.data.type == '地址' && e.detail.authSetting['scope.address']){
                this.triggerEvent('settingSuccess')
                this._close()
            }
            if (this.data.type == '位置' && e.detail.authSetting['scope.userLocation']){
                this.triggerEvent('settingSuccess')
                this._close()
            }
        }
    }
})
