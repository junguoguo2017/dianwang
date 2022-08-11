function cor() {
    this.lunbTimer = null;
    this.duration = 2000;
    this.autoplay = false;
    this.touchstartX=0;
    this.touchstartY=0;
    this.disX=0;
    this.disY=0;
    this.touchendX=0;
    this.moveX=0;
    this.currentIndex=1;
    this.lunboq=true;
    this.childrens=[];
    this.touchDom = null;
    var self = this;
    this.domInit= function (cb) {
        this.childrens = document.getElementById('lunbo').children;
        this.touchDom = document.getElementById('lunbo');

        for(var i=0;i<this.childrens.length;i++){//给列表初始化属性
            this.childrens[i].style.float = 'left';
            this.childrens[i].style.width = document.getElementById('cor_box').offsetWidth+'px'
        }
        var clonefirstLi = this.childrens[0].cloneNode(true);//初始化列表数量
        var clonelastLi = this.childrens[this.childrens.length-1].cloneNode(true)
        this.touchDom.appendChild(clonefirstLi)
        this.touchDom.insertBefore(clonelastLi,this.childrens[0]);
        this.touchendX = self.moveX = -this.childrens[0].offsetWidth;

        this.touchDom.style.left = self.moveX+'px'
        this.touchDom.style.width = this.childrens.length*this.childrens[0].offsetWidth+'px'
        document.getElementById('cor_box').style.height = document.getElementById('lunbo').offsetHeight+10+'px';//设定盒子高度
        /*事件绑定*/
        this.touchDom.addEventListener('touchstart',self.touchstart,false)
        this.touchDom.addEventListener('touchmove',self.touchmove,false)
        this.touchDom.addEventListener('touchend',function (){
            self.touchend();
            if(cb){
                cb(self.getIndex())
            }
        },false);
        this.touchDom.addEventListener('touchcancle',self.touchcancle,false);
        this.touchDom.addEventListener('click',function (e) {
            e.preventDefault();
            e.stopPropagation()
        },false);
        if(self.autoplay){//轮播
            this.lunboInit()
        };

    };
    this.lunboInit = function(){
        var self = this;
        self.lunbTimer = setInterval(()=>{
            self.touchAction()
        },self.duration)
    };
    this.touchstart = function(e){
        clearInterval(self.lunbTimer)
        if(!self.lunboq)return;
        self.touchstartX = e.clientX||e.touches[0].clientX;
        self.touchstartY = e.clientY||e.touches[0].clientY;
    }
    this.touchmove = function(e){
        if(!self.lunboq)return;
        self.touchDom.style.transition = "none";
        self.touchDom.webkitTransform = "none";

        var c_x = e.clientX||e.touches[0].clientX;
        var c_y = e.clientY||e.touches[0].clientY;
        self.disX = c_x-self.touchstartX;
        self.disY = c_y-self.touchstartY;

        if(Math.abs(self.disY)<Math.abs(self.disX)){//处理手指触摸方向，
            e.preventDefault()
            self.moveX = self.touchendX +self.disX;
        }else {
            self.moveX = self.touchendX;
        }
        self.touchDom.style.left = self.moveX+'px'

    }
    this.touchend = function(e){
        if(!self.lunboq)return;
        if(Math.abs(self.disX) >self.childrens[0].offsetWidth/3){
            self.touchAction(self.disX<0)
        }else{
            self.touchendX=-self.childrens[0].offsetWidth*self.currentIndex
            self.moveX = self.touchendX
            self.touchDom.style.transition = 'left .3s ease-in';
        };
        self.touchDom.style.left = self.moveX+'px'
        if(self.autoplay){
            self.lunboInit()
        };

    }
    this.touchAction = function (go,cb) {
        if(go){
            self.currentIndex+=1;
        }else{
            self.currentIndex-=1;
        }
        self.touchendX=self.currentIndex==0?0:-self.childrens[0].offsetWidth*self.currentIndex
        self.moveX = self.touchendX;
        self.touchstartX =0
        self.touchDom.style.transition = 'left .3s ease-in'
        self.touchDom.style.left = self.moveX+'px';

        if(self.currentIndex==self.childrens.length-1){
            self.lunboq = false;
            function  nextInit() {//触摸滚动到头尾 初始化
                self.currentIndex=1;
                self.touchendX=-self.childrens[0].offsetWidth*self.currentIndex;
                self.touchDom.style.left = self.touchendX+'px'
                self.touchDom.style.transition = "none";
                self.touchDom.webkitTransform = "none";
                self.lunboq = true;
                self.touchDom.removeEventListener('transitionend',nextInit)
            }
            self.touchDom.addEventListener('transitionend',nextInit, false)
        }else if(self.currentIndex==0){
            self.lunboq = false;
            function  preInit() {//触摸滚动到头尾 初始化
                self.currentIndex=self.childrens.length-2;
                self.touchendX=-self.childrens[0].offsetWidth*self.currentIndex
                self.touchDom.style.left = self.touchendX+'px'
                self.touchDom.style.transition = "none";
                self.touchDom.webkitTransform = "none";
                self.lunboq = true;
                self.touchDom.removeEventListener('transitionend',preInit)
            }
            self.touchDom.addEventListener('transitionend',preInit, false)
        };
        self.disX = 0
        if(cb){
            var index = self.getIndex()
            cb(index)
        }
    };
    var flag = true;
    this.next = function (cb) {
        if(!flag)return;
        setTimeout(()=>{
            flag = true
        },500)
        self.touchAction(true,cb);
        flag = false
    };
    this.pre = function (cb) {
        if(!flag)return;
        setTimeout(()=>{
            flag = true
        },500)
        self.touchAction(false,cb)
        flag = false
    };
    this.getIndex = function () {
        var dotLi = self.childrens.length-2
        var curIndex = self.currentIndex;
        if(curIndex==dotLi+1)curIndex=1;
        if(curIndex==0)curIndex=dotLi;
        return curIndex
    }
}
