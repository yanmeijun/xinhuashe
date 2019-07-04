const bodyParser = require('body-parser'),
    moment = require('moment'),
    _ = require('underscore'),
    indexCon = require("./app/controllers/index").indexCon,
    bjgjjCon = require("./app/controllers/bjGJJ").bjgjjCon,
    serviceCon = require("./app/controllers/service").serviceCon,
    carCon = require("./app/controllers/car").carCon,
    insuranceCon = require("./app/controllers/insurance").insuranceCon,
    educationCon = require("./app/controllers/education").educationCon,
    mofcomCon = require("./app/controllers/mofcom").mofcomCon,
    trainCon = require("./app/controllers/train").trainCon,
    tourismCon = require("./app/controllers/tourism").tourismCon,
    unhealthyCon = require("./app/controllers/unhealthy").unhealthyCon,
    hospitalCon = require("./app/controllers/hospital").hospitalCon,
    degreeCon = require("./app/controllers/degree").degreeCon,
    systemCon = require("./app/controllers/system").systemCon,
    creditCon = require("./app/controllers/credit").creditCon,
    mandarinCon = require("./app/controllers/mandarin").mandarinCon,
    teacherQualificationCon = require("./app/controllers/teacherQualification").teacherQualificationCon,
    exportTaxCon = require("./app/controllers/exportTax").exportTaxCon,
    museumCon = require("./app/controllers/museum").museumCon,
    ncreCon = require("./app/controllers/ncre").ncreCon,
    remoteHospCon = require("./app/controllers/remoteHosp").remoteHospCon,
    taxOfficeCon = require("./app/controllers/taxOffice").taxOfficeCon,
    postgraduateCon = require("./app/controllers/postgraduate").postgraduateCon,
    touristAttractionCon = require("./app/controllers/touristAttraction5A").touristAttractionCon,
    nationalMedicalCon = require("./app/controllers/nationalMedical").nationalMedicalCon,
    GzOnlineWorkCon = require("./app/controllers/GzOnlineWork").GzOnlineWorkCon,
    pointsSettledCon = require("./app/controllers/pointsSettled").pointsSettledCon,
    heNanHighwayTollCon = require("./app/controllers/heNanHighwayToll").heNanHighwayTollCon,
    QhPassengerTransportCon = require("./app/controllers/QhPassengerTransport").QhPassengerTransportCon,
    administrativeDivisionsCon = require("./app/controllers/administrativeDivisions").administrativeDivisionsCon,
    sameNameCon = require("./app/controllers/sameName").sameNameCon,
    henanHospitalCon = require("./app/controllers/henanHospital").henanHospitalCon,
    infringementPiracyCon = require("./app/controllers/infringementPiracy").infringementPiracyCon,
    cancelPermitCon = require("./app/controllers/cancelPermit").cancelPermitCon,
    taxInvoiceCheckCon = require("./app/controllers/taxInvoiceCheck").taxInvoiceCheckCon,
    buildEntApprovalCon = require("./app/controllers/buildEntApproval").buildEntApprovalCon,
    adminCancelPermitCon = require("./app/controllers/adminCancelPermit").adminCancelPermitCon,
    judicialOfficeCon = require("./app/controllers/judicialOffice").judicialOfficeCon,
    supervisionCertificateCon = require("./app/controllers/supervisionCertificate").supervisionCertificateCon,
    buildEntCertificateCon = require("./app/controllers/buildEntCertificate").buildEntCertificateCon,
    propertyTaxCon = require("./app/controllers/propertyTax").propertyTaxCon,
    corporateTaxCon = require("./app/controllers/corporateTax").corporateTaxCon,
    personalTaxCon = require("./app/controllers/personalTax").personalTaxCon,
    businessTaxCon = require("./app/controllers/businessTax").businessTaxCon,
    sDHospitalCon = require("./app/controllers/sDHospital").sDHospitalCon,
    gsHospitalCon = require("./app/controllers/gsHospital").gsHospitalCon,
    shanxiHospitalCon = require("./app/controllers/shanxiHospital").shanxiHospitalCon,
    nmgHospitalCon = require("./app/controllers/nmgHospital").nmgHospitalCon,
    shangHaiFundCon = require("./app/controllers/shangHaiFund").shangHaiFundCon,
    jxHospitalCon = require("./app/controllers/jxHospital").jxHospitalCon,
    sXHospitalCon = require("./app/controllers/sXHospital").sXHospitalCon,
    weChatCon = require("./app/controllers/weChat").weChatCon,
    passportCon = require("./app/controllers/passport").passportCon,
    haiNanTourismCon = require("./app/controllers/haiNanTourism").haiNanTourismCon,
    userLoginInfoCon = require("./app/controllers/userLoginInfo").userLoginInfoCon,
    anhuiHospitalCon = require("./app/controllers/anhuiHospital").anhuiHospitalCon,
    organizationReportCon = require("./app/controllers/organizationReport").organizationReportCon,
    monitorReportCon = require("./app/controllers/monitorReport").monitorReportCon,
    chainCardCon = require("./app/controllers/chainCard").chainCardCon,
    corruptionReportCon = require("./app/controllers/corruptionReport").corruptionReportCon,
    culturalMarketReportCon = require("./app/controllers/culturalMarketReport").culturalMarketReportCon,
    networkCrimeReportCon = require("./app/controllers/networkCrimeReport").networkCrimeReportCon,
    overseasNgoReportCon = require("./app/controllers/overseasNgoReport").overseasNgoReportCon,
    hfzggjspcsCon = require("./app/controllers/hfzggjspcs").hfzggjspcsCon,
    jrzggjspcsCon = require("./app/controllers/jrzggjspcs").jrzggjspcsCon,
    exitChinaNationCon = require("./app/controllers/exitChinaNation").exitChinaNationCon,
    housingReportCon = require("./app/controllers/housingReport").housingReportCon,
    dutyCrimeReportCon = require("./app/controllers/dutyCrimeReport").dutyCrimeReportCon,
    zywxReportCon = require("./app/controllers/zywxReport").zywxReportCon,
    policemenReportCon = require("./app/controllers/policemenReport").policemenReportCon,
    publishedReportCon = require("./app/controllers/publishedReport").publishedReportCon,
    gunviolenceReportCon = require("./app/controllers/gunviolenceReport").gunviolenceReportCon,
    fdegreeCertificationCon = require("./app/controllers/fdegreeCertification").fdegreeCertificationCon,
    lawfirmEnquiriesCon = require("./app/controllers/lawfirmEnquiries").lawfirmEnquiriesCon,
    emergencyPhoneCon = require("./app/controllers/emergencyPhone").emergencyPhoneCon,
    knowledgeReportCon = require("./app/controllers/knowledgeReport").knowledgeReportCon,
    linmuCon = require("./app/controllers/linmu").linmuCon,
    gdsgGJJCon = require("./app/controllers/gdsgGJJ").gdsgGJJCon;
