<template>
    <div class="ConsumptionPage">
        <div class="banner">
            <img src="@/assets/cosumption/banner.png" alt="">
        </div>
        <div class="sectiontitle  wow fadeIn">
            <img src="@/assets/cosumption/left_line.png" alt="">
            <span class="title">个人信息</span>
            <img src="@/assets/cosumption/right_line.png" alt="">
        </div>
        <div class="personInfo  wow bounceInDown" v-if="orderData" >
            <div class="pi_user">
                <div class=" u_name">
                    <img src="@/assets/cosumption/avatar.png" alt="">
                    <span>{{orderData.realname}}</span>
                </div>
                <div class="pi_u_item" style="color:#fff;font-size: 0.3rem">
                    <span>身份证:</span>
                    <span>{{orderData.id_card}}</span>
                </div>
                <div class="pi_u_item">
                    <span>卡号:</span>
                    <span>{{orderData.bankcard_no}}</span>
                </div>
                <div class="pi_u_item">
                    <span>报告编号:</span>
                    <span>{{orderData.order_no}}</span>
                </div>
                <div class="pi_u_item">
                    <span>查询原因:</span>
                    <span>{{reportData.MY001}}</span>
                </div>
            </div>
            <div class="pi_card">
                <div class="c_name">{{reportData.YLZC008}}</div>
                <div class="c_type">{{reportData.YLZC005}}</div>
            </div>
        </div>
        <div class="sectiontitle  wow fadeIn">
            <img src="@/assets/cosumption/left_line.png" alt="">
            <span class="title">银行卡基本信息</span>
            <img src="@/assets/cosumption/right_line.png" alt="">
        </div>
        <div class="cardBase wow bounceInLeft" >
            <ul>
                <li class="line">
                    <span>借贷标记</span>
                    <span>{{cardtype[reportData.YLZC001]}}</span>
                </li>
                <li class="line">
                    <span>发卡行</span>
                    <span>{{reportData.YLZC008}}</span>
                </li>
                <li class="line"><span>卡名称</span><span>{{reportData.YLZC005}}</span></li>
                <li class="line"><span>卡等级</span><span>{{reportData.YLZC006}}</span></li>
                <li class="line"><span>卡品牌</span><span>{{reportData.YLZC003}}</span></li>
                <li class="line"><span>卡产品</span><span>{{reportData.YLZC004}}</span></li>
                <li class="line"><span>最早交易日期</span><span>{{reportData.YLZC282}}</span></li>
                <li class="line"><span>最近交易日期</span><span>{{reportData.YLZC284}}</span></li>
                <li class="line"><span>常用城市</span><span>{{reportData.YLZC285}}</span></li>
                <li class="line"><span>当月活动省</span><span>{{reportData.YLZC287}}</span></li>
            </ul>
        </div>
        <div class="sectiontitle  wow fadeIn">
            <img src="@/assets/cosumption/left_line.png" alt="">
            <span class="title">银行卡UPA评分</span>
            <img src="@/assets/cosumption/right_line.png" alt="">
        </div>
        <div class="cardScore ">
            <div class="sub_title">风险水平</div>
            <div class="c_s_con wow wobble">
                <div class="c_s_mian">
                    <img src="@/assets/cosumption/scorebg.png" alt="">
                    <div class="c_s_num">
                        <span>{{reportData.MY002.value}}</span>
                        <span>{{reportData.MY002.lable}}</span>
                    </div>
                </div>
                <div class="c_s_dec" v-if="false">
                    <span class="dec1">风险得分</span>
                    <span>{{reportData.MY002.value}}分</span>
                    <span>{{reportData.MY002.lable}}</span>
                </div>
                <div class="c_s_dec" v-if="false">
                    <span class="dec2">套现预测模型</span>
                    <span>{{reportData.MY003.value}}分</span>
                    <span>{{reportData.MY003.lable}}</span>
                </div>
            </div>
            <div class="sub_title">财富能力</div>
            <div class="m_Ability ">
                <div class="m_a_conli wow rotateInDownLeft">
                    <div class="m_a_item">
                        <img src="@/assets/cosumption/money1.png" alt="">
                        <div class="m_a_dec">
                            <span>{{reportData.CSSS001}}</span>
                            <span>{{richTxt(0,reportData.CSSS001)}}</span>
                        </div>
                    </div>
                    <div class="m_a_item_tit">消费自由度指数</div>
                </div>
                <div class="m_a_conli wow fadeInUpBig">
                    <div class="m_a_item">
                        <img src="@/assets/cosumption/money2.png" alt="">
                        <div class="m_a_dec">
                            <span>{{reportData.YLZC009}}</span>
                            <span>{{richTxt(1,reportData.YLZC009)}}</span>
                        </div>
                    </div>
                    <div class="m_a_item_tit">消费能力指数</div>
                </div>
                <div class="m_a_conli wow rotateInUpLeft">
                    <div class="m_a_item">
                        <img src="@/assets/cosumption/money3.png" alt="">
                        <div class="m_a_dec">
                            <span>{{reportData.YLZC013}}</span>
                            <span>{{richTxt(2,reportData.YLZC013)}}</span>
                        </div>
                    </div>
                    <div class="m_a_item_tit">消费趋势指数</div>
                </div>
            </div>
            <div class="sub_title  wow fadeIn">社会地位</div>
            <div class="Social_s  wow fadeIn" id="socialdiw">
                <div class="s_money">
                    <div class="s_m_tit">钱包位置细分<span style="color:#BE4F10;font-size: 0.2rem">(总分:5)</span></div>
                    <div class="s_m_score">
                        <div class="s_m_s_progress">
                            <div class="s_m_s_cur" ref="moneybao"></div>
                        </div>
                        <span class="s_m_snum">{{reportData.YLZC017}}分</span>
                    </div>
                    <div class="s_m_s_dec">{{moneyBaoPos(0,reportData.YLZC017)}}</div>
                </div>
                <div class="s_money">
                    <div class="s_m_tit">持卡人价值细分<span style="color:#BE4F10;font-size: 0.2rem">(总分:9)</span></div>
                    <div class="s_m_score">
                        <div class="s_m_s_progress">
                            <div class="s_m_s_cur" ref="cardjiaz" style="background-color: #F53266"></div>
                        </div>
                        <span class="s_m_snum">{{reportData.YLZC014}}分</span>
                    </div>
                    <div class="s_m_s_dec">{{moneyBaoPos(1,reportData.YLZC014)}}</div>
                </div>
                <div class="s_money">
                    <div class="s_m_tit">卡使用状态细分<span style="color:#BE4F10;font-size: 0.2rem">(总分:6)</span></div>
                    <div class="s_m_score">
                        <div class="s_m_s_progress">
                            <div class="s_m_s_cur" ref="cardstatus" style="background-color: #2289ED"></div>
                        </div>
                        <span class="s_m_snum">{{reportData.YLZC011}}分</span>
                    </div>
                    <div class="s_m_s_dec">{{moneyBaoPos(2,reportData.YLZC011)}}</div>
                </div>
            </div>
            <div class="sub_title  wow fadeIn">消费特征</div>
            <div class="Social_s  wow fadeIn">
                <div class="s_money">
                    <div class="s_m_tit">消费偏好细分 <span style="color:#BE4F10;font-size: 0.2rem">(总分:8)</span></div>
                    <div class="s_m_score">
                        <div class="s_m_s_progress">
                            <div class="s_m_s_cur" ref="buylike" style="background-color: #05BA1D"></div>
                        </div>
                        <span class="s_m_snum">{{reportData.YLZC010}}分</span>
                    </div>
                    <div class="s_m_s_dec">{{moneyBaoPos(3,reportData.YLZC010)}}</div>
                </div>
            </div>
        </div>
      <div class="sectiontitle  wow fadeIn" style="margin-bottom: 0.5rem;margin-top: 0.3rem">
        <img src="@/assets/cosumption/left_line.png" alt="">
        <span class="title">预估办卡额度</span>
        <img src="@/assets/cosumption/right_line.png" alt="">
      </div>
      <div class="card_trading wow fadeIn" style="background: transparent" >
        <div style="display: flex;flex-direction: column;align-items: center; justify-content: space-between;" >
          <span style="width:3rem;height:3rem;margin-top:0.1rem;display: flex;align-items: center;justify-content: center; border-radius: 50%;background: #FFB600;">
            <span style="width: 2.55rem;height: 2.55rem;display: flex;align-items: center;justify-content: center;border-radius: 50%;background: #161E5B; color:#fff;font-size: 0.34rem;color:#fff;">
              {{ reportData.card_limit || ' 暂时额度' }}
            </span>
          </span>
        </div>
      </div>
        <div class="sectiontitle  wow fadeIn" style="margin-bottom: 0.5rem;margin-top: 0.3rem">
            <img src="@/assets/cosumption/left_line.png" alt="">
            <span class="title">提额概率</span>
            <img src="@/assets/cosumption/right_line.png" alt="">
        </div>
        <div class="limit-wrap ">
            <div class="limit-chart">
                <div class="limit-inner">
                    <div class="limit-circle"></div>
                    <div class="limit-arrow"></div>
                    <div class="limit-grey"></div>
                    <div class="limit-gradient"></div>
                    <div class="limit-num-inner waveAnimation">
                        <div class="waveMiddle"></div>
                        <div class="waveBottom"></div>
                        <span>提额<br/>概率</span>
                    </div>
                </div>
                <div class="limit-line"></div>
                <div class="limit-amount">
                    <p></p>
                    <div class="amount-inner">
                        <div class="chart"></div>
                        <span class="num">{{ reportData.MY012 }}%</span>
                    </div>
                </div>
            </div>

            <div class="limit-state  wow fadeIn">
                <h4 class="warm-tip">{{reportData.YLZC008}}提额小技巧</h4>

                <p v-for="(item,index) in formatTips(reportData.helps)" :key="index">{{ item }}</p>

            </div>
            <div class="line"></div>
        </div>
        <div class="sectiontitle  wow fadeIn">
            <img src="@/assets/cosumption/left_line.png" alt="">
            <span class="title">银行卡交易概况</span>
            <img src="@/assets/cosumption/right_line.png" alt="">
        </div>
        <div class="crad_qudao wow fadeIn">
            <div class="c_q_typetit">
                <span>交易金额(元)</span>
                <span >交易笔数(笔)</span>
            </div>
            <canvas id="card_jiaoyi_detail" width="340" height="300"></canvas>
            <div class="jiaoyi_detali_bt" >
                <div class="jiaoyi_detali_bt_li" >
                    <span >月均消费金(元)</span>
                    <span >{{reportData.YLZC255}}</span>
                </div>
                <div class="jiaoyi_detali_bt_li">
                    <span>月均消费笔数（笔）</span>
                    <span>{{reportData.YLZC258}}</span>
                </div>
                <div class="jiaoyi_detali_bt_li">
                    <span>笔单交易金额（元）</span>
                    <span>{{reportData.YLZC252}}</span>
                </div>
            </div>
        </div>
        <div class="sectiontitle  wow fadeIn">
            <img src="@/assets/cosumption/left_line.png" alt="">
            <span class="title">消费时段</span>
            <img src="@/assets/cosumption/right_line.png" alt="">
        </div>
        <div class="card_trading  wow fadeIn">
            <div class="c_q_typetit">
                <span>交易金额(元)</span>
                <span >交易笔数(笔)</span>
            </div>
            <div class="c_t_t_main">
                <canvas  id="xiaofei_time" width="340" height="300"></canvas>
            </div>
        </div>
        <div class="sectiontitle  wow fadeIn">
            <img src="@/assets/cosumption/left_line.png" alt="">
            <span class="title">消费频次分析</span>
            <img src="@/assets/cosumption/right_line.png" alt="">
        </div>
        <div class="card_trading  wow fadeIn">
            <div class="c_t_t_main">
                <canvas id="xiaofei_pinci" width="340" height="240"></canvas>
                <div class="per_add_main">
                    <div class="p_a_item wow bounceInLeft">
                        <div class="p_a_pnum">
                            <img src="@/assets/cosumption/per_add1.png" alt="">
                            <span>{{reportData.YLZC270}}元</span>
                        </div>
                        <span class="p_a_ptxt">整额交易金额</span>
                    </div>
                    <div class="p_a_item wow bounceInUp">
                        <div class="p_a_pnum">
                            <img src="@/assets/cosumption/per_add2.png" alt="">
                            <span style="color:#FD963E">{{reportData.YLZC273}}笔</span>
                        </div>
                        <span class="p_a_ptxt">整额交易笔数</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="sectiontitle  wow fadeIn">
            <img src="@/assets/cosumption/left_line.png" alt="">
            <span class="title">消费类别分析</span>
            <img src="@/assets/cosumption/right_line.png" alt="">
        </div>
        <div class="card_bus_type">
            <div class="c_b_t_check">
                <div class="c_b_t_citem">
                    <span>近12个月</span>
                    <span class="line"></span>
                </div>
            </div>
            <div class="c_q_typetit">
                <span>交易金额(元)</span>
                <span>交易笔数(笔)</span>
            </div>
            <canvas id="card_bus_type" width="340" height="160"></canvas>
            <canvas id="card_bus_type2" width="340" height="160"></canvas>
        </div>

        <div class="sectiontitle  wow fadeIn">
            <img src="@/assets/cosumption/left_line.png" alt="">
            <span class="title">TOP3商户消费分析</span>
            <img src="@/assets/cosumption/right_line.png" alt="">
        </div>
        <div class="card_bus_type">
            <div class="c_b_t_check">
                <div class="c_b_t_citem">
                    <span>近6个月</span>
                    <span class="line"></span>
                </div>
            </div>
            <div class="c_b_t_class">
                <div class="c_b_t_tj">
                    <span>发生交易的商户种类数：</span>
                    <span style="color:#FF356A;font-size: 0.36rem;font-weight: 600">{{reportData.YLZC299}}</span>
                </div>
            </div>

            <div class="c_q_typetit">
                <span>交易金额(元)</span>
                <span>交易笔数(笔)</span>
            </div>
            <canvas id="card_top3_bus" width="340" height="300"></canvas>
        </div>

        <div class="sectiontitle  wow fadeIn">
            <img src="@/assets/cosumption/left_line.png" alt="">
            <span class="title">POS交易概况</span>
            <img src="@/assets/cosumption/right_line.png" alt="">
        </div>
        <div class="card_trading  wow fadeIn">
            <div class="c_q_typetit">
                <span>交易金额(元)</span>
                <span >交易笔数(笔)</span>
            </div>
            <div class="c_t_t_main">
                <canvas  id="pos_jiaoyi" width="340" height="300"></canvas>
            </div>
        </div>

        <div class="sectiontitle" style="margin-bottom: 0.5rem">
            <img src="@/assets/cosumption/left_line.png" alt="">
            <span class="title">银行卡跨境交易</span>
            <img src="@/assets/cosumption/right_line.png" alt="">
        </div>
        <div class="card_trading wow fadeIn" >
            <div class="c_t_t" >
                <span class="c_t_t_dec">维度</span>
                <div class="c_t_t_type">
                    <!--<span class="active">近1个月</span>
                    <span>近3个月</span>-->
                  <span class="active">近12个月</span>
                </div>
            </div>
            <div class="c_t_t_main"  style="padding: 0 0.3rem">
                <ul style="border-bottom: none;margin-bottom: 0">
                    <li v-for="(item,index) in reportData.MY011[0]" :key="index">
                        <span>{{item[0]}}</span>
                        <span>{{item[1]}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div @click="showTips=!showTips" style="height: 0.8rem;width:5rem;border-radius: 2.5rem;background: #375EA0;line-height: 0.8rem;text-align: center;margin:0.3rem auto 0 ;font-size:0.3rem;color:#fff;">办卡提额小技巧</div>
      <div v-if="showTips" v-for="(item,index) in reportData.card_help" :key="index">
        <div class="sectiontitle" style="margin-bottom: 0.5rem">
          <img src="@/assets/cosumption/left_line.png" alt="">
          <span class="title">{{item.title}}</span>
          <img src="@/assets/cosumption/right_line.png" alt="">
        </div>
        <div class="report_bttips" >
          <p v-html="item.value"></p>
        </div>
      </div>

        <div class="report_bttips wow fadeIn">
            <p v-html="reportData.report_view_foot_text"></p>
            <i></i>
        </div>
        <div class="footer" >
            <img class="leftbg" v-if="false" :src="reportData.report_view_foot_img" alt="">
        </div>
    </div>
</template>
<style lang="less">
    .report_bttips{
        padding:0.4rem 0.2rem;
        margin: 0 auto;
        position: relative;
        width: 6.7rem;
        color: #c0dcff;
        font-weight: 600;
        text-align: justify;
        background: rgba(22,208,255,.15);
        box-sizing: border-box;
        margin-top: 0.3rem;
        p{
            line-height: 0.4rem;
        }
    }
    .report_bttips:before {
        position: absolute;
        content: '';
        width: 5.5px;
        height: 5.5px;
        border: 1.5px solid rgba(52, 59, 172, 1);
        left: 0;
        top:0;
        border-bottom:0;
        border-right:0;
    }
    .report_bttips:after {
        position: absolute;
        content: '';
        width: 5.5px;
        height: 5.5px;
        border: 1.5px solid rgba(52, 59, 172, 1);
        right: 0;
        top:0;
        border-bottom:0;
        border-left:0;
    }
    .report_bttips i{
        position: absolute;
        bottom: 5.5px;
        left: 0;
        display: inline-block;
        width: 100%;
    }
    .report_bttips i:before{
        position: absolute;
        content: '';
        width: 5.5px;
        height: 5.5px;
        border: 1.5px solid rgba(52, 59, 172, 1);
        right: 0;
        top:0;
        border-left:0;
        border-top:0;
    }
    .report_bttips i:after{
        position: absolute;
        content: '';
        width: 5.5px;
        height: 5.5px;
        border: 1.5px solid rgba(52, 59, 172, 1);
        left: 0;
        top:0;
        border-right:0;
        border-top:0;
    }
</style>
<script>
    import F2 from '@antv/f2'
    import { WOW } from 'wowjs'
    export default {
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
        watch:{
            reportData:function () {
                /*app拉取返回到报告页 数据更新*/
                this.threeInOneData = this.reportData.data;
                this.init()
            }
        },
        data(){
            return{
                showTips:false,
                cardtype:{
                    credit:'信用卡',
                    debit:'借记卡'
                },
                jygywdtype:0,
                cardjytype:0,
                carddbtype:0,
                bus_allnum:0,
                bus_allacount:0,
            }
        },
        created() {
        },
        mounted(){
            //
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true
            })
            wow.init();
            if(this.reportData){
                //交易概况数据
                var tradingData =  [
                    {
                        type: '近3个月',
                        num: parseInt(this.reportData.YLZC247)||0,
                        money:parseInt(this.reportData.YLZC243)||0
                    },
                    {
                        type: '近6个月',
                        num: parseInt(this.reportData.YLZC248)||0,
                        money:parseInt(this.reportData.YLZC244)||0

                    },
                    {
                        type: '近12个月',
                        num: parseInt(this.reportData.YLZC249)||0,
                        money:parseInt(this.reportData.YLZC245)||0

                    }
                ];
                //交易频次数据
                var jiaoyipc = [
                    {
                        label:'0-10',
                        num: parseInt(this.reportData.YLZC085)||0,
                    },
                    {
                        label:'10-1百',
                        num: parseInt(this.reportData.YLZC087)||0,
                    },
                    {
                        label:'1百-1千',
                        num: parseInt(this.reportData.YLZC089)||0,
                    },
                    {
                        label:'1千-1万',
                        num: parseInt(this.reportData.YLZC091)||0,
                    },
                    {
                        label:'1万-5万',
                        num: parseInt(this.reportData.YLZC093)||0,
                    },
                    {
                        label:'5万以上',
                        num: parseInt(this.reportData.YLZC095)||0,
                    },
                ]

                //消费时段 xiaofei_time
                var xiaofei_time_data =  [
                    {
                        type: '工作时间',
                        num: parseInt(this.reportData.YLZC213)||0,
                        money:parseInt(this.reportData.YLZC209)||0
                    },
                    {
                        type: '非工作时间',
                        num: parseInt(this.reportData.YLZC205)||0,
                        money:parseInt(this.reportData.YLZC201)||0

                    },
                    {
                        type: '周末',
                        num: parseInt(this.reportData.YLZC221)||0,
                        money:parseInt(this.reportData.YLZC217)||0

                    },
                    {
                        type: '节假日',
                        num: parseInt(this.reportData.YLZC239)||0,
                        money:parseInt(this.reportData.YLZC238)||0

                    },
                    {
                        type: '午夜',
                        num: parseInt(this.reportData.YLZC281)||0,
                        money:parseInt(this.reportData.YLZC277)||0

                    }
                ];
                //POS 交易数据pos_jiaoyi
                var posData =  [
                    {
                        type: '近3个月',
                        num: parseInt(this.reportData.YLZC187)||0,
                        money:parseInt(this.reportData.YLZC183)||0
                    },
                    {
                        type: '近6个月',
                        num: parseInt(this.reportData.YLZC188)||0,
                        money:parseInt(this.reportData.YLZC184)||0

                    },
                    {
                        type: '近12个月',
                        num: parseInt(this.reportData.YLZC189)||0,
                        money:parseInt(this.reportData.YLZC185)||0

                    }
                ];

                //-----------------------------------------

                //top3 数据渲染
                var top3_bus_data=[
                    {
                        type: this.reportData.YLZC302,
                        num: parseInt(this.reportData.YLZC308)||0,
                        money:parseInt(this.reportData.YLZC305)||0
                    },
                    {
                        type:  this.reportData.CDMC299,
                        num:parseInt(this.reportData.CDMC300)||0,
                        money:parseInt(this.reportData.CDMC301)||0

                    },
                    {
                        type: this.reportData.CDMC306,
                        num: parseInt(this.reportData.CDMC307)||0,
                        money:parseInt(this.reportData.CDMC308)||0,

                    }
                ]

                //商户数据渲染
                var bus_num_data = []
                var bus_money_data = []

                for(let i=0;i<this.reportData.MY009.length;i++){
                    let item = this.reportData.MY009[i];
                    bus_num_data.push({
                        name: item.label,
                        num: parseInt(item.count)||0
                    })
                    bus_money_data.push({
                        name: item.label,
                        num: parseInt(item.amount)||0
                    })

                }
                bus_num_data = bus_num_data.sort(function ( a,b ) {
                    return b.num-a.num;
                })
                bus_money_data = bus_money_data.sort(function ( a,b ) {
                    return b.num-a.num;
                })
                bus_num_data = bus_num_data.splice(0,5)
                bus_money_data = bus_money_data.splice(0,5)
                this.bus_allnum =  parseInt(bus_num_data[0].num);
                this.bus_allacount =  parseInt(bus_money_data[0].num);
            }
//

            let isdataLoaded = {}
            window.onscroll=()=>{
                if(this.reportData){
                    this.bodyScroll(document.getElementById('card_jiaoyi_detail'),()=>{
                        if(isdataLoaded['card_jiaoyi_detail'])return
                        isdataLoaded['card_jiaoyi_detail'] = true;
                        this.fenzu('card_jiaoyi_detail',tradingData,['#0490FD','#FF356A'],['交易金额','交易笔数'])
                    })
                    this.bodyScroll(document.getElementById('xiaofei_pinci'),()=>{
                        if(isdataLoaded['xiaofei_pinci'])return
                        isdataLoaded['xiaofei_pinci'] = true;
                        this.singleBar('xiaofei_pinci',jiaoyipc,['#0490FD','#043257'])
                    })
                    this.bodyScroll(document.getElementById('xiaofei_time'),()=>{
                        if(isdataLoaded['xiaofei_time'])return
                        isdataLoaded['xiaofei_time'] = true;
                        this.fenzu('xiaofei_time',xiaofei_time_data,['#0490FD','#FF356A'],['交易金额','交易笔数'])
                    })

                    this.bodyScroll(document.getElementById('pos_jiaoyi'),()=>{
                        if(isdataLoaded['pos_jiaoyi'])return
                        isdataLoaded['pos_jiaoyi'] = true;
                        this.fenzu('pos_jiaoyi',posData,['#0490FD','#FF356A'],['交易金额','交易笔数'])
                    })



                    this.bodyScroll(document.getElementById('card_top3_bus'),()=>{
                        if(isdataLoaded['card_top3_bus'])return
                        isdataLoaded['card_top3_bus'] = true;
                        this.fenzu('card_top3_bus',top3_bus_data,['#FF356A','#FBC35B'],['交易金额','交易笔数'])
                    })

                    this.bodyScroll(document.getElementById('card_bus_type'),()=>{
                        if(isdataLoaded['card_bus_type'])return
                        isdataLoaded['card_bus_type'] = true;
                        this.lineReserve('card_bus_type',bus_money_data,['#FF3668'])
                    })
                    this.bodyScroll(document.getElementById('card_bus_type2'),()=>{
                        if(isdataLoaded['card_bus_type2'])return
                        isdataLoaded['card_bus_type2'] = true;
                        this.lineReserve('card_bus_type2',bus_num_data,['#FBC35B'])
                    })
                    this.bodyScroll(document.getElementById('socialdiw'),()=>{
                        if(isdataLoaded['socialdiw'])return
                        isdataLoaded['socialdiw'] = true;
                        this.perProgress(5,'YLZC017','moneybao')//钱包
                        this.perProgress(9,'YLZC014','cardjiaz')//价值
                        this.perProgress(6,'YLZC011','cardstatus')//状态
                        this.perProgress(8,'YLZC010','buylike')//偏好
                    })

                }
            }

        },
        methods:{
            bodyScroll(domDiv,bottomCb){
                var scrollTop= document.body.scrollTop||document.documentElement.scrollTop//页面上卷的高度
                var curdiv_offsettop=domDiv.offsetTop;//元素到顶部的距离
                var curdiv_height=domDiv.offsetHeight;//元素到顶部的距离
                var divHeight=document.documentElement.clientHeight;//页面可视区域的高度
                if(Math.ceil(scrollTop+divHeight)>=curdiv_offsettop+curdiv_height){
                    if(bottomCb){
                        bottomCb(scrollTop)
                    }
                }
            },
            cardQudao(lineid,data,color){

                var chart = new F2.Chart({
                    id: lineid,
                    pixelRatio: window.devicePixelRatio
                });
                chart.axis('num', {
                    grid:{
                        stroke: '#221F4E',
                        lineDash:[]
                    }
                });
                chart.legend(false)

                chart.source(data);
                chart.interval().position('type*num').size('name', [ 15, 15 ]).color('name',color).adjust({
                    type: 'dodge',
                    marginRatio: 0   // 设置分组间柱子的间距
                })

                chart.render();
            },
            lineReserve(lineid,data,color){

                var chart = new F2.Chart({
                    id: lineid,
                    pixelRatio: window.devicePixelRatio
                });
                chart.legend(false)
                chart.source(data.reverse(), {
                    value: {
                        tickInterval: 750
                    }
                });
                chart.coord({
                    transposed: true
                });
                chart.axis('name', {
                    line: null,
                    grid:null,
                })
                chart.axis('num', {
                    line: null,
                    grid: {
                        stroke: '#221F4E',
                        lineDash:[]
                    },
                });
                chart.interval().position('name*num').size([10 ]).color('name',color).adjust({
                    type: 'dodge',
                    marginRatio: 0
                });
                chart.render();
            },
            ininHalfCircle(){
                const {
                    Shape,
                    G,
                    Util,
                    Global
                } = F2;
                const Vector2 = G.Vector2;

// 极坐标下带圆角的柱子，只对极坐标生效
                Shape.registerShape('interval', 'polar-tick', {
                    draw: function draw(cfg, container) {
                        const points = this.parsePoints(cfg.points);
                        const style = Util.mix({
                            stroke: cfg.color
                        }, Global.shape.interval, cfg.style);

                        let newPoints = points.slice(0);
                        if (this._coord.transposed) {
                            newPoints = [ points[0], points[3], points[2], points[1] ];
                        }

                        const center = cfg.center;
                        const x = center.x,
                            y = center.y;


                        const v = [ 1, 0 ];
                        const v0 = [ newPoints[0].x - x, newPoints[0].y - y ];
                        const v1 = [ newPoints[1].x - x, newPoints[1].y - y ];
                        const v2 = [ newPoints[2].x - x, newPoints[2].y - y ];

                        let startAngle = Vector2.angleTo(v, v1);
                        let endAngle = Vector2.angleTo(v, v2);
                        const r0 = Vector2.length(v0);
                        const r = Vector2.length(v1);

                        if (startAngle >= 1.5 * Math.PI) {
                            startAngle = startAngle - 2 * Math.PI;
                        }

                        if (endAngle >= 1.5 * Math.PI) {
                            endAngle = endAngle - 2 * Math.PI;
                        }

                        const lineWidth = r - r0;
                        const newRadius = r - lineWidth / 2;

                        return container.addShape('Arc', {
                            className: 'interval',
                            attrs: Util.mix({
                                x,
                                y,
                                startAngle,
                                endAngle,
                                r: newRadius,
                                lineWidth,
                                lineCap: 'round'
                            }, style)
                        });
                    }
                });
                const data = [{
                    const: 'a',
                    actual: 75,
                    expect: 100
                }];
                const chart = new F2.Chart({
                    id: 'container',
                    padding: [ 0, 30, 60 ],
                    pixelRatio: window.devicePixelRatio
                });
                chart.source(data, {
                    actual: {
                        max: 100,
                        min: 0,
                        nice: false
                    }
                });
                chart.coord('polar', {
                    transposed: true,
                    innerRadius: 0.8,
                    startAngle: -Math.PI,
                    endAngle: 0
                });
                chart.axis(false);
                chart.interval()
                    .position('const*expect')
                    .shape('polar-tick')
                    .size(10)
                    .color('rgba(80, 143, 255, 0.95)')
                    .animate(false); // 背景条
                chart.interval()
                    .position('const*actual')
                    .shape('polar-tick')
                    .size(10)
                    .color('#fff')
                    .animate({
                        appear: {
                            duration: 1100,
                            easing: 'linear',
                            animation: function animation(shape, animateCfg) {
                                const startAngle = shape.attr('startAngle');
                                let endAngle = shape.attr('endAngle');
                                if (startAngle > endAngle) {
                                    // -Math.PI/2 到 0
                                    endAngle += Math.PI * 2;
                                }
                                shape.attr('endAngle', startAngle);
                                shape.animate().to(Util.mix({
                                    attrs: {
                                        endAngle
                                    }
                                }, animateCfg)).onUpdate(function(frame) {
                                    const textEl = document.querySelector('#text');
                                    if (textEl) textEl.innerHTML = parseInt(frame * 75) + '%';
                                });
                            }
                        }
                    }); // 实际进度
                chart.guide().html({
                    position: [ '50%', '80%' ],
                    html: `
    <div style="width: 120px;color: #fff;white-space: nowrap;text-align:center;">
      <p style="font-size: 18px;margin:0;">本月进度</p>
      <p id="text" style="font-size: 48px;margin:0;font-weight: bold;">0</p>
    </div>`
                });
                chart.render();
            },
            riskScoreTxt(num){
                if(num<300){
                    return '高'
                }else if(num>=300&&num<=700){
                    return '中'
                }else{
                    return '低'
                }
            },
            richTxt(type,num){
                if(type==0){
                    //消费自由度解释
                    if(num<=300){
                        return '低自由度'
                    }else if(num>300&&num<=700){
                        return '中自由度'
                    }else if(num>700&&num<=1000){
                        return '高自由度'
                    }else if(num==9991){
                        return '商业性消费、一次性大额消费'
                    }else if(num==9992){
                        return '近三个月无交易行为'
                    }else if(num==9993){
                        return '交易次数过少'
                    }else{
                        return '近6个月无交易'
                    }
                }else if(type==1){
                    if(num==1){
                        return '（与地域相比）显著低'
                    }else if(num==2){
                        return '（与地域相比）低'
                    }else if(num==3){
                        return '（与地域相比）相当'
                    }else if(num==4){
                        return '（与地域相比）高'
                    }else if(num==5){
                        return '（与地域相比）显著高'
                    }else if(num==6){
                        return '高额消费'
                    }else{
                        return '近3个月无交易'
                    }
                }else if(type==2){
                    if(num==1){
                        return '（与地域相比）显著慢'
                    }else if(num==2){
                        return '（与地域相比）慢'
                    }else if(num==3){
                        return '（与地域相比）相当'
                    }else if(num==4){
                        return '（与地域相比）快'
                    }else if(num==5){
                        return '（与地域相比）显著快'
                    }else if(num==6){
                        return '与地域相比）不稳定'
                    }else{
                        return '近6个月无交易'
                    }
                }
            },
            formatTips(data){
                return   data.split('\r\n')
            },
            fenzu(mountNode,data,colors,alias){
                // ----- 自定义 shape ------
                var Shape = F2.Shape;
                var Util = F2.Util;
                var Global = F2.Global;

                function getRectRange(points, step) {
                    var xValues = [];
                    var yValues = [];
                    for (var i = 0, len = points.length; i < len; i++) {
                        var point = points[i];
                        xValues.push(point.x - step);
                        yValues.push(point.y);
                    }
                    var xMin = Math.min.apply(null, xValues);
                    var yMin = Math.min.apply(null, yValues);
                    var xMax = Math.max.apply(null, xValues);
                    var yMax = Math.max.apply(null, yValues);

                    return {
                        x: xMin,
                        y: yMin,
                        width: xMax - xMin,
                        height: yMax - yMin
                    };
                }

                // 左侧柱子
                Shape.registerShape('interval', 'left', {
                    draw: function draw(cfg, container) {
                        var points = this.parsePoints(cfg.points);
                        var style = Util.mix({
                            fill: cfg.color
                        }, Global.shape.interval, cfg.style);

                        var rectCfg = getRectRange(points, cfg.size); // cfg.size 对应 .size(25)

                        return container.addShape('rect', {
                            className: 'interval',
                            attrs: Util.mix(rectCfg, style)
                        });
                    }
                });
                // 右侧柱子
                Shape.registerShape('interval', 'right', {
                    draw: function draw(cfg, container) {
                        var points = this.parsePoints(cfg.points);
                        var style = Util.mix({
                            fill: cfg.color
                        }, Global.shape.interval, cfg.style);
                        var rectCfg = getRectRange(points, -cfg.size / 2); // cfg.size 对应 .size(25

                        return container.addShape('rect', {
                            className: 'interval',
                            attrs: Util.mix(rectCfg, style)
                        });
                    }
                });

                // ------ 开始绘制 chart ------
                var chart = new F2.Chart({
                    id: mountNode,
                    pixelRatio: window.devicePixelRatio
                });

                chart.source(data, {
                    type: {
                        alias: '商品名称' // 列定义，定义该属性显示的别名
                    },
                    money: {
                        alias:alias[0]
                    },
                    num: {
                        alias:alias[1]
                    },
                });

                chart.axis('money', {
                    grid: null,

                });

                chart.axis('num', {
                    line: null,
                    grid: {
                        stroke: '#221F4E',
                        lineDash:[]
                    }
                });
                chart.interval().position('type*money').color(colors[0]).shape('left').size(15);
                chart.interval().position('type*num').color(colors[1]).shape('right').size(15);
                chart.render();
            },
            singleBar(mountNode,data,colors){
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
                                text: origin['num']+'笔',
                                fill: '#fff',
                                textAlign: 'center',
                                textBaseline: 'bottom',
                                fontSize: 14 // 字体大小
                            }
                        });
                        container.sort();
                        return [intervalShape, textShape];
                    }
                });
                var chart = new F2.Chart({
                    id: mountNode,
                    pixelRatio: window.devicePixelRatio
                });

                chart.source(data, {
                    sales: {
                        tickCount: 5
                    }
                });
                chart.tooltip({
                    showItemMarker: false,
                    onShow: function onShow(ev) {
                        var items = ev.items;
                        items[0].name = null;
                        items[0].name = items[0].title;
                        items[0].value =  items[0].value+'笔';
                    }
                });

                // 让柱状图的宽度适配不同的屏幕尺寸
                var barWidth = 36 * (window.innerWidth / 375);

                chart.interval().position('label*num').shape('text').color(`l(90) 0:${colors[0]} 1:${colors[1]}`) // 定义柱状图渐变色
                    .size(barWidth);
                chart.render();
            },
            moneyBaoPos(type,num){
                if(type==0){
                    //消费自由度解释
                    if(num==1){
                        return '靠后 ： 持卡人很少使用，交易特征为划卡次数很少，用卡商户类型少，总交易金额低，刷卡消费不稳定；'
                    }else if(num==2){
                        return '居中（特殊）：主要用于某一两次大额支付服务，用卡次数少、商户类型少，总划卡金额及单笔高，刷卡消费比较不稳定'
                    }else if(num==3){
                        return '居中（专门）：主要用于某类特定商户的交易，划卡次数多，用卡商户类型少，刷卡消费比较稳定，但用卡范围比较固定'
                    }else if(num==4){
                        return '居中（辅助）：多为首选卡金额不足情况下的辅助用卡，各项指标都较高，但明显低于靠前'
                    }else if(num==5){
                        return '靠前：持卡人首选卡，消费频率高、类别范围广，与发卡银行业务粘合度高，刷卡消费稳定'
                    }else{
                        return '近6个月无交易'
                    }
                }else if(type==1){
                    if(num==1){
                        return '高端人群:最优质客群，交易金额高，消费场所高端，客户价值很高'
                    }else if(num==2){
                        return '文艺小资:消费场所高端，交易金额较高，但显著低于高端人群，客户价值高'
                    }else if(num==3){
                        return '白领人士:交易金额高，消费场所档次较高，但显著低于高端人群，客户价值高'
                    }else if(num==4){
                        return '潜力客户:消费场所高端，但交易次数少、消费金额不高，客户现有价值一般，但潜力很高'
                    }else if(num==5){
                        return '打拼生活:消费场所档次一般，消费金额中等，客户价值中等'
                    }else if(num==6){
                        return '大宗交易:交易金额很高，主要为批发类大宗交易，客户个人价值中低，但有较大的贷款需求和潜力'
                    }else if(num==7){
                        return '日常超市:交易金额中等，消费场所主要为日常消费地点，客户价值中低'
                    }else if(num==8){
                        return '小微批发:主要为批发类交易，交易金额较高，但显著低于大宗交易类客户，客户个人价值较低，但有一定的贷款需求和潜力'
                    }else if(num==8){
                        return '低频消费：交易金额、频次低，消费集中于日常消费，客户价值低'
                    }else{
                        return '近6个月无交易'
                    }
                }else if(type==2){
                    if(num==1){
                        return '不活跃客户'
                    }else if(num==2){
                        return '长期忠诚客户'
                    }else if(num==3){
                        return '活跃上升客户'
                    }else if(num==4){
                        return '活跃下降客户'
                    }else if(num==5){
                        return '自激活或新客户'
                    }else if(num==6){
                        return '睡眠客户'
                    }else{
                        return '近12个月无交易'
                    }
                }else if(type==3){
                    if(num==1){
                        return '取现转账'
                    }else if(num==2){
                        return '购物消费'
                    }else if(num==3){
                        return '商务差旅'
                    }else if(num==4){
                        return '生意达人'
                    }else if(num==5){
                        return '卫生医疗'
                    }else if(num==6){
                        return '殷实家居'
                    }else if(num==7){
                        return '爱车一族'
                    }else if(num==8){
                        return '成长家庭'
                    }else{
                        return '近6个月无交易'
                    }
                }
            },

            perProgress(allpernum,key,refele){
                let _this = this;
                if(this.reportData[key]&&!isNaN(parseInt(this.reportData[key]))){
                    let curprogre = 0;
                    ;(function run() {
                        curprogre+=1
                        _this.$refs[refele].style.width = parseFloat((curprogre/(allpernum*20)).toFixed(2))*100+'%'
                        var stop = window.requestAnimationFrame(run);
                        if(curprogre >= (_this.reportData[key]*20)){
                            window.cancelAnimationFrame(stop);//可以取消该次动画。
                            return;
                        };
                    })()
                }else{
                    this.$refs[refele].style.width = '0%'
                }
            },
            changeWd(type){
                this.jygywdtype = type;
            }

        }
    }
