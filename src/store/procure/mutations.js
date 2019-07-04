import * as Types from './mutations-type.js';
import {getStore, setStore} from '@/config/mUtils';


const mutations = {
  [Types.SET_PROCURE] (state, value1) {//这里的state对应着上面这个state
    /*页面参数 value1*/
    console.log('procureInfo1:'+value1);
      state.procureInfo = value1//你还可以在这里执行其他的操作改变state
  },
}


export default mutations
