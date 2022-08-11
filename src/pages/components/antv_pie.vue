<template>
    <div style="display: flex;justify-content: flex-start;align-items: center;">
        <canvas v-if="per_null" id="noData" width="100" height="200"></canvas>
        <canvas id="pie" :width="per_null?211:311" height="200"></canvas>
    </div>
</template>

<script>
    import F2 from '@antv/f2'
	export default {
		name: "vant_pie",
        props:{
            Data:{
		      type:Array,
              default:()=>[]
            },
            per_null:{
                type:Boolean,
                default: false
            }
        },
        data(){
		    return {

            }
        },
        mounted(){

            if(this.per_null){
                this.per_null_initPie()
            }
        },
        methods:{
            per_null_initPie(){
                var canvas = document.getElementById('noData')
                var ctx = canvas.getContext('2d')
                ctx.strokeStyle = "red";
                ctx.lineWidth = "10";
                /*ctx.lineCap = 'round';*/

                //灰色圆环
                ctx.strokeStyle = "#587AF5";
                ctx.beginPath();
                ctx.arc(50, 100, 45, 0 , 2*Math.PI, true);
                ctx.textAlign = 'center'
                ctx.fillText('无数据',50,100)
                ctx.stroke();
                ctx.closePath();
            },
		    initPie(){
                let allPer = 0;
                for(let i in this.Data){
                    allPer+=this.Data[i].call_cnt_6m
                    this.Data[i].a='1'
                }
                 var map = {};
                 this.Data.map(function(obj) {
                     map[obj.analysis_desc] = obj.call_cnt_6m + '次';
                 });

                var chart = new F2.Chart({
                    id: 'pie',
                    pixelRatio: window.devicePixelRatio,
                    padding: [20, 'auto']
                });
                chart.source(this.Data, {
                    percent: {
                        formatter: function formatter(val) {
                            return val + '%';
                        }
                    }
                });
                chart.tooltip(false);
                chart.legend({
                    position: 'right',
                    itemFormatter: function itemFormatter(val) {
                        return val + '    ' + map[val];
                    }
                });
                chart.coord('polar', {
                    transposed: true,
                    innerRadius: 0.7,
                    radius: 0.85
                });
                chart.axis(false);

                chart.interval().position('a*call_cnt_6m').color('analysis_desc', ['#39B2FF','#4C7BFE','#FFC130','#FF5F3B','#8380FF','#C8B0FF','#9B51D4','#E67CA4']).adjust('stack');
                chart.render();
            }
        },
        watch:{
		    'Data':function () {
                this.initPie()
            }
        }
	}
</script>

<style scoped>

</style>
