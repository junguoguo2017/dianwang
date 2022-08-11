<template>
    <div :style="{overflow:'hidden',position:'relative',height:Height+'px'}" id="cor_box">
        <div
            ref="lunbo"
            :style="{position:'absolute', width:carouselWidth+'px',left:moveX+'px',}"
            @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
            @click.stop
            class="clearfix"
        >
            <slot></slot>
        </div>
        <ul class="dot clearfix" id="dot" ></ul>
    </div>
</template>

<script>
    export default {
        name: "flySwiper",
        props:{
            autoplay:{
                type:Boolean,
                default:false
            },
            duration:{
                type:Number,
                default: 2000
            }
        },
        data(){
            return {
                Height:0,
                touchstartX:0,
                touchstartY:0,
                carouselWidth:0,
                carouselHeigth:0,
                disX:0,
                disY:0,
                moveX:0,
                touchendX:0,
                touchendY:0,
                currentIndex:1,
                oldIndex:0,
                lunboq:true,
                lunbTimer:null,
                childrens:[],
                touchDom:null
            }
        },
        mounted(){
            var self = this;

            this.$nextTick(()=>{
                self.domInit();
                this.carouselWidth = this.childrens.length*this.childrens[0].offsetWidth;

                if(this.autoplay){
                    this.lunboInit()
                };
            })
            // 监听 visibility change 事件
             document.addEventListener('visibilitychange',function(){
                     var isHidden = document.hidden;
                     if(isHidden){
                         document.title = '离开';
                     } else {
                         document.title = '回来';
                     }
                 }
             );
        },
        methods:{
            swiperTouchInit(val){
                var self =this;
                this.reset();
                this.$nextTick(()=>{
                    if(val){
                        this.touchDom.addEventListener('touchstart',self.touchstart,false)
                        this.touchDom.addEventListener('touchmove',self.touchmove,false)
                        this.touchDom.addEventListener('touchend',self.touchend,false)
                        this.touchDom.addEventListener('touchcancel',self.touchCancel,false)
                    }else{
                        this.touchDom.removeEventListener('touchstart',self.touchstart,false) ;
                        this.touchDom.removeEventListener('touchmove',self.touchmove,false)
                        this.touchDom.removeEventListener('touchend',self.touchend,false)
                        this.touchDom.removeEventListener('touchcancel',self.touchCancel,false)
                    }
                })
            },
            swiperInit(){
                var self =this;
                if(val){
                    this.$refs.flyswiper.addEventListener('touchmove',self.touchMove,false);
                }else{
                    this.$refs.flyswiper.removeEventListener('touchmove',self.touchMove,false);
                }
            },
            domInit(){
                this.childrens = this.$refs.lunbo.children;
                this.touchDom = this.$refs.lunbo;

                for(var i=0;i<this.childrens.length;i++){
                    this.childrens[i].style.float = 'left';
                    this.childrens[i].style.width = document.getElementById('cor_box').offsetWidth+'px'
                    console.log(this.childrens[i])
                }
                var clonefirstLi = this.childrens[0].cloneNode(true);
                var clonelastLi = this.childrens[this.childrens.length-1].cloneNode(true)
                this.touchDom.appendChild(clonefirstLi)
                this.touchDom.insertBefore(clonelastLi,this.childrens[0]);
                /*初始的距离*/
                this.touchendX = self.moveX = -this.childrens[0].offsetWidth;
                /*初始化*/
                this.touchDom.style.left = self.moveX+'px'
                this.touchDom.style.width = this.childrens.length*this.childrens[0].offsetWidth+'px';
                this.Height = this.touchDom.offsetHeight+10;
               /*底部dot  初始化*/
                for(var i=0;i<this.childrens.length-2;i++){
                    var dotLi = document.createElement('li');
                    dotLi.setAttribute('class','dot_li');
                    if(i==0){
                        dotLi.setAttribute('class','dot_li active')
                    }
                    document.getElementById('dot').appendChild(dotLi)
                }
                document.getElementById('dot').style.marginLeft = -document.getElementById('dot').offsetWidth/2+'px'
            },
            lunboInit(){
                var self = this;
                this.lunbTimer = setInterval(()=>{
                    self.touchAction(true)
                },self.duration)
            },
            touchstart(e){
                clearInterval(this.lunbTimer)
                if(!this.lunboq)return;
                this.touchstartX = e.clientX||e.touches[0].clientX;
                this.touchstartY = e.clientY||e.touches[0].clientY;
            },
            touchmove(e){
                if(!this.lunboq)return;

                this.touchDom.style.transition = "none";
                this.touchDom.webkitTransform = "none";
                var c_x = e.clientX||e.touches[0].clientX;
                var c_y = e.clientY||e.touches[0].clientY;
                this.disX = c_x-this.touchstartX;
                this.disY = c_y-this.touchstartY;
                function getangle(diff_y,diff_x){
                    //返回角度,不是弧度
                    return 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
                };
                var angle = getangle(Math.abs(this.disY),Math.abs(this.disX))

                console.log(angle)
                if(angle>30){

                }
                if(Math.abs(this.disY)<Math.abs(this.disX)){//设定手指滑动方向
                    e.preventDefault();
                    e.stopPropagation()
                }else {
                    this.moveX = this.touchendX
                    return false
                }
                this.moveX = this.touchendX +this.disX
            },
            touchend(e){
                if(!this.lunboq)return;

                if(Math.abs(this.disX) >this.childrens[0].offsetWidth/3){
                    this.touchAction(this.disX<0)
                }else{
                    this.touchendX=-this.childrens[0].offsetWidth*this.currentIndex
                    this.moveX = this.touchendX
                    this.touchDom.style.transition = 'left .3s ease-in';
                };
                this.disX = 0
                if(this.autoplay){
                    this.lunboInit()
                };
            },
            touchCancel(){
                this.moveX = this.touchendX
            },
            touchAction(go,cb){
                var self = this;
                if(go){
                    this.currentIndex+=1
                }else{
                    this.currentIndex-=1
                };
                this.touchendX=this.currentIndex==0?0:-this.childrens[0].offsetWidth*this.currentIndex
                this.moveX = this.touchendX;
                this.touchstartX =0
                this.touchDom.style.transition = 'left .3s ease-in'
                if(this.currentIndex==0){
                    this.lunboq = false
                    function startInit(){
                        self.currentIndex=self.childrens.length-2;
                        self.touchendX=-self.childrens[0].offsetWidth*self.currentIndex;
                        self.moveX = self.touchendX;
                        self.touchDom.style.transition = "none";
                        self.touchDom.webkitTransform = "none";
                        self.lunboq = true;
                        self.touchDom.removeEventListener('transitionend',startInit)
                    }
                    this.touchDom.addEventListener('transitionend',startInit, false)
                }else if(this.currentIndex==this.childrens.length-1){
                    this.lunboq = false
                    function endInit(){
                        self.touchendX=-self.childrens[0].offsetWidth*1
                        self.currentIndex=1
                        self.moveX = self.touchendX;
                        self.touchDom.style.transition = "none";
                        self.touchDom.webkitTransform = "none";
                        self.lunboq = true;
                        self.touchDom.removeEventListener('transitionend',endInit)
                    }
                    this.touchDom.addEventListener('transitionend',endInit, false)
                };
                var index = self.getIndex()
                this.$emit('indexChange',index);//index变化
                if(cb){
                    cb(index)
                }
            },
            pre(){
                if(!flag)return;
                setTimeout(()=>{
                    flag = true
                },500)
                this.touchAction(false,cb)
                flag = false

            },
            next(){
                if(!flag)return;
                setTimeout(()=>{
                    flag = true
                },500)
                this.touchAction(true,cb);
                flag = false
            },
            getIndex(){
                var dotLi = this.childrens.length-2
                var curIndex = this.currentIndex;
                if(curIndex==dotLi+1)curIndex=1;
                if(curIndex==0)curIndex=dotLi;
                return curIndex
            },
            /*轮播*/
            cor(opts) {
                this.lunbTimer = null;
                this.duration = 2000;
                this.autoplay = opts.autoplay || false;
                this.touchstartX = 0;
                this.touchstartY = 0;
                this.disX = 0;
                this.disY = 0;
                this.touchendX = 0;
                this.moveX = 0;
                this.currentIndex = 1;
                this.lunboq = true;
                this.childrens = [];
                this.touchDom = null;
                var self = this;
                this.domInit = function (cb) {
                    this.childrens = document.getElementById('lunbo').children;
                    this.touchDom = document.getElementById('lunbo');

                    for (var i = 0; i < this.childrens.length; i++) {//给列表初始化属性
                        this.childrens[i].style.float = 'left';
                        this.childrens[i].style.width = document.getElementById('cor_box').offsetWidth + 'px'
                    }
                    var clonefirstLi = this.childrens[0].cloneNode(true);//初始化列表数量
                    var clonelastLi = this.childrens[this.childrens.length - 1].cloneNode(true)
                    this.touchDom.appendChild(clonefirstLi)
                    this.touchDom.insertBefore(clonelastLi, this.childrens[0]);
                    this.touchendX = self.moveX = -this.childrens[0].offsetWidth;

                    this.touchDom.style.left = self.moveX + 'px'
                    this.touchDom.style.width = this.childrens.length * this.childrens[0].offsetWidth + 'px'
                    // document.getElementById('cor_box').style.height = document.getElementById('lunbo').offsetHeight+10+'px';//设定盒子高度
                    /*事件绑定*/
                    this.touchDom.addEventListener('touchstart', self.touchstart, false)
                    this.touchDom.addEventListener('touchmove', self.touchmove, false)
                    this.touchDom.addEventListener('touchend', function () {
                        self.touchend(cb);
                        if (cb) {
                            cb(self.getIndex())
                        }
                    }, false);
                    this.touchDom.addEventListener('touchcancle', self.touchcancle, false);
                    this.touchDom.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation()
                    }, false);
                    if (self.autoplay) {//轮播
                        this.lunboInit(cb)
                    };

                };
                this.lunboInit = function (cb) {
                    var self = this;
                    self.lunbTimer = setInterval(() => {
                        self.touchAction(true, cb)
                    }, self.duration)
                };
                this.touchstart = function (e) {
                    clearInterval(self.lunbTimer)
                    if (!self.lunboq) return;
                    self.touchstartX = e.clientX || e.touches[0].clientX;
                    self.touchstartY = e.clientY || e.touches[0].clientY;
                }
                this.touchmove = function (e) {
                    if (!self.lunboq) return;
                    self.touchDom.style.transition = "none";
                    self.touchDom.webkitTransform = "none";

                    var c_x = e.clientX || e.touches[0].clientX;
                    var c_y = e.clientY || e.touches[0].clientY;
                    self.disX = c_x - self.touchstartX;
                    self.disY = c_y - self.touchstartY;

                    if (Math.abs(self.disY) < Math.abs(self.disX)) {//处理手指触摸方向，
                        e.preventDefault()
                        self.moveX = self.touchendX + self.disX;
                    } else {
                        self.moveX = self.touchendX;
                    }
                    self.touchDom.style.left = self.moveX + 'px'

                }
                this.touchend = function (cb) {
                    if (!self.lunboq) return;
                    if (Math.abs(self.disX) > self.childrens[0].offsetWidth / 3) {
                        self.touchAction(self.disX < 0, cb)
                    } else {
                        self.touchendX = -self.childrens[0].offsetWidth * self.currentIndex
                        self.moveX = self.touchendX
                        self.touchDom.style.transition = 'left .3s ease-in';
                    };
                    self.touchDom.style.left = self.moveX + 'px'
                    if (self.autoplay) {
                        self.lunboInit(cb)
                    };

                }
                this.touchAction = function (go, cb) {
                    if (go) {
                        self.currentIndex += 1;
                    } else {
                        self.currentIndex -= 1;
                    }
                    self.touchendX = self.currentIndex == 0 ? 0 : -self.childrens[0].offsetWidth * self.currentIndex
                    self.moveX = self.touchendX;
                    self.touchstartX = 0
                    self.touchDom.style.transition = 'left .3s ease-in'
                    self.touchDom.style.left = self.moveX + 'px';

                    if (self.currentIndex == self.childrens.length - 1) {
                        self.lunboq = false;
                        function nextInit() {//触摸滚动到头尾 初始化
                            self.currentIndex = 1;
                            self.touchendX = -self.childrens[0].offsetWidth * self.currentIndex;
                            self.touchDom.style.left = self.touchendX + 'px'
                            self.touchDom.style.transition = "none";
                            self.touchDom.webkitTransform = "none";
                            self.lunboq = true;
                            self.touchDom.removeEventListener('transitionend', nextInit)
                        }
                        self.touchDom.addEventListener('transitionend', nextInit, false)
                    } else if (self.currentIndex == 0) {
                        self.lunboq = false;
                        function preInit() {//触摸滚动到头尾 初始化
                            self.currentIndex = self.childrens.length - 2;
                            self.touchendX = -self.childrens[0].offsetWidth * self.currentIndex
                            self.touchDom.style.left = self.touchendX + 'px'
                            self.touchDom.style.transition = "none";
                            self.touchDom.webkitTransform = "none";
                            self.lunboq = true;
                            self.touchDom.removeEventListener('transitionend', preInit)
                        }
                        self.touchDom.addEventListener('transitionend', preInit, false)
                    };
                    self.disX = 0
                    if (cb) {
                        var index = self.getIndex()
                        cb(index)
                    }
                };
                var flag = true;
                this.next = function (cb) {//click下一页
                    if (!flag) return;
                    setTimeout(() => {
                        flag = true
                    }, 500)
                    self.touchAction(true, cb);
                    flag = false
                };
                this.pre = function (cb) {//click上一页
                    if (!flag) return;
                    setTimeout(() => {
                        flag = true
                    }, 500)
                    self.touchAction(false, cb)
                    flag = false
                };
                this.play = function (cb) {
                    self.autoplay = true;
                    self.lunboInit(cb)
                }
                this.pause = function () {
                    self.autoplay = false;
                    clearInterval(self.lunbTimer)
                }
                this.getIndex = function () {//获取当前index
                    var dotLi = self.childrens.length - 2
                    var curIndex = self.currentIndex;
                    if (curIndex == dotLi + 1) curIndex = 1;
                    if (curIndex == 0) curIndex = dotLi;
                    return curIndex
                }
            },
        },
        watch:{
            currentIndex:function (val) {
                var dotLi = document.getElementsByClassName('dot_li')
                var curIndex = val;
                if(curIndex==dotLi.length+1)curIndex=1;
                if(curIndex==0)curIndex=dotLi.length-1;
                for(var i=0;i<dotLi.length;i++){
                    if(curIndex==i+1){
                        dotLi[i].setAttribute('class','dot_li active')
                    }else{
                        dotLi[i].setAttribute('class','dot_li')
                    }
                }
            }
        }
    }
</script>

<style  lang="less">
    .dot{
        position: absolute;
        bottom: 0;
        left: 50%;
        .dot_li{
            float: left;
            width: 0.4rem;
            height: 0.1rem;
            background: #999;
            margin: 0.1rem;
        }

        .dot_li.active{
            background: #507FEA;
        }
    }


</style>
