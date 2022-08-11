<template>
    <div style="background: #f5f5f5" v-if="reportData.user_basic_information">
        <div class="report_banner" >
            <div class="name">{{reportData.user_basic_information.name}}</div>
            <div class="order_no">报告编号：<i>{{order_no}}</i></div>
            <div class="userInformation">
                 <div class="userMsgItem">
                     <img :src="bankPhone" alt="" style="width:0.3rem;vertical-align: middle;"><span>{{reportData.user_basic_information.phone}}</span>
                 </div>
                 <div class="userMsgItem">
                     <img :src="bankEmail" alt="" style="width:0.3rem;vertical-align: middle;"><span>{{reportData.user_basic_information.email}}</span>
                 </div>
             </div>
        </div>
        <div class="userInforBasic">
            <div class="sectiontitle">用户账号摘要</div>
            <div class="smallItem"><span>基本信息</span></div>
            <div class="base_circle" v-if="reportData.is_pay&&reportData.credit_limit_informatin" >
                <canvas id="authorization_credit" width="315" height="300"></canvas>
                <div class="circleMsgtips">
                    <span >单一银行最高授信额度(元)：</span><span style="">{{reportData.credit_limit_informatin.max_total_credit_limit}}</span>
                </div>
                <div class="circleMsgtips">
                    <span >单一银行最低授信额度(元)：</span><span style="">{{reportData.credit_limit_informatin.min_total_credit_limit}}</span>
                </div>
            </div>
            <div class="base_card clearfix" v-if="reportData.is_pay&&reportData.credit_limit_informatin">
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.credit_limit_informatin.active_cards}}</span><br/>
                    <span class="card_li_text">活跃银行卡数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.credit_limit_informatin.bank_nums}}</span><br/>
                    <span class="card_li_text">活跃银行数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.credit_limit_informatin.first_bill_date}}</span><br/>
                    <span class="card_li_text">最初账单日</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.credit_limit_informatin.latest_authentication_time}}</span><br/>
                    <span class="card_li_text">账单最新认证时间</span>
                </div>
            </div>
            <div class="analysisWrods">
                {{reportData.text.credit_limit_informatin}}
                <div v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
            </div>
            <div class="smallItem" ><span>交易行为报告</span></div>
            <canvas id="behavior_line" width="315" height="400" v-if="reportData.transaction_information"></canvas>
            <div class="month" v-if="reportData.is_pay&&reportData.new_charge_information">
                <span class="m_pre" @click="pre_behavior_month">《</span><span class="month_num">
                近{{trading_behavior_data.trading_behavior_text}}</span>
                <span class="m_next" @click="next_behavior_month">》</span>
            </div>
            <div class="base_card clearfix" v-if="reportData.is_pay&&reportData.new_charge_information&&trading_behavior_data.data.length>0">
                <div class="card_li fl">
                    <span class="card_nu">{{trading_behavior_data.data[trading_behavior_data.index].average_consume}}</span><br/>
                    <span class="card_li_text">月均消费金额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{trading_behavior_data.data[trading_behavior_data.index].max_consume}}</span><br/>
                    <span class="card_li_text">最高消费金额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{trading_behavior_data.data[trading_behavior_data.index].min_consume}}</span><br/>
                    <span class="card_li_text">最低消费金额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{trading_behavior_data.data[trading_behavior_data.index].average_sell_count}}</span><br/>
                    <span class="card_li_text">月均消费笔数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{trading_behavior_data.data[trading_behavior_data.index].withdraw_amount}}</span><br/>
                    <span class="card_li_text">提现金额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{trading_behavior_data.data[trading_behavior_data.index].average_withdraw_amount}}</span><br/>
                    <span class="card_li_text">月均提现金额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{trading_behavior_data.data[trading_behavior_data.index].total_withdraw_count}}</span><br/>
                    <span class="card_li_text">提现次数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{trading_behavior_data.data[trading_behavior_data.index].months_from_last_withdraw}}</span><br/>
                    <span class="card_li_text">最近一次提现距今的月数</span>
                </div>
            </div>
            <div class="analysisWrods">
                {{reportData.text.incoming_information}}
                <div v-if="!reportData.is_pay" @click="link_topay" class="pay_showRP"><span>付款查看</span></div>
            </div>
            <div class="smallItem"><span>还款信息</span> </div>
            <div class="backMoney_msg clearfix" v-if="reportData.is_pay&&reportData.payment_information">
                <div class="bm_li fl"  >
                    <span>{{reportData.payment_information.total_payment_amount}}</span><br/>
                    <span>还款金额(元)</span>
                </div>
                <div class="bm_li fl"  data-mid="true">
                    <span>{{reportData.payment_information.total_payments_times}}</span><br/>
                    <span>还款笔数</span>
                </div>
                <div class="bm_li fl" >
                    <span>{{reportData.payment_information.repay_ratio}}</span><br/>
                    <span>还款率</span>
                </div>
            </div>
            <div class="analysisWrods">
                {{reportData.text.payment_information}}
                <div v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
            </div>
            <div class="smallItem"><span>逾期信息</span></div>
            <canvas v-if="reportData.is_pay&&reportData.overdue_analyze_information" id="overdue" width="315" height="200"></canvas>
            <div class="month" v-if="reportData.is_pay&&reportData.overdue_analyze_information">
                <span class="m_pre" @click="pre_overdue_month">《</span><span class="month_num">
                近{{overdue_data.overdue_data_text}}</span>
                <span class="m_next" @click="next_overdue_month">》</span>
            </div>
            <div class="base_card clearfix" v-if="reportData.is_pay&&reportData.overdue_analyze_information&&overdue_data.data.length>0">
                <div class="card_li fl">
                    <span class="card_nu">{{overdue_data.data[overdue_data.index].months_not_overdue}}</span><br/>
                    <span class="card_li_text">非延滞期数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{overdue_data.data[overdue_data.index].months_ovderdue}}</span><br/>
                    <span class="card_li_text">延滞期数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{overdue_data.data[overdue_data.index].banks_withdraw_overdue_fine}}</span><br/>
                    <span class="card_li_text">延滞金银行机构数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{overdue_data.data[overdue_data.index].card_nums_with_overdue_fine}}</span><br/>
                    <span class="card_li_text">延滞金卡片数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{overdue_data.data[overdue_data.index].first_overdue_amount}}</span><br/>
                    <span class="card_li_text">首次延滞金额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{overdue_data.data[overdue_data.index].max_overdue_fine}}</span><br/>
                    <span class="card_li_text">最高延滞金额(元)</span>
                </div>

            </div>
            <div class="analysisWrods">
                {{reportData.text.overdue_information}}
                <div v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
            </div>
            <div class="smallItem"><span>利费信息</span></div>
            <div class="base_card clearfix" style="margin-top: 0.3rem" v-if="reportData.is_pay&&reportData.interest_fee_information">
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.interest_fee_information.total_interest_amount}}</span><br/>
                    <span class="card_li_text">总利息(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.interest_fee_information.total_overdue_fine_amount}}</span><br/>
                    <span class="card_li_text">滞纳金(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.interest_fee_information.total_excess_amount}}</span><br/>
                    <span class="card_li_text">超额金(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.interest_fee_information.total_extra_amount}}</span><br/>
                    <span class="card_li_text">其他费用(元)</span>
                </div>
            </div>
            <div class="analysisWrods">
                {{reportData.text.interest_fee_information}}
                <div v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
            </div>
            <div class="smallItem"><span>收入信息</span></div>
            <div class="at_list" v-if="reportData.is_pay&&reportData.incoming_information">
                <div class="at_list_t"><span></span><span>平均收入</span></div>
                <div class="at_list_con" >
                    <div class="at_list_li">
                        <span>{{reportData.incoming_information.average_income_l3m}}</span><br/>
                        <span>近3月</span>
                    </div>
                    <div class="at_list_li">
                        <span>{{reportData.incoming_information.average_income_l6m}}</span><br/>
                        <span>近6月</span>
                    </div>
                    <div class="at_list_li">
                        <span>{{reportData.incoming_information.average_income_l12m}}</span><br/>
                        <span>近12月</span>
                    </div>
                </div>
            </div>
            <div class="at_list" v-if="reportData.is_pay&&reportData.incoming_information">
                <div class="at_list_t"><span></span><span>最低收入距今月份数</span></div>
                <div class="at_list_con" >
                    <div class="at_list_li">
                        <span>{{reportData.incoming_information.months_min_income_from_now_l3m}}</span><br/>
                        <span>近3月</span>
                    </div>
                    <div class="at_list_li">
                        <span>{{reportData.incoming_information.months_min_income_from_now_l6m}}</span><br/>
                        <span>近6月</span>
                    </div>
                    <div class="at_list_li">
                        <span>{{reportData.incoming_information.months_min_income_from_now_l12m}}</span><br/>
                        <span>近12月</span>
                    </div>
                </div>
            </div>
            <div class="analysisWrods">
                {{reportData.text.incoming_information}}
                <div v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
            </div>
        </div>

    </div>