/*
   * 路由设置
   * method：请求方式
   * urls：请求地址(数组)
   * dataType：请求数据类型
   * fn:请求对应处理函数
   */
exports = module.exports = (app) => {
    var rules = [
            // {//获取文件服务器上的验证码
            //     method:"get",
            //     urls:[
            //         "/service/*"
            //     ],
            //     dataType: "json",
            //     fn: indexCon.getFile
            // },
            {
                method: "get",
                urls: [
                    "/fw/index"
                ],
                dataType: "json",
                fn: indexCon.indexPage
            },//获取单个服务
            {
                method: "get",
                urls: [
                    "/servicePage"
                ],
                dataType: "json",
                fn: indexCon.getServicePage
            },
            /*---------------微信频道页get入口 start----------------------*/
            {
                method: "get",
                urls: [
                    "/fw/indexPage",
                    "/fw/cityHomePage",
                    "/fw/cityList"
                ],
                dataType: "json",
                fn: indexCon.indexPageWechat
            },
            {
                method: "get",
                urls: [
                    "/weChat/*"
                ],
                dataType: "json",
                fn: weChatCon.apiCon
            },
            /*---------------微信频道页get入口 end----------------------*/
            {
                method: "get",
                urls: [
                    "/",
                    "/infraction",
                    "/deduction",
                    "/degree",
                    "/marriage",
                    "/stationList",
                    "/train",
                    "/trainSellTime",
                    "/trainTimetable",
                    "/trainYupiao",
                    "/timetable"
                    //"/bjGJJ"
                ],
                dataType: "json",
                fn: indexCon.page
            },
            {//暴露给客户的服务跳转页面
                method: "post",
                urls: [
                    "/insuranceLogin",//北京个人社保信息查询页面
                    "/infraction",//车辆违章扣分查询页面
                    "/deduction",//驾照扣分查询页面
                    "/education",//学历证书查询页面
                    "/mofcom",//商务法规查询页面
                    // "/train",//火车票查询页面
                    "/trainSellTime",//火车票起售时间查询页面
                    "/trainTimetable",//火车时刻表查询页面
                    "/trainYupiao",//火车余票查询页面
                    "/parking",//北京停车场查询页面
                    "/carYaohao",//摇号查询页面
                    "/bjGJJ",//北京公积金查询页面
                    "/tourism",//旅游投诉页面
                    "/hospital",//北京市预约挂号首页
                    "/degree",//学位查询首页
                    // "/unhealthy",//北京不良信息举报
                    "/unhealthyReportMessage",//北京不良信息举报举报垃圾短信
                    "/unhealthySwindlePhone",//北京不良信息举报举报诈骗电话
                    "/unhealthyHarassPhone",//北京不良信息举报举报骚扰电话
                    "/unhealthyWebsite",//北京不良信息举报举报网站
                    "/unhealthyPersonInfo",//北京不良信息举报举报个人信息泄露
                    "/unhealthyMessage",//北京不良信息举报举报短信进度查询
                    // "/credit",//统一社会信用查询
                    "/code",//统一社会信用代码查询
                    "/enterprise",//统一社会信用企业经营异常名录查询
                    "/lostTrusteeInquiry",//统一社会信用失信被执行人查询
                    "/taxIllegalInquiry",//统一社会信用重大税收违法案件当事人名单查询
                    "/governmentProcurementInquiry",//统一社会信用政府采购严重违法失信名单查询
                    // "/mandarin",//普通话考试成绩与证书查询
                    "/scoreSearch",//普通话考试成绩查询
                    "/certificateSearch",//普通话考试证书查询
                    // "/teacherQualification",//中小学教师资格证查询
                    "/examResultInquiry",//中小学教师资格考试成绩查询
                    "/qualificationCertificate",//中小学教师资格考试合格证明（NTCE）查询
                    "/marriage",//北京婚姻登记预约查询
                    "/exportTax",//出口退税率查询
                    "/museum",//中国国家博物馆网上预约信息查询
                    "/internetPlatform",//12315互联网平台
                    "/ncre",//全国计算机等级考试查询
                    "/indexPage",//频道页
                    "/shangHaiMarriage",//上海市结婚登记网上预约
                    "/beiJingTourism",//北京A级景区虚拟旅游
                    "/carInspectionCalculator",//车检计算器
                    "/remoteHosp",//异地定点医疗机构查询
                    "/seekMedicalAdvice",//异地就医经办机构查询
                    "/carScrapped",//机动车报废查询
                    "/taxOffice",//税务事务所查询
                    "/postgraduate",//中国研究生招生信息网
                    "/nationalMedical",//全国医疗机构查询
                    "/supremeProcuratorate",//12309最高检
                    "/touristAttraction5A",//5A旅游景区查询
                    "/GzOnlineWork",//贵州省网上办事大厅
                    "/pointsSettled",//北京积分入户
                    "/heNanHospital",//河南省预约挂号
                    "/QhPassengerTransport",//青海客运班线信息查询
                    "/heNanHighwayTolls",//河南省高速公路通行费查询
                    "/administrativeDivisions",//全国行政区划信息查询
                    "/sameName",//重名查询
                    "/huNanTax",//湖南省个税计算器
                    "/infringementPiracy",//侵权盗版举报
                    "/buildEntApproval",//建筑业企业资质审批结果查询
                    "/cancelPermit",//国务院取消和下放的行政审批事项
                    "/taxInvoiceCheck",//国家税务总局全国增值税发票查验
                    "/buildEntCertificate",//建设工程企业资质证书查询
                    "/supervisionCertificate",//工程监理企业资质证书查询
                    "/adminCancelPermit",//国务院已公布取消的职业资格许可和认定事项的查询
                    "/judicialOffice",//司法所查询
                    "/propertyTax",//房产税计算
                    "/corporateTax",//企业所得税计算
                    "/personalTax",//个人所得税计算
                    "/businessTax",//营业税计算
                    "/sDHospital",//山东省预约挂号
                    "/gsHospital",//甘肃省预约挂号
                    "/shanxiHospital",//陕西省预约挂号
                    "/trainLate",//火车晚点查询
                    "/nmgHospital",//内蒙古挂号
                    "/JXHospital",//江西挂号
                    "/shangHaiFund",//上海公积金查询
                    "/sXHospital",//山西省预约挂号
                    "/passport",//出入境办理
                    "/shangHaiInsurance",//上海人力资源和社保保障局
                    "/haiNanInsuranceCalculator",//海南省社保缴费计算
                    "/haiNanTourism",//海南省景区查询
                    "/anhuiHospital",//安徽省预约挂号
                    "/chainCard",//外国人在华居住证
                    "/beiJingPassport",//北京出入境
                    "/organizationReport",//中组部举报
                    "/monitorReport",//（（西藏自治区）纪检监察机关举报
                    "/culturalMarketReport", //
                    "/corruptionReport",//反腐败国际追逃追赃线索举报
                    "/networkCrimeReport",//网络违法犯罪举报
                    "/overseasNgoReport",// 境外非政府组织办事违法举报
                    "/hfzggjspcs",//恢复中国国籍审批初审
                    "/jrzggjspcs",//加入中国国籍审批初审
                    "/exitChinaNation",//退出中国国籍审批初审
                    "/housingReport",//住房城乡建设领域违法违规行为网上举报
                    "/dutyCrimeReport",//最高人民检察院职务犯罪举报
                    "/zywxReport",//中国互联网违法不良信息举报
                    "/policemenReport", // 检察干警违法违纪举报
                    "/gunviolenceReport",//打击涉枪涉爆犯罪举报
                    "/publishedReport",  //非法出版活动举报
                    "/fdegreeCertification", //国（境）外学历学位认证证书查询
                    "/lawfirmEnquiries", //律师事务所查询
                    "/emergencyPhone",//领事保护应急电话查询
                    "/knowledgeReport",  //全国知识产权投诉举报
                    "/jxzwfww",  //林木种子生产经营许可证申请
                    "/gdsgGJJ" //广东韶关公积金查询
                ],
                dataType: "json",
                fn: indexCon.render
            },
            /*---------------出入境办理 start----------------------*/
            {
                method: "get;post",
                urls: [
                    "/passport/*",
                    "/passport"
                ],
                dataType: "json",
                fn: passportCon.getCon
            },
            /*---------------出入境办理 end----------------------*/
            /*---------------外国人在华居住证 start----------------------*/
            {
                method: "get;post",
                urls: [
                    "/chainCard/*",
                    "/chainCard"
                ],
                dataType: "json",
                fn: chainCardCon.getCon
            },
            /*---------------外国人在华居住证 end----------------------*/
            /*---------------海南省景区查询 start----------------------*/
            {
                method: "get;post",
                urls: [
                    "/haiNanTourism/*",
                    "/haiNanTourism"
                ],
                dataType: "json",
                fn: haiNanTourismCon.getCon
            },
            /*---------------海南省景区查询 end----------------------*/
            /*---------------内蒙古预约挂号 start----------------------*/
            {
                method: "get;post",
                urls: [
                    "/nmgHospital/*",
                    "/nmgHospital"
                ],
                dataType: "json",
                fn: nmgHospitalCon.getCon
            },
            /*---------------内蒙古预约挂号 end----------------------*/
            /*---------------甘肃省预约挂号 start----------------------*/
            {
                method: "get;post",
                urls: [
                    "/gsHospital/*",
                    "/gsHospital"
                ],
                dataType: "json",
                fn: gsHospitalCon.getCon
            },
            /*---------------甘肃省预约挂号 end----------------------*/
            /*---------------北京社保查询 start----------------------*/
            {
                method: "get;post",
                urls: [
                    "/insurance/*",
                    "/insurance"
                ],
                dataType: "json",
                fn: insuranceCon.getCon
            },
            /*---------------北京社保查询 end----------------------*/
            /*---------------北京积分入户 start----------------------*/
            {
                method: "get;post",
                urls: [
                    "/pointsSettled/*",
                    "/pointsSettled"
                ],
                dataType: "json",
                fn: pointsSettledCon.getCon
            },
            /*---------------北京积分入户 end----------------------*/
            /*---------------医院挂号 start----------------------*/
            {//医院挂号预约post
                method: "get;post",
                urls: [
                    "/hospital/*",
                    "/hospital"
                ],
                dataType: "json",
                fn: hospitalCon.getCon
            },
            /*---------------医院挂号 end------------------------*/
            /*---------------不良信息 start----------------------*/
            // {//不良信息举报首页跳转
            //     method: "post",
            //     urls: [
            //         "/unhealthy"//北京不良信息举报
            //     ],
            //     dataType: "json",
            //     fn: unhealthyCon.render
            // },
            {//不良信息举报其他页面跳转
                method: "get",
                urls: [
                    "/unhealthy/unhealthyMessage",//北京不良信息举报
                    "/unhealthy/unhealthyReportMessage",
                    "/unhealthy/unhealthySwindlePhone",
                    "/unhealthy/unhealthyHarassPhone",
                    "/unhealthy/unhealthyWebsite",
                    "/unhealthy/unhealthyPersonInfo",
                    "/unhealthy"
                ],
                dataType: "json",
                fn: unhealthyCon.render
            },
            {
                /*12321举报垃圾短信，12321举报垃圾短信进度查询，
                  12321举报个人信息泄露，12321举报骚扰电话，
                  12321举报网站，12321举报诈骗电话，
                  12321获取手机短信验证码*/
                method: "post",
                urls: [
                    "/unhealthy/*"
                ],
                dataType: "json",
                fn: unhealthyCon.getCon
            },
            /*---------------不良信息 end----------------------*/
            {
                method: "get",
                urls: [
                    "/serviceList"
                ],
                dataType: "json",
                fn: serviceCon.serviceList
            }, {
                method: "get",
                urls: [
                    "/getAllService"
                ],
                dataType: "json",
                fn: serviceCon.getAllService
            },
            {
                method: "post",
                urls: [
                    "/cityInfo"
                ],
                dataType: "json",
                fn: indexCon.cityInfo
            },
            /*----驾照扣分，车辆违章，小汽車摇号，停车场 start----*/
            {//驾照扣分查询服务,车辆违章查询服务,小汽車摇号查询，停车场查询
                method: "post",
                urls: [
                    "/car/*"
                ],
                dataType: "json",
                fn: carCon.getCon
            },
            /*----驾照扣分，车辆违章，小汽車摇号，停车场 end-----*/
            /*---------------不良信息 end------------------------*/
            {//返回结果中图片的封装
                method: "get",
                urls: [
                    "/*/getIMG", "/getIMG"
                ],
                dataType: "json",
                fn: indexCon.getIMG
            },
            {
                method: "get",
                urls: [
                    "/touristComplaint"
                ],
                dataType: "json",
                fn: tourismCon.touristComplaint
            },
            {
                method: "get",
                urls: [
                    "/tourismComplaintProgress"
                ],
                dataType: "json",
                fn: tourismCon.tourismComplaintProgress
            },
            {
                method: "get",
                urls: [
                    "/getXlIMG"
                ],
                dataType: "json",
                fn: indexCon.getXlIMG
            },
            /*---------------学历证书查询 start----------------------*/
            {
                method: "post;get",
                urls: [
                    "/education/*",
                    "/education"
                ],
                dataType: "json",
                fn: educationCon.getCon
            },
            /*---------------学历证书查询 end----------------------*/
            /*---------------商务法规查询 start----------------------*/
            {
                method: "post",
                urls: [
                    "/mofcom/*"
                ],
                dataType: "json",
                fn: mofcomCon.getCon
            },
            /*---------------商务法规查询 end----------------------*/
            /*---------------火车票 start----------------------*/
            {//火车时刻表查询_可选日期查询，火车时刻表查询，火车票起售时间查询，火车票余票查询
                method: "post",
                urls: [
                    "/train/*"
                ],
                dataType: "json",
                fn: trainCon.getCon
            },
            /*---------------火车票 end------------------------*/
            /*---------------公积金 start----------------------*/
            {//北京公积金个人总账信息
                method: "post",
                urls: [
                    "/grgjjInfo"
                ],
                dataType: "json",
                fn: indexCon.grgjjInfo
            },
            {//北京公积金个人明细账信息
                method: "get",
                urls: [
                    "/grgjjmxzInfo"
                ],
                dataType: "json",
                fn: indexCon.grgjjmxzInfo
            },
            {
                method: "get;post",
                urls: [
                    "/bjgjj",
                    "/bjgjj/*"
                ],
                dataType: "json",
                fn: bjgjjCon.getCon
            },
            /*---------------公积金 end------------------------*/
            /*---------------旅游投诉 start--------------------*/
            {//12301旅游投诉获取短信验证码,查询投诉进度
                method: "get;post",
                urls: [
                    "/tourism/*"
                ],
                dataType: "json",
                fn: tourismCon.getCon
            },
            {//12301旅游投诉上传附件
                method: "post",
                urls: [
                    "/tourism/uploadFile"
                ],
                dataType: "text",
                fn: tourismCon.getCon
            }, {//12301旅游投诉提交投诉信息
                method: "post",
                urls: [
                    "/tourism/submitInfo"
                ],
                dataType: "json",
                fn: tourismCon.getCon
            },
            {//旅游跳转其他页面
                method: "get",
                urls: [
                    "/tourism"
                ],
                dataType: "json",
                fn: tourismCon.page
            },
            /*---------------旅游投诉 end----------------------*/
            /*---------------学位证书查询 start------------------------*/
            {//学历查询
                method: "get;post",
                urls: [
                    "/degree/*",
                    "/degree"
                ],
                dataType: "json",
                fn: degreeCon.getCon
            },
            /*---------------学位证书查询 end------------------------*/
            /*---------------信用中国 start------------------------*/
            {
                method: "get;post",
                urls: [
                    "/credit/*",
                    "/credit"
                ],
                dataType: "json",
                fn: creditCon.getCon
            },
            /*---------------信用中国 end------------------------*/
            /*---------------普通话考试成绩与证书查询 start------------------------*/
            {
                method: "get;post",
                urls: [
                    "/mandarin/*",
                    "/mandarin"
                ],
                dataType: "json",
                fn: mandarinCon.getCon
            },
            /*---------------普通话考试成绩与证书查询 end------------------------*/
            /*---------------教师资格证证书查询 start------------------------*/
            {
                method: "get;post",
                urls: [
                    "/teacherQualification/*",
                    "/teacherQualification"
                ],
                dataType: "json",
                fn: teacherQualificationCon.getCon
            },
            /*---------------教师资格证证书查询 end------------------------*/
            /*---------------出口退税率查询 start------------------------*/
            {
                method: "get;post",
                urls: [
                    "/exportTax/*",
                    "/exportTax"
                ],
                dataType: "json",
                fn: exportTaxCon.getCon
            },
            /*---------------出口退税率查询 end------------------------*/
            /*---------------中国国家博物馆网上预约信息查询 start------------------------*/
            {
                method: "get;post",
                urls: [
                    "/museum/*",
                    "/museum"
                ],
                dataType: "json",
                fn: museumCon.getCon
            },
            /*---------------中国国家博物馆网上预约信息查询 end------------------------*/
            /*---------------全国计算机等级考试查询 start------------------------*/
            {
                method: "get;post",
                urls: [
                    "/ncre/*",
                    "/ncre"
                ],
                dataType: "json",
                fn: ncreCon.getCon
            },
            /*---------------全国计算机等级考试查询 end------------------------*/
            /*---------------异地定点医疗机构查询 start------------------------*/
            {
                method: "get;post",
                urls: [
                    "/remoteHosp/*",
                    "/remoteHosp"
                ],
                dataType: "json",
                fn: remoteHospCon.getCon
            },
            /*---------------异地定点医疗机构查询 end------------------------*/
            /*---------------税务事务所查询 start------------------------*/
            {
                method: "get;post",
                urls: [
                    "/taxOffice/*",
                    "/taxOffice"
                ],
                dataType: "json",
                fn: taxOfficeCon.getCon
            },
            /*---------------税务事务所查询 end------------------------*/
            /*---------------研究生初试成绩查询 start------------------------*/
            {
                method: "get;post",
                urls: [
                    "/postgraduate/*",
                    "/postgraduate"
                ],
                dataType: "json",
                fn: postgraduateCon.getCon
            },
            /*---------------研究生初试成绩查询 end------------------------*/
            /* ---------------5A旅游景区查询 start------------------------------*/
            {
                method: "get;post",
                urls: [
                    "/touristAttraction5A/*",
                    "/touristAttraction5A"
                ],
                dataType: "json",
                fn: touristAttractionCon.getCon
            },
            /* ---------------5A旅游景区查询 end------------------------------*/
            /* ---------------全国医疗机构查询 start------------------------------*/
            {
                method: "get;post",
                urls: [
                    "/nationalMedical/*",
                    "/nationalMedical"
                ],
                dataType: "json",
                fn: nationalMedicalCon.getCon
            },
            /* ---------------全国医疗机构查询 end------------------------------*/
            /* ---------------贵州省网上办事大厅 start------------------------------*/
            {
                method: "get;post",
                urls: [
                    "/GzOnlineWork/*",
                    "/GzOnlineWork"
                ],
                dataType: "json",
                fn: GzOnlineWorkCon.getCon
            },
            /* ---------------贵州省网上办事大厅 end------------------------------*/
            /* ---------------河南省预约挂号 start------------------------------*/
            {
                method: "get;post",
                urls: [
                    "/heNanHospital/*",
                    "/heNanHospital"
                ],
                dataType: "json",
                fn: henanHospitalCon.getCon
            },
            /* ---------------河南省预约挂号 end------------------------------*/
            /* ---------------河南省高速路收费 start------------------------------*/
            {
                method: "get;post",
                urls: [
                    "/heNanHighwayToll/*",
                    "/heNanHighwayToll"
                ],
                dataType: "json",
                fn: heNanHighwayTollCon.getCon
            },
            /* ---------------河南省高速路收费 end------------------------------*/
            /* ---------------青海省客运班线信息查询 start------------------------------*/
            {
                method: "get;post",
                urls: [
                    "/QhPassengerTransport/*",
                    "/QhPassengerTransport"
                ],
                dataType: "json",
                fn: QhPassengerTransportCon.getCon
            },
            /* ---------------青海省客运班线信息查询 end------------------------------*/
            /* ---------------重名查询 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/sameName/*",
                    "/sameName"
                ],
                dataType:"json",
                fn:sameNameCon.getCon
            },
            /* ---------------重名查询 end------------------------------*/
            /* ---------------全国行政区划信息查询 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/administrativeDivisions/*",
                    "/administrativeDivisions"
                ],
                dataType:"json",
                fn:administrativeDivisionsCon.getCon
            },
            /* ---------------全国行政区划信息查询 end------------------------------*/
            /* ---------------建筑业企业资质审批结果查询 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/buildEntApproval/*",
                    "/buildEntApproval"
                ],
                dataType:"json",
                fn:buildEntApprovalCon.getCon
            },
            /* ---------------建筑业企业资质审批结果查询 end------------------------------*/
            /* ---------------侵权盗版举报查询 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/infringementPiracy/*",
                    "/infringementPiracy"
                ],
                dataType:"json",
                fn:infringementPiracyCon.getCon
            },
            /* ---------------侵权盗版举报查询 end------------------------------*/
            /* ---------------取消的职业资格许可和认定事项查询 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/cancelPermit/*",
                    "/cancelPermit"
                ],
                dataType:"json",
                fn:cancelPermitCon.getCon
            },
            /* ---------------取消的职业资格许可和认定事项查询 end------------------------------*/
            /* --------------- 国务院已公布取消的行政审批事项查询 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/adminCancelPermit/*",
                    "/adminCancelPermit"
                ],
                dataType:"json",
                fn:adminCancelPermitCon.getCon
            },
            /* --------------- 国务院已公布取消的行政审批事项查询 end------------------------------*/
            /* ---------------国家税务总局全国增值税发票查验 end------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/taxInvoiceCheck/*",
                    "/taxInvoiceCheck"
                ],
                dataType:"json",
                fn:taxInvoiceCheckCon.getCon
            },
            /* ---------------国家税务总局全国增值税发票查验 end------------------------------*/
            /* ---------------司法所查询 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/judicialOffice/*",
                    "/judicialOffice"
                ],
                dataType:"json",
                fn:judicialOfficeCon.getCon
            },
            /* ---------------司法所查询 end------------------------------*/
            /* ---------------工程监理企业资质证书查询 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/supervisionCertificate/*",
                    "/supervisionCertificate"
                ],
                dataType:"json",
                fn:supervisionCertificateCon.getCon
            },
            /* ---------------工程监理企业资质证书查询 end------------------------------*/
            /* ---------------建设工程企业资质证书查询 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/buildEntCertificate/*",
                    "/buildEntCertificate"
                ],
                dataType:"json",
                fn:buildEntCertificateCon.getCon
            },
            /* ---------------建设工程企业资质证书查询 end------------------------------*/
            /* ---------------房产税 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/propertyTax/*",
                    "/propertyTax"
                ],
                dataType:"json",
                fn:propertyTaxCon.getCon
            },
            /* ---------------房产税 end------------------------------*/
           /* ---------------企业税 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/corporateTax/*",
                    "/corporateTax"
                ],
                dataType:"json",
                fn:corporateTaxCon.getCon
            },
            /* ---------------企业税 end------------------------------*/
            /* ---------------个人税 start------------------------------*/
            {
                method:"get",
                urls:[
                    "/personalTax"
                ],
                dataType:"json",
                fn:personalTaxCon.getCon
            },
            /* ---------------个人税 end------------------------------*/
            /* ---------------营业税 start------------------------------*/
            {
                method:"get",
                urls:[
                    "/businessTax"
                ],
                dataType:"json",
                fn:businessTaxCon.getCon
            },
            /* ---------------营业税 end------------------------------*/
            /* ---------------山东挂号 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/sDHospital/*",
                    "/sDHospital"
                ],
                dataType:"json",
                fn:sDHospitalCon.getCon
            },
            /* ---------------山东挂号 end------------------------------*/
            /* ---------------陕西挂号 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/shanxiHospital/*",
                    "/shanxiHospital"
                ],
                dataType:"json",
                fn:shanxiHospitalCon.getCon
            },
            /* ---------------陕西挂号 end------------------------------*/
            /* ---------------山西省预约挂号 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/sXHospital/*",
                    "/sXHospital"
                ],
                dataType:"json",
                fn:sXHospitalCon.getCon
            },
            /* ---------------山西省预约挂号 end------------------------------*/
            /* ---------------安徽省预约挂号 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/anhuiHospital/*",
                    "/anhuiHospital"
                ],
                dataType:"json",
                fn:anhuiHospitalCon.getCon
            },
            /* ---------------安徽省预约挂号 end------------------------------*/
            /* ---------------上海公积金 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/shangHaiFund/*",
                    "/shangHaiFund"
                ],
                dataType:"json",
                fn:shangHaiFundCon.getCon
            },
            /* ---------------上海公积金 end------------------------------*/
            /* ---------------江西挂号 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/jxHospital/*",
                    "/jxHospital"
                ],
                dataType:"json",
                fn:jxHospitalCon.getCon
            },
            /* ---------------江西挂号 end------------------------------*/
            /* ---------------海南旅游查询 start------------------------------*/
            {
                method:"get;post",
                urls:[
                    "/haiNanTourism/*",
                    "/haiNanTourism"
                ],
                dataType:"json",
                fn:haiNanTourismCon.getCon
            },
            /* ---------------海南旅游查询 end------------------------------*/
            /*----------------中组部举报 2018/11/16 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/organizationReport/*",
                    "/organizationReport"
                ],
                dataType: "json",
                fn: organizationReportCon.getCon
            },
            /*---------------中组部举报 end-----------------------*/
            /*----------------（西藏自治区）纪检监察机关举报 2018/11/16 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/monitorReport/*",
                    "/monitorReport"
                ],
                dataType: "json",
                fn: monitorReportCon.getCon
            },
            /*---------------（西藏自治区）纪检监察机关举报 end-----------------------*/
            /*---------------- 反腐败国际追逃追赃线索举报 2018/12/20 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/corruptionReport/*",
                    "/corruptionReport"
                ],
                dataType: "json",
                fn: corruptionReportCon.getCon
            },
            /*--------------- 反腐败国际追逃追赃线索举报 end-----------------------*/
            // {//所有服务图片验证码的获取
            //     method: "get",
            //     urls: [
            //         "/image"
            //     ],
            //     dataType: "json",
            //     fn: indexCon.image
            // },
            /*----------------全国文化市场举报平台 2018/12/12 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/culturalMarketReport/*",
                    "/culturalMarketReport"
                ],
                dataType: "json",
                fn:culturalMarketReportCon.getCon
            },
            /*-----------------全国文化市场举报平台 end--------------------------------*/
            /*----------------网络违法犯罪举报 2018/12/22 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/networkCrimeReport/*",
                    "/networkCrimeReport"
                ],
                dataType: "json",
                fn:networkCrimeReportCon.getCon
            },
            /*-----------------网络违法犯罪举报 end--------------------------------*/
            /*----------------恢复中国国籍审批初审 2018/12/18 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/hfzggjspcs/*",
                    "/hfzggjspcs"
                ],
                dataType: "json",
                fn: hfzggjspcsCon.getCon
            },
            /*---------------恢复中国国籍审批初审 end-----------------------*/
            /*----------------加入中国国籍审批初审 2018/12/18 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/jrzggjspcs/*",
                    "/jrzggjspcs"
                ],
                dataType: "json",
                fn: jrzggjspcsCon.getCon
            },
            /*---------------加入中国国籍审批初审 end-----------------------*/
            /*----------------退出中国国籍审批初审 2018/12/25 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/exitChinaNation/*",
                    "/exitChinaNation"
                ],
                dataType: "json",
                fn: exitChinaNationCon.getCon
            },
            /*---------------退出中国国籍审批初审 end-----------------------*/
            /*----------------住房城乡建设领域违法违规行为举报 2018/12/28 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/housingReport/*",
                    "/housingReport"
                ],
                dataType: "json",
                fn:housingReportCon.getCon
            },
            /*-----------------住房城乡建设领域违法违规行为举报 end--------------------------------*/
            /*----------------境外非政府组织办事违法举报 2018/12/24 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/overseasNgoReport/*",
                    "/overseasNgoReport"
                ],
                dataType: "json",
                fn:overseasNgoReportCon.getCon
            },
            /*-----------------境外非政府组织办事违法举报 end--------------------------------*/
            /*-----------------最高人民检察院职务犯罪举报 2018/12/28start-----------------------------------*/
            {
                method: "get;post",
                urls: [
                    "/dutyCrimeReport/*",
                    "/dutyCrimeReport"
                ],
                dataType: "json",
                fn:dutyCrimeReportCon.getCon
            },
            /*-----------------最高人民检察院职务犯罪举报 end-----------------------------------*/
            /*----------------检察干警违法违纪举报 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/policemenReport/*",
                    "/policemenReport"
                ],
                dataType: "json",
                fn: policemenReportCon.getCon
            },
            /*-----------------检察干警违法违纪举报 end--------------------------------*/

            /*----------------非法出版活动举报 2019/01/10 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/publishedReport/*",
                    "/publishedReport"
                ],
                dataType: "json",
                fn: publishedReportCon.getCon
            },
            /*-----------------非法出版活动举报 end--------------------------------*/

            /*----------------国（境）外学历学位认证证书查询 2019/01/10 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/fdegreeCertification/*",
                    "/fdegreeCertification"
                ],
                dataType: "json",
                fn: fdegreeCertificationCon.getCon
            },
            /*-----------------国（境）外学历学位认证证书查询 end--------------------------------*/

            /*----------------律师事务所查询 2019/01/16 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/lawfirmEnquiries/*",
                    "/lawfirmEnquiries"
                ],
                dataType: "json",
                fn: lawfirmEnquiriesCon.getCon
            },
            /*-----------------律师事务所查询 end--------------------------------*/


            /*----------------中国互联网违法不良信息举报 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/zywxReport/*",
                    "/zywxReport"
                ],
                dataType: "json",
                fn:zywxReportCon.getCon
            },
            /*-----------------中国互联网违法不良信息举报 end--------------------------------*/
            /*----------------打击涉枪涉爆犯罪举报 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/gunviolenceReport/*",
                    "/gunviolenceReport"
                ],
                dataType: "json",
                fn:gunviolenceReportCon.getCon
            },
            /*-----------------打击涉枪涉爆犯罪举报 end--------------------------------*/
            /*----------------领事保护应急电话查询举报 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/emergencyPhone/*",
                    "/emergencyPhone"
                ],
                dataType: "json",
                fn:emergencyPhoneCon.getCon
            },
            /*-----------------领事保护应急电话查询举报 end--------------------------------*/
            /*----------------知识产权投诉举报 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/knowledgeReport/*",
                    "/knowledgeReport"
                ],
                dataType: "json",
                fn:knowledgeReportCon.getCon
            },
            /*-----------------知识产权投诉举报 end--------------------------------*/
            /*----------------林木种子生产经营许可证申请 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/jxzwfww/*",
                    "/jxzwfww"
                ],
                dataType: "json",
                fn:linmuCon.getCon
            },
            /*-----------------林木种子生产经营许可证申请 end--------------------------------*/
            /*----------------广东韶关公积金查询 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/gdsgGJJ/*",
                    "/gdsgGJJ"
                ],
                dataType: "json",
                fn:gdsgGJJCon.getCon
            },
            /*----------------广东韶关公积金查询 end--------------------*/
            /*-----------后台管理系统 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/system/*"
                ],
                dataType: "json",
                fn: systemCon.getCon
            },
            /*-----------后台管理系统 end-----------------------*/
            
            /*-----------统一身份验证 start--------------------*/
            {
                method: "get;post",
                urls: [
                    "/userLoginInfo/*"
                ],
                dataType: "json",
                fn: userLoginInfoCon.indexCon
            }
            /*-----------统一身份验证 end-----------------------*/
        ],

        methods,
        urls,
        dataType,
        processFn,
        layout;
    app.use(bodyParser.urlencoded({extended: true}));
    _.each(rules, (rule) => {
        methods = rule.method.split(";");
        urls = rule.urls;
        if (rule.dataType == "text") {
            dataType = bodyParser.raw();
        } else {
            dataType = bodyParser.json();
        }
        processFn = rule.fn;
        _.each(methods, (method) => {
            if (method === 'get' && processFn) {
                _.each(urls, (url) => {
                    app.get(url, dataType, processFn);
                })
            } else if (method === 'post' && processFn) {
                _.each(urls, (url) => {
                    app.post(url, dataType, processFn);
                })
            } else if (method === 'put' && processFn) {
                _.each(urls, (url) => {
                    app.put(url, dataType, processFn);
                })
            } else if (method === 'delete' && processFn) {
                _.each(urls, (url) => {
                    app.delete(url, dataType, processFn);
                })
            }
        })
    });
};