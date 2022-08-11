<template>
    <div style="background: #fff" >
        <div class="inquireBanner" :style="{backgroundImage: 'url('+categoryData.background+')',}">
            <div class="banner_label" v-if="categoryData">
                {{categoryData.product_title&&categoryData.product_title+'-'}}{{categoryData.report_query_prompt}}
            </div>
        </div>
        <div class="inquiryBox" v-if="categoryData" :class="$store.state.token==''?'nologin':'islogin'">
            <h5 class="inquiry_t">{{is_ios_auditor==1?"请输入您的身份信息":"请输入查询对象的身份信息"}}</h5>
            <div class="inputArea">
                <svg-icon :iconClass="'name'" :iconStyle="{fontSize:'0.3rem',color:'#ffffff',}"></svg-icon>
                <input v-model="formData.realname" type="text" :placeholder="is_ios_auditor==1?'请输入本人真实姓名':'请输入真实姓名'" @blur="nameBlurReg">
                <transition name="inputErrtips">
                    <span class="inputErrtips" v-show="showNameErr">姓名格式不正确</span>
                </transition>
            </div>
            <div class="inputArea">
                <svg-icon :iconClass="'IDcard'" :iconStyle="{fontSize:'0.3rem',color:'#ffffff',}"></svg-icon>
                <input v-model="formData.id_card" type="text" :placeholder="is_ios_auditor==1?'请输入本人身份证号':'请输入身份证号'" @blur="idcardBlurReg">
                <transition name="inputErrtips">
                    <span class="inputErrtips" v-show="showIdErr">身份证不正确</span>
                </transition>
            </div>

            <div class="inputArea" v-if="$route.query.category_id==10">
                <svg-icon :iconClass="'bankcard'" :iconStyle="{fontSize:'0.3rem',color:'#ffffff',}"></svg-icon>
                <input v-model="formData.bankcard_no" type="text"   placeholder="请输入信用卡卡号" @blur="bankcardBlurReg">
                <transition name="inputErrtips">
                    <span class="inputErrtips" v-show="showCardErr">信用卡号为必填项</span>
                </transition>
            </div>

            <div class="inputArea">
                <svg-icon :iconClass="'phone'" :iconStyle="{fontSize:'0.3rem',color:'#ffffff',}"></svg-icon>
                <input v-model="formData.phone" type="number" :placeholder="is_ios_auditor==1?'请输入本人手机号':'请输入手机号'"  @blur="phoneBlurReg">
                <transition name="inputErrtips">
                    <span class="inputErrtips" v-show="showPhoneErr">手机号格式不正确</span>
                </transition>
            </div>
            <div class="inputArea" v-if="$store.state.token==''||is_ios_auditor==1">
                <svg-icon :iconClass="'smscode'" :iconStyle="{fontSize:'0.3rem',color:'#ffffff',}"></svg-icon>
                <input type="number" placeholder="请输入验证码"  v-model="formData.sms_code" >
                <span @click="inquiry_phonecode">{{phonecodeTips}}</span>
            </div>
            <div class="agree" v-if="$store.state.client=='ios'">
                <svg-icon
                    @click.native="agreeProtocol"
                    :iconClass="agreeIqXy?'inquiryAgree':'inquiryNoAgree'"
                    :iconStyle="{fontSize:'0.3rem',color:'#ffffff',}"></svg-icon>
                <span @click="$router.push({name:'kd_privacy'})">
                    <i style="color:#666">
                        我已阅读并同意《口袋信用使用协议》
                    </i>
                </span>

            </div>
            <div class="agree" v-else>
                <svg-icon
                    @click.native="agreeProtocol"
                    :iconClass="agreeIqXy?'inquiryAgree':'inquiryNoAgree'"
                    :iconStyle="{fontSize:'0.3rem',color:'#ffffff',}"></svg-icon>
                <span @click="$router.push({name:'regAgreement'})">
                    <i style="color:#666">
                        我已阅读并同意《授权查询协议》
                    </i>
                </span>
            </div>
            <div v-if="is_ios_auditor==1" class="detection detectionAble" @click="gotoApply" >
                立即查询
            </div>
            <div v-else class="detection detectionAble" @click="gotoApply" >
                支付{{categoryData.price}}元，获取检测结果
            </div>

            <div class="inquiry_b_b" >
                <div @click="$goRouter({name:'report',query:{category_id:$route.query.category_id,order_no:'default',is_audit:is_ios_auditor}})">
                    <svg-icon
                        :iconClass="'inquiry_yl'"
                        :iconStyle="{fontSize:'0.3rem',color:'#ffffff',}"></svg-icon>
                    <span class="b_t" >样例报告</span>
                </div>
                <div>
                    <svg-icon
                        :iconClass="'inquiry_history'"
                        :iconStyle="{fontSize:'0.3rem',color:'#ffffff',}"></svg-icon>
                    <span class="b_t" @click="$router.push({name:'inq_history',query:{is_ios_auditor:is_ios_auditor}})">查询历史</span>
                </div>
            </div>
        </div>
        <div class="useWhy"  v-if="false">
            <div class="title">
                <img class="title_l_icon" src="@/assets/thred_inq/thrid_inq_icon_2.png" alt="">
                <span class="title_words">{{categoryData.title1}}</span>
                <img class="title_l_icon" src="@/assets/thred_inq/thrid_inq_icon_2.png" alt="">
            </div>
            <div class="content clearfix">
                <div class="fl" style="margin-right: 0.55rem">
                    <img :src="categoryData.detail_logo" alt="" style="width:1.7rem; ">
                </div>
                <div class="fr" style="font-size:0.28rem;color:#4C546A;width:3.78rem">
                    {{categoryData.detail}}
                </div>
            </div>
        </div>
        <div class="doWath"  v-if="categoryData" style="margin-bottom: 0.5rem">
            <div class="title" v-if="false">
                <img class="title_l_icon" src="@/assets/thred_inq/thrid_inq_icon_1.png" alt="">
                <span class="title_words">{{categoryData.title2}}</span>
                <img class="title_l_icon" src="@/assets/thred_inq/thrid_inq_icon_1.png" alt="">
            </div>
            <div class="doWath_con" v-if="false">
                <div class="con_li" v-for="(item, index) in categoryData.items">
                    <div style="text-align: center;"><img :src="item.img" alt="" style="height: 1rem;"></div>
                    <div class="label">{{item.text}}</div>
                </div>
            </div>
            <div>
                <img :src="categoryData.compare_img" alt="" style="width: 100%">
            </div>
        </div>
        <!--滑块验证-->
       <!-- <div id="inquiry_capt"></div>-->
        <!--输入验证码-->
        <flypopup  v-model="getUserPhonecodeVisible"  :popupStyle="{borderRadius: '0.2rem'}">
            <div class="phoneinput_history">
                <!--<div class="input_title"></div>-->
                <!-- <div  class="history_inputArea">
                     <svg-icon  :iconClass="'phone'" :iconStyle="{fontSize:'0.4rem',color:'#444'}"></svg-icon>
                     <input type="number" id="historyphone" placeholder="请输入手机号" v-model="formData.sms_phone">
                 </div>-->
                <div style="margin-top: 0.4rem;" class="history_inputArea">
                    <svg-icon  :iconClass="'phonecode'" :iconStyle="{fontSize:'0.4rem',color:'#444'}"></svg-icon>
                    <input type="number" placeholder="请输入图形验证码"  v-model="formData.img_code"  style="width: 2.5rem">
                    <img :src="imgCode" alt="" style="width: 1.5rem" @click="mathNumber=new Date().getTime()">
                </div>
                <!--<div style="margin-top: 0.4rem;" class="history_inputArea">
                    <svg-icon  :iconClass="'smscode'" :iconStyle="{fontSize:'0.4rem',color:'#444'}"></svg-icon>
                    <input type="number" placeholder="请输入验证码"  v-model="formData.sms_code" >
                    <span @click="inquiry_phonecode">{{phonecodeTips}}</span>
                </div>-->
                <div class="history_btn" >
                    <a class="btn_item" @click="getUserPhonecodeVisible=false">取消</a>
                    <a class="btn_line" ></a>
                    <a class="btn_item" @click="checkImg">确定</a>
                </div>
            </div>
        </flypopup>
        <div class="backModel" v-if="isGoBack">
            <div class="modelBox">
                <p class="jiance_name">您将错过以下检测</p>
                <div class="jiance">
                    <div class="jianceItem">
                        <img src="@/assets/thred_inq/heimingdan.png">
                        <p>风险评分</p>
                    </div>
                    <div class="jianceItem">
                        <img src="@/assets/thred_inq/shouxin.png">
                        <p>提额概率</p>
                    </div>
                    <div class="jianceItem">
                        <img src="@/assets/thred_inq/fengxian.png">
                        <p>交易分析</p>
                    </div>
                </div>
                <p class="jiance_tip">支付成功了解更多信用卡体检报告。全方位了解用卡行为，优化用卡习惯</p>
                <div class="model_bom">
                    <button class="giveUp" @click="giveUp">放弃查看</button>
                    <button class="goOn" @click="goOn">继续查询</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {testIdCard,isPoneAvailable,isChn,setCookie,getCookie,getQuery} from  '@/js/util'
    import {agentAddOrder,agentgetOneCategory,payOrder,agentGetPhonecode,ImgCode,getOrderXq,getOpenid,isIosReview,wechatIdCheck} from '@/api/api'
    import {domainUrl} from '@/js/http'
    function isWchatBrowser() {
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if (isWeixin) {
            return true;
        }else{
            return false;
        }
    }
    export default {
        name: "third_inquiry",
        data(){
            return{
                myCaptcha:null,
                formData:{
                    realname:'',
                    id_card:'',
                    bankcard_no:'',
                    phone:'',
                    sms_code:'',
                    sms_phone:'',
                    img_code:'',
                    category_id:0
                },
                phonecodeTips:"获取验证码",
                showIdErr:false,
                showPhoneErr:false,
                showNameErr:false,
                agreeIqXy:true,
                categoryData:null,
                phoneCodesend:false,

                isWechatBrowser:false,
                getUserPhonecodeVisible:false,
                mathNumber:new Date().getTime(),
                wx_SQ_backurl:window.location.href,
                is_ios_auditor:1,//0为非iOS审核账号
                isGoBack:false,
                showCardErr:false
            }
        },
        beforeRouteEnter(to,from,next){
            /*缓存页面 路由进入做处理*/
            next()
        },
        beforeRouteLeave(to,from,next){
            next()
        },

        computed:{
            imgCode(){
                return ImgCode+'/uuid/'+this.mathNumber
            },
        },
        created(){
            var self = this;
            /*ios上架测试账号*/
            if(this.$store.state.token!=''){
                isIosReview().then((res)=>{
                    if(res.code==1){
                        this.is_ios_auditor = res.data.is_ios_auditor
                    }else{
                        this.is_ios_auditor = 0;
                    }
                })
            }else {
                this.is_ios_auditor = 0
            }

            var  inquiryMsg = getCookie('inquiryMsg')?JSON.parse(getCookie('inquiryMsg')):'';/*常用查询信息*/

            if(inquiryMsg!=''){
                this.formData.realname = inquiryMsg.realname;
                this.formData.id_card = inquiryMsg.id_card;
                this.formData.phone = inquiryMsg.phone;
                this.formData.bankcard_no = inquiryMsg.bankcard_no;
            };
            this.formData.category_id =getQuery()['category_id'];
            this.categoryData = {};
            /*获取页面信息*/
            agentgetOneCategory({category_id:this.formData.category_id}).then((res)=>{
                if(res.code==1){
                    this.categoryData = res.data;
                    this.category_name =  this.categoryData.category_name;
                    this.$store.dispatch('setCurrentTitle',this.categoryData.category_name);
                }else{
                    this.redirectHome()
                }
            })


            /*判断是否是在微信内部*/

            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady',  function () {
                        self.initUserWechat();
                    }, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady',  function () {
                        self.initUserWechat();
                    });
                    document.attachEvent('onWeixinJSBridgeReady',  function () {
                        self.initUserWechat();
                    });
                }
            }else{
                self.initUserWechat();
            }
        },
        mounted(){
            //if(this.$store.state.token!=''&&this.$store.state.client == 'ios'){

        },
        methods:{
            goOn:function(){
                this.isGoBack = false;
            },
            giveUp:function(){
                this.isGoBack = false;
                this.$router.goBack()
            },
            backClick(){
                this.isGoBack = true;
            },
            redirectHome(){
                this.$router.replace('/thirdPartyHome')
            },
            wechatIdCheck(){
                return new Promise((resolve,reject)=>{
                    wechatIdCheck().then((res)=>{
                        if(res.code==1){
                            if(res.refresh==1){
                                localStorage.removeItem('uid')
                            }
                        }
                        resolve()
                    })
                })

            },
            initUserWechat(){
                /*微信内部*/
                this.isWechatBrowser = true;
                this.wechatIdCheck().then(()=>{
                    if(localStorage.uid){//已经授权
                        this.$store.commit('getUid',localStorage.uid)
                        return;
                    }
                    if(getQuery()['uid']){//授权返回
                        localStorage.uid = getQuery()['uid'];
                        this.$store.commit('getUid',getQuery()['uid']);
                        return;
                    }
                    /*微信授权*/
                    var str = this.wx_SQ_backurl.split("?")[0]+'?'
                    for(var i in getQuery()){
                        if(i!='category_name'){
                            str+=i+'='+getQuery()[i]+'&'
                        }
                    };
                    var params = {
                        target_url:str
                    }
                    getOpenid(params).then((res)=>{
                        if(res.code==1) {
                            window.location.href = res.data.redirect_url//getOpenid(params);
                        }
                    })
                })
            },
            showCat(){
                /*顶向验证*/
                if(this.phoneCodesend)return
                this.myCaptcha.reload()
                this.myCaptcha.show()
            },
            bankcardBlurReg(e){
                if(e.target.value===''){
                    this.showCardErr  = true
                }else{
                    this.showCardErr  = false
                }
            },
            nameBlurReg(e){
                var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
                if(reg.test(e.target.value)){
                    this.showNameErr  = false
                }else{
                    this.showNameErr  = true
                }
            },
            phoneBlurReg(e){
                if(!isPoneAvailable(e.target.value)){
                    this.showPhoneErr  = true
                }else{
                    this.showPhoneErr  = false
                }
            },
            idcardBlurReg(e){
                if(!testIdCard(e.target.value)){
                    this.showIdErr  = true
                }else{
                    this.showIdErr  = false
                }
            },
            agreeProtocol(){
                this.agreeIqXy = !this.agreeIqXy
            },
            gotoApply(){//确认订单
                var self = this;
                if(this.isWechatBrowser&&this.$store.state.uid==''){
                    this.$showToast({
                        type:'fail',
                        message:'微信未授权'
                    });
                    return;
                }
                if(!this.agreeIqXy){
                    this.$showToast({
                        type:'fail',
                        message:'同意注册协议'
                    })
                    return;
                }
                if(this.formData.realname==''||this.showNameErr){
                    this.$showToast({
                        type:'fail',
                        message:'请输入合法的姓名'
                    })
                    return;
                }
                if(this.formData.bankcard_no==''){
                    this.$showToast({
                        type:'fail',
                        message:'银行卡号不能为空'
                    })
                    return;
                }

                if(this.formData.phone==''||this.showPhoneErr){
                    this.$showToast({
                        type:'fail',
                        message:'请输入正确的手机号'
                    })
                    return;
                }
                if(this.formData.id_card==''||this.showIdErr){
                    this.$showToast({
                        type:'fail',
                        message:'请输入正确的身份证号'
                    })
                    return;
                };
                if(this.is_ios_auditor==1){
                    /*ios 上架审核账号特殊处理*/
                    if(this.formData.sms_code==''){
                        this.$showToast({
                            type:'fail',
                            message:'验证码不能为空',
                            duration:1000
                        });
                        return;
                    }
                    if(this.formData.phone != '17755144585'){
                        this.$showToast({
                            type:'fail',
                            message:'非当前用户手机号',
                            duration:1000
                        });
                        return
                    }
                    this.place_a_order()
                    return;
                }
                if(this.$store.state.token!=''){
                    this.isExistOrder()
                }else{
                    this.place_a_order()
                }
            },
            isExistOrder(){
                /*存在相同历史订单未处理*/
                this.$showToast({
                    type:'loading',
                    message:'正在处理',
                    duration:0
                })
                var self = this;
                var params = {
                    realname:this.formData.realname,
                    id_card:this.formData.id_card,
                    phone:this.formData.phone,
                    category_id:this.formData.category_id
                }
                getOrderXq(params).then((res)=>{
                    this.$toast.clear()
                    if(res.code==1){
                        this.$dialog.confirm({
                            title: '提示',
                            message: '发现匹配到历史订单！',
                            btn: {
                                ok:'去查看',
                                no:'继续下单'
                            }
                        }).then((done) => {
                            done()
                            if(res.data.status==1){// 已经支付
                                /*未爬取数据*/
                                if(res.data.jump_url!=''){
                                    self.$showToast({
                                        type:'loading',
                                        message:'订单已完成,正在拉取报告信息',
                                        duration:2000
                                    })
                                    setTimeout(()=>{
                                        window.location.href = res.data.jump_url
                                    },2000)

                                }else{
                                    /*已生成报告*/
                                    self.$router.push({name:'report',query:{order_no:res.data.order_no}})
                                }
                            }else{
                                /*未支付订单*/
                                var query = {
                                    order_no:res.data.order_no,
                                    category_id:this.formData.category_id
                                };
                                /* var queryStr = 'order_no='+query.order_no+'&category_id='+query.category_id;
                                 if(this.isWechatBrowser){
                                     window.location.href= '/app/third_apply?'+queryStr
                                 }else{
                                     this.$router.push({name:"third_apply",query:query})
                                 }*/
                                this.$router.push({name:"third_apply",query:query})
                            }
                        }).catch((done) => {
                            done()
                            this.place_a_order()
                        });
                    }else{
                        this.place_a_order()
                    }
                })
            },
            /*下单*/
            place_a_order(type){
                var agent = getQuery()['agent']?getQuery()['agent']:localStorage.agent?localStorage.agent:'';
                if(this.$store.state.token==''||this.is_ios_auditor==1){
                    /*未登录*/
                    var params = {
                        realname:this.formData.realname,
                        id_card:this.formData.id_card,
                        phone:this.formData.phone,
                        sms_phone:this.formData.phone,
                        sms_code:this.formData.sms_code,
                        category_id:this.formData.category_id,
                        bankcard_no:this.formData.bankcard_no,
                        agent:agent,
                        uid:this.$store.state.uid
                    }
                }else{
                    var params = {
                        realname:this.formData.realname,
                        id_card:this.formData.id_card,
                        phone:this.formData.phone,
                        category_id:this.formData.category_id,
                        bankcard_no:this.formData.bankcard_no,
                        agent:agent,
                        uid:this.$store.state.uid
                    }
                }
                this.$showToast({
                    type:'loading',
                    message:'正在下单',
                    duration:0
                })

                agentAddOrder(params).then((res)=>{
                    this.$toast.clear()
                    if(res.code==1){
                        /*cookie缓存用户*/
                        var inquiryMsg = {
                            realname:this.formData.realname,
                            id_card:this.formData.id_card,
                            phone:this.formData.phone,
                            bankcard_no:this.formData.bankcard_no,
                        }
                        setCookie('inquiryMsg',JSON.stringify(inquiryMsg))
                        setCookie('userPhone',this.formData.sms_phone)
                        this.order_no = res.data.order.order_no;

                        localStorage.token = res.data.user.token
                        this.$store.commit('getToken',res.data.user.token)
                        var query = {
                            order_no:this.order_no,
                            category_id:this.formData.category_id,
                        };
                       if(this.is_ios_auditor==1){
                           /*ios webview ios审核账号不做支付处理*/
                           this.$router.push({name:'report',query:{order_no:this.order_no}})
                       }else{
                           this.$router.push({name:"third_apply",query:query})
                       }

                    }else if(res.code==-1){
                        this.$store.commit('getToken')
                        /* this.formData.sms_phone = this.formData.phone
                         this.getUserPhonecodeVisible = true;*/
                    }
                    this.$showToast({
                        type:res.code==1?'success':'fail',
                        message:res.code==1?'下单成功':res.msg,
                        duration:1000
                    });
                })
            },
            /*获取手机号校验码*/
            inquiry_phonecode(){
                /*
                * @params phoneCodesend防止多次请求
                * @params NotPoint收到验证码倒计时内不可点击
                * */
                if(this.is_ios_auditor==1){
                    if(this.formData.phone != '17755144585'){
                        this.$showToast({
                            type:'fail',
                            message:'非当前用户手机号',
                            duration:1000
                        });
                        return
                    }

                }
                var self = this;
                if(this.phoneCodesend||this.NotPoint)return;
                this.phoneCodesend = true;
                if(this.getUserPhonecodeVisible){
                    var params = {
                        sms_phone:this.formData.phone,
                        img_code:this.formData.img_code,
                        uuid:this.mathNumber,
                        type:'sms_add_order',
                        uid:this.$store.state.uid
                    }
                }else{
                    var params = {
                        sms_phone:this.formData.phone,
                        uuid:this.mathNumber,
                        type:'sms_add_order',
                        uid:this.$store.state.uid
                    }
                }

                agentGetPhonecode(params).then((res)=>{
                    this.phoneCodesend = false;
                    this.getUserPhonecodeVisible = false;
                    if(res.code==1){
                        var num = 60;
                        self.NotPoint = true
                        var timer = setInterval(()=>{
                            if(num<=0){
                                clearInterval(timer)
                                self.phonecodeTips = '发送验证码'
                                self.NotPoint = false
                                return false;
                            }
                            self.phonecodeTips = num+'s'
                            num--;
                        },1000);
                    }else if(res.code==0){
                        /*频繁请求 图片验证*/
                        this.mathNumber = new Date().getTime();
                        if(res.data&&res.data.need_img_code){
                            this.getUserPhonecodeVisible = true;
                        }
                    }else{
                        this.mathNumber = new Date().getTime();
                    }
                    this.$showToast({
                        type:res.code==1?'success':'fail',
                        message:res.msg,
                        duration:500
                    })
                })
            },
            checkImg(){
                this.inquiry_phonecode()
            },

        },

    }
