import actions from './actions'
import getters from './getter'
import mutations from './mutations';
import {getStore, setStore} from '@/config/mUtils';


const model = {
  state:{
    userInfo: getStore('userInfo'),
    functionInfo: getStore('functionInfo'),
    /* 存储路由地址 */
    routePath: getStore('routePath')
  },
  getters,
  actions,
  mutations
}


export default model;
