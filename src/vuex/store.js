import Vue from 'vue'
import Vuex from  'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
    hash_t:new Date().getTime(),
    reloadHtml:true,
    testDomain:'http://zx.xkzdai.com',
    Domain:'https://app.12credit.com',
    userInfoData:{},
    token:'',
    self:{},
    client:'h5',
    from_app:'lc',
    version:'1.0',
    showLogin:false,
    pageloading:false,
    isLogin:false,
    refreshPage:false,//重载当前页面
    headerNavHeight:0.92,
    tabbarHeight:0,
    currentTitle:'征信查询',
    page_animation:'',
    inquiryItemData:{},
    agent:'',//代理码
    customShow:false,
    uid:'',//微信id
    refreshTouch:false,
    shareData: {//微信分享
        title: '',
        desc: '',
        imgUrl: ''
    },
}
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
