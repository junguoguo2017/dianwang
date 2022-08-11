<template>
    <div class="orderAdd" style="">

        <div class="price_num">￥{{currentPrice}}</div>
        <div class="category_name" style="">{{orderPayData.category_name}}</div>
        <div class="shareCon"  v-if="false">
            <img class="shareicon" src="@/assets/shareTypeIcon.png" alt="" >
            <div class="shareText">
                <div class="title">分享优惠</div>
                <div class="price">分享后减{{orderPayData.discounts}}元</div>
            </div>

            <div v-if="!shareSuccess" class="shareBtn"   @click="shareGuide=true">去分享</div>
            <div v-else-if="hadApply" class="shareReduce">已完成支付</div>
            <div v-else class="shareReduce" >-{{orderPayData.discounts}}</div>
        </div>
        <div style="margin: 3rem 0.32rem 0;" class="applyBtn" @click="paybtn">确认</div>
        <div v-if="shareGuide" class="shareGuide" style="">
            <div class="topImg" style="">
                <img src="@/assets/sharetipsImg.png" alt="" style="">
            </div>
            <div class="konwImg" style="" @click="shareGuide=false">
                <img src="@/assets/shareKnow.png" alt="" style="width: 2.35rem;">
            </div>
        </div>

        <!--支付类型-->
        <bottomPopup v-model="applyShow">
            <div class="bottomApply" style="">
                <div class="bottom_title" style="">
                    请选择支付方式
                </div>

                <div  class="apply_item" @click="applySelect(1)" >
                    <svg-icon
                        :iconClass="'aliApply'"
                        :iconStyle="{fontSize:'0.3rem',color:'#ffffff'}"></svg-icon>
                    <span >支付宝</span>
                    <svg-icon
                        :iconClass="current_Apply_type==1?'inquiryAgree':'inquiryNoAgree'"
                        :iconStyle="{fontSize:'0.3rem',color:'#ffffff'}"></svg-icon>
                </div>
                <div  class="apply_item" @click="applySelect(2)">
                    <svg-icon
                        :iconClass="'wxApply'"
                        :iconStyle="{fontSize:'0.3rem',color:'#ffffff',}"></svg-icon>
                    <span>微信 <i v-if="isPc">（仅支持手机端用户）</i></span>
                    <svg-icon
                        :iconClass="current_Apply_type==2?'inquiryAgree':'inquiryNoAgree'"
                        :iconStyle="{fontSize:'0.3rem',color:'#ffffff',}"></svg-icon>
                </div>
                <div class="applyBtn" style="margin-top: 1.1rem;" @click="getPayOrder">确定</div>
            </div>
        </bottomPopup>
        <!--支付-->
        <div v-html="pay_con"></div>
    </div>
</template>

