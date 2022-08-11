<template>
    <div class="third_party_home" v-if="agentCategoryData">
        <div><img style="width:100%" :src="agentCategoryData.category_list_bg_img" alt=""></div>
        <div class="pro_top" :style="{
          marginTop:index==0?' -1.16rem':'0.2rem'
        }" @click="linktoInquiry(index)" v-for="(item,index) in agentCategoryData.categorys" :key="index">
            <img class="p_t_l" :src="item.logo" alt="" style="">
            <div class="p_t_r">
                <div class="p_t_r_name">{{item.category_name}}</div>
                <div  class="p_t_r_dec">{{item.description}}</div>
                <div  class="p_t_r_btn">立即检测</div>
                <div  class="p_t_r_count">已有{{mockData(index)}}人检测</div>
            </div>
        </div>
       <!-- <div class="p_b clearfix">
            <div class="p_b_l fl" @click="linktoInquiry(1)">
               <div class="p_b_l_l">
                   <div class="p_b_l_l_name">{{agentCategoryData.categorys[1].category_name}}</div>
                   <div class="p_b_l_l_dec1" >{{agentCategoryData.categorys[1].tags[0]}}</div>
                   <div class="p_b_l_l_dec2">{{agentCategoryData.categorys[1].tags[1]}}</div>
                   <div class="p_b_l_l_btn">立即检测</div>
               </div>
                <img class="p_b_l_r" :src="agentCategoryData.categorys[1].logo" alt="" style="">
            </div>
            <div class="p_b_r fr" @click="linktoInquiry(2)">
                <div class="p_b_r_name">{{agentCategoryData.categorys[2].category_name}}</div>
                <div  class="p_b_r_dec">{{agentCategoryData.categorys[2].tags[0]}}</div>
                <div  class="p_b_r_dec">{{agentCategoryData.categorys[2].tags[1]}}</div>
                <div  class="p_b_r_btn">立即检测</div>
            </div>
        </div>-->
        <div class="new_order_notice">
            <img :src="noticeIcon" alt="">

            <div id="moocBox" class="new_order_notice_li">
                <ul ref="order_ul">
                    <li  v-for="(item,index) in agentCategoryData.latest_orders" :key="index">
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
        <div style="margin-top: 0.2rem"><img style="width:100%" :src="agentCategoryData.category_list_footer_tips_up" alt=""></div>
        <div><img style="width:100%" :src="agentCategoryData.category_list_footer_tips_down" alt=""></div>
    </div>
</template>

