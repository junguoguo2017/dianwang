<template>
    <div >
        <div class="reportCon" style="position:relative;">
            <div v-if="!noReportData" >
                <Consumption
                        v-if="roport_type=='upa'"
                        :reportData="reportData"
                        :order_no="orderData.order_no"
                        :orderData="orderData"
                />
                <miGuan
                    v-if="roport_type=='miGuan'"
                    :reportData="reportData"
                    :order_no="orderData.order_no"
                ></miGuan>
                <miGuanV3
                    v-if="roport_type=='miGuanV3'"
                    :reportData="reportData"
                    :order_no="orderData.order_no"
                    :orderData="orderData"
                ></miGuanV3>
                <xinYan
                    v-if="roport_type=='xinYan'"
                    :reportData="reportData"
                    :order_no="orderData.order_no"
                ></xinYan>
                <!--<comprehensiveRisk
                    v-if="roport_type=='xinYan'"
                    :reportData="reportData"
                    :order_no="orderData.order_no"
                >
                </comprehensiveRisk>-->
                <moXieMail
                    v-if="roport_type=='moXieMail'"
                    :reportData="reportData"
                    :order_no="orderData.order_no"
                    @link_topay="link_topay"></moXieMail>
                <moXieCarrier
                    v-if="roport_type=='moXieCarrier'"
                    :reportData="reportData"
                    :order_no="orderData.order_no"
                    @link_topay="link_topay"
                ></moXieCarrier>
                <moXieBank
                    v-if="roport_type==='moXieBank'"
                    :reportData="reportData"
                    :target="reportData.target"
                    :order_no="orderData.order_no"
                    @link_topay="link_topay"
                ></moXieBank>
                <dingXiang
                    v-if="roport_type==='dingXiang'"
                    :reportData="reportData"
                    :target="reportData.target"
                    :order_no="orderData.order_no"
                    @link_topay="link_topay"
                >
                </dingXiang>
                <!-- <tongDun
                   v-if="roport_type==='tongDun'"
                   :reportData="reportData"
                   :target="reportData.target"
                   :orderData="orderData"
                   @link_topay="link_topay"
               >
               </tongDun>-->
                <newTongDun
                    v-if="roport_type==='tongDun'"
                    :reportData="reportData"
                    :target="reportData.target"
                    :orderData="orderData"
                    @link_topay="link_topay"
                ></newTongDun>
                <threeInOne
                    v-if="roport_type==='miGuanV3TongDunXinYan'"
                    :reportData="reportData"
                    :target="reportData.target"
                    :orderData="orderData"
                    @link_topay="link_topay">
                </threeInOne>
            </div>
            <div v-else  class="noReportImg">
                <img :src="noReportData_img" alt="">
                <p >未找到报告数据</p>
            </div>
            <div v-if="orderData.status==0&&orderData.report_status==1&&hasReport" class="pay_btn">
                <span @click="link_topay(1)">支付{{orderData.amount}}元，以查看报告详情</span>
            </div>
            <!--<div style="position: fixed;left: 0;top: 0;bottom: 0;right: 0;background: rgba(0,0,0,.4)"></div>-->
            <div v-if="orderData.status==0&&orderData.report_status==''&&hasReport" class="pay_btn">
                <span @click="link_topay(1)">支付{{orderData.amount}}元，生成报告</span>
            </div>
            <div v-if="!hasReport" class="pay_btn">
                <span @click="link_topay(2)">重新下单</span>
            </div>
            <div class="bottom" v-if="false&&!noReportData">
                <div  class="code" style="margin-bottom: 0">
                    <img :src="gzimgurl" alt="">
                </div>
                <div v-if="$store.state.client=='h5'">
                    <div class="title" style="margin-top: 0.3rem">报告数据说明</div>
                    <p>{{reportData.foor_text}}</p>
                    <p style="padding-bottom: 0.3rem">本报告仅供参考使用，如果您对报告有异议，出于对合作平台隐私的保护来查信用不对数据来源做任何解释。</p>
                    <!--  <div class="company_name">安徽奋腾网络传媒有限公司</div>-->
                </div>

            </div>
        </div>

        <van-actionsheet
            v-model="shareImg"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
        />
    </div>