<script>
    import {setCookie,getCookie,delCookie,getQuery} from  '@/js/util'
    import {domainUrl} from '@/js/http'
    import sdk from '@/js/wxSdk'
    import { baseName } from "@/js/config";
    import {agentAddOrder,payOrder,agentgetOneCategory, wecahtshareSuccess,getOrderXq,closeOrder} from '@/api/api'
    function isWchatBrowser() {
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if (isWeixin) {
            return true;
        }else{
            return false;
        }
    };
    var isPC = function (){
        var userAgentInfo = navigator.userAgent.toLowerCase();
        var Agents = new Array("android", "iphone", "symbianOS", "windows phone", "ipad", "ipod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    }
	export default {
		name: "third_apply",
        data(){
		    return {
                orderPayData:{},
                formData:{},
                category_name:"",
                applyShow:false,
                order_no:'',
                currentPrice:'',
                shareSuccess:false,
                current_Apply_type:1,
                pay_con:'',
                shareGuide:false,
                isWechatBrowser:false,
                hadApply:false,
                jump_url:'',
                isSendApply:false,
                isPc:isPC()
            }
        },
        beforeRouteEnter(to,from,next){
		    next((vm)=>{
                vm.isSendApply = false;//订单状态初始化
                vm.formData = getQuery();
                vm.orderPayData = {};
                /*获取页面信息*/
                agentgetOneCategory({category_id:vm.$route.query.category_id}).then((res)=>{
                    if(res.code==1){
                        vm.orderPayData = res.data;
                        vm.category_name =  vm.orderPayData.category_name;
                        vm.currentPrice = vm.orderPayData.price;

                       /* 判断订单状态 是否支付*/
                        vm.getOrderStatus()
                        /*判断是否是在微信内部*/
                        if (typeof WeixinJSBridge == "undefined"){
                            if( document.addEventListener ){
                                document.addEventListener('WeixinJSBridgeReady',  function () {
                                    vm.initUserWechat()
                                }, false);
                            }else if (document.attachEvent){
                                document.attachEvent('WeixinJSBridgeReady',  function () {
                                    vm.initUserWechat()
                                });
                                document.attachEvent('onWeixinJSBridgeReady',  function () {
                                    vm.initUserWechat()
                                });
                            }
                        }else{
                            vm.initUserWechat()
                        }
                    }
                })
            })
        },
        created(){

        },
        mounted(){

        },
        methods:{
		    getOrderStatus(){
		        var self = this;
		        var params = {
                    order_no:this.formData.order_no
                }
                getOrderXq(params).then((res)=>{
                    if(res.code==1){
                        if(res.data.status==1){
                            this.hadApply = true;//支付完成
                            if(this.$store.state.client!='h5'){
                                this.$router.replace({name:'report',query:{order_no:this.formData.order_no}})
                            }
                            this.shareSuccess = true;//之前分享过
                        }
                        this.jump_url = res.data.jump_url
                    }else{
                        this.$showToast({
                            message:'订单失效',
                            type:'fail',
                        });
                        setTimeout(()=>{
                            self.$router.replace({name:'thirdPartyHome'})
                        },1000)
                    }
                })
            },
            initUserWechat(){
                this.isWechatBrowser = true;
                //微信内部
              //  this.current_Apply_type = 4;
                this.shareInit()
            },
            shareInit(){//微信分享sdk初始化
                var self = this;
                var link =''
                var agent = getQuery()['agent']?getQuery()['agent']:localStorage.agent?localStorage.agent:'';
                if(agent!=''){
                    link = domainUrl+baseName+'/thirdPartyHome?agent='+localStorage.agent
                }else{
                    link = domainUrl+ baseName+'/thirdPartyHome'
                }

                sdk.getJSSDK(link,function () {
                    /*成功回调*/
                    var params = {
                        order_no:self.formData.order_no,
                    }
                    wecahtshareSuccess(params).then((res)=>{
                        if(res.code==1){
                            //self.currentPrice = (self.orderPayData.price - self.orderPayData.discounts).toFixed(2);
                            self.shareSuccess = true;
                            self.shareGuide = false;
                        }
                        self.$showToast({
                            type:res.code==1?'text':'fail',
                            message:res.msg
                        })
                    })
                })
            },
            wChat_in_Apply(opts){
                /*微信支付*/
                var self =  this;
                function onBridgeReady(){
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId":opts.appId,     //公众号名称，由商户传入
                            "timeStamp":opts.timeStamp,         //时间戳，自1970年以来的秒数
                            "nonceStr":opts.nonceStr, //随机串
                            "package":opts.package,
                            "signType":opts.signType,         //微信签名方式：
                            "paySign":opts.paySign //微信签名
                        },
                        function(res){
                            if(res.err_msg == "get_brand_wcpay_request:ok" ){
                                if(self.jump_url!=''){
                                    window.location.href = self.jump_url;
                                }else{
                                    self.$router.push({name:'report',query:{order_no:self.formData.order_no}})
                                }
                                // 使用以上方式判断前端返回,微信团队郑重提示：
                                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            }else{
                                //分享成功更新订单号 微信限制
                                self.$showToast({
                                    type:'fail',
                                    message:'支付失败'
                                })
                                var params  ={
                                    order_no:self.formData.order_no
                                }
                                closeOrder(params).then((res)=>{
                                    if(res.code==1){
                                        setTimeout(()=>{
                                            self.$router.go(-1)
                                        },2000)
                                    }
                                    self.$showToast({
                                        message:res.msg
                                    })
                                })

                            }
                        });
                }
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                }else{
                    onBridgeReady();
                }
            },
            applySelect(type){
                this.current_Apply_type = type
            },
            paybtn(){
		        if(this.hadApply){//已经支付
                    if(this.jump_url!=''){
                        /*采集报告*/
                        window.location.href = this.jump_url;
                    }else{
                        this.$router.push({name:'report',query:{order_no:this.formData.order_no}})
                    }
                    return;
                }
                if(this.isWechatBrowser){
                    this.getPayOrder()
                }else{
                    this.applyShow = true
                }
            },
            getPayOrder(){
		        if(this.isSendApply){
                    this.$showToast({
                        type:'fail',
                        message:'订单已失效'
                    })
                    return;
                }
                this.$showToast({
                    type:'loading',
                    message:'正在处理中'
                })
		        var self = this;
                this.isSendApply=true
                var params = {
                    order_no:this.formData.order_no,
                    uid:this.$store.state.uid,
                    type:this.current_Apply_type
                };
                payOrder(params).then((res)=>{
                    if(res.code==1){
                        if(this.isWechatBrowser){//判断是否是微信浏览器，直接调用微信内支付
                            //微信内部
                            this.$toast.clear();
                            this.wChat_in_Apply(res.data)
                        }else {
                            this.pay_con = res.data;
                            if(this.current_Apply_type==1){
                                this.$nextTick(()=>{//支付宝
                                    this.$toast.clear();
                                    window.location.href = res.data.pay_url
                                  //  document.forms['alipaysubmit'].submit();
                                })
                            }else if(this.current_Apply_type==2){
                                this.$nextTick(()=>{//微信
                                    this.$toast.clear();
                                    window.location.href = res.data.pay_url
                                   // document.forms['wepaysubmit'].submit();
                                })
                            }
                        }
                    }else if(res.code==-1){
                        this.$showToast({
                            message:'登录失效',
                            type:'fail',
                        });
                        localStorage.removeItem('token')
                        self.$store.commit('getToken')
                        setTimeout(()=>{
                            self.$router.go(-1)
                        },1000)
                    }else if(res.code==-2){
                        this.$showToast({
                            message:'微信授权失效',
                            type:'fail',
                        });
                       localStorage.removeItem('uid')
                        self.$store.commit('getUid')
                        setTimeout(()=>{
                            self.$router.go(-1)
                        },1000)
                    }else{
                        this.$showToast({
                            message:res.msg,
                            type:'fail',
                        })
                    }
                })
            }
        }
	}
