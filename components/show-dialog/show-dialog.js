// components/show-dialog/show-dialog.js
Component({
    /**
    * 组件的一些选项
    */
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        isShow: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '提示'
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
        },
        _confirm(){
            this.triggerEvent('confirm')
            this._close()
        }
    }
})
