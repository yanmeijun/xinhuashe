import * as Types from './mutations-type.js';
import api from '../../api/article.js';

const actions = {
  [Types.CHANGE_USER]({ commit, state }, {user}) {
    console.log('state:'+state);
    //commit("changeUser","");

    return new Promise((resolve, reject) => {
          resolve(res);
        });
    // return api.createArticle(user).then(res => {
    //   if (res.data.success) {
    //    //调用mutation
    //     commit("changeUser",res.data.user);
    //   }
    //   return new Promise((resolve, reject) => {
    //     resolve(res);
    //   });
    // }).catch(err => {
    //   return new Promise((resolve, reject) => {
    //     reject(err);
    //   });
    // });
  },
  /*保存用户信息*/
  [Types.SEND_USERINFO]({commit}, userInfo){
    try{
      commit('saveUserInfo', userInfo);
    }catch(err){
    }
  },
  /*保存路由地址*/
  [Types.SEND_ROUTEPATH]({commit}, routePath){
    commit('saveRoutePath', routePath);
  },
  /*保存功能信息*/
  [Types.SEND_FUNCTIONINFO]({commit}, functionInfo){
    try{
      commit('saveFunctionInfo', functionInfo);
    }catch(err){
    }
  },
}




export default actions
