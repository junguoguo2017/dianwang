<template>
    <div>
        <div class="infoOne" :style="{backgroundImage:`url(${require('@/assets/reportImg/tongDunBanner.jpg')})`}">
            <div class="wrap">
                <!--<div class="left">
                    <div :style="{backgroundImage:`url(${require('@/assets/images/baseInfo-avatar.png')})`}"></div>
                </div>-->
                <div class="right">
                    <div class="top">{{orderData.realname}}</div>
                    <div class="bottom">{{orderData.sex}}<i>|</i>报告编号：{{orderData.order_no}}</div>
                </div>

            </div>
        </div>
        <div class="infoTwo clearfix">
            <div class="fl infoTwo_item" >
                <img src="@/assets/reportImg/report_phone.png" style="width: 0.18rem" alt=""><span>{{orderData.phone}}</span>
            </div>
            <div class="fl infoTwo_item">
                <img src="@/assets/reportImg/report_age.png" style="width: 0.2rem"  alt=""><span>{{orderData.age}}</span>
            </div>
            <div class="fl infoTwo_item" style="margin-bottom: 0">
                <img src="@/assets/reportImg/report_ucard.png" style="width: 0.25rem"  alt=""><span>{{orderData.id_card}}</span>
            </div>
            <div class="fl infoTwo_item" style="margin-bottom: 0">
                <img src="@/assets/reportImg/report_loc.png" style="width: 0.18rem"  alt=""><span>{{orderData.area}}</span>
            </div>
            <div class="lastShowTime" style="">{{endTime}}</div>
        </div>
    </div>

</template>
<script>
    export default {
        name:'topBanner',
        props:['orderData','endTime']
    };
</script>

<style lang="less">
    .infoOne {
        width: 100%;
        height: 2.83rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        overflow: hidden;
        > .wrap {
            margin-top: 0.5rem;
            width: 100%;
            display: flex;
            align-items: center;
            > .left {
                width: 0.97rem;
                height: 0.68rem;
                border-top-right-radius: 0.4rem;
                border-bottom-right-radius: 0.4rem;
                background: rgba(72, 84, 253, 1);
                display: flex;
                align-items: center;
                justify-content: flex-end;
                > div {
                    margin-right:0.06rem;
                    width: 0.58rem;
                    height: 0.58rem;
                    border-radius: 100%;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
            }
            > .right {
                margin-left: 0.25rem;
                > .top {
                    font-size: 0.31rem;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                }
                > .bottom {
                    margin-top: 0.16rem;
                    font-size: 0.20rem;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    > i {
                        margin: 0rem 0.15rem;
                    }
                }
            }
        }
    }
    .infoTwo{
        width:6.85rem;

        padding:  0.4rem 0.3rem 0;
        border-radius: 0.08rem;
        height: 1.93rem;
        margin: -1rem auto 0;
        box-sizing: border-box;
        background: -webkit-gradient(left, #4866FF,#7C79FF );
        background: -moz-linear-gradient(right,  #4866FF,#7C79FF );
        background: -o-linear-gradient(right, #4866FF,#7C79FF );
        background: linear-gradient(to right, #4866FF,#7C79FF );
        box-shadow: 0 0.06rem 0.2rem 0.1rem rgba(124,121,255,0.4);
        position: relative;

        .lastShowTime{
            position: absolute;
            bottom: 0;
            left: 0.3rem;
            font-size: 0.24rem;color:#fff;line-height: 0.6rem;
        }
        .infoTwo_item{
            width: 50%;
            margin-bottom: 0.33rem;
            img{
                vertical-align: middle;
                margin-right: 0.26rem;
            }
            span{
                vertical-align: middle;
                font-size: 0.22rem;
                color:#fff;
            }
        }
    }
</style>

