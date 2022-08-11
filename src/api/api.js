import {service,baseURL} from  '@/js/http'
//查询类型
export const getInquiryType =(params)=>{return  service({url:'/index/categorys',method:'get',params:params})}
//获取单一类型信息
export const getOneCategory =(params)=>{return  service({url:'/index/getOneCategory',method:'get',params:params})}

//提交订单
export const Order =(params)=>{return  service({url:'/report/addOrder',method:'post',data:params})}
//订单支付
export const payOrder =(params)=>{return  service({url:'/payCenter/payOrder',method:'post',data:params})}
//订单状态
export const orderPayStatus =(params)=>{return  service({url:'/payCenter/orderPayStatus',method:'post',data:params})}
//查看订单详情
export const getOrderXq =(params)=>{return  service({url:'/report/viewOrder',method:'post',data:params})}
//查看报告
export const getGenerate =(params)=>{return  service({url:'/report/view',method:'post',data:params})}
//订单列表
export const getOrderlist =(params)=>{return  service({url:'/report/orders',method:'post',data:params})}
//取消订单
//export const closeOrder =(params)=>{return  service({url:'/report/closeOrder',method:'post',data:params})}
//资讯详情
export const getArticle =(params)=>{return  service({url:'/article/view',method:'post',data:params})}

//摩羯任务状态
export const getInquiry_cb_status =(params)=>{return  service({url:'/moxie/getTaskStatus',method:'post',data:params})}
//用户注册
export const reg =(params)=>{return  service({url:'/Index/reg',method:'post',data:params})}
//获取手机验证码
export const getPhoneCode =(params)=>{return  service({url:'/index/getSmsCode',method:'post',data:params})}
//获取图片验证码
export const ImgCode =baseURL+'/index/getCaptchaCode'

//推广 获取用户推广的二维码
export const getReferrer =(params)=>{return  service({url:'/user/getReferrer',method:'post',data:params})}
//删除订单
export const delOrder =(params)=>{return  service({url:'/report/delOrder',method:'post',data:params})}
//获取推广用户信息
export const getUserPromotion =(params)=>{return  service({url:'/User/getUserPosterMsg',method:'post',data:params})}
//用户分析推广
export const getShareUrl =(params)=>{return  service({url:'/user/getShare',method:'post',data:params})}

//获取用户推广二维码
export const getUserSharePng =(params)=>{return  service({url:'/index/getSharePng',method:'get',params:params})}
/*一些协议、版本信息，关于我们*/
//注册协议
export const regAgreement =(params)=>{return  service({url:'/pages/regAgreement',method:'get',params:params})}
//征信数据分析协议
export const dataAnalysisAgreement =(params)=>{return  service({url:'/pages/dataAnalysisAgreement',method:'get',params:params})}
//隐私政策
export const privacyAgreement =(params)=>{return  service({url:'/pages/privacyAgreement',method:'get',params:params})}
//服务协议
export const serviceAgreement =(params)=>{return  service({url:'/pages/serviceAgreement',method:'get',params:params})}
//版本信息
export const versionMsg =(params)=>{return  service({url:'/index/getVersion',method:'post',data:params})}
//新功能介绍
export const newFeatures =(params)=>{return  service({url:'/pages/newFunIntroduce',method:'post',data:params})}

//关于我们
export const aboutUs =(params)=>{return  service({url:'/pages/about',method:'get',params:params})}
/*代理中心*/
export const agentCategory =(params)=>{return  service({url:'/agent/categorys',method:'get',params:params})}
/*代理单个产品*/
export const agentgetOneCategory =(params)=>{return  service({url:'/index/getOneCategory',method:'post',params:params})}
/*下单验证手机号*/
export const agentGetPhonecode =(params)=>{return  service({url:'/smsCode/send',method:'post',data:params})}
/*手机号查询历史记录*/
export const agentHistory =(params)=>{return  service({url:'/agent/smsOrders',method:'post',data:params})}
/*代理下单*/
export const agentAddOrder =(params)=>{return  service({url:'/agent/addOrder',method:'post',data:params})}
/*微信分享配置*/
export const wechatShare =(params)=>{return  service({url:'/wechat/share',method:'post',data:params})}
/*微信分享成功回调*/
export const wecahtshareSuccess =(params)=>{return  service({url:'/agent/wxShareCallback',method:'post',data:params})}
/*联系客服*/
export const concatCustomer =(params)=>{return  service({url:'/faq/index',method:'post',data:params})}
/*短信登录*/
export const smsLogin =(params)=>{return  service({url:'/agent/smsLoginOrReg',method:'post',data:params})}
/*h5获取订单记录*/
export const agentOrders =(params)=>{return  service({url:'/agent/orders',method:'post',data:params})}
/*取消订单*/
export const closeOrder =(params)=>{return  service({url:'/report/closeOrder',method:'post',data:params})}
/*获取个人信息*/
export const getUserInfo =(params)=>{return  service({url:'/User/getUserInfo',method:'post',data:params})}
/*佣金明细*/
export const commissionMoney =(params)=>{return  service({url:'/wallet/revenueLog',method:'post',data:params})}
/*提现明细*/
export const withdrawMoney =(params)=>{return  service({url:'/wallet/transferLog',method:'post',data:params})}
/*绑定支付宝*/
export const bindAlipay =(params)=>{return  service({url:'/wallet/bindAlipay',method:'post',data:params})}
/*余额提现*/
export const withdraw =(params)=>{return  service({url:'/wallet/transfer',method:'post',data:params})}
/*提现手续费*/
export const handlingFee =(params)=>{return  service({url:'/wallet/cost ',method:'post',data:params})}
/*系统全局设置*/
export const globalSys =(params)=>{return  service({url:'/index/systemSettings',method:'post',data:params})}
/*上传图片*/
export const uploadImg =(params)=>{return  service({url:'/upload/img',method:'post',data:params})}
/*意见反馈*/
export const feedback =(params)=>{return  service({url:'/User/feedback',method:'post',data:params})}
/*退出*/
export const logout =(params)=>{return  service({url:'/index/logout',method:'post',data:params})}
/*微信openid授权*/
//export const getOpenid = (target_url)=>{return baseURL+'/wechat/oauth?target_url='+encodeURIComponent(target_url)}
export const getOpenid = (params)=>{return  service({url:'/wechat/oauth',method:'get',params:params})}
/*代理状态*/
export const agentStatus = (params)=>{return  service({url:'/agent/agentStatus',method:'post',data:params})}
/*ios审核 账号特殊处理接口*/
export const isIosReview= (params)=>{return  service({url:'/index/auditor',method:'post',data:params})}

//报告图片地址获取
export const upLoadReportImg=(params)=>{return  service({url:'/report/saveReportImg',method:'post',data:params})}

//h5 微信授权id校验

export const wechatIdCheck=(params)=>{return  service({url:'/wechat/refresh',method:'get',params:params})}
