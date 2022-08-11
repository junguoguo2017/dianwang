import wx from 'weixin-js-sdk'			//微信sdk依赖
import store from '@/vuex/store.js'
import {domainUrl} from '@/js/http'
import {wechatShare} from '@/api/api'		// 封装的axios
const jsApiList = ['checkJsApi','onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']

function getJSSDK(link,successCb) {
    //let url = location.href;
    /*ios vue 微信分享链接分享为首页重定向*/
    let url = window.location.href;
    var params = {
        url:url
    };
    wechatShare(params).then(res => {
        if(res.code==1){
            store.commit('setWechatSharedate',
                {
                    title:res.data.title,
                    desc: res.data.desc,
                    imgUrl: res.data.imgUrl
                })
            wx.config({
                debug: res.data.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId:res.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature:res.data.signature,// 必填，签名
                jsApiList: res.data.jsApiList //

            })
            wx.ready(function () {
                wx.hideMenuItems({
                    menuList: ['menuItem:copyUrl'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                    success: function (res) {
                    }
                });
                //要用到微信API
                wx.checkJsApi({
                    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'],
                    success: function (res) {
                    }
                });
                // 2.1 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
                wx.onMenuShareTimeline({
                    title:store.state.shareData.title,
                    desc: store.state.shareData.desc,
                    imgUrl: store.state.shareData.imgUrl,
                    link:link,
                    trigger: function trigger(res) { },
                    success: function success(res) {
                        if(successCb){
                            successCb()
                        }
                    },
                    cancel: function cancel(res) {
                        store.state.self.$showToast({
                            message: '分享失败',
                            type:'fail'
                        })
                    },
                    fail: function fail(res) {

                    }
                });
                // 2.2 监听“微信好友”按钮点击、自定义分享内容及分享结果接口
                wx.onMenuShareAppMessage({
                    title: store.state.shareData.title,
                    desc: store.state.shareData.desc,
                    imgUrl:store.state.shareData.imgUrl,
                    link:link,
                    trigger: function trigger(res) {
                        // alert('用户点击分享到朋友圈');
                    },
                    success: function success(res) {
                        if(successCb){
                            successCb()
                        }
                    },
                    cancel: function cancel(res) {
                        store.state.self.$showToast({
                            message: '分享失败',
                            type:'fail'
                        })
                    },
                    fail: function fail(res) {

                    }
                });
                // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
                wx.onMenuShareQQ({
                    title:store.state.shareData.title,
                    desc: store.state.shareData.desc,
                    imgUrl:store.state.shareData.imgUrl,
                    link:link,
                    trigger: function trigger(res) {
                        //alert('用户点击分享到QQ');
                    },
                    complete: function complete(res) {
                    },
                    success: function success(res) {
                        if(successCb){
                            successCb()
                        }
                    },
                    cancel: function cancel(res) {
                        store.state.self.$showToast({
                            message: '分享失败',
                            type:'fail'
                        })
                    },
                    fail: function fail(res) {
                        //alert(JSON.stringify(res));
                    }
                });
                // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
                wx.onMenuShareQZone({
                    title: store.state.shareData.title,
                    desc: store.state.shareData.desc,
                    imgUrl: store.state.shareData.imgUrl,
                    link:link,
                    trigger: function trigger(res) {
                        //alert('用户点击分享到微博');
                    },
                    complete: function complete(res) {
                        // alert(JSON.stringify(res));
                    },
                    success: function success(res) {
                        if(successCb){
                            successCb()
                        }
                    },
                    cancel: function cancel(res) {
                        store.state.self.$showToast({
                            message: '分享失败',
                            type:'fail'
                        })
                    },
                    fail: function fail(res) {
                        // alert(JSON.stringify(res));
                    }
                });
                wx.onMenuShareWeibo({
                    title: store.state.shareData.title,
                    desc: store.state.shareData.desc,
                    imgUrl: store.state.shareData.imgUrl,
                    link:link,
                    trigger: function trigger(res) {
                        //alert('用户点击分享到微博');
                    },
                    complete: function complete(res) {
                        // alert(JSON.stringify(res));
                    },
                    success: function success(res) {
                        if(successCb){
                            successCb()
                        }
                    },
                    cancel: function cancel(res) {
                        store.state.self.$showToast({
                            message: '分享失败',
                            type:'fail'
                        })
                    },
                    fail: function fail(res) {
                        // alert(JSON.stringify(res));
                    }
                });

            })

            wx.error(function (res) {
                //alert("微信验证失败");
            });
        }
    })
}
export default {
    // 获取JSSDK
    getJSSDK: getJSSDK,
}

