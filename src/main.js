/**
 * Created by txl on 2018/06/12.
 */
import Vue from 'vue';
import App from './views/app';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';
import Axios from 'axios';
import { Pagination, Button, Select, Message, Upload, Form, Tree, MessageBox, Input, FormItem } from 'element-ui';
/*
*引入css
*/
/*element-ui*/
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/app.css';
//引入富文本编辑器资源
//import './static/UE/ueditor.config.js'
//import './static/UE/ueditor.all.min.js'
//import './static/UE/lang/zh-cn/zh-cn.js'
//import './static/UE/ueditor.parse.min.js'

/*
*路径
*/
import { baseUrl } from '@/config/env';

/*
*设置路径
*/
Axios.defaults.baseURL = baseUrl;
//Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.interceptors.response.use(
  response => {

    if (response.data.code == 401) {
      if (['#/', '#/serviceCommonPage/dataService', '#/devPlatform', '#/serviceSupport/commonProblem'].indexOf(window.location.hash) === -1) {
        router.replace({
          name: 'index',
          params: { name: 'err' }
        });
      }
      return;
    } else {
      return response;
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            name: 'index',
            params: { name: 'err' }
          })
      }
    }
    return Promise.reject(error.response.data);
  });
Vue.prototype.$http = Axios;
//注册路由插件
Vue.config.productionTip = false;   //阻止启动生产消息
Vue.use(Axios);
Vue.use(VueRouter);

// 在调用 Vue.use 前，给 Message 添加 install 方法
Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Select);
Vue.use(Message);
Vue.use(Input);
Vue.use(Upload);//上传组件
Vue.use(Form);//表单
Vue.use(Tree);//树插件
Vue.use(FormItem);//树插件

new Vue({
  el: '#app',
  store,
  router,//将路由配置添加到vue实例中
  components: { App },
  template: '<App/>'
});
let bus = new Vue();
Vue.prototype.bus = bus;