</script>

<style lang="less" scoped>
    .backModel{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index: 500;
        background: rgba(0, 0, 0, 0.28);
        .modelBox{
            background: #fff;
            padding:0.3rem 0.3rem 1.1rem;
            margin:3.8rem 0.4rem 0;
            // width:80%;
            // margin:0 10%;
            // margin-top:3.5rem;
            border-radius: 9px;
            .jiance_name{
                font-size: 0.38rem;
                color: #333333;
                text-align: center;
                margin-bottom: 0.38rem;
                font-weight: 600;
            }
            .jiance:after {
                content: '';
                height: 0;
                clear: both;
                display: block;
                zoom: 1;
            }
            .jianceItem{
                width: 33.33%;
                float: left;
                text-align: center;
                img{
                    width: 45%;
                    display: block;
                    margin: 0.24rem auto 0.12rem;
                }
                p{
                    font-size: 0.26rem;
                    color: #333333;
                }
            }
            .jiance_tip{
                font-size: 0.32rem;
                line-height: 0.38rem;
                color: #07ccbd;
                text-align: center;
                margin-top: 0.5rem;
            }
            .model_bom{
                margin-top: 0.5rem;
                button{
                    width: 2.5rem;
                    border-radius: 0.1rem;
                    font-size: 0.3rem;

                }
                .giveUp{
                    border: solid 0.16rem #dadada;
                    float: left;
                    color: #999;
                    margin-left:0.2rem;
                    background: #dadada;

                }
                .goOn{
                    background: #5c70ff;
                    float: right;
                    color: #fff;
                    border: solid 0.16rem #5c70ff;
                    margin-right:0.2rem;
                    background: #5c70ff;
                }
            }
        }
    }
    .inquireBanner{
        height: 5.2rem;
        position: relative;
        background-position: left center;
        background-repeat:  no-repeat;
        background-size: 100% 100%;
        .banner_label{
            position: absolute;
            top:0.96rem;
            left: 0.3rem;
            font-size: 0.4rem;
            font-weight: bold;
            color:#fff
        }
        .banner_txt{
            position: absolute;
            top: 1.9rem;
            left: 0.3rem;
            display: inline-block;
            font-size: 0.3rem;
            color:#fff;
        }
    }
    .inquiryBox{
        position: relative;
        z-index: 99;
       /* width: 7.36rem;*/
        margin:-1.86rem 0.07rem  0;
        background: #fff;
        padding: 0 0.65rem;
        box-sizing: border-box;
        border-radius: 0.2rem;
        box-sizing: border-box;
        overflow: hidden;

        &.nologin{
            height: 12.3rem;
            background: url("../../assets/thred_inq/inquiry_inputbg_1.png") left center no-repeat;
            background-size:100% 100% ;
        }
        &.islogin{
            height: 10.8rem;
            background: url("../../assets/thred_inq/inquiry_inputbg_2.png") left center no-repeat;
            background-size:100% 100% ;
        }
        .inquiry_t{
            font-size: 0.28rem;
            color:#444;
            font-weight: 600;
            margin: 0.4rem 0;
        }
    }
    .inquiry_b_b{
        display: flex;justify-content: space-around;align-items: center;height: 1rem;margin-top: 0.6rem;
        svg{
            vertical-align: middle;
        }
        .b_t{
            vertical-align: middle;font-size: 0.28rem;font-weight: bold;margin-left: 0.2rem
        }
    }
    .useWhy{
        margin: 0 0.32rem;
        padding: 0.3rem 0.3rem 0.6rem;
        border-radius: 0.2rem;
        background: #fff;
        box-shadow: 0 0.1rem 0.1rem 0.12rem rgba(0,96,255,0.08);
        .title{
            text-align: center;
            margin-bottom: 0.36rem;
            .title_l_icon{
                width:0.52rem;
                vertical-align: middle;
            }
            .title_words{
                vertical-align: middle;
                margin: 0 0.1rem;
                font-weight: bold;
                font-size: 0.32rem;
                color:#4C546A;
            }
        }
        .content{

        }
    }
    .doWath{
        margin: 0.4rem 0.32rem 0;
        padding: 0.3rem 0.3rem 0.6rem;
        border-radius: 0.2rem;
        background: #fff;
        box-shadow: 0 0.1rem 0.1rem 0.12rem rgba(0,96,255,0.08);
        .title{
            text-align: center;
            margin-bottom: 0.36rem;
            .title_l_icon{
                width:0.52rem;
                vertical-align: middle;
            }
            .title_words{
                vertical-align: middle;
                margin: 0 0.1rem;
                font-weight: bold;
                font-size: 0.32rem;
                color:#4C546A;
            }
        }
        .doWath_con{
            display: flex;justify-content: space-around;align-items: center;flex-wrap: wrap;
            .con_li{
                width:50%;margin-bottom:0.4rem;
                .label{
                    font-size: 0.28rem;color:#4C546A;text-align: center;margin-top: 0.3rem;line-height: 1em;
                }
            }
        }
    }
    .phoneinput_history{
        width: 5.5rem;
        background: #fff;padding: 0.4rem 0.4rem 0.1rem;box-sizing: border-box;border-radius: 0.2rem;
        .input_title{
            font-size: 0.3rem;color:#4C546A;text-align: center;margin-bottom: 0.3rem
        }
        .history_inputArea{
            height: 0.8rem;line-height: 0.8rem;display: flex;justify-content: flex-start;align-items: center;border-bottom: 1px solid #D0D0D0;
            input{
                margin-left: 0.2rem;width: 2.8rem
            }
            span{
                display: inline-block;width: 1.3rem;font-weight: bold;color:#444;text-align: center;
            }
        }
        .history_btn{
            height: 0.88rem;display: flex;justify-content: flex-start;align-items: center;margin-top: 0.6rem;
            .btn_item{
                height: 0.88rem;line-height:0.88rem;text-align:center;width:2.35rem;
            }
            .btn_line{
                height: 0.5rem;background: #D0D0D0;width: 1px;
            }
        }
    }

    .inputArea{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 1rem;
        background: #fff;
        margin-bottom: 0.4rem;
        position: relative;
        border: 1px solid #ccc;
        -webkit-border-radius: 0.5rem;
        -moz-border-radius: 0.5rem;
        border-radius: 0.5rem;
        padding:0 0.5rem 0 0.4rem;
        &>svg{
            width:0.3rem;
            margin-right: 0.2rem;
        }
        input{
            height: 0.76rem;
            flex-grow: 1;
        }
        .inputErrtips{
            position: absolute;
            bottom:-0.3rem;
            left: 0.3rem;
            display: inline-block;
            height: 0.3rem;
            color:red
        }
    }
    .inputErrtips-enter-active,.inputErrtips-leave-active{
        transition: all .5s linear;
    }
    .inputErrtips-enter{
        transform: translateY(-0.3rem);
    }
    .inputErrtips-leave{
        transform: translateY(0);
    }
    .agree{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 0.3rem 0 0.4rem;
        &>svg{
            width:0.3rem;
            margin: 0 0.2rem;
        }
    }
    .detection{
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius:0.5rem;
        font-size: 0.32rem;
        color:#fff;
        font-weight: bold;
    }
    .detectionAble{
        background: -webkit-gradient(left, #6E89FD,#596DFF );
        background: -moz-linear-gradient(right, #6E89FD,#596DFF );
        background: -o-linear-gradient(right,#6E89FD,#596DFF );
        background: linear-gradient(to right,#6E89FD,#596DFF );
    }
    .detectionDisable{
        background:#999999;
    }
</style>
