<template>
    <div class="newFeature">
        <h5 class="title">
          {{Data.title}}
        </h5>
        <div class="content" v-html="Data.content" ></div>
    </div>
</template>

<script>
    import { newFeatures} from '@/api/api'
	export default {
		name: "newFeatures",
        data(){
		    return {
                Data:{

                }
            }
        },
        mounted(){
            newFeatures().then((res)=>{
                if(res.code==1){
                    this.Data = res.data.new_fun
                }
            })
        }
	}
</script>

<style lang="less">
    .newFeature{

        .title{
            padding: 0 0.3rem;
            background: #fff;height: 1rem;line-height: 1rem;font-size: 0.36rem;color:#4a4a4a;
        }
        .content{
            padding: 0.4rem 0.3rem;
            p{
                line-height: 0.4rem;
                text-indent: 0.48rem;
            }
        }
    }

</style>
