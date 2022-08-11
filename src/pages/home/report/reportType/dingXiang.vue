<template>
    <div id="main">
        <div class="report_banner" v-if="reportData.personInfo">
            <div class="name" style="line-height: 1em;">{{reportData.personInfo.name}}</div>
            <div class="order_no" style="line-height: 1em;">报告编号：<i>{{order_no}}</i></div>
            <div class="userInformation">
                <div class="userMsgItem" >
                    <img src="@/assets/bankPhone.png" alt="" ><span>{{reportData.personInfo.mobile}}</span>
                </div>
                <div class="userMsgItem">
                    <img src="@/assets/bankUser.png" alt="" ><span>{{reportData.personInfo.age}}</span>
                </div>
                <div class="userMsgItem">
                    <img src="@/assets/bankCard.png" alt="" ><span>{{reportData.personInfo.idcard}}</span>
                </div>
                <div class="userMsgItem">
                    <img src="@/assets/bankLoc.png" alt="" ><span>{{reportData.personInfo.idcardLocation}}</span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" style="margin-top: -0.86rem;">
            <div class="sectiontitle">综合风险评估报告</div>
            <div class="smallItem"><span>综合风险评分</span></div>
            <div class="num_line">
                <div class="num_line_li zh">
                    <div class="num_line_lt clearfix"><span class="fl">综合风险评分</span><span class="fr">{{reportData.conclusion.score}}</span></div>
                    <div class="num_line_lc_p"><div class="num_line_lc_c"></div></div>
                </div>
                <div class="num_line_li zh">
                    <div class="num_line_lt clearfix"><span class="fl">手机号风险评分</span><span class="fr">{{reportData.mobileScore}}</span></div>
                    <div class="num_line_lc_p"><div class="num_line_lc_c"></div></div>
                </div>
            </div>
            <div class="analysisWrods" style="margin: 0;">解读：{{reportData.note.note1}}</div>
        </div>
        <div class="userInforBasic" >
            <div class="sectiontitle">综合黑名单信息</div>
            <div class="smallItem"><span>信贷黑名单评估-本人</span></div>
            <canvas id="black"  height="100" style="margin: 0.3rem 0"></canvas>
            <div class="analysisWrods" style="margin: 0;">解读：{{reportData.note.note2}}</div>
            <div class="blackType" >
                <span>被标记的黑名单分类：</span>
                <div
                    v-if="reportData.blackInfoDetail.blackTypes.length>0"
                     style="margin: 0 0.1rem;display: inline-block;">
                    <i v-for="(item,index) in reportData.blackInfoDetail.blackTypes"
                       :key="index">{{item}}</i>
                </div>
                <i v-else>--</i>
            </div>
            <div class="black_in">
                <div class="blacklist_title"><span class="circle_icon"></span><span>是否在黑名单</span></div>
                <div class="black_in_li">
                    <span >手机和姓名：<i>{{reportData.blackInfoDetail.mobileNameInBlacklist?'是':'否'}}</i></span>
                    <span>更新时间：{{formartData(reportData.blackInfoDetail.mobileNameBlacklistUpdatedTime)}}</span>
                </div>
                <div class="black_in_li">
                    <span>身份证和姓名：<i>{{reportData.blackInfoDetail.idcardNameInBlacklist?'是':'否'}}</i></span>
                    <span>更新时间：{{formartData(reportData.blackInfoDetail.idCardNameBlackUpdatedTime)}}</span>
                </div>
            </div>
            <div class="black_msg">
                <div class="blacklist_title"><span class="circle_icon"></span><span>黑名单详细信息：</span><span style="color:#39B2FF">{{reportData.blackInfoDetail.blacklistRecord.address}}</span></div>
                <div class="clearfix">
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">{{formartData(reportData.blackInfoDetail.blacklistRecord.capital)}}</span>
                        <span class="b_m_li_n">累计借入本金(元)</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">{{formartData(reportData.blackInfoDetail.blacklistRecord.paidAmount)}}</span>
                        <span class="b_m_li_n">累计已还金额(元)</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">{{formartData(reportData.blackInfoDetail.blacklistRecord.overdueAmount)}}</span>
                        <span class="b_m_li_n">累计逾期金额(元)</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">{{formartData(reportData.blackInfoDetail.blacklistRecord.overdueStatus)}}</span>
                        <span class="b_m_li_n">最大逾期天数(范围)</span>
                    </div>
                </div>
            </div>
            <div class="analysisWrods">解读：{{reportData.note.note3}}</div>
            <div class="black_msg">
                <div class="smallItem"><span>联系人的黑名单相关信息</span></div>
                <div class="blacklist_title" style="margin: 0.3rem 0"><span class="circle_icon"></span><span>直接联系人</span></div>
                <div class="clearfix">
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">{{formartData(reportData.blackInfoDetail.directContactCount)}}</span>
                        <span class="b_m_li_n">总数</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">{{formartData(reportData.blackInfoDetail.directBlackCount)}}</span>
                        <span class="b_m_li_n">在黑名单数量</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">{{formartData(reportData.blackInfoDetail.introduceBlackCount)}}</span>
                        <span class="b_m_li_n">引起黑名单数量</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">{{formartData(reportData.blackInfoDetail.introduceBlackRatio)}}%</span>
                        <span class="b_m_li_n">引起黑名单占比</span>
                    </div>
                </div>
                <div class="blackType" style="margin: 0.3rem 0">
                    <span >被标记的黑名单分类：</span>
                    <div
                        v-if="reportData.blackInfoDetail.directBlackType!=null"
                       >
                        <i  v-for="(item,index) in reportData.blackInfoDetail.directBlackType"
                            :key="index" style="margin: 0 0.1rem;display: inline-block;">{{item}}</i>
                    </div>
                    <i   v-else>{{formartData(reportData.blackInfoDetail.directBlackType)}}</i>
                </div>
                <div class="blacklist_title" style="margin: 0.3rem 0">
                    <span class="circle_icon"></span><span>直接亲密联系人</span>
                </div>
                <div class="clearfix">
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">{{formartData(reportData.blackInfoDetail.directIntimateContactCount)}}</span>
                        <span class="b_m_li_n">总数</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">{{formartData(reportData.blackInfoDetail.indirectIntimateBlackCount)}}</span>
                        <span class="b_m_li_n">在黑名单数量</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">{{formartData(reportData.blackInfoDetail.introduceIntimateBlackCount)}}</span>
                        <span class="b_m_li_n">引起黑名单数量</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">{{formartData(reportData.blackInfoDetail.introduceIntimateBlackRatio)}}</span>
                        <span class="b_m_li_n">引起黑名单占比</span>
                    </div>
                </div>
            </div>
            <div>
                <div class="blacklist_title" style="margin: 0.3rem 0">
                    <span class="circle_icon"></span><span>间接联系人在黑名单数量</span>
                </div>
                <div style="color:#d0d0d0;font-size: 0.24rem;margin: 0.2rem 0">
                    间接联系:&nbsp;<span style="color:#39B2FF">{{formartData(reportData.blackInfoDetail.indirectBlackCount)}}</span>
                </div>
                <div style="color:#d0d0d0;font-size: 0.24rem">
                    间接亲密联系:&nbsp;<span style="color:#39B2FF">{{formartData(reportData.blackInfoDetail.indirectIntimateBlackCount)}}</span>
                </div>
            </div>
            <div class="analysisWrods">解读：{{reportData.note.note4}}</div>
        </div>
        <div class="userInforBasic" >
            <div class="sectiontitle">信贷灰名单信息</div>
            <div class="smallItem"><span>信贷灰名单评估-本人</span></div>
            <p class="blackType" >
                <span >被标记的黑名单分类：</span>
                <i v-for="(item ,index) in  reportData.grayInfoDetail.grayTypes" :key="index">{{item}}</i>
            </p>
            <div class="black_in">
                <div class="blacklist_title"><span class="circle_icon"></span><span>是否在灰名单</span></div>
                <div class="black_in_li">
                    <span >手机和姓名：<i>{{reportData.grayInfoDetail.mobileNameInGray?'是':'否'}}</i></span>
                    <span>更新时间：{{formartData(reportData.grayInfoDetail.mobileNameGrayUpdatedTime)}}</span>
                </div>
                <div class="black_in_li">
                    <span>身份证和姓名：<i>{{reportData.grayInfoDetail.mobileNameInGray?'是':'否'}}</i></span>
                    <span>更新时间：{{formartData(reportData.grayInfoDetail.idcardNameGrayUpdatedTime)}}</span>
                </div>
            </div>
            <div class="black_msg">
                <div class="blacklist_title" style="margin: 0.3rem 0">
                    <span class="circle_icon"></span>
                    <span>灰名单详细信息</span>
                </div>
                <div class="clearfix" >
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">{{formartData(reportData.grayInfoDetail.grayRecord.capital)}}</span>
                        <span class="b_m_li_n">累计借入本金(元)</span>
                    </div>
                    <div class="b_m_li fl"  style="">
                        <span class="b_m_li_v">{{formartData(reportData.grayInfoDetail.grayRecord.paidAmount)}}</span>
                        <span class="b_m_li_n">累计已还金额(元)</span>
                    </div>
                    <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                        <span class="b_m_li_v">{{formartData(reportData.grayInfoDetail.grayRecord.overdueAmount)}}</span>
                        <span class="b_m_li_n">累计逾期金额(元)</span>
                    </div>
                    <div class="b_m_li fl" >
                        <span class="b_m_li_v">{{formartData(reportData.grayInfoDetail.grayRecord.overdueStatus)}}</span>
                        <span class="b_m_li_n">最大逾期天数(范围)</span>
                    </div>
                </div>
                <div class="analysisWrods">解读：{{reportData.note.note5}}</div>
            </div>

        </div>
        <div class="userInforBasic" >
            <div class="sectiontitle">多头申贷信息分析</div>
            <div>
                <div class="smallItem"><span>注册信息</span></div>
                <p class="blackType" style="margin: 0.3rem 0">
                    <span >注册机构数量：</span>
                    {{formartData(reportData.registerInfo.orgCount)}}
                </p>
                <div v-if="reportData.registerInfo.orgTypes.length>0" class="blackType" style="margin: 0.3rem 0;width: 100%;overflow:hidden;">
                    <span >注册机构类型：</span>
                    <div v-for="(item,index) in reportData.registerInfo.orgTypes" :key="index" style="margin: 0 0.1rem;display: inline-block;"><i>{{item}}</i></div>
                </div>
                <div class="black_msg" >
                    <div class="blacklist_title">
                        <span class="circle_icon"></span><span>机构查询统计：</span>
                        <span style="color:#39B2FF">{{formartData(reportData.queriedDetail.orgCount)}}</span>
                    </div>
                    <div class="trust" style="margin-bottom: 0.3rem;" v-if="reportData.queriedDetail.queriedInfos.length>0">
                        <div class="trust_title">征信机构</div>
                        <div class="trust_msg">
                            <div class="trust_msg_l"><span>日期：</span><i>{{formartData(reportData.queriedDetail.queriedInfos[0].date)}}</i></div>
                           <div class="trust_msg_l"><span>是否本机构查询：</span><i>{{reportData.queriedDetail.queriedInfos[0].self?'是':'否'}}</i></div>
                        </div>
                    </div>
                    <div class="trust" v-if="reportData.queriedDetail.queriedInfos.length>1">
                        <div class="trust_title">现金贷 </div>
                        <div class="trust_msg">
                           <div class="trust_msg_l"><span>日期：</span><i>{{formartData(reportData.queriedDetail.queriedInfos[1].date)}}</i></div>-->
                           <div class="trust_msg_l"><span>是否本机构查询：</span><i>{{reportData.queriedDetail.queriedInfos[1].self?'是':'否'}}</i></div>
                        </div>
                    </div>
                </div>
                <div class="analysisWrods">解读：{{reportData.note.note6}}</div>
            </div>
            <div v-if="reportData.queriedDetail.queriedAnalyze.length>0">
                <div class="black_msg" >
                    <div class="smallItem"><span>多平台借贷次数</span></div>
                    <div class="month"  >
                        <span class="m_pre" >《</span>
                        <span class="month_num">{{reportData.queriedDetail.queriedAnalyze[lunboTouchIndex].title}}</span>
                        <span class="m_next">》</span>
                    </div>
                    <div id="cor_box" style="overflow:hidden;position:relative;">
                        <div
                            id="lunbo"
                            style="position:absolute"
                            class="clearfix"
                        >
                            <div class="clearfix"  style="" v-for="(item,index) in reportData.queriedDetail.queriedAnalyze" :key="index">
                                <div class="b_m_li fl"  :style="{margin:index%2==0?'0 0.06rem 0.06rem 0':''}" v-for="(items,index) in item.items">
                                    <span class="b_m_li_v">{{formartData(items.value)}}</span>
                                    <span class="b_m_li_n">{{formartData(items.orgType)}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="analysisWrods">解读：{{reportData.note.note7}}</div>
            </div>
        </div>

        <div class="userInforBasic" v-if="reportData.suspiciousMobile.length>0">
            <div class="sectiontitle">手机存疑</div>
            <div class="smallItem"><span>使用过此手机的其他姓名</span></div>

            <div class="phone_suspect_name" v-for="(item,index) in reportData.suspiciousMobile.otherNames" :key="index">
                <img src="@/assets/reportBD_age.png" alt="" >
                <span class="name">{{item.name}}</span>
                <span class="last_time">最后使用时间：{{item.latestUsedTime}}</span>
            </div>
            <div class="smallItem"><span>使用过此手机的其他身份证</span></div>
            <div class="phone_suspect_card" v-for="(item,index) in reportData.suspiciousMobile.otherIdcards" >
                <img src="@/assets/reportBD_card.png" alt="">
                <div class="card_msg">
                    <span class="card">{{item.idcard}}</span>
                    <span class="last_time">最后使用时间：{{item.latestUsedTime}}</span>
                </div>
            </div>
            <div class="smallItem"><span>提供数据的机构类型</span></div>
            <div class="phone_suspect_card" v-for="(item,index) in reportData.suspiciousMobile.informationSources" >
                <img src="@/assets/reportBD_company.png" alt="">
                <div class="card_msg">
                    <span class="card">{{item.orgType}}</span>
                    <span class="last_time">最后使用时间：{{item.latestUsedTime}}</span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" v-if="reportData.suspiciousIdcard.length>0">
            <div class="sectiontitle">身份证存疑</div>
            <div class="smallItem"><span>使用过此身份证的其他姓名</span></div>

            <div class="phone_suspect_name" v-for="(item,index) in reportData.suspiciousIdcard.otherNames">
                <img src="@/assets/reportBD_age.png" alt="" >
                <span class="name">{{item.name}}</span>
                <span class="last_time">最后使用时间：{{item.latestUsedTime}}</span>
            </div>

            <div class="smallItem"><span>使用过此身份证的其他手机</span></div>
            <div class="phone_suspect_card" v-for="(item,index) in reportData.suspiciousIdcard.otherMobiles">
                <img src="@/assets/reportBD_phone.png" alt="">
                <div class="card_msg">
                    <span class="card">{{item.mobile}} <i style="">{{item.mobileLocation}}</i> <i>{{item.carrier}}</i></span>
                    <span class="last_time">最后使用时间：{{item.latestUsedTime}}</span>
                </div>
            </div>

            <div class="smallItem"><span>提供数据的机构类型</span></div>
            <div class="phone_suspect_card"  v-for="(item,index) in reportData.suspiciousIdcard.informationSources" >
                <img src="@/assets/reportBD_company.png" alt="">
                <div class="card_msg">
                    <span class="card">{{item.orgType}}</span>
                    <span class="last_time">最后使用时间：{{item.latestUsedTime}}</span>
                </div>
            </div>
        </div>
        <div class="userInforBasic" v-if="reportData.fundInfos||reportData.debitCardInfo||reportData.creditCardInfo">
            <div class="sectiontitle">关联账户信息</div>
            <div v-if="reportData.fundInfos.length>0">
                <div class="smallItem"><span>公积金账户</span></div>
                <p class="blackType" style="margin: 0.3rem 0">
                    <span >账务余额(元)：</span>
                    {{formartData(reportData.fundInfos[0].fundBasic.balance)}}
                </p>
                <div class="black_msg" >
                    <div class="clearfix">
                        <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                            <span class="b_m_li_v">{{formartData(reportData.fundInfos[0].fundBasic.updateDate)}}</span>
                            <span class="b_m_li_n">最近数据更新时间</span>
                        </div>
                        <div class="b_m_li fl"  style="">
                            <span class="b_m_li_v">{{formartData(reportData.fundInfos[0].fundBasic.lastPayDate)}}</span>
                            <span class="b_m_li_n">最新缴纳时间</span>
                        </div>
                        <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                            <span class="b_m_li_v">{{formartData(reportData.fundInfos[0].fundBasic.monthlyIncome)}}</span>
                            <span class="b_m_li_n">月缴金额(元)</span>
                        </div>
                        <div class="b_m_li fl"  style="">
                            <span class="b_m_li_v">{{formartData(reportData.fundInfos[0].fundBasic.totalMonths)}}</span>
                            <span class="b_m_li_n">近一年缴纳月数</span>
                        </div>
                        <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                            <span class="b_m_li_v">{{formartData(reportData.fundInfos[0].fundBasic.openDate)}}</span>
                            <span class="b_m_li_n">开户时间</span>
                        </div>
                        <div class="b_m_li fl"  style="">
                            <span class="b_m_li_v">{{formartData(reportData.fundInfos[0].fundBasic.openLocation)}}</span>
                            <span class="b_m_li_n">开户地区</span>
                        </div>
                        <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                            <span class="b_m_li_v">{{formartData(reportData.fundInfos[0].fundBasic.accountStatus)}}</span>
                            <span class="b_m_li_n">账户状态</span>
                        </div>
                        <div class="b_m_li fl"  style="">
                            <span class="b_m_li_v">{{formartData(reportData.fundInfos[0].fundBasic.baseAmount)}}</span>
                            <span class="b_m_li_n">基数</span>
                        </div>
                        <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                            <span class="b_m_li_v">{{formartData(reportData.fundInfos[0].fundBasic.totalCompanies)}}</span>
                            <span class="b_m_li_n">近一年缴纳单位数</span>
                        </div>
                        <div class="b_m_li fl" >
                            <span class="b_m_li_v">{{formartData(reportData.fundInfos[0].fundBasic.totalMonths)}}</span>
                            <span class="b_m_li_n">近一年连续缴纳月数</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="reportData.debitCardInfo">
                <div class="smallItem"><span>借记卡账户</span></div>
                <p class="blackType" style="margin: 0.3rem 0">
                    <span >近一年总收入(元)：</span>
                    {{formartData(reportData.debitCardInfo.totalIncome)}}
                </p>
                <p class="blackType" style="margin: 0.3rem 0">
                    <span >近一年总支出(元)：</span>
                    {{formartData(reportData.debitCardInfo.totalOutcome)}}
                </p>
                <div class="black_msg">
                    <div class="clearfix">
                        <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                            <span class="b_m_li_v">{{formartData(reportData.debitCardInfo.totalSalaryIncome)}}</span>
                            <span class="b_m_li_n">近一年工资收入</span>
                        </div>
                        <div class="b_m_li fl"  style="">
                            <span class="b_m_li_v">{{formartData(reportData.debitCardInfo.totalLoanIncome)}}</span>
                            <span class="b_m_li_n">近一年贷款收入</span>
                        </div>
                        <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                            <span class="b_m_li_v">{{formartData(reportData.debitCardInfo.totalConsumeOutcome)}}</span>
                            <span class="b_m_li_n">近一年消费支出</span>
                        </div>
                        <div class="b_m_li fl"  style="">
                            <span class="b_m_li_v">{{formartData(reportData.debitCardInfo.totalLoanOutcome)}}</span>
                            <span class="b_m_li_n">近一年还贷支出</span>
                        </div>
                        <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                            <span class="b_m_li_v">{{formartData(reportData.debitCardInfo.updateDate)}}</span>
                            <span class="b_m_li_n">最近数据更新时间</span>
                        </div>
                        <div class="b_m_li fl"  style="">
                            <span class="b_m_li_v">{{formartData(reportData.debitCardInfo.cardAmount)}}</span>
                            <span class="b_m_li_n">借记卡数</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="reportData.creditCardInfo">
                <div class="smallItem"><span>信用卡账户</span></div>
                <p class="blackType" style="margin: 0.3rem 0">
                    <span >总信用额(元)：</span>
                    {{formartData(reportData.creditCardInfo.totalCreditLimit)}}
                </p>
                <p class="blackType" style="margin: 0.3rem 0">
                    <span >总可用信用额(元)：</span>
                    {{formartData(reportData.creditCardInfo.totalCreditAvailable)}}
                </p>
                <p class="blackType" style="margin: 0.3rem 0">
                    <span >单一银行最高授信额度(元)：</span>
                    {{formartData(reportData.creditCardInfo.maxCreditLimit)}}
                </p>
                <div class="black_msg">
                    <div class="clearfix">
                        <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                            <span class="b_m_li_v">{{formartData(reportData.creditCardInfo.cardAmount)}}</span>
                            <span class="b_m_li_n">信用卡数</span>
                        </div>
                        <div class="b_m_li fl"  style="">
                            <span class="b_m_li_v">{{formartData(reportData.creditCardInfo.updateDate)}}</span>
                            <span class="b_m_li_n">最新数据更新时间</span>
                        </div>
                        <div class="b_m_li fl"  style="margin:0 0.06rem 0.06rem 0 ">
                            <span class="b_m_li_v">{{formartData(reportData.creditCardInfo.overdueTimes)}}</span>
                            <span class="b_m_li_n">近一年逾期次数</span>
                        </div>
                        <div class="b_m_li fl"  style="">
                            <span class="b_m_li_v">{{formartData(reportData.creditCardInfo.overdueMonths)}}</span>
                            <span class="b_m_li_n">近一年逾期月数</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="analysisWrods">解读：{{reportData.note.note8}}</div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "dingXiang",
        props:{
            reportData:{
                type:Object,
                default:()=>{}
            },
            order_no:{
                type:String,
                default: ''
            },
        },
        data(){
		    return {
		       lunboTouchIndex:0,
            }
        },
        mounted(){
            var self = this;
            this.dxinit();

            window.onresize=function () {
                self.dxinit()
            };
            if(this.reportData.queriedDetail.queriedAnalyze.length>0){
                this.$nextTick(()=>{
                    if(this.reportData.queriedDetail.queriedAnalyze.length>0){
                        var lunbo =new this.cor();
                        lunbo.domInit((index)=>{
                            self.lunboTouchIndex = index-1
                        });
                        document.querySelector('.m_pre').onclick=function () {
                            lunbo.pre((index)=>{
                                self.lunboTouchIndex = index-1;
                            })
                        }
                        document.querySelector('.m_next').onclick=function () {
                            lunbo.next((index)=>{
                                self.lunboTouchIndex = index-1
                            })
                        }
                    }
                })
            }



        },
        methods:{
		    formartData(val){
		        if(val!=null){
		            val = val.toString();
                    return val
                }else{
		            return '--'
                }
            },
            objFormarData(val,key){

                if(val){
                    for(var i in val){
                        console.log(val[i])
                        if(val[i][key]){
                            return val[i][key]
                        }else{
                            console.log(key)
                            return '--'
                        }
                    }
                }else{
                    return '--'
                }
            },
            dxinit() {
                var bodyW = document.body.offsetWidth;

                function blackCircle(canvasId, value, label, cH) {
                    var blackCanvas = document.getElementById(canvasId);
                    var ctx = blackCanvas.getContext('2d');
                    blackCanvas.style.width = bodyW * 630 / 750 + 'px';
                    blackCanvas.style.height = cH * 100 * bodyW / 750 + 'px';
                    blackCanvas.width = bodyW * 630 / 750
                    blackCanvas.height = cH * 100 * bodyW / 750
                    var w = blackCanvas.width;
                    var h = blackCanvas.height;

                    if (window.devicePixelRatio) {//移动端锯齿解决方案
                        blackCanvas.style.width = w + "px";
                        blackCanvas.style.height = h + "px";
                        blackCanvas.height = h * window.devicePixelRatio;
                        blackCanvas.width = w * window.devicePixelRatio;
                        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                    }
                    ctx.beginPath()
                    ctx.fillStyle = '#E9F7FF'
                    ctx.arc(w / 2, h / 2, h / 2, 0, 2 * Math.PI)
                    ctx.fill()
                    ctx.closePath()

                    ctx.beginPath()
                    ctx.lineCap = "round";
                    ctx.lineWidth = h / 2 * 0.1;
                    ctx.strokeStyle = '#39B2FF'
                    var per = -0.5 * Math.PI+value/100*2*Math.PI
                    ctx.arc(w / 2, h / 2, h / 2 * 0.95, -0.5 * Math.PI, per, false)
                    ctx.stroke()
                    ctx.closePath()

                    ctx.beginPath()
                    ctx.fillStyle = '#fff'
                    ctx.arc(w / 2, h / 2, h / 2 * 0.9, 0, 2 * Math.PI)
                    ctx.fill()
                    ctx.closePath()

                    ctx.beginPath()
                    ctx.fillStyle = '#E9F7FF';
                    ctx.arc(w / 2, h / 2, h / 2 * 0.7, 0, 2 * Math.PI)
                    ctx.fill()
                    ctx.closePath()


                    ctx.beginPath()
                    var fontSize = 14;
                    ctx.font = fontSize + "px Arial";
                    var value_width = ctx.measureText(value).width;
                    var label_width = ctx.measureText(label).width;

                    ctx.save()
                    ctx.fillStyle = '#39B2FF';
                    ctx.fillText(value, w / 2 - value_width / 2, h / 2 - fontSize / 2)
                    ctx.restore();

                    ctx.save()
                    ctx.fillStyle = '#A9A9A9'
                    ctx.fillText(label, w / 2 - label_width / 2, h / 2 + fontSize)
                    ctx.restore()

                    ctx.closePath()
                }
                var hei_score = this.reportData.blackInfoDetail.matchScore==''?100:this.reportData.blackInfoDetail.matchScore;
                blackCircle('black', 100-hei_score, '涉黑评分', 2);
                function initNumline(selectorName, dataArray) {
                    var linesB = document.querySelectorAll(selectorName);
                    var numMax = Math.max.apply(null, dataArray);
                    for (var i = 0; i < linesB.length; i++) {
                        var item = linesB[i].lastElementChild;
                        var percent = 100 * dataArray[i] / numMax;
                        item.firstChild.style.width = percent + '%'
                    }
                }

                function initperline(selectorName, dataArray, bigNum) {
                    var linesB = document.querySelectorAll(selectorName);
                    for (var i = 0; i < linesB.length; i++) {
                        var item = linesB[i].lastElementChild;
                        var percent = 100 * dataArray[i] / bigNum;
                        item.firstChild.style.width = percent + '%'
                    }
                }

                initperline('.zh', [this.reportData.conclusion.score, this.reportData.mobileScore], 100)
            },
            cor() {
                this.lunbTimer = null;
                this.duration = 2000;
                this.autoplay = false;
                this.touchstartX=0;
                this.touchstartY=0;
                this.disX=0;
                this.disY=0;
                this.touchendX=0;
                this.moveX=0;
                this.currentIndex=1;
                this.lunboq=true;
                this.childrens=[];
                this.touchDom = null;
                var self = this;
                this.domInit= function (cb) {
                    this.childrens = document.getElementById('lunbo').children;
                    this.touchDom = document.getElementById('lunbo');

                    for(var i=0;i<this.childrens.length;i++){//给列表初始化属性
                        this.childrens[i].style.float = 'left';
                        this.childrens[i].style.width = document.getElementById('cor_box').offsetWidth+'px'
                    }
                    var clonefirstLi = this.childrens[0].cloneNode(true);//初始化列表数量
                    var clonelastLi = this.childrens[this.childrens.length-1].cloneNode(true)
                    this.touchDom.appendChild(clonefirstLi)
                    this.touchDom.insertBefore(clonelastLi,this.childrens[0]);
                    this.touchendX = self.moveX = -this.childrens[0].offsetWidth;

                    this.touchDom.style.left = self.moveX+'px'
                    this.touchDom.style.width = this.childrens.length*this.childrens[0].offsetWidth+'px';
                    document.getElementById('cor_box').style.height = document.getElementById('lunbo').offsetHeight+10+'px';//设定盒子高度
                    /*事件绑定*/
                    this.touchDom.addEventListener('touchstart',self.touchstart,false)
                    this.touchDom.addEventListener('touchmove',self.touchmove,false)
                    this.touchDom.addEventListener('touchend',function (){
                        self.touchend();
                        if(cb){
                            cb(self.getIndex())
                        }
                    },false);
                    this.touchDom.addEventListener('touchcancle',self.touchcancle,false);
                    this.touchDom.addEventListener('click',function (e) {
                        e.preventDefault();
                        e.stopPropagation()
                    },false);
                    if(self.autoplay){//轮播
                        this.lunboInit()
                    };

                };
                this.lunboInit = function(){
                    var self = this;
                    self.lunbTimer = setInterval(()=>{
                        self.touchAction()
                    },self.duration)
                };
                this.touchstart = function(e){
                    clearInterval(self.lunbTimer)
                    if(!self.lunboq)return;
                    self.touchstartX = e.clientX||e.touches[0].clientX;
                    self.touchstartY = e.clientY||e.touches[0].clientY;
                }
                this.touchmove = function(e){
                    if(!self.lunboq)return;
                    self.touchDom.style.transition = "none";
                    self.touchDom.webkitTransform = "none";

                    var c_x = e.clientX||e.touches[0].clientX;
                    var c_y = e.clientY||e.touches[0].clientY;
                    self.disX = c_x-self.touchstartX;
                    self.disY = c_y-self.touchstartY;

                    if(Math.abs(self.disY)<Math.abs(self.disX)){//处理手指触摸方向，
                        e.preventDefault()
                        self.moveX = self.touchendX +self.disX;
                    }else {
                        self.moveX = self.touchendX;
                    }
                    self.touchDom.style.left = self.moveX+'px'

                }
                this.touchend = function(e){
                    if(!self.lunboq)return;
                    if(Math.abs(self.disX) >self.childrens[0].offsetWidth/3){
                        self.touchAction(self.disX<0)
                    }else{
                        self.touchendX=-self.childrens[0].offsetWidth*self.currentIndex
                        self.moveX = self.touchendX
                        self.touchDom.style.transition = 'left .3s ease-in';
                    };
                    self.touchDom.style.left = self.moveX+'px'
                    if(self.autoplay){
                        self.lunboInit()
                    };

                }
                this.touchAction = function (go,cb) {
                    if(go){
                        self.currentIndex+=1;
                    }else{
                        self.currentIndex-=1;
                    }
                    self.touchendX=self.currentIndex==0?0:-self.childrens[0].offsetWidth*self.currentIndex
                    self.moveX = self.touchendX;
                    self.touchstartX =0
                    self.touchDom.style.transition = 'left .3s ease-in'
                    self.touchDom.style.left = self.moveX+'px';

                    if(self.currentIndex==self.childrens.length-1){
                        self.lunboq = false;
                        function  nextInit() {//触摸滚动到头尾 初始化
                            self.currentIndex=1;
                            self.touchendX=-self.childrens[0].offsetWidth*self.currentIndex;
                            self.touchDom.style.left = self.touchendX+'px'
                            self.touchDom.style.transition = "none";
                            self.touchDom.webkitTransform = "none";
                            self.lunboq = true;
                            self.touchDom.removeEventListener('transitionend',nextInit)
                        }
                        self.touchDom.addEventListener('transitionend',nextInit, false)
                    }else if(self.currentIndex==0){
                        self.lunboq = false;
                        function  preInit() {//触摸滚动到头尾 初始化
                            self.currentIndex=self.childrens.length-2;
                            self.touchendX=-self.childrens[0].offsetWidth*self.currentIndex
                            self.touchDom.style.left = self.touchendX+'px'
                            self.touchDom.style.transition = "none";
                            self.touchDom.webkitTransform = "none";
                            self.lunboq = true;
                            self.touchDom.removeEventListener('transitionend',preInit)
                        }
                        self.touchDom.addEventListener('transitionend',preInit, false)
                    };
                    self.disX = 0
                    if(cb){
                        var index = self.getIndex()
                        cb(index)
                    }
                };
                var flag = true;
                this.next = function (cb) {
                   if(!flag)return;
                    setTimeout(()=>{
                        flag = true
                    },500)
                    self.touchAction(true,cb);
                    flag = false
                };
                this.pre = function (cb) {
                    if(!flag)return;
                    setTimeout(()=>{
                        flag = true
                    },500)
                    self.touchAction(false,cb)
                    flag = false
                };
                this.getIndex = function () {
                    var dotLi = self.childrens.length-2
                    var curIndex = self.currentIndex;
                    if(curIndex==dotLi+1)curIndex=1;
                    if(curIndex==0)curIndex=dotLi;
                    return curIndex
                }
            }
        },
        watch:{

        }
	}
