<template>
    <div style="background: #f5f5f5">
        <div class="report_banner" >
            <div class="name">{{reportData.user_info.id_name}}</div>
            <div class="order_no">报告编号：<i>{{order_no}}</i></div>
            <div class="userInformation">
                <div class="userMsgItem">
                    <img :src="bankCard" alt="" style="width:0.3rem;vertical-align: middle;"><span>{{reportData.user_info.id_no}}</span>
                </div>
                <div class="userMsgItem">
                    <img :src="bankPhone" alt="" style="width:0.3rem;vertical-align: middle;"><span>--</span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" style="margin-top: -0.4rem;">
            <div class="sectiontitle">借贷申请报告</div>
            <div class="smallItem"><span>申请行为评估</span></div>
            <canvas id="apply_behavior" width="315" height="200"></canvas>
            <div class="analysisWrods">
               {{reportData.text.apply_score_text}}
            </div>
            <div class="smallItem"><span>多头申请</span></div>
            <canvas id="many_head" width="315" height="200"></canvas>
            <div class="analysisWrods">
                {{reportData.text.query_sum_count_text}}
            </div>
            <div class="smallItem"><span>申请历史</span></div>
            <div class="at_list" >
                <div class="at_list_t"><span></span><span>查询笔数</span></div>
                <div class="at_list_con" >
                    <div class="at_list_li">
                        <span>{{reportData.apply_report_detail.latest_one_month}}</span><br/>
                        <span>近1月</span>
                    </div>
                    <div class="at_list_li">
                        <span>{{reportData.apply_report_detail.latest_three_month}}</span><br/>
                        <span>近3月</span>
                    </div>
                    <div class="at_list_li">
                        <span>{{reportData.apply_report_detail.latest_six_month}}</span><br/>
                        <span>近6月</span>
                    </div>
                </div>
            </div>
            <div class="analysisWrods">
                {{reportData.text.latest_query_count_text}}
            </div>
        </div>
        <div class="userInforBasic">
            <div class="sectiontitle">借贷行为报告</div>
            <div class="smallItem"><span>履约行为评估</span></div>
            <canvas id="performance_behavior" width="315" height="200"></canvas>
            <div class="analysisWrods">
                {{reportData.text.loans_score__text}}
            </div>
            <div class="smallItem"><span>履约行为</span></div>
            <div class="at_list" >
                <div class="at_list_t"><span></span><span>贷款订单数</span></div>
                <div class="at_list_con" >
                    <div class="at_list_li">
                        <span>{{reportData.behavior_report_detail.loans_count}}</span><br/>
                        <span>已放款</span>
                    </div>
                    <div class="at_list_li">
                        <span>{{reportData.behavior_report_detail.loans_settle_count}}</span><br/>
                        <span>已结清</span>
                    </div>
                    <div class="at_list_li">
                        <span>{{reportData.behavior_report_detail.loans_overdue_count}}</span><br/>
                        <span>逾期</span>
                    </div>
                </div>
            </div>
            <div class="analysisWrods">
                {{reportData.text.loans_overdue_coint_text}}
            </div>
            <div class="smallItem"><span>多头贷款</span></div>
            <canvas id="many_head_loan" width="315" height="200"></canvas>
            <div class="analysisWrods">
                {{reportData.text.loans_cash_count_text}}
            </div>

            <div class="smallItem"><span>贷款历史</span></div>
            <div class="base_card clearfix" style="margin-top: 0.3rem">
                <div class="card_li fl">
                    <span class="card_nu">{{this.reportData.behavior_report_detail.latest_one_month}}</span><br/>
                    <span class="card_li_text">近1个月贷款笔数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{this.reportData.behavior_report_detail.latest_three_month}}</span><br/>
                    <span class="card_li_text">近3个月贷款笔数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{this.reportData.behavior_report_detail.latest_six_month}}</span><br/>
                    <span class="card_li_text">近6个月贷款笔数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{this.reportData.behavior_report_detail.loans_long_time}}</span><br/>
                    <span class="card_li_text">信用贷款时长</span>
                </div>
            </div>
            <div class="analysisWrods">
                {{reportData.text.latest_count}}
            </div>
            <div class="smallItem" ><span>履约意愿</span></div>
            <canvas id="behavior_line" width="315" height="250"></canvas>
            <div class="analysisWrods">
                {{reportData.text.history_suc_fee_text}}
            </div>
        </div>
        <div class="userInforBasic">
            <div class="sectiontitle">信用现状报告</div>

            <div class="smallItem"><span>授信额度评估</span></div>
           <!-- <canvas id="credit_line_t" width="315" height="200"></canvas>-->
            <canvas id="credit_line_b" width="315" height="200"></canvas>
            <div class="base_card clearfix">
                <div class="card_li fl" v-for="(item,index) in reportData.behavior_report_detail.query">
                    <span class="card_nu">{{item.percent}}</span><br/>
                    <span class="card_li_text">{{item.name}}</span>
                </div>
               <!-- <div class="card_li fl">
                    <span class="card_nu">{{this.reportData.behavior_report_detail.latest_three_month}}</span><br/>
                    <span class="card_li_text">近3个月贷款笔数</span>
                </div>-->
            </div>
            <canvas id="credit_line" width="315" height="250"></canvas>
            <div class="analysisWrods">
                {{reportData.text.consfin}}
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
                bankCard:require('@/assets/bankCard.png'),
                bankLoc:require('@/assets/bankLoc.png'),
                bankPhone:require('@/assets/bankPhone.png'),
                bankUser:require('@/assets/bankUser.png')
            }
        },
        mounted(){


            this.initLine('behavior_line',this.reportData.behavior_report_detail.list)
            drawMain(
                'apply_behavior',
                this.reportData.apply_report_detail.apply_credibility,
                '#39B3FF',
                '#E9F7FF',
                {
                    label:'申请准入分',
                    value:this.reportData.apply_report_detail.apply_score
                });
            drawMain(
                'performance_behavior',
                this.reportData.behavior_report_detail.loans_credibility ,
                '#39B3FF',
                '#E9F7FF',
                {
                    label:'贷款行为分',
                    value:this.reportData.behavior_report_detail.loans_score
                });
            this.initCircle(
                'many_head',
                this.reportData.apply_report_detail.query,
                {
                    words:'总查询',
                    num:this.reportData.apply_report_detail.query_sum_count+'次'
                });
            this.initCircle(
                'many_head_loan',
                this.reportData.behavior_report_detail.query,
                {
                    words:'查询机构',
                    num:this.reportData.behavior_report_detail.loans_org_count+'个'
                });
            this.initCircle('credit_line_b',this.reportData.current_report_detail.query_loans);
            this.initLine('credit_line',this.reportData.current_report_detail.list)
        },
        methods:{
            pre_month(){
                this.cell_behavior_data.monthIndex--;
                if(this.cell_behavior_data.monthIndex<=0){
                    this.cell_behavior_data.monthIndex = this.cell_behavior_data.monthData.length-1
                }
            },
            next_month(){
                this.cell_behavior_data.monthIndex++;
                if(this.cell_behavior_data.monthIndex>=this.cell_behavior_data.monthData.length-1){
                    this.cell_behavior_data.monthIndex = 0
                }

            },
            initCircle(canvasId,data,tipsOpts){

                var words ='';
                var num ='';
                if(tipsOpts){
                    words = tipsOpts.words||'';
                     num = tipsOpts.num||''
                }


                var data = data
                var map = {};
                data.map(function(obj) {
                    map[obj.name] = obj.percent ;
                });

                var chart = new F2.Chart({
                    id: canvasId,
                    pixelRatio: window.devicePixelRatio,
                    padding: [20, 'auto']
                });
                chart.source(data, {
                    percent: {
                        formatter: function formatter(val) {
                            return val + '次';
                        }
                    }
                });
                chart.tooltip(false);
                chart.legend({
                    position: 'right',
                    itemFormatter: function itemFormatter(val) {
                        return val + '    ' + map[val];
                    }
                });
                chart.coord('polar', {
                    transposed: true,
                    innerRadius: 0.7,
                    radius: 0.85
                });
                chart.axis(false);
                chart.interval().position('a*percent').color('name', ['#39B2FF','#B1DFFF', '#C8B0FF', '#FF97C1']).adjust('stack');

                chart.guide().html({
                    position: ['50%', '45%'],
                    html: `<div style="width: 250px;height: 40px;text-align: center;color:#a9a9a9"><div style="font-size: 14px">${words}</div><div style="font-size: 14px">${num}</div></div>`
                });
                chart.render();
            },
            initLine(canvasId,data){
                function numberToMoney(n) {
                    return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                };
                var data =data;
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
    .analysisWrods{
        font-size: 0.24rem;color:#a9a9a9;line-height: 0.34rem;margin-top: 0.5rem;
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
                margin-top: 0.16rem;
                font-size: 0.36rem;
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
                    font-size: 0.36rem;
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
    .report_banner{
        overflow: hidden;
        height: 4.24rem;
        position: relative;
        background: url('../../../../assets/xinYan_banner.png') left top no-repeat;
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
        margin-top: 0.3rem;
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
