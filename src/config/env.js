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
  baseUrl = 'http://localhost:3005';
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = '/cgi-bin/';
  // baseUrl = "https://fwweb.kaipuyun.cn"
  //  baseUrl = 'http://localhost:3002';
}
// baseUrl="http://xhs.test.kaipuyun.cn:81";
// baseUrl="http://localhost:3001";
export {
  baseUrl,
  routerMode,
  imgBaseUrl,
}
