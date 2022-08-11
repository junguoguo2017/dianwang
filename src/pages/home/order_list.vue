<template>
   <div>
       <section slot="content" >
            <div >
                <!--tab-->
                <div style="padding: 0.3rem 0">
                    <div class="orderlist_tab">
                        <span class="tabitem" :class="{select:select==0}" @click="tabActive(0)">全部</span>
                        <span class="tabitem" :class="{select:select==1}" @click="tabActive(1)">待支付</span>
                        <span class="tabitem" :class="{select:select==2}" @click="tabActive(2)">已完成</span>
                        <span class="tabitem" :class="{select:select==3}" @click="tabActive(3)">已关闭</span>
                        <span class="selectBg mobile_gpu_speed" :style="{left:selectBgLeft}"></span>
                    </div>
                </div>
                <!--orderlist-->


               <!-- <van-swipe-cell :right-width="65"  v-for="(item,index) in orderListdata" :key="index" @click="deleteOrder">-->
                <flySwipeOut>
                    <flySwipeoutItem v-for="(item,index) in orderListdata" :key="index" @delete = "deleteOrder(item)">
                        <div class="orderlist_item" slot="sliderContent">
                            <div class="orderlist_header">
                                <div class="header_left"><img :src="logo" alt=""><span>征信查询</span></div>
                                <div class="header_right">{{item.status==0?'待支付':item.status==1?'已完成':'已关闭'}}</div>
                            </div>
                            <div class="orderlist_con" @click="$goRouter({name:'check_order',query:{order_no:item.order_no}})">
                                <img :src="item.logo" alt="">
                                <div class="order_msg">
                                    <h5 class="order_itemtitle">{{item.category_name}}</h5>
                                    <span>下单时间：<i>{{item.order_time}}</i></span>
                                    <span>总价￥：<i>{{item.amount}}</i></span>
                                </div>
                                <div>
                                    <span class="iconfont icon-arrow-right1"></span>
                                </div>
                            </div>
                            <div class="operatingBtn">
                                <a href="javascript:;" class="cancel" v-if="item.status==0" @click="cancleOrder(item)">取消</a>
                                <a href="javascript:;" class="cancel" v-if="item.status==2">手动关闭</a>
                                <a href="javascript:;" class="submit" @click="linkTo(item)">{{formatOrderBtn(item)}}</a>
                            </div>
                        </div>
                    </flySwipeoutItem>
                </flySwipeOut>


                   <!-- <span slot="right" style="background: red;height: 100%;display:inline-block;width: 1.3rem;color:#fff;font-size: 0.34rem;line-height: 3rem;text-align: center">删除</span>-->
               <!-- </van-swipe-cell>-->
                <div v-if="orderListdata.length==0" class="nodata">
                    <div class="nodataBg">
                        <img src="@/assets/home/nodata.png" alt="" >
                    </div>
                    <div class="nodata_tips" >暂无订单~</div>
                </div>
                <div v-else>
                    <flyloading  :showLoading="showLoading" :noLoadingTips="noLoadingTips"></flyloading>
                </div>

            </div>

       </section>
   </div>
</template>

