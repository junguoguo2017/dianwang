<template>
   <!-- <flyPage>-->
    <div id="newsPage">
        <section >
            <div v-if="newsData.article" >
                <div class="articleHeader" >
                    <p class="newsTitle">{{newsData.article.title}}</p>
                    <div class="articlemsg" style="">
                        <span>{{newsData.article.category_name}} · {{newsData.article.create_time}}</span>
                        <span>阅读：{{newsData.article.views}}</span>
                    </div>
                </div>
                <div class="article_con" id="article_con">
                    <div v-html="newsData.article.content"></div>
                </div>
                <div class="more_article_title" style="">
                    <h5>相关文章</h5>
                </div>
                <div >
                    <div class="more_article_list"  v-for="item in newsData.similar_articles" @click="newArticle(item.article_id)">
                        <p class="more_article_list_title" >{{item.title}}</p>
                        <div  class="more_article_list_view clearfix">
                            <span class="iconfont icon-yanjing fl" ></span>
                            <span class="fl" style="margin-left: 0.1rem;">{{item.views}}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div v-show="noDataTips.length>0" style="text-align: center;">{{noDataTips}}</div>
        </section>
    </div>
    <!--</flyPage>-->
</template>

<script>
    import {getArticle} from '@/api/api'
    import {getQuery} from '@/js/util'
	export default {
		name: "newsDetial",
        data(){
		    return {
                newsData:{},
                newsCon:'',
                noDataTips:'',
                article_url:''
            }
        },
        mounted(){
            if(!getQuery()['article_id'])return;
            this.getArticleData(getQuery()['article_id']);
        },
        methods:{
            getArticleData(article_id){
                var params = {
                    article_id:article_id
                }
                getArticle(params).then((res)=>{
                    if(res.code==1){
                        this.newsData = res.data;
/*分享*/
                        var Url = window.location.href.split('?')[0]+'?article_id='+article_id;

                        if(this.$store.state.client =='ios'){
                            try{
                                window.webkit.messageHandlers.updateArticleUrl.postMessage({
                                    url:Url,
                                    title:this.newsData.article.title,
                                    description:this.newsData.article.description
                                })
                            }catch(e){

                            }
                        }else if(this.$store.state.client =='android'){
                            try{

                                var updateArticleUrl ={
                                    url:Url,
                                    title:this.newsData.article.title,
                                    description:this.newsData.article.description
                                }
                                window.android.updateArticleUrl(JSON.stringify(updateArticleUrl));
                            }catch(e){

                            }
                        }
                        this.$nextTick(()=>{
                            let img_arr = document.getElementById('article_con').getElementsByTagName('img');
                            if(img_arr.length>0){
                                for(var i=0;i<img_arr.length;i++){
                                    /*强制修改文章文本样式*/
                                    img_arr[i].parentNode.parentNode.style.textIndent = '0'
                                    //img_arr[i].style.width = img_arr[i].offsetWidth/100+'rem'
                                }
                            }
                           /* setTimeout(()=>{

                            },200)*/
                            let a_arr = document.getElementById('article_con').getElementsByTagName('a')
                            if(a_arr.length>0){
                                for(var j=0;j<a_arr.length;j++ ){
                                    a_arr[j].target =  '_blank'
                                }
                            };
                        })
                    }else{
                        this.noDataTips = '暂无数据'
                    }
                })
            },
            newArticle(article_id){
                this.newsData = {};
                this.getArticleData(article_id)
            }
        },
	}
</script>

<style  lang="less">
    .articleHeader{
        padding:0.32rem 0.3rem 0;margin-top: 0.16rem;background-color: #fff;
        .newsTitle{
            font-size: 0.36rem;
           /* height: 0.42rem;*/
            line-height: 0.42rem;
            background: #fff;
            color: #4a4a4a;
            /*text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;*/
        }
        .articlemsg{
            color:#a9a9a9;margin-top: 0.96rem;padding-bottom:0.36rem;display: flex;justify-content: space-between;align-items: center
        }
    }
    .article_con{
        margin-top: 0.04rem; padding: 0.29rem 0.3rem 0;background-color: #fff;
        img{
            width: 100%;
            overflow: hidden;
        }
        p{
            font-size: 0.28rem;line-height: 0.5rem;color:#666666;

        }
    }

    .more_article_title{
        padding: 0 0.3rem;margin-top: 0.16rem;background: #fff;
        h5{
            height: 1rem;line-height: 1rem;font-size: 0.36rem;
        }
    }
    .more_article_list{
        background: #fff;padding: 0 0.3rem;margin-top: 0.04rem;display: flex;justify-content: space-between;align-items: center;height: 1rem;
        color:#4a4a4a;
        .more_article_list_title{
            text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:80%;
        }
        .more_article_list_view{
            width:15%;color: #a9a9a9;
        }
    }
</style>
