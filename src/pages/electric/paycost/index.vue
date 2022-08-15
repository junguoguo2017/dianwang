<template>
    <div style="background: #f4f5f7">
        <div
            style="
              height: 3rem;
              background-color: #24a345;
              border-bottom-left-radius: 1rem;
              border-bottom-right-radius: 1rem;
          "
        ></div>
        <div style="margin-top: -2.3rem; margin: -2.4rem 0.3rem 0 0.3rem">
            <div style="display: flex">
                <img :src="electricity" style="width: 0.4rem" alt="" />
                <span
                    style="font-size: 0.3rem; color: #fff; margin-left: 0.2rem"
                    >电费</span
                >
            </div>
            <div
                style="
                  margin-top: 0.2rem;
                  padding: 0.5rem 0.3rem 0.1rem 0.3rem;
                  border-radius: 0.2rem;
                  background-color: #fff;
              "
            >
                <div
                    style="
                      border-bottom: 1px solid #eee;
                      height: 0.8rem;
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      margin-bottom: 0.3rem;
                  "
                >
                    <div style="font-size: 0.3rem">账户余额(元):</div>
                    <div style="font-size: 0.5rem">
                        {{ account.yue || "0.00" }}
                    </div>
                </div>
                <div
                    style="
                      height: 0.8rem;
                      display: flex;
                      align-items: flex-start;
                      justify-content: space-between;
                  "
                >
                    <div style="font-size: 0.28rem; color: #999">户号信息:</div>
                    <div style="font-size: 0.26rem">
                        {{ account.accountNo }}|{{ account.accountName }}
                    </div>
                </div>
                <div
                    style="
                      height: 0.8rem;
                      display: flex;
                      align-items: flex-start;
                      justify-content: space-between;
                  "
                >
                    <div style="font-size: 0.26rem; color: #999; width: 1.5rem">
                        住址信息:
                    </div>
                    <div style="font-size: 0.26rem; text-align: right">
                        {{ account.address }}
                    </div>
                </div>
                <div
                    style="
                      height: 0.8rem;
                      display: flex;
                      align-items: flex-start;
                      justify-content: space-between;
                  "
                >
                    <div style="font-size: 0.28rem; color: #999">缴费单位:</div>
                    <div style="font-size: 0.26rem">国家电网</div>
                </div>
            </div>
        </div>
        <div
            style="
              margin: 0rem 0.3rem;
              padding: 0.3rem;
              border-radius: 0.2rem;
              background-color: #fff;
          "
        >
            <div style="font-size: 0.36rem; margin-bottom: 0.1rem">
                缴费金额
            </div>
            <van-row gutter="20">
                <van-col span="8" v-for="item in money" :key="item.value">
                    <div
                        @click="handleSelectedCost(item)"
                        class="cost-item"
                        :class="{ active: selectedCost === item.value }"
                    >
                        {{ item.label }}
                    </div>
                </van-col>
            </van-row>
            <div>
                <div style="display: flex; align-items: center; height: 0.8rem">
                    <span
                        style="
                          font-size: 0.4rem;
                          font-weight: 600;
                          width: 0.6rem;
                      "
                        >￥</span
                    >
                    <!--                    <span-->
                    <!--                        style="-->
                    <!--                            flex: 1;-->
                    <!--                            height: 0.8rem;-->
                    <!--                            line-height: 0.8rem;-->
                    <!--                            font-size: 0.36rem;-->
                    <!--                        "-->
                    <!--                        @click="safeKeyboardVisible = true"-->
                    <!--                        >{{ selectedCost }}</span-->
                    <!--                    >-->
                    <input
                        v-model="selectedCost"
                        style="
                          flex: 1;
                          height: 0.8rem;
                          line-height: 0.8rem;
                          font-size: 0.36rem;
                      "
                        type="number"
                    />
                    <span
                        @click="clearCost"
                        style="
                          font-size: 0.4rem;
                          width: 0.8rem;
                          text-align: center;
                      "
                        >x</span
                    >
                </div>
                <div style="font-size: 0.2rem; color: #999; margin-top: 0.1rem">
                    缴费金额请输入整数，如有欠费，缴费金额需大于欠费金额！
                </div>
            </div>
        </div>

        <div class="nextstep active" @click="paybtn">立即缴费</div>
        <!--支付类型-->
        <bottomPopup v-model="applyShow">
            <div class="bottomApply">
                <div class="bottom_title">请选择支付方式</div>
                <div class="apply_item" @click="applySelect(2)">
                    <svg-icon
                        :iconClass="'wxApply'"
                        :iconStyle="{ fontSize: '0.3rem', color: '#ffffff' }"
                    ></svg-icon>
                    <span>微信</span>
                    <svg-icon
                        :iconClass="
                            current_Apply_type == 2
                                ? 'inquiryAgree'
                                : 'inquiryNoAgree'
                        "
                        :iconStyle="{ fontSize: '0.3rem', color: '#ffffff' }"
                    ></svg-icon>
                </div>
                <div class="apply_item" @click="applySelect(1)">
                    <svg-icon
                        :iconClass="'aliApply'"
                        :iconStyle="{ fontSize: '0.3rem', color: '#ffffff' }"
                    ></svg-icon>
                    <span>支付宝</span>
                    <svg-icon
                        :iconClass="
                            current_Apply_type == 1
                                ? 'inquiryAgree'
                                : 'inquiryNoAgree'
                        "
                        :iconStyle="{ fontSize: '0.3rem', color: '#ffffff' }"
                    ></svg-icon>
                </div>
                <div
                    class="applyBtn"
                    style="margin-top: 1.1rem"
                    @click="paycost"
                >
                    确定
                </div>
            </div>
        </bottomPopup>
        <!--安全键盘-->
        <numkeyBoard
            v-if="false"
            v-model="safeKeyboardVisible"
            @pasEndInput="val => (selectedCost = val)"
            @inputComfir="() => (safeKeyboardVisible = false)"
            ref="numkeyBoard"
        ></numkeyBoard>
        <!--支付-->
        <div v-html="pay_con"></div>
    </div>
