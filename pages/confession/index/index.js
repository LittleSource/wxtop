// pages/confession/index/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardsList:[],
    nextPage:2,   //下一页
    totalPages:0,  //总页数
    loadingShow: false,
    loadingStyle: ['bg-gray load-icon loading','bg-gray over',,'bg-red erro'],
    loadingIndex: -1
  },

  /**
   * 监听页面加载
   */
  onLoad: function (options) {
    //获取缓存
    const confessionList = wx.getStorageSync('confessionList')
    if (confessionList) {
      this.setData({
        cardsList: confessionList
      })
    }
    wx.startPullDownRefresh();
  },

  /**
   * 监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var _self = this
    app.graceRequest.get(
      'https://apii.ym998.cn/confession/card/index', {page:1}, 2,
      function (res) {
        _self.setData({
          totalPages: res.totalPages,
          cardsList: res.cardsList
        })
        wx.setStorage({//缓存列表数据
          key: 'confessionList',
          data: res.cardsList
        })
      }
    )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.loadingIndex == 0) {//防止加载中重复请求
      return;
    }
    var _self = this
    if (this.data.nextPage <= this.data.totalPages){
      _self.setData({
        loadingShow: true,
        loadingIndex: 0
      })
      wx.request({
        url: 'https://apii.ym998.cn/confession/card/index',
        method: 'GET',
        data: {
          page: _self.data.nextPage
        },
        success(res) {
          _self.setData({
            nextPage: ++_self.data.nextPage,
            cardsList: _self.data.cardsList.concat(res.data.cardsList)
          })
        },fail(e){
          wx.showToast({ title: "网络请求失败", icon: "none" })
          _self.setData({
            loadingIndex: 2
          })
        }
      })
    }else{
      _self.setData({
        loadingIndex : 1
      })
    }
  },
  /**
   * 跳转到详情页面
   */
  goDetail: function (e) {
    wx.navigateTo({
        url: '../detail/detail?cid=' + e.currentTarget.dataset.cid,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})