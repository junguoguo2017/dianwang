<template>
    <div style="background: #fff">
        <div v-if="help" class="empty">
            <img :src="empty" style="width: 5rem" alt="" />
            <span style="color: #999999">暂无常见问题</span>
        </div>
        <div v-else v-html="help"></div>
    </div>
</template>

<script>
import { getHomeInit } from "@/api/cost";
export default {
    data() {
        return {
            empty: require("@/assets/electricity/empty.png"),
            help: "",
        };
    },
    async created() {
        await this.getBannerData();
    },

    methods: {
        async getBannerData() {
            await getHomeInit().then((res) => {
                this.help = res.data.help;
            });
        },
    },
};
</script>

<style scoped lang="less">
.empty {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