</template>

<script>
import {
    setCookie,
    getCookie,
    delCookie,
    getQuery,
    isWxOrAli
} from "@/js/util";
import sdk from "@/js/wxSdk";

import { queryOneAccount, prePay } from "@/api/cost";

function isWchatBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin) {
        return true;
    } else {
        return false;
    }
}

const money = [
    {
        label: "100元",
        value: 100
    },
    {
        label: "200元",
        value: 200
    },
    {
        label: "500元",
        value: 500
    },
    {
        label: "1000元",
        value: 1000
    }
];
export default {
    name: "third_apply",
    data() {
        return {
            orderPayData: {},
            formData: {},
            category_name: "",
            applyShow: false,
            order_no: "",
            currentPrice: "",
            shareSuccess: false,
            current_Apply_type: 2,
            pay_con: "",
            shareGuide: false,
            isWechatBrowser: false,
            hadApply: false,
            jump_url: "",

            money,
            selectedCost: money[0].value,
            electricity: require("@/assets/electricity/electricity-icon.png"),
            account: {},
            safeKeyboardVisible: false,
            typeSource: 1 // 1微信 2支付宝
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            /*判断是否是在微信内部*/

            // if (typeof WeixinJSBridge == "undefined") {
            //     if (document.addEventListener) {
            //         document.addEventListener(
            //             "WeixinJSBridgeReady",
            //             function() {
            //                 vm.initUserWechat();
            //             },
            //             false
            //         );
            //     } else if (document.attachEvent) {
            //         document.attachEvent("WeixinJSBridgeReady", function() {
            //             vm.initUserWechat();
            //         });
            //         document.attachEvent("onWeixinJSBridgeReady", function() {
            //             vm.initUserWechat();
            //         });
            //     }
            // } else {
            //     vm.initUserWechat();
            // }

            vm.typeSource = isWxOrAli();
        });
    },

    created() {
        this.queryOneAccount();
    },
    mounted() {},
    methods: {
        clearCost() {
            this.selectedCost = "";
            this.$refs.numkeyBoard.clearNumHandle();
        },
        queryOneAccount() {
            const uid = localStorage.getItem("uid") || "";
            const { id } = getQuery();
            const params = {
                id,
                uid
            };
            queryOneAccount(params).then(res => {
                this.account = res.data;
            });
        },
        reGetUid() {
            // 微信uid失效，返回首页重新获取
            localStorage.removeItem("uid");
            this.$store.dispatch("init");
        },
        paycost() {
            if (
                this.account.balance < 0 &&
                this.selectedCost < Math.abs(this.account.balance)
            ) {
                this.$showToast({
                    message: "缴费金额需大于欠费金额",
                    type: "fail"
                });
                return;
            }

            const pat = /^[1-9]+\d*(\.\d{0,2})?$|^0?\.\d{0,2}$/;
            if (!pat.test(this.selectedCost)) {
                this.$showToast({
                    message: "请输入正确的金额",
                    type: "fail"
                });

                return;
            }
            const typeSource =
                this.typeSource === 1
                    ? "weixin"
                    : this.typeSource === 2
                    ? "alipay"
                    : "";
            const params = {
                id: this.account.id,
                totalAmount: this.selectedCost,
                typeSource
            };
            prePay(params).then(res => {
                if (this.typeSource == 1) {
                    this.wChat_in_Apply(res.data);
                } else if (this.typeSource === 2) {
                    this.ali_in_Apply(res.data);
                } else {
                    this.$showToast({
                        message: "请在微信或者支付宝中打开"
                    });
                }
                // if (this.isWechatBrowser) {
                //     //判断是否是微信浏览器，直接调用微信内支付
                //     //微信内部
                //     this.wChat_in_Apply(JSON.parse(res.data.pay));
                // } else {
                //     this.pay_con = res.data.pay;
                //     if (this.current_Apply_type == 1) {
                //         this.$nextTick(() => {
                //             //支付宝
                //             document.forms["alipaysubmit"].submit();
                //         });
                //     } else if (this.current_Apply_type == 2) {
                //         this.$nextTick(() => {
                //             //微信
                //             document.forms["wepaysubmit"].submit();
                //         });
                //     }
                // }
            });
        },
        handleSelectedCost(item) {
            this.selectedCost = item.value;
        },

        initUserWechat() {
            this.isWechatBrowser = true;
            //微信内部
            this.current_Apply_type = 4;
            // this.shareInit();
        },
        shareInit() {
            //微信分享sdk初始化
            var self = this;
            let url = location.href;
            var obj = {
                title: this.orderPayData.category_name, //分享标题
                desc: this.orderPayData.description, //分享内容
                img: "https://app.12credit.com/static/home/images/logo.png" //分享内容显示的图片
            };
            sdk.getJSSDK(url, obj, function() {});
        },
        wChat_in_Apply(data) {
            /*微信支付*/
            const opts = JSON.parse(data.pay);
            WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                    appId: opts.appId, //公众号名称，由商户传入
                    timeStamp: opts.timeStamp, //时间戳，自1970年以来的秒数
                    nonceStr: opts.nonceStr, //随机串
                    package: opts.package,
                    signType: opts.signType, //微信签名方式：
                    paySign: opts.paySign //微信签名
                },
                res => {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        setTimeout(() => {
                            this.$router.push({
                                path: "/paycostRecord",
                                query: { id: data.id }
                            });
                        }, 1000);
                        // 使用以上方式判断前端返回,微信团队郑重提示：
                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    } else {
                        this.$showToast({
                            type: "fail",
                            message: "支付失败"
                        });
                    }
                }
            );
        },
        ali_in_Apply(data) {
            AlipayJSBridge.call(
                "tradePay",
                {
                    tradeNO: data.pay
                },
                result => {
                    const {
                        resultCode = "",
                        result: resultMsg = "支付失败"
                    } = result;

                    if (resultCode == "9000") {
                        // 支付成功
                        setTimeout(() => {
                            this.$router.push({
                                path: "/paycostRecord",
                                query: { id: data.id }
                            });
                        }, 1000);
                    } else {
                        this.$showToast({
                            type: "fail",
                            message: resultMsg
                        });
                    }
                }
            );
        },
        applySelect(type) {
            this.current_Apply_type = type;
        },
        paybtn() {
            if (this.typeSource !== 0) {
                this.paycost();
            } else {
                this.applyShow = true;
            }
        }
    }
};
</script>

