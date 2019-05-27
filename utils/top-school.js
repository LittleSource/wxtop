/*
top-school-data - TOP校园-海河园大学数据
author : 444168950@qq.com 小源
*/
var QQMapWX = require('./qqmap-wx-jssdk.min.js');//引入高德地图SDK
var qqmapsdk = new QQMapWX({
    key: 'HSKBZ-VFUH3-LSU3V-3GNMV-OF4V2-VHBFI'
});
module.exports = {
    schoolData: [{
        id: 15310156724975630292,
        title: '天津电子信息技术学院',
        name: '电子',
        image: 'https://icloud.9ykm.cn/app/banner/mmexport1.jpg'
    },
    {
        id: 1132276838459656005,
        title: '天津中德应用技术大学',
        name: '中德',
        image: 'http://tcdn.ym-top.com/school/%E4%B8%AD%E5%BE%B7.jpg'
    },
    {
        id: 9064819481832757240,
        title: '天津轻工职业技术学院',
        name: '轻工',
        image: 'http://tcdn.ym-top.com/school/%E8%81%8C%E5%A4%A7.jpg'
    },
    {
        id: 5121864895957150075,
        title: '天津现代职业技术学院',
        name: '现代',
        image: 'http://tcdn.ym-top.com/school/%E7%8E%B0%E4%BB%A3.jpg'
    },
    {
        id: 12964050169472583622,
        title: '天津机电职业技术学院',
        name: '机电',
        image: 'http://tcdn.ym-top.com/school/%E6%9C%BA%E7%94%B5.jpg'
    },
    {

        id: 6636179715655175228,
        title: '天津职业大学(海河园校区)',
        name: '职大',
        image: 'http://tcdn.ym-top.com/school/%E8%81%8C%E5%A4%A7.jpg'
    },
    {
        id: 17425798441035415081,
        title: '天津商务职业学院',
        name: '商务',
        image: 'http://tcdn.ym-top.com/school/%E5%95%86%E5%8A%A1.jpg'
    },
    {
        id: 3859587972726810660,
        title: '天津海运职业学院',
        name: '海运',
        image: 'http://tcdn.ym-top.com/school/%E6%B5%B7%E8%BF%90.jpg'
    }
    ],
    findSchoolById:function(id){
        for (let school of this.schoolData) {
            if (school.id == id) {
                return school;
            }
        }
        return false;
    },
    getLocationSchool:function(palyLoad){
        var _self = this
        var error = new Object
        error.title = '未搜索到学校,请点击选择'//准备错误信息
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                qqmapsdk.reverseGeocoder({
                    get_poi: 1,
                    poi_options: 'address_format=short;radius=500;category=大学',
                    success: function (data) {
                        if (data.result.pois.length <= 0){  //没有查询到附近pois直接返回失败
                            palyLoad.fail(error)
                            return
                        }
                        var school = _self.findSchoolById(data.result.pois[0].id)//根据pois的id在数据中查找
                        if (school){
                            palyLoad.success(school)
                        }else{
                            palyLoad.fail(error)
                        }
                    },
                    fail: function (failObj) {
                        wx.showToast({
                            title: failObj.message,
                            icon: 'none'
                        })
                        palyLoad.fail(error)
                    }
                })
            }, fail(failObj){
                wx.showToast({
                    title: '自动获取学校需要您的授权哦',
                    icon: 'none'
                })
                palyLoad.fail(error)
            }
        })
    },
    //开通快递代取服务的学校
    getExpressageSchool(){
        var school = [this.schoolData[0].title, this.schoolData[1].title]
        return school
    }
}