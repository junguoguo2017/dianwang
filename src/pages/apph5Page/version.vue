<template>
    <div class="versionPage" >
        <div v-if="Data">
            <div  style="text-align: center;margin-top: 0.94rem;">
                <div style="width:1.5rem;margin: 0 auto; height: 1.5rem;border-radius: 0.2rem;background: #fff; ">
                    <img :src="Data.logo" alt="" style="height:1.4rem;vertical-align: middle; ">
                    <span></span>
                </div>
                <p style="margin-top: 0.36rem;font-size:0.36rem;color: #4a4a4a;">{{Data.company_name}}&nbsp;{{Data.version}}</p>
                <div  v-html="Data.content">

                </div>
            </div>
            <div style="position: absolute;bottom:1rem;width:100%;left: 0;text-align: center;font-size: 0.24rem;color: #a9a9a9;">{{Data.company_name}}</div>
        </div>
    </div>
</template>

<script>
    import { versionMsg } from '@/api/api'
	export default {
		name: "version",
        data(){
              return {
                    logo:require('@/assets/version-logo.png'),
                    Data:null,
              }
        },
        created(){
            versionMsg().then((res)=>{
                if(res.code==1){
                    this.Data = res.data
                }
            })
        },
        mounted(){

        }
	}
</script>

<style lang="less">
.versionPage{
  border: 1px solid transparent;
  height: 100%;
}
</style>
