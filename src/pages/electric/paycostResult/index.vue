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
            <div
                style="
                    padding: 0.5rem 0.3rem 0.1rem 0.3rem;
                    border-radius: 0.2rem;
                    background-color: #fff;
                "
            >
                <div
                    style="
                        font-size: 0.34rem;
                        color: #3e3d3d;
                        text-align: center;
                    "
                >
                    国家电网
                </div>
                <div
                    style="
                        font-size: 0.45rem;
                        color: #040404;
                        text-align: center;
                        margin-top: 0.6rem;
                    "
                >
                    {{ record.amount }}元
                </div>
                <div>
                    <div
                        style="display: flex; align-items: center; height: 1rem"
                    >
                        <div
                            style="
                                height: inherit;
                                display: flex;
                                flex-direction: column;
                                align-self: flex-start;
                                align-items: center;
                            "
                        >
                            <img
                                :src="stepicon"
                                style="width: 0.45rem"
                                alt=""
                            />
                            <div
                                style="
                                    flex: 1;
                                    width: 1px;
                                    background-color: #24a345;
                                "
                            ></div>
                        </div>
                        <div
                            style="
                                padding-left: 0.6rem;
                                display: flex;
                                flex-direction: column;
                                align-items: flex-start;
                            "
                        >
                            <span>支付成功</span>
                            <span
                                style="
                                    color: #dcdcdc;
                                    font-size: 0.2rem;
                                    margin-top: 0.1rem;
                                "
                                >{{ record.createdAt }}</span
                            >
                        </div>
                    </div>
                    <div
                        style="display: flex; align-items: center; height: 1rem"
                    >
                        <div
                            style="
                                height: inherit;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                            "
                        >
                            <template
                                v-if="
                                    record.status === 2 || record.status === 3
                                "
                            >
                                <img
                                    :src="stepicon"
                                    style="width: 0.45rem"
                                    alt=""
                                />
                                <div
                                    style="
                                        flex: 1;
                                        width: 1px;
                                        background-color: #24a345;
                                    "
                                ></div>
                            </template>
                            <template v-else>
                                <div style="width: 0.45rem; text-align: center">
                                    <span
                                        style="
                                            display: inline-block;
                                            width: 0.3rem;
                                            height: 0.3rem;
                                            border-radius: 50%;
                                            background-color: #dcdcdc;
                                        "
                                    ></span>
                                </div>
                                <div
                                    style="
                                        flex: 1;
                                        width: 1px;
                                        background-color: #dcdcdc;
                                    "
                                ></div>
                            </template>
                        </div>
                        <div
                            style="
                                padding-left: 0.6rem;
                                display: flex;
                                flex-direction: column;
                                align-items: flex-start;
                            "
                        >
                            <span>缴费单位处理中</span>
                            <span
                                style="
                                    color: #dcdcdc;
                                    font-size: 0.2rem;
                                    margin-top: 0.1rem;
                                "
                                >预计一小时内到账，部分订单可能出现延迟，以实际到账时间为准</span
                            >
                        </div>
                    </div>
                    <div
                        style="display: flex; align-items: center; height: 1rem"
                    >
                        <div
                            style="
                                height: inherit;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                            "
                        >
                            <template v-if="record.status === 3">
                                <div
                                    style="
                                        flex: 1;
                                        width: 1px;
                                        background-color: #24a345;
                                    "
                                ></div>
                                <img
                                    :src="stepicon"
                                    style="width: 0.45rem"
                                    alt=""
                                />
                            </template>
                            <template v-else>
                                <div
                                    style="
                                        flex: 1;
                                        width: 1px;
                                        background-color: #dcdcdc;
                                    "
                                ></div>
                                <div style="width: 0.45rem; text-align: center">
                                    <span
                                        style="
                                            display: inline-block;
                                            width: 0.3rem;
                                            height: 0.3rem;
                                            border-radius: 50%;
                                            background-color: #dcdcdc;
                                        "
                                    ></span>
                                </div>
                            </template>
                        </div>
                        <div
                            style="
                                padding-left: 0.6rem;
                                display: flex;
                                flex-direction: column;
                                align-items: flex-end;
                            "
                        >
                            <span>缴费金额到账</span>
                        </div>
                    </div>
                </div>
                <div
                    style="
                        margin: 0.3rem 0;
                        padding: 0.2rem 0;
                        display: flex;
                        justify-content: space-between;
                        border-top: 1px solid #eee;
                        height: 0.6rem;
                        align-items: center;
                    "
                >
                    <div style="font-size: 0.22rem; color: #999">账户信息:</div>
                    <div style="font-size: 0.22rem; color: #999">
                        {{ record.accountNo }}&nbsp;|&nbsp;{{ record.accountName }}
                    </div>
                </div>
                <div class="nextstep active" @click="$router.push('/index')">
                    返回首页
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { orderStatus } from "@/api/cost";
import { getQuery } from "@/js/util";
export default {
    data() {
        return {
            stepicon: require("@/assets/electricity/add_h_icon.png"),
            record: {},
        };
    },
    async created() {
        await this.getOrderStatus();
    },
    mounted() {},

    methods: {
        formatStatus(status) {
            switch (status) {
                case 0:
                    return "未支付";
                    break;
                case 1:
                    return "待缴费";
                    break;
                case 2:
                    return "缴费中";
                    break;
                case 3:
                    return "缴费成功";
                    break;
                case 4:
                    return "已导出";
                    break;
                case 9:
                    return "已关闭";
                    break;
            }
        },
        async getOrderStatus() {
            const params = {
                id: getQuery().id,
                uid: localStorage.getItem("uid"),
            };
            await orderStatus(params)
                .then((res) => {
                    if (res.code === 200) {
                        this.record = res.data;
                    }
                })
                .catch((e) => {
                    console.log("error", e);
                });
        },
    },
};
</script>

<style scoped lang="less">
.nextstep {
    height: 0.8rem;
    margin: 0.6rem 0.3rem 1rem 0.3rem;
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
</style>
