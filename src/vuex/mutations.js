import * as types from "./mutationsType";
import { getCookie, getQuery } from "@/js/util";
import { agentStatus } from "@/api/api";
import router from "@/router/index";
import { domainUrl } from "@/js/http";
export default {
    [types.INIT](state, val = {}) {
        const { self = null } = val;
        if (self) {
            state.self = self;
        }

        if (val.client) {
            //客户端交互
            state.client = val.client;
            state.token = val.token;
            state.version = val.version;
            state.from_app = val.from_app;
            console.log("platform", val.from_app);
        } else if (localStorage.token) {
            state.token = localStorage.token ? localStorage.token : "";
        } else {
            console.log("no platform,token");
        }
        state.uid = localStorage.uid ? localStorage.uid : ""; //getCookie('uid')?getCookie('uid'):'';
    },
    [types.SETCURRENT_TITLE](state, val) {
        //设置当前页面标题
        state.currentTitle = val;
        document.title = val;
        /*解决qq网页无法设置title*/
        var i = document.createElement("iframe");
        i.src = domainUrl + "/favicon.ico";
        i.style.display = "none";
        i.onload = function() {
            setTimeout(function() {
                i.remove();
            }, 9);
        };
        document.title = val;
        document.body.appendChild(i);
    },
    getUserInfo(state, val) {
        if (val) {
            state.userInfoData = val;
            localStorage.userInfo = JSON.stringify(val);
        } else if (localStorage.userInfo) {
            state.userInfoData = JSON.parse(localStorage.userInfo);
        }
    },
    setPage_animation(state, val) {
        //页面动画
        state.page_animation = val;
    },
    getinquiryItemData(state, val) {
        //获取查询输入页面 信息
        state.inquiryItemData = val;
    },
    loadingStatus(state, val) {
        state.pageloading = val;
    },
    loginStatus(state, val) {
        //记录登录状态
        /*客户端*/
        state.globalIsLogin = val;
    },
    getAgentCode(state) {
        //获取代理人推广码
        state.agent = localStorage.agent;
    },
    /*获取token*/
    getToken(state, val) {
        if (val) {
            state.token = val;
        } else {
            state.token = "";
        }
    },
    /*获取微信openid*/
    getUid(state, val) {
        if (val) {
            state.uid = val;
        } else {
            state.uid = "";
        }
    },
    /*下拉刷新控制*/
    setRefreshTouch(state, val) {
        state.refreshTouch = val;
    },
    setCustomShow(state, val) {
        state.customShow = val;
    },
    setShowLogin(state, val) {
        /*h5登录登录状态*/
        state.showLogin = val;
    },
    setRefreshPage(state, val) {
        /*h5登录成功 重载当前页*/
        state.refreshPage = val;
    },
    setWechatSharedate(state, val) {
        state.shareData = {
            title: val.title,
            desc: val.desc,
            imgUrl: val.imgUrl
        };
    },
    setReloadStatus(state, val) {
        /*监听页面是否刷新*/
        state.reloadHtml = val;
    }
};
