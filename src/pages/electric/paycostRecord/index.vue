<template>
    <div
        :style="{
            background: orderListdata.length === 0 ? '#ffffff' : '#f9f9f9'
        }"
    >
        <section slot="content">
            <div class="pageview">
                <div v-if="orderListdata.length == 0" class="empty">
                    <img :src="empty" style="width: 5rem" alt="" />
                    <span class="label">暂无缴费记录</span>
                </div>
                <template v-else>
                    <div
                        class="listItem"
                        @click="linkTo(item)"
                        v-for="(item, index) in orderListdata"
                        :key="index"
                    >
                        <div class="listItem_l">
                            <img
                                :src="add_h_icon"
                                style="width: 0.45rem"
                                alt=""
                            />
                            <div class="l_content">
                                <span>{{ formatStatus(item.status) }}</span>
                                <span class="time">{{ item.createdAt }}</span>
                            </div>
                        </div>
                        <span>{{ item.amount }}元</span>
                    </div>
                </template>

                <flyloading
                    v-if="orderListdata.length > 0"
                    :showLoading="showLoading"
                ></flyloading>
            </div>
        </section>
    </div>
</template>

<script>
import { orderRecord } from "@/api/cost";
export default {
    data() {
        return {
            empty: require("@/assets/electricity/empty.png"),
            add_h_icon: require("@/assets/electricity/add_h_icon.png"),
            showLoading: true,
            myscroll: null,
            orderListdata: [],
            page: 1,
            allowInfinite: true
        };
    },
    created() {
        this.$store.commit("setRefreshTouch", true);
    },
    async mounted() {
        await this.getOrderlistData(this.page).then(data => {
            this.orderListdata = data;
        });
    },
    watch: {},
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
        getIscroll(iscroll) {
            this.myscroll = iscroll;
        },
        async refresh(done) {
            this.orderListdata = [];
            this.page = 1;
            this.allowInfinite = true;
            await this.getOrderlistData(this.page).then(data => {
                this.orderListdata = data;
            });
            done();
        },
        loadMore() {
            if (!this.allowInfinite) return;
            this.allowInfinite = false;
            this.page++;
            setTimeout(() => {
                if (this.page > this.pageTotals) {
                    this.showLoading = false;
                    this.noLoadingTips = "我也是有底线的";
                    return;
                }
                this.getOrderlistData(this.page).then(data => {
                    this.orderListdata = data;
                    this.allowInfinite = true;
                });
            }, 100);
        },

        linkTo(item) {
            //点击账单按钮
            this.$goRouter({
                path: "/paycostResult",
                query: { id: item.id }
            });
        },
        getOrderlistData(currentPage) {
            //获取账单列表
            var params = {
                uid: localStorage.getItem("uid") || "",
                page: currentPage
            };
            return new Promise((resolve, reject) => {
                orderRecord(params)
                    .then(res => {
                        if (res.code == 200) {
                            this.orderListdata = this.orderListdata.concat(
                                res.data.records
                            );
                            this.pageTotals = res.data.pages;
                            if (this.pageTotals <= 1) {
                                this.showLoading = false;
                            } else {
                                this.showLoading = true;
                            }

                            resolve(this.orderListdata);
                        }
                    })
                    .catch(e => {
                        console.log("err", e);
                    });
            });
        }
    }
};
</script>

<style scoped lang="less">
.pageview {
    padding: 0 0.3rem;
    padding-top: 0.3rem;
    overflow: hidden;
    .listItem {
        background-color: #fff;
        border-radius: 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.3rem 0.2rem;
        margin-bottom: 0.3rem;
        .listItem_l {
            display: flex;
            align-items: center;
            .l_content {
                margin-left: 0.2rem;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                .time {
                    font-size: 0.2rem;
                    color: #999;
                }
            }
        }
    }
}
.empty {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .label {
        color: #999999;
        margin-top: 0.4rem;
        font-size: 0.3rem;
    }
}
</style>