<script>
    import {getOrderlist,payOrder,closeOrder,delOrder} from '@/api/api'
	export default {
		name: "order_list",
        data(){
		    return{
                selectBgLeft:'0px',
                select:0,
                operatingBtn:'去支付',
                logo:require('@/assets/version-logo.png'),
                order_icon:require('@/assets/img/creditInquiry_icon.png'),
                orderListdata:[],
                orderList0data:[],
                orderList1data:[],
                orderList2data:[],
                orderList3data:[],
                page0:1,
                page0Totals:0,
                allowInfinite_0:true,
                page1:1,
                page1Totals:0,
                allowInfinite_01:true,
                page2:1,
                page2Totals:0,
                allowInfinite_2:true,
                page3:1,
                page3Totals:0,
                allowInfinite_3:true,
                showLoading:true,
                myscroll:null,
                noLoadingTips:'没有更多了'
            }
        },
        activated(){//keepalive进入
        },
        deactivated(){},//keepalive离开
        beforeRouteLeave(to,from,next){
            next()
        },
        async created(){
            /*可以下来刷新*/
           // this.$store.commit('setRefreshTouch',true)
            await this.getOrderlistData(0,this.page0).then((data)=>{
                this.orderListdata = data;
                this.tabActive(0)
            })
            await this.getOrderlistData(1,this.page1);
            await this.getOrderlistData(2,this.page2)
            await this.getOrderlistData(3,this.page3)
        },
         mounted(){

        },
        methods:{

            loadtab(page,pageTotals){
                if(page>pageTotals){
                    this.showLoading = false;
                    return;
                }

                this.getOrderlistData(this.select,page).then((data)=>{
                    this.orderListdata = data;

                })
            },
            deleteOrder(item) {//删除订单
                this.$dialog.confirm({
                    message: '确定删除吗？'
                }).then(() => {
                    var params = {
                        order_no:item.order_no
                    }
                    delOrder(params).then((res)=>{
                        if(res.code==1){
                            this.$toast({
                                type:'success',
                                position:'center',
                                forbidClick: false, // 禁用背景点击
                                message:'订单删除成功',
                                duration:2000
                            });

                            var params = {
                                page:1,
                                status:this.select
                            };
                            getOrderlist(params).then((res)=> {
                                if (res.code == 1) {
                                    this.orderListdata = res.data.orders;
                                    this.$nextTick(()=>{
                                        this.myscroll.refresh()
                                    })
                                }
                            })
                        }
                    })
                });
            },
            loadMore(){
                var self = this;
                switch (self.select) {
                    case 0:
                        if (!this.allowInfinite_0) return;
                        this.allowInfinite_0 = false;
                        this.page0++
                        setTimeout(() => {
                            if (self.page0 > self.page0Totals) {
                                self.showLoading = false;
                                self.noLoadingTips = '我也是有底线的'
                                return;
                            }
                            self.getOrderlistData(0,this.page0).then((data)=>{
                                self.orderListdata = data
                                self.allowInfinite_0 = true;
                            });
                        }, 100);
                        break;
                    case 1:
                        if (!this.allowInfinite_1) return;
                        this.allowInfinite_1 = false;
                        this.page1++
                        setTimeout(() => {
                            if (self.page1 > self.page1Totals) {
                                self.showLoading = false;
                                self.noLoadingTips = '我也是有底线的'
                                return;
                            }
                            self.getOrderlistData(1,this.page1).then((data)=>{
                                self.orderListdata = data
                                self.allowInfinite_1 = true;
                            });
                        }, 100);
                        break;
                    case 2:
                        if (!this.allowInfinite_2) return;
                        this.allowInfinite_2 = false;
                        this.page2++
                        setTimeout(() => {
                            if (self.page2 > self.page2Totals) {
                                self.showLoading = false;
                                self.noLoadingTips = '我也是有底线的'
                                return;
                            }
                            self.getOrderlistData(2,this.page2).then((data)=>{
                                self.orderListdata = data
                                self.allowInfinite_2 = true;
                            });
                        }, 100);
                        break;
                    case 3:
                        if (!this.allowInfinite_3) return;
                        this.allowInfinite_3 = false;
                        this.page3++
                        setTimeout(() => {
                            if (self.page3 > self.page3Totals) {
                                self.showLoading = false;
                                self.noLoadingTips = '我也是有底线的'
                                return;
                            }
                            self.getOrderlistData(3,this.page3).then((data)=>{
                                self.orderListdata = data
                                self.allowInfinite_3 = true;
                            });
                        }, 100);
                        break;
                }
            },
            formatOrderBtn(item){
                switch (item.status) {
                    case 0:
                        return '查看报告'
                    break;
                    case 1:
                        return '查看报告'
                    break
                    case 2:
                        return '重新下单'
                }
            },
            async refresh(done){

                switch (this.select) {
                    case 0:

                        this.orderList0data =[];
                        this.page0=1;
                        this.allowInfinite_0=true;
                        await this.getOrderlistData(0,this.page0).then((data)=>{
                            this.orderListdata = data;
                        })
                        break;
                    case 1:
                        this.orderList1data =[]
                        this.page1=1;
                        this.allowInfinite_1=true;
                        await this.getOrderlistData(1,this.page1).then((data)=>{
                            this.orderListdata = data;
                        });
                        break;
                    case 2:
                        this.orderList2data =[]
                        this.page2=1;
                        this.allowInfinite_2=true;
                        await this.getOrderlistData(2,this.page2).then((data)=>{
                            this.orderListdata = data;
                        })
                        break;
                    case 3:
                        this.orderList3data =[]
                        this.page3=1;
                        this.allowInfinite_3=true;
                        await this.getOrderlistData(3,this.page3).then((data)=>{
                            this.orderListdata = data;
                        })
                        break;
                }
                done()
            },
            cancleOrder(item){//取消
                var params = {
                    order_no:item.order_no
                }
                this.$dialog.confirm({
                    title: '提示',
                    message: '确定取消该订单？'
                }).then(() => {
                    closeOrder(params).then((res)=>{
                        if(res.code==1){
                            this.$toast({
                                type:'success',
                                position:'center',
                                forbidClick: true, // 禁用背景点击
                                message:'取消成功',
                                duration:2000
                            });
                            var params = {
                                page:1,
                                status:this.select
                            };
                            getOrderlist(params).then((res)=> {
                                if (res.code == 1) {
                                    this.orderListdata = res.data.orders;

                                }
                            })
                        }
                    })
                }).catch(() => {
                    // on cancel
                });

            },
            tabActive(tabIndex){//切换
                this.select = tabIndex
                var tabdom = document.getElementsByClassName('tabitem')
                var offsetLeft = tabdom[tabIndex].offsetLeft;
                this.selectBgLeft = offsetLeft+'px';
                this.orderListdata = tabIndex==0?this.orderList0data:tabIndex==1?this.orderList1data:tabIndex==2?this.orderList2data:this.orderList3data;

                switch (this.select) {
                    case 0:
                        this.showLoading = this.page0<this.page0Totals;
                        break;
                    case 1:
                        this.showLoading = this.page1<this.page1Totals;
                        break;
                    case 2:
                        this.showLoading = this.page2<this.page2Totals;
                        break;
                    case 3:
                        this.showLoading = this.page3<this.page3Totals;
                        break;
                }
            },
            linkTo(item){//点击账单按钮
                if(item.status!=2){
                    this.$goRouter({name:'report',query:{order_no:item.order_no}})
                }else{
                    this.$goRouter({name:'thirdPartyHome'})
                }
            },
            getOrderlistData(status,currentPage){//获取账单列表
                var params = {
                    page:currentPage,
                    status:status
                };
                return new Promise((resolve,reject)=>{
                    getOrderlist(params).then((res)=>{
                        if(res.code==1){
                            switch (status) {
                                case 0://全部
                                    this.orderList0data = this.orderList0data.concat(res.data.orders)
                                    this.page0Totals = res.data.pageTotals;
                                    if(this.page0Totals<=1){
                                        this.showLoading = false;
                                    }else{
                                        this.showLoading = true;
                                    }
                                    resolve(this.orderList0data)
                                    break;
                                case 1://待支付
                                    this.orderList1data = this.orderList1data.concat(res.data.orders)
                                    this.page1Totals = res.data.pageTotals;
                                    resolve(this.orderList1data)
                                    break;
                                case 2://已支付
                                    this.orderList2data = this.orderList2data.concat(res.data.orders)
                                    this.page2Totals = res.data.pageTotals;
                                    resolve(this.orderList2data)
                                    break;
                                case 3://失效
                                    this.orderList3data = this.orderList3data.concat(res.data.orders)
                                    this.page3Totals = res.data.pageTotals;
                                    resolve(this.orderList3data)
                                    break;
                            };

                        }else{
                            this.noData= true
                        }
                    })
                })

            }
        }
	}
