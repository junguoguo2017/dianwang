<template>
    <div class="loading" >
        <span class="iconfont icon-loading run" v-if="showLoading"></span>
        <span v-else>{{noLoadingTips}}</span>
    </div>
</template>

<script>
	export default {
		name: "flyloading",
        props:{
            showLoading:{
		        type:Boolean,
                default:false
            },
            noLoadingTips:{
                type:String,
                default: '没有更多了'
            }
        }
	}
</script>

<style scoped>
    .loading{
        text-align: center;
        height: 0.8rem;
        line-height: 0.8rem;
    }
.run{
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    animation: running .3s linear  infinite;
}
    @keyframes  running{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(100deg);
        }
    }
</style>
