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
    request: function(ReqData) {
        if (ReqData.loadType == 1) {
            wx.showLoading({
                title: '加载中',
            })
        }
        wx.request({
            url: ReqData.url,
            data: ReqData.data,
            method: ReqData.method,
            dataType: "json",
            success: (res) => {
                if (res.data.code == 200) {
                    ReqData.success(res.data);
                } else if (res.data.code == 301) {
                    wx.showToast({
                        title: '身份过期，请重新登录',
                        icon: "none"
                    });
                } else {
                    var msg = '';
                    if (res.data.msg == undefined) {
                        if (res.statusCode == 200){
                            msg = '服务器错误，请稍后重试' + res.errMsg
                        }else{
                            msg = res.statusCode + res.errMsg
                        }
                    } else {
                        msg = res.data.msg
                    }
                    wx.showToast({
                        title: msg,
                        icon: "none"
                    });
                }
            },
            fail: (e) => {
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