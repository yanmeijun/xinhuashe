// 入口
export const CompeRouter = resolve => {
  require(['@/views/home/home'], resolve)
}

// login
export const IndexRouter = resolve => {
  require(['@/views/login/login'], resolve)
}
// 注册
export const registerRouter = resolve => {
  require(['@/views/register/register'], resolve)
}
//忘记密码
export const forgetPwd = resolve => {
  require(['@/views/forgetPwd/forgetPwd'], resolve)
}
// 个人中心
export const personalRouter = resolve => {
  require(['@/views/personalCenter/personalCenter'], resolve)
}
// 实名认证页面
export const realNameRouter = resolve => {
  require(['@/views/personalCenter/realNameCertificd'], resolve)
}

export const realNameMainCon = resolve => {
  require(['@/views/personalCenter/realName-mainCon'], resolve)
}
// 认证详情
export const realNameDetails = resolve => {
  require(['@/views/personalCenter/realName-details'], resolve)
}
//服务接入申请列表页
export const serviceJoin = resolve => {
  require(['@/views/serviceJoin/serviceJoin'], resolve)
}
//服务接入申请详情页
export const serviceJoinDetail = resolve => {
  require(['@/views/serviceJoin/serviceJoinDetail'], resolve)
}
//服务接入申请编辑页
export const serviceJoinReEdit = resolve => {
  require(['@/views/serviceJoin/serviceJoinReEdit'], resolve)
}
// 服务采购页面
/*export const serviceProcureIndex = resolve => {
  require(['@/views/serviceProcure/index'], resolve)
}
export const serviceList = resolve => {
  require(['@/views/serviceProcure/serviceList'], resolve)
}
export const procureDetail = resolve => {
  require(['@/views/serviceProcure/procureDetail'], resolve)
}*/
/*新增*/
export const serviceBoxHomePage = resolve => {
  require(['@/views/serviceBoxHomePage/serviceBoxHomePage'], resolve)
}
export const serviceSupport = resolve => {
  require(['@/views/serviceSupport/serviceSupport'], resolve)
}
export const serviceCommonPage = resolve => {
  require(['@/views/serviceCommonPage/serviceCommonPage'], resolve)
}
export const dataService = resolve => {
  require(['@/views/dataService/dataService'], resolve)
}
export const serviceSort = resolve => {
  require(['@/views/dataService/serviceSort'], resolve)
}
export const serviceDetails = resolve => {
  require(['@/views/dataService/serviceDetails'], resolve)
}
export const serviceBoxPurchase= resolve => {
  require(['@/views/serviceBoxPurchase/serviceBoxPurchase'], resolve)
}
export const firstStep = resolve => {
  require(['@/views/serviceBoxPurchase/firstStep'], resolve)
}
export const secondStep = resolve => {
  require(['@/views/serviceBoxPurchase/secondStep'], resolve)
}
export const thirdStep = resolve => {
  require(['@/views/serviceBoxPurchase/thirdStep'], resolve)
}
export const serviceBoxApplication = resolve => {
  require(['@/views/serviceBoxApplication/serviceBoxApplication'], resolve)
}
export const applyFirstStep = resolve => {
  require(['@/views/serviceBoxApplication/applyFirstStep'], resolve)
}
export const applySecondStep = resolve => {
  require(['@/views/serviceBoxApplication/applySecondStep'], resolve)
}
export const applyThirdStep = resolve => {
  require(['@/views/serviceBoxApplication/applyThirdStep'], resolve)
}
export const applyFourStep = resolve => {
  require(['@/views/serviceBoxApplication/applyFourStep'], resolve)
}
export const devPlatform = resolve => {
  require(['@/views/serviceBoxDevPlatform/devPlatform'], resolve)
}
export const commonProblem = resolve => {
  require(['@/views/serviceSupport/commonProblem'], resolve)
}
export const disclaimer = resolve => {
  require(['@/views/serviceSupport/disclaimer'], resolve)
}
export const helpCenter = resolve => {
  require(['@/views/serviceSupport/helpCenter'], resolve)
}
export const operationRelated = resolve => {
  require(['@/views/serviceSupport/operationRelated'], resolve)
}
export const teacherRelated = resolve => {
  require(['@/views/serviceSupport/teacherRelated'], resolve)
}
export const serviceManage = resolve => {
  require(['@/views/serviceManage/serviceManage'], resolve)
}
export const onlineManage = resolve => {
  require(['@/views/serviceManage/onlineManage'], resolve)
}
export const monitorManage = resolve => {
  require(['@/views/serviceManage/monitorManage'], resolve)
}
export const myApplication = resolve => {
  require(['@/views/serviceManage/myApplication'], resolve)
}
export const applyDetail = resolve => {
  require(['@/views/serviceManage/applyDetail'], resolve)
}

/*我的关注*/
export const userMark = resolve => {
  require(['@/views/userMark/userMark'], resolve)
}

export const transitionPage = resolve => {
  require(['@/views/serviceBoxDevPlatform/transitionPage'], resolve)
}



