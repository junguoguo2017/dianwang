<template>
    <div   >
        <div  ref="wrapper" :class="conClassName" >
            <slot name="content"></slot>
        </div>
        <slot name="fixed"></slot>
    </div>
</template>
<script>
    import BScroll from 'better-scroll';
    export default {
        name: "scrollPage",
        data(){
            return {
                myscroll:null,

            }
        },
        computed:{
            conClassName:function () {
                return this.$route.name
            }
        },
        props:{
            hasNav:{
                type:Boolean,
                default:false
            },
            hasTabbar:{
                type:Boolean,
                default:false
            },
            data:{
                type:Array,
                default:null
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.createIScroll()
            })
        },
        methods:{
            createIScroll(){
               // alert('创建了')
                var self = this
              //  var $container = document.querySelector('.'+this.conClassName);
                var $container = this.$refs.wrapper
                var navHeight = this.hasNav?document.querySelector('.navHeader_default').clientHeight:0;
                var tabbarHeight = this.hasTabbar?50:0;
                $container.style.height = (document.documentElement.clientHeight - navHeight - tabbarHeight) + 'px';
                this.myscroll=new BScroll($container,{
                    click: true,
                    taps: true,
                    bounceTime:100,
                    deceleration:0.0001,
                    momentum:true,
                    pullDownRefresh: {
                        threshold: 30, // 下拉距离超过30px触发pullingDown事件
                        stop: 20 // 回弹停留在距离顶部20px的位置
                    }
                });
              //  self.scrollEnd(this.myscroll)
                this.myscroll.on('scrollEnd',function (pos) {
                    if(self.myscroll.maxScrollY>=pos.y) {
                        console.log("加载更多")
                        //使用refresh 方法 来更新scroll  解决无法滚动的问题
                        self.$emit('loadMore')
                    }
                   // console.log(self.myscroll.maxScrollY+"总距离----下拉的距离"+pos.y)
                })
                this.myscroll.on('pullingDown', () => {
                    console.log('下拉刷新')
                    this.myscroll.finishPullDown(); // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
                });
                this.$emit('getIScroll',this.myscroll)
            },
            destroyIScroll(){
               //alert('销毁了')
                this.myscroll.destroy();
                this.myscroll = null;
            },
            refresh(){
                this.myscroll.refresh()
            }
        },
        watch: {
            // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
            data() {
                setTimeout(() => {
                    this.refresh();
                }, 20);
            }
        }
    }

</script>

<style lang="less">
    .page{
        background: #f5f5f5;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
    }
    .container{
        overflow-y: scroll;
    }
   /* .pageContent{

    }*/
</style>