</template>

<script>
    import antvPie from '@/pages/components/antv_pie'
    import F2 from '@antv/f2'
    import {getGenerate} from '@/api/api'
    import {getQuery,drawMain} from '@/js/util'
    export default {
        name: "demo",
        components:{
            antvPie
        },
        props:{
            reportData:{
                type:Object,
                default:()=>{}
            },
            order_no:{
                type:String,
                default: ''
            }
        },
        data(){
            return {
                orderData:{},
                bankPhone:require('@/assets/bankPhone.png'),
                bankEmail:require('@/assets/bankEmail.png'),
                trading_behavior_data:{
                    index:0,
                    trading_behavior_text:'3月',
                    data:{}
                },
                overdue_data:{
                    index:0,
                    overdue_data_text:'3月',
                    data:{}
                }
            }
        },
        mounted(){
            this.initReportData()
        },
        methods:{
            link_topay(){
                this.$emit('link_topay')
            },
            pre_behavior_month(){
                this.trading_behavior_data.index--;

                if(this.trading_behavior_data.index<0){
                    this.trading_behavior_data.index = this.trading_behavior_data.data.length-1
                };
                switch (this.trading_behavior_data.index) {
                    case 0 :
                        this.trading_behavior_data.trading_behavior_text='3月';
                        break;
                    case 1 :
                        this.trading_behavior_data.trading_behavior_text='6月';
                        break;
                    case 2 :
                        this.trading_behavior_data.trading_behavior_text='12月';
                        break;
                    default:
                        this.trading_behavior_data.trading_behavior_text='3月';
                }
            },
            next_behavior_month(){
                this.trading_behavior_data.index++;
                if(this.trading_behavior_data.index>this.trading_behavior_data.data.length-1){
                    this.trading_behavior_data.index = 0
                }
                switch (this.trading_behavior_data.index) {
                    case 0 :
                        this.trading_behavior_data.trading_behavior_text='3月';
                        break;
                    case 1 :
                        this.trading_behavior_data.trading_behavior_text='6月';
                        break;
                    case 2 :
                        this.trading_behavior_data.trading_behavior_text='12月';
                        break;
                    default:
                        this.trading_behavior_data.trading_behavior_text='3月';
                }
            },
            pre_overdue_month(){

                this.overdue_data.index--;
                if(this.overdue_data.monthIndex<0){
                    this.overdue_data.index = this.overdue_data.data.length-1
                }
                switch (this.overdue_data.index) {
                    case 0 :
                        this.overdue_data.overdue_data_text='3月';
                        break;
                    case 1 :
                        this.overdue_data.overdue_data_text='6月';
                        break;
                    case 2 :
                        this.overdue_data.overdue_data_text='12月';
                        break;
                    default:
                        this.overdue_data.overdue_data_text='3月';
                }
            },
            next_overdue_month(){
                this.overdue_data.index++;
                if(this.overdue_data.index>this.overdue_data.data.length-1){
                    this.overdue_data.index = 0
                }
                switch (this.overdue_data.index) {
                    case 0 :
                        this.overdue_data.overdue_data_text='3月';
                        break;
                    case 1 :
                        this.overdue_data.overdue_data_text='6月';
                        break;
                    case 2 :
                        this.overdue_data.overdue_data_text='12月';
                        break;
                    default:
                        this.overdue_data.overdue_data_text='3月';
                }

            },
            initReportData(){
                if(!this.reportData.is_pay)return
                this.trading_behavior_data.data = this.reportData.new_charge_information;


                this.overdue_data.data = this.reportData.overdue_analyze_information

                this.$nextTick(()=>{

                    if(this.reportData.credit_limit_informatin){
                        this.initCircle('authorization_credit')
                    }
                    if(this.reportData.transaction_information){
                        this.initLine('behavior_line');
                    }
                    if(this.reportData.overdue_information){
                        /*逾期信息*/
                        drawMain('overdue',this.reportData.overdue_information.total_overdue_amount_div_new_balance,'#ff5f3b','#ffc130',{label:'未还金额',value:this.reportData.overdue_information.total_overdue_amount})
                    }

                })
            },
            initCircle(canvasId){
                var data = this.reportData.credit_limit_informatin.list

                var chart = new F2.Chart({
                    id: canvasId,
                    pixelRatio: window.devicePixelRatio
                });

                chart.source(data);

                chart.coord('polar', {
                    transposed: true,
                    inner: 0.1,
                    radius: 1.25
                });

                chart.axis(false);
                for(let i in data){
                    if(i%2==0){
                        let value = data[i].b
                        chart.guide().html({
                            position: [data[i].a, data[i].b],
                            html: `<div style="background: #50577D;font-size: 10px;color: #fff">${value}</div>`,
                            alignX: 'center',
                            alignY: 'bottom',
                            offsetY: -8,
                            offsetX: 2
                        });
                    }
                }
                chart.interval().position('a*b').color('a',[ '#c95081','#ff97c1','#a37ace','#c8b0ff','#4c7bfe','#39b2ff'])
                chart.render();
            },
            initLine(canvasId){
                function numberToMoney(n) {
                    return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }
                var data = this.reportData.transaction_information

                var chart = new F2.Chart({
                    id: canvasId,
                    pixelRatio: window.devicePixelRatio,
                    padding: [20, 20, 5]
                });
                chart.source(data);
                chart.coord({
                    transposed: true
                });
                chart.axis(false);
                chart.tooltip(false);
                chart.interval().position('brand*const').color('#d9e4eb').size(10).animate(false);
                chart.interval().position('brand*sales').size(10);

// 绘制文本
                data.map(function(obj) {
                    chart.guide().text({
                        position: [obj.brand, 'min'],
                        content: obj.brand,
                        style: {
                            textAlign: 'start',
                            textBaseline: 'bottom'
                        },
                        offsetY: -8
                    });
                    chart.guide().text({
                        position: [obj.brand, 'max'],
                        content: '￥' + numberToMoney(obj.sales),
                        style: {
                            textAlign: 'end',
                            textBaseline: 'bottom'
                        },
                        offsetY: -8
                    });
                });
                chart.render();
            },

        }
    }
