<template>
    <div class="slider">
        <div
            ref="flyswiper"
            class="content"
            :style="deleteSlider"
        >
            <!-- 插槽中放具体项目中需要内容     -->
            <slot name="sliderContent"></slot>
        </div>
        <div class="remove active" ref='remove' @click="handleClick">
            删除
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: "flySwipeoutItem",
        props:{
            propE: {
                type: Object,
                default: function () {
                }
            }
        },
        data() {
            return {
                startX:0,  //触摸位置
                startY:0,
                endX:0,   //结束位置
                moveX: 0,  //滑动时的位置
                moveY:0,
                disX: 0,  //移动距离
                disY:0,
                removeListener:false,
                deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
            }
        },
        mounted(){
            var self =this;
            this.$nextTick(()=>{
                this.$refs.flyswiper.addEventListener('touchstart',self.touchStart,false)
                this.$refs.flyswiper.addEventListener('touchmove',self.touchMove,false)
                this.$refs.flyswiper.addEventListener('touchend',self.touchEnd,false)
                this.$refs.flyswiper.addEventListener('touchcancel',self.touchCancel,false)
            })
        },
        methods:{
            swipeoutInit(val){
                var self =this;
                if(val){
                    this.$refs.flyswiper.addEventListener('touchmove',self.touchMove,false);
                }else{
                    this.$refs.flyswiper.removeEventListener('touchmove',self.touchMove,false);
                }
            },
            handleClick () {
                this.$emit('delete')
                this.deleteSlider = "transform:translateX(0px)";
            },
            resetTouch(){
                this.startX=0;  //触摸位置
                    this.startY=0;
                    this.endX=0;   //结束位置
                    this.moveX=0;  //滑动时的位置
                    this.moveY=0;
                    this.disX=0;  //移动距离
                    this.disY=0;
            },
            touchStart(ev){
                ev= ev || event
                //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                if(ev.touches.length == 1){
                    // 记录开始位置
                    this.startX = ev.touches[0].clientX;
                    this.startY = ev.touches[0].clientY;
                };
                const openItems = this.$parent.$children.filter(item => item.$data.disX!=0);
                if(openItems.length!=0){
                    openItems.forEach(item =>{
                        item.$data.disX=0;
                        item.$data.deleteSlider = "transform:translateX(0px)";
                    })

                }
            },
            touchMove(ev){
                ev = ev || event;
                //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                let wd=this.$refs.remove.offsetWidth;

                if(ev.touches.length == 1) {
                    // 滑动时距离浏览器左侧实时距离
                    this.moveX = ev.touches[0].clientX
                    this.moveY = ev.touches[0].clientY
                    //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                    this.disX = this.startX - this.moveX;
                    this.disY =this.startY - this.moveY;
                    function getangle(diff_y,diff_x){
                        //返回角度,不是弧度
                        return 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
                    };

                    var angle = getangle(Math.abs(this.disY),Math.abs(this.disX))
                    /*防误触*/

                    if(30<angle){
                        this.removeListener = true;
                        this.swipeoutInit(false);
                        return;
                    }
                    /*滑动时阻止页面其他滚动*/
                    ev.preventDefault();
                    // 如果是向右滑动或者不滑动，不改变滑块的位置
                    if(this.disX < 0 || this.disX == 0) {
                        this.deleteSlider = "transform:translateX(0px)";
                        // 大于0，表示左滑了，此时滑块开始滑动
                    }else if (this.disX > 0) {
                        //具体滑动距离我取的是 手指偏移距离*5。
                        this.deleteSlider = "transform:translateX(-" + this.disX + "px)";

                        // 最大也只能等于删除按钮宽度
                        if (this.disX >=wd) {
                            this.deleteSlider = "transform:translateX(-" +wd+ "px)";
                        }
                    };

                }
            },
            touchEnd(ev){
                ev = ev || event;
                if(this.removeListener){
                    this.removeListener = false;
                    this.resetTouch()
                    this.swipeoutInit(true);
                };
                let wd=this.$refs.remove.offsetWidth;
                if (ev.changedTouches.length == 1) {
                    let endX = ev.changedTouches[0].clientX;

                    this.disX = this.startX - endX;
                    //如果距离小于删除按钮一半,强行回到起点

                    if ((this.disX*5) < (wd/2)) {
                        this.deleteSlider = "transform:translateX(0px)";
                    }else{
                        //大于一半 滑动到最大值
                        this.deleteSlider = "transform:translateX(-"+wd+ "px)";
                    }
                }
            },
            touchCancel(){
                this.disX = 0
                this.deleteSlider = "transform:translateX(0px)";
            },

        }
    }
</script>
<style scoped lang="less">
    .slider{
        width: 100%;
        /*height:100px;*/
        height: 3rem;
        position: relative;
        user-select: none;
        .content{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background:#f5f5f5;
            z-index: 100;
            //  设置过渡动画
            transition: 0.3s;

        }
        .remove{
            position: absolute;
            width:100px;
            /*  height :calc(~"100% -0.08rem");*/
            background:red;
            right: 0;
            top: 0;
            color:#fff;
            text-align: center;
            font-size: 0.4rem;
            line-height: 2.96rem;

        }
    }

</style>
