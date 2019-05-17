// pages/confession/detail/detail.js
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        articleContent:{},
        commentList:[],
        other:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        _self = this
        console.log(options.cid)
        var reqData = {
            article_id: options.cid
        }
        app.graceRequest.get('https://apii.ym998.cn/confession/article/getContent', reqData, 1, function(data){
            _self.setData({
                articleContent:data.ArticleContent,
                commentList: data.comment_list,
                other:data.other
            })
            console.log(data)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})