</script>

<style scoped lang="less">
    .jiaoyi_detali_bt{
        display: flex;flex-wrap: wrap; align-items: center;justify-content: center;
        .jiaoyi_detali_bt_li{
            width: 50%; display: flex;flex-direction: column;align-items: center;
            span:nth-of-type(1){
                font-size: 0.26rem;color:#2CA0E6;
            }
            span:nth-of-type(2){
                font-size: 0.26rem;color:#2CA0E6;
            }
        }
    }
    .ConsumptionPage{
        background-color:#0E0638 ;
        padding-bottom: 0.4rem;
        .banner{
            overflow: hidden;
            img{
                width: 100%;
                animation: rotate_back 3.5s linear infinite;
                animation-delay: 0.5s;
            }
            @keyframes rotate_back{
                0%{
                    transform: rotate(0);
                }
                25%{
                    transform: rotate(2deg);
                }
                50%{
                    transform: rotate(0);
                }
                75%{
                    transform: rotate(2deg);
                }
                100%{
                    transform: rotate(0);
                }
            }
        }

        .sectiontitle{
            margin: 0.5rem auto 0.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .title{
                font-size: 0.26rem;
                color:#2CA0E6;
                padding: 0 0.2rem;
                display:inline-block;
                position: relative;
                &:after{
                    content: '';
                    display: inline-block;
                    width: 100%;
                    position: absolute;
                    left: 0;
                    bottom: -0.04rem;
                    z-index: 10;
                    height: 0.14rem;
                    background-color: #2BA0E8;
                    opacity: 0.3;
                }
            }
        }
        .personInfo{
            display: flex;
            background-color:#112261 ;
            background: -webkit-linear-gradient(left top, #11225F , #240F3F); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(bottom right,  #11225F , #240F3F); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(bottom right, #11225F , #240F3F); /* Firefox 3.6 - 15 */
            background: linear-gradient(to bottom right, #11225F , #240F3F); /* 标准的语法 */
            border-radius: 0.1rem;
            padding: 0.3rem 0;
            margin: 0 0.4rem;
            .pi_user{
                flex: 1;
                padding-left: 0.5rem;
                .u_name{
                    display: flex;
                    align-items: center;
                    color:#fff;
                    img{
                        width: 0.4rem;
                    }
                    span{
                        margin-left: 0.3rem;
                        font-size: 0.26rem;
                    }
                    margin-bottom: 0.2rem;
                }
                .pi_u_item{
                    color:#1D77C6;
                    line-height: 0.4rem;
                    span{
                        font-size: 0.26rem;
                    }
                }
            }
            .pi_card{
                .c_name{
                    height: 0.5rem;
                    line-height: 0.5rem;
                    border-bottom-left-radius: 0.25rem;
                    border-top-left-radius: 0.25rem;
                    font-size: 0.26rem;
                    color:#fff;
                    background-color: #0B418C;
                    padding: 0 0.4rem;
                    text-align: right;
                }
                .c_type{
                    color:#1D77C6;
                    line-height: 0.5rem;
                    font-size: 0.24rem;
                    text-align: right;
                }
            }
        }

        /*银行卡基本信息*/
        .cardBase{
            background-color:#152059 ;
            border-radius: 0.1rem;
            padding: 0.3rem 0.2rem ;
            margin: 0 0.4rem;
            ul{
                li{
                    padding: 0 0.2rem;
                    height: 0.7rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span{
                        color:#fff;
                        font-size: 0.24rem;
                    }
                }
                li.line{
                    background-color: #1D2766;
                }
            }
        }
        /*银行卡upa评分*/
        .cardScore{
            padding: 0.3rem 0.2rem ;
            margin: 0 0.4rem;
            .sub_title{
                font-size: 0.26rem;
                color:#fff;
                font-weight: bold;
                display:inline-block;
                position: relative;
                margin-bottom: 0.3rem;
                &:after{
                    content: '';
                    display: inline-block;
                    width: 100%;
                    position: absolute;
                    left: 0;
                    bottom: -0.04rem;
                    z-index: 10;
                    height: 0.1rem;
                    background-color: #2BA0E8;
                    opacity: 0.3;
                }
            }
            .c_s_con{
                text-align: center;
                margin-bottom: 0.5rem;
                .c_s_mian{
                    position: relative;
                    width: 3.67rem;
                    height: 3rem;
                    margin: 0.3rem auto 0;
                    img{
                        width: 3.67rem;
                        position: absolute;
                        left: 0;
                        top: 0;

                    }
                    .c_s_num{
                        position: relative;
                        z-index: 99;
                        top:0.9rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        span{
                            color: #969fbe;
                            font-size: 0.24rem;
                        }
                        span:nth-of-type(1){
                            font-size: 0.46rem;
                            color:#fff;
                            margin: 0.2rem 0;
                        }
                        span:nth-of-type(2){
                            color: #D29046;
                        }
                    }
                }
                .c_s_dec{
                    display: flex;
                    justify-content: space-between;
                    span:nth-of-type(1){
                        font-size: 0.24rem;
                        color:#7987BF;
                        flex: 1;
                        text-align: left;
                        &.dec1:before{
                            content: '';
                            display: inline-block;
                            width: 0.2rem;
                            height: 0.2rem;
                            margin-right: 0.1rem;
                            background-color: #10C9FA;
                        }
                        &.dec2:before{
                            content: '';
                            display: inline-block;
                            width: 0.2rem;
                            height: 0.2rem;
                            margin-right: 0.1rem;
                            background-color: #F5C558;
                        }
                    }

                    span:nth-of-type(2){
                        font-size: 0.28rem;
                        color:#fff;
                        flex: 1;
                        text-align: center;
                    }
                    span:nth-of-type(3){
                        flex: 1;
                        text-align: right;
                        font-size: 0.24rem;
                        color:#7987BF;
                    }
                }
            }
            .m_Ability{
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
                .m_a_conli{
                    margin-top: 0.1rem;
                    .m_a_item{
                        position: relative;
                        width: 1.68rem;
                        height: 1.68rem;
                        img{
                            width: 1.68rem;
                            height: 1.68rem;
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                        .m_a_dec{
                            position: relative;
                            z-index: 99;
                            top:0.4rem;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            span{
                                color: #fff;
                                font-size: 0.36rem;
                            }
                            span:nth-of-type(2){
                                font-size: 0.22rem;
                                color:#969fbe;
                                width:80%;
                                text-align: center;
                                word-break: break-word;
                            }
                        }
                    }
                    .m_a_item_tit{
                        font-size: 0.26rem;
                        color:#fff;
                        margin-top: 0.3rem;
                    }
                }

            }
            .Social_s{
                margin-bottom: 0.4rem;
                .s_money{
                    margin: 0.3rem 0;
                    .s_m_tit{
                        font-size: 0.24rem;
                        color:#fff;
                        font-weight: 600;
                        &:before{
                            content: '';
                            display: inline-block;
                            width: 0.1rem;
                            height: 0.1rem;
                            border-radius: 0.05rem;
                            background-color: #fff;
                            margin-right: 0.1rem;
                        }
                    }
                    .s_m_score{
                        display: flex;
                        margin: 0.16rem 0;
                        align-items: center;
                        .s_m_s_progress{
                            flex: 1;
                            background-color: #465592;
                            height: 0.2rem;
                            position: relative;
                            .s_m_s_cur{
                                position: absolute;
                                left: 0;
                                top: 0;
                                height: 0.2rem;
                                width: 50%;
                                background-color: #FFB600;
                            }
                        }
                        .s_m_snum{
                            font-size: 0.22rem;
                            line-height: 0.26rem;
                            color: #fff;
                            padding-left: 0.2rem;
                        }
                    }
                    .s_m_s_dec{
                        font-size: 0.24rem;
                        color: #7987BF;
                    }
                }
            }
        }
        .card_trading{
            border-radius: 0.1rem;
            background-color: #161E5B;
            margin: 0 0.4rem;
            padding: 0.2rem 0 0.3rem;
            .c_q_typetit{

                display: flex;
                align-items: center;
                margin: 0.2rem 0.3rem 0.3rem;
                span{
                    font-size: 0.24rem;
                    color:#fff;
                    font-weight: 600;
                    margin-right: 0.3rem;
                    &:before{
                        content: '';
                        display: inline-block;
                        width: 0.2rem;
                        height: 0.2rem;
                        background-color: #0490FD;
                        margin-right: 0.1rem;
                    }
                    &:nth-of-type(2):before{
                        background-color: #FF356A;
                    }
                }
                &.c_q_time{
                    span{
                        &:before{
                            background-color: #D2497E;
                        }
                        &:nth-of-type(2):before{
                            background-color: #34B775;
                        }
                    }

                }
            }
            .c_t_t{
                display: flex;
                background-color: #1A225F;
                height: 0.7rem;
                align-items: center;
                padding: 0 0.3rem;
                .c_t_t_dec{
                    color:#D3A842;
                    font-size: 0.24rem;
                    text-decoration: underline;
                }
                .c_t_t_type{
                    flex: 1;
                    text-align: right;
                    span{
                        background-color: #375EA0;
                        display: inline-block;
                        height: 0.4rem;
                        line-height: 0.4rem;
                        border-radius: 0.2rem;
                        padding: 0 0.2rem;
                        font-size: 0.24rem;
                        color:#fff;
                        margin: 0 0.1rem;
                        &.active{
                            background-color: #FFB600;
                        }
                    }
                }
            }
            .c_t_t_main{
                margin-top: 0.2rem;
                /*  padding: 0 0.3rem;*/
                ul{
                    border-bottom: 1px dashed #90A0DA;
                    padding-bottom: 0.3rem;
                    margin-bottom: 0.3rem;
                    li{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 0.6rem;
                        span{
                            color:#fff;
                            font-size: 0.24rem;
                        }
                        span:nth-of-type(2){
                            color:#90A0DA;
                            font-size: 0.28rem;
                        }
                    }
                }
                .per_add_main{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    .p_a_item{
                        width: 33.33%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        .p_a_pnum{
                            position: relative;
                            width: 1.46rem;
                            height: 1.46rem;
                            text-align: center;
                            img{
                                width: 1.46rem;
                                height: 1.46rem;
                                position: absolute;
                                left: 0;
                                top: 0;
                            }
                            span{
                                font-size: 0.24rem;
                                color:#A458FA;
                                position:relative ;
                                top:0.6rem;
                            }
                        }
                        .p_a_ptxt{
                            padding: 0 0.1rem;
                            font-size: 0.24rem;
                            color:#fff;
                            margin-top: 0.2rem;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .crad_qudao{
            margin:0 0.4rem;
            overflow: hidden;
            .c_q_typetit{
                display: flex;
                align-items: center;
                margin: 0.2rem 0 0.3rem;
                span{
                    font-size: 0.24rem;
                    color:#fff;
                    font-weight: 600;
                    margin-right: 0.3rem;
                    &:before{
                        content: '';
                        display: inline-block;
                        width: 0.2rem;
                        height: 0.2rem;
                        background-color: #0490FD;
                        margin-right: 0.1rem;
                    }
                    &:nth-of-type(2):before{
                        background-color: #FF356A;
                    }
                }
                &.c_q_time{
                    span{
                        &:before{
                            background-color: #D2497E;
                        }
                        &:nth-of-type(2):before{
                            background-color: #34B775;
                        }
                    }

                }
            }
        }
        .card_feature{
            border-radius: 0.1rem;
            background-color: #161E5B;
            margin: 0 0.4rem;
            padding: 0.2rem 0.2rem 0.3rem;
            overflow: hidden;
            .c_f_t{
                display: flex;
                background-color: #1A225F;
                height: 0.7rem;
                align-items: center;
                padding: 0 0.3rem;
                justify-content: space-between;
                .c_f_t_dec{
                    color:#D3A842;
                    font-size: 0.24rem;
                    text-decoration: underline;
                }
                .c_f_t_type{
                    color:#fff;
                    font-size: 0.24rem;
                    text-decoration: underline;
                }
            }
            ul{
                margin-top: 0.2rem;
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 0.5rem;
                    span{
                        color:#fff;
                        font-size: 0.24rem;
                    }
                    span:nth-of-type(2){
                        color:#90A0DA;
                        font-size: 0.26rem;
                    }
                }
            }
        }
        .card_bus_type{
            margin: 0 0.4rem;
            .c_q_typetit{
                display: flex;
                align-items: center;
                margin: 0.4rem 0 0rem;
                span{
                    font-size: 0.24rem;
                    color:#fff;
                    font-weight: 600;
                    margin-right: 0.3rem;
                    &:before{
                        content: '';
                        display: inline-block;
                        width: 0.2rem;
                        height: 0.2rem;
                        background-color: #FE366C;
                        margin-right: 0.1rem;
                    }
                    &:nth-of-type(2):before{
                        background-color: #FBC35B;
                    }
                }
            }
            .c_b_t_check{
                display: flex;
                align-items: center;
                margin-top: 0.3rem;
                margin-bottom: 0.3rem;
                .c_b_t_citem{
                    position: relative;
                    margin-right: 0.4rem    ;
                    span{
                        font-size: 0.24rem;
                        color:#fff;
                    }
                    .line{
                        position: absolute;
                        bottom: -0.1rem;
                        display: inline-block;
                        width: 0.5rem;
                        height: 0.06rem;
                        background-color: #fff;
                        margin-left: -0.25rem;
                        left: 50%;
                    }
                }
            }
            .c_b_t_class{
                .c_b_t_tit{
                    text-align: center;
                    font-size: 0.26rem;
                    color:#fff;
                    span{
                        color:#FE366C;
                        font-size: 0.36rem;margin-left: 0.2rem;
                    }
                }
                .c_b_t_c_arr{
                    margin-top: 0.3rem;
                    margin-bottom: 0.3rem;
                    justify-content: center;
                    display: flex;
                    align-items: center;
                    span{
                        margin: 0 0.1rem;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        border-radius: 0.3rem;
                        text-align: center;
                        padding: 0 0.3rem;
                        background-color: #243C78;
                        font-size: 0.26rem;
                        color:#fff;
                        &.active{
                            background-color: #03A4FA;
                        }
                    }
                }
                .c_b_t_tj{
                    line-height: 0.5rem;
                    span{
                        font-size: 0.24rem;
                        color:#fff;
                    }
                }
            }

        }

        .footer{
            margin: 1rem 0.4rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .leftbg{
                width:6.23rem;
                height: 1.9rem;
            }
        }
    }
</style>
<style>
    .limit-wrap {
        margin-bottom: 18.5px
    }

    .limit-chart {
        position: relative;
        display: flex;
        display: -webkit-flex;
        margin: 22px 0 17px 1.87rem
    }

    .limit-inner {
        position: relative;
        flex: 0 0 3.35rem;
        -webkit-flex: 0 0 3.35rem;
        width: 3.35rem;
        height: 3.35rem
    }

    .limit-circle {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(../../../../../assets/cosumption/limit_circle_1.png) no-repeat center center;
        background-size: 3.35rem 3.31rem;
        animation: rotate 10s linear infinite;
    }

    .limit-circle:after {
        content: '';
        display: block;
        position: absolute;
        top: .1rem;
        left: .16rem;
        width: 3.03rem;
        height: 3.11rem;
        background: url(../../../../../assets/cosumption/limit_circle_2.png) no-repeat center center;
        background-size: 3.03rem 3.11rem
    }

    .limit-grey {
        position: absolute;
        top: .36rem;
        left: .36rem;
        width: 2.4rem;
        height: 2.4rem;
        border: solid 5px rgba(65,116,255,.29);
        border-radius: 50%
    }

    .limit-gradient {
        position: absolute;
        top: .74rem;
        left: .74rem;
        width: 1.79rem;
        height: 1.79rem;
        background: url(../../../../../assets/cosumption/limit_circle_3.png) no-repeat center center;
        background-size: 1.79rem;
        animation: rotate 10s linear infinite;
    }
    .limit-gradient {
        animation-duration: 12s;
    }
    .limit-num-inner {
        position: absolute;
        top: .98rem;
        left: .98rem;
        border-radius: 50%;
        width: 1.4rem;
        height: 1.4rem;
        background: url(../../../../../assets/cosumption/limit_circle_5.png) no-repeat center center;
        background-size: 1.4rem 1.4rem
    }

    .amount-inner .chart,.waveBottom,.waveMiddle {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: .94rem
    }

    .waveMiddle {
        background: url(../../../../../assets/cosumption/limit_circle_7.png) no-repeat center bottom;
        background-size: 100% .94rem
    }

    .waveBottom {
        height: .86rem;
        background: url(../../../../../assets/cosumption/limit_circle_6.png) no-repeat center bottom;
        background-size: 100% .86rem;
        z-index: 33
    }

    .amount-inner span,.limit-num-inner span {
        position: absolute;
        left: 0;
        bottom: .11rem;
        width: 100%;
        text-align: center;
        font-size: 10px;
        color: #fff;
        z-index: 35
    }

    .limit-line {
        flex: 0 0 2.26rem;
        -webkit-flex: 0 0 2.26rem;
        height: 20px;
        width: 1.13rem;
        margin-top: 1rem;
        background: url(../../../../../assets/cosumption/limit_circle_8.png) no-repeat left center;
        background-size: 1.13rem 20px
    }

    .limit-amount {
        position: absolute;
        top: 0;
        right: 1.11rem;
        width: 1.02rem;
        height: 1rem
    }

    .amount-inner,.limit-amount p {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border: dashed 1px #eb8b43;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;

    }
    .limit-amount p{
        animation: rotate 10s linear infinite;
    }
    @keyframes rotate {
        to{
            transform: rotate(360deg);
        }from{
             transform: rotate(0deg);
         }
    }
    .amount-inner {
        top: 50%;
        left: 50%;
        width: .74rem;
        height: .74rem;
        border-style: solid;
        transform: translate(-50%,-50%)
    }

    .amount-inner:after {
        display: block;
        content: '';
        width: .76rem;
        height: .76rem;
        margin-top: -.02rem;
        margin-left: -.02rem;
        background: url(../../../../../assets/cosumption/limit_circle_orange2.png) no-repeat center center;
        background-size: 100%
    }

    .amount-inner .chart {
        height: .56rem;
        background: url(../../../../../assets/cosumption/limit_circle_orange.png) no-repeat center bottom;
        background-size: 100%
    }

    .amount-inner span {
        font-size: 14px;
        color: #ff9745;
        bottom: .1rem
    }

    .limit-state {
        padding-bottom: 22px
    }

    .limit-state p {
        padding: 0 26px;
        font-size: 12px;
        color: rgba(192,220,255,1);
        line-height: 19px;
        text-align: justify
    }

    .limit-wrap .line {
        padding: 0 26.5px
    }


    .warm-tip {
        display: flex;
        display: -webkit-flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #bfdcff;
        padding-bottom: 12px
    }

    .warm-tip:after,.warm-tip:before {
        display: block;
        content: '';
        width: 6.5px;
        height: 6.5px;
        background: #a1cbff;
        transform: rotate(45deg)
    }

    .warm-tip:before {
        margin-right: 6px
    }

    .warm-tip:after {
        margin-left: 6px
    }
</style>
