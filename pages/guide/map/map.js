var _self = null
Page({
    data: {
        windowHeight: 500, //可使用窗口高度
        modalShow:false,
        marker:{},
        markers: [],
        detail:[
            {
                id:1,
                title:'沙县小吃',
                imgs: ['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2326509728,1684856776&fm=15&gp=0.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566403452706&di=8aad77284767746ae24844da154cc191&imgtype=0&src=http%3A%2F%2Fqcloud.dpfile.com%2Fpc%2FdSJ9w0vgaH4ys17Ml15odGmc7Vrw6WVjqqzy1pRkuhSbQ3QAyS5ZgqVDp-olAAnOTYGVDmosZWTLal1WbWRW3A.jpg']
            }
        ]
    },
    onLoad() {
        _self = this
        this.setData({
            windowHeight: wx.getSystemInfoSync().windowHeight
        })
        _self.setData({
            markers: [{
                iconPath: getApp().globalData.userInfo.avatarUrl,
                id: 0,
                latitude: getApp().globalData.school.latitude,
                longitude: getApp().globalData.school.longitude,
                width: 25,
                height: 25
            }, {
                    iconPath: "http://tcdn.ym-top.com/map/%E6%B0%B8%E6%97%BA%E5%9C%88.png",
                id: 31,
                title: '永旺梦乐城',
                latitude: 39.028883,
                longitude: 117.341321,
                width: 60,
                height: 60
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E6%9C%88%E5%9D%9B%E5%9C%88.png",
                id: 32,
                title: '月坛商厦',
                latitude: 38.988023,
                longitude: 117.387267,
                width: 60,
                height: 60
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E6%96%B0%E5%8D%8E%E5%9C%88.png",
                id: 33,
                title: '新华城市广场',
                latitude: 38.991460,
                longitude: 117.391050,
                width: 50,
                height: 50
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%A4%90%E5%8E%85.png",
                id: 1,
                title: '沙县小吃',
                latitude: 39.006004,
                longitude: 117.384667,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E8%B6%85%E5%B8%82.png",
                id: 2,
                title: '幸福民声超市',
                latitude: 39.006291,
                longitude: 117.382624,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E7%BD%91%E5%90%A7.png",
                id: 3,
                title: '网鱼网咖',
                latitude: 39.003207,
                longitude: 117.373188,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E8%B6%85%E5%B8%82.png",
                id: 4,
                title: '津城华联超市',
                latitude: 339.003786,
                longitude: 117.373882,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%A4%90%E5%8E%85.png",
                id: 5,
                title: '毛家川菜',
                latitude: 39.003094,
                longitude: 117.372989,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E7%BD%91%E5%90%A7.png",
                id: 6,
                title: '黑白配网咖',
                latitude: 39.007480,
                longitude: 117.386674,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%A4%90%E5%8E%85.png",
                id: 7,
                title: '张亮麻辣烫',
                latitude: 39.016445,
                longitude: 117.367512,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E7%BD%91%E5%90%A7.png",
                id: 8,
                title: '乐巢网咖',
                latitude: 39.016891,
                longitude: 117.366825,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E8%B6%85%E5%B8%82.png",
                id: 9,
                title: '紫丁香超市',
                latitude: 39.016891,
                longitude: 117.366949,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E6%97%85%E6%B8%B8.png",
                id: 10,
                title: '海河故道公园',
                latitude: 38.991776,
                longitude: 117.398124,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%85%92%E5%BA%97.png",
                id: 11,
                title: '天津海河园区酒店',
                latitude: 39.004353,
                longitude: 117.375269,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%85%92%E5%BA%97.png",
                id: 12,
                title: '海河文华大酒店',
                latitude: 39.015716,
                longitude: 117.374915,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%85%92%E5%BA%97.png",
                id: 13,
                title: '天津广川大酒店',
                latitude: 38.987831,
                longitude: 117.409145,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%85%92%E5%BA%97.png",
                id: 14,
                title: '百利恒快捷宾馆',
                latitude: 39.021847,
                longitude: 117.325235,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%A4%90%E5%8E%85.png",
                id: 15,
                title: '津厨艺',
                latitude: 39.007134,
                longitude: 117.385477,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%A4%90%E5%8E%85.png",
                id: 16,
                title: '888串吧',
                latitude: 39.006892,
                longitude: 117.385129,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E8%B6%85%E5%B8%82.png",
                id: 17,
                title: '友富烟茶酒超市',
                latitude: 39.005558,
                longitude: 117.385145,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%A4%90%E5%8E%85.png",
                id: 18,
                title: '面霸面馆',
                latitude: 39.006996,
                longitude: 117.385413,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E8%B6%85%E5%B8%82.png",
                id: 19,
                title: '世纪华联超市',
                latitude: 39.006221,
                longitude: 117.385177,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%A4%90%E5%8E%85.png",
                id: 20,
                title: '西加咖啡',
                latitude: 39.006396,
                longitude: 117.384399,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%A4%90%E5%8E%85.png",
                id: 21,
                title: '牛肉板面',
                latitude: 39.015120,
                longitude: 117.369395,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%A4%90%E5%8E%85.png",
                id: 22,
                title: '黄焖鸡米饭',
                latitude: 39.016620,
                longitude: 117.367276,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E8%B6%85%E5%B8%82.png",
                id: 23,
                title: '世纪好又多超市',
                latitude: 39.002444,
                longitude: 117.377050,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E9%85%92%E5%BA%97.png",
                id: 24,
                title: '天津博雅风情主题宾馆',
                latitude: 39.003077,
                longitude: 117.375982,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E5%A8%B1%E4%B9%90.png",
                id: 25,
                title: '唱吧麦颂量版KTV',
                latitude: 39.003569,
                longitude: 117.373676,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E5%A8%B1%E4%B9%90.png",
                id: 26,
                title: '亿君酒吧',
                latitude: 39.003565,
                longitude: 117.374405,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E5%A8%B1%E4%B9%90.png",
                id: 27,
                title: '二月酒馆',
                latitude: 39.003248,
                longitude: 117.373230,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E5%A8%B1%E4%B9%90.png",
                id: 28,
                title: '约启酒吧',
                latitude: 39.002581,
                longitude: 117.372458,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E5%A8%B1%E4%B9%90.png",
                id: 29,
                title: '初遇Bar酒吧',
                latitude: 39.002406,
                longitude: 117.372297,
                width: 21,
                height: 28
            }, {
                iconPath: "http://tcdn.ym-top.com/map/%E7%BD%91%E5%90%A7.png",
                id: 30,
                title: '云时代网吧',
                latitude: 39.006225,
                longitude: 117.385204,
                width: 21,
                height: 28
            }]
        })
    },
    showPopup(e) {
        this.setData({
            marker: this.findDetail(e.markerId),
            modalShow:true
        })
    },
    hideModal(){
        this.setData({
            modalShow: false
        })
    },
    findDetail: function (markerId){
        for (let marker of this.data.detail) {
            if (marker.id == markerId) {
                return marker;
            }
        }
        return false;
    }
})