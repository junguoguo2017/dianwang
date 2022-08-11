<template>
    <div>
        <!--侧边bar-->
        <div  class="homeBtn" v-if="!showSlider">
          <div class="someBtn" v-if="$store.state.client!='ios'" @click="showCustom">
                 <svg-icon  :iconClass="'customerService'" :iconStyle="{fontSize:'0.4rem',color:'#444'}"></svg-icon>
             </div>
           <!--<div class="someBtn" v-if="$route.name!='my'" @click="$router.push({name:'my'})">
                <svg-icon  :iconClass="'my'" :iconStyle="{fontSize:'0.4rem',color:'#444'}"></svg-icon>
            </div>-->
            <div class="someBtn"  v-if="$store.state.client=='h5'&&$route.name!='thirdPartyHome'&&showBackHome" @click="$router.push({name:'thirdPartyHome'})" >
                <svg-icon  :iconClass="'home'" :iconStyle="{fontSize:'0.4rem',color:'#444'}"></svg-icon>
            </div>
            <div class="someBtn" @click="backClick" v-if="$store.state.client=='h5'&&showBack">
                <svg-icon  :iconClass="'back'" :iconStyle="{fontSize:'0.4rem',color:'#444'}"></svg-icon>
            </div>
        </div>
        <!--客服-->
        <flypopup v-model="$store.state.customShow" :popupStyle="{borderRadius: '0.2rem',}">
            <div class="customBox" >
                <div  class="select">
                    <span class="item" :class="customItem==1?'active':''" @click="customItem = 1">客服微信</span>
                    <span  class="item" :class="customItem==2?'active':''"  @click="customItem = 2">公众号</span>
                </div>
                <div  class="content" v-show="customItem == 2">
                    <div  class="code"><img :src="wechat.h5_open_wechat_qrcode" alt="" ></div>
                    <div class="copyBtn"><span @click="copyName(1)">复制公众号并关注</span></div>
                </div>
                <div  class="content" v-show="customItem == 1">
                    <div  class="code"><img :src="wechat.wechat_qrcode" alt="" ></div>
                    <div class="copyBtn"><span @click="copyName(2)">复制微信号并联系</span></div>
                </div>
            </div>
        </flypopup>
        <!--登录-->
        <flypopup   v-model="$store.state.showLogin"  :clickMarkerHidden="false" :popupStyle="{borderRadius: '0.2rem'}">
            <div class="phoneinput_history">
                <div class="input_title">登录</div>
                <div  class="history_inputArea">
                    <svg-icon  :iconClass="'phone'" :iconStyle="{fontSize:'0.4rem',color:'#444'}"></svg-icon>
                    <input type="number" id="historyphone" placeholder="请输入手机号" v-model="formData.phone"  >
                </div>
                <div style="margin-top: 0.4rem;" class="history_inputArea">
                    <svg-icon  :iconClass="'phonecode'" :iconStyle="{fontSize:'0.4rem',color:'#444'}"></svg-icon>
                    <input type="number" placeholder="请输入图形验证码"  v-model="formData.img_code"  style="width: 2.5rem" >
                    <img :src="imgCode" alt="" style="width: 1.5rem" @click="mathNumber = new Date().getTime()">
                </div>
                <div class="history_inputArea" style="margin-top: 0.4rem;">
                    <svg-icon  :iconClass="'smscode'" :iconStyle="{fontSize:'0.4rem',color:'#444'}"></svg-icon>
                    <input type="number" id="historysmscode" v-model="formData.sms_code" placeholder="请输入验证码"  style="flex-grow: 1;margin-left: 0.2rem">
                    <span @click="sendCode">{{phonecodeTips}}</span>
                </div>
                <div class="history_btn" >
                    <a class="btn_item" @click="loginCancle">取消</a>
                    <a class="btn_line" ></a>
                    <a class="btn_item" @click="login">确定</a>
                </div>
            </div>
        </flypopup>
    </div>
</template>