</script>

<style scoped lang="less">
    .orderlist_tab{
        height: 0.58rem;
        width:6.86rem;
        margin: 0 auto;
        background: #fff;
        line-height: 0.58rem;
        border:1px solid #dcdcdc;
        -webkit-border-radius: 0.29rem;
        -moz-border-radius: 0.29rem;
        border-radius: 0.29rem;
        position: relative;
        span{
            display: inline-block;
            width: 25%;
            text-align: center;
            z-index: 1;
            float: left;
            position: relative;
        }
        span.select{
            color:#fff
        }
        .selectBg{
            display: inline-block;
            height: 0.58rem;
            -webkit-border-radius: 0.29rem;
            -moz-border-radius: 0.29rem;
            border-radius: 0.29rem;
            width: 1.8rem;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 0;
            background: #2FB6FF;
            transition: left .2s linear;
        }
    }
    .orderlist_item{
        padding: 0 0.3rem;
        background: #fff;
        margin-bottom: 0.08rem;
        .orderlist_header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 0.88rem;
            line-height: 0.88rem;

            color:#666666;
            .header_left{
                &>img{
                    width:0.3rem;
                    vertical-align: middle;
                }
                &>span{
                    font-size:0.3rem;
                    vertical-align: middle;
                }
            }
            .header_right{
                font-size:0.3rem;
            }
        }
        .orderlist_con{
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            height: 1.2rem;
            &>img{
                width:0.9rem;
            }
            .order_msg{
                height: 1.2rem;
                margin-left: 0.2rem;
                display: flex;
                flex-grow: 1;
                justify-content: space-between;
                align-items: flex-start;
                flex-direction: column;
                .order_itemtitle{
                    font-size:0.3rem;
                }

            }
        }
        .operatingBtn{
            text-align: right;
            padding:0.2rem 0.6rem 0.3rem 0;

            .cancel{
                color:#666666;
                margin-right: 0.3rem;
            }
            .submit{
                height: 0.4rem;
                line-height: 0.4rem;
                color:#fff;
                font-size:0.3rem;
                text-align: center;
                background: -webkit-linear-gradient(left,#ffc289,#ff603c); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(right, #ffc289,#ff603c); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(right, #ffc289,#ff603c); /* Firefox 3.6 - 15 */
                background: linear-gradient(to right, #ffc289,#ff603c); /* 标准的语法 */
                border-radius: 0.2rem;
                padding: 0 .2rem;
            }
        }
    }
</style>
