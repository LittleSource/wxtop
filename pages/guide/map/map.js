var _self = null
Page({
    data: {
        windowHeight: 500, //可使用窗口高度
        modalShow: false,
        marker: {},
        markers: [],
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
                height: 25,
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E6%B0%B8%E6%97%BA%E5%9C%88.png",
                id: 31,
                title: '永旺梦乐城',
                latitude: 39.028883,
                longitude: 117.341321,
                width: 60,
                height: 60,
                detail: ['http://store.is.autonavi.com/showpic/50af0993e5f910e3870aef3e45850d73', 'http://store.is.autonavi.com/showpic/1a591334ded9d45bdb72669466d4dca0', 'http://store.is.autonavi.com/showpic/3ba3606900b3a130937d8467a877a8e7', 'http://store.is.autonavi.com/showpic/3a623c64f48f96fe39879e06f11432ff', 'http://store.is.autonavi.com/showpic/b1e875b4e6aa465ff3f3f731aa6a4c17?type=pic']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E6%9C%88%E5%9D%9B%E5%9C%88.png",
                id: 32,
                title: '月坛商厦',
                latitude: 38.988023,
                longitude: 117.387267,
                width: 60,
                height: 60,
                detail: ['http://store.is.autonavi.com/showpic/ea2df1c5559dedf0af466040f8d9f180', 'http://store.is.autonavi.com/showpic/48dcff8677796d0c3051fd482e09dbb1', 'http://store.is.autonavi.com/showpic/c3a6a09bb57add31106c5e5a1676b0f7', 'http://store.is.autonavi.com/showpic/248c24786006a5c7dd7848908a22a739', 'http://store.is.autonavi.com/showpic/b48e6052efce61c09709eb00d9d011bd']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E6%96%B0%E5%8D%8E%E5%9C%88.png",
                id: 33,
                title: '新华城市广场',
                latitude: 38.991460,
                longitude: 117.391050,
                width: 50,
                height: 50,
                detail: ['http://store.is.autonavi.com/showpic/fee0a111f9668c7278ec054ccbc024e1', 'http://store.is.autonavi.com/showpic/4f0fdfa852d1bb9eaaf77901a3446708', 'http://store.is.autonavi.com/showpic/bc8b5f41a9ec30c7e2d83bda4b46241b', 'http://store.is.autonavi.com/showpic/174e20353ab5ac0f727321039edfbb57', 'http://store.is.autonavi.com/showpic/23f3231e55974e11be12ca54ffc3ab46?type=pic']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%A4%90%E5%8E%85.png",
                id: 1,
                title: '沙县小吃',
                latitude: 39.006004,
                longitude: 117.384667,
                width: 21,
                height: 28,
                detail: ['http://p0.meituan.net/xianfu/56506df0a745642a3a5580793b1e1166378993.jpg%40249w_249h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20', 'http://p1.meituan.net/xianfudwm/5c48c87e5501e995e50b112d614cd83b216973.jpg%40249w_249h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E8%B6%85%E5%B8%82.png",
                id: 2,
                title: '幸福民声超市',
                latitude: 39.006291,
                longitude: 117.382624,
                width: 21,
                height: 28,
                detail: ['https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/map/pic/item/43a7d933c895d143c769a2c67df082025aaf0733.jpg']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E7%BD%91%E5%90%A7.png",
                id: 3,
                title: '网鱼网咖',
                latitude: 39.003207,
                longitude: 117.373188,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/8eb91de61c284990d14d3dd92b17755b', 'http://store.is.autonavi.com/showpic/020dbfe1d2494e9bae9a52995cad80e1', 'http://store.is.autonavi.com/showpic/745fcbb9197bbc99fb14bf4bd7bd4e41', 'http://aos-cdn-image.amap.com/sns/ugccomment/be6ffdc2-a740-4790-a121-bdf27915470f.jpg']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E8%B6%85%E5%B8%82.png",
                id: 4,
                title: '津城华联超市',
                latitude: 339.003786,
                longitude: 117.373882,
                width: 21,
                height: 28,
                detail: ['']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%A4%90%E5%8E%85.png",
                id: 5,
                title: '毛家川菜',
                latitude: 39.003094,
                longitude: 117.372989,
                width: 21,
                height: 28,
                detail: ['https://qcloud.dpfile.com/pc/Ya09TVgpAfdlFB5hHp5gPpYncdJGpakmbqNJAF0cOTGWuNpRCk5lQzhHOkJFKAf8.jpg', 'https://qcloud.dpfile.com/pc/zRhmrlEpC1d_4Ap6MGYKuKoG_MAaI4Kly4jEHU5S68YFHFxGOJtZhoAD7l3hnmGC.jpg', 'https://qcloud.dpfile.com/pc/HX-06Rr6rDnHbv0nY4Z55VQYEycsfeUmZrmHzFD1w0f2y5o8aoN_P8m9D9Q8eeWh.jpg']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E7%BD%91%E5%90%A7.png",
                id: 6,
                title: '黑白配网咖',
                latitude: 39.007480,
                longitude: 117.386674,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/8848bb2afef2b2817e5c189dd695b128', 'http://store.is.autonavi.com/showpic/b0d4956f3ff5af746c95dce6e996eac3', 'http://store.is.autonavi.com/showpic/927d82c65b938884c697d4fd502f1dd8', 'http://store.is.autonavi.com/showpic/b16ebd2bff657a25ced86855f8995576', 'http://store.is.autonavi.com/showpic/331a63ba08681759192dbae51bf27195']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%A4%90%E5%8E%85.png",
                id: 7,
                title: '张亮麻辣烫',
                latitude: 39.016445,
                longitude: 117.367512,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/3b0dbae86e263a414ad3cc57eba61a72', 'http://store.is.autonavi.com/showpic/29e4858b3e061434c95c9de5282960aa', 'http://store.is.autonavi.com/showpic/a1ae4981f3dcffc7363907839c83a213', 'http://store.is.autonavi.com/showpic/cb2fb00c2c40f3a10618b6e028c1c2f2', 'http://store.is.autonavi.com/showpic/30b96927959fc641dd07baff081d1f2e']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E7%BD%91%E5%90%A7.png",
                id: 8,
                title: '乐巢网咖',
                latitude: 39.016891,
                longitude: 117.366825,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/fa6d613ecde3e76ff58ac5aa91b8268b', 'http://store.is.autonavi.com/showpic/2eb7443a2471508f3899233951a17d40', 'http://store.is.autonavi.com/showpic/69b8312dd9650645a2a01d908c4ea5bd', 'http://store.is.autonavi.com/showpic/05760d7095975838fe17e2c7e87325b5', 'http://store.is.autonavi.com/showpic/d9ecb368901707694bd45564e64a9283']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E8%B6%85%E5%B8%82.png",
                id: 9,
                title: '紫丁香超市',
                latitude: 39.016891,
                longitude: 117.366949,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/36c611a3cac85f501605f8399d440cb6', 'http://store.is.autonavi.com/showpic/0b8f5a5a9ac9a3d9c016b8f093c2ae55', 'http://store.is.autonavi.com/showpic/774dd0e4339d92a4f6a3dbe718cbe0a1']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E6%97%85%E6%B8%B8.png",
                id: 10,
                title: '海河故道公园',
                latitude: 38.991776,
                longitude: 117.398124,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/3700c50deb1debf8e541c8c2cc981c2b?type=pic', 'http://store.is.autonavi.com/showpic/5ba5aa95eeb0d938fbdfa05a3a3d20f8', 'http://store.is.autonavi.com/showpic/a39704b0a12240aee40a0775b684e23b', 'http://store.is.autonavi.com/showpic/0ef7bd0c1345c9bf3c1375ed9e8cf26a', 'http://store.is.autonavi.com/showpic/e12b3d3d7620c576ce9367fc064971c0']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%85%92%E5%BA%97.png",
                id: 11,
                title: '天津海河园区酒店',
                latitude: 39.004353,
                longitude: 117.375269,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/b0f07d77c4d30ac5bcb6c714221bb22b', 'http://store.is.autonavi.com/showpic/117eba016e674caa4d051d4ffde9857d', 'http://store.is.autonavi.com/showpic/a630791cdd38f8488394b91ba638200e', 'http://store.is.autonavi.com/showpic/5d517c30d4e0ca482507de77046c4eb9']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%85%92%E5%BA%97.png",
                id: 12,
                title: '海河文华大酒店',
                latitude: 39.015716,
                longitude: 117.374915,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/d5927f93d94ad90b6d926e6c445c55ac']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%85%92%E5%BA%97.png",
                id: 13,
                title: '天津广川大酒店',
                latitude: 38.987831,
                longitude: 117.409145,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/d71f3d1373e15845f08614833c37af99', 'http://store.is.autonavi.com/showpic/d4ff98cf86909556185d6e2947bbcf6b', 'http://store.is.autonavi.com/showpic/24f7d834d22ca3631789f65073f65a4d', 'http://store.is.autonavi.com/showpic/63341c84006de92983a274e16fadd11d', 'http://store.is.autonavi.com/showpic/744191f9f461553fb7b88fd37c259123']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%85%92%E5%BA%97.png",
                id: 14,
                title: '百利恒快捷宾馆',
                latitude: 39.021847,
                longitude: 117.325235,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/3512fd2a17b22b2f3dc93727d6984afb', 'http://store.is.autonavi.com/showpic/e6fef6c03a9012fba19ef38997c98ec1', 'http://store.is.autonavi.com/showpic/a7d3d5f2dd5d81cc43ec389c1ed246a8', 'http://store.is.autonavi.com/showpic/0d2f1002ffce0cfbcb3cb213962b3cde', 'http://store.is.autonavi.com/showpic/08563a0b57a4cefaa146e8c78b600b48']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E6%8E%A8%E8%8D%90.png",
                id: 15,
                title: '津厨艺',
                latitude: 39.007084,
                longitude: 117.385456,
                width: 25,
                height: 32,
                detail: ['http://store.is.autonavi.com/showpic/baf111861fa124d12268045d32d3d498', 'http://store.is.autonavi.com/showpic/a22bbe207ead490ad5896b6f3375979e', 'http://store.is.autonavi.com/showpic/78d6224b8bbc5c5aea667e75a9be5da2', 'http://store.is.autonavi.com/showpic/b0e2f542c8b10353262488543863f00a', 'http://store.is.autonavi.com/showpic/09264c36296b42b7ec18de7a6f6e096c']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%A4%90%E5%8E%85.png",
                id: 16,
                title: '888串吧',
                latitude: 39.006892,
                longitude: 117.385129,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/10387bbb454be07792ec276432db3181', 'http://store.is.autonavi.com/showpic/d5915886353ae8c97a0d07b949bad608', 'http://store.is.autonavi.com/showpic/a43b1a220f006e5f8acbd753acc5dee0', 'http://store.is.autonavi.com/showpic/ae327ec9388b626066b62ce7d8e54b58', 'http://store.is.autonavi.com/showpic/5499c40ca7e28c3b62d047471ba6843a']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E8%B6%85%E5%B8%82.png",
                id: 17,
                title: '友富烟茶酒超市',
                latitude: 39.005558,
                longitude: 117.385145,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/96b85e866adabf5dd6b8c3ae834a1598']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%A4%90%E5%8E%85.png",
                id: 18,
                title: '驴肉火烧',
                latitude: 39.006996,
                longitude: 117.385413,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/7ec40405daffd3739e46efa305414151', 'http://store.is.autonavi.com/showpic/46278b608f90b0b4c6d1f7909c0f1516', 'http://store.is.autonavi.com/showpic/10531a352857d3b975bbd21651d6efaa', 'http://store.is.autonavi.com/showpic/93c6cbda46d83a960d1e87116c4979ea', 'http://store.is.autonavi.com/showpic/ed4add65af6f90470a3d12bd71f47b06']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E8%B6%85%E5%B8%82.png",
                id: 19,
                title: '世纪华联超市',
                latitude: 39.006221,
                longitude: 117.385177,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/b56fb8f837c6006e737948b920866aca', 'http://store.is.autonavi.com/showpic/e8f0bb1b23d48ea462f5a267430b0bcd', 'http://store.is.autonavi.com/showpic/68962bfdf679435094eac50377784690']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%A4%90%E5%8E%85.png",
                id: 20,
                title: '西加咖啡',
                latitude: 39.006396,
                longitude: 117.384399,
                width: 21,
                height: 28,
                detail: ['https://qcloud.dpfile.com/pc/cD7gJDSxLhiIpi-zS5S0Ttt-0COnDgwYDHiwmM4DhndLo9x5UsuOIi-hAcqWSUqG0scohmss9LtJWg-k-u7I4UHdS9p3h7-h2wfpsWVfxX8nY08TQIxe-DkxF3-YDtNHvJLBPMnbGaim65JmQfWVIQ.jpg', 'https://qcloud.dpfile.com/pc/Z3ER237VXKadA-FCwkerq15muuf8CpfbnWYghYsprYZ8Z4e2JHCAZIPl2_vT5OtW0scohmss9LtJWg-k-u7I4UHdS9p3h7-h2wfpsWVfxX8nY08TQIxe-DkxF3-YDtNHvJLBPMnbGaim65JmQfWVIQ.jpg', 'https://qcloud.dpfile.com/pc/-2AmOiQifNIQc0gxR6d9fO8KqHLOpJlm3aNyq1spcyWcyyPFXU0Wvc-Zrvu4yj8-0scohmss9LtJWg-k-u7I4UHdS9p3h7-h2wfpsWVfxX8nY08TQIxe-DkxF3-YDtNHvJLBPMnbGaim65JmQfWVIQ.jpg']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%A4%90%E5%8E%85.png",
                id: 21,
                title: '牛肉板面',
                latitude: 39.015120,
                longitude: 117.369395,
                width: 21,
                height: 28,
                    detail: ['http://store.is.autonavi.com/showpic/4366e564b01f166e0c5d05fc1243d9ce']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%A4%90%E5%8E%85.png",
                id: 22,
                title: '黄焖鸡米饭',
                latitude: 39.016620,
                longitude: 117.367276,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/b701c8165f0c7a75044dec20fb05faf3', 'http://store.is.autonavi.com/showpic/35e3ea9b2716a81f6e81fa39d25d7061', 'http://store.is.autonavi.com/showpic/1c02b9ea85a48546cf076e85d52f894f', 'http://store.is.autonavi.com/showpic/6d4176176560534dd7120d1a361d7188', 'http://store.is.autonavi.com/showpic/d3e0d4185d36e497d53b245f9620d1b8']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E8%B6%85%E5%B8%82.png",
                id: 23,
                title: '世纪好又多超市',
                latitude: 39.002444,
                longitude: 117.377050,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/cb2e2a12b6efd07d128478e792e893ed']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E9%85%92%E5%BA%97.png",
                id: 24,
                title: '天津博雅风情主题宾馆',
                latitude: 39.003077,
                longitude: 117.375982,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/f1f7c671a2954f9c82e70b7ca0072942', 'http://store.is.autonavi.com/showpic/34f0182fb468398a27a7b99b8f5480da', 'http://store.is.autonavi.com/showpic/fbf5d121f3b1c0643a5581b5da6b6d1d', 'http://store.is.autonavi.com/showpic/8e587d62d323c7a6029b9b486fd4d989', 'http://store.is.autonavi.com/showpic/9c7752c3c5d0e9518b2b84908cd9443f']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E5%A8%B1%E4%B9%90.png",
                id: 25,
                title: '唱吧麦颂量版KTV',
                latitude: 39.003569,
                longitude: 117.373676,
                width: 21,
                height: 28,
                detail: ['http://aos-cdn-image.amap.com/sns/ugccomment/1e47a8c7-43b7-496e-83ba-8bcdb4497aa5.jpg', 'http://store.is.autonavi.com/showpic/b3039fd4ad3fbcefc7f136166b512511', 'http://store.is.autonavi.com/showpic/04a21a72c2d86afae6798d4ad281542b']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E5%A8%B1%E4%B9%90.png",
                id: 26,
                title: '亿君酒吧',
                latitude: 39.003565,
                longitude: 117.374405,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/e1043a8ee7218ad564b1f3c6e6008467', 'http://store.is.autonavi.com/showpic/99e5930d682785181f94913ed8879be6', 'http://store.is.autonavi.com/showpic/7737af8727a64d590c6d6e449b27a507', 'http://store.is.autonavi.com/showpic/76ed5857142c344554702a6eef5dc7c2']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E5%A8%B1%E4%B9%90.png",
                id: 27,
                title: '二月酒馆',
                latitude: 39.003248,
                longitude: 117.373230,
                width: 21,
                height: 28,
                detail: ['https://qcloud.dpfile.com/pc/dfmPDlUQGstxvgc67gma50DDJQSUKUa5cXCLdm2vXN2BIyGHOMGHtHbXfqxk0-SJjoJrvItByyS4HHaWdXyO_I7F0UeCRQYMHlogzbt7GHgNNiIYVnHvzugZCuBITtvjski7YaLlHpkrQUr5euoQrg.jpg', 'https://qcloud.dpfile.com/pc/-yifSQ8WuALcsN6SLHIjU3x1bVBpvlpRwoCCGk8FkQ9F8y9SSCj5PBLbkxBQdMpfjoJrvItByyS4HHaWdXyO_I7F0UeCRQYMHlogzbt7GHgNNiIYVnHvzugZCuBITtvjski7YaLlHpkrQUr5euoQrg.jpg', 'https://qcloud.dpfile.com/pc/QBXopzakUXFawGGwC6AE9yTDu6sorUPsT8nVeBv_aCix20mSGk1zwOmSPq4NmzbbjoJrvItByyS4HHaWdXyO_I7F0UeCRQYMHlogzbt7GHgNNiIYVnHvzugZCuBITtvjski7YaLlHpkrQUr5euoQrg.jpg', 'https://qcloud.dpfile.com/pc/aFMAQ_xDbKM3aWknDgZl-8jb1CyHG2eNYQfiTlpvd6QaWV7jnGXDu6q3ZNCC13oojoJrvItByyS4HHaWdXyO_I7F0UeCRQYMHlogzbt7GHgNNiIYVnHvzugZCuBITtvjski7YaLlHpkrQUr5euoQrg.jpg', 'https://qcloud.dpfile.com/pc/61-E5HR68qRi7BXeNpoSKWK4PjnqGgl9Z3hVRfnSajlsTeIr2aCMaHH68yy7KIpMjoJrvItByyS4HHaWdXyO_I7F0UeCRQYMHlogzbt7GHgNNiIYVnHvzugZCuBITtvjski7YaLlHpkrQUr5euoQrg.jpg']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E5%A8%B1%E4%B9%90.png",
                id: 28,
                title: '约启酒吧',
                latitude: 39.002581,
                longitude: 117.372458,
                width: 21,
                height: 28,
                detail: ['https://qcloud.dpfile.com/pc/JYDFqzgsePBDhZ4gjT4tmUjlgu6IbtOb2oya1uTbBLi5mXMoyKlof2KXQ0NvcOiz.jpg', 'https://qcloud.dpfile.com/pc/ly5rN53nU6lkje1nBOTGPYBO9aKRNVlN1FAk128brNjbG9ciVZuxF6IX_GtgPLDo.jpg', 'https://qcloud.dpfile.com/pc/hZysG_9O0B0zK0LnRejgspm2CYPD2zxM9YHAl1tS6Wn0SH8sy_fRoi63pNvnpJlo.jpg', 'https://qcloud.dpfile.com/pc/_rvy0piTaujzaxJdHzy4VJPYFTo5SMNgUL6eMOcoCuQeT-Jn-eHwbyZU8rCdj2Tp.jpg', 'https://qcloud.dpfile.com/pc/yQagFcxB62Xo2gqtZxZ9QHm2H6gySVKrwVoa-DnM9NwDY_ZFhBScrG7sKiYM3WjS.jpg']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E5%A8%B1%E4%B9%90.png",
                id: 29,
                title: '初遇Bar酒吧',
                latitude: 39.002406,
                longitude: 117.372297,
                width: 21,
                height: 28,
                detail: ['http://store.is.autonavi.com/showpic/29915215e055a9fa5fbe36d88a5ea764', 'http://store.is.autonavi.com/showpic/8fcf103a3e0718d41b1dbfb767714525', 'http://store.is.autonavi.com/showpic/5d90e8ff3c7fd26cfde997133cb9c841']
            }, {
                iconPath: "https://cdn.ymkj8.com/topschool/map/%E7%BD%91%E5%90%A7.png",
                id: 30,
                title: '云时代网吧',
                latitude: 39.006225,
                longitude: 117.385204,
                width: 21,
                height: 28,
                detail: ['http://aos-cdn-image.amap.com/sns/ugccomment/9637e080-2616-410e-96e0-8aac96a4173d.jpg', 'http://aos-cdn-image.amap.com/sns/ugccomment/d3ac9942-3916-4706-bba1-85df94aa215b.jpg']
            }]
        })
    },
    showPopup(e) {
        if (e.markerId){
            this.setData({
                marker: this.findDetail(e.markerId),
                modalShow: true
            })
        }
    },
    hideModal() {
        this.setData({
            modalShow: false
        })
    },
    findDetail: function(markerId) {
        for (let marker of this.data.markers) {
            if (marker.id == markerId) {
                return marker;
            }
        }
        return false;
    },
    showimage: function (e) {
        wx.previewImage({
            current: _self.data.marker.detail[e.currentTarget.dataset.index], 
            urls: _self.data.marker.detail
        })
    },
})