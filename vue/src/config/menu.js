export const menu = [
  {
    "id":"0",
    "name":"工作台",
    "href":"",
    "level": 1
  }, {
    "id":"1",
    "name":"服务接入管理",
    "level": 1,
    children:[{"name":"服务接入审核","id":"1_0","hrefName":"/home/serviceJoin","isActive":true,"level": 2}]
  }, {
    "id":"2",
    "name":"服务采购管理",
    "level": 1,
    "href":"",
    children:[{"name":"服务采购审核","id":"2_0","hrefName":"/home/procure","isActive":true,"level": 2}]
  // }, {
  //   "id":"3",
  //   "name":"公共服务",
  //   "level": 1,
  }, {
    "id":"4",
    "name":"用户管理",
    "level": 1,
    "href":"/home/userInfo"
  }, {
    "id":"5",
    "name":"系统管理",
    "level": 1,
    children:[{"name":"后台用户管理","id":"5_0","hrefName":"/home/systemManage","isActive":false,"level": 2}]
  }, {
    "id":"6",
    "name":"监控管理",
    "level": 1,
    children:[{"name":"源端监控","id":"6_0","hrefName":"/home/originPage","isActive":false,"level": 2},
      {"name":"服务模板监控","id":"6_1","hrefName":"/home/tmpMonitor","isActive":false,"level": 2}]
  }, {
    "id":"7",
    "name":"服务模板管理",
    "level": 1,
    "href":"/home/template/templateManage"
  },{
    "id":"8",
    "name":"服务管理",
    "level": 1,
    children:[{"name":"服务分类","id":"8_0","hrefName":"/home/serviceCategory","isActive":false,"level": 2},
      // {"name":"服务制作","id":"8_1","hrefName":"","isActive":false,"level": 2},
      // {"name":"服务发布","id":"8_2","hrefName":"","isActive":false,"level": 2},
      // {"name":"服务上线","id":"8_3","hrefName":"","isActive":false,"level": 2}
    ]
  },{
    "id":"9",
    "name":"userService表管理",
    "level": 1,
    "href":"/home/userServiceTable"
  },{
    "id":"10",
    "name":"service表管理",
    "level": 1,
    "href":"/home/serviceTable"
  }]