</script>

<style scoped lang="less">
    .sectiontitle{
        font-size: 0.3rem;
        font-weight: bold;
        color:#4a4a4a;
        line-height: 1em;
        /*margin-bottom: 0.4rem;*/
    }
    .smallItem{
        span{
            height: 0.4rem;
            line-height: calc(~"0.4rem - 2px");
            font-size: 0.2rem;
            color:#39B2FF;
            border-radius: 0.2rem;
            padding: 0 0.2rem;
            border:1px solid #39B2FF;
            display: inline-block;
            box-sizing: border-box;
            margin-top: 0.4rem;
        }

    }

    .base_card{
        .card_li{
            width:49%;
            height: 1.12rem;
            text-align: center;
            background: #f5f5f5;
            margin-right: 1%;
            margin-bottom: 1%;
            -webkit-border-radius: 0.1rem;
            -moz-border-radius: 0.1rem;
            border-radius: 0.1rem;
            .card_nu{
                display: inline-block;
                margin: 0.2rem 0 0.16rem 0;
                font-size: 0.3rem;
                color:#39B2FF;
                line-height: 1em;
            }
            .card_li_text{
                font-size: 0.24rem;
                color:#a9a9a9;
                line-height: 1em;
            }
        }
    }
    .at_list{
        border:1px solid #a9a9a9;
        padding: 0.28rem;
        margin-top: 0.3rem;
        -webkit-border-radius: 0.1rem;
        -moz-border-radius: 0.1rem;
        border-radius: 0.1rem;
        .at_list_t{
            margin-bottom: 0.1rem;
            span:nth-of-type(1){
                display: inline-block;
                height: 0.2rem;
                width:0.2rem;
                -webkit-border-radius: 0.1rem;
                -moz-border-radius: 0.1rem;
                border-radius: 0.1rem;
                background: #39B2FF;
            }
            span:nth-of-type(2){
                font-size: 0.24rem;
                margin: 0 0.15rem;
                color:#4A4A4A;
                font-weight: bold;
            }
            span:nth-of-type(3){
                color:#aaa;
                font-size: 0.24rem;
            }
        }
        .at_list_con{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .at_list_li{
                text-align: center;
                span:nth-of-type(1){
                    color:#39B2FF;
                    font-size: 0.3rem;
                }
                span:nth-of-type(2){
                    font-size: 0.24rem;
                    color:#a9a9a9;
                }
            }
        }
    }
    .month{
        padding: 0 0.32rem;
        text-align: center;
        margin: 0.15rem auto;
        height: 0.8rem;
        line-height: 0.8rem;
        .m_pre{
            display: inline-block;
            width:0.8rem;
        }
        .month_num{
            margin:0 0.6rem;
        }
        .m_next{
            display: inline-block;
            width:0.8rem;
        }
    }
    .backMoney_msg{
        margin-top: 0.3rem;
        div[data-mid]{
            margin:0 0.08rem;
        }
        .bm_li{
            width:2.04rem;height: 1.1rem;
            background: #f5f5f5;
            text-align: center;
            padding-top: 0.1rem;
            box-sizing: border-box;
            span{
                line-height: 1em;
            }
            span:nth-of-type(1){
                font-size: 0.3rem;
                line-height: 0.5rem;
                color:#39b2ff;
            }
            span:nth-of-type(2){
                font-size: 0.24rem;

                color:#a9a9a9;
            }

        }
    }
    .report_banner{
        overflow: hidden;
        height: 4.24rem;
        position: relative;
        background: url('../../../../assets/bankBanner.png') left top no-repeat;
        background-size: 100%;
        .name{
            font-size: 0.48rem;
            margin-top: 0.6rem;
            text-align: center;
            color:#fff;
        }
        .order_no{
            margin-top: 0.3rem;
            font-size: 0.28rem;
            color:#fff;
            text-align: center;
        }
        .userInformation{
            margin: 0.3rem 0.5rem 0 0.5rem;
            background: rgba(255,255,255,.4);
            border-radius: 0.1rem;
            padding: 0.3rem;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            .userMsgItem{
                width:50%;

                span{
                    color:#fff;
                    margin-left: 0.3rem;
                    font-size: 0.24rem;
                }
            }
        }
    }
    .userInforBasic{
        z-index: 99;
        position: relative;
        padding:  0.3rem;
        margin: 0 0.3rem;
        margin-top: -0.4rem;
        border-radius: 0.2rem;
        background: #fff;

        .base_circle{
            margin-bottom: 0.3rem;
            .circleMsgtips{

                span:nth-of-type(1){
                    color:#a9a9a9;font-size: 0.24rem;
                    line-height: 1em;
                    margin-bottom: 0.2rem;
                }
                span:nth-of-type(2){
                    color:#39b2ff;font-size: 0.24rem
                }
            }


        }

    }
</style>
