<template>
    <div class="regPage">
        <div style="text-align: center;margin-top: 0.2rem">
            <p style="font-size:0.28rem;color:#fff;line-height: 1em;">来查信用</p>
            <p style="font-size:0.14rem;color:#fff;line-height: 1em;">因为专业所以信赖</p>
            <img :src="reg_dec" alt="" style="width:4.67rem;margin: 0 auto;margin-top: 1.2rem">
            <div class="" style="display: inline-block;margin-top:0.3rem; padding: 0 0.18rem;height: 0.4rem;line-height: 0.4rem;font-size:0.28rem;color:#566ff5;border-radius: 0.2rem;background: #fff">
                一秒查清拒贷原因，覆盖全国90%网贷平台
            </div>
        </div>
        <div class="reg_input">
            <div class="inputArea">
                <input v-model="formData.phone" type="text" placeholder="请输入手机号" @blur="phoneBlurReg">
                <transition name="inputErrtips">
                    <span class="inputErrtips" v-show="showPhoneErr">手机号格式不正确</span>
                </transition>
            </div>
            <div class="inputArea">
                <input v-model="formData.password" :type="passwordType" placeholder="请输入注册密码(6-20位字符)" @blur="passwordBlurReg">
                <span style="margin-right: 0.24rem" class="iconfont" :class="isShowpas?'icon-zhengyan':'icon-biyan'" @click="showPassword"></span>
                <transition name="inputErrtips">
                    <span class="inputErrtips" v-show="showPasswordErr">密码格式不正确</span>
                </transition>
            </div>
            <div class="inputArea">
                <input v-model="formData.phoneCode" type="text" placeholder="请输入手机验证码" >
                <span style="display: inline-block;height: 0.6rem;line-height: 0.6rem;background: #a1aed1;padding: 0 0.3rem;border-radius:0.3rem;color:#fdfeff;" @click="getVerification">{{phonecodeTips}}</span>
            </div>
            <div style="margin-left: 0.3rem" >
                <img :src="agree_regXY?reg_agree:reg_noagree" alt="" style="width:0.24rem;vertical-align: middle;" @click="agree_regXY=!agree_regXY">
                <span @click="$goRouter('/regAgreement')" style="vertical-align: middle;">同意来查信用注册协议</span>
            </div>
            <div class="reg_btn" @click="reg_submit">
                立即注册
            </div>
        </div>
        <div class="Introduction">
            <div class="title">
                <img :src="reg_pro" alt="" style="width:0.81rem;">
                <span>多种产品，满足你的不同需求</span>
                <img :src="reg_pro" alt="" style="width:0.81rem;transform: rotate(180deg)">
            </div>
            <!--<div class="pro_dec_item">
                <h5 class="item_title">多头借贷全方位深度查询</h5>
                <p class="dec">各种多头借贷名单，覆盖全网90%的网贷平台</p>
                <p class="dec">全方位深度查询，信用行为综合评估</p>
            </div>-->
            <div class="pro_dec_item">
                <h5 class="item_title">综合风险核查基础版</h5>
                <p class="dec">分析评估各项信贷风险信息</p>
                <p class="dec">全方位检测借贷、逾期情况，信用行为综合评估</p>
            </div>

            <div class="pro_dec_item">
                <h5 class="item_title">大数据信用简版查询</h5>
                <p class="dec">大数据核心风险项，多维度直击拒贷风险</p>
                <p class="dec">快速识别设备风险，查找网贷黑名单</p>
            </div>
            <div class="pro_dec_item">
                <h5 class="item_title">运营商数据报告</h5>
                <p class="dec">运营商数据分析，是否被手机所出卖</p>
                <p class="dec">快速排查高风险联系人，解锁申贷高通过新姿势</p>
            </div>
            <div class="pro_dec_item">
                <h5 class="item_title">银行流水及网银信用卡数据分析</h5>
                <p class="dec">银行流水详细报告，收入支出一目了然</p>
                <p class="dec">欠贷还贷逾期详细数据报告</p>
            </div>
            <div class="pro_dec_item">
                <h5 class="item_title">邮箱信用卡账单数据分析</h5>
                <p class="dec">信用卡账单详细报告，提现消费数据分析</p>
                <p class="dec">信用数据报告分析，信用额度评估</p>
            </div>
        </div>
        <div class="reg_bottom">
            <p>因为专业所以信赖</p>
            <p>来查信用</p>
            <div class="logo">
                <img :src="logo" alt="">
            </div>
        </div>
        <flypopup   v-model="imgcodeShow"  :clickMarkerHidden="false" :popupStyle="{borderRadius: '0.2rem'}">
            <div style="width: 5.5rem;background: #fff;border-radius: 0.2rem">
                <div style="font-size: 0.3rem;color:#444;text-align: center;line-height: 0.6rem;">图片码校验</div>
                <div class="dialog_input" >
                    <input v-model="formData.imgCode" type="text" placeholder="请输入图形验证码" >
                    <img :src="imgVeryUrl" alt="" @click="updateImg">
                </div>
                <div class="history_btn" >
                    <a class="btn_item" @click="Cancle">取消</a>
                    <a class="btn_line" ></a>
                    <a class="btn_item" @click="sendPhonecode">确定</a>
                </div>
            </div>
        </flypopup>
    </div>
