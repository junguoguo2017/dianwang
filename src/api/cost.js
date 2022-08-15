import { service, baseURL } from "@/js/http";
//查询户号
export const queryAccount = params => {
    return service({ url: "/ele/inquire", method: "get", params: params });
};
// 增加一个户号
export const addAccount = params => {
    return service({
        url: "/dianwang/account/add",
        method: "post",
        data: params
    });
};
// 支付
export const prePay = params => {
    return service({
        url: "/dianwang/order/prePay",
        method: "post",
        data: params
    });
};
// 查询户号列表
export const accountRecord = params => {
    return service({
        url: "/dianwang/account/records",
        method: "post",
        data: params
    });
};
// 根据id 查询户号信息
export const queryOneAccount = params => {
    return service({
        url: "/dianwang/account/find",
        method: "get",
        params: params
    });
};
//删除户号
export const delOneAccount = params => {
    return service({
        url: "/dianwang/account/delete",
        method: "post",
        data: params
    });
};
// 订单记录
export const orderRecord = params => {
    return service({
        url: "/dianwang/order/records",
        method: "post",
        data: params
    });
};
// 订单状态
export const orderStatus = params => {
    return service({
        url: "/dianwang/order/find",
        method: "get",
        params: params
    });
};

// 获取首页banner 已经 帮助

export const getHomeInit = params => {
    return service({
        url: "/dianwang/index",
        method: "get",
        params: params
    });
};
// 微信支付授权
export const weixinOauth = params => {
    return service({
        url: "/weixin/oauth",
        method: "get",
        params: params
    });
};

// 将参数转换成功 formdata 接收格式
function formDataStringify(data) {
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key]) {
                if (data[key].constructor === Array) {
                    if (data[key][0]) {
                        if (data[key][0].constructor === Object) {
                            formData.append(key, JSON.stringify(data[key]));
                        } else {
                            data[key].forEach((item, index) => {
                                formData.append(key + `[${index}]`, item);
                            });
                        }
                    } else {
                        formData.append(key + "[]", "");
                    }
                } else if (data[key].constructor === Object) {
                    formData.append(key, JSON.stringify(data[key]));
                } else {
                    formData.append(key, data[key]);
                }
            } else {
                if (data[key] === 0) {
                    formData.append(key, 0);
                } else {
                    formData.append(key, "");
                }
            }
        }
    }
    return formData;
}
// 支付宝支付授权
export const aliOauth = params => {
    return service({
        url: "/alipay/getUserInfo",
        method: "post",
        data: params,
        transformRequest: [
            function(data) {
                // 将请求数据转换成功 formdata 接收格式
                return formDataStringify(data);
            }
        ],
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};
