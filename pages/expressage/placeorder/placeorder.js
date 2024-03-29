// pages/expressage/placeorder/placeorder.js
const app = getApp()
var graceChecker = require("../../../utils/graceChecker.js");
var topSchool = require("../../../utils/top-school.js"); //引入封装topSchool
var topPay = require("../../../utils/top-pay.js"); //引入封装topPay
var _self = null
Page({
    /**
     * 页面的初始数据
     */
    data: {
        notice: [
            "①学校门口和菜鸟驿站都可以代取哦",
            "②无论是小姐姐还是小哥哥都可以送到宿舍",
            "③小件(2KG及以下)2元，大件(2KG以上)3元"
        ],
        expressageSchool: [],
        schoolIndex:0,
        price: 2,
        name: "", //姓名
        phone: "", //手机号
        buildingNo: "", //楼号
        dorNo: "", //宿舍号(床号)
        code: "", //取货码
        type: ['小件 (2kg以下)', '大件 (2kg及以上)'], //类型(大件小件)
        index: 0,
        remark: "", //备注
        addressShow:false,
        textareaShow:true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        _self = this
        _self.setData({
            expressageSchool: topSchool.getExpressageSchool()
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    /**
     * 获取微信端地址
     */
    openAddress: function() {
        wx.chooseAddress({
            success(res) {
                _self.setData({
                    name: res.userName,
                    phone: res.telNumber
                })
            },
            fail() {
                _self.setData({
                    addressShow:true,
                    textareaShow: false
                })
            }
        })
    },
    addressModelClose:function(){
        _self.setData({
            textareaShow: true
        })
    },
    /*
     *快递规格改变触发
     */
    typeChange: function(e) {
        if (e.detail.value == 1) {
            this.setData({
                price: 3
            })
        } else {
            this.setData({
                price: 2
            })
        }
        this.setData({
            index: e.detail.value
        })
    },
    schoolChange:function(e){
        this.setData({
            schoolIndex: e.detail.value
        })
    },
    /*
     *用户提交表单事件
     */
    formSubmit(e) {
        //定义表单规则
        var rule = [{
                name: "name",
                checkType: "string",
                checkRule: "1,3",
                errorMsg: "请输入正确的姓名！"
            },
            {
                name: "phone",
                checkType: "phoneno",
                checkRule: "",
                errorMsg: "手机号输入错误！"
            },
            {
                name: "dorNo",
                checkType: "notnull",
                checkRule: "",
                errorMsg: "宿舍号不能为空！"
            },
            {
                name: "shortmessage",
                checkType: "notnull",
                checkRule: "",
                errorMsg: "取件短信不能为空！"
            },
            {
                name: "type",
                checkType: "notnull",
                checkRule: "",
                errorMsg: "快件规格选择错误！"
            }
        ]
        //进行表单检查
        var formData = e.detail.value
        var checkRes = graceChecker.check(formData, rule)
        if (checkRes) {
            app.topReq({
                loadType: 1,
                url: app.globalData.serviceSrc + 'payment/expressage/createReplaceOrder',
                method: 'POST',
                data: {
                    token: app.globalData.userInfo.token,
                    orderData: JSON.stringify(formData),
                    reqType:1
                },
                success: function (res) {
                    topPay.startPay(res.data, '/pages/expressage/inquireorder/inquireorder', _self.data.price)
                }
            })
        } else {
            wx.showToast({
                title: graceChecker.error,
                icon: "none"
            })
        }
    }
})