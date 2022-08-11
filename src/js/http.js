import Vue from "vue";
import axios from "axios";
import store from "@/vuex/store.js";
import { getQuery } from "@/js/util";

// 创建axios实例
var url = document.location.toString();
var arrUrl = url.split("//");
export let domainUrl = arrUrl[0] + "//" + document.domain; //store.state.testDomain;//store.state.Domain;
let VConsole = require("../../node_modules/vconsole/dist/vconsole.min");
let vConsole = new VConsole(); //初始化
Vue.use(vConsole); //设为全局

if (process.env.NODE_ENV == "development") {
    /*开发环境域名写固定*/
    domainUrl = "http://dianwang.2020hhzf.com"; //document.location.host;
}
export const baseURL =
    process.env.NODE_ENV == "development" ? "/dev-api/api" : domainUrl + "/api";
export const service = axios.create({
    baseURL: baseURL,
    timeout: 15000
});
var agent = getQuery()["agent"]
    ? getQuery()["agent"]
    : localStorage.agent
    ? localStorage.agent
    : "";
let req_toast = null;
// request拦截器
service.interceptors.request.use(
    config => {
        req_toast = store.state.self.$showToast({
            message: "加载中...",
            type: "loading"
        });

        if (store.state.token != "") {
            config.headers["token"] = store.state.token; //getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        if (config.method == "post") {
            config.data = {
                ...config.data,
                uid: store.state.uid
            };
        } else if (config.method == "get") {
            config.params = {
                ...config.params,
                uid: store.state.uid
            };
        }
        return config;
    },
    error => {
        req_toast && req_toast.clear();
        store.state.self.$showToast({
            type: "fail",
            message: "网络异常"
        });
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        var res = response.data;
        req_toast && req_toast.clear();

        if (res.code === 200) {
            return response.data;
        }

        store.state.self.$showToast({
            type: "fail",
            message: res.message
        });
        return Promise.reject(res);
    },
    error => {
        req_toast && req_toast.clear();
        store.state.self.$showToast({
            type: "fail",
            message: "网络异常"
        });
        return Promise.reject(error); // 返回接口返回的错误信息
    }
);
