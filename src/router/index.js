import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routers";
import store from "@/vuex/store";
import { baseName } from "@/js/config";
Vue.use(VueRouter);
function getAbsolutePath() {
    let path = location.pathname;
    return path.substring(0, path.lastIndexOf("/") + 1);
}
VueRouter.prototype.goBack = function() {
    this.isBack = true;
    window.history.go(-1);
};
const router = new VueRouter({
    mode: "history",
    base: baseName,
    routes
});
let toQuery = {};
/*时间戳*/
function setHtml_t(to, from, next, isIosWechat) {
    if (to.query.t) {
        next();
    } else if (from.query.t) {
        toQuery.t = from.query.t;
        next({
            path: to.path,
            query: toQuery
        });
    } else {
        toQuery.t = store.state.hash_t;
        next({
            path: to.path,
            query: toQuery
        });
    }
    /*if(!to.query.t&&store.state.reloadHtml&&isIosWechat){
        var newFullPath = to.fullPath.indexOf('?')!=-1?to.fullPath+'&t='+store.state.hash_t:to.fullPath+'?t='+store.state.hash_t;
        wechatHref(newFullPath)
    }*/
}
/*微信分享处理*/
function wechatHref(newFullPath) {
    window.location.assign(baseName + newFullPath);
}
router.beforeEach(function(to, from, next) {
    /*页面loading*/
    store.commit("loadingStatus", true);
    /*设置nav标题*/
    if (to.meta.title) {
        store.dispatch("setCurrentTitle", to.meta.title);
    } else {
        store.dispatch("setCurrentTitle", "");
    }

    /*ios微信 spa页面 只会保留首次地址  解决*/
    const userAgent = navigator.userAgent;
    const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    const isWechat = userAgent.indexOf("MicroMessenger") != -1; //微信客户端
    const isIosWechat =
        isWechat &&
        isiOS &&
        baseName + to.path !== location.pathname &&
        location.pathname.length < 50; /*微信分享处理*/

    /*页面刷新添加时间戳*/
    // setHtml_t(to,from,next);
    toQuery = JSON.parse(JSON.stringify(to.query));
    /*代理标识 query*/
    if (to.query.agent) {
        if (isIosWechat) {
            let newFullPath = to.fullPath;
            wechatHref(newFullPath);
        } else {
            next();
        }
    } else if (from.query.agent) {
        if (isIosWechat) {
            var newFullPath =
                to.fullPath.indexOf("?") != -1
                    ? to.fullPath + "&agent=" + from.query.agent
                    : to.fullPath + "?agent=" + from.query.agent;
            wechatHref(newFullPath);
        } else {
            toQuery.agent = from.query.agent;
            next({
                path: to.path,
                query: toQuery
            });
            //setHtml_t(to,from,next,isIosWechat);
        }
    } else {
        if (isIosWechat) {
            let newFullPath = to.fullPath;
            wechatHref(newFullPath);
        } else {
            next();
            // setHtml_t(to,from,next,isIosWechat);
        }
    }
});
router.afterEach(function(to, from) {
    store.commit("loadingStatus", false);
    window.scrollTo(0, 0);
});
export default router;
