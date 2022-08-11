<template>
    <div id="main">
        <div class="report_banner" >
            <div class="name" style="line-height: 1em;">吴彦祖</div>
            <div class="order_no" style="line-height: 1em;">报告编号：<i>1231231231</i></div>
            <div class="userInformation">
                <div class="userMsgItem" >
                    <img src="@/assets/bankPhone.png" alt="" ><span>123123123123213</span>
                </div>
                <div class="userMsgItem">
                    <img src="@/assets/bankUser.png" alt="" ><span>--</span>
                </div>
                <div class="userMsgItem">
                    <img src="@/assets/bankCard.png" alt="" ><span>123123123123213</span>
                </div>
                <div class="userMsgItem">
                    <img src="@/assets/bankLoc.png" alt="" ><span>--</span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" style="margin-top: -0.86rem;">
            <div class="sectiontitle">综合风险评估报告</div>
            <div class="smallItem"><span>综合风险评分</span></div>
            <div class="num_line">
                <div class="num_line_li zh">
                    <div class="num_line_lt clearfix"><span class="fl">综合风险评分</span><span class="fr">92</span></div>
                    <div class="num_line_lc_p"><div class="num_line_lc_c"></div></div>
                </div>
                <div class="num_line_li zh">
                    <div class="num_line_lt clearfix"><span class="fl">手机号风险评分</span><span class="fr">50</span></div>
                    <div class="num_line_lc_p"><div class="num_line_lc_c"></div></div>
                </div>
            </div>
            <div class="analysisWrods" style="margin: 0;">解读：分析</div>
        </div>
        <div class="userInforBasic" >
            <div class="sectiontitle">综合黑名单信息</div>
            <div class="smallItem"><span>信贷黑名单评估-本人</span></div>
            <canvas id="black"  height="100" style="margin: 0.3rem 0"></canvas>
            <div class="analysisWrods" style="margin: 0;">解读：分析</div>
            <p class="blackType" >
                <span>被标记的黑名单分类：</span>
                网贷，欺诈
            </p>
            <div class="black_in">
                <div class="blacklist_title"><span class="circle_icon"></span><span>是否在黑名单</span></div>
                <div class="black_in_li">
                    <span >手机和姓名：<i>是</i></span>
                    <span>更新时间：2018-10-10&nbsp;15:28:20</span>
                </div>
                <div class="black_in_li">
                    <span>手机和姓名：<i>是</i></span>
                    <span>更新时间：2018-10-10&nbsp;15:28:20</span>
                </div>
            </div>
            <div class="black_msg">
                <div class="blacklist_title"><span class="circle_icon"></span><span>黑名单详细信息：</span><span style="color:#39B2FF">上海</span></div>
                <div class="clearfix">
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">累计借入本金(元)</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">累计已还金额(元)</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">累计逾期金额(元)</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">最大逾期天数(范围)</span>
                    </div>
                </div>
            </div>
            <div class="analysisWrods">解读：分析</div>
            <div class="black_msg">
                <div class="smallItem"><span>联系人的黑名单相关信息</span></div>
                <div class="blacklist_title" style="margin: 0.3rem 0"><span class="circle_icon"></span><span>直接联系人</span></div>
                <div class="clearfix">
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">总数</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">在黑名单数量</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">引起黑名单数量</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">引起黑名单占比</span>
                    </div>
                </div>
                <p class="blackType" style="margin: 0.3rem 0">
                    <span >被标记的黑名单分类：</span>
                    欺诈
                </p>
                <div class="blacklist_title" style="margin: 0.3rem 0">
                    <span class="circle_icon"></span><span>直接亲密联系人</span>
                </div>
                <div class="clearfix">
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">总数</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">在黑名单数量</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">引起黑名单数量</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">引起黑名单占比</span>
                    </div>
                </div>
            </div>
            <div>
                <div class="blacklist_title" style="margin: 0.3rem 0">
                    <span class="circle_icon"></span><span>间接联系人在黑名单数量</span>
                </div>
                <div style="color:#d0d0d0;font-size: 0.24rem;margin: 0.2rem 0">
                    间接联系:&nbsp;<span style="color:#39B2FF">0</span>
                </div>
                <div style="color:#d0d0d0;font-size: 0.24rem">
                    间接亲密联系:&nbsp;<span style="color:#39B2FF">0</span>
                </div>
            </div>
            <div class="analysisWrods">解读：分析</div>
        </div>
        <div class="userInforBasic" >
            <div class="sectiontitle">信贷灰名单信息</div>
            <div class="smallItem"><span>信贷灰名单评估-本人</span></div>
            <p class="blackType" >
                <span >被标记的黑名单分类：</span>
                网贷，欺诈
            </p>
            <div class="black_in">
                <div class="blacklist_title"><span class="circle_icon"></span><span>是否在灰名单</span></div>
                <div class="black_in_li">
                    <span >手机和姓名：<i>是</i></span>
                    <span>更新时间：2018-10-10&nbsp;15:28:20</span>
                </div>
                <div class="black_in_li">
                    <span>手机和姓名：<i>是</i></span>
                    <span>更新时间：2018-10-10&nbsp;15:28:20</span>
                </div>
            </div>
            <div class="black_msg">
                <div class="blacklist_title" style="margin: 0.3rem 0">
                    <span class="circle_icon"></span>
                    <span>灰名单详细信息</span>
                </div>
                <div class="clearfix">
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">累计借入本金(元)</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">累计已还金额(元)</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">累计逾期金额(元)</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">最大逾期天数(范围)</span>
                    </div>
                </div>
                <div class="analysisWrods">解读：分析</div>
            </div>

        </div>
        <div class="userInforBasic" >
            <div class="sectiontitle">多头申贷信息分析</div>
            <div>
                <div class="smallItem"><span>注册信息</span></div>
                <p class="blackType" style="margin: 0.3rem 0">
                    <span >注册机构数量：</span>
                    1
                </p>
                <p class="blackType" style="margin: 0.3rem 0">
                    <span >注册机构类型：</span>
                    征信机构、信用支付
                </p>
                <div class="black_msg">
                    <div class="blacklist_title">
                        <span class="circle_icon"></span><span>机构查询统计：</span>
                        <span style="color:#39B2FF">2</span>
                    </div>
                    <div class="trust" style="margin-bottom: 0.3rem;">
                        <div class="trust_title">征信机构</div>
                        <div class="trust_msg">
                            <div class="trust_msg_l"><span>日期：</span><i>2018-03-24</i></div>
                            <div class="trust_msg_l"><span>是否本机构查询：</span><i>否</i></div>
                        </div>
                    </div>
                    <div class="trust">
                        <div class="trust_title">现金贷 </div>
                        <div class="trust_msg">
                            <div class="trust_msg_l"><span>日期：</span><i>2018-03-24</i></div>
                            <div class="trust_msg_l"><span>是否本机构查询：</span><i>否</i></div>
                        </div>
                    </div>
                </div>
                <div class="analysisWrods">解读：分析</div>
            </div>
            <div>
                <div class="black_msg">
                    <div class="smallItem"><span>多平台借贷次数</span></div>
                    <div class="month"  >
                        <span class="m_pre" >《</span>
                        <span class="month_num">近3天</span>
                        <span class="m_next">》</span>
                    </div>
                    <div class="clearfix">
                        <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                            <span class="b_m_li_v">0</span>
                            <span class="b_m_li_n">征信机构</span>
                        </div>
                        <div class="b_m_li fl"  style="">
                            <span class="b_m_li_v">1</span>
                            <span class="b_m_li_n">现金贷</span>
                        </div>
                        <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                            <span class="b_m_li_v">0</span>
                            <span class="b_m_li_n">征信机构</span>
                        </div>
                        <div class="b_m_li fl"  style="">
                            <span class="b_m_li_v">1</span>
                            <span class="b_m_li_n">公积金贷</span>
                        </div>
                    </div>
                </div>
                <div class="analysisWrods">解读：分析</div>
            </div>
        </div>
        <div class="userInforBasic" >
            <div class="sectiontitle">手机存疑</div>
            <div class="smallItem"><span>使用过此手机的其他姓名</span></div>

            <div class="phone_suspect_name">
                <img src="@/assets/reportBD_age.png" alt="" >
                <span class="name">李李</span>
                <span class="last_time">最后使用时间：2018-09-09 11:12:12</span>
            </div>
            <div class="phone_suspect_name">
                <img src="@/assets/reportBD_age.png" alt="" >
                <span class="name">李李</span>
                <span class="last_time">最后使用时间：2018-09-09 11:12:12</span>
            </div>
            <div class="smallItem"><span>使用过此手机的其他身份证</span></div>
            <div class="phone_suspect_card">
                <img src="@/assets/reportBD_card.png" alt="">
                <div class="card_msg">
                    <span class="card">12121212132511</span>
                    <span class="last_time">最后使用时间：2018-09-09 11:12:12</span>
                </div>
            </div>
            <div class="smallItem"><span>提供数据的机构类型</span></div>
            <div class="phone_suspect_card" >
                <img src="@/assets/reportBD_company.png" alt="">
                <div class="card_msg">
                    <span class="card">p2p理财</span>
                    <span class="last_time">最后使用时间：2018-09-09 11:12:12</span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" >
            <div class="sectiontitle">身份证存疑</div>
            <div class="smallItem"><span>使用过此身份证的其他姓名</span></div>

            <div class="phone_suspect_name">
                <img src="@/assets/reportBD_age.png" alt="" >
                <span class="name">李李</span>
                <span class="last_time">最后使用时间：2018-09-09 11:12:12</span>
            </div>
            <div class="phone_suspect_name">
                <img src="@/assets/reportBD_age.png" alt="" >
                <span class="name">李李</span>
                <span class="last_time">最后使用时间：2018-09-09 11:12:12</span>
            </div>
            <div class="smallItem"><span>使用过此身份证的其他手机</span></div>
            <div class="phone_suspect_card" >
                <img src="@/assets/reportBD_phone.png" alt="">
                <div class="card_msg">
                    <span class="card">188****8989 <i style="">浙江.温州</i> <i>中国移动</i></span>
                    <span class="last_time">最后使用时间：2018-09-09 11:12:12</span>
                </div>
            </div>
            <div class="smallItem"><span>提供数据的机构类型</span></div>
            <div class="phone_suspect_card" >
                <img src="@/assets/reportBD_company.png" alt="">
                <div class="card_msg">
                    <span class="card">p2p理财</span>
                    <span class="last_time">最后使用时间：2018-09-09 11:12:12</span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" >
            <div class="sectiontitle">关联账户信息</div>
            <div class="smallItem"><span>公积金账户</span></div>
            <canvas id="gjj" width="" height="150" style="margin: 0.3rem 0"></canvas>
            <div class="black_msg">
                <div class="clearfix">
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">最近数据更新时间</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">最新缴纳时间</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">月缴金额(元)</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">近一年缴纳月数</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">开户时间</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">开户地区</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">账户状态</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">基数</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">0</span>
                        <span class="b_m_li_n">近一年缴纳单位数</span>
                    </div>
                    <div class="b_m_li fl" >
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">近一年连续缴纳月数</span>
                    </div>
                </div>
            </div>
            <div class="smallItem"><span>公积金账户</span></div>
            <div class="base_pie" style="margin-top: 0.3rem">
                <canvas id="base_one" width="100" height="100"></canvas>
                <div class="base_pie_sescription">
                    <div class="base_pie_sm">
                        <span class="colorFk base_onepie_color_1"></span>
                        <span>近一年工资收入(元)</span>
                    </div>
                    <div class="base_pie_sm">
                        <span class="colorFk base_onepie_color_2"></span>
                        <span>近一年贷款收入(元)</span>
                    </div>
                    <div class="base_pie_sm">
                        <span class="colorFk base_other_color"></span>
                        <span>其他收入(元)</span>
                    </div>
                    <div class="base_pie_sm">
                        <span style="color:#a9a9a9">近一年总收入(元)：</span>
                        <span style="color: #39B2FF">1203</span>
                    </div>
                </div>
            </div>
            <div class="base_pie" style="margin-top: 0.3rem">
                <canvas id="base_two" width="100" height="100"></canvas>
                <div class="base_pie_sescription">
                    <div class="base_pie_sm">
                        <span class="colorFk base_onepie_color_1"></span>
                        <span>近一年工资收入(元)</span>
                    </div>
                    <div class="base_pie_sm">
                        <span class="colorFk base_onepie_color_2"></span>
                        <span>近一年贷款收入(元)</span>
                    </div>
                    <div class="base_pie_sm">
                        <span class="colorFk base_other_color"></span>
                        <span>其他收入(元)</span>
                    </div>
                    <div class="base_pie_sm">
                        <span style="color:#a9a9a9">近一年总收入(元)：</span>
                        <span style="color: #39B2FF">1203</span>
                    </div>
                </div>
            </div>
            <div class="black_msg">
                <div class="clearfix">
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">2018.10.12</span>
                        <span class="b_m_li_n">最近数据更新时间</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">借记卡数</span>
                    </div>
                </div>
            </div>
            <div class="smallItem"><span>信用卡账户</span></div>
            <div class="num_line">
                <div class="num_line_li xy">
                    <div class="num_line_lt clearfix"><span class="fl">总信用额(元)</span><span class="fr">6000.00</span></div>
                    <div class="num_line_lc_p"><div class="num_line_lc_c"></div></div>
                </div>
                <div class="num_line_li xy">
                    <div class="num_line_lt clearfix"><span class="fl">总可用信用额(元)</span><span class="fr">3000.00</span></div>
                    <div class="num_line_lc_p"><div class="num_line_lc_c"></div></div>
                </div>
            </div>
            <p class="blackType" style="margin: 0.3rem 0">
                <span >单一银行最高授信额度(元)：</span>
                10000.00
            </p>
            <div class="black_msg">
                <div class="clearfix">
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">2</span>
                        <span class="b_m_li_n">信用卡数</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">2018.10.12</span>
                        <span class="b_m_li_n">最新数据更新时间</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">近一年逾期次数</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">1</span>
                        <span class="b_m_li_n">近一年逾期月数</span>
                    </div>
                </div>
            </div>
            <div class="analysisWrods">解读：分析</div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "comprehensiveRisk",
        data(){
		    return {

            }
        },
        mounted(){
		    this._init()
        },
        methods:{
            _init() {
                var bodyW = document.body.offsetWidth;
                function blackCircle(canvasId,value,label,cH){
                    var blackCanvas = document.getElementById(canvasId);
                    var ctx = blackCanvas.getContext('2d');
                    blackCanvas.style.width = bodyW*630/750 +'px';
                    blackCanvas.style.height =cH*100*bodyW/750 +'px';
                    blackCanvas.width =  bodyW*630/750
                    blackCanvas.height = cH*100*bodyW/750
                    var w = blackCanvas.width;
                    var h = blackCanvas.height;

                    if (window.devicePixelRatio) {//移动端锯齿解决方案
                        blackCanvas.style.width = w + "px";
                        blackCanvas.style.height = h + "px";
                        blackCanvas.height = h * window.devicePixelRatio;
                        blackCanvas.width = w * window.devicePixelRatio;
                        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                    }
                    ctx.beginPath()
                    ctx.fillStyle = '#E9F7FF'
                    ctx.arc(w/2,h/2,h/2,0,2*Math.PI)
                    ctx.fill()
                    ctx.closePath()

                    ctx.beginPath()
                    ctx.lineCap = "round";
                    ctx.lineWidth = h/2*0.1;
                    ctx.strokeStyle = '#39B2FF'
                    ctx.arc(w/2,h/2,h/2*0.95,-0.5*Math.PI,1.2*Math.PI,false)
                    ctx.stroke()
                    ctx.closePath()

                    ctx.beginPath()
                    ctx.fillStyle = '#fff'
                    ctx.arc(w/2,h/2,h/2*0.9,0,2*Math.PI)
                    ctx.fill()
                    ctx.closePath()

                    ctx.beginPath()
                    ctx.fillStyle = '#E9F7FF';
                    ctx.arc(w/2,h/2,h/2*0.7,0,2*Math.PI)
                    ctx.fill()
                    ctx.closePath()


                    ctx.beginPath()
                    var fontSize = 14;
                    ctx.font=fontSize+"px Arial";
                    var value_width = ctx.measureText(value).width;
                    var label_width = ctx.measureText(label).width;

                    ctx.save()
                    ctx.fillStyle = '#39B2FF';
                    ctx.fillText(value,w/2-value_width/2, h/2 - fontSize/2)
                    ctx.restore();

                    ctx.save()
                    ctx.fillStyle='#A9A9A9'
                    ctx.fillText(label,w/2-label_width/2, h/2 + fontSize)
                    ctx.restore()

                    ctx.closePath()
                }
                blackCircle('black',50,'涉黑评分',2);
                blackCircle('gjj',12.659,'账户余额(万)',3)
                function initPie(canvas,options){
                    var canvas = document.getElementById(canvas);
                    var ctx = canvas.getContext('2d');
                    canvas.style.width = bodyW*200/750 +'px';

                    canvas.style.height =2*100*bodyW/750 +'px';
                    canvas.width =  bodyW*200/750
                    canvas.height = 2*100*bodyW/750
                    var w = canvas.width;
                    var h = canvas.height;


                    if (window.devicePixelRatio) {//移动端锯齿解决方案
                        canvas.style.width = w + "px";
                        canvas.style.height = h + "px";
                        canvas.height = h * window.devicePixelRatio;
                        canvas.width = w * window.devicePixelRatio;
                        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                    }
                    function Circle(radius, lineWidth, strokeStyle, fillStyleArray, capType) {
                        this.radius = radius;    // 圆环半径
                        this.lineWidth = lineWidth;  // 圆环边的宽度
                        this.strokeStyle = strokeStyle; //边的颜色
                        this.fillStyle = fillStyleArray;  //填充色
                        /* this.lineCap = capType;*/
                    }
                    Circle.prototype.draw = function (ctx,criclex,cricley) {
                        ctx.beginPath();
                        ctx.arc(w/2, h/2, this.radius, 0, Math.PI * 2, true);  // 坐标为90的圆，这里起始角度是0，结束角度是Math.PI*2
                        ctx.lineWidth = this.lineWidth;
                        ctx.strokeStyle = this.strokeStyle;
                        ctx.stroke();  // 这里用stroke画一个空心圆，想填充颜色的童鞋可以用fill方法
                    };
                    function Ring(radius, lineWidth, strokeStyle, fillStyleArray, capType) {
                        Circle.call(this, radius, lineWidth, strokeStyle, fillStyleArray, capType);
                    }
                    Ring.prototype = Object.create(Circle.prototype);

                    Ring.prototype.drawRing = function (ctx, startAngle, percentArray) {
                        startAngle = startAngle || 3 * Math.PI / 2;
                        percentArray = percentArray || [];
                        let allNum = 0
                        for(let i in percentArray){
                            allNum+=percentArray[i]
                        }
                        this.draw(ctx);  // 调用Circle的draw方法画圈圈
                        var _this = this;
                        // angle
                        percentArray.forEach(function (item, index) {
                            ctx.beginPath();
                            var anglePerSec = 2 * Math.PI / (allNum / item); // 蓝色的弧度

                            ctx.arc(w/2, h/2, _this.radius, startAngle, startAngle + anglePerSec, false); //这里的圆心坐标要和cirle的保持一致

                            startAngle = startAngle + anglePerSec;
                            ctx.strokeStyle = _this.fillStyle[index];
                            ctx.lineCap = _this.lineCap;
                            ctx.stroke();
                            ctx.closePath();
                        })
                        //小圆圈覆盖
                        /*ctx.beginPath();
                        ctx.arc(criclex, cricley, _this.radius, startAngle, startAngle, false); //这里的圆心坐标要和cirle的保持一致
                        ctx.strokeStyle = _this.fillStyle[0];
                        ctx.lineCap = _this.lineCap;
                        ctx.stroke();
                        ctx.closePath();*/
                    }
                    var ring = new Ring(h/2-20, "20", "#ccc", options.color, "round");

                    ring.drawRing(ctx,options.startAngle, options.percentArray);
                };
                initPie('base_one',
                    {
                        startAngle:0,
                        percentArray:[40,80],
                        color:['#39B2FF','#4C7BFE','#c8b0ff']
                    });
                initPie('base_two', {
                    startAngle:0,
                    percentArray:[20,90],
                    color:['#FF5F3B','#FFC130','#c8b0ff']
                });
                function initNumline(selectorName,dataArray) {
                    var linesB  =document.querySelectorAll(selectorName);
                    var numMax = Math.max.apply(null, dataArray);
                    for(var i=0;i<linesB.length;i++){
                        var item = linesB[i].lastElementChild;
                        var percent = 100*dataArray[i]/numMax;
                        item.firstChild.style.width=percent+'%'
                    }
                }
                initNumline('.xy',[6000,3000]);
                function initperline(selectorName,dataArray,bigNum) {
                    var linesB  =document.querySelectorAll(selectorName);
                    for(var i=0;i<linesB.length;i++){
                        var item = linesB[i].lastElementChild;
                        var percent = 100*dataArray[i]/bigNum;
                        item.firstChild.style.width=percent+'%'
                    }
                }
                initperline('.zh',[92,50],100)
            }
        }
	}
