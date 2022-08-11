<template>
    <div style="background: #33247E">
     <!--  <div
           class="posterPage"
           :style="{ backgroundImage:'url('+$route.query.share_img+')', backgroundSize:'100% 100%'}" >-->
        <div  class="posterPage">
           <img :src="$route.query.share_img" alt="" style="width: 100%">
          <!-- <div class="tipImg"  v-if="showYD">
               <div class="img_t" style="">
                   <img src="@/assets/thred_inq/shareTipImg.png" alt="" >
               </div>
               <div class="img_b" style="" @click="showYD=false">
                   <img src="@/assets/shareKnow.png" alt="" >
               </div>
           </div>
           <div v-if="$store.state.client=='h5'" class="copyUrl" @click="copyShare">复制链接</div>-->
        </div>
    </div>


</template>

<script>
    import {getUserSharePng} from '@/api/api'
    import {getQuery} from "@/js/util";
    export default {
        name: "share",
        data(){
            return {
                regUrl:'',
                referrer_url:'',
                referrer:'',
                showYD:true
            }
        },
        activated(){},//keepalive进入
        deactivated(){},//keepalive离开
        beforeRouteEnter(to,from,next){
            next(vm=>{
                let self = vm
                if(self.$store.state.client=='ios'){
                    try{
                        window.webkit.messageHandlers.enterQRcode.postMessage({isenter:true})
                    }catch (e) {
                    }
                }else if(self.$store.state.client=='android'){
                    try{
                        var androidParams = {isenter:true}
                        window.android.enterQRcode(JSON.stringify(androidParams))
                    }catch (e) {
                    }
                }
            })



        },
        beforeRouteLeave(to,from,next){
            if(this.$store.state.client=='ios'){
                try{
                    window.webkit.messageHandlers.enterQRcode.postMessage({isenter:false})
                }catch (e) {
                }
            }else if(this.$store.state.client=='android'){
                try{
                    var androidParams = {isenter:false}
                    window.android.enterQRcode(JSON.stringify(androidParams))
                }catch (e) {
                }
            }
            next()
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
            };
            this.referrer_url =decodeURIComponent(this.$route.query.referrer_url);
            this.referrer = getUrlQuery(this.referrer_url)['referrer'];

            this.$nextTick(()=>{
                /*客户端传递数据*/
                if(this.$store.state.client=='ios'){
                    try{
                        window.webkit.messageHandlers.ZxShare.postMessage({
                            imgUrl:this.$route.query.share_img,
                            shareUrl:this.referrer_url})
                    }catch (e) {
                    }
                }else if(this.$store.state.client=='android'){
                    try {
                        let androidParams = {
                            imgUrl:this.$route.query.share_img,
                            shareUrl:this.referrer_url,
                            logo:decodeURIComponent(this.$route.query.logo),
                            introduction:this.$route.query.introduction
                        };
                        window.android.ZxShare(JSON.stringify(androidParams))
                    }catch (e) {

                    }
                }
            })
        },
        methods:{
            copyShare(){
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
                };
                copyText(this.referrer_url,function () {
                    self.$showToast({message:'复制成功，赶紧去分享吧'})
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .posterPage{
        display: inline-block;
        position: relative;
        height:13.34rem;
        width: 100%;
        background-repeat:no-repeat;
        background-position:top center;
        .code{
            position: absolute;
            display: inline-block;
            top: 44%;
            left: 50%;
            width: 2rem;
            margin-left: -1rem;
            img{
                width: 2rem;
            }
        }
        .tipImg{
            position:fixed;top: 0;bottom: 0;width: 100%;left: 0;background: rgba(0,0,0,0.6);
            .img_t{
                text-align: center;margin-top: 4rem;
                img{
                    width: 5.28rem;
                }
            }
            .img_b{
                text-align: center;margin-top: 1rem;
                img{
                    width: 2.35rem
                }
            }
        }
        .copyUrl{
            width: 4rem;
            height: 0.8rem;
            line-height: 0.8rem;
            background:rgba(255,255,255,.8) ;
            color:#6439f1;
            border-radius: 0.4rem;
            padding: 0 0.4rem;
            text-align: center;
            font-size: 0.32rem;
            position: absolute;
            bottom: 1.5rem;
            left: 50%;
            box-sizing: border-box;
            margin-left: -2rem;
        }
    }
</style>
