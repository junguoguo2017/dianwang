<template>
    <div style="background: #f5f4f7; padding-bottom: 0.3rem">
        <carousel :autoplay="true" style="height: 3.3rem" :duration="5000">
            <div v-for="(item, index) in bannerList" :key="index">
                <img style="width: 100%" :src="item.imgUrl" alt="" />
            </div>
        </carousel>
        <div id="box" ref="box">
            <img style="width: 12px; height: 12px" :src="notice_icon" alt="" />
            <div class="marquee-box" ref="marquee">
                <p ref="cmdlist" id="pWidth">
                    {{ this.notice || "广播" }}
                </p>
            </div>
        </div>
        <div class="containerWrap">
            <!-- 缴费 -->
            <div class="addcost">
                <div class="title">
                    <span class="title_l">在线缴费</span>
                    <span style="color: #d3d3d3">长按可删除缴费记录</span>
                </div>
                <div class="addcost_list_wrap">
                    <div
                        class="list_item"
                        v-for="(item, index) in accounts"
                        :key="index"
                        :class="{ m_l: index % 2 !== 0, m_r: index % 2 === 0 }"
                        @click="linktoPay(item)"
                        @touchstart="gtouchstart(item)"
                        @touchmove="gtouchmove()"
                        @touchend="showDeleteButton(item)"
                    >
                        <img :src="add_h_icon" style="width: 0.5rem" alt="" />
                        <div class="list_item_con">
                            <span>{{ item.title }}</span>
                            <span class="address"
                                >{{
                                    item.address && item.address.slice(0, 3)
                                }}***&nbsp;|&nbsp;***{{
                                    item.accountName &&
                                        item.accountName.slice(-3)
                                }}</span
                            >
                        </div>
                    </div>
                    <div class="div">按钮</div>
                    <div
                        class="list_item add"
                        :class="{
                            m_l: accounts % 2 !== 0,
                            m_r: accounts % 2 === 0
                        }"
                        @click="$router.push('/addUser')"
                    >
                        <img :src="add" style="width: 0.5rem" alt="" />
                        <span style="margin-top: 0.1rem">新增缴费</span>
                    </div>
                </div>
            </div>
            <!-- 优惠券 -->
            <div v-if="false" class="addcost" style="margin-top: 0.3rem">
                <div class="title">
                    <span class="title_l">缴费享优惠</span>
                </div>
                <div class="discountsWrap">
                    <div
                        @click="
                            $router.push({
                                path: '/paycost/pay',
                                amount: item.originalAmount
                            })
                        "
                        class="discounts_item"
                        v-for="(item, index) in discounts.slice(0, 3)"
                        :key="index"
                    >
                        <div class="discounts_item_tag">
                            立减{{
                                (item.originalAmount - item.amount).toFixed(2)
                            }}元
                        </div>
                        <div class="hot_tag">热</div>
                        <span style="font-size: 0.28rem"
                            >{{ item.originalAmount }}元</span
                        >
                        <span class="card_name">优惠券</span>
                    </div>
                </div>
            </div>
            <!-- 其他 -->
            <div class="addcost" style="margin-top: 0.3rem">
                <div class="title">
                    <span class="title_l">贴心服务</span>
                </div>

                <div class="hartService_wrap">
                    <div
                        class="service_item"
                        @click="$router.push('/paycostRecord')"
                    >
                        <img :src="history" style="width: 0.5rem" alt="" />
                        <div class="service_con">
                            <span>缴费记录</span>
                            <span style="margin-top: 0.1rem; color: #999999"
                                >查询历史缴费</span
                            >
                        </div>
                    </div>
                    <div
                        class="service_item"
                        style="background: #fcf2e8; margin-left: 0.2rem"
                        @click="$router.push('/commonProblem')"
                    >
                        <img :src="help" style="width: 0.5rem" alt="" />
                        <div class="service_con" style="margin-left: 0.2rem">
                            <span>帮助中心</span>
                            <span style="margin-top: 0.1rem; color: #999999"
                                >常见问题</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    accountRecord,
    delOneAccount,
    getHomeInit,
    weixinOauth,
    aliOauth
} from "@/api/cost";
import { getQuery, isWxOrAli } from "@/js/util";
export default {
    data() {
        return {
            electricity: require("@/assets/electricity/electricity-icon.png"),
            add_h_icon: require("@/assets/electricity/add_h_icon.png"),
            notice_icon: require("@/assets/electricity/notice.png"),
            add: require("@/assets/electricity/add.png"),
            history: require("@/assets/electricity/history.png"),
            help: require("@/assets/electricity/help.png"),
            bannerList: [
                {
                    imgName: "",
                    imgUrl: require("@/assets/electricity/banner1.png"),
                    linkUrl: ""
                }
            ],
            isWechatBrowser: false,
            notice: "",
            accounts: [],
            discounts: []
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
            //                 vm.isWechatBrowser = true;
            //             },
            //             false
            //         );
            //     } else if (document.attachEvent) {
            //         document.attachEvent("WeixinJSBridgeReady", function() {
            //             vm.isWechatBrowser = true;
            //         });
            //         document.attachEvent("onWeixinJSBridgeReady", function() {
            //             vm.isWechatBrowser = true;
            //         });
            //     }
            // } else {
            //     vm.isWechatBrowser = true;
            // }

            const type = isWxOrAli();
            vm.initUid(type);
        });
    },
    beforeRouteLeave(to, from, next) {
        this.paomatimer && clearInterval(this.paomatimer);
        this.timeOutEvent && clearInterval(this.timeOutEvent);
        next();
    },
    async created() {
        await this.getBannerData();
        this.getaccountRecord();
    },
    mounted() {
        const p_w = this.$refs.marquee.offsetWidth;
        let left = 0;
        this.paomatimer = setInterval(() => {
            left--;

            if (-left >= this.$refs.cmdlist.offsetWidth) {
                left = p_w;
            }
            this.$refs.cmdlist.style.marginLeft = left + "px";
        }, 20);
    },

    methods: {
        async initUid(type) {
            const { uid, agent } = getQuery();
            const existUid = localStorage.getItem("uid");
            /*校验推广代理人id*/
            if (agent) {
                localStorage.setItem("agent", agent);
            }
            this.$store.commit("getAgentCode");
            if (existUid) {
                this.$store.dispatch("init", { self: this });
                return;
            }

            if (!uid) {
                if (type === 1) {
                    await this.getWxOauth();
                } else if (type === 2) {
                    await this.getAliOauth();
                } else {
                    this.$showToast({
                        message: "请在微信或者支付宝中打开"
                    });
                }
            } else {
                localStorage.setItem("uid", uid);
                this.$store.dispatch("init");
            }
        },

        async getBannerData() {
            await getHomeInit().then(res => {
                this.bannerList = res.data.indexBanners;
                this.notice = res.data.notice;
                this.discounts = res.data.discounts;
            });
        },
        getaccountRecord() {
            const uid = localStorage.getItem("uid");
            if (uid) {
                const params = {
                    uid
                };
                accountRecord(params).then(res => {
                    this.accounts = res.data.records;
                });
            }
        },
        linktoPay(item) {
            this.$router.push({
                path: "/paycost/pay",
                query: {
                    id: item.id
                }
            });
        },
        async getWxOauth() {
            await weixinOauth().then(res => {
                window.location.href = res.data.authorizationUrl;
            });
        },
        async getAliOauth() {
            ap.getAuthCode(
                {
                    appId: "2021003143699246",
                    scopes: ["auth_user"]
                },
                res => {
                    aliOauth({
                        authCode: res.authCode
                    }).then(res => {
                        localStorage.setItem("uid", res.data.uid);
                        this.$store.dispatch("init");
                    });
                }
            );
        },

        //长按事件（起始）
        gtouchstart(item) {
            var self = this;
            this.timeOutEvent = setTimeout(function() {
                self.longPress(item);
            }, 500); //这里设置定时器，定义长按500毫秒触发长按事件
            return false;
        },
        //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
        showDeleteButton(item) {
            clearTimeout(this.timeOutEvent); //清除定时器
            if (this.timeOutEvent != 0) {
                //这里写要执行的内容（如onclick事件）
                console.log("点击但未长按");
            }
            return false;
        },
        //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
        gtouchmove() {
            clearTimeout(this.timeOutEvent); //清除定时器
            this.timeOutEvent = 0;
        },
        //真正长按后应该执行的内容
        longPress(item) {
            this.timeOutEvent = 0;
            //执行长按要执行的内容，如弹出菜单

            this.$dialog
                .confirm({
                    message: "确定删除吗？"
                })
                .then(() => {
                    delOneAccount({ id: item.id }).then(res => {
                        if (res.code === 200) {
                            this.getaccountRecord();
                        }
                    });
                });
        }
    }
};
</script>