</template>

<script>
    import {isPoneAvailable,hasChn,randomWord,getQuery} from  '@/js/util'
    import {reg,  ImgCode , getPhoneCode} from '@/api/api'
	export default {
		name: "registered",
        data(){
		    return {
		        regBg:require('@/assets/reg_bg.png'),
                reg_dec:require('@/assets/reg_bg_dec.png'),
                reg_agree:require('@/assets/reg_select.png'),
                reg_noagree:require('@/assets/reg_select_no.png'),
                reg_pro:require('@/assets/reg_title_icon.png'),
                logo:require('@/assets/zxIconActive.png'),

                formData:{
		            phone:'',
                    password:'',
                    phoneCode:'',
                    imgCode:'',
                },
                agree_regXY:true,
                isShowpas:false,
                passwordType:'password',
                showPhoneErr:false,
                showPasswordErr:false,
                imgcodeShow:false,
                phoneCodesend:false,
                imgVeryUrl:'',
                phonecodeTips:'获取验证码',
                uuid:randomWord(false,32)
            }
        },
        mounted(){
		    this.imgVeryUrl = ImgCode+'?uuid='+this.uuid+'&random='+new Date()
        },

        methods:{
            updateImg(){
                this.imgVeryUrl = ImgCode+'?uuid='+this.uuid+'&random='+new Date()
            },
            Cancle(){
                this.imgcodeShow = false;
            },
            phoneBlurReg(e){
                if(!isPoneAvailable(e.target.value)){
                    this.showPhoneErr  = true
                }else{
                    this.showPhoneErr  = false
                }
            },
            passwordBlurReg(e){
                if(hasChn(e.target.value)||e.target.value.length<6||e.target.value.length>20){
                    this.showPasswordErr  = true
                }else{
                    this.showPasswordErr  = false
                }
            },
            showPassword(){
                this.isShowpas = !this.isShowpas;
                this.passwordType = this.isShowpas?'text':'password'
            },
           /* beforeClose(action, done) {
                let self  = this;
                if (action === 'confirm') {
                    var params = {
                        uuid:this.uuid,
                        phone:this.formData.phone,
                        img_code:this.formData.imgCode,
                        type:'register'
                    }
                    getPhoneCode(params).then((res)=>{
                        if(res.code==1){
                            var num = 60;
                            this.phoneCodesend = true;
                            var timer = setInterval(()=>{

                                if(num<=0){
                                    clearInterval(timer)
                                    self.phonecodeTips = '发送验证码'
                                    self.phoneCodesend = false;
                                    return false;
                                }
                                self.phonecodeTips = num+'s后重新发送'
                                num--;
                            },1000);
                            done()
                        }else{
                            this.$toast({
                                type:'fail',
                                position:'center',
                                message:res.msg,
                                duration:2000
                            });
                            done(false)
                        }
                    })

                } else {
                    done();
                }
            },*/
           sendPhonecode(){
               let self  = this;
               var params = {
                   uuid:this.uuid,
                   phone:this.formData.phone,
                   img_code:this.formData.imgCode,
                   type:'register'
               }
               getPhoneCode(params).then((res)=>{
                   if(res.code==1){
                       var num = 60;
                       this.imgcodeShow = false;
                       this.phoneCodesend = true;
                       var timer = setInterval(()=>{

                           if(num<=0){
                               clearInterval(timer)
                               self.phonecodeTips = '发送验证码'
                               self.phoneCodesend = false;
                               return false;
                           }
                           self.phonecodeTips = num+'s后重新发送'
                           num--;
                       },1000);

                   }else{
                       this.imgcodeShow = true;
                       this.$toast({
                           type:'fail',
                           position:'center',
                           message:res.msg,
                           duration:2000
                       });
                   }
               })
           },
            getVerification(){
                var self = this;
                if(this.phoneCodesend)return;//60内不可点击
                function toast(message) {
                    self.$toast({
                        type:'fail',
                        position:'center',
                        mask:false,
                        message:message,
                        duration:2000
                    });
                }
                if(!this.agree_regXY){
                    toast('同意注册协议')
                    return;
                }
                if(this.formData.phone==''||this.showPhoneErr){
                    toast('手机号格式错误');
                    return;
                }
                if(this.formData.password==''||this.showPasswordErr){
                    toast('密码格式错误');
                    return;
                }
                this.imgcodeShow = true
            },
            reg_submit(){

                var referrer = getQuery()['referrer']?getQuery()['referrer']:''
                var self =this;
                function toast(message) {
                    self.$toast({
                        type:'fail',
                        position:'center',
                        mask:false,
                        message:message,
                        duration:2000
                    });
                }
                if(!this.agree_regXY){
                    toast('同意注册协议')
                    return;
                }
                if(this.formData.phone==''||this.showPhoneErr){
                    toast('手机号格式错误');
                    return;
                }
                if(this.formData.password==''||this.showPasswordErr){
                    toast('密码格式错误');
                    return;
                }
                if(this.formData.phoneCode==''){
                    toast('验证码不能为空');
                    return;
                }
                var params = {
                    phone:this.formData.phone,
                    sms_code:this.formData.phoneCode,
                    password:this.formData.password,
                    uuid:this.uuid,
                    referrer:referrer
                }
                reg(params).then((res)=>{
                    if(res.code==1){
                        this.$toast({
                            type:'success',
                            position:'center',
                            message:'注册成功',
                            duration:2000
                        });
                    }else{
                        this.$toast({
                            type:'fail',
                            position:'center',
                            message:res.msg,
                            duration:2000
                        });
                    }
                })
            }
        }
	}
