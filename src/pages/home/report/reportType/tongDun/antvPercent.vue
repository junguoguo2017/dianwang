<template>
    <div>
        <canvas id="mountNode"  style="width: 6.88rem;height: 4rem;"></canvas>
    </div>
</template>

<script>
    import F2 from '@antv/f2'
	export default {
		name: "antvPercent",
        data(){
		    return {

            }
        },
        props:['percentData'],
        mounted(){
this.init()
        },
        methods:{
            init(){
                var _F = F2,
                    Shape = _F.Shape,
                    G = _F.G,
                    Util = _F.Util,
                    Global = _F.Global;
                var Vector2 = G.Vector2;

                // 极坐标下带圆角的柱子，只对极坐标生效
                var self = this;
                Shape.registerShape('interval', 'polar-tick', {
                    draw: function draw(cfg, container) {
                        var points = this.parsePoints(cfg.points);
                        var style = Util.mix({
                            stroke: cfg.color
                        }, Global.shape.interval, cfg.style);

                        var newPoints = points.slice(0);
                        if (this._coord.transposed) {
                            newPoints = [points[0], points[3], points[2], points[1]];
                        }

                        var center = cfg.center;
                        var x = center.x,
                            y = center.y;


                        var v = [1, 0];
                        var v0 = [newPoints[0].x - x, newPoints[0].y - y];
                        var v1 = [newPoints[1].x - x, newPoints[1].y - y];
                        var v2 = [newPoints[2].x - x, newPoints[2].y - y];

                        var startAngle = Vector2.angleTo(v, v1);
                        var endAngle = Vector2.angleTo(v, v2);
                        var r0 = Vector2.length(v0);
                        var r = Vector2.length(v1);

                        if (startAngle >= 1.5 * Math.PI) {
                            startAngle = startAngle - 2 * Math.PI;
                        }

                        if (endAngle >= 1.5 * Math.PI) {
                            endAngle = endAngle - 2 * Math.PI;
                        }

                        var lineWidth = r - r0;
                        var newRadius = r - lineWidth / 2;

                        return container.addShape('Arc', {
                            className: 'interval',
                            attrs: Util.mix({
                                x: x,
                                y: y,
                                startAngle: startAngle,
                                endAngle: endAngle,
                                r: newRadius,
                                lineWidth: lineWidth,
                                lineCap: 'round'
                            }, style)
                        });
                    }
                });
                /*最高分值不大于300*/

                var data = JSON.parse(JSON.stringify(self.percentData)) ;
                data[0].actual = data[0].actual>300?300:data[0].actual;
                /*[{

                    const: 'a',
                    actual: 75,
                    expect: 65535
                }];*/
                var chart = new F2.Chart({
                    id: 'mountNode',
                    padding: [0, 30, 60],
                    pixelRatio: window.devicePixelRatio
                });
                chart.source(data, {
                    actual: {
                        max: data[0].expect,
                        min: 0,
                        nice: false
                    }
                });
                chart.coord('polar', {
                    transposed: true,
                    innerRadius: 0.8,
                    startAngle: -Math.PI,
                    endAngle: 0
                });
                chart.axis(false);
                chart.interval().position('const*expect').shape('polar-tick').size(10).color('rgba(58,161,255, 0.95)').animate(false); // 背景条
                chart.interval().position('const*actual').shape('polar-tick').size(10).color('#fff').animate({
                    appear: {
                        duration: 1100,
                        easing: 'linear',
                        animation: function animation(shape, animateCfg) {
                            var startAngle = shape.attr('startAngle');
                            var endAngle = shape.attr('endAngle');
                            if (startAngle > endAngle) {
                                // -Math.PI/2 到 0
                                endAngle += Math.PI * 2;
                            }
                            shape.attr('endAngle', startAngle);
                            shape.animate().to(Util.mix({
                                attrs: {
                                    endAngle: endAngle
                                }
                            }, animateCfg)).onUpdate(function(frame) {
                                self.$nextTick(()=>{
                                    document.querySelector('#text').innerText = parseInt(frame * self.percentData[0].actual);
                                })

                               // document.getElementById('text').text(parseInt(frame * 75) + '%');
                            });
                        }
                    }
                }); // 实际进度
                chart.guide().html({
                    position: ['50%', '80%'],
                    html: '<div style="width: 120px;color: #fff;white-space: nowrap;text-align:center;">' + '<p style="font-size: 18px;margin:0;">总评分</p>' + '<p id="text" style="font-size: 48px;margin:0;font-weight: bold;">0</p>' + '</div>'
                });
                chart.render();
            }
        }
	}
</script>

<style scoped>
    canvas#mountNode {
        border-radius: 5px;
        background-color: #1890ff;
        background-image: linear-gradient(#246BFF, #2797FF);
    }
</style>
