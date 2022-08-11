<template>
    <div style="background: #f5f5f5" >
        <div class="report_banner" >
            <div class="name">{{reportData.user_basic_info.name}}</div>
            <div class="order_no">报告编号：<i>{{order_no}}</i></div>
            <div class="userInformation">
               <div class="userMsgItem">
                    <img :src="bankPhone" alt="" style="width:0.3rem;vertical-align: middle;">
                   <span>{{reportData.user_basic_info.mobile}}</span>
                </div>
                <div class="userMsgItem">
                    <img :src="bankUser" alt="" style="width:0.3rem;vertical-align: middle;">
                    <span>{{reportData.user_basic_info.age}}</span>
                </div>
                <div class="userMsgItem" style="margin-top: 0.3rem;">
                    <img :src="bankCard" alt="" style="width:0.3rem;vertical-align: middle;">
                    <span>{{reportData.user_basic_info.certify_no}}</span>
                </div>
                <div class="userMsgItem" style="margin-top: 0.3rem;">
                    <img :src="bankLoc" alt="" style="width:0.3rem;vertical-align: middle;">
                    <span>{{reportData.user_basic_info.address}}</span>
                </div>
            </div>
        </div>
        <div class="userInforBasic">
            <div class="sectiontitle">用户账号摘要</div>
            <div class="smallItem"><span>基本信息</span></div>
            <div
                v-if="reportData.is_pay&&reportData.account_summary"
                class="base_pie"
                style="margin-top: 0.3rem"
            >
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
                        <span style="color: #39B2FF">{{reportData.account_summary.income_amt_1y}}</span>
                    </div>
                </div>
            </div>
            <div class="base_pie"  v-if="reportData.is_pay&&reportData.account_summary">
                <canvas id="base_two" width="100" height="100"></canvas>
                <div class="base_pie_sescription">
                    <div class="base_pie_sm">
                        <span class="colorFk base_twopie_color_1"> </span><span>近一年消费支出(元)</span>
                    </div>
                    <div class="base_pie_sm">
                        <span class="colorFk base_twopie_color_2"></span><span>近一年还贷支出(元)</span>
                    </div>
                    <div class="base_pie_sm">
                        <span class="colorFk base_other_color"></span><span>其他支出(元)</span>
                    </div>
                    <div class="base_pie_sm">
                        <span style="color:#a9a9a9;">近一年总支出(元)：</span><span style="color: #39B2FF">{{reportData.account_summary.expense_1y}}</span>
                    </div>
                </div>
            </div>
            <div class="base_card clearfix"  v-if="reportData.is_pay&&reportData.account_summary">
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.account_summary.active_card_num}}</span><br/>
                    <span class="card_li_text">活跃银行卡数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.account_summary.bank_num}}</span><br/>
                    <span class="card_li_text">活跃银行数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.account_summary.debitcard_num}}</span><br/>
                    <span class="card_li_text">借记卡数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{reportData.account_summary.debitcard_balance}}</span><br/>
                    <span class="card_li_text">借记卡余额</span>
                </div>
            </div>
            <div class="smallItem" ><span>借记卡摘要</span></div>
            <div class="month" v-if="reportData.is_pay">
                <span class="m_pre" @click="pre_month_important">《</span>
                <span class="month_num">
                    近{{user_base_important.user_base_important_text}}
                </span>
                <span class="m_next" @click="next_month_important">》</span>
            </div>
            <div v-if="reportData.is_pay&&user_base_important.data.length>0" class="base_card clearfix">
                <div class="card_li fl">
                    <span class="card_nu">{{user_base_important.data[user_base_important.index].debitcard_shopping_amount}}</span><br/>
                    <span class="card_li_text">消费金额</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_base_important.data[user_base_important.index].debitcard_shopping_num}}</span><br/>
                    <span class="card_li_text">消费笔数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_base_important.data[user_base_important.index].debitcard_cash_withdrawal_amount}}</span><br/>
                    <span class="card_li_text">取现金额</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_base_important.data[user_base_important.index].debitcard_cash_withdrawal_num}}</span><br/>
                    <span class="card_li_text">取现笔数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_base_important.data[user_base_important.index].debitcard_lagest_fixed_deposit_amount}}</span><br/>
                    <span class="card_li_text">定期最大金额</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_base_important.data[user_base_important.index].debitcard_fixed_deposit_num}}</span><br/>
                    <span class="card_li_text">定期记录数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_base_important.data[user_base_important.index].debitcard_other_consumption_amount}}</span><br/>
                    <span class="card_li_text">其他消费金额</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_base_important.data[user_base_important.index].debitcard_other_consumption_num}}</span><br/>
                    <span class="card_li_text">其他消费笔 数</span>
                </div>
            </div>
            <div class="analysisWrods">
                {{reportData.text.account_summary}}
                <div  v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
            </div>
        </div>
        <div class="bankRunwater">
            <div class="sectiontitle" style=" padding: 0.3rem;">银行流水分析</div>
            <div class="smallItem" style="margin-left: 0.3rem;"><span>借记卡流水</span></div>
            <canvas v-if="reportData.is_pay" id="bankjiej" width="345" height="260 "></canvas>
            <div v-if="reportData.is_pay" class="month" >
                <span class="m_pre" @click="pre_month">《</span><span class="month_num">
                近{{user_bank_runwater.user_bank_runwater_text}}</span>
                <span class="m_next" @click="next_month">》</span>
            </div>
            <div  v-if="reportData.is_pay&&user_bank_runwater.data.length>0" class="base_card clearfix" style="padding: 0 0.3rem;">
                <div class="card_li fl">
                    <span class="card_nu">{{user_bank_runwater.data[user_bank_runwater.index].salary_income_month_num}}</span><br/>
                    <span class="card_li_text">有工资收入的月数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_bank_runwater.data[user_bank_runwater.index].loan_in_month_num}}</span><br/>
                    <span class="card_li_text">有贷款收入的月数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_bank_runwater.data[user_bank_runwater.index].repany_loan_mon_num}}</span><br/>
                    <span class="card_li_text">有贷款还款月数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_bank_runwater.data[user_bank_runwater.index].debitcard_max_balance}}</span><br/>
                    <span class="card_li_text">最大余额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_bank_runwater.data[user_bank_runwater.index].debitcard_recently_balance}}</span><br/>
                    <span class="card_li_text">最近余额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_bank_runwater.data[user_bank_runwater.index].debitcard_withdraw_amount}}</span><br/>
                    <span class="card_li_text">取现金额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_bank_runwater.data[user_bank_runwater.index].debitcard_withdraw_count}}</span><br/>
                    <span class="card_li_text">取现笔数</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_bank_runwater.data[user_bank_runwater.index].other_fee}}</span><br/>
                    <span class="card_li_text">其他费用金额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_bank_runwater.data[user_bank_runwater.index].regular_savings_recent}}</span><br/>
                    <span class="card_li_text">定期最近一次金额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_bank_runwater.data[user_bank_runwater.index].regular_savings_max}}</span><br/>
                    <span class="card_li_text">定期最大金额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_bank_runwater.data[user_bank_runwater.index].undue_fixed_deposit_amount}}</span><br/>
                    <span class="card_li_text">未到期定期存款金额(元)</span>
                </div>
                <div class="card_li fl">
                    <span class="card_nu">{{user_bank_runwater.data[user_bank_runwater.index].fixed_deposit_amount}}</span><br/>
                    <span class="card_li_text">定期存款金额(元)</span>
                </div>
            </div>

            <div class="analysisWrods" style="padding: 0 0.3rem;">
                {{reportData.text.debitcard_summary}}
                <div  v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
            </div>
            <div class="smallItem" style="margin-left: 0.3rem;"><span>借记卡未到期定期详情</span></div>
            <div  v-if="reportData.is_pay&&reportData.debitcard_undue_regular_basis_list" class="at_list" style="margin: 0 0.3rem" v-for="(item,index) in reportData.debitcard_undue_regular_basis_list">
                <div class="at_list_t"><span></span><span>{{item.cardId}}</span></div>
                <div class="at_list_con" >
                    <div class="at_list_li">
                        <span>{{item.balance}}</span><br/>
                        <span>金额</span>
                    </div>
                    <div class="at_list_li">
                        <span>{{item.duedate}}</span><br/>
                        <span>到期日期</span>
                    </div>
                    <div class="at_list_li">
                        <span>{{item.period}}</span><br/>
                        <span>期数</span>
                    </div>
                </div>
            </div>
            <div class="analysisWrods" style="padding: 0 0.3rem;">
                {{reportData.text.debitcard_undue_regular_basis_list}}
                <div  v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
            </div>
            <div class="smallItem" style="margin-left: 0.3rem;"><span>工作单位详情</span></div>
            <div v-if="reportData.is_pay&&reportData.work_details_list" class="at_list" style="margin: 0.3rem 0.3rem 0" v-for="(item, index) in reportData.work_details_list">
                <div class="at_list_t"><span></span><span>{{item.company_name}}</span></div>
                <div class="at_list_con" >
                    <div class="at_list_li">
                        <span>{{item.first_salary_time}}</span><br/>
                        <span>首次工资</span>
                    </div>
                    <div class="at_list_li">
                        <span>{{item.last_salary_time}}</span><br/>
                        <span>最近工资</span>
                    </div>
                    <div class="at_list_li">
                        <span>{{item.continuous_salary_mon_num}}</span><br/>
                        <span>连续月数</span>
                    </div>
                </div>
            </div>
            <div class="analysisWrods" style="padding: 0 0.3rem;">
                {{reportData.text.work_details_list}}
                <div  v-if="!reportData.is_pay" class="pay_showRP" @click="link_topay"><span>付款查看</span></div>
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
        data(){
            return {

                orderData:{},
                bankCard:require('@/assets/bankCard.png'),
                bankLoc:require('@/assets/bankLoc.png'),
                bankPhone:require('@/assets/bankPhone.png'),
                bankUser:require('@/assets/bankUser.png'),
                user_base_important:{
                    index:0,
                    user_base_important_text:'1月',
                    data:[]
                },
                user_bank_runwater:{
                    index:0,
                    user_bank_runwater_text:'3月',
                    data:[]
                }
            }
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
        mounted(){
            this.initData();
        },
        methods:{
            link_topay(){
                this.$emit('link_topay')
            },
            pre_month_important(){//摘要
                this.user_base_important.index--;

                if(this.user_base_important.index<0){
                    this.user_base_important.index = this.user_base_important.data.length-1;
                }
                if(this.user_base_important.index==0){
                    this.user_base_important.user_base_important_text ='1月'
                }else{
                    this.user_base_important.user_base_important_text ='12月'
                }
            },
            next_month_important(){
                this.user_base_important.index++;

                if( this.user_base_important.index>this.user_base_important.data.length-1){
                    this.user_base_important.index = 0;
                }
                if(this.user_base_important.index==0){
                    this.user_base_important.user_base_important_text ='1月'
                }else{
                    this.user_base_important.user_base_important_text ='12月'
                }
            },
            runwater_monthFomate(index){
                switch (index) {
                    case 0 :
                        this.user_bank_runwater.user_bank_runwater_text='3月';
                        break;
                    case 1 :
                        this.user_bank_runwater.user_bank_runwater_text='6月';
                        break;
                    case 2 :
                        this.user_bank_runwater.user_bank_runwater_text='12月';
                        break;
                    default:
                        this.user_bank_runwater.user_bank_runwater_text='3月';
                }
            },
            pre_month(){//摘要
                this.user_bank_runwater.index--;
                this.runwater_monthFomate(this.user_bank_runwater.index)
                if(this.user_bank_runwater.index<0){
                    this.user_bank_runwater.index = this.user_bank_runwater.data.length-1
                }
            },
            next_month(){
                this.user_bank_runwater.index++;
                this.runwater_monthFomate(this.user_bank_runwater.index)
                if( this.user_bank_runwater.index>this.user_bank_runwater.data.length-1){
                    this.user_bank_runwater.index = 0
                }
            },
            initData(){
                console.log(this.reportData.is_pay)
                if(!this.reportData.is_pay)return;
                /*用户收入，支出数据*/
                let userBasedata = this.reportData.account_summary
                let income = [userBasedata.salary_income_1y,userBasedata.loan_in_1y,userBasedata.other_income_1y];

                let out_money = [userBasedata.consumption_expense_1y,userBasedata.loan_out_1y,userBasedata.other_expense_1y];
                this.$nextTick(()=>{
                    this.initPie('base_one',
                        {
                            startAngle:0,
                            percentArray:income,
                            criclex:50,
                            cricley:50,
                            color:['#39B2FF','#4C7BFE','#c8b0ff']
                        });
                    this.initPie('base_two', {
                        startAngle:0,
                        percentArray:out_money,
                        criclex:50,
                        cricley:50,
                        color:['#FF5F3B','#FFC130','#c8b0ff']
                    });
                    this.initLine('bankjiej')
                })
                this.user_base_important.data = this.reportData.debitcard_summary;//用户摘要
                this.user_bank_runwater.data = this.reportData.debitcard_detailses
            },

            initPie(canvas,options){
                var canvas = document.getElementById(canvas);

                function Circle(radius, lineWidth, strokeStyle, fillStyleArray, capType) {
                    this.radius = radius;    // 圆环半径
                    this.lineWidth = lineWidth;  // 圆环边的宽度
                    this.strokeStyle = strokeStyle; //边的颜色
                    this.fillStyle = fillStyleArray;  //填充色
                   /* this.lineCap = capType;*/
                }
                Circle.prototype.draw = function (ctx,criclex,cricley) {
                    ctx.beginPath();
                    ctx.arc(criclex, cricley, this.radius, 0, Math.PI * 2, true);  // 坐标为90的圆，这里起始角度是0，结束角度是Math.PI*2
                    ctx.lineWidth = this.lineWidth;
                    ctx.strokeStyle = this.strokeStyle;
                    ctx.stroke();  // 这里用stroke画一个空心圆，想填充颜色的童鞋可以用fill方法
                };
                function Ring(radius, lineWidth, strokeStyle, fillStyleArray, capType) {
                    Circle.call(this, radius, lineWidth, strokeStyle, fillStyleArray, capType);
                }
                Ring.prototype = Object.create(Circle.prototype);

                Ring.prototype.drawRing = function (ctx, startAngle, percentArray ,criclex,cricley) {
                    startAngle = startAngle || 3 * Math.PI / 2;
                    percentArray = percentArray || [];
                    let allNum = 0
                    for(let i in percentArray){
                        allNum+=percentArray[i]
                    }
                    this.draw(ctx,criclex,cricley);  // 调用Circle的draw方法画圈圈
                    var _this = this;
                    // angle
                    percentArray.forEach(function (item, index) {
                        ctx.beginPath();
                        var anglePerSec = 2 * Math.PI / (allNum / item); // 蓝色的弧度

                        ctx.arc(criclex, cricley, _this.radius, startAngle, startAngle + anglePerSec, false); //这里的圆心坐标要和cirle的保持一致

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

                var ctx = canvas.getContext('2d');
                var ring = new Ring("40", "20", "#ccc", options.color, "round");

                ring.drawRing(ctx,options.startAngle, options.percentArray,options.criclex,options.cricley);
            },
            initLine(canvasId){
                var canvas = document.getElementById(canvasId)
                canvas.addEventListener('click',Pillar,false);//绑定点击柱状图事件

                var ctx = canvas.getContext('2d');

                var xData = [];
                var data = []
                var DataColor = ['#39B2FF','#7DD1FF','#FF5F3B','#FFC58B']

                var maxData= []
               /* var data = this.reportData.bank_flow_analysis*/

                for(let i in this.reportData.bank_flow_analysis){
                    var item = this.reportData.bank_flow_analysis[i]
                    xData.push(item.tag);
                    var leftMax = item.debitcard_consume_amount+item.loan_in_amount;
                    var rightMax = item.repany_loan_amount+item.salary_income_amount;
                    maxData.push(leftMax)
                    maxData.push(rightMax)
                    data.push({
                        data1:item.salary_income_amount,
                        data2:item.loan_in_amount,
                        data3:item.repany_loan_amount,
                        data4:item.debitcard_consume_amount,
                        tag:item.tag
                    })
                }

                var width = canvas.width,
                    height=canvas.height;
                if (window.devicePixelRatio) {//移动端锯齿解决方案
                    canvas.style.width = width + "px";
                    canvas.style.height = height + "px";
                    canvas.height = height * window.devicePixelRatio;
                    canvas.width = width * window.devicePixelRatio;
                    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                }
                var xStart = 50,//x轴开始
                    xEnd =width-50, //x轴结束
                    yStart=100,
                    yEnd = height-40;
                var pinjunX = (xEnd-xStart)/xData.length;//x轴平均每段占有的长度
                var yDataMax = Math.max.apply(null,maxData);//获取y轴数据最大值
                //var yDataMax2 = Math.max.apply(null,yData3)+ Math.max.apply(null,yData4);//获取y轴数据最大值

                function topTips(options) {
                    let itemNum = options.namedata||[];
                    for(let i in itemNum){
                        ctx.beginPath();
                        ctx.fillStyle = options.tipColor[i]
                        ctx.arc(options.x,options.y+i*20,options.rdaius,0,2*Math.PI);
                        ctx.fill()
                        ctx.fillStyle = '#a9a9a9';
                        ctx.font="14px Arial";
                        var tipsItemobj = ctx.measureText(itemNum[i])
                        ctx.fillText(itemNum[i]+':  '+options.value[i],options.x+8,options.y+4+i*20)
                        ctx.closePath()
                    }
                };

                function horizontal(){//y轴

                    /*绘制y 坐标*/
                    for(var i=0;i<6; i++ ){//y轴最多六个
                        var colT = ctx.measureText(i*Math.ceil(yDataMax/5))
                        ctx.beginPath()
                        ctx.fillStyle = '#4a4a4a';
                        ctx.font="10px Arial";
                        ctx.fillText(i*Math.ceil(yDataMax/5),xStart-10-colT.width, yEnd-(yEnd-yStart)/5*i+4);//4表示文字高度
                        ctx.closePath()
                    }
                    ctx.strokeStyle = '#39B2FF'
                    ctx.lineWidth = '2'
                    ctx.beginPath()
                    ctx.moveTo(xStart,yEnd);
                    ctx.lineTo(xEnd,yEnd+2);
                    ctx.closePath()
                    ctx.stroke()
                }
                function vertical(){//x轴
                    /*绘制x 坐标*/
                    for(var i=0;i<data.length; i++ ){
                        var rowT = ctx.measureText(xData[i]);//获取文字的属性（width等）

                        ctx.beginPath()
                        ctx.fillStyle = '#4a4a4a';
                        ctx.font="10px Arial";
                        ctx.fillText(data[i].tag,xStart+pinjunX*(i+1)-(pinjunX+rowT.width)/2,yEnd+20 )
                        ctx.closePath()
                    }
                    ctx.strokeStyle = '#39B2FF'
                    ctx.lineWidth = '2'
                    ctx.beginPath()
                    ctx.moveTo(xStart,yStart);
                    ctx.lineTo(xStart,yEnd);
                    ctx.closePath()
                    ctx.stroke()
                };
                var yHeight = (yEnd-yStart)/yDataMax;//数据平均高度占比
                var pillar_1 = [];
                var pillar_2 = [];

                function RenderingPill() {
                    //top 详细item数据
                    topTips({
                        tipColor:['#39B2FF','#7DD1FF','#FFC58B','#FF5F3B'],
                        rdaius:5,
                        x:70,
                        y:20,
                        namedata:['工资收入(元)','贷款收入(元)','还贷支出(元)','消费支出(元)'],
                        value:[data[0].data1,data[0].data2,data[0].data3,data[0].data4,]
                    })
                    for(var i=0;i< data.length;i++ ){//循环数据渲染
                        var pillar_1_item = {
                            seletcted:false,
                            itemData:data[i],
                            x:(xStart+pinjunX*i)+pinjunX/2,
                            y1:yEnd-yHeight*(data[i].data1+data[i].data2),
                            y1_height:yHeight*(data[i].data1+data[i].data2),
                            y2:yEnd-yHeight*data[i].data2,
                            y2_height:yHeight*data[i].data2
                        }
                        pillar_1[i] = pillar_1_item
                        var pillar_2_item = {
                            seletcted:false,
                            itemData:data[i],
                            x:(xStart+pinjunX*i)+pinjunX/2,
                            y1:yEnd-yHeight*(data[i].data3+data[i].data4),
                            y1_height:yHeight*(data[i].data3+data[i].data4),
                            y2:yEnd-yHeight*data[i].data4,
                            y2_height:yHeight*data[i].data4
                        };
                        pillar_2[i] = pillar_2_item;
                        let index = i;
                        //绘制第一,二个柱状图
                        drawPillar(pillar_1[i].x-10,pillar_1[i].y1,10,pillar_1[i].y1_height,'#7DD1FF ',pillar_1[i],index)
                        drawPillar(pillar_1[i].x-10,pillar_1[i].y2,10,pillar_1[i].y2_height,'#39B2FF',pillar_1[i],index);
                        //绘制第三，四个柱状图
                        drawPillar(pillar_2[i].x,pillar_2[i].y1,10,pillar_2[i].y1_height,'#FFC58B',pillar_2[i],index);
                        drawPillar(pillar_2[i].x,pillar_2[i].y2,10,pillar_2[i].y2_height,'#FF5F3B',pillar_2[i],index);
                    };
                };


                var seletcted = false
                function drawPillar(x,y,width,height,color,itemObj,index){//绘制柱状图
                    ctx.beginPath()
                    ctx.fillStyle = color;
                    ctx.rect(x,y,width,height);
                    ctx.fill();
                    if(pillar_1[index].seletcted)return;//执行一次重绘
                    if(pillar_1[index].x<clickPointX&&clickPointX<pillar_1[index].x+20&&20<clickPointY&&clickPointY<yEnd){//判断点击区域
                        ctx.clearRect(0,0,canvas.width,90);//清空toptips画布
                        pillar_1[index].seletcted =  true;
                        pillar_2[index].seletcted =true;

                        for(var i=0;i< data.length;i++ ){
                            if(index!=i){
                                pillar_1[i].seletcted = pillar_2[i].seletcted = false;
                            }
                        };

                        ctx.fillStyle = 'rgba(0,0,0,0.05)';
                        ctx.rect(itemObj.x-10,yStart,20,yEnd-yStart)
                        ctx.fill();
                        let valueItem = pillar_1[index].itemData;

                        //top 详细item数据
                        topTips({
                            tipColor:['#39B2FF','#7DD1FF','#FFC58B','#FF5F3B'],
                            rdaius:5,
                            x:70,
                            y:20,
                            namedata:['工资收入(元)','贷款收入(元)','还贷支出(元)','消费支出(元)'],
                            value:[valueItem.data1,valueItem.data2,valueItem.data3,valueItem.data4,]
                        })
                    }
                    /* if(ctx.isPointInPath(clickPointX,clickPointY)){
                     }else{
                     }*/
                    ctx.closePath()
                };
                var clickPointX=0,clickPointY=0
                function Pillar(event){
                    //鼠标点击canvas，获取的鼠标点击的位置(x,y)
                    clickPointX=event.clientX-canvas.getBoundingClientRect().left;
                    clickPointY=event.clientY-canvas.getBoundingClientRect().top;
                    canvasClick()
                };
                function canvasClick(){
                    ctx.clearRect(0,yStart,canvas.width,canvas.height);//清空柱状画布
                    horizontal();
                    vertical();

                    for(var i=0;i< xData.length;i++ ){//循环数据渲染

                        let index = i;
                        //绘制第一个柱状图
                        drawPillar(pillar_1[i].x-10,pillar_1[i].y1,10,pillar_1[i].y1_height,'#7DD1FF ',pillar_1[i],index)
                        drawPillar(pillar_1[i].x-10,pillar_1[i].y2,10,pillar_1[i].y2_height,'#39B2FF',pillar_1[i],index);
                        //绘制第二个柱状图
                        drawPillar(pillar_2[i].x,pillar_2[i].y1,10,pillar_2[i].y1_height,'#FFC58B',pillar_2[i],index);
                        drawPillar(pillar_2[i].x,pillar_2[i].y2,10,pillar_2[i].y2_height,'#FF5F3B',pillar_2[i],index);
                    };

                };
                horizontal();
                vertical();
                RenderingPill()
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
    .report_banner{
        overflow: hidden;
        height: 4.24rem;
        position: relative;
        background: url('../../../../../assets/bankBanner.png') left top no-repeat;
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

    }
    .bankRunwater{


        margin: 0 0.3rem;
        margin-top: 0.3rem;
        border-radius: 0.2rem;
        background: #fff;
    }
</style>
