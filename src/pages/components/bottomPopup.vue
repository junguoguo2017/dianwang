<template>
    <div @touchmove.prevent>
        <input type="text" :value="value" style="visibility: hidden;">
        <div class="marker" v-show="popupShow" @click="markerClick"></div>

        <transition name="slideup">
            <div ref="AppBottomPopup" class="AppBottomPopup" v-show="popupShow"  >
                <slot></slot>
            </div>
        </transition >
    </div>
</template>

<script>
    export default{
        name: "bottomPopup",
        props:{
            /*v-model*/
            value:{
                type:Boolean,
                default:false
            },

        },
        data(){
            return{
                popupShow:false
            }
        },
        mounted(){
            if (this.value) {
                this.popupShow = true;
            }
        },
        watch:{
            value(val) {
                this.popupShow = val;
            },
            popupShow(val) {
                this.$emit('input', val);
            }
        },
        updated(){
            /*js控制动态居中*/
            var shareAppCon =this.$refs.AppBottomPopup;
            shareAppCon.style.height = shareAppCon.children[0].offsetHeight+'px'
        },
        methods:{
            markerClick(){
                this.popupShow = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .marker{
        position: fixed;bottom: 0;left: 0;top:0;left:0;width:100%;background: rgba(0,0,0,.4);z-index: 999;
    }

    .AppBottomPopup{
        position: fixed;
        bottom:0;
       max-width: 750px;
        width:100%;
        background: #e6e6e6;z-index: 999;

    }
    .marker-enter-active, .expand-leave-active {
        opacity: 1;
        transition: all .3s ease;
    }
    .marker-enter, .marker-leave {
        opacity: 0;
    }

    /*.expand-enter-active {
         transition: all .3s ease;
         height: 165px;
         overflow: hidden;
        }
    .expand-leave-active{
         transition: all .3s ease;
         height: 0px;
         overflow: hidden;
        }
    .expand-enter, .expand-leave {
         height: 0;
         opacity: 0;
    }*/
    .slideup-enter-active{
        animation-name: slideInUp;
        animation-duration: .2s;
        animation-fill-mode: both
    }
    .slideup-leave-active {
        animation-name: slideOutDown;
        animation-duration: .2s;
        animation-fill-mode: both
    }
    @keyframes slideInUp {
        0% {
            transform: translate3d(0,100%,0);
            opacity: 1;
        }

        to {
            transform: translateZ(0)
        }
    }
    @keyframes slideOutDown {
        0% {
            transform: translateZ(0)
        }

        to {
            opacity: 0;
            transform: translate3d(0,100%,0)
        }
    }
    .delay-leave-active{
        -webkit-animation-delay: .2s;
        -moz-animation-delay: .2s;
        -o-animation-delay: .2s;
        animation-delay: .2s;
    }

</style>