</script>

<style scoped lang="less">
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
                img{
                    width:0.3rem;
                    vertical-align: middle;
                }
                span{
                    color:#fff;
                    margin-left: 0.3rem;
                    font-size: 0.24rem;
                    vertical-align: middle;
                }
            }
            .userMsgItem:nth-of-type(1){
                margin-bottom: 0.3rem;
            }
            .userMsgItem:nth-of-type(2){
                margin-bottom: 0.3rem;
            }
        }
    }
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
        font-size: 0.24rem;
        color:#a9a9a9;
        line-height: 0.34rem;
        margin-top: 0.5rem;
    }
    .userInforBasic{
        z-index: 99;
        position: relative;
        padding:  0.3rem;
        margin: 0 0.3rem;
        margin-top: 0.3rem;
        border-radius: 0.2rem;
        background: #fff;
        .blackType{
            font-size: 0.24rem;
            color:#39b2ff;
            margin: 0.3rem auto;
            span{
                font-size: 0.24rem;
                color:#4a4a4a;
                font-weight: bold
            }
        }
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
    }
    .black_in{
        .black_in_li{
            padding-left: 0.3rem;
            span{
                display: block;
                margin-bottom: 0.3rem ;
            }
            span:nth-of-type(1){
                font-size: 0.28rem;
                color:#4a4a4a;
                i{
                    color:#39B2FF
                }
            }
            span:nth-of-type(2){
                font-size: 0.24rem;
                color:#a9a9a9;
            }
        }
    }
    .black_msg{
        .b_m_li{
            width:3.1rem;
            height: 1.12rem;
            background: #f5f5f5;
            span{
                display: block;
                text-align: center;
                line-height: 1em;
            }
            .b_m_li_v{
                color:#39B2FF;
                font-size: 0.3rem;
                margin: 0.20rem 0 0.16rem 0;
            }
            .b_m_li_n{
                font-size: 0.24rem;
                color:#a9a9a9
            }
        }
    }
    .trust{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        height: 0.72rem;
        .trust_title{
            font-size: 0.24rem;
            color:#4a4a4a;
            font-weight: bold;
            width:1.2rem;
            line-height: 0.72rem;
        }
        .trust_msg{
            .trust_msg_l{
                font-size: 0.24rem;
                line-height: 1em;
                span{
                    color:#a9a9a9;
                }
                i{
                    color:#39B2FF
                }
            }
            .trust_msg_l:nth-of-type(1){
                margin-bottom: 0.2rem ;
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
                i{
                    font-size: 0.24rem;
                    color:#a9a9a9;
                }
            }
            .last_time{
                margin-top: 0.3rem;
                font-size: 0.24rem;
                color:#a9a9a9
            }

        }
    }
    .base_pie{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 0.3rem;
        &>canvas{
            margin-right: 0.3rem;
        }
        .base_pie_sescription{
            flex-grow: 1;

            .base_pie_sm{
                height: 0.5rem;
                line-height: 1em;
                .colorFk{
                    display: inline-block;
                    width:0.16rem;
                    height: 0.16rem;
                    margin-right: 0.1rem;
                }
                .base_onepie_color_1{
                    background: #39B2FF;
                }
                .base_onepie_color_2{
                    background: #4C7BFE;
                }
                .base_other_color{
                    background: #c8b0ff;
                }
                .base_twopie_color_1{
                    background: #FF5F3B;
                }
                .base_twopie_color_2{
                    background: #FFC130;
                }

                span:nth-of-type(2){
                    color: #a9a9a9
                }
            }

        }
    }
    .num_line{
        .num_line_li{
            margin-top: 0.3rem;
            .num_line_lt{
                font-size: 0.24rem;
                span:nth-of-type(1){
                    color:#666;
                }
                span:nth-of-type(2){
                    color:#39B2FF;
                }
                margin-bottom: 0.18rem;
            }
            .num_line_lc_p{
                position: relative;
                background: #E9F7FF;
                height: 0.14rem;
                .num_line_lc_c{
                    left: 0;
                    top:0;
                    height: 0.14rem;
                    background: #39B2FF;
                    position: absolute;
                }
            }
        }
    }
</style>
