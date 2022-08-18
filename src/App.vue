<template>
    <vapp
        :isSuportRefresh="isSuportRefresh"
        @loadMore="loadMore"
        @refresh="refresh"
        @scrolling="scrolling"
    >
        <navheader
            v-if="hasNav"
            :className="'navHeader_bg'"
            @backClick="backClick"
            :back="showBack"
            :label="this.$store.state.currentTitle"
            :more="showMore"
            @moreClick="moreClick"
        >
        </navheader>
        <publicComponent v-if="false" @backClick="backClick"></publicComponent>
        <keep-alive>
            <router-view
                class="routerView"
                ref="routerView"
                v-if="$route.meta.keepAlive && !isReloadPage"
                :style="{
                    minHeight: routerViewMinHeight,
                    marginTop: hasNav ? '0.88rem' : '',
                    marginBottom: showTabbar ? '1.2rem' : ''
                }"
            ></router-view>
        </keep-alive>
        <router-view
            class="routerView"
            ref="routerView"
            v-if="!$route.meta.keepAlive && !isReloadPage"
            :style="{
                minHeight: routerViewMinHeight,
                marginTop: hasNav ? '0.88rem' : '',
                marginBottom: showTabbar ? '1.2rem' : ''
            }"
        ></router-view>
    </vapp>
</template>

<script>
import publicComponent from "@/pages/third_party/publicComponents";
export default {
    name: "App",
    components: { publicComponent },
    data() {
        return {
            page_animation: "",
            routerViewMinHeight: 0,
            navPath: {
                creditInquiry: true,
                order_list: true,
                inquiry: true,
                inquiry_pay: true,
                check_order: true,
                report: true,
                error: true,
                inquiry_callback: true,
                regAgreement: true,
                dataAnalysisAgreement: true,
                serviceAgreement: true,
                privacyAgreement: true,
                version: true,
                newsDetial: true,
                newFeatures: true,
                applyStatus: true,
                error: true
            },
            isReloadPage: false
        };
    },

    computed: {
        showBack() {
            return false;
        },
        showTabbar() {
            return this.$route.path == "/creditInquiry";
        },
        pageTranstionName() {
            return this.$store.state.page_animation;
        },
        hasNav() {
            return (
                this.navPath[this.$route.name] &&
                this.$store.state.client == "h5"
            );
        },
        showMore() {
            return (
                this.$store.state.client == "h5" && this.$route.name == "report"
            );
        },
        isSuportRefresh() {
            return (
                this.$store.state.client == "h5" &&
                this.$store.state.refreshTouch
            );
        }
    },
    created() {
        window.getClientParams = this.getClientParams; //接收客户端值
        try {
            let clientData = JSON.parse(
                JSON.stringify(window.sendClientPramas)
            ); //获取客户端值
            this.$store.commit("INIT", { self: this, ...clientData });
        } catch (e) {
            this.$store.commit("INIT", { self: this });
        }
        try {
            let androidJson = window.android.sendClientPramas();
            let clientData = JSON.parse(androidJson);
            this.$store.commit("INIT", { self: this, ...clientData });
        } catch (e) {}

        /*初始化个人信息*/
        this.$store.commit("getUserInfo");
        //软键盘收起的事件处理
        document.body.addEventListener("focusout", function(evt) {
            setTimeout(function() {
                var scrollHeight =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop ||
                    0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 100);
        });
        this.$store.commit("setReloadStatus", false);
    },
    methods: {
        linktoHref(url) {
            window.location.href = url;
        },
        getClientParams(client, token) {
            let self = this;
            this.$store.commit("INIT", {
                self: this,
                client: client,
                token: token
            });
        },
        loadMore() {
            if (this.$refs.routerView.loadMore) {
                this.$refs.routerView.loadMore();
            }
        },
        refresh(done) {
            if (this.$refs.routerView.refresh) {
                //下拉刷新
                this.$refs.routerView.refresh(done);
            }
        },
        reloadPage() {
            if (this.$refs.routerView.reloadPage) {
                this.$refs.routerView.reloadPage();
            }
        },
        scrolling(val) {
            if (this.$refs.routerView.scrolling) {
                this.$refs.routerView.scrolling(val);
            }
        },
        backClick() {
            if (this.$refs.routerView.backClick) {
                this.$refs.routerView.backClick();
            } else {
                this.$router.goBack();
            }
        },
        moreClick() {
            if (this.$refs.routerView.moreClick) {
                this.$refs.routerView.moreClick();
            }
        }
    },
    watch: {
        $route(to, from) {
            let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
            /*路由动画*/
            if (isBack) {
                this.page_animation = "slide-right";
            } else {
                this.page_animation = "slide-left";
            }
            this.$router.isBack = false;
            /*单页高度*/
            this.$nextTick(() => {
                var navH = this.hasNav
                    ? document.querySelector(".navHeader_bg").offsetHeight
                    : 0;
                var tabH = this.showTabbar
                    ? document.querySelector(".tabBarBox").offsetHeight
                    : 0;
                this.routerViewMinHeight =
                    document.documentElement.clientHeight - navH - tabH + "px";
            });
        },
        "$store.state.refreshPage": function(nv, ov) {
            /*登录成功*/
            if (!nv) {
                /*当前页面重载*/
                this.isReloadPage = true;
                this.$nextTick(() => {
                    this.isReloadPage = false;
                });
            }
        },
        "$store.state.loading": function(nv, ov) {}
    }
};
</script>

<style lang="less">
body {
    -webkit-touch-callout: none; /*系统默认菜单被禁用*/
    -webkit-user-select: none; /*webkit浏览器*/
    -khtml-user-select: none; /*早期浏览器*/
    -moz-user-select: none; /*火狐*/
    -ms-user-select: none; /*IE10*/
    user-select: none;
}
.app {
    max-width: 750px;
    margin: 0 auto;
    font-size: 0;
}
.lodingAnimat {
    animation: loadingRun 0.6s ease infinite;
}
@keyframes loadingRun {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
