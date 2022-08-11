import {service,baseURL} from  '@/js/http'
//查询户号
export const queryAccount = (params) => {
    return service({ url: "/ele/inquire", method: "get", params: params });
};

export const addAccount = (params) => {
    return service({
        url: "/dianwang/account/add",
        method: "post",
        data: params,
    });
};
export const prePay = (params) => {
    return service({
        url: "/dianwang/order/prePay",
        method: "post",
        data: params,
    });
};
// 查询户号列表
export const accountRecord = (params) => {
    return service({
        url: "/dianwang/account/records",
        method: "post",
        data: params,
    });
};
// 根据id 查询户号信息
export const queryOneAccount = (params) => {
    return service({
        url: "/dianwang/account/find",
        method: "get",
        params: params,
    });
};

export const delOneAccount = (params) => {
    return service({
        url: "/dianwang/account/delete",
        method: "post",
        data: params,
    });
};
export const orderRecord = (params) => {
    return service({
        url: "/dianwang/order/records",
        method: "post",
        data: params,
    });
};

export const orderStatus = (params) => {
    return service({
        url: "/dianwang/order/find",
        method: "get",
        params: params,
    });
};

// 获取首页banner 已经 帮助

export const getHomeInit = (params) => {
    return service({
        url: "/dianwang/index",
        method: "get",
        params: params,
    });
};
// 支付授权
export const weixinOauth = (params) => {
    return service({
        url: "/weixin/oauth",
        method: "get",
        params: params,
    });
};
