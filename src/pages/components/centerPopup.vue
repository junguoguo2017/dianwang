<template>
    <div @touchmove.prevent >
        <input type="text" :value="value" style="visibility: hidden;font-size: 0">
        <div class="marker" v-show="popupShow" @click="markerClick"></div>
        <transition name="slideup">
            <div class="shareAppBottom" ref="shareAppBottom" v-show="popupShow"  :style="popupStyle">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default{
        name:'flypopup',
        props:{
            /*v-model*/
            value:{
                type:Boolean,
                default:false
            },
            popupStyle:{
                type:Object,
                default:()=>{
                    return {}
                }
            },
            clickMarkerHidden:{
                type:Boolean,
                default:true
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
            var shareAppCon = this.$refs.shareAppBottom;
            shareAppCon.style.height = shareAppCon.children[0].offsetHeight+'px';
            shareAppCon.style.marginTop = -shareAppCon.children[0].offsetHeight/2+'px';
            shareAppCon.style.width = shareAppCon.children[0].offsetWidth+'px'
            shareAppCon.style.marginLeft = -shareAppCon.children[0].offsetWidth/2+'px'
        },
        methods:{
            markerClick(){
                if(this.clickMarkerHidden){
                    this.popupShow = false
                }
            }
        },

    }
</script>

<style lang="less" scoped>
    .marker{
        position: fixed;bottom: 0;left: 0;top:0;left:0;width:100%;background: rgba(0,0,0,.4);z-index: 999;
    }
    .shareAppBottom{
        position: fixed;
        top:50%;
        left: 50%;
        width:70%;
        margin-left: -35%;
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
