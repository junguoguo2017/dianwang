<template>
    <div  >
        <!--主内容-->
        <section   style="padding: 0 0.3rem 0.2rem;background: #fff;">
            <div style="height: 1.1rem;display: flex;justify-content: center;align-items: center;">
                <img :src="creditInquiry_title1" alt="" style="height: 0.5rem;">
            </div>
            <div class="creditInquiryItem" style="margin-top: 0.16rem;"
                 v-for="item in topCategorys"
                 :key="item.category_id"
                 @click="linkToInquiry(item)"
            >
                <div class="creditInquiryItemIcon">
                    <img :src="item.logo" alt="">
                </div>
                <div class="creditInquiryItemDescription " >
                    <h5 class="rightIcon">
                        {{item.category_name}} <img v-if="item.hot" :src="hot" alt=""><img v-if="item.top" :src="recommend" alt="">
                    </h5>
                    <p class="text_ellipsis">
                        {{item.description}}
                    </p>
                    <span class="text_ellipsis">{{item.tips}}</span>
                </div>

            </div>
            <div style="height: 1.1rem;display: flex;justify-content: center;align-items: center;">
                <img :src="creditInquiry_title2" alt="" style="height: 0.5rem;">
            </div>

            <div class="creditInquiryItem" style="margin-top: 0.16rem;"
                 v-for="item in categorys"
                 :key="item.category_id"
                 @click="linkToInquiry(item)"
            >
                <div class="creditInquiryItemIcon">
                    <img :src="item.logo" alt="">
                </div>
                <div class="creditInquiryItemDescription ">
                    <h5 class="rightIcon">
                        {{item.category_name}} <img v-if="item.hot" :src="hot" alt=""><img v-if="item.top" :src="recommend" alt="">
                    </h5>
                    <p class="text_ellipsis">
                        {{item.description}}
                    </p>
                    <span class="text_ellipsis">{{item.tips}}</span>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
    import  {getInquiryType} from '@/api/api'
	export default {
		name: "creditInquiry",
        data(){
		    return {
                creditInquiry_title1:require('@/assets/creditInquiry_title1.png'),
                creditInquiry_title2:require('@/assets/creditInquiry_title2.png'),
                hot:require('@/assets/hot.png'),
                recommend:require('@/assets/recommend.png'),
                topCategorys:[],
                categorys:[],
                isKeepalive_Once:true,
                myscroll:null,
            }
        },
        activated(){//keepalive进入
        },
        deactivated(){},//keepalive离开
        beforeRouteLeave(to,from,next){
            next()
        },
        mounted(){
            this.getInquiryType();
        },
        methods:{
		    refresh(){
		        var self = this;
		        setTimeout(()=>{
		            self.$emit('refreshDone',true)
                },2000)
            },
            getInquiryType(){
                getInquiryType().then((res)=>{
                    if(res.code ==1){
                        this.topCategorys = res.data.topCategorys
                        this.categorys = res.data.categorys;

                        this.$nextTick(()=>{
                            this.a_test = res.data.topCategorys[0].logo;
                            console.log(this.$refs.a_test)
                        })
                    }
                })
            },
            linkToInquiry(item){
                this.$goRouter({name:'inquiry',query:{category_id:item.category_id}})
                this.$store.commit('getinquiryItemData',item)
            }

        }
	}
</script>

<style scoped lang="less">
    .navHeader{
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.36rem;
        color:#fff;
        background: url("../../assets/nav_bg.png") left center no-repeat;
        background-size: 100%;
    }
    .creditInquiryItem{
        background: -webkit-linear-gradient(left, #e5f1ff,#bde5ff); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #e5f1ff,#bde5ff); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #e5f1ff,#bde5ff); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right,#e5f1ff,#bde5ff);
        height: 2.2rem;border-radius:0.1rem;display: flex;justify-content: flex-start;align-items: center;
        .creditInquiryItemIcon{
            width:1.8rem;
            display: flex;
            justify-content:center;
            align-items: center;
            &>img{
                width:0.96rem;
            }
        }
        .creditInquiryItemDescription{
            align-self: flex-start;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
            .rightIcon{
                position: relative;
                &>img{
                    position: absolute;
                    width:0.28rem;
                    top: -0.14rem;
                    right:-0.28rem;
                }
            }
            &>h5{
                max-width: 4.5rem;
                font-size: 0.32rem;
                color:#4a4a4a;
                margin-top: 0.5rem;

            }
            &>p{
                max-width: 4.5rem;
                color:#666666;
                font-size: 0.24rem;
                margin-top: 0.2rem;
            }
            &>span{
                max-width: 4rem;
                display: inline-block;
                height: 0.3rem;
                background: -webkit-linear-gradient(left, #ffc48a,#ff603c); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(right, #ffc48a,#ff603c); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(right, #ffc48a,#ff603c); /* Firefox 3.6 - 15 */
                background: linear-gradient(to right,#ffc48a,#ff603c);
                color:#fff;
                padding: 0 0.15rem;
                line-height: 0.3rem;
                font-size: 0.2rem;
                border-radius:0.15rem;
                margin-top: 0.2rem;
            }
        }
    }
    .list{
        width:7.5rem;
        height: 3rem;
        background: red;
        font-size: 20px;
    }
</style>