</template>

<script>
    import miGuan from './reportType/miGuan'
    import miGuanV3 from './reportType/new_miGuan/index'
    import xinYan from './reportType/xinYan'
    import moXieMail from './reportType/moXieMail'
    import moXieCarrier from './reportType/moXieCarrier'
    import moXieBank from './reportType/moXieBank'
    import dingXiang from './reportType/dingXiang'
    import tongDun from './reportType/tongDun/index'
    import newTongDun from './reportType/newTongDun/index'
    import comprehensiveRisk from './reportType/comprehensiveRisk'
    import threeInOne from './reportType/threeInOne/index'
    import Consumption from './reportType/consumption/index'
    import html2canvas from 'html2canvas';
    import {getGenerate,upLoadReportImg} from '@/api/api'
    import {getQuery} from '@/js/util'
	export default {
		name: "report",
        components:{
            miGuan,
            miGuanV3,
            xinYan,
            moXieMail,
            moXieCarrier,
            moXieBank,
            comprehensiveRisk,
            dingXiang,
            tongDun,
            threeInOne,
            newTongDun,
            Consumption
        },
        data(){
            return {
                noReportData_img:require('@/assets/noReportData.png'),
                noReportData:true,
                createTime:'',
                reportData:{},
                orderData:{},
                gzimgurl:'',
                roport_type:'',
                activeNames: [],
                client:'h5',
                loadingData:true,
                watingReloding:5,
                hasReport:true,
                shareImg:false,
                actions: [
                    {
                        name: '保存图片分享',
                        type:1
                    },
                ],
                isScrollBottom:false,//页面渲染是否已经加载完毕
            }
        },
        activated(){//keepalive进入
        },
        deactivated(){},//keepalive离开
        beforeRouteLeave(to,from,next){
            next()
        },
        created(){
		    window.saveReportImg  = this.saveReportImg;
            window.addEventListener('scroll',()=>{
                if(this.isScrollBottom)return;
                let scrollTop = document.documentElement.scrollTop||document.body.scrollTop ;
                let clientHeight = document.documentElement.clientHeight || document.body.clientHeight ;
                let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight ;
                if(Math.ceil(scrollTop+clientHeight) == scrollHeight){
                    console.log("到底部了")
                    this.isScrollBottom = true;//页面是否加载完毕了
                }
            });
        },
        mounted(){
		    var self = this;
		    this.$nextTick(()=>{
                this.toast = this.$toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration:0
                });
            });
            if(this.$route.query.order_no=='default'){
                this.$store.dispatch('setCurrentTitle','样例报告')
                /*获取样例数据*/
                self.getGenerateData()
            }else{
                this.$store.dispatch('isRepostFirstShow',this.$route.query.order_no).then((isFirst)=>{
                    console.log(this.$route.query.order_no,isFirst)
                    if(isFirst){//首次加载
                        setTimeout(()=>{
                            /*获取报告数据*/
                            self.getGenerateData();
                        },3000)
                    } else{
                        /*获取报告数据*/
                        self.getGenerateData()
                    }
                })

            }
            this.client = getQuery()['client']?getQuery()['client']:"h5";
        },
        methods:{
            Download(){
                //cavas 保存图片到本地  js 实现
                //------------------------------------------------------------------------
                //1.确定图片的类型  获取到的图片格式 data:image/Png;base64,......
                var type ='jpg';//你想要什么图片格式 就选什么吧
                var d=document.getElementById("cavasimg");
                var imgdata=d.toDataURL(type);
                //2.0 将mime-type改为image/octet-stream,强制让浏览器下载
                var fixtype=function(type){
                    type=type.toLocaleLowerCase().replace(/jpg/i,'jpeg');
                    var r=type.match(/png|jpeg|bmp|gif/)[0];
                    return 'image/'+r;
                };
                imgdata=imgdata.replace(fixtype(type),'image/octet-stream');
                //3.0 将图片保存到本地
                var savaFile=function(data,filename)
                {
                    var save_link=document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                    save_link.href=data;
                    save_link.download=filename;
                    var event=document.createEvent('MouseEvents');
                    event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
                    save_link.dispatchEvent(event);
                };
                var filename=''+new Date().getSeconds()+'.'+type;
                //我想用当前秒是可以解决重名的问题了 不行你就换成毫秒
                savaFile(imgdata,filename);
            },



		    /*报告页截屏*/
            saveReportImg(){
                this.loadingToast = this.$toast.loading({
                    mask: true,
                    message: '正在生成报告。。。',
                    duration: 0
                });
                if(this.isScrollBottom==false){
                    var t = document.body.clientHeight;
                    window.scroll({ top: t, left: 0, behavior: 'smooth' })
                    this.$showToast({
                        message:'请先等待页面滚动到底部，以保证加载完毕后再操作保存！！',
                        duration:2500
                    })
                    return
                }

                let canvas = document.querySelector('.reportCon');
                let that = this;
                html2canvas(canvas,{useCORS: true,
                    scale: 2, logging: false}).then(function(canvas) {
                    let type = 'png';
                    let imgData = canvas.toDataURL(type);
                    // 照片格式处理
                    let _fixType = function(type) {
                        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                        let r = type.match(/png|jpeg|bmp|gif/)[0];
                        return 'image/' + r;
                    };
                    imgData = imgData.replace(_fixType(type),'image/png');
                    let filename = that.$route.meta.title + '.' + type;
                    if(that.$store.state.client=='ios'){
                        try{
                            function convertBase64UrlToBlob(urlData) {//二进制装换
                                const bytes = window.atob(urlData.split(',')[1]);        // 去掉url的头，并转换为byte
                                // 处理异常,将ascii码小于0的转换为大于0
                                const ab = new ArrayBuffer(bytes.length);
                                const ia = new Uint8Array(ab);
                                for (let i = 0; i < bytes.length; i++) {
                                    ia[i] = bytes.charCodeAt(i);
                                }
                                return new Blob([ab], { type: 'image/png' });
                            };
                            that.loadingToast.clear()
                            window.webkit.messageHandlers.GETIMG.postMessage({imgData:imgData})
                        }catch (e) {
                        }
                    }else if(that.$store.state.client=='android'){
                        that.loadingToast.clear()
                        let androidJsonImgData = JSON.stringify({imgData:imgData})
                        window.android.GETIMG(androidJsonImgData)
                    }else{
                        that.saveFile(imgData,filename);
                    }
                });
            },
            saveFile(data, filename){
               /*let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                save_link.href = data;
                save_link.download = filename;
                let event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                save_link.dispatchEvent(event);*/
                /*if(this.$route.query.order_no=='default'){
                    this.$showToast({message:'你还没有查询报告',duration:1500})
                    return;
                };*/


                upLoadReportImg({order_no:this.orderData.order_no,img:data}).then((res)=>{
                    this.loadingToast.clear()
                    if(res.code==1){
                        this.$dialog.confirm({
                            title: '提示',
                            message: '报告图片已生成，去长按保存试试！',
                            btn:{
                                ok:'确定',
                                no:'取消'
                            },
                            okbtn:function (done) {
                                window.location.href = res.data.url
                                done()
                            },
                            cancle:function (done) {
                                done()
                            }
                        })

                    }else{
                        this.$showToast('保存失败！！！')
                    }
                })

            },
            onSelect(item){
                if(item.type==1){
                    this.shareImg = false;
                    function isWeiXin() {//判断是否微信登陆
                        var ua = window.navigator.userAgent.toLowerCase();
                        if (ua.match(/MicroMessenger/i) == 'micromessenger'||ua.match(/QQ/i) == "qq") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                   /* if(isWeiXin()){
                        console.log("是来自微信内置浏览器")
                        this.$toast.fail('生成失败，打开浏览器生成');
                    }else{
                        console.log("不是来自微信内置浏览器")
                         this.saveReportImg()
                    }*/
                    this.saveReportImg()
                }
            },
            moreClick(){
                this.shareImg = !this.shareImg
            },
            setEvaluation_position(pos,scroe){
                var posTotal = document.querySelector('.evaluation_Visualization').offsetWidth;
                var pos = document.querySelector('.'+pos);
                var rate = (scroe/1000)*171
                pos.style.left=rate+'px'
            },
            getGenerateData(){
                let self = this;

               /* if(this.$route.query.category_id){
                    var params = {
                        category_id:this.$route.query.category_id,
                        order_no:this.$route.query.order_no
                    }
                }else{
                    var params = {
                        order_no:this.$route.query.order_no
                    }
                }*/
                var params = getQuery()
                getGenerate(params).then((res)=>{
                    if(this.toast.clear){
                        this.toast.clear()
                    }
                    if(res.code==1) {
                        this.orderData = res.order
                        this.roport_type = res.order.code;
                        this.createTime = res.order.order_time;

                        if (res.order.report_status == 0) {
                            if (this.orderData.is_before_pay==1) return
                            let reloadingToast = this.$toast.loading({
                                mask: true,
                                message: '报告正在生成...',
                                duration: 0
                            });
                            if (self.watingReloding <= 0) {
                                reloadingToast.clear()
                                this.$toast('加载超时，请联系客服');
                                clearTimeout(timer)
                                return
                            }
                            var timer = setTimeout(() => {//轮训 报告状态
                                self.watingReloding--
                                self.getGenerateData()
                            }, 2000)
                            return
                        } else if (res.order.report_status == -1) {
                            if (timer) {
                                clearTimeout(timer)
                            }
                            this.$toast('报告未找到，请联系客服');
                            return
                        }
                        /*报告成功 存在定时器清除*/
                        if (timer) {
                            clearTimeout(timer)
                        }
                        this.noReportData = false;
                        //直接付钱 未付款 data=>[] 需要进行处理
                        if( res.data instanceof  Array){
                            this.noReportData = true;
                        }
                        this.reportData = res.data;
                        if(this.orderData.is_audit==1||this.$route.query.is_audit==1){
                            this.reportData.data.carrier.call_contact_detail=null
                            this.reportData.data.miGuanV3.user_gray=null;
                        }
                        this.gzimgurl  = res.share_img
                    }else if(res.code==0){
                        this.$toast(res.msg);
                        this.hasReport = false
                    }
                })
            },
            link_topay(status){//未付款 去支付
                let routerPath = status==1?'inquiry_pay':'thirdPartyHome'
                if(this.$store.state.client =='ios'){
                    try{
                        window.webkit.messageHandlers.Native.postMessage({order_no:this.orderData.order_no,status:status})
                    }catch(e){
                        this.$goRouter({name:routerPath,query:{order_no:this.orderData.order_no}})
                    }
                }else if(this.$store.state.client =='android'){
                    try{
                        var androidParams = {order_no:this.orderData.order_no,status:status}
                        window.android.paymentOrder(JSON.stringify(androidParams));
                    }catch(e){
                        this.$goRouter({name:routerPath,query:{order_no:this.orderData.order_no}})
                    }
                }else{
                    this.$goRouter({name:routerPath,query:{order_no:this.orderData.order_no}})
                }
            },
            backClick() {
                if (this.$route.query.order_no == 'default') {
                    this.$router.goBack()
                } else {
                    this.$goRouter({name:'inq_history'})
                }
            }
        }
	}