<style scoped lang="less">
.containerWrap {
    padding: 0 0.3rem;
    margin-top: 0.1rem;
    .addcost {
        padding: 0.3rem;
        background: #fff;
        border-radius: 0.2rem;

        .title {
            margin-bottom: 0.2rem;
            display: flex;
            justify-content: space-between;
            .title_l {
                font-size: 0.28rem;
                font-weight: 600;
            }
        }
        .addcost_list_wrap {
            display: flex;
            flex-wrap: wrap;

            .list_item {
                width: 49%;
                height: 1.8rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #e9f6ec;
                border-radius: 0.2rem;
                margin-bottom: 0.2rem;
                padding: 0 0.3rem;
                box-sizing: border-box;
                &.add {
                    flex-direction: column;
                }
                &.m_r {
                    margin-right: 1%;
                }
                &.m_l {
                    margin-left: 1%;
                }
                .list_item_con {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    margin-left: 0.2rem;
                    .address {
                        margin-top: 0.1rem;
                        color: #999999;
                    }
                }
            }
        }
        .discountsWrap {
            display: flex;
            .discounts_item {
                flex: 1;
                height: 1.2rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 0.2rem;
                position: relative;
                border: 1px solid #eee;
                margin: 0 0.1rem;
                .card_name {
                    margin-top: 0.1rem;
                    font-size: 0.2rem;
                    color: #999999;
                }
                .discounts_item_tag {
                    height: 0.4rem;
                    line-height: 0.4rem;
                    position: absolute;
                    padding: 0 0.1rem;
                    background-color: red;
                    border-radius: 0.1rem 0 0.1rem 0;
                    font-size: 0.2rem;
                    color: #fff;
                    top: -0.2rem;
                    left: 0;
                }
                .hot_tag {
                    position: absolute;
                    background-color: red;
                    border-radius: 0 0.1rem 0 0;
                    font-size: 0.2rem;
                    color: #fff;
                    top: 0;
                    right: 0;
                }
            }
        }
        .hartService_wrap {
            display: flex;
            .service_item {
                flex: 1;
                height: 1.8rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #e7f7ff;
                border-radius: 0.2rem;
                .service_con {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    margin-left: 0.2rem;
                }
            }
        }
    }
}
#box {
    width: 100%;
    background-color: #fdf6ec;
    position: relative;
    display: flex;
    align-items: center;
    height: 0.6rem;
    padding-left: 0.3rem;
    box-sizing: border-box;
}
.marquee-box {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
}
#pWidth {
    height: 0.6rem;
    line-height: 0.6rem;
    padding: 0;
    margin: 0;
    display: inline-block;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    font-family: 微软雅黑;
    font-size: 0.24rem;
    color: #f9ae3d;
}
::-webkit-scrollbar {
    width: 0 !important;
}
::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
}
</style>
