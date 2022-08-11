<template>
    <div>
        <section slot="content">
            <div>
                <div class="header_banner check_order_money">
                    <div class="text">订单金额（元）</div>
                    <div class="money">{{PayOrderData.amount}}</div>
                </div>
            </div>
            <div>
                <div class="order_msg">
                    <h5 class="orderitem_title"><span></span>订单信息</h5>
                    <ul class="orderitem_con">
                        <li>订单名称：{{PayOrderData.category_name}}</li>
                        <li>订单编号：{{PayOrderData.order_no}}</li>
                        <li>创建时间：{{PayOrderData.order_time}}</li>
                    </ul>
                </div>
                <div class="order_msg">
                    <h5 class="orderitem_title"><span></span>查询主体</h5>
                    <ul class="orderitem_con">
                        <li>真实姓名：{{PayOrderData.realname}}</li>
                        <li>身份证号：{{PayOrderData.id_card}}</li>
                        <li>手机号码：{{PayOrderData.phone}}</li>
                    </ul>
                </div>
                <div class="order_tips" v-if="PayOrderData.status==0">{{RemainingTime}}后未支付将自动关闭订单</div>
                <div class="order_tips" v-else-if="PayOrderData.status==1">订单已支付</div>
                <div class="order_tips" v-else>订单已取消，请重新下单</div>
                <div class="submit_order" @click="check_sumit(PayOrderData)">
                    {{check_sumit_txt}}
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import {getOrderXq,getGenerate} from '@/api/api'
	export default {
		name: "check_order",
        data(){
		    return {
                PayOrderData:[],
                RemainingTime:'',
                RemainingTimer:null,
                check_sumit_txt:'确认'
            }
        },
        mounted(){
		    this.getorder(this.$route.query.order_no)
        },
        methods:{
		    getorder(order_no){
		        var params = {
                    order_no:order_no,
                }
                getOrderXq(params).then((res)=>{
                    if(res.code==1){
                        var self = this;
                        this.PayOrderData = res.data;
                        if(res.data.is_before_pay==1){//xinyan miGuan
                            switch (res.data.status) {
                                case 0:
                                    this.check_sumit_txt = '去支付'
                                    break;
                                case 1:
                                    this.check_sumit_txt = '查看报告'
                                    break;
                                case 2:
                                    this.check_sumit_txt = '重新下单'
                                    break;
                            }
                        }else{//moxie
                            if(res.data.status==0||res.data.status==1){
                                this.check_sumit_txt = '查看报告'
                            }else{
                                this.check_sumit_txt = '重新下单'
                            }

                        }

                        var RemainingTime = res.data.pay_countdown
                        if(RemainingTime<=0)return;
                        function  gettime(date) {
                            let _hour = parseInt(date/3600)
                            let _min = parseInt((date%3600)/60)
                            let _s = ((date%3600)%60).toString().length==1?'0'+(date%3600)%60:((date%3600)%60);
                            return _hour+':'+_min+':'+_s
                        }
                        this.RemainingTimer =  setInterval(()=>{
                            RemainingTime-=1
                            if(RemainingTime==0){
                                clearInterval(timer)
                            }
                            self.RemainingTime = gettime(RemainingTime);
                        },1000)
                    }
                })
            },
            linkPay(order_data){
                if(order_data.is_before_pay==1){//xinyan miGuan
                    switch (order_data.status) {
                        case 0://未支付
                            this.$goRouter({name:'inquiry_pay',query:{order_no:this.PayOrderData.order_no}})
                            break;
                        case 1://已支付 查看报告
                            this.$goRouter({name:reportPage,query:{order_no:this.PayOrderData.order_no}})

                            break;
                        case 2://订单失效 重新下单
                            this.$goRouter({name:'creditInquiry',query:{order_no:this.PayOrderData.order_no}})
                            break;
                    }
                }else{//moxie
                    if(order_data.status==0||order_data.status==1){//查看报告
                        this.$goRouter({name:'report',query:{order_no:this.PayOrderData.order_no}})
                    }else{//订单失效 重新下单
                        this.$goRouter({name:'creditInquiry',query:{order_no:this.PayOrderData.order_no}})
                    }

                }

            },
            check_sumit(order_data){
		        if(this.PayOrderData.status==0){
		            this.linkPay(order_data)
                }else if(this.PayOrderData.status==1){
                    this.$goRouter({name:'report',query:{order_no:this.PayOrderData.order_no}})

                }else{
                    this.$goRouter({name:'creditInquiry'})
                }
            }
        },
        beforeRouteLeave(to,from,next){
            clearInterval(this.RemainingTimer)
            next()
        }
	}
</script>

<style scoped lang="less">

    .check_order_money{
        color:#fff;
        overflow: hidden;
        .text{
             font-size: 0.3rem;
            text-align: center;
            margin-top: 0.38rem;
        }
        .money{

            line-height: 1rem;
            font-size: 1rem;
            font-family: 'Arial';
            text-align: center;
            margin-top: 0.3rem;
        }
    }
    .order_msg{
        padding: 0.3rem 0.3rem 0.2rem;
        background: #fff;
        margin-bottom: 0.04rem;
        .orderitem_title{
            font-weight: normal;
            color:#39b2ff;
            font-size: 0.3rem;

            span{
                display: inline-block;
                width:0.15rem;
                height: 0.15rem;
                background: #39b2ff;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 0.1rem;
            }
        }
        .orderitem_con{
            margin-top: 0.1rem;
            li{
                height: 0.62rem;
                line-height: 0.62rem;
                font-size: 0.28rem;
                color: #4a4a4a;
            }
        }
    }
    .order_tips{
        font-size: 0.24rem;
        color:#a9a9a9;
        text-align: center;
        margin: 0.6rem 0 0.3rem;
    }
    .submit_order{
        width:6.86rem;
        margin:0 auto;
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        color:#fff;
        font-size: 0.36rem;
        border-radius:0.1rem;
        background: #39b2ff;
    }
</style>