</script>

<style scoped lang="less">
    .regPage{
        overflow: hidden;
        position: relative;
        height: 28.2rem;
        background: url('../../assets/reg_bg.png')left center no-repeat;
        background-size: 100%;
        padding: 0 0.3rem;
    }
    .reg_btn{
        color:#fff;
        font-size: 0.36rem;
        height: 0.8rem;
        border-radius:0.4rem;
        line-height: 0.8rem;
        text-align: center;
        margin-top: 0.3rem;
        background: -webkit-gradient(left, #fece02,#fa824d );
        background: -moz-linear-gradient(right,  #fece02,#fa824d);
        background: -o-linear-gradient(right, #fece02,#fa824d);
        background: linear-gradient(to right, #fece02,#fa824d);
    }
    .Introduction{
        margin-top: 0.5rem;
        border-radius:0.2rem;
        background: #fff;
        padding: 0.4rem;
        .title{
            display: flex;
            justify-content: space-between;
            align-items: center;

            span{
                font-size:0.32rem;
                font-weight: 600;
                color:#535353;
            }
        }
        .pro_dec_item{
            background: #dbe2ff;
            margin-top: 0.3rem;
            padding: 0.25rem 0;
            border-radius:0.2rem;
            .item_title{
                padding-left: 0.32rem;
                display: inline-block;
                font-size: 0.3rem;
                height: 0.4rem;
                line-height: 0.4rem;
                color:#fff;
                background: #fea10c;
                &:after{
                    content: '';
                    display: inline-block;
                    border-width: 0.2rem;
                    border-left-color: transparent;
                    border-bottom-color: transparent;
                    border-top-color:transparent ;
                    border-right-color:#dbe2ff ;
                    border-style:solid;
                    vertical-align: sub;
                }
            }
            p{
                padding-left: 0.32rem;
                font-size: 0.24rem;
                color:#5b5b5b;
                line-height: 1em;
            }
            p:nth-of-type(1){
                margin-top: 0.15rem;
            }
            p:nth-of-type(2){
                margin-top: 0.22rem;
            }
        }
    }
    .reg_bottom{
        margin-top: 0.6rem;
        text-align: center ;
        p{
            line-height: 1em;
            font-size: 0.36rem;
            color:#fff;
            margin-bottom: 0.2rem;
        }
        .logo{
            height: 0.8rem;
            width: 0.8rem;
            border-radius: 0.16rem;
            background: #fff;
          margin: 0 auto;
            img{
                margin-top: 0.1rem;
                width:0.6rem
            }
        }

    }
    .reg_input{
        margin-top: 3.1rem;
        border-radius:0.2rem;
        background: #fff;
        padding: 0.4rem;
    }
    .inputArea{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 0.8rem;
        background: #dbe2ff;
        margin-bottom: 0.3rem;
        position: relative;
        padding:0 0.1rem 0 0.32rem ;
        border-radius: 0.4rem;
        color:#5b5b5b;
        input{
            height: 0.8rem;
            background: transparent;
            flex-grow: 1;
        }
        input::placeholder{
            color:#5b5b5b;
            font-weight: lighter;
            font-size: 0.24rem;
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
    .dialog_input{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 0.8rem;
        background: #dbe2ff;

        position: relative;
        padding:0 0.1rem 0 0.32rem ;
        margin-top: 0.2rem;
        box-sizing: border-box;
        color:#5b5b5b;
        input{
            height: 0.8rem;
            background: transparent;
            flex-grow: 1;
        }
        input::placeholder{
            color:#5b5b5b;
            font-weight: lighter;
            font-size: 0.24rem;
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
    .history_btn{
        height: 0.88rem;display: flex;justify-content: flex-start;align-items: center;margin-top: 0.3rem;
        .btn_item{
            height: 0.88rem;line-height:0.88rem;text-align:center;width:2.35rem;
        }
        .btn_line{
            height: 0.5rem;background: #D0D0D0;width: 1px;
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
</style>
