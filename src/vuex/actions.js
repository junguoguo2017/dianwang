export default {
    init({commit},val){
        commit('INIT',val)
    },
    setCurrentTitle({commit},val){
        commit('SETCURRENT_TITLE',val)
    },
    isRepostFirstShow({commit},val){//此报告是否是首次查看
        return new Promise((resolve,reject)=>{
            var reportList = [];
            var isFirst = null;
            if(localStorage.reportList){
                reportList = JSON.parse(localStorage.reportList)
            }
            if(reportList.length>100){/*最多保存最近一百条订单记录*/
                reportList.shift()
            }
            if(reportList.indexOf(val)==-1){
                reportList.push(val);
                isFirst = true;
            }else{
                isFirst = false;
            }
            localStorage.reportList = JSON.stringify(reportList);
            resolve(isFirst)
        })
    }
}
