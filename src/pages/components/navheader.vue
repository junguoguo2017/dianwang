<template>
    <div class="navHeader_default" :class="className">
        <span v-if="back" class="iconfont icon-fanhui" style="margin-left: 0.2rem;display: inline-block;height: 100%;width:0.4rem" @click="backClick"></span>
        <slot name="leftIcon"></slot>

        <span style="flex-grow: 1;text-align: center;font-size:0.36rem">{{label}}</span>
        <span v-if="more" style="height: 0.88rem;line-height: 0.88rem;margin-right: 0.2rem" @click="moreClick">
            <img :src="moreicon" alt="" style="width: 0.6rem;vertical-align: middle">
            <span style="vertical-align: middle;"></span>
        </span>
        <slot name="more"></slot>
    </div>
</template>

<script>
	export default {
		name: "navheader",
        data(){
		    return {
                moreicon:require('@/assets/more.png')
            }
        },
        props:{
            className:{
                type:String,
                default:''
            },
            back:{
                type:Boolean,
                default:false
            },
            more:{
                type:Boolean,
                default:false
            },
            label:{
                type:String,
                default:''
            }
        },
        methods:{
            backClick(){
                this.$emit('backClick')
            },
            moreClick(){
                this.$emit('moreClick')
            }

        }
	}
</script>

<style scoped>

</style>