<script>
    import {isPoneAvailable,getCookie,setCookie,getQuery} from '@/js/util'
    import {ImgCode,concatCustomer,agentGetPhonecode,smsLogin} from '@/api/api'
	export default {
		name: "publicComponents",
        data(){
		    return {
                phonecodeTips:"获取验证码",
                formData:{
                    phone:'',
                    sms_code:'',
                    img_code:''
                },
                phoneCodesend:false,
                NotPoint:false,
                mathNumber:new Date().getTime(),
                customShow:false,
                open_wechat:{
                    open_wechat_qrcode:'',
                    open_wechat_name:''
                },
                customItem:1,
                wechat:{
                    wechat_name:'',
                    wechat_qrcode:'',
                    h5_open_wechat_qrcode:''
                },
                showBack:false,
                showBackHome:false,

            }
        },
        computed:{
            imgCode(){
                return ImgCode+'/uuid/'+this.mathNumber
            },
            showSlider(){
                var path = ['kd_reg','kd_privacy','registered']
                return  path.indexOf(this.$route.name) !=-1;
            }
        },
        created(){
            var  userPhone = getCookie('userPhone')?getCookie('userPhone'):'';
            this.formData.phone = userPhone;

            concatCustomer().then((res)=>{
                if(res.code==1){
                    this.open_wechat.open_wechat_qrcode = res.data.service.open_wechat_qrcode;
                    this.open_wechat.open_wechat_name = res.data.service.open_wechat_name;
                    this.wechat.wechat_qrcode = res.data.service.wechat_qrcode;
                    this.wechat.wechat_name = res.data.service.wechat;
                    this.wechat.h5_open_wechat_qrcode = res.data.service.h5_open_wechat_qrcode;

                    this.showBack=res.data.is_ret==1?true:false;
                    this.showBackHome=res.data.is_ret_hp==1?true:false
                }
            })
        },
        mounted(){
            if(this.$store.state.client=='h5'){
                this.$store.dispatch('init',{self:this})
            };

           setTimeout(()=>{
               let vconDom = document.getElementById('__vconsole');
               if(getQuery()['vconsole']){
                   vconDom.style.display = 'block';
               }else{
                   vconDom.style.display ='none';//'none'
               }
              //vconDom.style.display = 'block';
            },1000)
        },

        methods:{
            /*动态加载客服js插件*/
            loadScript(url, callback){
                let script = document.createElement('script');
                script.src = url;
                script.async = 'async'
                document.getElementsByTagName('head')[0].appendChild(script);
                if (script.readyState) { // IE
                    script.onreadystatechange = function () {
                        if (script.readyState === 'loaded' || script.readyState === 'complete') {
                            script.onreadystatechange = null;
                            callback();
                        }
                    }
                } else { // 其他浏览器
                    script.onload = function () {
                        callback();
                    }
                }

            },
            /*业务方法*/
            showCustom(){


              this.$store.commit('setCustomShow',true)
              return
                if(!window.qimoChatLoaded){
                    let url = 'https://ykf-webchat.7moor.com/javascripts/7moorInit.js?accessId=a1a4f190-96fb-11e9-9ff0-b3ba7198c4cf&autoShow=false&language=ZHCN'
                    this.loadScript(url,function () {
                        /*客服弹出*/
                        var timer = setInterval(()=>{
                            if(window.qimoChatLoaded){
                                qimoChatClick()
                                clearInterval(timer)
                            }
                        },50)
                    })
                }else{
                    qimoChatClick()
                }
            },
            backClick(){
                this.$emit('backClick')
            },
            /*发送手机验证码*/
            sendCode(){
                if(this.phoneCodesend)return
                if(this.formData.phone==''){
                    this.$showToast({
                        type:'fail',
                        message:'手机号为空'
                    })
                    return;
                }else if(!isPoneAvailable(this.formData.phone)){
                    this.$showToast({
                        type:'fail',
                        message:'手机号格式错误'
                    })
                    return;
                }
                if(this.formData.img_code==''){
                    this.$showToast({
                        type:'fail',
                        message:'验证码为空'
                    })
                    return;
                }
                this.inquiry_phonecode()
            },
            inquiry_phonecode(){
                if(this.phoneCodesend||this.NotPoint)return;
                this.phoneCodesend = true;
                var self = this;
                var params = {
                    phone:this.formData.phone,
                    img_code:this.formData.img_code,
                    uuid:this.mathNumber,
                    type:'sms_login'
                }
                agentGetPhonecode(params).then((res)=>{
                    this.phoneCodesend = false;

                    if(res.code==1){
                        self.NotPoint = true
                        var num = 60;
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
                    }else{
                        this.mathNumber = new Date().getTime();
                    }
                    this.$showToast({
                        type:res.code==1?'success':'fail',
                        message:res.msg
                    })
                })
            },
            /*登录*/
            login(){
                var params  = {
                    uuid:this.formData.captcha_token,
                    phone:this.formData.phone,
                    sms_code:this.formData.sms_code,
                    uid:this.$store.state.uid
                }
                smsLogin(params).then((res)=>{
                    if(res.code==1){
                        localStorage.token =res.data.token;
                        this.$store.commit('getToken',res.data.token);
                        setCookie('userPhone',this.formData.phone)
                       // this.$store.commit('setRefreshTouch',true)
                        this.$store.commit('setShowLogin',false)//关闭弹窗
                        /*登录成功 全局通知重载当前页*/
                        this.$store.commit('setRefreshPage',false)

                        this.$nextTick(()=>{
                            window.scrollTo(0,0)
                        })
                    }
                    this.$showToast({
                        type:res.code==1?'success':'fail',
                        message:res.msg
                    })
                })
            },
            loginCancle(){
                this.$store.commit('setShowLogin',false)
            },
            /*复制*/
            copyName(copytype){
                var self = this;
                function copyText(copyVal,cb) {
                    var oInput = document.createElement('input');
                    oInput.value = copyVal;
                    oInput.setAttribute("readonly", "readonly");

                    document.body.appendChild(oInput);
                    oInput.select(); // 选择对象
                    oInput.setSelectionRange(0, 9999);
                    document.execCommand("Copy"); // 执行浏览器复制命令

                    oInput.className = 'oInput';
                    oInput.style.display='none';
                    if(cb){cb()}
                }

                if(copytype==1){
                    copyText(this.open_wechat.open_wechat_name,function () {
                        self.$showToast({
                            message:'复制成功',
                            duration:800
                        })
                    })
                }else{
                    copyText(this.wechat.wechat_name,function () {
                        self.$showToast({
                            message:'复制成功',
                            duration:800
                        })
                    })
                }
            }
        },
        watch:{
		    /*'vconDom':function (val) {
		        console.log(val)
            }*/
        }
	}
