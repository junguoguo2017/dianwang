<template>
    <div style="background: #f5f5f5">
        <div class="report_banner" >
            <div class="name">{{reportData.user_basic.user_name}}</div>
            <div class="order_no">报告编号：<i>{{order_no}}</i></div>
            <div class="userInformation">
                <div class="userMsgItem">
                    <img :src="bankPhone" alt="" style="width:0.3rem;vertical-align: middle;"><span>{{reportData.user_basic.user_phone}}</span>
                </div>
                <div class="userMsgItem">
                    <img :src="bankUser" alt="" style="width:0.3rem;vertical-align: middle;"><span>{{reportData.user_basic.user_age}}</span>
                </div>
                <div class="userMsgItem" style="margin-top: 0.3rem;">
                    <img :src="bankCard" alt="" style="width:0.3rem;vertical-align: middle;"><span>{{reportData.user_basic.user_idcard}}</span>
                </div>
                <div class="userMsgItem" style="margin-top: 0.3rem;">
                    <img :src="bankLoc" alt="" style="width:0.3rem;vertical-align: middle;"><span>{{reportData.user_basic.user_region}}</span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" style="margin-top: -0.4rem;">
            <div class="sectiontitle">社交特质模块</div>
            <div class="smallItem"><span>基本社交模块</span></div>
            <p style="font-size: 0.24rem;color:#39b2ff;margin: 0.3rem auto"><span style="font-size: 0.24rem;color:#4a4a4a;font-weight: bold">信用评分：</span>{{reportData.user_gray.phone_gray_score}}{{reportData.note}} </p>
            <p style="font-size: 0.24rem;color:#39b2ff;margin: 0.3rem auto"><span style="font-size: 0.24rem;color:#4a4a4a;font-weight: bold">被标记的黑名单分类：</span>{{reportData.user_gray.blacklist_category}} </p>
            <div class="base_card clearfix">
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.user_gray.social_liveness}}</span><br/>
                    <span class="card_li_text">社交活跃度</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.user_gray.social_influence}}</span><br/>
                    <span class="card_li_text">社交影响力</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.user_gray.recent_active_time}}</span><br/>
                    <span class="card_li_text">最近活跃时间</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.user_gray.blacklist_category}}</span><br/>
                    <span class="card_li_text">被标记的黑名单分类</span>
                </div>
            </div>
            <div class="at_list" >
                <div class="at_list_t"><span></span><span>黑名单详细信息</span></div>
                <div v-for="(item,index) in reportData.user_gray.blacklist_details">
                    <p style="margin: 0.15rem 0;line-height: 0.4rem;color:#666">
                    <span    style="font-size: 0.28rem;color:#4a4a4a;font-weight: bold">{{item.details_key}}:</span>
                    {{item.details_value}}
                    </p>
                </div>
                <div class="at_list_con" >
                   <!-- <div class="at_list_li" v-for="(item,index) in reportData.user_gray.blacklist_details">
                        <span>{{item.details_value}}</span><br/>
                        <span>{{item.details_key}}</span>
                    </div>-->
                    <!--<div class="at_list_li">-->
                        <!--<span>123</span><br/>-->
                        <!--<span>累计已还金额</span>-->
                    <!--</div>-->
                    <!--<div class="at_list_li">-->
                        <!--<span>123</span><br/>-->
                        <!--<span>累计借入金额</span>-->
                    <!--</div>-->
                </div>
            </div>
            <div class="smallItem"><span>与黑名单联系人相关</span></div>
            <div>
                <div class="blacklist">
                    <div class="blacklist_title"><span class="circle_icon"></span><span>联系黑名单</span></div>
                    <div class="blacklist_msg clearfix">
                        <div class="blacklist_msg_it fl">
                            <span class="blacklist_msg_it_title">主动</span>
                            <div class="iblacklist_msg_it_con">
                                <span class="blacklist_msg_it_s">号码：<i>{{reportData.user_gray.contacts_rfm.cnt_to_black}}</i>(个)</span><br/>
                                <span class="blacklist_msg_it_s">时间：<i>{{reportData.user_gray.contacts_rfm.recent_time_to_black}}</i></span>
                            </div>
                        </div>
                        <div class="blacklist_msg_it fl">
                            <span  class="blacklist_msg_it_title">被动</span>
                            <div class="iblacklist_msg_it_con">
                                <span class="blacklist_msg_it_s">号码：<i>{{reportData.user_gray.contacts_rfm.cnt_be_black}}</i>(个)</span><br/>
                                <span class="blacklist_msg_it_s">时间：<i>{{reportData.user_gray.contacts_rfm.recent_time_be_black}}</i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="blacklist">
                    <div class="blacklist_title"><span class="circle_icon"></span><span>通话</span></div>
                    <div class="blacklist_msg clearfix">
                        <div class="blacklist_msg_it fl">
                            <span class="blacklist_msg_it_title">主动</span>
                            <div class="iblacklist_msg_it_con">
                                <span class="blacklist_msg_it_s">次数：<i>{{reportData.user_gray.contacts_rfm.call_cnt_to_black}}</i></span><br/>
                                <span class="blacklist_msg_it_s">时长：<i>{{reportData.user_gray.contacts_rfm.time_spent_to_black}}</i>s</span>
                            </div>
                        </div>
                        <div class="blacklist_msg_it fl">
                            <span  class="blacklist_msg_it_title">被动</span>
                            <div class="iblacklist_msg_it_con">
                                <span class="blacklist_msg_it_s">次数：<i>{{reportData.user_gray.contacts_rfm.call_cnt_be_black}}</i></span><br/>
                                <span class="blacklist_msg_it_s">时长：<i>{{reportData.user_gray.contacts_rfm.time_spent_be_black}}</i>s</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="userInforBasic" v-if="reportData.user_phone_suspicion">
            <div class="sectiontitle">手机存疑</div>
            <div class="smallItem"><span>使用过此手机号的其他姓名</span></div>
            <div class="phone_suspect_name" v-for="(item,index) in reportData.user_phone_suspicion.phone_with_other_names">
                <img :src="reportBD_age" alt="">
                <span class="name">{{item.susp_name}}</span>
                <span class="last_time">最后使用时间：{{item.susp_updt}}</span>
            </div>
           <div class="smallItem"><span>使用过此手机号的其他身份证</span></div>
            <div class="phone_suspect_card" v-for="(item,index) in reportData.user_phone_suspicion.phone_with_other_idcards">
                <img :src="reportBD_card" alt="">
                <div class="card_msg">
                    <span class="card">{{item.susp_idcard}}</span>
                    <span class="last_time">最后使用时间：{{item.susp_updt}}</span>
                </div>
            </div>
            <div class="smallItem"><span>提供数据的机构类型</span></div>
         <div class="phone_suspect_card" v-for="(item,index) in reportData.user_phone_suspicion.phone_applied_in_orgs">
                <img :src="reportBD_company" alt="" >
                <div class="card_msg">
                    <span class="card">{{item.susp_org_type}}</span>
                    <span class="last_time">最后使用时间：{{item.susp_updt}}</span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" v-if="reportData.user_idcard_suspicion">
            <div class="sectiontitle">身份证存疑</div>
            <div class="smallItem"><span>使用过此身份证的其他姓名</span></div>
            <div
                class="phone_suspect_name"
                v-for="(item,index) in reportData.user_idcard_suspicion.idcard_with_other_names">
                <img :src="reportBD_age" alt="" >
                <span class="name">{{item.susp_name}}</span>
                <span class="last_time">最后使用时间：{{item.susp_updt}}</span>
            </div>
            <div class="smallItem"><span>使用过此身份证的其他手机</span></div>
            <div class="phone_suspect_card" v-for="(item,index) in reportData.user_idcard_suspicion.idcard_with_other_phones">
                <img :src="bankPhone" alt="">
                <div class="card_msg">
                    <span class="card">{{item.susp_phone}} <i>{{item.susp_phone_city}}</i> <i>{{item.susp_phone_operator}}</i>--出现{{item.times}}次</span>
                    <span class="last_time">最后使用时间：{{item.susp_updt}}</span>
                </div>
            </div>
            <div class="smallItem"><span>提供数据的机构类型</span></div>
            <div class="phone_suspect_card" v-for="(item,index) in reportData.user_idcard_suspicion.idcard_applied_in_orgs">
                <img :src="reportBD_company" alt="">
                <div class="card_msg">
                    <span class="card">{{item.susp_org_type}}</span>
                    <span class="last_time">最后使用时间：{{item.susp_updt}}</span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" v-if="reportData.user_searched_statistic">
            <div class="sectiontitle">机构历史查询</div>
            <div class="one_small_title">查询机构数：<i>{{reportData.user_searched_statistic}}</i></div>
            <div class="history_inquire_cp" v-for="(item, index) in reportData.user_searched_history_by_orgs">
                <span class="circle_icon"></span>
                <div class="history_inquire_msg">
                    <span class="type">机构类型：<i class="msg">{{item.searched_org}}</i></span>
                    <span class="inquire_time">查询日期：<i class="msg">{{item.searched_date}}</i></span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" v-if="inquiry_history_data.data">
            <div class="sectiontitle">历史查询记录</div>
            <div class="month" >
                <span class="m_pre" @click="pre_month">《</span><span class="month_num">
                {{inquiry_history_data.inquiry_history_text}}</span>
                <span class="m_next" @click="next_month">》</span>
            </div>
            <div class="base_card clearfix" v-if="inquiry_history_data.data[inquiry_history_data.inquiry_history_json[inquiry_history_data.index]]">
                <div class="card_li fl">
                    <span class="card_nu">{{inquiry_history_data.data[inquiry_history_data.inquiry_history_json[inquiry_history_data.index]].cnt}}</span><br/>
                    <span class="card_li_text">查询次数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{inquiry_history_data.data[inquiry_history_data.inquiry_history_json[inquiry_history_data.index]].cnt_org}}</span><br/>
                    <span class="card_li_text">查询机构数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{inquiry_history_data.data[inquiry_history_data.inquiry_history_json[inquiry_history_data.index]].cnt_cash}}</span><br/>
                    <span class="card_li_text">现金贷查询次数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{inquiry_history_data.data[inquiry_history_data.inquiry_history_json[inquiry_history_data.index]].cnt_org_cash}}</span><br/>
                    <span class="card_li_text">现金贷查询机构数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{inquiry_history_data.data[inquiry_history_data.inquiry_history_json[inquiry_history_data.index]].cnt_cf}}</span><br/>
                    <span class="card_li_text">消费分期查询次数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{inquiry_history_data.data[inquiry_history_data.inquiry_history_json[inquiry_history_data.index]].cnt_org_cf}}</span><br/>
                    <span class="card_li_text">消费分期查询机构数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{inquiry_history_data.data[inquiry_history_data.inquiry_history_json[inquiry_history_data.index]].cnt_cc}}</span><br/>
                    <span class="card_li_text">信用卡代还查询次数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{inquiry_history_data.data[inquiry_history_data.inquiry_history_json[inquiry_history_data.index]].cnt_org_cc}}</span><br/>
                    <span class="card_li_text">信用卡代还查询机构数</span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" v-if="reportData.user_register_orgs">
            <div class="sectiontitle">注册信息</div>
            <div class="one_small_title">注册APP数量：<i>{{reportData.user_register_orgs.register_cnt}}</i></div>
            <div class="history_inquire_cp" v-for="(item,index) in reportData.user_register_orgs.register_orgs_statistics">
                <span class="circle_icon"></span>
                <div class="history_inquire_msg">
                    <span class="type">APP类型：<i class="msg">{{item.label}}</i></span>
                    <span class="inquire_time">注册数量：<i class="msg">{{item.count}}</i></span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" >
            <div class="sectiontitle">消费标签信息</div>
            <div class="base_card clearfix" v-if="reportData.consumer_label">
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.consumer_label.if_own_cc==0?'否':'是'}}</span><br/>
                    <span class="card_li_text">是否有信用卡</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.consumer_label.if_own_wg_cc==0?'否':'是'}}</span><br/>
                    <span class="card_li_text">是否有白金卡</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.consumer_label.if_own_car==0?'否':'是'}}</span><br/>
                    <span class="card_li_text">是否有车</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.consumer_label.if_pay_ins==0?'否':'是'}}</span><br/>
                    <span class="card_li_text">是否购买保险产品</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.consumer_label.if_fin_buy_pre6==0?'否':'是'}}</span><br/>
                    <span class="card_li_text">是否购买理财产品</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.consumer_label.cst_score_finally}}</span><br/>
                    <span class="card_li_text">消费能力指数</span>
                </div>
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
                bankUser:require('@/assets/bankUser.png'),
                reportBD_age:require('@/assets/reportBD_age.png'),
                reportBD_company:require('@/assets/reportBD_company.png'),
                reportBD_phone:require('@/assets/reportBD_phone.png'),
                reportBD_card:require('@/assets/reportBD_card.png'),

                inquiry_history_data:{
                    index:0,
                    inquiry_history_json:['d_7','d_15','d_30','d_60','d_90','m_4','m_5','m_6'],
                    inquiry_history_text:'7天',
                    data:{}
                }
            }
        },
        mounted(){
            this.initReportData()
        },
        methods:{
            pre_month(){
                this.inquiry_history_data.index--;
                if(this.inquiry_history_data.index<0){
                    this.inquiry_history_data.index = this.inquiry_history_data.inquiry_history_json.length-1
                };
                let item_text =  this.inquiry_history_data.inquiry_history_json[this.inquiry_history_data.index];
                this.text_format(item_text)
            },
            next_month(){
                this.inquiry_history_data.index++;
                if(this.inquiry_history_data.index>this.inquiry_history_data.inquiry_history_json.length-1){
                    this.inquiry_history_data.index = 0
                }
                let item_text =  this.inquiry_history_data.inquiry_history_json[this.inquiry_history_data.index]
                this.text_format(item_text)
            },
            text_format(item_text){
                switch (item_text) {
                    case  'd_7':
                        this.inquiry_history_data.inquiry_history_text = '7天';
                        break;
                    case 'd_15':
                        this.inquiry_history_data.inquiry_history_text = '15天';
                        break;
                    case 'd_30':
                        this.inquiry_history_data.inquiry_history_text = '30天';
                        break;
                    case 'd_60':
                        this.inquiry_history_data.inquiry_history_text = '60天';
                        break;
                    case 'd_90':
                        this.inquiry_history_data.inquiry_history_text = '90天';
                        break;
                    case 'm_4':
                        this.inquiry_history_data.inquiry_history_text = '120天';
                        break;
                    case 'm_5':
                        this.inquiry_history_data.inquiry_history_text = '150天';
                        break;
                    case 'm_6':
                        this.inquiry_history_data.inquiry_history_text = '160天';
                        break;
                    default:
                        this.inquiry_history_data.inquiry_history_text = '';
                }
            },
            initReportData(){
                this.inquiry_history_data.data = this.reportData.user_searched_history_by_day
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
            /* margin-bottom: 0.3rem;*/
            margin-top: 0.4rem;
        }

    }
    .one_small_title{
        font-size: 0.24rem;
        color:#4a4a4a;
        font-weight: bold;
        margin: 0.3rem 0;
        i{
            font-weight: normal;
            color:#39B2FF;
        }
    }
    .phone_suspect_name{
        display: flex;
        justify-content: center;
        align-items: center;
        margin:0.2rem 0 ;
        img{
            width:0.3rem;
            margin-right: 0.24rem;
        }
        .name{
            margin-right: 0.7rem ;
            font-size: 0.3rem;
            color:#4a4a4a;
        }
        .last_time{
            font-size: 0.24rem;
            color:#a9a9a9;
            flex-grow: 1;
        }
    }
    .phone_suspect_card{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 0.3rem;
        img{
            width:0.3rem;
            align-self: flex-start;
            margin-right: 0.24rem;
        }
        .card_msg{
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            .card{
                line-height: 1em;
                font-size: 0.3rem;
                color:#4a4a4a;

            }
            .last_time{
                margin-top: 0.3rem;
                font-size: 0.24rem;
                color:#a9a9a9
            }

        }
    }
    .history_inquire_cp{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 0.3rem;
        .circle_icon{
            align-self: flex-start;
            display: inline-block;
            width: 0.16rem;
            height: 0.16rem;
            margin-top: 0.04rem;
            background: #39B2FF;
            border-radius: 50%;
            margin-right: 0.2rem;
        }
        .history_inquire_msg{
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            span{
                line-height: 1em;
                font-size: 0.24rem;
                color:#a9a9a9;
                .msg{
                    color:#39B2FF;
                }
            }
            .inquire_time{
                margin-top: 0.3rem;
            }
        }
    }
    .base_card{
        margin-top: 0.3rem;
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
    .blacklist{
        margin-top: 0.3rem;
        .blacklist_title{
            font-size: 0.24rem;
            font-weight: bold;
            color:#4a4a4a;
            margin-bottom: 0.3rem;
            .circle_icon{
                align-self: flex-start;
                display: inline-block;
                width: 0.16rem;
                height: 0.16rem;
                margin-top: 0.04rem;
                background: #39B2FF;
                border-radius: 50%;
                margin-right: 0.2rem;
            }
        }
        .blacklist_msg{
            .blacklist_msg_it{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width:50%;
                .blacklist_msg_it_title{
                    font-size: 0.24rem;
                    color:#4a4a4a;
                    margin-right: 0.2rem;
                }
                .iblacklist_msg_it_con{
                    .blacklist_msg_it_s{
                        line-height: 1em;
                        font-size: 0.24rem;
                        color:#a9a9a9;
                        i{
                            color:#39B2FF
                        }
                    }
                }
            }
        }
    }
    .at_list{
        border:1px solid #eee;
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
        background: url('../../../../assets/miGuan_banner.png') left top no-repeat;
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