<script>
    import {agentCategory,globalSys} from '@/api/api'
    import {getQuery} from "../../js/util";
    export default {
        data(){
            return {
                agentCategoryData:[],
                homebanner:require('@/assets/home/banner.png'),
                img1:require('@/assets/home/img1.png'),
                img2:require('@/assets/home/img2.png'),
                noticeIcon:require('@/assets/home/noticeIcon.png'),
                agentCategoryData:null,

            }
        },
        created(){
            this.getAgentCategoryData();
            globalSys().then((res)=>{
                if(res.code==1){
                    this.$store.dispatch('setCurrentTitle',res.data.app_name)
                }
            })
            /*可以下来刷新*/
          //  this.$store.commit('setRefreshTouch',true)
        },
        mounted(){

        },
        methods:{
            mockData(index){
               return this.agentCategoryData.search_num+index*11111
            },
            linktoInquiry(index){

                var agent =[
                    'da7d2817217c6d6525c8276153671f9d09cace80',
                    'ed73013924416bfaaa650b505b7716899b210899',
                    'b6421145d3833a527c861e2cf0974f8f4682aa19',
                    '94d61a8a6ea8d305f82f4417f933b63f0b202e10'
                ];
                //特殊代理特殊处理
                if(agent.indexOf(getQuery()['agent'])!=-1){
                    var item = this.agentCategoryData.categorys[0];
                }else{
                    var item = this.agentCategoryData.categorys[index];
                }
                this.$router.push({name:'third_inquiry',query:{category_id:item.category_id,category_name:item.category_name}})
            },
            noticeMsgRolling(){
                var area = document.getElementById('moocBox');
                var iliHeight =this.$refs.order_ul.children[0].offsetHeight;//单行滚动的高度
                var speed = 50;//滚动的速度
                var time;
                var delay= 2000;
                area.scrollTop=0;
                area.innerHTML+=area.innerHTML;//克隆一份一样的内容
                function startScroll(){
                    time=setInterval(scrollUp,speed);
                    area.scrollTop++;
                }
                function scrollUp(){
                    if(area.scrollTop % iliHeight==0){
                        clearInterval(time);
                        setTimeout(startScroll,delay);
                    }else{
                        area.scrollTop++;
                        if(area.scrollTop >= area.scrollHeight/2){
                            area.scrollTop =0;
                        }
                    }
                }
                setTimeout(startScroll,delay)
            },
            getAgentCategoryData(){
                agentCategory().then((res)=>{
                    if(res.code==1){
                        this.agentCategoryData = res.data;

                        this.$nextTick(()=>{
                            this.noticeMsgRolling()
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .third_party_home{
        background: #F6F7FB;
        .pro_top{
            padding-left: 0.15rem;
            position: relative;
            z-index: 2;
            margin: 0 auto;

            background: #Fff;
            width:6.9rem;
            height:2.9rem;
            background:rgba(255,255,255,1);
            box-shadow:0px 0.1rem 0.2rem 0px rgba(0,96,255,0.1);
            border-radius:0.2rem;
            display: flex;
            align-items: center;
            padding-top: 0.1rem;
            padding-bottom: 0.1rem;
            .p_t_l{
                width:2rem;
            }
            .p_t_r{
                margin-left: 0.16rem;
                height:2.9rem;
                width: 4.1rem;
                text-align: center;
                .p_t_r_name{
                    margin-top: 0.4rem;
                    font-family: PingFang-SC-Heavy;
                    font-weight: bold;
                    font-size: 0.34rem;
                    line-height: 0.34rem;
                    color:#2C3749;
                }
                .p_t_r_dec{
                    margin-top: 0.3rem;
                    font-family: PingFang-SC-Heavy;
                    font-size: 0.26rem;
                    line-height: 0.26rem;
                    color:#6F81A2;
                }
                .p_t_r_btn{
                    margin: 0 auto;
                    margin-top: 0.26rem;
                    background: url("../../assets/home/btn1.png")left center no-repeat;
                    width:3.2rem;
                    height: 0.96rem;
                    background-size: 100% 100%;
                    color:#fff;
                    font-family: PingFang-SC-Heavy;
                    font-size: 0.26rem;
                    line-height: 0.26rem;
                    line-height: 0.74rem;
                    text-align: center;
                }
                .p_t_r_count{
                    font-family:PingFang-SC-Regular;
                    font-size: 0.22rem;
                    line-height: 0.22rem;
                    color:#7B8597;
                    margin-top: -0.08rem;
                }
            }
        }
        .p_b{
            width:6.9rem;
            margin:  0 auto;
            margin-top: 0.2rem;
            .p_b_l{
                width:3.9rem;
                height:2.35rem;
                background:rgba(255,255,255,1);
                box-shadow:0px 0.1rem 0.2rem 0px rgba(255,138,30,0.1);
                border-radius:0.2rem;
                display: flex;align-items: center;
                .p_b_l_r{
                    width: 1.3rem;
                }
                .p_b_l_l{
                    padding-left: 0.3rem;
                    height:2.35rem;
                    .p_b_l_l_name{
                        margin-top: 0.12rem;
                        font-family: PingFang-SC-Bold;
                        font-weight: bold;
                        font-size: 0.28rem;
                        line-height: 0.42rem;
                        color:#2C3749;
                    }
                    .p_b_l_l_dec1{
                        margin-top: 0.18rem;
                        font-family: PingFang-SC-Medium;
                        font-size: 0.24rem;
                        line-height: 0.24rem;
                        color:#6F81A2;
                    }
                    .p_b_l_l_btn{
                        margin-top: 0.2rem;
                        background: url("../../assets/home/btn2.png")left center no-repeat;
                        width:1.94rem;
                        height: 0.86rem;
                        background-size: 100% 100%;
                        color:#fff;
                        font-family: PingFang-SC-Heavy;
                        font-size: 0.24rem;
                        line-height: 0.24rem;
                        line-height: 0.65rem;
                        text-align: center;
                    }
                    .p_b_l_l_dec2{
                        font-family:PingFang-SC-Medium;
                        margin-top: 0.2rem;
                        font-size: 0.24rem;
                        line-height: 0.24rem;
                        color:#6F81A2;
                    }
                }

            }

            .p_b_r{
                width:2.8rem;
                padding-left: 0.3rem;
                height:2.35rem;
                background:rgba(255,255,255,1);
                box-shadow:0px 0.1rem 0.2rem 0px rgba(255,138,30,0.1);
                border-radius:0.2rem;
                box-sizing: border-box;
                .p_b_r_name{
                    margin-top: 0.12rem;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    font-size: 0.28rem;
                    line-height: 0.42rem;
                    color:#2C3749;
                }
                .p_b_r_dec{
                    margin-top: 0.18rem;
                    font-family: PingFang-SC-Medium;
                    font-size: 0.24rem;
                    line-height: 0.24rem;
                    color:#6F81A2;
                }
                .p_b_r_btn{
                    margin-top: 0.2rem;
                    background: url("../../assets/home/btn3.png")left center no-repeat;
                    width:1.94rem;
                    height: 0.86rem;
                    background-size: 100% 100%;
                    color:#fff;
                    font-family: PingFang-SC-Heavy;
                    font-size: 0.24rem;
                    line-height: 0.24rem;
                    line-height: 0.65rem;
                    text-align: center;
                }

            }
        }
        .new_order_notice{
            height: 1rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0 0.3rem;
            background: #fff;
            margin-top: 0.4rem;
            img{
                width: 0.58rem;
            }
            .new_order_notice_li{
                margin-left: 0.3rem;
                height: 0.5rem;
                flex-grow: 1;
                overflow: hidden;
                ul{
                    li{
                        width: 100%;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        display: inline-block;
                        font-size:0.24rem;
                        color:#6F81A2;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        font-family:PingFang-SC-Medium;
                        font-weight:500;
                    }
                }
            }
        }
    }
</style>
