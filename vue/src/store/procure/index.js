import actions from './actions'
import getters from './getter'
import mutations from './mutations';
import {getStore, setStore} from '@/config/mUtils';


const model = {
  state:{
    procureInfo: getStore('procureInfo')
    /* 存储路由地址 */
  },
  getters,
  actions,
  mutations
}


export default model;
