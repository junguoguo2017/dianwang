<template>
    <div class="Pending">
        <div class="in-weixin" v-if="isWeixin">
            <div class="not-pay" v-if="!payStatus">
                <div class="weixin-tip">
                    <!-- <div class="weixin-tip-content">
                        | 请在菜单中选择在浏览器中打开,
                        <br/> | 以完成支付
                    </div> -->

                </div>
                <!-- <div class="weixin-img" :class="{'ios': isIos, 'android': isAndroid}">
                                                </div> -->
                <!--<div class="weixin-button">-->
                <!--| 返回选择其他支付方式-->
                <!--</div>-->
            </div>
            <div class="have-pay" v-else>
                <p>检查支付结果</p>
            </div>
        </div>
        <div class="in-browser" v-if="!isWeixin">
            <!--<p>支付跳转中...{{retry}}</p>-->
            <p>支付跳转中...</p>
        </div>
        <div class="payment-form" v-html="paymentForm">

        </div>
        <div class="modal" v-if="isWeixin && inFirst">
            <img src="@/assets/img/openInBor.png" class="openImg">
            <div class="content">
                        请在菜单中选择在浏览器中打开,
                        <br/> 以完成支付
            </div>
        </div>
    </div>
</template>

<script>
import { getQuery } from "../../js/util";

function isWchatBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixins = ua.indexOf('micromessenger') != -1;
    if (isWeixins) {
        return true;
    } else {
        return false;
    }
}
import { orderPayStatus } from '@/api/api'
// import { localNotice } from '@/js/localNotic'
export default {
    data() {
        return {
            timer: undefined,
            // retry: 5,
            retry: 210,//轮询10分30秒  用于在微信中进行订单查询的时间
            paymentForm: '',
            payStatus: false,
            isWeixin: false,
            inFirst: true
        }
    },

    computed: {
        option: function() {
            return this.$route.query
        }
    },
    created() {
        if (isWchatBrowser()) {
            this.isWeixin = true;
        }else{
            localStorage.token = getQuery()['token'];
            this.$store.commit('getToken',getQuery()['token']);
        }
    },
    mounted() {
        //监听 visibility change 事件
        var self = this;
        document.addEventListener("qbrowserVisibilityChange", function(e) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("visibilitychange", false, false);
            evt.hidden = e.hidden;
            document.dispatchEvent(evt);
        }, true);
        document.addEventListener("visibilitychange", function(e) {
            e.hidden = e.hidden === undefined ? document.hidden : e.hidden;
        }, true);
        document.addEventListener("visibilitychange", function(e) {

            if (e.hidden) {
                // 网页被挂起
                // alert('网页被挂起')
            }
            else {
                // 网页被呼起
                // alert('网页被挂起')
                self.inFirst = false;
                if(self.isWeixin){
                    self.CheckOrder();
                }

            }


        });


        // 浏览器中执行支付宝支付
        if (!this.isWeixin) {
           window.location.href = this.$route.query.alipayForm
        }

        // 切出微信到浏览器或者切出浏览器到支付宝,切换回来检查支付结果
        let oldTime = new Date()
        let count = this.retry
        // 刷新当前页面时,检查支付结果
        // this.CheckOrder(count)

        // this.timer = setInterval(() => {
        //     let newTime = new Date()
        //     console.log('时间: ', newTime.getTime() - oldTime.getTime())
        //     if (newTime.getTime() - oldTime.getTime() > 3000) {
        //         this.s(count)
        //         this.payStatus = true
        //         clearInterval(this.timer)
        //     }
        //     oldTime = newTime
        // }, 1000)


    },
    methods: {

        CheckOrder() {//订单查询
            // let that = this


            let id = this.$route.query.order_no
            /*app判断是否支付成功*/
            var self = this;
            let showLoading = this.$toast.loading({
                mask: true,
                message: '正在获取订单状态',
                duration: 0
            });
            var params = {
                order_no: id
            }
            setTimeout(() => {
                //三秒后查询订单状态 防止后台获取不到订单状态
                orderPayStatus(params).then((res) => {
                    self.isSendApply = false;//下单状态初始化
                    showLoading.clear();
                    if (res.code == 1) {
                        self.$showToast({
                            type: res.data.status == 1 ? 'success' : 'fail',
                            message: res.msg
                        });
                        if (res.data.status == 1) {
                            // localNotice({
                            //     title: "下单成功",
                            //     text:`订单号:${self.$route.query.order_no}`,
                            //     data:{
                            //         path:'/report',
                            //         query:{order_no:self.$route.query.order_no}
                            //     }
                            // });
                            /*支付成功*/
                            if (res.data.jump_url != '') {
                                /*未拉取报告*/
                                self.$href(res.data.jump_url,{hidden:false});
                            } else {
                                self.$router.push({name:'report',query:{order_no:id}})
                            }
                        } else {
                            setTimeout(function(){
                                if(localStorage.getItem('cbUrl')){
                                    self.$router.push({name:'third_inquiry',query:JSON.parse(localStorage.getItem('cbUrl'))})
                                } else {
                                   self.$router.go(-1)
                                }

                            },800)
                        }
                    }
                })
            }, 3000)

        }


    },
    destroyed() {
        // 页面销毁取消计时事件
        clearInterval(this.timer)
    }
}
</script>
<style lang="less" scoped>
.Pending {
    font-size: 0.32rem;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #333;
    opacity: 0.7;
    .openImg {
        width: 5.5rem;
        position: absolute;
        right: 0.8rem;
        ;
        top: 1.2rem;
    }
    .content {
        margin-top: 6.5rem;
        color:#fff;
        // margin-left: 1.5rem;
        text-align: center;
        font-size:0.45rem;
    }
}
</style>
