<template>
    <div class="promotionPage" >
        <div class="rule" @click="ruleshow">规则</div>
        <div class="invite" >
            <div class="user_tgMsg">
                <span class="value">{{userPromptionData.revenue}}</span><br/>
                <span class="label">我的收入（元）</span><br/>
            </div>
            <div class="user_tgMsg">
                <span class="value">{{userPromptionData.referrerNum}}</span><br/>
                <span class="label">邀请人数</span><br/>
            </div>
        </div>
        <div class="tuigBottom"  @click="atonceInvite" >
            <span>立即邀请赚钱</span> <img :src="btn_right" alt="">
        </div>
        <flypopup  v-model="rule_dialogVisible" :clickMarkerHidden="false">
           <div style="position:relative;background: transparent;width: 5rem">
              <div  style="padding: 0.3rem 0.2rem;" v-html="userPromptionData.rule"></div>
               <svg-icon
                   @click.native="closeTips"
                   :iconClass="'close'"
                   :iconStyle="{fontSize:'30px',color:'#fff',position:'absolute',bottom:'-30px',left:'50%',marginLeft:'-15px'}"
               ></svg-icon>
           </div>
        </flypopup>

    </div>
</template>

<script>
    /*推广*/
    import {getUserPromotion,getShareUrl} from '@/api/api'
	export default {
		name: "promotion",
        data(){
		    return {
                tuigCancle:require('@/assets/tuig_cancle.png'),
                tuigBtn:require('@/assets/tuigBtn.png'),
                btn_right:require('@/assets/btn_right.png'),
                rule_dialogVisible:false,
                userPromptionData:{},
                query:{},
          }
        },
        mounted(){
            function getUrlQuery(url){
                if(url.split('?').length<=1)return{};
                let queryString =  url.split('?')[1].split('&')
                let obj = {}
                for(let i in queryString){
                    var name = queryString[i].split('=')[0];
                    var value = queryString[i].split('=')[1];
                    obj[name] = value
                };
                return obj
            }
            getUserPromotion().then((res)=>{
                if(res.code==1){
                    this.userPromptionData = res.data
                }
            })
            getShareUrl().then((res)=>{
                if(res.code==1){
                    getUrlQuery(res.data.referrer_img);
                   this.query = {
                       p: getUrlQuery(res.data.referrer_img)['p'],
                       u: getUrlQuery(res.data.referrer_img)['u'],
                       logo:decodeURIComponent(res.data.logo),
                       introduction:res.data.introduction,
                       referrer_url:res.data.referrer_url,
                       share_img:res.data.share_img
                   };
                }
            })
        },
        methods:{
		    closeTips(){
                this.rule_dialogVisible=!this.rule_dialogVisible
            },
            goLogin(){
                this.$dialog.confirm({
                    title: '提示',
                    message: '未登录，前去登录？'
                }).then(() => {
                    if(this.$store.state.client =='ios'){
                        try{
                            window.webkit.messageHandlers.NativeLogin.postMessage({isLogin:true})
                        }catch(e){
                        }
                    }else if(this.$store.state.client =='android'){
                        try{
                            window.android.NativeLogin();
                        }catch(e){
                        }
                    }else{
                        window.location.href = ''
                    }
                }).catch(() => {
                });
            },
            atonceInvite(){
		        if(this.$store.state.globalIsLogin){//登录
                    if(this.query.share_img&&this.query.share_img!=''){
                        this.$goRouter({name:'share',query:this.query})
                    }else{
                        this.$showToast({
                            type:'loading',
                            message:'暂无推广'
                        });
                    }
                }else{
                    this.goLogin()
                }
            },
            ruleshow(){
                if(this.$store.state.globalIsLogin) {//登录
                    this.rule_dialogVisible=true
                }else{
                    this.goLogin()
                }

            }
        }
	}
</script>

<style scoped lang="less">
    .promotionPage{
        overflow: hidden;
        position: relative;
        height:19.23rem;
        background:url("../../assets/tuigBg.png") left center no-repeat;
        background-size: 100% 100%;
    }
    .rule{
        color:#fff;
        font-size: 0.28rem;
        position: absolute;
        top:0.2rem;
        right: 0.2rem;
    }
    .invite{
        position:absolute;
        top: 8.8rem;
        width:6.86rem;
        margin-left: -3.43rem;
        left: 50%;
        font-size: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .user_tgMsg{
        width:2.5rem;
        height: 2rem;
        color:#fff;
        text-align: center;
        background: -webkit-linear-gradient(#6BD3FF,#846BFB);
        background: -o-linear-gradient(#6BD3FF,#846BFB);
        background: -moz-linear-gradient(#6BD3FF,#846BFB);
        background: linear-gradient(#6BD3FF,#846BFB);

        border-radius: 0.2rem;
        span{
            display: inline-block;
        }
        .value{
            line-height: 1em;
            margin-top: 0.5rem;
            font-size: 0.6rem;

        }
        .label{
            line-height: 1em;
            margin-top: 0.2rem;
            font-size: 0.3rem;
        }
    }
    .tuigBottom{
        position: absolute;
        bottom:0;
        left: 0;
        right:0;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        color:#fff;
        background: -webkit-linear-gradient(left,#6BD3FF,#846BFB);
        background: -o-linear-gradient(right,#6BD3FF,#846BFB);
        background: -moz-linear-gradient(right,#6BD3FF,#846BFB);
        background: linear-gradient(to right,#6BD3FF,#846BFB);

        &>span{
            font-size: 0.36rem;
            vertical-align: middle;
        }
        img{
            vertical-align: middle;
            width:0.3rem;margin-left: 0.1rem;
        }
    }
</style>
