const common = [
    {
        path: "/creditInquiry",
        name: "creditInquiry",
        meta: {
            keepAlive: true,
            title: "征信查询"
        },
        component: () => import("@/pages/home/creditInquiry.vue")
    },
    {
        path: "/inquiry",
        name: "inquiry",
        meta: {
            keepAlive: true,
            title: "检测"
        },
        component: () => import("@/pages/home/inquiry.vue")
    },
    {
        path: "/inquiry_callback",
        name: "inquiry_callback",
        meta: {
            keepAlive: false,
            title: "报告正在生成"
        },
        component: () => import("@/pages/otherPage/inquiry_callback.vue")
    },
    {
        path: "/report",
        name: "report",
        meta: {
            keepAlive: false,
            title: "报告详情"
        },
        component: () => import("@/pages/home/report/report.vue")
    },
    {
        path: "/check_order",
        name: "check_order",
        meta: {
            keepAlive: false,
            title: "核对订单"
        },
        component: () => import("@/pages/home/check_order.vue")
    },

    {
        path: "/inquiry_pay",
        name: "inquiry_pay",
        meta: {
            keepAlive: false,
            title: "订单支付"
        },
        component: () => import("@/pages/home/inquiry_pay.vue")
    },
    {
        path: "/order_list",
        name: "order_list",
        meta: {
            keepAlive: true,
            title: "我的账单"
        },
        component: () => import("@/pages/home/order_list.vue")
    },
    {
        path: "/applyStatus",
        name: "applyStatus",
        meta: {
            keepAlive: true,
            title: "支付信息"
        },
        component: () => import("@/pages/home/applyedCb.vue")
    },
    {
        path: "*",
        name: "error",
        meta: {
            keepAlive: true,
            title: "404"
        },
        component: () => import("@/pages/errorpage/404.vue")
    }
];
const apph5Page = [
    {
        path: "/newsDetial",
        name: "newsDetial",
        meta: {
            keepAlive: false,
            title: "资讯详情"
        },
        component: () => import("@/pages/apph5Page/newsDetial.vue")
    },
    {
        path: "/newFeatures",
        name: "newFeatures",
        meta: {
            keepAlive: true,
            title: "新功能特性"
        },
        component: () => import("@/pages/apph5Page/newFeatures.vue")
    },
    {
        path: "/version",
        name: "version",
        meta: {
            keepAlive: true,
            title: "版本信息"
        },
        component: () => import("@/pages/apph5Page/version.vue")
    },
    {
        path: "/promotion",
        name: "promotion",
        meta: {
            keepAlive: false,
            title: "推广页"
        },
        component: () => import("@/pages/apph5Page/promotion.vue")
    },
    {
        path: "/share",
        name: "share",
        meta: {
            keepAlive: false,
            title: "分享"
        },
        component: () => import("@/pages/apph5Page/share.vue")
    },
    {
        path: "/registered",
        name: "registered",
        meta: {
            keepAlive: true,
            title: "注册"
        },
        component: () => import("@/pages/apph5Page/registered.vue")
    }
];
const agreement = [
    {
        path: "/privacyAgreement",
        name: "privacyAgreement",
        meta: {
            keepAlive: true,
            title: "隐私政策"
        },
        component: () => import("@/pages/agreement/privacyAgreement.vue")
    },
    {
        path: "/dataAnalysisAgreement",
        name: "dataAnalysisAgreement",
        meta: {
            keepAlive: true,
            title: "数据分析授权"
        },
        component: () => import("@/pages/agreement/dataAnalysisAgreement.vue")
    },
    {
        path: "/serviceAgreement",
        name: "serviceAgreement",
        meta: {
            keepAlive: true,
            title: "服务协议"
        },
        component: () => import("@/pages/agreement/serviceAgreement.vue")
    },
    {
        path: "/regAgreement",
        name: "regAgreement",
        meta: {
            keepAlive: true,
            title: "注册协议"
        },
        component: () => import("@/pages/agreement/regAgreement.vue")
    }
];
const third_party = [
    {
        path: "/thirdPartyHome",
        name: "thirdPartyHome",
        meta: {
            keepAlive: true,
            title: "专业信用检测分析"
        },
        component: () => import("@/pages/third_party/index.vue")
    },
    {
        path: "/third_inquiry",
        name: "third_inquiry",
        meta: {
            keepAlive: false,
            title: "综合风险核查-基础版"
        },
        component: () => import("@/pages/third_party/third_inquiry.vue")
    },
    {
        path: "/third_apply",
        name: "third_apply",
        meta: {
            keepAlive: true,
            title: "确认支付"
        },
        component: () => import("@/pages/third_party/third_apply.vue")
    },
    {
        path: "/inq_history",
        name: "inq_history",
        meta: {
            keepAlive: true,
            title: "历史报告"
        },
        component: () => import("@/pages/third_party/inq_history.vue")
    }
];

const electric = [
    {
        path: "/index",
        name: "index",
        meta: {
            keepAlive: false,
            title: "首页"
        },
        component: () => import("@/pages/electric/home/index.vue")
    },
    {
        path: "/lifeagree",
        name: "lifeagree",
        meta: {
            keepAlive: true,
            title: "生活缴费协议"
        },
        component: () => import("@/pages/electric/agree/life.vue")
    },
    {
        path: "/paycost/pay",
        name: "paycost",
        meta: {
            keepAlive: false,
            title: "电费缴纳"
        },
        component: () => import("@/pages/electric/paycost/index.vue")
    },
    {
        path: "/paycostResult",
        name: "paycostResult",
        meta: {
            keepAlive: false,
            title: "缴费详情"
        },
        component: () => import("@/pages/electric/paycostResult/index.vue")
    },

    {
        path: "/paycostRecord",
        name: "paycostRecord",
        meta: {
            keepAlive: false,
            title: "生活缴费记录",
            refresh: true
        },
        component: () => import("@/pages/electric/paycostRecord/index.vue")
    },
    {
        path: "/addUser",
        name: "addUser",
        meta: {
            keepAlive: true,
            title: "电费"
        },
        component: () => import("@/pages/electric/addUser/index.vue")
    },
    {
        path: "/commonProblem",
        name: "commonProblem",
        meta: {
            keepAlive: false,
            title: "常见问题"
        },
        component: () => import("@/pages/electric/commonProblem/index.vue")
    }
];
export const routes = [
    {
        path: "/",
        redirect: "index"
    },
    ...electric
];
