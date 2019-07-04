import actions from './actions'
import getters from './getter'
import mutations from './mutations';
import {getStore, setStore} from '@/config/mUtils';


const model = {
  state:{
    userInfo: getStore('userInfo'),
    functionInfo: getStore('functionInfo'),
    /* 存储路由地址 */
    routePath: getStore('routePath'),
    loginState:getStore('loginState'),     //初始时候给一个 isLogin=0 表示用户未登录
  },
  getters,
  actions,
  mutations
}


export default model;
