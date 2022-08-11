<template>
    <div >
        <div class="report_banner">
            <div style="text-align: center;padding-top: 0.7rem">
                <span style="font-size: 0.48rem;color:#fff">{{reportData.user_basic.mobile}}</span>
                <div style="margin-top: 0.3rem;display: flex;justify-content: space-around;align-items: center"><span style="color:#fff;font-size:0.28rem;">{{reportData.user_basic.source_name_zh}}</span><span style="color:#fff;font-size:0.28rem;">{{reportData.user_basic.name}}</span></div>
            </div>
            <div class="call_msg" style="">
                <div class="analysisTypetitle">通话数据概况</div>
                <canvas  v-if="reportData.is_pay" id="probably_line" width="311" height="200"></canvas>
                <div  v-if="reportData.is_pay&&reportData.cell_behavior" style="padding-left: 0.3rem;" class="clearfix">
                    <div class="fl" style="width: 50%;">
                        <img :src="line2" style="width:0.2rem" alt=""><span style="color:#a9a9a9;margin-left: 0.1rem;">主叫次数</span>
                    </div>
                    <div class="fl" style="width: 50%;">
                        <img :src="line1" alt="" style="width:0.2rem"><span style="color:#a9a9a9;margin-left: 0.1rem;">被叫次数</span>
                    </div>
                    <div class="fl" style="width: 50%;">
                        <span style="color:#a9a9a9">月均话费</span><span style="color: #39B2FF;margin-left: 0.1rem;">{{reportData.cell_behavior.avg_amount}}</span>
                    </div>
                    <div class="fl" style="width: 50%;">
                        <span style="color:#a9a9a9">月均通话次数</span><span style="color:#FF5F3B;margin-left: 0.1rem;" >{{reportData.cell_behavior.avg_call_cnt}}</span>
                    </div>
                </div>

                <div   class="probablyStatus"  style="margin-top:0.4rem">
                    <div class="month" v-if="reportData.is_pay">
                        <span
                            class="m_pre"
                            @click="pre_month"

                        >《</span>
                        <span class="month_num"  v-if="cell_behavior_data.monthData.length>0">{{cell_behavior_data.monthData[cell_behavior_data.monthIndex].cell_mth}}</span>
                        <span class="m_next" @click="next_month">》</span>
                    </div>
                    <div class="at_list_con" v-if="reportData.is_pay&&cell_behavior_data.monthData.length>0">
                        <div class="at_list_li">
                            <span>{{cell_behavior_data.monthData[cell_behavior_data.monthIndex].dial_cnt}}</span><br/>
                            <span>主叫次数</span>
                        </div>
                        <div class="at_list_li">
                            <span>{{cell_behavior_data.monthData[cell_behavior_data.monthIndex].dialed_cnt}}</span><br/>
                            <span>被叫次数</span>
                        </div>
                        <div class="at_list_li">
                            <span>{{cell_behavior_data.monthData[cell_behavior_data.monthIndex].call_time}}</span><br/>
                            <span>通话时长(分)</span>
                        </div>
                        <div class="at_list_li">
                            <span>{{cell_behavior_data.monthData[cell_behavior_data.monthIndex].total_amount}}</span><br/>
                            <span>话费(元)</span>
                        </div>
                    </div>
                    <div class="analysisWrods">
                        {{reportData.text.behavior_text}}
                        <div v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
                    </div>
                </div>
            </div>


        </div>


        <div class="analysis_b" :style="{marginTop:reportData.is_pay?'8rem ':'1rem'}">
            <div class="analysisTypetitle"  >通话类型分析</div>
            <div class="analysisType">
                <div   class="sm_title">
                    金融类通话
                    <span></span>
                </div>
                <div class="at_list"  v-if="reportData.is_pay&&call_risk_analysis_data.analysis_point1" v-for="(item,index) in call_risk_analysis_data.analysis_point1">
                    <div class="at_list_t"><span></span><span>{{item.analysis_desc}}通话</span></div>
                    <div class="at_list_con">
                        <div class="at_list_li">
                            <span>{{item.call_cnt_6m}}</span><br/>
                            <span>通话次数</span>
                        </div>
                        <div class="at_list_li">
                            <span>{{item.call_dialed_cnt_6m}}</span><br/>
                            <span>被叫次数</span>
                        </div>
                        <div class="at_list_li">
                            <span>{{item.call_time_6m}}</span><br/>
                            <span>通话时长(分)</span>
                        </div>
                    </div>
                </div>
                <div class="analysisWrods">
                    {{reportData.text.analysis_point1_text}}
                    <div v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
                </div>
            </div>
            <div class="analysisType" v-if="reportData.is_pay&&call_risk_analysis_data.analysis_point2_null">
                <div   class="sm_title">
                    风险类通话
                </div>
                <antvPie   :per_null="call_risk_analysis_data.analysis_point2_null" :Data ="call_risk_analysis_data.analysis_point2"></antvPie>
                <div class="analysisWrods">
                    {{reportData.text.analysis_point2_text}}
                    <div v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
                </div>
            </div>
        </div>
        <div class="" style="margin: 0.3rem 0.32rem 0;background: #fff;border-radius:0.2rem;padding:0.3rem;">
            <div class="analysisTypetitle" >通话活跃分析</div>
            <div class="analysisType">
                <div  class="sm_title">
                    活跃时段
                    <span></span>
                </div>
                <canvas  v-if="reportData.is_pay&&call_duration_detail.duration_list"  id="analysisType_line" width="311" height="200"></canvas>
                <div class="clearfix"  v-if="reportData.is_pay" style="padding-left: 0.3rem;">
                    <div class="fl" style="width: 50%;">
                        <img :src="line2" style="width:0.2rem" alt="">
                        <span style="color:#a9a9a9;margin-left: 0.1rem;">通话时长</span>
                    </div>
                    <div class="fl" style="width: 50%;">
                        <img :src="line1" alt="" style="width:0.2rem">
                        <span style="color:#a9a9a9;margin-left: 0.1rem;">通话次数</span>
                    </div>
                </div>
                <div class="analysisWrods">
                    {{reportData.text.duration_text}}
                    <div v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
                </div>
            </div>
            <div class="analysisType">
                <div   class="sm_title">
                    活跃天数
                    <span></span>
                </div>
                <div class="hyDays_li" v-if="reportData.is_pay&&reportData.active_degree">
                    <div class="hy_list_li">
                        <span>{{reportData.active_degree.item.max_power_on_day}}</span><br/>
                        <span>活跃天数</span>
                    </div>
                    <div class="hy_list_li">
                        <span>{{reportData.active_degree.item.no_call_day}}</span><br/>
                        <span>非活跃天数</span>
                    </div>
                    <div class="hy_list_li">
                        <span>{{reportData.active_degree.item.continue_power_off_cnt}}</span><br/>
                        <span>连续3天以上关机次数</span>
                    </div>
                    <div class="hy_list_li">
                        <span>{{reportData.active_degree.item.power_off_day}}</span><br/>
                        <span>关机天数</span>
                    </div>
                </div>
                <div class="analysisWrods">
                    {{reportData.text.active_degree}}
                    <div v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
                </div>
            </div>
            <div class="analysisType">
                <div   class="sm_title">
                    活跃地区
                    <span></span>
                </div>
                <div  v-if="reportData.is_pay&&reportData.friend_circle">
                    <div
                        class="hyarea_list_li"
                        v-for="(item, index) in reportData.friend_circle.location_top_list">
                        <img :src="location"   class="areaicon" style="" alt=""><br/>
                        <span class="area">{{item.location}}</span>
                        <span class="call">通话{{item.call_cnt}}次</span><br/>
                        <span class="times">时长{{item.call_time}}</span>
                    </div>
                </div>

                <div class="analysisWrods">
                    {{reportData.text.location_top_list_text}}
                    <div v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
                </div>
            </div>
        </div>

        <div style="margin: 0.3rem 0.32rem 0;background: #fff;border-radius:0.2rem; padding: 0.3rem ;">
            <div class="analysisTypetitle" >联系人深度分析</div>
            <div
                class="concatDepth"
                v-if="reportData.is_pay&&reportData.call_contact_detail"
                v-for="(item,index) in reportData.call_contact_detail">
                <div class="phone">
                    <span class="timecolor" :style="{background:colorFomat(item.call_time_6m)}"></span>
                    <span style="margin: 0 0.1rem;color:#4a4a4a;font-weight: bold;">{{item.peer_num}}</span>
                    <span style="color: #a9a9a9;">{{item.city}}</span>
                </div>
                <div class="phone_detial">
                    <div class="phone_detialitem">
                        <span>{{item.dial_cnt_6m}}</span><br/>
                        <span>主叫次数</span>
                    </div>
                    <div class="phone_detialitem">
                        <span>{{item.dialed_cnt_6m}}</span><br/>
                        <span>被叫次数</span>
                    </div>
                    <div class="phone_detialitem">
                        <span>{{item.call_time_6m}}</span><br/>
                        <span>通话时长(分)</span>
                    </div>
                    <div class="phone_detialitem">
                        <span>{{item.call_cnt_6m}}</span><br/>
                        <span>通话次数</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import antvPie from '@/pages/components/antv_pie'
    import F2 from '@antv/f2'
    import {getGenerate} from '@/api/api'
    import {getQuery} from '@/js/util'
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
                cell_behavior_data:{
                    monthIndex:0,
                    monthData:[]
                },
                line1:require('@/assets/line1.png'),
                line2:require('@/assets/line2.png'),
                location:require('@/assets/location.png'),
                gk_line_data:[],
                hy_line_data:[],
                call_risk_analysis_data:[],//类型分析
                call_duration_detail:[],//活跃分析
            }
        },
        mounted(){
            this.initReportData()
        },
        methods:{
            link_topay(){
                this.$emit('link_topay')
            },
            pre_month(){
                this.cell_behavior_data.monthIndex--;
                if(this.cell_behavior_data.monthIndex<0){
                    this.cell_behavior_data.monthIndex = this.cell_behavior_data.monthData.length-1
                }
            },
            next_month(){
                this.cell_behavior_data.monthIndex++;
                if(this.cell_behavior_data.monthIndex>this.cell_behavior_data.monthData.length-1){
                    this.cell_behavior_data.monthIndex = 0
                }
            },
            initReportData(){
                /*通话概况*/
                if(!this.reportData.is_pay)return;
                this.cell_behavior_data.monthData = this.reportData.cell_behavior.behavior;

                for(let i in this.cell_behavior_data.monthData){
                   this.gk_line_data.push({//主叫
                        name:'主叫',
                        value1:this.cell_behavior_data.monthData[i].cell_mth,
                        value2:this.cell_behavior_data.monthData[i].dial_cnt
                    })
                    this.gk_line_data.push({//被叫
                        name:'被叫',
                        value1:this.cell_behavior_data.monthData[i].cell_mth,
                        value2:this.cell_behavior_data.monthData[i].dialed_cnt
                    })
                }
                this.$nextTick(()=>{
                    this.initline(this.gk_line_data,'probably_line')
                })
                this.cell_behavior_data.monthIndex = this.reportData.cell_behavior.behavior.length-1;//默认最近一个月
                /*通话类型*/
                this.call_risk_analysis_data = this.reportData.call_risk_analysis
                /*活跃时段*/
                this.call_duration_detail =this.reportData.call_duration_detail;
                for(let i in this.call_duration_detail.duration_list){
                    this.hy_line_data.push({//
                        name:'通话时长（分）',
                        value1:this.call_duration_detail.duration_list[i].time_step_zh,
                        value2:this.call_duration_detail.duration_list[i].total_time,

                    })
                    this.hy_line_data.push({//被叫
                        name:'通话次数',
                        value1:this.call_duration_detail.duration_list[i].time_step_zh,
                        value2:this.call_duration_detail.duration_list[i].total_cnt
                    })
                }
                this.$nextTick(()=>[
                    this.initline(this.hy_line_data,'analysisType_line')
                ])
            },
            initline(Data,canvasId){
                var Shape = F2.Shape;
                var Util = F2.Util;

                Shape.registerShape('interval', 'text', {
                    draw: function draw(cfg, container) {
                        var points = this.parsePoints(cfg.points);
                        // points 顶点的顺序
                        // 1 ---- 2
                        // |      |
                        // 0 ---- 3
                        var style = Util.mix({
                            fill: cfg.color,
                            z: true // 需要闭合
                        }, cfg.style);
                        var intervalShape = container.addShape('rect', {
                            attrs: Util.mix({
                                x: points[1].x,
                                y: points[1].y,
                                width: points[2].x - points[1].x,
                                height: points[0].y - points[1].y
                            }, style)
                        });

                        var origin = cfg.origin._origin; // 获取对应的原始数据记录
                        var textShape = container.addShape('text', {
                            zIndex: 1,
                            attrs: {
                                x: (points[1].x + points[2].x) / 2,
                                y: points[1].y - 5, // 往上偏移 5 像素
                                text: origin['value2'],
                                fill: '#808080',
                                textAlign: 'center',
                                textBaseline: 'bottom',
                                fontSize: 10 // 字体大小
                            }
                        });
                        container.sort();
                        return [intervalShape, textShape];
                    }
                });
                var chart = new F2.Chart({
                    id: canvasId,
                    pixelRatio: window.devicePixelRatio
                });
                chart.source(Data);
                chart.legend(false);

                chart.interval().position('value1*value2').color('name',['l(90) 0:#7dd1ff 1:#39b2ff','l(90) 0:#ffc58b 1:#ff5f3b']).shape('text').adjust({
                    type: 'dodge',
                    marginRatio: 0.2
                }).style({
                    radius: [4, 4, 0, 0]
                });

                chart.render();
            },
            colorFomat(times){
                if(times<200){
                    return '#50dc64'
                }else if(times>=200&&times<400){
                    return '#FFC130'
                }else {
                    return '#FF5F3B'
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .report_banner{
        height: 4.24rem;
        position: relative;
        background: url('../../../../assets/report_banner.png') left top no-repeat;
        background-size: 100%;
    }
    .analysis_b{
        margin:0 0.32rem;background: #fff;border-radius:0.2rem;padding: 0.3rem ;
    }

    .analysisTypetitle{
        font-size:0.3rem;color:#4a4a4a;font-weight: bold;
    }
    .call_msg{
        position: absolute;left: 0.3rem;top:2.2rem;right:0.3rem; padding: 0.3rem;background: #fff;border-radius:0.2rem;
    }
    .probablyStatus{
        background: #fff;
        .month{
            padding: 0 0.32rem;
            text-align: center;
            margin: 0.15rem auto;
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
        .at_list_con{

            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.6rem;

            .at_list_li{
                border-radius:0.1rem;
                background: #f5f5f5;
                width:1.5rem;
                height: 1.12rem;
                text-align: center;

                span:nth-of-type(1){
                    color:#39B2FF;
                    display: inline-block;
                    font-size: 0.36rem;
                    margin-top: 0.08rem;
                }
                span:nth-of-type(2){
                    color:#A9A9A9;
                    font-size: 0.24rem;
                }

            }
        }
    }
    .analysisType{
        /*padding: 0 0.32rem;*/
        margin-top: 0.4rem;
        .sm_title{
            display: inline-block;
            font-size: 0.24rem;
            font-weight: bold;
            color:#39B2FF;
            height: 0.4rem;
            line-height: 0.4rem;
            border:1px solid #39B2FF;
            -webkit-border-radius: 0.2rem;
            -moz-border-radius: 0.2rem;
            border-radius: 0.2rem;
            padding:0 0.2rem;

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
                    color:#4A4A4A
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
    }
    .hyDays_li{
        display: flex;justify-content: space-around;align-items: center;
        flex-wrap: wrap;
        margin-top: 0.3rem;
        .hy_list_li{
            width:3rem;
            height: 1.2rem;

            text-align: center;
            background: #f5f5f5;
            margin: 0.05rem;
            span:nth-of-type(1){
                color:#39B2FF;
                display: inline-block;
                font-size: 0.3rem;
                margin: 0.2rem 0 0.16rem 0;
            }
            span:nth-of-type(2){
                color: #a9a9a9;
                font-size: 0.24rem;
            }
        }
    }
    .hyarea_list_li{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 1rem;
        .areaicon{
            width:0.23rem;vertical-align: middle;
            margin-right: 0.3rem;
        }
        .area{
            flex:1;
            font-size: 0.3rem;
            color:#4a4a4a;
        }
        .call{
            color:#a9a9a9;
            flex:2
        }
        .times{
            color:#a9a9a9;
            flex:1
        }
    }
    .concatDepth{
        border:1px solid #a9a9a9;
        -webkit-border-radius: 0.1rem;
        -moz-border-radius: 0.1rem;
        border-radius: 0.1rem;
        margin-top: 0.3rem;
        padding: 0.28rem;
        .phone{
            margin-bottom: 0.1rem;
            .timecolor{
                display: inline-block;
                height: 0.16rem;
                width:0.16rem;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
            }
        }
        .phone_detial{
            display: flex;justify-content:flex-start;align-items: center;
            .phone_detialitem{
                text-align: center;
                width: 25%;
                span:nth-of-type(1){
                    color:#39B2FF;
                    font-size: 0.36rem
                }
                span:nth-of-type(2){
                    color:#a9a9a9;
                    font-size: 0.24rem
                }
            }
        }
    }
</style>
