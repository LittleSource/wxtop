/*
topReq网络请求工具
link : www.ym998.cn
author : 444168950@qq.com 源哥
ReqData{
   url:'',
   loadType:1显示加载中并关闭 2会自动关闭下拉刷新
   success:function(){},
}
*/

module.exports = {
    get: function(ReqData) {
        if (ReqData.loadType == 1) {
            wx.showLoading({
                title: '加载中...',
            })
        }
        wx.request({
            url: ReqData.url,
            data: ReqData.data,
            method: "GET",
            dataType: "json",
            success: (res) => {
                if (res.data.code == 200) {
                    ReqData.success(res.data);
                } else if (res.data.code == 301) {

                } else {
                    var msg = '';
                    if (res.data.msg == undefined) {
                        msg = res.statusCode + res.errMsg
                    } else {
                        msg = res.data.msg
                    }
                    wx.showToast({
                        title: msg,
                        icon: "none"
                    });
                }
            },
            fail: () => {
                wx.showToast({
                    title: "网络请求失败",
                    icon: "none"
                });
            },
            complete: () => {
                switch (ReqData.loadType) {
                    case 1:
                        wx.hideLoading();
                        break;
                    case 2:
                        wx.stopPullDownRefresh();
                        break;
                    default:
                        break;
                }
            }
        });
    },

    post: function(ReqData) {
        if (ReqData.loadType == 1) {
            wx.showLoading({
                title: '加载中...',
            })
        }
        wx.request({
            url: ReqData.url,
            data: ReqData.data,
            method: "POST",
            success: (res) => {
                ReqData.success(res.data);
            },
            fail: () => {
                wx.showToast({
                    title: "网络请求失败",
                    icon: "none"
                });
            },
            complete: () => {
                switch (ReqData.loadType) {
                    case 1:
                        wx.hideLoading();
                        break;
                    case 2:
                        wx.stopPullDownRefresh();
                        break;
                    default:
                        break;
                }
            }
        });
    }
}