</script>
<style>
    /*vconsole*/
    #__vconsole{
       display: none;
    }
</style>
<style lang="less" scoped>

    /*客服style*/
    .customBox{
        font-size: 0.3rem;width:6rem;background: #fff;border-radius: 0.2rem;overflow:hidden;
        .select{
            display: flex;justify-content: space-around;height: 0.88rem;font-size: 0.3rem;align-items: center;
            .item{
                color: #C1C9FF;border-right: 1px solid #d0d0d0;flex: 1;text-align: center;height: 0.5rem;line-height: 0.5rem;
            }
            .item.active{
                color: #667FFe;
            }
        }
        .content{
            margin-top: 0.5rem;
            .code{
                text-align: center;
                img{
                    width: 2.62rem;
                }
            }
            .copyBtn{
                text-align: center;margin: 0.75rem 0 0.8rem;
                span{
                    display: inline-block;margin: 0 auto; height: 0.48rem;line-height: 0.48rem;text-align: center;padding: 0 0.33rem;background: #596DFF;color:#fff;border-radius: 0.1rem
                }
            }
        }
    }
    .homeBtn{
        position: fixed;right: 0.32rem;bottom: 2rem;z-index: 998;
        .someBtn{
            width: 0.8rem;height: 0.8rem; background:rgba(89,109,255,0.2);border-radius:0.4rem;text-align: center;line-height: 1rem;
            margin-top: 0.3rem ;
        }
    }
    /*登录框style*/
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
</style>
