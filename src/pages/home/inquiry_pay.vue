<template>
    <!--<flyPage has-nav>-->
    <div>
        <section slot="content">
            <div class="header_banner inquiry_pay">
                <div class="pay_step">
                    <img :src="pay_step" alt="">
                </div>
            </div>
            <div class="pay_orderBill">
                <h5 class="billTitle"><span></span>支付信息</h5>
                <div class="pay_orderbill_msg">
                    <div class="bill_name"><img src="@/assets/img/creditInquiry_icon.png" alt="">{{orderData.category_name}}</div>
                    <div class="bill_No">NO.&nbsp;订单编号：{{orderData.order_no}}</div>
                    <div class="bill_money">订单金额：{{orderData.amount}}</div>
                </div>
            </div>
            <div>
                <ul class="apply_type">
                    <li class="typelist clearfix" @click="select_Apply(3)">
                        <div class="apply_icon fl"><img src="@/assets/Balance.png" alt="">余额支付</div>
                        <div class="select_type fr"><span class="iconfont" :class="current_Apply_type==3?'icon-xuanzhong':'icon-unchecked'"></span></div>
                    </li>
                    <li class="typelist clearfix" @click="select_Apply(2)">
                        <div class="apply_icon fl"><img src="@/assets/weix_apply.png" alt="">微信支付</div>
                        <div class="select_type fr"><span class="iconfont" :class="current_Apply_type==2?'icon-xuanzhong':'icon-unchecked'"></span></div>
                    </li>
                    <li class="typelist clearfix" @click="select_Apply(1)">
                        <div class="apply_icon fl"><img src="@/assets/zhifubao_apply.png" alt="">支付宝支付</div>
                        <div class="select_type fr"><span class="iconfont" :class="current_Apply_type==1?'icon-xuanzhong':'icon-unchecked'"></span></div>
                    </li>
                </ul>
                <div class="total_money">微信支付：<i style="color:#39B2FF">{{orderData.amount}}</i>元</div>
                <div v-if="current_Apply_type==3" class="apply_submit" @click="balance">确认支付</div>
                <div v-else class="apply_submit" @click="getPayOrder">
                    确认支付
                </div>
            </div>
            <safeKeyboard  v-model="safeKeyboardVisible" @pasEndInput="pasEndInput" @inputComfir="getPayOrder"></safeKeyboard>
            <div v-html="pay_con"></div>
        </section>
    </div>
   <!-- </flyPage>-->
</template>

<script>
    import {getOrderXq} from '@/api/api'
    import {payOrder} from '@/api/api'
	export default {
		name: "inquiry_pay",
        data(){

		    return {
		        pay_step:require('@/assets/pay_step.png'),
                current_Apply_type:2,
                pay_con:'',
                order_no:'',
                orderData:{},
                safeKeyboardVisible:false,
                balancePas:''
            }
        },
        mounted(){
		    this.order_no = this.$route.query.order_no
            var params = {
                order_no:this.order_no,
            }
            getOrderXq(params).then((res)=> {
                if (res.code == 1) {
                    this.orderData =  res.data
                }
            })

        },
        methods:{
            select_Apply(type){
                this.current_Apply_type = type;
            },
            pasEndInput(val){//输入完成获取密码
                this.balancePas = val
            },
            balance(){//余额
                this.safeKeyboardVisible=true;
            },
            getPayOrder(){
                var params = {
                    order_no:this.order_no,
                    type:this.current_Apply_type,
                    pay_password:this.balancePas
                }
                payOrder(params).then((res)=>{
                    if(res.code==1){
                        this.pay_con = res.data;
                        if(this.current_Apply_type==1){
                            this.$nextTick(()=>{//支付宝
                                document.forms['alipaysubmit'].submit();
                            })
                        }else if(this.current_Apply_type==2){
                            this.$nextTick(()=>{//微信
                                document.forms['wepaysubmit'].submit();
                            })
                        }else{//余额
                            this.safeKeyboardVisible=false;
                            this.balancePas = '';//密码清空
                            let successToa = this.$toast.success({
                                message:'支付成功',
                                forbidClick: true, // 禁用背景点击
                            })
                            setTimeout(()=>{
                                successToa.clear()
                                this.$router.replace({name:'report',query:{order_no:this.order_no}})
                            },1000)
                        }

                    }else{
                        this.$showToast({
                            message:res.msg,
                            type:'fail',
                        })
                    }
                })
            }
        }
	}
</script>

<style scoped lang="less">
    .inquiry_pay{
        overflow: hidden;
        .pay_step{
            text-align: center;
            margin-top: 0.36rem;
            img{
                width: 6.3rem;
            }
        }

    }
    .pay_orderBill{

        .billTitle{
            padding: 0 0.3rem;
            background: #fff;
            height: 0.84rem;
            line-height: 0.84rem;
            font-size: 0.3rem;
            color:#39B2FF;
            &>span{
                display: inline-block;
                width:0.08rem;
                height: 0.08rem;
                background: #39B2FF;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 0.1rem;
            }
        }
        .pay_orderbill_msg{
            padding: 0 0.3rem;
            background: #fff;
            margin-top: 0.04rem;
            height: 2rem;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            flex-direction: column;
            color:#4a4a4a;
            font-size: 0.3rem;
            .bill_name{
                img{
                    vertical-align: middle;
                    width:0.45rem
                }
            }
            .bill_No{
                font-size: 0.24rem;
                color:#666
            }
        }
    }
    .apply_type{
        margin-top: 0.08rem;
        .typelist{
            background: #fff;
            padding: 0 0.3rem;
            margin-bottom: 0.08rem;
            height: 0.8rem;
            box-sizing: border-box;

            .apply_icon{
                line-height: 0.8rem;
                font-size: 0.32rem;
                img{
                    width:0.4rem;
                    vertical-align: middle;
                    margin-right: 0.2rem;
                }
            }
            .select_type{
                height: 0.8rem;
                line-height: 0.8rem;
            }
        }

    }
    .total_money{
        text-align: right;
        margin: 0.4rem 0.3rem;
        font-size: 0.36rem;
        color: #4a4a4a;
    }
    .apply_submit{
        width: 6.9rem;
        margin: 0 auto;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        color:#fff;
        background: #39B2FF;
        border-radius: 0.1rem;
        font-size: 0.36rem;
    }
</style>
