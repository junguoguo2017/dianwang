<template>
    <div style="text-align: center" ref="multipleRing">
        <canvas ref="pie" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
</template>

<script>
    export default {
        name: "multipleRings",
        data(){
            return {
                canvasWidth:0,
                canvasHeight:0
            }
        },
        props:{
            dataArray:{
                type:Array,
                default:function () {
                    return [1]
                }
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
            itemColor:{
                type:Array,
                default:function () {
                    return []
                }
            },
            lineWidth:{
                type:String,
                default:'10'
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.canvasWidth =  this.$refs.multipleRing.offsetWidth;
                this.canvasHeight = this.$refs.multipleRing.offsetHeight;
                setTimeout(()=>{
                    this.drawMain(this.inMsg)
                },1000)
            })

        },
        methods:{
            drawMain(msg){
                var allNum = 0
                this.dataArray.forEach((item)=>{
                    allNum+=item
                })
                var canvas =this.$refs.pie;
                var context = canvas.getContext("2d");
                var center_x = canvas.width / 2;
                var center_y = canvas.height / 2;
                var rad = Math.PI*2/allNum;

                var self = this;

                var width = this.canvasWidth,
                    height= this.canvasHeight;

                if (window.devicePixelRatio) {//移动端锯齿解决方案
                    canvas.style.width = width + "px";
                    canvas.style.height = height + "px";
                    canvas.height = height * window.devicePixelRatio;
                    canvas.width = width * window.devicePixelRatio;
                    context.scale(window.devicePixelRatio, window.devicePixelRatio);
                }

                //圆环
                function foregroundCircle(){
                    context.save();
                    var radius = center_y - self.lineWidth/2;
                    var endRadian = 0
                    self.dataArray.forEach((item,index)=>{
                        context.beginPath();
                        context.strokeStyle = self.itemColor[index];
                        context.lineWidth =  self.lineWidth;
                        context.arc(center_x, center_y, radius , -Math.PI/2+endRadian, -Math.PI/2 +endRadian+item*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
                        endRadian += item*rad
                        context.stroke();
                        context.closePath();
                    })
                    context.restore();
                }
                //绘制文字
                function text(){
                    context.beginPath();
                    var font_size = center_y*0.4;
                    context.fillStyle = '#7E838F';
                    context.font="14px Arial";
                    var msg_width = context.measureText(msg.label).width;
                    context.fillText(msg.label,center_x-msg_width/2, center_y+font_size/2)
                    context.closePath()
                    context.save(); //save和restore可以保证样式属性只运用于该段canvas元素

                    context.fillStyle = self.itemColor[0]
                    context.font = font_size + "px Helvetica";
                    var text_width = context.measureText(allNum.toFixed(0)).width;
                    context.fillText(allNum.toFixed(0), center_x-text_width/2, center_y - font_size/2);
                    context.restore();
                };
                text();
                foregroundCircle();
            }
        },
    }
</script>

<style scoped>

</style>
