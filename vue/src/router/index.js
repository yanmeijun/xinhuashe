import Vue from 'vue';
import Router from 'vue-router';
import {
  CompeRouter,IndexRouter,originPage,templateIndex,templateManage,tmpMonitor,serviceJoin,serviceJoinDetail,userInfo
  ,procureIndex,procureManage,procureDetail,userDetails,systemManage,systemManageAdd,systemManageEdit,serviceInsert,serviceCategory,
  serviceTable,serviceEdit,userServiceTable,userAdd
} from './component'

Vue.use(Router);
//创建 router 实例
const router = new Router({
 /* mode: 'history',*/
  linkActiveClass:'list-active',
  base: __dirname, //重要
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
      path: '/',
      component: IndexRouter,
      meta: {
        title: 'index'
      }
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
          path: 'originPage',
          name: 'originPage',
          component: originPage,
          meta: '列表页主体'
        },
        /******************** 服务模板监控路由end ********************/
        {
          path: 'tmpMonitor',
          name: 'tmpMonitor',
          component: tmpMonitor,
          meta: '服务模板监控'
        },
        /******************** 服务模板监控路由start ********************/
        // 用户管理 路由
        {
          path:'userInfo',
          name:"userInfo",
          component:userInfo,
          meta:"用户管理"
        },
        {
          path:'userInfo/userAdd',
          name:"userAdd",
          component:userAdd,
          meta:"添加用户"
        },
        {
          path:'userInfo/userDetails',
          name:"userDetails",
          component:userDetails,
          meta:"用户管理"
        },
        {
          name: 'template',
          path: 'template',
          component: templateIndex,
          redirect: {name: 'templateManage'},
          meta: {
            title: 'template'
          },
          children: [
            {
              path: 'templateManage',
              name: 'templateManage',
              component: templateManage,
              meta: '服务模板管理列表'
            }
          ]
        },
        {
          path: 'serviceJoin',
          name: 'serviceJoin',
          component: serviceJoin,
          meta: '列表页主体'
        },
        {
          path: 'serviceJoin/serviceJoinDetail',
          name: 'serviceJoinDetail',
          component: serviceJoinDetail,
          meta: '服务接入详情页'
        },
        {
          name: 'procure',
          path: 'procure',
          component: procureIndex,
          redirect: {name: 'procureManage'},
          meta: {
            title: 'procure'
          },
          children: [
            {
              path: 'procureManage',
              name: 'procureManage',
              component: procureManage,
              meta: '服务采购管理列表'
            },
            {
              path: 'procureDetail',
              name: 'procureDetail',
              component: procureDetail,
              meta: '服务采购详情'
            }
          ]
        },
        {
          path: 'systemManage',
          name: 'systemManage',
          component: systemManage,
          meta: '系统用户列表'
        },
        {
          path: 'systemManage/systemManageAdd',
          name: 'systemManageAdd',
          component: systemManageAdd,
          meta: '系统用户添加'
        },
        {
          path: 'systemManage/systemManageEdit',
          name: 'systemManageEdit',
          component: systemManageEdit,
          meta: '系统用户编辑'
        },
        {
          path: 'userServiceTable',
          name: 'userServiceTable',
          component: userServiceTable,
          meta: '获取服务列表'
        },
        {
          path: 'userServiceTable/serviceEdit',
          name: 'userServiceEdit',
          component: serviceInsert,
          meta: '添加服务'
        },
        {
          path: 'serviceCategory',
          name: 'serviceCategory',
          component: serviceCategory,
          meta: '服务分类'
        },
        {
          path: 'serviceTable',
          name: 'serviceTable',
          component: serviceTable,
          meta: '服务表管理'
        },
        {
          path: 'serviceTable/serviceEdit',
          name: 'serviceEdit',
          component: serviceEdit,
          meta: '服务表编辑'
        }
      ]
    }
  ]
})
function beforeEnterFun (to, from, next) {
  //会在任意路由跳转前执行，next一定要记着执行，不然路由不能跳转了
  if(store.state.model.userInfo){
    let permission;
    if(typeof store.state.model.userInfo == 'string'){
      permission = JSON.parse(store.state.model.userInfo).permission;
    }else{
      permission = store.state.model.userInfo.permission;
    }
    const path = to.path;
    if(JSON.stringify(permission).indexOf(path.split("/")[2]) < 0){
      for (let i = 0; i < permission.length; i++) {
        if (permission[i].children) {
          sessionStorage.setItem('isSelect', permission[i].id);
          router.push({
            path: permission[i].children[0].hrefName
          });
          break;
        } else if (permission[i].href) {
          sessionStorage.setItem('isSelect', permission[i].id);
          router.push({
            path: permission[i].href
          });
          break;
        }
      }
    }
  }
  next()
}
export default router;
