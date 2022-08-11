<template>
    <div>
        <div  class="notfoundpage">
            <img :src="notfound" alt="" style="width:3rem">
            <div class="dec">404 not found</div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "error",
        data(){
		    return {
                notfound:require('@/assets/404notfound.png')
            }
        }
	}
</script>

<style scoped lang="less">
.notfoundpage{
    text-align: center;

    overflow:hidden;
    color:#4a4a4a;
    img{
        margin-top: 3rem;
    }
    .dec{
        margin-top: 1rem;
        font-size: 0.5rem;
    }
}
</style>
