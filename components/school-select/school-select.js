// components/school-select/school-select.js
var topSchool = require("../../utils/top-school.js");//引入封装topSchool
const app = getApp();
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
        isShow:{
            type:Boolean,
            default:false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        CustomBar: app.globalData.CustomBar,
        schoolData: topSchool.schoolData,
        scrollHeight: wx.getSystemInfoSync().windowHeight - app.globalData.CustomBar
    },
    /**
     * 组件的方法列表
     */
    methods: {
        _hideModal(){
            this.setData({
                isShow: false
            })
        },
        _setSchool(e){
            var school = topSchool.findSchoolById(e.currentTarget.dataset.id)
            if(school){
                getApp().globalData.school = school
                wx.setStorage({ //缓存school列表
                    key: 'school',
                    data: school
                })
                this.setData({
                    isShow: false
                })
                this.triggerEvent('updateSchool')
            }else{
                wx.showToast({
                    title: '操作失败,请重试!',
                    icon:'none'
                })
            }
        }
    }
})
