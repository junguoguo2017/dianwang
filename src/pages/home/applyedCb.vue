<template>
    <div>
        <div :class="orderData.code==0?'failStyle':'successStyle'">
            <div class="statusImg">
                <img :src="orderData.code==0?failImg:successImg" alt="">
                <p class="statusTips">{{orderData.code==0?'啊哦，支付失败了！':'支付成功了'}}</p>
            </div>
            <div class="order_dec">
                <p><span>产品名称：</span><span>{{decodeURIComponent(orderData.category_name)}}</span></p>
                <p><span>订单号：</span><span>{{orderData.order_no}}</span></p>
                <p><span>金额：</span><span>{{orderData.amount}}</span></p>
                <p><span>支付方式：</span><span>{{decodeURIComponent(orderData.pay_type_text)}}</span></p>
                <p><span>支付时间：</span><span>{{decodeURIComponent(orderData.pay_time)}}</span></p>
            </div>
            <div class="operateBtn" >
                <a v-if="$store.state.client=='h5'" class="left" href="javascript:;" @click="$goRouter({name:'thirdPartyHome'})">返回首页</a>
                <a v-if="orderData.code==1" class="right" href="javascript:;" @click="linkto">查看报告</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {getQuery} from '@/js/util'
    import {getOrderXq,orderPayStatus} from '@/api/api'
	export default {
		name: "applyedCb",
        data(){
		    return {
                successImg:require('@/assets/applySuccess.png'),
                failImg:require('@/assets/applyFail.png'),
                code:0,
                statusTips:'',
                order_no:'',
                orderData:{}
            }
        },
        created(){

            this.orderData = getQuery()
        },
        mounted(){

            // 监听 visibility change 事件
            var self = this;

            document.addEventListener("qbrowserVisibilityChange", function(e){
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("visibilitychange", false, false);
                evt.hidden = e.hidden;
                document.dispatchEvent(evt);
            }, true);
            document.addEventListener("visibilitychange", function(e) {
                e.hidden = e.hidden === undefined ? document.hidden : e.hidden;
            }, true);
            document.addEventListener("visibilitychange", function(e) {
                if(!e.hidden) {
                    // 网页
                    if(self.orderData.code==0){
                        self.getOrderPayStatus()
                    }
                }
            });
            this.getOrderPayStatus()
            this.req_num=0
            this.timer = setInterval(()=>{
                this.req_num++
                if(this.req_num>3){
                    clearInterval(this.timer)
                    return
                }
                this.getOrderPayStatus()
            },2000)
        },
        methods:{
		    getOrderPayStatus(){
		        var params = {
		            order_no:this.orderData.order_no
                }
                orderPayStatus(params).then((res)=>{
                    if(res.code==1){
                        if(res.data.status!=1){
                            this.orderData.code =0
                        }else{
                            this.orderData.code =1
                        }
                    }
                })
            },
            linkto(){
                this.$router.replace({name:'report',query:{order_no:this.orderData.order_no}})
            }
        },
        beforeDestroy() {
		    if(this.timer){
                clearInterval(this.timer)
            }
        }
    }
</script>

<style scoped lang="less">
    @successColor:#39b2ff;
    @failColor:#ff555c;
    .successStyle{

        .statusImg{
            padding-top: 0.75rem;
            text-align: center;
            img{
                width:2rem;
            }
            .statusTips{
                margin-top: 0.4rem;
                font-size: 0.48rem;
                color:@successColor;
            }
        }
        .operateBtn{
            margin: 0.75rem auto 0;
            width:5.04rem;
            color:#fff;
            a{

                display: inline-block;
                height: 0.8rem;
                line-height: 0.8rem;
                width:inherit;
                box-sizing: border-box;
                text-align: center;
                font-size: 0.36rem;
                padding: 0 0.4rem;
                border-radius:0.4rem
            }
            .left{
                background: @successColor;
                color:#fff;
            }
            .right{
                margin-top: 0.5rem;
                border:0.04rem solid @successColor;
                color:@successColor;
            }
        }
    }
    .order_dec{
        margin-top: 0.75rem;
        padding-left:1.3rem;
        p{

            line-height: 0.4rem;
            color:#a9a9a9;
            font-size: 0.24rem;
        }
    }
    .failStyle{

        .statusImg{
            padding-top: 0.75rem;
            text-align: center;
            img{
                width:2rem;
            }
            .statusTips{
                margin-top: 0.4rem;
                font-size: 0.48rem;
                color:@failColor;
            }
        }
        .operateBtn{
            margin: 0.75rem auto 0;
            width:5.04rem;
            color:#fff;
            a{

                display: inline-block;
                height: 0.8rem;
                line-height: 0.8rem;
                width:inherit;
                box-sizing: border-box;
                text-align: center;
                font-size: 0.36rem;
                padding: 0 0.4rem;
                border-radius:0.4rem
            }
            .left{
                background: @failColor;
                color:#fff;
            }
            .right{
                margin-top: 0.5rem;
                border:0.04rem solid @failColor;
                color:@failColor;
            }
        }
    }
</style>
