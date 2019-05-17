// pages/expressage/placeorder/placeorder.js
var graceChecker = require("../../../utils/graceChecker.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    price: 2,
    name: "",//姓名
    phone: "",//手机号
    buildingNo: "",//楼号
    dorNo: "",//宿舍号(床号)
    code: "",//取货码
    type: ['小件', '大件'],//类型(大件小件)
    index: 0,
    remark: ""//备注
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  },
  /**
   * 获取微信端地址
  */
  openAddress:function(){
    var _self = this
    wx.chooseAddress({
      success(res) {
        _self.setData({
          name: res.userName,
          phone: res.telNumber
        })
      },
      fail(){
        wx.showToast({
          title: '自动获取地址信息失败！',
          icon: 'none'
        })
      }
    })
  },
  /*
  *快递规格改变触发
  */
  typeChange: function (e) {
    if (e.detail.value == 1){
      this.setData({
        price: 3
      })
    }else{
      this.setData({
        price: 2
      })
    }
    this.setData({
      index: e.detail.value
    })
  },
  /*
  *用户提交表单事件
  */
  formSubmit(e) {
    console.log(e.detail.value)
    //定义表单规则
    var rule = [
      { name: "name", checkType: "string", checkRule: "1,3", errorMsg: "请输入正确的姓名！" },
      { name: "phone", checkType: "phoneno", checkRule: "", errorMsg: "手机号输入错误！" },
      { name: "dorNo", checkType: "notnull", checkRule: "", errorMsg: "宿舍号不能为空！" },
      { name: "code", checkType: "notnull", checkRule: "", errorMsg: "取货码不能为空！" },
      { name: "type", checkType: "notnull", checkRule: "", errorMsg: "快件规格选择错误！" }
    ]
    //进行表单检查
    var formData = e.detail.value
    var checkRes = graceChecker.check(formData, rule)
    if (checkRes) {
      wx.showToast({ title: "提交成功!"})
    } else {
      wx.showToast({ title: graceChecker.error, icon: "none" })
    }
  }
})