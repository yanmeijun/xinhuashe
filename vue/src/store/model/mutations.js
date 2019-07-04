import * as Types from './mutations-type.js';
import {getStore, setStore} from '@/config/mUtils';


const mutations = {
  [Types.CHANGE_USER] (state, value1) {//这里的state对应着上面这个state
    /*页面参数 value1*/
    console.log('value1:'+value1);
      state.user = value1//你还可以在这里执行其他的操作改变state
  },
  /*保存用户信息saveUserInfo*/
  [Types.SAVE_USERINFO](state,userInfo){
    setStore('userInfo', userInfo);
    state.userInfo = userInfo
  },
  /*保存路由地址*/
  [Types.SAVE_ROUTEPATH](state,routePath){
    setStore('routePath', routePath)
    state.routePath = routePath
  },
  /*保存功能权限*/
  [Types.SAVE_FUNCTIONINFO](state,functionInfo){
    setStore('functionInfo', functionInfo)
    state.functionInfo = functionInfo
  },
}


export default mutations
