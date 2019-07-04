import Vue from 'vue';
import Router from 'vue-router';
/*
*新增路由有：
* serviceBoxHomePage,serviceSupport，serviceCommonPage,dataService，serviceSort，serviceDetails,serviceBoxPurchase,
* serviceBoxApplication,firstStep,secondStep,thirdStep,devPlatform,userMark
*/
import {
  CompeRouter,IndexRouter,serviceJoin,serviceJoinDetail,registerRouter,
  personalRouter,realNameRouter,realNameMainCon,realNameDetails,serviceJoinReEdit,forgetPwd,serviceBoxHomePage,serviceSupport,
  serviceCommonPage,dataService,serviceSort,serviceDetails,serviceBoxPurchase,serviceBoxApplication,firstStep,secondStep,thirdStep,applyFirstStep,applySecondStep,
  applyThirdStep,applyFourStep,devPlatform,commonProblem,disclaimer,helpCenter,operationRelated,teacherRelated,serviceManage,onlineManage,userMark,monitorManage,
  myApplication,applyDetail,transitionPage
} from './component'

Vue.use(Router);
// 创建 router 实例
const router = new Router({
  linkActiveClass:'list-active',
  base: __dirname,
  scrollBehavior: function (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      name: 'index',
      path: '/index',
      component: IndexRouter,
      meta: {
        title: 'index'
      }
    },
    // 注册页面路由配置
    {
      name: 'register',
      path: '/register',
      component: registerRouter,
      meta: {
        title: 'register'
      }
    },
    //忘记密码
    {
      name: 'forgetPwd',
      path: '/forgetPwd',
      component: forgetPwd,
      meta: {
        title: 'forgetPwd'
      }
    },
    //服务盒子首页
    {
      name: 'serviceBoxHomePage',
      path: '/',
      component: serviceBoxHomePage,
      meta: {
      title: 'serviceBoxHomePage'
      }
    },
    //服务盒子支持
    {
      name: 'serviceSupport',
      path: '/serviceSupport',
      component: serviceSupport,
      redirect: {name: 'commonProblem'},
      meta: {
        title: 'serviceSupport'
      },
      children:[
        {
          path: 'commonProblem',
          name: 'commonProblem',
          component: commonProblem,
          meta: '常见问题'
        },
        {
          path: 'disclaimer',
          name: 'disclaimer',
          component: disclaimer,
          meta: '免责声明'
        },
        {
          path: 'helpCenter',
          name: 'helpCenter',
          component: helpCenter,
          meta: '帮助中心'
        },
        {
          path: 'operationRelated',
          name: 'operationRelated',
          component: operationRelated,
          meta: '操作相关'
        },
        {
          path: 'teacherRelated',
          name: 'teacherRelated',
          component: teacherRelated,
          meta: '技术相关'
        }
      ]
    },
    {//开放平台
      name: 'devPlatform',
      path: '/devPlatform',
      component: devPlatform,
      meta: {
        title: 'devPlatform'
      }
    },
    {//过渡页面
      name: 'transitionPage',
      path: '/transitionPage',
      component: transitionPage,
      meta: {
        title: 'transitionPage'
      }
    },
    {
      path: '/serviceCommonPage/serviceSort',
      name: 'serviceSort',
      component: serviceSort,
      meta: '服务排序页'
    },
    //
    {
      name: 'serviceCommonPage',
      path: '/serviceCommonPage',
      component: serviceCommonPage,
      redirect: {name: 'dataService'},
      meta: {
        title: 'serviceCommonPage'
      },
      children:[
        {
          path: 'dataService',
          name: 'dataService',
          component: dataService,
          meta: '列表页主体'
        },

        {
          path: 'serviceDetails',
          name: 'serviceDetails',
          component: serviceDetails,
          meta: '服务查看详情'
        },
        {
          name: 'serviceBoxApplication',
          path: '/serviceBoxApplication',
          component: serviceBoxApplication,
          redirect: {name: 'applyFirstStep'},
          meta: {
            title: 'serviceBoxApplication'
          },
          children:[
            {
              path: 'applyFirstStep',
              name: 'applyFirstStep',
              component: applyFirstStep,
              meta: '接入申请第一步'
            },
            {
              path: 'applySecondStep',
              name: 'applySecondStep',
              component: applySecondStep,
              meta: '接入申请第二步'
            },
            {
              path: 'applyThirdStep',
              name: 'applyThirdStep',
              component: applyThirdStep,
              meta: '接入申请第三步'
            },
            {
              path: 'applyFourStep',
              name: 'applyFourStep',
              component: applyFourStep,
              meta: '接入申请第四步'
            },
          ]
        },
        /*----------------------------服务采购 临时添加 可删除------------------------------------*/
        {
          path: 'serviceBoxPurchase',
          name: 'serviceBoxPurchase',
          component: serviceBoxPurchase,
          redirect: {name: 'firstStep'},
          meta:{
            title: 'serviceBoxPurchase'
          },
          children:[
            {
              path: 'firstStep',
              name: 'firstStep',
              component: firstStep,
              meta: '采购申请第一步'
            },
            {
              path: 'secondStep',
              name: 'secondStep',
              component: secondStep,
              meta: '采购申请第二步'
            },
            {
              path: 'thirdStep',
              name: 'thirdStep',
              component: thirdStep,
              meta: '采购申请第三步'
            }
          ]
        },
        /*----------------------------服务采购 临时添加------------------------------------*/
      ]
    },
    {
      name: 'home',
      path: '/home',
      component: CompeRouter,
      redirect: {name: 'serviceJoin'},
      meta: {
        title: 'home'
      },
      children: [
        {
          path: 'serviceJoin',
          name: 'serviceJoin',
          component: serviceJoin,
          meta: '列表页主体'
        },
        {
          path: 'serviceJoinDetail',
          name: 'serviceJoinDetail',
          component: serviceJoinDetail,
          meta: '服务接入详情页'
        },
        {
          path: 'serviceJoinReEdit',
          name: 'serviceJoinReEdit',
          component: serviceJoinReEdit,
          meta: '服务接入再编辑页'
        },
        // 个人中心的路由配置开始
        {
          name: 'personalCenter',
          path: 'personalCenter',
          component: personalRouter,
          meta: {
            title: 'personalCenter'
          }
        },
        // 实名认证
        {
          name: 'personalRealName',
          path: 'personalRealName',
          component: realNameRouter,
          meta: {
            title: 'personalRealName'
          },
          children: [
            {
              path: 'realNameMainCon',
              name: 'realNameMainCon',
              component: realNameMainCon,
              meta: '实名认证认证页面'
            },
            {
              path: 'realNameDetails',
              name: 'realNameDetails',
              component: realNameDetails,
              meta: '认证详情页面'
            }
          ]
        },
        /******************** 服务管理start ********************/
        {
          name: 'serviceManage',
          path: 'serviceManage',
          component: serviceManage,
          redirect: {name: 'onlineManage'},
          meta: {
            title: 'template'
          },
          children: [
            {
              path: 'onlineManage',
              name: 'onlineManage',
              component: onlineManage,
              meta: '上线管理'
            },{
              path: 'monitorManage',
              name: 'monitorManage',
              component: monitorManage,
              meta: '监控管理'
            },{
              path: 'myApplication',
              name: 'myApplication',
              component: myApplication,
              meta: '我的申请'
            },{
              path: 'applyDetail',
              name: 'applyDetail',
              component: applyDetail,
              meta: '申请详情'
            }
          ]
        },
        /******************** 我的关注start ********************/
        {
          name: 'userMark',
          path: 'userMark',
          component: userMark,
          meta: {title: 'userMark'}
        }
      ]
    }

  ]
})

export default router;
