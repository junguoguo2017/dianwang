<template>
    <div >
        <input type="text" :value="value" style="visibility: hidden;">
        <div class="marker" v-show="visible"></div>
        <transition name="slideup">
            <div class="pay-tool"   v-show="visible">
                <div class="pay-tool-title border-bottom">
                    <strong>请输入交易密码</strong>
                    <span class="iconfont icon-jiantou8" @click="backHandle" style="margin-left: 0.5rem"></span>
                </div>
                <div class="pay-tool-content">
                    <div class="pay-tool-inputs">
                        <div class="item" v-for="i in items"><span class="icon_dot" v-if="password[i]"></span></div>
                    </div>
                    <div class="pay-tool-link"><a class="link" >忘记密码？</a></div>
                </div>
                <div class="pay-tool-keyboard">
                    <ul>
                        <li @click="keyUpHandle($event)" v-for="val in keys">
                            {{ val }}
                        </li>
                        <li class="del" @click="delHandle"><span class="icon-del"><</span></li>
                    </ul>
                </div>

            </div>
        </transition>
    </div>

</template>
<!--安全键盘-->
<script>
    function shuffle(arr) {
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            var index = parseInt(Math.random() * (len - i));
            var temp = arr[index];
            arr[index] = arr[len - i - 1];
            arr[len - i - 1] = temp;
        }
        return arr;
    }
    const keys =[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    // let sendFlag = true // 防止重复发送密码
    export default {
        name:'safeKeyboard',
        props:{
            value:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
                items: [0, 1, 2, 3, 4, 5],
                keys: [],
                password: [],
                visible:false
            }
        },
        mounted(){
            if (this.value) {
                this.visible = true;
            }
        },
        watch:{
            value(val) {
                this.visible = val;
                this.keys = JSON.parse(JSON.stringify(keys))
                if(val){/*安全键盘*/
                    this.keys = shuffle(this.keys);
                    this.keys.splice(this.keys.length-1,0,'确定')
                }
            },
            visible(val) {
                this.$emit('input', val);
            }
        },
        methods: {

            backHandle () {
                this.clearPasswordHandle()  // 返回时清除password
                this.visible = false;
                //this.$emit('backFnc') // 返回上级
            },
            keyUpHandle (e) {//按键事件
                let text = e.currentTarget.innerText
                let len = this.password.length;
                if(text=='确定'){
                    if(len<6)return;
                    this.$emit('inputComfir')
                    return;
                }
                if (!text || len >= 6) return
                this.password.push(text)
                this.ajaxData()
            },
            delHandle () {//删除
                if (this.password.length <= 0) return false
                this.password.shift()
            },
            ajaxData () {//输入完成事件
                if (this.password.length >= 6) {
                    var pas = parseInt(this.password.join(' ').replace(/\s/g, ''))
                    this.$emit('pasEndInput',pas)
                }
                return false
            },
            clearPasswordHandle: function () {
                this.password = []
            }
        }
    }
</script>

<style lang="less" scoped>
    .pay-tool {
        position: absolute;
        width: 100%;
        bottom: 0;
        z-index: 999;
        height: 8rem;
        background-color: #fff;
        overflow: hidden;
        &-title {
            width: 100%;
            height: 0.8rem;
            padding: 0 0.4rem;
            line-height: 1rem;
            text-align: center;
            overflow: hidden;
            .icon {
                float: left;
                margin-top: 0rem;
            }
            strong {
                font-size: 0.4rem;
            }
        }
        &-content {
            .pay-tool-inputs {
                width: 7rem;
                height: 1.2rem;
                margin: 0.6rem auto 0;
                border: 1px solid #b9b9b9;
                border-radius: 0.1rem;
                box-shadow: 0 0 1px #e6e6e6;
                display: flex;
                .item {
                    width: 16.66666666%;
                    height: 1.2rem;
                    border-right: 1px solid #b9b9b9;
                    line-height: 1.2rem;
                    text-align: center;
                    &:last-child {
                        border-right: none;
                    }
                    .icon_dot {
                        display: inline-block;
                        width: 0.26rem;
                        height: 0.26rem;
                        background: url("../../assets/dot.png") no-repeat;
                        background-size: cover;
                        vertical-align: middle;
                    }
                }
            }
            .pay-tool-link {
                padding: 0.26rem 0.4rem 0;
                text-align: right;
                .link {
                    font-size: 0.3rem;
                    color: #3c8cfb;
                }
            }
        }
        .pay-tool-keyboard {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                li {
                    width: 33.3333%;
                    height: 1rem;
                    line-height: 1rem;
                    text-align: center;
                    border-right: 1px solid #aeaeae;
                    border-bottom: 1px solid #aeaeae;
                    box-sizing: border-box;
                    font-size: 0.4rem;
                    font-weight: bold;
                    &:nth-child(1), &:nth-child(2), &:nth-child(3) {
                        border-top: 1px solid #eee;
                    }
                    &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
                        border-right: none;
                    }
                    &:nth-child(10), &:nth-child(11), &:nth-child(12) {
                        border-bottom: none;
                    }
                    &:nth-child(10), &:nth-child(12), &:active {
                        background-color: #d1d4dd;
                    }
                    &:nth-child(12):active {
                        background-color: #fff;
                    }
                }
            }
        }
    }

    .marker{
        position: fixed;bottom: 0;left: 0;top:0;left:0;width:100%;background: rgba(0,0,0,.4);z-index: 999;
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