</script>

<style scoped lang="less">
    .report_banner{
        overflow: hidden;
        height: 4.24rem;
        position: relative;
        background: url('../../../../assets/bankBanner.png') left top no-repeat;
        background-size: 100%;
        .name{
            font-size: 0.48rem;
            margin-top: 0.6rem;
            text-align: center;
            color:#fff;
        }
        .order_no{
            margin-top: 0.3rem;
            font-size: 0.28rem;
            color:#fff;
            text-align: center;
        }
        .userInformation{
            margin: 0.3rem 0.5rem 0 0.5rem;
            background: rgba(255,255,255,.4);
            border-radius: 0.1rem;
            padding: 0.3rem;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            .userMsgItem{
                width:50%;
                img{
                    width:0.3rem;
                    vertical-align: middle;
                }
                span{
                    color:#fff;
                    margin-left: 0.1rem;
                    font-size: 0.24rem;
                    vertical-align: middle;
                }
            }
            .userMsgItem:nth-of-type(1){
                margin-bottom: 0.3rem;
            }
            .userMsgItem:nth-of-type(2){
                margin-bottom: 0.3rem;
            }
        }
    }
    .sectiontitle{
        font-size: 0.3rem;
        font-weight: bold;
        color:#4a4a4a;
        line-height: 1em;
        /*margin-bottom: 0.4rem;*/
    }
    .smallItem{
        span{
            height: 0.4rem;
            line-height: calc(~"0.4rem - 2px");
            font-size: 0.2rem;
            color:#39B2FF;
            border-radius: 0.2rem;
            padding: 0 0.2rem;
            border:1px solid #39B2FF;
            display: inline-block;
            box-sizing: border-box;
            margin-top: 0.4rem;
        }

    }
    .analysisWrods{
        font-size: 0.24rem;
        color:#a9a9a9;
        line-height: 0.34rem;
        margin-top: 0.5rem;
    }
    .userInforBasic{
        z-index: 99;
        position: relative;
        padding:  0.3rem;
        margin: 0 0.3rem;
        margin-top: 0.3rem;
        border-radius: 0.2rem;
        background: #fff;
        .blackType{
            font-size: 0.24rem;
            color:#39b2ff;
            margin: 0.3rem auto;
            span{
                font-size: 0.24rem;
                color:#4a4a4a;
                font-weight: bold
            }
        }
        .blacklist_title{
            font-size: 0.24rem;
            font-weight: bold;
            color:#4a4a4a;
            margin-bottom: 0.3rem;
            .circle_icon{
                align-self: flex-start;
                display: inline-block;
                width: 0.16rem;
                height: 0.16rem;
                margin-top: 0.04rem;
                background: #39B2FF;
                border-radius: 50%;
                margin-right: 0.2rem;
            }
        }
    }
    .black_in{
        .black_in_li{
            padding-left: 0.3rem;
            span{
                display: block;
                margin-bottom: 0.3rem ;
            }
            span:nth-of-type(1){
                font-size: 0.28rem;
                color:#4a4a4a;
                i{
                    color:#39B2FF
                }
            }
            span:nth-of-type(2){
                font-size: 0.24rem;
                color:#a9a9a9;
            }
        }
    }
    .black_msg{
        .b_m_li{
            width:3.1rem;
            height: 1.12rem;
            background: #f5f5f5;
            span{
                display: block;
                text-align: center;
                line-height: 1em;
            }
            .b_m_li_v{
                color:#39B2FF;
                font-size: 0.3rem;
                margin: 0.20rem 0 0.16rem 0;
            }
            .b_m_li_n{
                font-size: 0.24rem;
                color:#a9a9a9
            }
        }
    }
    .trust{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        height: 0.72rem;
        .trust_title{
            font-size: 0.24rem;
            color:#4a4a4a;
            font-weight: bold;
            width:1.2rem;
            line-height: 0.72rem;
        }
        .trust_msg{
            .trust_msg_l{
                font-size: 0.24rem;
                line-height: 1em;
                span{
                    color:#a9a9a9;
                }
                i{
                    color:#39B2FF
                }
            }
            .trust_msg_l:nth-of-type(1){
                margin-bottom: 0.2rem ;
            }
        }
    }
    .month{
        padding: 0 0.32rem;
        text-align: center;
        margin: 0.15rem auto;
        height: 0.8rem;
        line-height: 0.8rem;
        .m_pre{
            display: inline-block;
            width:0.8rem;
        }
        .month_num{
            display: inline-block;
            width:2.16rem;
            text-align: center;

        }
        .m_next{
            display: inline-block;
            width:0.8rem;
        }
    }
    .phone_suspect_name{
        display: flex;
        justify-content: center;
        align-items: center;
        margin:0.2rem 0 ;
        img{
            width:0.3rem;
            margin-right: 0.24rem;
        }
        .name{
            margin-right: 0.7rem ;
            font-size: 0.3rem;
            color:#4a4a4a;
        }
        .last_time{
            font-size: 0.24rem;
            color:#a9a9a9;
            flex-grow: 1;
        }
    }
    .phone_suspect_card{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 0.3rem;
        img{
            width:0.3rem;
            align-self: flex-start;
            margin-right: 0.24rem;
        }
        .card_msg{
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            .card{
                line-height: 1em;
                font-size: 0.3rem;
                color:#4a4a4a;
                i{
                    font-size: 0.24rem;
                    color:#a9a9a9;
                }
            }
            .last_time{
                margin-top: 0.3rem;
                font-size: 0.24rem;
                color:#a9a9a9
            }

        }
    }
    .base_pie{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 0.3rem;
        &>canvas{
            margin-right: 0.3rem;
        }
        .base_pie_sescription{
            flex-grow: 1;

            .base_pie_sm{
                height: 0.5rem;
                line-height: 1em;
                .colorFk{
                    display: inline-block;
                    width:0.16rem;
                    height: 0.16rem;
                    margin-right: 0.1rem;
                }
                .base_onepie_color_1{
                    background: #39B2FF;
                }
                .base_onepie_color_2{
                    background: #4C7BFE;
                }
                .base_other_color{
                    background: #c8b0ff;
                }
                .base_twopie_color_1{
                    background: #FF5F3B;
                }
                .base_twopie_color_2{
                    background: #FFC130;
                }

                span:nth-of-type(2){
                    color: #a9a9a9
                }
            }

        }
    }
    .num_line{
        .num_line_li{
            margin-top: 0.3rem;
            .num_line_lt{
                font-size: 0.24rem;
                span:nth-of-type(1){
                    color:#666;
                }
                span:nth-of-type(2){
                    color:#39B2FF;
                }
                margin-bottom: 0.18rem;
            }
            .num_line_lc_p{
                position: relative;
                background: #E9F7FF;
                height: 0.14rem;
                .num_line_lc_c{
                    left: 0;
                    top:0;
                    height: 0.14rem;
                    background: #39B2FF;
                    position: absolute;
                }
            }
        }
    }
</style>
