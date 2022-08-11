<template>
    <div>
        <section slot="content"></section>
    </div>
</template>

<script>
    import {getInquiry_cb_status} from '@/api/api'
    import {getQuery} from '@/js/util'
	export default {
		name: "inquiry_callback",
        data(){
		    return {

            }
        },
        created(){

        },
        mounted(){
           this.callback()

        },
        methods:{
            callback(){
                let self = this;
                let req_times = 0;
                function toast(type,message,duration) {
                    self.$toast({
                        type:type||'success',
                        position:'center',
                        forbidClick: true, // 禁用背景点击
                        mask:true,
                        message:message||'提示信息',
                        duration:duration||0
                    });
                }
                if(!getQuery()['taskId']){
                    toast('fail','无效的查询',2000);
                    setTimeout(()=>{
                        self.$router.replace('thirdPartyHome')
                    },2000)
                    return;
                };
                const loadingToast = this.$toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    mask:true,
                    loadingType: 'spinner',
                    message: '正在生成报告'
                });
                let req_polling = setInterval(()=>{
                    req_times++;
                    if(req_times>5){
                        clearInterval(req_polling)
                        loadingToast.clear()
                        toast('fail','报告生成失败',2000);
                        let second = 2;
                        const timer = setInterval(() => {
                            second--;
                            if (second<=0) {
                                clearInterval(timer);
                                self.$router.replace('thirdPartyHome')
                            }
                        }, 1000);
                        return
                    }
                    self.getInquiry_cb_status(function () {
                            clearInterval(req_polling);
                            toast('success','报告生成完毕',2000);
                            self.$router.replace({name:'report',query:{order_no:getQuery()['order_no']}})
                        },function () {

                    })
                },2000)
            },
            getInquiry_cb_status(finish,nofinish){
                var params = {
                    taskId:getQuery()['taskId']
                }
                getInquiry_cb_status(params).then((res)=>{
                    if(res.code==1){
                        if(res.data.report_status==1){
                            if(finish){
                                finish()
                            }
                        }else{
                            if(nofinish){
                                nofinish()
                            }

                        }
                    }
                })
            }
        }
	}
</script>

<style scoped>

</style>