<style scoped lang="less">
input::placeholder {
    font-size: 0.24rem;
}
.nextstep {
    height: 0.8rem;
    margin: 2rem 0.3rem 0rem 0.3rem;
    border-radius: 0.2rem;
    color: #fff;
    font-size: 0.34rem;
    background-color: #fff;
    line-height: 0.8rem;
    text-align: center;
    border: 1px solid #acacac;
    color: #acacac;
    &.active {
        border: 1px solid #24a345;
        background-color: #24a345;
        color: #fff;
    }
}
.cost-item {
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 0.1rem;
    border: 1px solid #ccc;
    margin: 0.15rem 0;
    font-size: 0.36rem;
    text-align: center;
    &.active {
        border: 1px solid #97d0ba;
    }
}
.price_num {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.72rem;
    color: #4c546a;
}
.category_name {
    font-size: 0.3rem;
    color: #4c546a;
    text-align: center;
    margin-top: 0.4rem;
}
.shareCon {
    margin: 1rem 0.32rem 0;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 1.5rem;
    border-bottom: 1px solid #d0d0d0;
    border-top: 1px solid #d0d0d0;
    .shareicon {
        width: 1.14rem;
    }
    .shareText {
        flex-grow: 1;
        margin-left: 0.3rem;
        height: 1.5rem;
        .title {
            font-size: 0.3rem;
            color: #4c546a;
            font-weight: 600;
            margin-top: 0.42rem;
            line-height: 1em;
        }
        .price {
            font-size: 0.24rem;
            color: #4c546a;
            margin-top: 0.18rem;
            line-height: 1em;
        }
    }
    .shareBtn {
        font-size: 0.3rem;
        width: 1.2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        border-radius: 0.25rem;
    }
    .shareReduce {
        color: #f92d2d;
        font-size: 0.32rem;
        font-weight: bold;
    }
}
.shareGuide {
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    .topImg {
        text-align: right;
        img {
            width: 5.61rem;
        }
    }
    .konwImg {
        text-align: center;
        margin-top: 1.4rem;
        img {
            width: 2.35rem;
        }
    }
}
.bottomApply {
    padding: 0.4rem 0.4rem 0.8rem;
    background: #fff;
    .bottom_title {
        font-size: 0.3rem;
        color: #4c546a;
    }
    .apply_item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 0.88rem;
        border-bottom: 1px solid #d0d0d0;
        margin-top: 0.2rem;
        span {
            font-size: 0.3rem;
            flex-grow: 1;
            margin-left: 0.2rem;
            color: #4c546a;
        }
    }
}
.shareBtn {
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    width: 2.5rem;
    border-radius: 0.25rem;
    font-size: 0.24rem;
    color: #fff;
    background: -webkit-gradient(left, #6e89fd, #596dff);
    background: -moz-linear-gradient(right, #6e89fd, #596dff);
    background: -o-linear-gradient(right, #6e89fd, #596dff);
    background: linear-gradient(to right, #6e89fd, #596dff);
}
.applyBtn {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    border-radius: 0.5rem;
    font-size: 0.32rem;
    color: #fff;
    font-weight: bold;
    background: -webkit-gradient(left, #6e89fd, #596dff);
    background: -moz-linear-gradient(right, #6e89fd, #596dff);
    background: -o-linear-gradient(right, #6e89fd, #596dff);
    background: linear-gradient(to right, #6e89fd, #596dff);
}
</style>
