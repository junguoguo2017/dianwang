<template>
    <div style="text-align: center">
        <canvas ref="pie" width="315" height="110"></canvas>
    </div>
</template>

<script>
	export default {
		name: "reportPie",
        props:{
		    percent:{
		        type:Number,
                default:50
            },
            inMsg:{
		        type:Object,
                default: function () {
                    return {
                        label:'',
                        value:''
                    }
                }
            },
            foreColor:{
                type:String,
                default:'#ff5f3b'
            },
            bgColor:{
                type:String,
                default:'#ffc130'
            },
            lineWidth:{
                type:String,
                default:'20'
            }
        },
        mounted(){
            this.drawMain(this.percent,this.foreColor,this.bgColor,this.inMsg)
        },
        methods:{
            drawMain(percent, forecolor, bgcolor,msg){
                /*
                    @drawing_elem: 绘制对象
                    @percent：绘制圆环百分比, 范围[0, 100]
                    @forecolor: 绘制圆环的前景色，颜色代码
                    @bgcolor: 绘制圆环的背景色，颜色代码
                */
                var canvas =this.$refs.pie;
                var context = canvas.getContext("2d");
                var center_x = canvas.width / 2;
                var center_y = canvas.height / 2;
                var rad = Math.PI*2/100;
                var speed = 0;
                var self = this;
                var width = canvas.width,
                    height=canvas.height;
                if (window.devicePixelRatio) {//移动端锯齿解决方案
                    canvas.style.width = width + "px";
                    canvas.style.height = height + "px";
                    canvas.height = height * window.devicePixelRatio;
                    canvas.width = width * window.devicePixelRatio;
                    context.scale(window.devicePixelRatio, window.devicePixelRatio);
                }
                // 绘制背景圆圈
                function backgroundCircle(){
                    context.save();
                    context.beginPath();
                    context.lineWidth = self.lineWidth; //设置线宽
                    var radius = center_y -  self.lineWidth/2;
                    context.lineCap = "round";
                    context.strokeStyle = bgcolor;
                    context.arc(center_x, center_y, radius, 0, Math.PI*2, false);
                    context.stroke();
                    context.closePath();
                    context.restore();
                }

                //绘制运动圆环

                function foregroundCircle(n){
                    context.save();
                    context.strokeStyle = forecolor;
                    context.lineWidth =  self.lineWidth
                    //context.lineCap = "round";
                    var radius = center_y - self.lineWidth/2;
                    context.beginPath();
                    context.arc(center_x, center_y, radius , -Math.PI/2, -Math.PI/2 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
                    context.stroke();
                    context.closePath();
                    context.restore();
                }
                //绘制文字
                function text(n){
                    context.beginPath();
                    var font_size = center_y*0.4;
                    context.fillStyle = '#121C32'
                    context.font="14px Arial";
                    var msg_width = context.measureText(msg.label).width;
                    context.fillText(msg.label,center_x-msg_width/2, center_y+font_size/2)
                    context.closePath()
                    context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
                    context.fillStyle = '#3D4AE8';

                    context.font = font_size + "px Helvetica";
                    var text_width = context.measureText(n.toFixed(0)).width;
                    context.fillText(n.toFixed(0), center_x-text_width/2, center_y - font_size/2);
                    context.restore();
                }
                //执行动画
               /* (function drawFrame(){
                    var stop = window.requestAnimationFrame(drawFrame);
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    backgroundCircle();
                    text(speed);
                    foregroundCircle(speed);
                    if(speed >= percent){
                        window.cancelAnimationFrame(stop);//可以取消该次动画。
                        return;
                    }
                    speed += 1;
                }());*/
                backgroundCircle();
                text(percent);
                foregroundCircle(percent);

            }
        },
	}
</script>

<style scoped>

</style>
