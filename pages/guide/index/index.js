// pages/guide/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mapUrl:'',
        menuList: [{
            title: '学院简介',
            name: 'introduced',
            url: '../introduced/introduced',
            icon: 'upstage',
            color: 'blue'
        }, {
            title: '3D校园',
            name: 'Dimensions',
            url: '../threed/threed',
            icon: 'discover',
            color: 'pink'
        }, {
            title: '校园环境',
            name: 'environment',
            url: '../environmental/environmental',
            icon: 'evaluate',
            color: 'orange'
        }, {
            title: '入学须知',
            name: 'Dormitory',
            url: '../entrance/entrance',
            icon: 'notification',
            color: 'yellow'
        }, {
            title: '乘车路线',
            name: 'bus line',
            url: '../busline/busline',
            icon: 'deliver',
            color: 'brown'
        }, {
            title: '海河园地图',
            name: 'HaiheRiverPark',
            url: '../map/map',
            icon: 'global',
            color: 'green'
        }],
        mapImages: [{
            id: 15310156724975630292,
            url: 'https://cdn.ymkj8.com/topschool/school_map/电子.jpg'
        }, {
            id: 1132276838459656005,
            url: 'https://cdn.ymkj8.com/topschool/school_map/中德.jpg'
        }, {
            id: 9064819481832757240,
            url: 'https://cdn.ymkj8.com/topschool/school_map/轻工.jpg'
        }, {
            id: 5121864895957150075,
            url: 'https://cdn.ymkj8.com/topschool/school_map/现代.jpg'
        }, {
            id: 12964050169472583622,
            url: 'https://cdn.ymkj8.com/topschool/school_map/机电.jpg'
        }, {
            id: 6636179715655175228,
            url: 'https://cdn.ymkj8.com/topschool/school/职大.jpg'
        }, {
            id: 17425798441035415081,
            url: 'https://cdn.ymkj8.com/topschool/school_map/商务.jpg'
        }, {
            id: 3859587972726810660,
            url: 'https://cdn.ymkj8.com/topschool/school_map/海运.jpg'
        }]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var schoolId = getApp().globalData.school.id;
        if (!schoolId) {
            wx.showModal({
                title: '提示',
                content: '请等待定位完成或选择您的学校！',
                success(res) {
                    wx.navigateBack()
                }
            })
        }else{
            this.setData({
                mapUrl: this.findById(schoolId)
            })
        }
    },
    showimage: function (e) {
        wx.previewImage({
            current: this.data.mapUrl, // 当前显示图片的http链接
            urls: [this.data.mapUrl] // 需要预览的图片http链接列表
        })
    },
    findById: function (id) {
        for (let school of this.data.mapImages) {
            if (school.id == id) {
                return school.url;
            }
        }
        return false;
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})