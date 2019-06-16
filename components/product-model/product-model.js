// components/product-model/product-model.js
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
        product: {
            type: Object,
            default: ''
        },
        showModel: {
            type: [Boolean, String],
            default: false
        },
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
                showModel: false
            })
        },
        _showImage(){
            wx.previewImage({
                urls: [this.data.product.img]
            })
        }
    }
})
