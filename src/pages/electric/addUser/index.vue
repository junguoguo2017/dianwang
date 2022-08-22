<template>
    <div style="background: #f4f5f7; overflow: hidden">
        <div class="topbanner"></div>
        <div class="formwrap">
            <div class="title" style="">
                <img
                    :src="electricity"
                    style="width: 0.4rem;height:0.4rem"
                    alt=""
                />
                <span class="title_label">电费</span>
            </div>
            <div class="formwrap_con">
                <div class="formwrap_label">
                    <div class="label">缴费单位:</div>
                    <div class="value">国家电网</div>
                </div>
                <div class="formwrap_ques">
                    <div style="font-size: 0.28rem">户号:</div>
                    <!--                    <div style="color: #24a345; font-size: 0.26rem">-->
                    <!--                        如何获取户号？-->
                    <!--                    </div>-->
                </div>
                <div class="formwrap_input" style="">
                    <input
                        v-model="eid"
                        class="userInput"
                        type="number"
                        style="font-size: 0.26rem; height: 0.6rem"
                        placeholder="请输入户号"
                    />
                </div>
                <div class="formwrap_tips" style="">户号为数字</div>
            </div>
        </div>
        <div
            style="
                margin: 0.2rem 0.3rem 0 0.3rem;
                border-radius: 0.2rem;
                background-color: #fff;
                padding: 0.3rem;
            "
        >
            <div style="font-size: 0.32rem">分组:</div>
            <div
                style="
                    border-bottom: 1px solid #f2f2f2;
                    height: 0.6rem;
                    display: flex;
                    align-items: center;
                "
            >
                <input
                    v-model="title"
                    class="userInput"
                    type="text"
                    style="font-size: 0.26rem; height: 0.6rem"
                    placeholder="小区名称或者自定义名称如家/公司"
                />
            </div>
        </div>
        <div
            style="
                margin: 0.2rem 0.3rem 0 0.3rem;
                border-radius: 0.2rem;
                background-color: #fff;
                padding: 0.3rem;
            "
        >
            <div style="font-size: 0.32rem">地区:</div>
            <div
                @click="showSF = true"
                style="
                    border-bottom: 1px solid #f2f2f2;
                    height: 0.8rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                "
            >
                <span
                    :style="{
                        fontSize: '0.26rem',
                        color: columnsItem.pid ? '#000' : '#ccc'
                    }"
                    >{{
                        columnsItem.pid ? columnsItem.text : "请选择所在省份"
                    }}</span
                >
            </div>
        </div>

        <div
            style="
                display: flex;
                align-items: center;
                margin: 0.4rem 0.3rem 0 0.3rem;
            "
        >
            <img
                @click="isAgree = !isAgree"
                :src="isAgree ? agree : noagree"
                alt=""
                style="width: 0.45rem; margin-right: 0.2rem"
            />
            <span>同意</span
            ><span
                style="font-size: 0.36rem; color: #24a345"
                @click="$router.push('/lifeagree')"
                >《生活缴费协议》</span
            >
        </div>
        <div class="nextstep" :class="{ active: isAgree }" @click="nextStep">
            下一步
        </div>
        <van-popup
            v-model="showSF"
            position="bottom"
            :style="{ height: '30%' }"
        >
            <van-picker
                show-toolbar
                title="请选择所在省份"
                :columns="columns"
                @cancel="showSF = false"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
