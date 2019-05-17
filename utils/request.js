/*
graceUI-JS - 网络请求工具
link : graceui.hcoder.net
author : 5213606@qq.com 深海
*/

module.exports = {

    get: function(url, data, loadType, callback) {
        if (loadType === 1){
            wx.showLoading({
                title: '努力加载中...',
            })
        }
        wx.request({
            url: url,
            data: data,
            method: "GET",
            dataType: "json",
            success: (res) => {
                callback(res.data);
            },
            fail: () => {
                wx.showToast({
                    title: "网络请求失败",
                    icon: "none"
                });
            },
            complete: () => {
                switch (loadType) {
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

    post: function(url, data, contentType, headers, loadType, callback) {
        switch (contentType) {
            case "form":
                var headerObj = {
                    'content-type': 'application/x-www-form-urlencoded'
                };
                break;
            case "json":
                var headerObj = {
                    'content-type': 'application/json'
                };
                break;
            default:
                var headerObj = {
                    'content-type': 'application/json'
                };
        }
        for (let k in headers) {
            headerObj[k] = headers[k];
        }
        wx.request({
            url: url,
            data: data,
            method: "POST",
            dataType: "json",
            header: headerObj,
            success: (res) => {
                callback(res.data);
            },
            fail: () => {
                wx.showToast({
                    title: "网络请求失败",
                    icon: "none"
                });
            },
            complete: () => {
                switch (loadType) {
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