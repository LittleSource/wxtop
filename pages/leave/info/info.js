var date = require("../../../utils/date.js");
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        number: 0,
        todayDate: '',
        data: null,
        userInfo: {},
        bottomDate: ''
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _self = this
        this.setData({
            userInfo: app.globalData.userInfo
        })
        console.log(userInfo);
        var nowdata = date.formatDateTime((new Date()).getTime() / 1000)
        var todayDate_ = nowdata[1] + '/' + nowdata[2]
        var number_ = "" + nowdata[0] + nowdata[1] + nowdata[2] + nowdata[3] + nowdata[4] + nowdata[5]
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('message', function (data) {
            data.startDate = data.startDate.replace(/-/g, '/');
            data.endDate = data.endDate.replace(/-/g, '/');
            var bottomDate_ = data.startDate.substr(5, 5);
            _self.setData({
                userInfo: app.globalData.userInfo,
                data: data,
                number: number_,
                todayDate: todayDate_,
                bottomDate: bottomDate_
            })
        })
    },
 
   
})