// pages/leave/message/message.js
var date = require("../../../utils/date.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayDate: '',
    startTime: '',
    endTime: '',
    data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _self = this
    var nowTime = new Date().getTime() / 1000;
    var todayDate = date.formatDateTime(nowTime)
    var startTime = date.formatDateTime((nowTime - 3600), 'formstr')
    var endTime = date.formatDateTime((nowTime + 86400), 'formstr')
   
   
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('info', data => {
      _self.setData({
        data: data
      })
      console.log(_self.data);
    })
    
    _self.setData({

      todayDate: todayDate[1] +  '月' + todayDate[2] +  '日' +  ' ' + todayDate[3] + ':' + todayDate[4] ,
      startTime: startTime,
      endTime: endTime,
      
    })
   
  },
  agreed() {
    let _self = this
    let data = _self.data.data
    console.log(data);
    wx.navigateTo({
      url: '/pages/leave/info/info',
      success(res) {
          res.eventChannel.emit('message', data)
          console.log(data);
      }
      
    })
},
 
})