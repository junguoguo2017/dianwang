import Vue from 'vue';
import confirm from './index.vue';

let confirmConstructor = Vue.extend(confirm);
let confirmShow = false;
let theConfirm = function (text) {
    return new Promise((res, rej) => { //promise封装，ok执行resolve，no执行rejectlet


        if(confirmShow)return;//存在弹窗
        let confirmDom = new confirmConstructor({
            el: document.createElement('div')
        });
        document.body.appendChild(confirmDom.$el);  //new一个对象，然后插入body里面
        confirmShow = true;
        if(!text.btn){
            text.btn = {
                ok:'确定',
                no:'取消'
            }
        }
        confirmDom.text = text;   //为了使confirm的扩展性更强，这个采用对象的方式传入，所有的字段都可以根据需求自定义
        confirmDom.ok = function () {

            if(text.okbtn){
                text.okbtn((val)=>{
                    if(val==false){
                        confirmDom.isShow = confirmShow = true
                    }else if(val||typeof val ==='undefined'){
                        confirmDom.isShow = confirmShow = false
                    }
                })

            }else{
                confirmDom.isShow = confirmShow = false
            }
            /*兼容之前的*/
            res((val)=>{
                if(val==false){
                    confirmDom.isShow = confirmShow = true
                }else if(val||typeof val ==='undefined'){
                    confirmDom.isShow = confirmShow = false
                }
            });

        }
        confirmDom.close = function () {
            if(text.cancle){
                text.cancle((val)=>{
                    if(val==false){
                        confirmDom.isShow = confirmShow = true
                    }else if(val||typeof val ==='undefined'){
                        confirmDom.isShow = confirmShow = false
                    }
                })

            }else{
                /*兼容之前的*/
                rej((val)=>{
                    if(val==false){
                        confirmDom.isShow = confirmShow = true
                    }else if(val||typeof val ==='undefined'){
                        confirmDom.isShow = confirmShow = false
                    }
                })
            }
        }
    })
}

Vue.prototype.$dialog ={
    confirm:theConfirm
}
export default theConfirm;
