// pages/common/consociation/consociation.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        width:1080,
        height:4592
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var bi = this.data.height / this.data.width
        try {
            const res = wx.getSystemInfoSync()
            this.setData({
                height: res.screenWidth * bi
            })
        } catch (e) {
            // Do something when catch error
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})