</script>

<style scoped lang="less">
    .orderAdd{
        background: #fff;overflow: hidden;
        .price_num{
            text-align: center;
            margin-top: 1rem;
            font-size: 0.72rem;
            color:#4C546A;
        }
        .category_name{
            font-size: 0.3rem;color:#4C546A;text-align: center;margin-top: 0.4rem
        }
        .shareCon{
            margin: 1rem 0.32rem 0 ;box-sizing: border-box; display: flex;justify-content: flex-start;align-items: center;height: 1.5rem;border-bottom: 1px solid #d0d0d0;border-top: 1px solid #d0d0d0;
            .shareicon{
                width: 1.14rem;
            }
            .shareText{
                flex-grow: 1;margin-left: 0.3rem;height: 1.5rem;
                .title{
                    font-size: 0.3rem;color:#4C546A;font-weight: 600;margin-top: 0.42rem;line-height: 1em
                }
                .price{
                    font-size: 0.24rem;color:#4C546A;margin-top: 0.18rem;line-height: 1em
                }
            }
            .shareBtn{
                font-size: 0.3rem;width: 1.2rem;height: 0.5rem;line-height: 0.5rem;border-radius: 0.25rem;
            }
            .shareReduce{
                color:#F92D2D;font-size: 0.32rem;font-weight: bold;
            }
        }
        .shareGuide{
            position:fixed;background: rgba(0,0,0,.5);left: 0;top:0;bottom:0;right:0;
            .topImg{
                text-align: right;
                img{
                    width: 5.61rem;
                }
            }
            .konwImg{
                text-align: center;margin-top: 1.4rem;
                img{
                    width: 2.35rem;
                }
            }
        }
        .bottomApply{
            padding: 0.4rem 0.4rem 0.8rem;background: #fff;
            .bottom_title{
                font-size: 0.3rem;color:#4C546A;
            }
            .apply_item{
                display:flex;justify-content: flex-start;align-items: center;height: 0.88rem;border-bottom: 1px solid #d0d0d0;margin-top: 0.2rem;
                span{
                    font-size: 0.3rem;flex-grow: 1;margin-left: 0.2rem;color:#4C546A
                }
            }
        }
        .shareBtn{
            height: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
            width: 2.5rem;
            border-radius:0.25rem;
            font-size: 0.24rem;
            color:#fff;
            background: -webkit-gradient(left, #6E89FD,#596DFF );
            background: -moz-linear-gradient(right, #6E89FD,#596DFF );
            background: -o-linear-gradient(right,#6E89FD,#596DFF );
            background: linear-gradient(to right,#6E89FD,#596DFF );
        }
        .applyBtn{
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            border-radius:0.5rem;
            font-size: 0.32rem;
            color:#fff;
            font-weight: bold;
            background: -webkit-gradient(left, #6E89FD,#596DFF );
            background: -moz-linear-gradient(right, #6E89FD,#596DFF );
            background: -o-linear-gradient(right,#6E89FD,#596DFF );
            background: linear-gradient(to right,#6E89FD,#596DFF );
        }
    }

</style>
