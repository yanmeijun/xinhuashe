/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl;

// process.env.NODE_ENV 是读取系统环境变量的
if (process.env.NODE_ENV == 'development') {
  imgBaseUrl = '';
  baseUrl = 'http://localhost:3002';
}else if(process.env.NODE_ENV == 'production'){
  //baseUrl = 'http://xhs.test.kaipuyun.cn:82';//测试环境
  baseUrl = 'https://yfw.kaipuyun.cn';//生产环境
}
export {
  baseUrl,
  routerMode,
  imgBaseUrl,
}