import { addAccount } from "@/api/cost";
import Toast from "../../components/toast";
export default {
    data() {
        return {
            showSF: false,
            isAgree: false,
            electricity: require("@/assets/electricity/electricity-icon.png"),
            agree: require("@/assets/electricity/agree.png"),
            noagree: require("@/assets/electricity/noagree.png"),
            columns: [
                { pid: "11102", text: "北京" },
                { pid: "12101", text: "天津" },
                { pid: "13102", text: "河北" },
                { pid: "13103", text: "冀北" },
                { pid: "14101", text: "山西" },
                { pid: "37101", text: "山东" },
                { pid: "31102", text: "上海" },
                { pid: "32101", text: "江苏" },
                { pid: "33101", text: "浙江" },
                { pid: "34101", text: "安徽" },
                { pid: "35101", text: "福建" },
                { pid: "42102", text: "湖北" },
                { pid: "43101", text: "湖南" },
                { pid: "41101", text: "河南" },
                { pid: "36101", text: "江西" },
                { pid: "51101", text: "四川" },
                { pid: "50101", text: "重庆" },
                { pid: "21101", text: "辽宁" },
                { pid: "22101", text: "吉林" },
                { pid: "23101", text: "黑龙江" },
                { pid: "61102", text: "陕西" },
                { pid: "62101", text: "甘肃" },
                { pid: "63101", text: "青海" },
                { pid: "64101", text: "宁夏" },
                { pid: "65101", text: "新疆" },
                { pid: "15101", text: "内蒙古" },
                { pid: "54101", text: "西藏" }
            ],
            eid: "",
            title: "",
            columnsItem: {}
        };
    },
    mounted() {},
    methods: {
        onConfirm(value, index) {
            this.showSF = !this.showSF;
            this.columnsItem = value;
        },
        addAccount(cb) {
            const uid = localStorage.getItem("uid") || "";
            const params = {
                title: this.title,
                accountNo: this.eid,
                provinceId: this.columnsItem.pid,
                uid
            };
            addAccount(params).then(res => {
                if (res.data && res.data.uid) {
                    localStorage.setItem("uid", res.data.uid);
                    this.$store.dispatch("init", { self: this }); // 更新uid
                }

                if (cb && typeof cb === "function" && res.data.id)
                    cb(res.data.id);
            });
        },
        nextStep() {
            if (this.eid === "") {
                this.$showToast({
                    type: "fail",
                    message: "请输入户号"
                });
                return;
            }
            // if (this.eid.length !== 10) {
            //     this.$showToast({
            //         type: "fail",
            //         message: "请输入正确的户号",
            //     });
            //     return;
            // }
            if (this.title === "") {
                this.$showToast({
                    type: "fail",
                    message: "请输入分组"
                });
                return;
            }
            if (!this.columnsItem.pid) {
                this.$showToast({
                    type: "fail",
                    message: "请选择省份"
                });
                return;
            }
            this.addAccount(id => {
                this.$router.push({
                    path: "/paycost",
                    query: {
                        id
                    }
                });
            });
        }
    }
};
</script>

<style scoped lang="less">
.topbanner {
    height: 3rem;
    background-color: #24a345;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
}
.formwrap {
    margin: -2.4rem 0.3rem 0 0.3rem;
    .title {
        display: flex;
        .title_label {
            font-size: 0.3rem;
            color: #fff;
            margin-left: 0.2rem;
            display: flex;
        }
    }
    .formwrap_con {
        margin-top: 0.2rem;
        padding: 0.5rem 0.3rem 0.1rem 0.3rem;
        border-radius: 0.2rem;
        background-color: #fff;
        .formwrap_label {
            .value {
                font-size: 0.32rem;
            }
            .label {
                margin-top: 0.2rem;
                border-bottom: 1px solid #eee;
                font-size: 0.22rem;
                height: 0.6rem;
                line-height: 0.6rem;
                color: #040404;
            }
        }
        .formwrap_ques {
            margin-top: 0.2rem;
            display: flex;
            justify-content: space-between;
        }
        .formwrap_input {
            border-bottom: 1px solid #f2f2f2;
            height: 0.6rem;
            display: flex;
            align-items: center;
        }
        .formwrap_tips {
            margin: 0.2rem 0;
            font-size: 0.26rem;
            color: #ccc;
        }
    }
}
input::placeholder {
    font-size: 0.24rem;
}
.nextstep {
    height: 0.8rem;
    margin: 2rem 0.3rem 1rem 0.3rem;
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
