import * as Types from './mutations-type.js';
import api from '../../api/article.js';

const actions = {
  /*保存用户信息*/
  [Types.SET_PROCURE]({commit}, userInfo){
    try{
      commit('setProcure', userInfo);
    }catch(err){
    }
  }
}




export default actions
