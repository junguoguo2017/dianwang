<template>
    <div id="app">
        <div ref="content" class="content">
            <div
                ref="refreshTips"
                class="refreshIcon"
                v-show="$route.meta.refresh"
            >
                <img
                    v-if="refreshing && ispageLoad"
                    src="./refresh_loading.png"
                    class="lodingAnimat"
                />
                <img
                    v-else-if="refreshend && ispageLoad"
                    src="./refreshend.png"
                />
                <img
                    v-else-if="ispageLoad && isSuportRefresh"
                    src="./refreshJT.png"
                    alt=""
                    :style="{
                        transform: isRefresh
                            ? 'rotate(180deg)'
                            : 'rotate(360deg)'
                    }"
                />
                <span v-if="ispageLoad && isSuportRefresh">{{
                    isRefreshtips
                }}</span>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import sdk from "@/js/wxSdk";
import { getQuery } from "@/js/util";
import { domainUrl } from "@/js/http";
import { baseName } from "@/js/config";
export default {
    name: "vapp",
    props: {
        isSuportRefresh: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            ispageLoad: false,
            isRefresh: false,
            refreshing: false,
            refreshend: false,

            isRefreshtips: "下拉刷新",
            touchStartY: 0,
            touchstartX: 0,
            touchEndY: 0,
            touchEndX: 0,
            bodyDom: null,
            appDom: null,
            moveOnce: true,
            dropdown: true,
            maxTouchendY: 0,
            routeIsChange: false
        };
    },
    mounted() {
        this.bodyDom = document.body || document.documentElement;
        this.appDom = document.getElementById("app");

        this.scrllingInit();
        this.touchInit();
    },
    updated() {},
    methods: {
        scrllingInit() {
            let self = this;

            function scrolling() {
                var scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                if (scrollTop > 0 && scrollTop < self.maxTouchendY) {
                    //self.reset();
                } else if (scrollTop > self.maxTouchendY) {
                    //self.isRefresh = false;
                }
                self.bodyScroll(
                    self.bodyDom,
                    function(val) {
                        /*防止路由切换 触发上拉加载*/
                        self.routeIsChange = false;
                        self.$emit("scrolling", val, self.touchEndY);
                    },
                    function(val) {
                        /*路由切换 禁用触发上拉加载*/
                        if (!self.routeIsChange) {
                            self.$emit("loadMore");
                        }
                    }
                );
            }

            /*上拉加载*/
            window.addEventListener("scroll", scrolling, false); //兼容处理
            document.addEventListener("touchmove", scrolling, false);
            document.body.addEventListener("scroll", scrolling, false);
        },
        reset() {
            /*this.moveOnce= false;
                this.refreshing = false;*/
            this.refreshend = false;
            this.isRefreshtips = "下拉刷新";
            this.touchStartY = 0;
            this.touchstartX = 0;
            this.touchEndY = 0;
            this.touchEndX = 0;
            this.$refs.content.style.top = this.touchEndY + "px";
        },
        touchstart(e) {
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            this.moveOnce = true;
            if (scrollTop <= 0) {
                this.dropdown = true;
            }
        },
        touchmove(e) {
            if (!this.dropdown) return;
            this.$refs.content.style.transition = "none";
            this.$refs.content.webkitTransform = "none";
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (scrollTop <= 0) {
                if (this.moveOnce) {
                    //保证在顶部才可下拉刷新
                    /*顶部首次move获取*/
                    this.touchStartY = e.touches[0].clientY - this.touchEndY;
                    this.touchstartX = e.touches[0].clientX;
                    this.moveOnce = false;
                    return;
                }
                this.touchEndY = e.touches[0].clientY - this.touchStartY;
                this.touchEndX = e.touches[0].clientX - this.touchstartX;
                function getangle(diff_y, diff_x) {
                    //返回角度,不是弧度
                    return (360 * Math.atan(diff_y / diff_x)) / (2 * Math.PI);
                }
                var angle = getangle(
                    Math.abs(this.touchEndY),
                    Math.abs(this.touchEndX)
                );

                if (0 < angle && angle < 20) {
                    //设定手指滑动方向,防误触
                    e.preventDefault();
                    e.stopPropagation();
                    this.dropdown = false;
                    return;
                }
                /*上拉不触发*/
                if (this.touchEndY <= 0) {
                    this.touchEndY = 0;
                }

                if (this.touchEndY >= this.maxTouchendY) {
                    this.touchEndY = this.maxTouchendY;
                    this.touchStartY = e.touches[0].clientY - this.maxTouchendY;
                    if (!this.refreshing) {
                        this.isRefresh = true;
                        this.isRefreshtips = "释放更新";
                    }
                } else {
                    if (!this.refreshing) {
                        this.isRefresh = false;
                        this.isRefreshtips = "下拉刷新";
                    }
                }
                this.$refs.content.style.top = this.touchEndY + "px";
                this.$refs.content.style.transition = "all .2s ease-in-out";
            } else {
                this.moveOnce = true;
            }
        },
        touchend(e) {
            if (!this.dropdown) return;
            var self = this;
            if (this.touchEndY >= this.maxTouchendY) {
                this.touchEndY = this.maxTouchendY;
                if (!this.refreshing) {
                    this.refreshing = true;
                    this.isRefreshtips = "加载中...";
                    this.$emit("refresh", this.refreshDone);
                    setTimeout(() => {
                        if (self.touchEndY != 0) {
                            self.refreshDone();
                        }
                    }, 5000);
                }
            } else if (this.touchEndY < this.maxTouchendY) {
                this.touchEndY = 0;
            }
            this.$refs.content.style.top = this.touchEndY + "px";
            this.$refs.content.style.transition = "all .2s ease-in-out";
            this.moveOnce = true;
        },
        touchcancel() {
            this.touchEndY = 0;
            this.$refs.content.style.top = this.touchEndY + "px";
        },
        refreshDone() {
            /*刷新成功回调*/
            return new Promise((resolve, reject) => {
                var self = this;
                this.isRefresh = false;
                this.refreshing = false;
                this.refreshend = true;
                this.isRefreshtips = "更新完成";
                setTimeout(() => {
                    self.touchEndY = 0;
                    self.$refs.content.style.top = self.touchEndY + "px";
                    self.refreshend = false;
                    resolve();
                }, 600);
            });
        },
        bodyScroll(domDiv, scrolling, bottomCb, topCb) {
            var scrollTop =
                document.body.scrollTop || document.documentElement.scrollTop; //页面上卷的高度
            var wholeHeight = domDiv.scrollHeight; //页面底部到顶部的距离
            var divHeight = document.documentElement.clientHeight; //页面可视区域的高度

            if (Math.ceil(scrollTop + divHeight) >= wholeHeight) {
                if (bottomCb) {
                    bottomCb(scrollTop);
                }
            } else {
                if (scrolling) {
                    scrolling(scrollTop);
                }
            }
            if (scrollTop == 0) {
                if (topCb) {
                    topCb();
                }
            }
        },
        touchInit() {
            var self = this;
            this.reset();
            this.$nextTick(() => {
                if (this.isSuportRefresh && this.$route.meta.refresh) {
                    this.appDom.addEventListener(
                        "touchstart",
                        self.touchstart,
                        false
                    );
                    this.appDom.addEventListener(
                        "touchmove",
                        self.touchmove,
                        false
                    );
                    this.appDom.addEventListener(
                        "touchend",
                        self.touchend,
                        false
                    );
                    this.appDom.addEventListener(
                        "touchcancel",
                        self.touchcancel,
                        false
                    );
                } else {
                    this.appDom.removeEventListener(
                        "touchstart",
                        self.touchstart,
                        false
                    );
                    this.appDom.removeEventListener(
                        "touchmove",
                        self.touchmove,
                        false
                    );
                    this.appDom.removeEventListener(
                        "touchend",
                        self.touchend,
                        false
                    );
                    this.appDom.removeEventListener(
                        "touchcancel",
                        self.touchcancel,
                        false
                    );
                }
            });
        },
        shareInit() {
            //微信分享sdk初始化
            var self = this;
            var link = "";
            var agent = getQuery()["agent"]
                ? getQuery()["agent"]
                : localStorage.agent
                ? localStorage.agent
                : "";
            if (agent != "") {
                link = domainUrl + baseName + "/index?agent=" + agent;
            } else {
                link = domainUrl + baseName + "/index";
            }
            sdk.getJSSDK(link, function() {
                self.$showToast({ message: "分享成功" });
            });
        }
    },
    watch: {
        $route: function(val, ol) {
            /*微信分享初始化*/
            // this.shareInit()
            /*touch初始化*/
            this.touchInit();
            var self = this;
            this.ispageLoad = false;
            /*动态设置下拉刷新按钮位置*/
            this.$nextTick(() => {
                self.maxTouchendY = self.$refs.refreshTips.offsetHeight;
                var contentChild = self.$refs.content.children;
                for (var i = 0; i < contentChild.length; i++) {
                    if (contentChild[i].className.indexOf("routerView") != -1) {
                        var vappPaddingTop = window.getComputedStyle(
                            contentChild[i]
                        )["padding-top"];
                        self.$refs.refreshTips.style.top =
                            Number(
                                vappPaddingTop.slice(
                                    0,
                                    vappPaddingTop.length - 2
                                )
                            ) -
                            self.maxTouchendY +
                            "px";
                        //console.log(vappPaddingTop)
                    }
                }
                setTimeout(() => {
                    self.ispageLoad = true;
                }, 500);
            });
            /*判断是否路由变化*/
            if (val && ol) {
                //非首次进入
                this.routeIsChange = true;
            }
        },
        isSuportRefresh: function() {
            /*touch初始化*/
            this.touchInit();
        }
    }
};
</script>

<style lang="less">
#app {
    max-width: 750px;
    margin: 0 auto;
    font-size: 0;
}
.content {
    position: relative;
    .refreshIcon {
        position: absolute;
        left: 0;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: 0.3rem;
        color: #707070;
        top: -1rem;
        img {
            width: 0.4rem;
            vertical-align: middle;
            margin-right: 0.2rem;
        }
    }
}

.lodingAnimat {
    animation: loadingRun 1s linear infinite;
}
@keyframes loadingRun {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.refresh_T {
    position: absolute;
    top: -40px;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 999;
}
</style>