</script>

<style lang="less">
    .reportItem-nodata{
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.28rem;
        font-weight: 500;
        color:#121c32;
        box-sizing: border-box;
    }
    /*底部公共*/
    .bottom{
        padding: 0 0.3rem;
        .code{
            margin: 0.8rem auto;
            text-align: center;
            img{
                width:3.4rem;
            }
        }
        .title{
            text-align: center;font-size: 0.3rem;font-weight: bold;color:#4a4a4a;margin-bottom: 0.2rem;
        }
        p{
            text-indent: 0.48rem;
            font-size: 0.24rem;
            color:#a9a9a9;
            line-height: 0.4rem;
        }
        .company_name{
            margin-top: 0.8rem;
            padding-bottom: 0.8rem;
            font-size: 0.24rem;
            color:#a9a9a9;
            text-align: center;
        }
    }
    .noReportImg{
        position: relative;
        padding-top: 3rem;
        text-align: center;
        img{
            width:5.98rem
        }
        p{
            color:#bbb;font-size: 0.28rem;text-align: center;width: 100%;margin-top: 3rem
        }
    }
    .reportHeader{
        padding: 0.3rem;
        background: #fff;
        position: relative;
        min-height: 2.2rem;
        p{
            font-size: 0.3rem;color:#4a4a4a;
            line-height: 0.48rem;
            &>span{
                color:#666;
                font-size: 0.3rem;
            }
        }
        .report_Certification{
            position: absolute;
            top:1.3rem;
            right:0.3rem;
        }
    }
    .report_tips{
        padding: 0.24rem 0.3rem;
        height: 1.43rem;
        box-sizing:border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &>img{
            width:0.8rem
        }
        .report_tips_con{
            line-height: 0.48rem;
            color:#666
        }
    }
    .reposrtItem{
        padding: 0 0.3rem;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #cff2ff;
        margin-bottom: 0.1rem;
        .title{
            span:nth-of-type(1){
                display: inline-block;
                height: 1rem;
                line-height: 1rem;
                font-size:0.36rem;
                font-weight: bold;
                color:#4a4a4a;
                vertical-align: middle;

                &:before{
                    content: '';
                    height: 1rem;
                    display: inline-block;
                    width: 0.08rem;
                    margin-right: 0.3rem;
                    background: #39b2ff;
                    vertical-align: top;
                }
            }
        }
        .subtitle{
            font-size: 0.28rem;
        }
    }
    .evaluation{
        padding: 0 0.3rem 0 0.6rem;
        height: 1.8rem;
        margin-top: 0.08rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item_num{
            height: 0.78rem;
            span{
                display: block;
            }
        }
        .evaluation_Visualization{
            height: 0.3rem;
            width:3.42rem;
            border-radius:0.15rem;
            background: -webkit-gradient(left, #ffc68b,#ff5f3b );
            background: -moz-linear-gradient(right,  #ffc68b,#ff5f3b);
            background: -o-linear-gradient(right, #ffc68b,#ff5f3b);
            background: linear-gradient(to right,#ffc68b,#ff5f3b);
            position: relative;
            &:before{
                position: absolute;
                left: 0;
                top: 0.35rem;
                color:#a9a9a9;
                font-size:0.2rem;
                content: '0';
            }
            &:after{
                position: absolute;
                right: 0;
                top: 0.35rem;
                color:#a9a9a9;
                font-size:0.2rem;
                content: '1000';
            }
            .evaluation_position{
                position: absolute;
                height: 1rem;
                top:-0.7rem;
                left: -0.1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                span:nth-of-type(1){
                    font-size: 0.2rem;
                    color: #666666;
                }
                .sanjiao{
                    height: 0;
                    width:0;
                    border-width: 0.2rem;
                    border-style: solid;
                    border-color: #ff5f3b transparent transparent transparent;
                }
            }

        }
    }
    .analysisWrods{
        font-size: 0.24rem;color:#a9a9a9;line-height: 0.34rem;margin-top: 0.5rem;
        .pay_showRP{
            text-align: right;
            margin-top: 0.2rem;
            span{
                display: inline-block;
                border: 1px solid #ff5f3b;
                font-size: 0.24rem;
                border-radius: 0.06rem;
                line-height: 0.4rem;
                padding: 0 0.2rem;
                color:#ff5f3b;
            }


        }
    }
    .pay_btn{
        position: fixed;
        bottom:0.5rem;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 99;
        span{
            display: inline-block;
            padding: 0 0.4rem;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            border-radius: 0.4rem;
            font-size: 0.3rem;
            color: #fff;
            background: -webkit-gradient(left, #FFC68C, #FF5F3B);
            background: -webkit-gradient(linear, left top, right top, from(#FFC68C), to(#FF5F3B));
            background: linear-gradient(to right, #FFC68C, #FF5F3B);
        }

    }
</style>
