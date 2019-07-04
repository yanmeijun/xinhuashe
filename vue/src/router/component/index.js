
// 入口
export const  CompeRouter = resolve => {
  require(['@/views/home/home'], resolve)
}

// login
export const IndexRouter = resolve => {
  require(['@/views/login/login'], resolve)
}

export const originPage = resolve => {
  require(['@/views/originPage/originPage'], resolve)
}
//用户管理
export const userInfo = resolve => {
  require(['@/views/userInfo/userList'], resolve)
}
//用户管理列表
export const userDetails = resolve => {
  require(['@/views/userInfo/user-details'], resolve)
}


export const templateIndex = resolve => {
  require(['@/views/template/index'], resolve)
}
export const templateManage = resolve => {
  require(['@/views/template/manage'], resolve)
}
/*
*服务模板监控路由页面
*/
export const tmpMonitor = resolve => {
  require(['@/views/tmpMonitor/tmpMonitor'], resolve)
}
export const serviceJoin = resolve => {
  require(['@/views/serviceJoin/serviceJoin'], resolve)
}
export const serviceJoinDetail = resolve => {
  require(['@/views/serviceJoin/serviceJoinDetail'], resolve)
}
export const procureIndex = resolve => {
  require(['@/views/procure/index'], resolve)
}
export const procureManage = resolve => {
  require(['@/views/procure/manage'], resolve)
}
export const procureDetail = resolve => {
  require(['@/views/procure/detail'], resolve)
}
export const systemManage = resolve => {
  require(['@/views/systemManage/systemManage'], resolve)
}
export const systemManageAdd = resolve => {
  require(['@/views/systemManage/systemManageAdd'], resolve)
}
export const systemManageEdit = resolve => {
  require(['@/views/systemManage/systemManageEdit'], resolve)
}
export const serviceInsert = resolve => {
  require(['@/views/userServiceTable/serviceInsert'], resolve)
}
export const userServiceTable = resolve => {
  require(['@/views/userServiceTable/serviceList'], resolve)
}
export const serviceCategory = resolve => {
  require(['@/views/serviceCategory/serviceCategory'], resolve)
}
export const serviceTable = resolve => {
  require(['@/views/serviceTable/serviceList'], resolve)
}
export const serviceEdit = resolve => {
  require(['@/views/serviceTable/serviceEdit'], resolve)
}
/*添加前台用户*/
export const userAdd = resolve => {
  require(['@/views/userInfo/userAdd'], resolve)
}


