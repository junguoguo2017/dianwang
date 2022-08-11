<template>
    <div class="regagree">
        <section style="padding:0.36rem 0.3rem 1rem">
            <div v-html="Data.content">
            </div>
        </section>
    </div>
</template>

<script>
    import { regAgreement } from '@/api/api'
	export default {
		name: "regAgreement",
        data(){
            return {
                Data:{}
            }
        },
        mounted(){
            regAgreement().then((res)=>{
                if(res.code==1){
                    this.Data = res.data.reg_agreement
                }
            })
        }
	}
</script>

<style lang="less">
    .regagree{
        span, p, button, a {
            font-size: 0.32rem;
        }
        .header{
            font-size: 0.48rem;
            color:#383838;
            font-weight: bold;
            text-align: center;
            height: 1.1rem;
            line-height: 1.1rem;
        }
        .agreeCon{
            h5{
                font-weight: bold;
                font-size: 0.28rem;
                padding-left: 0.4rem;
                height: 0.56rem;
                line-height: 0.56rem;
            }
            p{
                text-indent: 0.4rem;
                line-height: 0.4rem;
                font-size: 0.24rem;
                color:#666
            }
        }
    }

</style>
