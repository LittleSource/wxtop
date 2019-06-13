// components/show-model/show-model.js
Component({
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        isShow: {
            type: Boolean,
            default: false
        },
        title:{
            type:String,
            default:'提示'
        },
        content: {
            type: String,
            default: ' '
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
        _close(){
            this.setData({
                isShow: false
            })
        }
    }
})
