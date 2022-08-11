<template>
    <div style="background: #fff;overflow:hidden;">
        <div
            class="report_history"
            v-for="(item,index) in historyData"
            :key="index"
            :style="{marginTop:index==0?'0.1rem':''}"
            @click="linkToReport(item)"
        >
            <div class="r_h_top clearfix">
                <span class="fl">{{item.category_name}}</span>
                <span class="fr" v-if="is_ios_auditor!=1">￥{{item.amount}}元</span>
            </div>
            <div class="report_people_msg clearfix"><span  class="fl">姓名：{{item.realname}}</span><span class="fr">手机号：{{item.phone}}</span></div>
            <div class="report_people_idcard" style="display: flex;justify-content: space-between">
                <span style="font-weight: bold;font-size: 0.28rem;">身份证：{{item.id_card}}</span>
                <span style="font-weight: bold;font-size: 0.28rem;" v-if="item.bank_name">银行：{{item.bank_name}}</span>
            </div>
            <div class="report_people_idcard" v-if="item.bank_card">信用卡：{{item.bank_card}}</div>
            <div class="report_msg clearfix">
                <span class="fl">报告编号：{{item.order_no}}</span><span class="fr">{{item.order_time}}</span>
            </div>
        </div>
        <div v-if="noData" class="history_nodata">
            <div class="nodata_bg">
                <svg-icon  :iconClass="'noHistory'" :iconStyle="{width:'2.5rem',height:'2.2rem',color:'#D3DBFE'}"></svg-icon>
            </div>
            <div class="nodata_tips">暂无报告，去查一个~</div>
            <div class="nodata_btn" v-if="$store.state.client=='h5'">
                <a  @click="$router.push({name:'thirdPartyHome'})">去查询</a>
            </div>
        </div>
        <div v-if="!noData">
            <flyloading  :showLoading="showLoading" :noLoadingTips="noLoadingTips"></flyloading>
        </div>
       <!-- <div id="history_capt" @touchmove.prevent></div>-->
    </div>
</template>

<script>

    import { agentOrders} from '@/api/api'
	export default {
		name: "inq_history",
        data(){
		    return {
		        noData:false,
		        historyData:[],
                getUserHistoryVisible:false,
                formData:{
                    phone:'',
                    sms_code:'',
                    img_code:''
                },
                currentPage:1,
                total:0,
                showLoading:false,
                allowInfinite:true,
                noLoadingTips:'',
                is_ios_auditor:0,

            }
        },
        beforeRouteEnter(to,from,next){
            next((vm)=>{
                /*可以下来刷新*/
                console.log('ccccccccccc',vm.$store.state.client)
                if(vm.$store.state.client=='h5'){
                    vm.$store.commit('setRefreshTouch',true)
                }else {
                    vm.$store.commit('setRefreshTouch',false)
                }
            })
        },
        created(){
            this.is_ios_auditor = this.$route.query.is_ios_auditor
            this.getHistoryReportlist().then((data)=>{this.historyData = this.historyData.concat(data)});

        },
        activated(){
		    if(this.noData){
                this.getHistoryReportlist().then((data)=>{this.historyData = this.historyData.concat(data)});
            }
        },
        deactivated(){},
        mounted(){},
        methods:{
            linkToReport(item){
                if(item.jump_url!=''){
                    this.$showToast({
                        type:'fail',
                        message:'该订单已支付但未获取信息',
                        duration:2000
                    })
                    setTimeout(()=>{
                        window.location.href = item.jump_url
                    },2000)

                }else{
                    this.$router.push({name:'report',query:{order_no:item.order_no}})
                }

            },
		    getHistoryReportlist(){

		        var params = {
                    page:this.currentPage
                }
                return new Promise((resolve,reject)=>{
                    agentOrders(params).then((res)=>{
                        if(res.code==1){
                            resolve(res.data.orders)
                            this.total = res.data.pageTotals;
                            if(this.total<=1){
                                this.showLoading = false
                            }else{
                                this.showLoading = true;
                            }
                            if(res.data.orders.length==0){
                                this.noData= true;
                                this.noLoadingTips = '暂无历史订单'
                            }else{
                                this.noData= false
                            }
                        }else{
                            this.noData= true
                        }
                    })

                })
            },

            loadMore(){
                if (!this.allowInfinite) return;
                this.allowInfinite = false;
                this.currentPage++;
                if (this.currentPage > this.total) {
                    this.showLoading = false;
                    this.noLoadingTips = '我也是有底线的'
                    return;
                };
                this.getHistoryReportlist().then((data)=>{this.historyData = this.historyData.concat(data)});;
                this.allowInfinite = true;
            },
            reset(){
               // this.historyData = [];
                this.noData=false
                this.getUserHistoryVisible = false
               this.currentPage = 1;

                this.total=0
                this.showLoading=false
                this.allowInfinite=true
            },
           async refresh(done){
               this.reset();
                await this.getHistoryReportlist().then((data)=>{this.historyData =data;});
                /*this.$showToast({
                    type:'success',
                    message:'刷新成功',
                })*/
                done()
            },
        }
	}
</script>

<style scoped lang="less">
    .report_history{
        background: #fff;
        margin: 0 0.4rem 0.4rem;
        padding: 0.3rem;
        border-radius: 0.2rem;
        box-shadow: 0 0.1rem 0.1rem 0.12rem rgba(0,96,255,0.08);
        .r_h_top{

            span{
                color:#4C546A;
                line-height: 1em;
            }
            span:nth-of-type(1){
                font-size: 0.28rem;
            }
            span:nth-of-type(2){
                font-size: 0.24rem;
            }
        }
        .report_people_msg{
            margin-top: 0.4rem;
            span{
                color:#4C546A;
                font-weight: bold;
                line-height: 1em;
            }
            span:nth-of-type(1){
                font-size: 0.28rem;
            }
            span:nth-of-type(2){
                font-size: 0.24rem;
            }
        }
        .report_people_idcard{
            margin-top: 0.4rem;
            color:#4C546A;
            font-weight: bold;
            font-size: 0.28rem;
            line-height: 1em;
        }
        .report_msg{
            margin-top: 0.4rem;
            span{
                color:#4C546A;
                line-height: 1em;
            }
            span:nth-of-type(1){
                font-size: 0.28rem;
            }
            span:nth-of-type(2){
                font-size: 0.24rem;
            }
        }
    }
    .history_nodata{
        .nodata_bg{
            text-align: center;margin-top: 2.7rem;
        }
        .nodata_tips{
            text-align: center;margin-top: 0.4rem;font-size: 0.28rem;color:#4C546A
        }
        .nodata_btn{
            text-align: center;margin-top: 0.6rem;
            a{
                width: 2rem;height: 0.48rem;text-align: center;display: inline-block;line-height: 0.48rem;background: #596DFF;color:#fff;-webkit-border-radius: 0.1rem;-moz-border-radius:0.1rem ;border-radius: 0.1rem;
            }
        }
    }

</style>
