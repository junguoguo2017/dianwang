// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import "@/style/h5Mobile.css";
import "@/style/reset.css";
import "@/style/iconfont.css";
import "@/style/common.less";
import "@/js/resetRem";
import "animate.css";
import global from "@/pages/components/global";
import store from "@/vuex/store";
import router from "@/router/index";
import "@/font/svgicon/index";

import "babel-polyfill";
import Es6Promise from "es6-promise";
require("es6-promise").polyfill();
Es6Promise.polyfill();

Vue.prototype.$goRouter = function(path) {
    router.push(path);
};
Vue.prototype.$replaceRouter = function(path) {
    router.replace(path);
};

//这里就是对组件的绑定

import "@/pages/components/toast/index.js";

Vue.config.productionTip = false;
Vue.use(global);
/*vant-ui 组件*/
import { ActionSheet, Dialog, Picker, Popup, Row, Col } from "vant";

Vue.use(Dialog);
Vue.use(ActionSheet);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Row).use(Col);
// import  '@/pages/components/confirm/index.js'
// Vue.prototype.$showToast  = function (opts) {
//     store.state.self.$toast({
//         type:opts.type||'text',
//         position:opts.pos||'middle',
//         mask:false,
//         forbidClick:true,
//         message:opts.message||'提示',
//         duration:opts.duration||500
//     });
// }

//图片预览插件
//图片预览插件
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
var options = {
    fullscreenEl: false //关闭全屏按钮
};
Vue.use(preview, options);
/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
});
