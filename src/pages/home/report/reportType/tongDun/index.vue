<!-- '5230679' => '7天内申请人在多个平台申请借款',
        '5230683' => '3个月内申请人在多个平台申请借款',
        '5215401' => '身份证归属地是否有高风险',
        '5215371' => '手机号是否命中虚假号码库',
        '5215429' => '身份证是否命中法院失信名单',
        '5215453' => '身份证是否命中犯罪通缉名单',
        '5215459' => '身份证是否命中法院执行名单',
        '5215463' => '身份证对应人是否存在助学贷款欠费历史',
        '5215465' => '身份证是否命中信贷逾期名单',
        '5215471' => '身份证是否命中高风险关注名单',
        '5215499' => '身份证是否命中车辆租赁违约名单',
        '5215503' => '身份证是否命中法院结案名单',
        '5215527' => '身份证是否命中故意违章乘车名单',
        '5215495' => '手机号是否命中车辆租赁违约名单',
        '5215469' => '手机号是否命中信贷逾期名单',
        '5215541' => '3个月内身份证关联多个申请信息',
        '5215543' => '3个月内申请信息关联多个身份证',
        '18'=>'申请人信息是否命中中风险关注名单'
        '19'=>'36个月内申请人在多个平台申请借款'
        -->
<template>
    <div class="tongdunPage" v-if="reportData.final_decision">
        <topBanner :orderData="orderData" :endTime = "reportData.end_time"></topBanner>
        <div class="reportTips" v-if="$route.query.order_no=='default'">提示：样例报告数据仅供参考，最终报告结果根据个人信用状况进行展示
        </div>
        <div class="complex">
            <div class="headline">账户综合风险评分</div>
            <div class="subtitle" >风险评分</div>
            <!-- <reportPie
                 style="margin-top: 0.63rem"
                 :foreColor="'#3AA1FF'"
                 :percent="reportData.final_score"
                 :bgColor="'rgba(58,161,255,0.2)'"
                 :inMsg="{label:'风险评分'}">
             </reportPie>-->
            <!--this.reportData.final_score-->
            <percnetAntv  style="margin-top: 0.63rem" :percentData="[{
                    const: 'a',
                    actual: this.reportData.final_score,
                    expect: 300
                }]"></percnetAntv>
            <div class="Interpretation">
                <p>
                    {{reportData.note}}
                </p>
            </div>
        </div>

        <!--多头借贷情况-->
        <div class="muchHead" style="overflow: hidden">
            <div class="headline">多头借贷情况</div>
            <div class="subtitle" >多平台借贷申请检测</div>
            <div  class="muchHead_jieD_content clearfix">
                <multipleRings class="fl" style="width: 1.77rem;height:1.77rem" :dataArray="[reportData.risk_items['5230679'].platform_detail_dimension.id_card.count,reportData.risk_items['5230679'].platform_detail_dimension.phone.count]" :itemColor="['#FBA62E','#3AA1FF']" :inMsg="{label:'总个数'}"></multipleRings>
                <div class=" muchHead_jieD_r fl" >
                    <div class="muchHead_jieD_r_title" >七天内</div>
                    <div class="muchHead_jieD_r_val" >
                        <span class="fore_cicle" style="background:#FBA62E"> </span><span class="muchHead_jieD_r_valname">手机借款</span><span class="muchHead_jieD_r_valNum">{{reportData.risk_items['5230679'].platform_detail_dimension.phone.count}}</span>
                    </div>
                    <div class="muchHead_jieD_r_val" >
                        <span class="fore_cicle" style="background:#3AA1FF"> </span><span class="muchHead_jieD_r_valname">身份证借款</span><span class="muchHead_jieD_r_valNum">{{reportData.risk_items['5230679'].platform_detail_dimension.id_card.count}}</span>
                    </div>
                </div>
            </div>
            <div style="margin-top: 1rem">
                <div class="bigTitle" ><span class="fore_cicle"></span><span class="titleName">借款人手机详情</span></div>
                <div class="clearfix" style="padding: 0 0.52rem;margin: 0.42rem 0 0.9rem;" >
                    <div class="box_shadow_val fl" :style="{marginRight:index%2==0?' 0.4rem':'',marginBottom:'0.3rem'}" v-for="(item,index) in reportData.risk_items['5230679'].platform_detail_dimension.phone.detail">
                        <span class="topNum">{{item.count}}</span>
                        <span class="bottomLable">{{item.industry_display_name}}</span>
                    </div>
                </div>
            </div>
            <div class="muchHead_jieD_Identity" >
                <div class="bigTitle" ><span class="fore_cicle"></span><span class="titleName">借款人身份详情</span></div>
                <div class="muchHead_jieD_Identity_con" >
                    <div class="box_no_shadow_val" style="width: 33.33%" v-for="(item,index) in reportData.risk_items['5230679'].platform_detail_dimension.id_card.detail">
                        <span class="topNum" >{{item.count}}</span>
                        <span class="bottomLable">{{item.industry_display_name}}</span>
                    </div>
                </div>
            </div>
            <div class="subtitle" >各维度多头负债检测</div>
            <div  class="muchHead_jieD_content clearfix">
                <multipleRings class="fl" style="width: 1.77rem;height:1.77rem" :dataArray="[reportData.risk_items['19'].platform_detail_dimension.id_card.count,reportData.risk_items['19'].platform_detail_dimension.phone.count]" :itemColor="['#FBA62E',' #FF5F3B']" :inMsg="{label:'总个数'}"></multipleRings>
                <div class=" muchHead_jieD_r fl" >
                    <div class="muchHead_jieD_r_title" >36个月内多头负债统计<br><i style="font-size: 0.22rem;color:#929292">（不包含本合作方）</i></div>
                    <div class="muchHead_jieD_r_val" >
                        <span class="fore_cicle" style="background:#FBA62E"> </span><span class="muchHead_jieD_r_valname">手机借款</span><span class="muchHead_jieD_r_valNum">{{reportData.risk_items['19'].platform_detail_dimension.phone.count}}</span>
                    </div>
                    <div class="muchHead_jieD_r_val" >
                        <span class="fore_cicle" style="background:#FF5F3B"> </span><span class="muchHead_jieD_r_valname">身份证借款</span><span class="muchHead_jieD_r_valNum">{{reportData.risk_items['19'].platform_detail_dimension.id_card.count}}</span>
                    </div>
                </div>
            </div>
            <div style="margin-top: 1rem">
                <div class="bigTitle" ><span class="fore_cicle"></span><span class="titleName">借款人手机详情</span></div>
                <div class="clearfix" style="padding: 0 0.52rem;margin: 0.42rem 0 0.9rem;">
                    <div class="box_shadow_val fl" :style="{marginRight:index%2==0?' 0.4rem':'',marginBottom:'0.3rem'}" v-for="(item,index) in reportData.risk_items['19'].platform_detail_dimension.phone.detail">
                        <span class="topNum">{{item.count}}</span>
                        <span class="bottomLable">{{item.industry_display_name}}</span>
                    </div>
                </div>
            </div>
            <div class="muchHead_jieD_Identity" >
                <div class="bigTitle" ><span class="fore_cicle"></span><span class="titleName">借款人身份详情</span></div>
                <div class="muchHead_jieD_Identity_con" >
                    <div class="box_no_shadow_val" style="width: 33.33%" v-for="(item,index) in reportData.risk_items['19'].platform_detail_dimension.id_card.detail">
                        <span class="topNum" >{{item.count}}</span>
                        <span class="bottomLable">{{item.industry_display_name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!--风险信息检测-->
        <div class="muchHead" style="overflow: hidden">
            <div class="headline">风险信息检测</div>
            <div class="subtitle" style="margin-bottom: 0.53rem">个人基本信息核查</div>
            <div class="risk_msg_item">
                <div  class="msgDetection clearfix" >
                    <span class="fl label">{{reportData.risk_items['5215371'].risk_name}}</span>
                    <span class="fr yesOrno" >
                        <span class="yestip" v-if="reportData.risk_items['5215371'].fraud_type_display_name!=''">是</span>
                         <span class="notip" v-else>否</span>
                    </span>
                </div>
                <div class="risk_msg_item_detial">
                    <div class="risk_msg_item_detial_li">
                        <span >{{reportData.risk_items['5215371'].description}}</span>
                        <span >{{reportData.risk_items['5215371'].fraud_type_display_name}}</span>
                    </div>
                </div>
            </div>
            <div class="risk_msg_item">
                <div  class="msgDetection clearfix" >
                    <span class="fl label">{{reportData.risk_items['5215401'].risk_name}}</span>
                    <span class="fr yesOrno" >
                        <span class="yestip" v-if="reportData.risk_items['5215401'].fraud_type_display_name!=''">是</span>
                         <span class="notip" v-else>否</span>
                    </span>
                </div>
                <div class="risk_msg_item_detial">
                    <div class="risk_msg_item_detial_li">
                        <span >{{reportData.risk_items['5215401'].description}}</span>
                        <span v-for="(item,index) in reportData.risk_items['5215401'].fraud_type_display_name">{{item}}，</span>
                    </div>
                </div>
            </div>

            <div class="subtitle" style="margin-bottom: 0.53rem">风险信息扫描</div>
            <div class="risk_msg_item">
                <div  class="msgDetection clearfix" >
                    <span class="fl label">{{reportData.risk_items['5215453'].risk_name}}</span>
                    <span class="fr yesOrno" >
                        <span class="yestip" v-if="reportData.risk_items['5215453'].fraud_type_display_name!=''">是</span>
                         <span class="notip" v-else>否</span>
                    </span>
                </div>
                <div class="risk_msg_item_detial">
                    <div class="risk_msg_item_detial_li">
                        <span >{{reportData.risk_items['5215453'].description}}</span>
                        <span >{{reportData.risk_items['5215453'].fraud_type_display_name}}</span>
                    </div>
                </div>
            </div>
            <div class="risk_msg_item">
                <div  class="msgDetection clearfix" >
                    <span class="fl label">{{reportData.risk_items['5215459'].risk_name}}</span>
                    <span class="fr yesOrno" >
                        <span class="yestip" v-if="reportData.risk_items['5215459'].fraud_type_display_name!=''">是</span>
                         <span class="notip" v-else>否</span>
                    </span>
                </div>
                <div class="risk_msg_item_detial">
                    <div class="risk_msg_item_detial_li">
                        <span >{{reportData.risk_items['5215459'].description}}</span>
                        <span >{{reportData.risk_items['5215459'].fraud_type_display_name}}</span>
                    </div>
                </div>
            </div>
            <div class="risk_msg_item">
                <div  class="msgDetection clearfix" >
                    <span class="fl label">{{reportData.risk_items['5215463'].risk_name}}</span>
                    <span class="fr yesOrno" >
                        <span class="yestip" v-if="reportData.risk_items['5215463'].fraud_type_display_name!=''">是</span>
                         <span class="notip" v-else>否</span>
                    </span>
                </div>
                <div class="risk_msg_item_detial">
                    <div class="risk_msg_item_detial_li">
                        <span >{{reportData.risk_items['5215463'].description}}</span>
                        <span >{{reportData.risk_items['5215463'].fraud_type_display_name}}</span>
                    </div>
                </div>
            </div>
            <div class="risk_msg_item">
                <div  class="msgDetection clearfix" >
                    <span class="fl label">{{reportData.risk_items['5215465'].risk_name}}</span>
                    <span class="fr yesOrno" >
                        <span class="yestip" v-if="reportData.risk_items['5215465'].court_details.length!=0">是</span>
                         <span class="notip" v-else>否</span>
                    </span>
                </div>
                <div class="risk_msg_arr"  v-for="(item,index) in reportData.risk_items['5215465'].court_details" >
                    <div  class="risk_msg_arr_item">
                        <span  class="label">逾期金额：</span><span class="val">{{item.overdue_amount_range}}</span>
                    </div>
                    <div class="risk_msg_arr_item">
                        <span class="label">逾期笔数：</span><span class="val">{{item.overdue_count}}</span>
                    </div>
                    <div class="risk_msg_arr_item">
                        <span class="label">逾期天数：</span><span class="val">{{item.overdue_day_range}}</span>
                    </div>
                    <div class="risk_msg_arr_item">
                        <span class="label">逾期入库时间：</span><span class="val">{{item.overdue_time}}</span>
                    </div>

                </div>
            </div>
            <div class="risk_msg_item">
                <div  class="msgDetection clearfix" >
                    <span class="fl label">{{reportData.risk_items['5215469'].risk_name}}</span>
                    <span class="fr yesOrno" >
                        <span  class="yestip" v-if="reportData.risk_items['5215469'].fraud_type_display_name!=''">是</span>
                         <span  class="notip" v-else>否</span>
                    </span>
                </div>
                <div class="risk_msg_item_detial">
                    <div class="risk_msg_item_detial_li">
                        <span >{{reportData.risk_items['5215469'].description}}</span>
                        <span >{{reportData.risk_items['5215469'].fraud_type_display_name}}</span>
                    </div>
                </div>
            </div>
            <div class="risk_msg_item">
                <div  class="msgDetection clearfix" >
                    <span class="fl label">{{reportData.risk_items['5215471'].risk_name}}</span>
                    <span class="fr yesOrno" >
                        <span  class="yestip" v-if="reportData.risk_items['5215471'].fraud_type_display_name!=''">是</span>
                         <span  class="notip" v-else>否</span>
                    </span>
                </div>
                <div class="risk_msg_item_detial">
                    <div class="risk_msg_item_detial_li">
                        <span >{{reportData.risk_items['5215471'].description}}</span>
                        <span >{{reportData.risk_items['5215471'].fraud_type_display_name}}</span>
                    </div>
                </div>
            </div>
            <div class="risk_msg_item">
                <div  class="msgDetection clearfix" >
                    <span class="fl label">{{reportData.risk_items['18'].risk_name}}</span>
                    <span class="fr yesOrno" >
                        <span  class="yestip" v-if="reportData.risk_items['18'].fraud_type_display_name!=''">是</span>
                         <span  class="notip" v-else>否</span>
                    </span>
                </div>
                <div class="risk_msg_item_detial">
                    <div class="risk_msg_item_detial_li">
                        <span >{{reportData.risk_items['18'].description}}</span>
                        <span >{{reportData.risk_items['18'].fraud_type_display_name}}</span>
                    </div>
                </div>
            </div>
            <div class="risk_msg_item">
                <div  class="msgDetection clearfix" >
                    <span class="fl label">{{reportData.risk_items['5215495'].risk_name}}</span>
                    <span class="fr yesOrno" >
                        <span  class="yestip" v-if="reportData.risk_items['5215495'].fraud_type_display_name!=''">是</span>
                         <span  class="notip" v-else>否</span>
                    </span>
                </div>
                <div class="risk_msg_item_detial">
                    <div class="risk_msg_item_detial_li">
                        <span >{{reportData.risk_items['5215495'].description}}</span>
                        <span >{{reportData.risk_items['5215495'].fraud_type_display_name}}</span>
                    </div>
                </div>
            </div>
            <div class="risk_msg_item">
                <div  class="msgDetection clearfix" >
                    <span class="fl label">{{reportData.risk_items['5215499'].risk_name}}</span>
                    <span class="fr yesOrno" >
                        <span  class="yestip" v-if="reportData.risk_items['5215499'].fraud_type_display_name!=''">是</span>
                         <span  class="notip" v-else>否</span>
                    </span>
                </div>
                <div class="risk_msg_item_detial">
                    <div class="risk_msg_item_detial_li">
                        <span >{{reportData.risk_items['5215499'].description}}</span>
                        <span >{{reportData.risk_items['5215499'].fraud_type_display_name}}</span>
                    </div>
                </div>
            </div>
            <div class="risk_msg_item">
                <div  class="msgDetection clearfix" >
                    <span class="fl label">{{reportData.risk_items['5215527'].risk_name}}</span>
                    <span class="fr yesOrno" >
                        <span  class="yestip" v-if="reportData.risk_items['5215527'].fraud_type_display_name!=''">是</span>
                         <span  class="notip" v-else>否</span>
                    </span>
                </div>
                <div class="risk_msg_item_detial">
                    <div class="risk_msg_item_detial_li">
                        <span >{{reportData.risk_items['5215527'].description}}</span>
                        <span >{{reportData.risk_items['5215527'].fraud_type_display_name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!--变更信息-->
        <div class="muchHead" style="overflow: hidden">
            <div class="headline">变更信息</div>
            <div class="lostletter_subtitle" >频度规则详情</div>
            <div class="changephone_card" style="margin-top: 0.3rem">
                <div class="changephone_card_label" >
                    <span>{{reportData.risk_items['5215541'].risk_name}}</span>
                    <span>{{reportData.risk_items['5215541'].frequency_detail_list.length}}</span>
                </div>
                <div class="changephone_card_item" >
                    <span style="" v-for="(item,index) in reportData.risk_items['5215541'].frequency_detail_list">{{item}}</span>
                </div>
            </div>
            <div class="changephone_card">
                <div  class="changephone_card_label">
                    <span>{{reportData.risk_items['5215543'].risk_name}}</span>
                    <span>{{reportData.risk_items['5215543'].frequency_detail_list.length}}</span>
                </div>
                <div class="changephone_card_item">
                    <span v-for="(item,index) in reportData.risk_items['5215543'].frequency_detail_list" >{{item}}</span>
                </div>
            </div>

            <!--<div class="clearfix changeMsg" style="">
                <span class="fl">3个月身份证关联家庭地址</span><span class="fr">0</span>
            </div>
            <div class="changeMsg_con" style="">
                <div class="clearfix" style="padding: 0 0.3rem;margin-bottom: 0.24rem">
                    <div class="fl" style="width: 1.65rem;text-align: center;font-size: 0.22rem;color:#121C32;font-weight: bold">3个月身份证关联邮箱数</div>
                    <div  class="fl" style="margin: 0 0.65rem; width: 1.65rem;text-align: center;font-size: 0.22rem;color:#121C32;font-weight: bold">3个月身份证关联手机号数</div>
                    <div  class="fr" style="width: 1.65rem;text-align: center;font-size: 0.22rem;color:#121C32;font-weight: bold">
                        3个月手机号关联
                        身份证数
                    </div>
                </div>
                <div style="height: 0.7rem;line-height: 0.7rem;background: #F4FAFF;display: flex;justify-content: space-around;align-items: center">
                    <span style="color:#616A81;font-size: 0.22rem">893***741@qq.com</span>
                    <span style="color:#616A81;font-size: 0.22rem;margin: 0 0.5rem 0 0.6rem ;display: inline-block">133****3333</span>
                    <span style="color:#616A81;font-size: 0.22rem">3302**********3233</span>
                </div>
            </div>-->
        </div>
        <!--失信情况-->
        <div class="muchHead" style="overflow: hidden">
            <div class="headline">失信情况</div>
            <div class="lostletter_subtitle" >失信明细</div>
            <div class="lostLetter" v-for="(item,index) in reportData.risk_items['5215503'].court_details">
                <div class="name" style="">{{item.evidence_court}}</div>
                <div class="subtitle" style="margin:0 0.16rem  0.2rem 0">{{item.province}}</div> <div class="subtitle">{{item.case_date}}</div>
                <div class="letter-item" v-if="item.execute_court">
                    <span >做出执行依据单位：</span><span >{{item.execute_court}}</span>
                </div>
                <div class="letter-item" v-if="item.case_code">
                    <span >执行依据文号：</span><span >{{item.case_code}}</span>
                </div>
                <div class="letter-item" v-if="item.carry_out">
                    <span >被执行人的履行性质：</span><span >{{item.carry_out}}</span>
                </div>
                <div class="letter-item" v-if="item.specific_circumstances">
                    <span>失信被执行人行为具体情形：</span><span>{{item.specific_circumstances}}</span>
                </div>
                <div class="letter-item" v-if="item.term_duty">
                    <span> 生效法律文书确定的义务：</span><span>{{item.term_duty}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import topBanner from '@/pages/home/report/reportType/tongDun/topBanner';
    import reportPie from '@/pages/home/report/reportType/tongDun/reportPie';
    import multipleRings from '@/pages/home/report/reportType/tongDun/multipleRings'
    import percnetAntv from '@/pages/home/report/reportType/tongDun/antvPercent'
    import {getQuery} from '@/js/util'

    export default {
        name: "tongDun",
        components:{
            topBanner,reportPie,multipleRings,percnetAntv
        },
        props:{
            reportData:{
                type:Object,
                default:()=>{}
            },
            orderData:{
                type:Object,
                default:()=>{}
            },
            order_no:{
                type:String,
                default: ''
            },
        },
        created(){

        },
        mounted(){

        },
        methods:{

        }
    }
</script>

<style lang="less" scoped>
    .tongdunPage{
        background: #fff;
        .reportTips{
            font-size: 0.26rem;padding: 0 0.3rem;color:red;margin-top: 0.2rem;
        }
        .headline{
            color:#121C32;font-size: 0.32rem;font-weight: bold
        }
        .subtitle{
            margin-top: 0.4rem; font-size: 0.24rem;color:#3D4AE8;background: rgba(58,161,255,0.1);height: 0.42rem;line-height: 0.42rem;text-align: center;display: inline-block;padding: 0 0.3rem;border-radius: 0.21rem;
        }
        .box_shadow_val{
            width: 2.72rem;height: 1.32rem;display: flex;justify-content: space-around;align-items: center;flex-direction: column;
            border-radius: 0.04rem;
            box-shadow:0px 0.08rem 0.32rem 0.04rem rgba(52,131,255,0.1);
            .topNum{
                font-size: 0.28rem;color:#121C32;font-weight: bold;
            }
            .bottomLable{
                font-size: 0.24rem;color:#929292;
            }
        }
        .box_no_shadow_val{
            height: 0.7rem;display: flex;justify-content: space-between;align-items: center;flex-direction: column;
            margin-bottom: 0.3rem;
            .topNum{
                color:#121C32;font-size: 0.24rem;font-weight: bold;
            }
            .bottomLable{
                color:#929292;font-size: 0.22rem;
            }
        }
        .Interpretation{
            margin-top: 0.56rem;
            p{
                font-size: 0.22rem;color:#121C32;line-height: 0.3rem;
            }
        }
        .bigTitle{
            margin:0 0.26rem;
            .fore_cicle{
                display:inline-block;width:0.12rem;height:0.12rem;border-radius: 50%;background: #3D4AE8
            }
            .titleName{
                font-size: 0.26rem;color:#3D4AE8;font-weight: bold;margin-left: 0.14rem;
            }
        }
        .risk_msg_item{
            margin-bottom: 0.4rem;
            .risk_msg_item_detial{
                margin-top: 0.22rem;padding-left: 0.5rem;
                .risk_msg_item_detial_li{
                    span{
                        font-size: 0.24rem;
                        color:#3AA1FF;
                    }
                    span:nth-of-type(1){
                        color:#929292;
                    }
                }
            }
            .risk_msg_arr{
                margin-top: 0.22rem;
                display: flex;justify-content: flex-start;align-items: center;flex-wrap: wrap;padding-left: 0.5rem;box-sizing: border-box;
                .risk_msg_arr_item{
                    width: 50%;line-height: 0.5rem;height: 0.5rem;
                    .label{
                        font-size: 0.24rem;color:#929292;
                    }
                    .val{
                        font-size: 0.24rem;color:#3AA1FF
                    }
                }
            }
        }
        .changephone_card {
            .changephone_card_label{
                display: flex;justify-content: space-between;align-items: center;border-radius: 0.08rem;
                height: 0.94rem;
                line-height: 0.94rem;
                padding: 0 0.2rem;
                font-size: 0.3rem;
                font-weight: bold;
                color:#121C32;
                -webkit-box-shadow: 0rem 0.05rem 0.18rem 0rem rgba(54, 171, 254, 0.1);
                box-shadow: 0rem 0.05rem 0.18rem 0rem rgba(54, 171, 254,0.1)
            }
            .changephone_card_item{
                margin-top: 0.2rem;font-size: 0.2rem;line-height: 0.6rem;color:#929292;display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;
                span{
                    width: 50%;text-align: center
                }
            }
        }

        .lostletter_subtitle{
            color:#3D4AE8;font-size: 0.26rem;margin-top: 0.25rem
        }
        .lostLetter{
            margin-bottom: 0.42rem; padding:0.35rem 0.36rem 0.46rem 0.32rem;margin-top: 0.24rem;box-shadow:0px 0.08rem 0.19rem 0.01rem rgba(46,125,246,0.08);border-radius: 0.16rem;
            .name{
                color:#121C32;font-size: 0.22rem;font-weight: bold;
            }
            .letter-item{
                line-height: 0.4rem;
                span{
                    font-size: 0.2rem;
                }
                span:nth-of-type(1){
                    color:#121C32;
                }
                span:nth-of-type(2){
                    color:#888;
                }
            }
        }
        .changeMsg{
            margin-top: 0.42rem; color:#121C32;font-size: 0.24rem;height: 0.94rem;line-height: 0.94rem;box-shadow:0rem 0.05rem 0.18rem 0rem rgba(54,171,254,0.1);border-radius: 0.08rem;padding:0 0.32rem;
        }
        .changeMsg_con{
            margin-top: 0.66rem;
        }
        .msgDetection{
            border-left: 0.05rem solid #3AA1FF;border-radius: 0.08rem;height: 0.94rem;line-height: 0.94rem;
            box-shadow:0rem 0.05rem 0.18rem 0rem rgba(54,171,254,0.1);
            .label{
                display: inline-block;margin-left: 0.4rem;font-size: 0.26rem;color:#121C32;font-weight: bold;width: 5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
            }
            .yesOrno{
                margin-right: 0.36rem;
                span{
                    display: inline-block;width: 0.4rem;height: 0.4rem;border-radius: 50%;line-height: 0.4rem;text-align: center;font-size: 0.22rem;color:#fff;
                }
                .yestip{
                    background: red;
                }
                .notip{
                    background: #3AA1FF;
                }
            }
        }
        .complex{
            margin-top: 0.8rem;padding: 0 0.31rem 0.5rem;
        }

        .muchHead{
            padding: 0.83rem 0.31rem 0 0.31rem;border-top: 0.18rem solid #f5f5f5;
            .muchHead_jieD_content{
                margin-top: 0.66rem;
                .muchHead_jieD_r{
                    margin-left: 0.86rem;
                    .muchHead_jieD_r_title{
                        font-size: 0.28rem;color:#121C32;font-weight: bold;margin-bottom: 0.4rem;
                    }
                    .muchHead_jieD_r_val{
                        width: 2.74rem;display: flex;justify-content: center;align-items: center;height: 0.4rem;
                        .fore_cicle{
                            display:inline-block;width:0.12rem;height:0.12rem;border-radius: 50%;background: #FBA62E;
                        }
                        .muchHead_jieD_r_valname{
                            font-size: 0.22rem;color:#888;flex-grow: 1;margin-left: 0.18rem;
                        }
                        .muchHead_jieD_r_valNum{
                            font-size: 0.22rem;color:#121C32;
                        }
                    }
                }
            }
            .muchHead_jieD_Identity{
                margin-bottom: 0.62rem;border-radius: 0.08rem;box-shadow:0px 8px 19px 1px rgba(46,125,246,0.08);padding: 0.33rem 0 0.47rem;
                .muchHead_jieD_Identity_con{
                    margin-top: 0.55rem; display: flex;justify-content: space-around;align-items: center;flex-wrap: wrap;
                }
            }
        }

    }

</style>
