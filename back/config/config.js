module.exports = {
    "port":3001,//node服务端口号
    "db": {
        "url": "mongodb://47.96.254.45:27017/ucap_db",//本地环境-数据库地址
      // "url": "mongodb://127.0.0.1:27017/ucap_db",//测试环境-数据库地址
        "options": {
            "auth": {
                "user": "ucap_db",//数据库用户名
                "password": "ucap_db!"//数据库密码
            },
            "autoReconnect": true,//是否自动重连
            "poolSize": 10//连接池个数
        }
    },
    "redis": {
        "host": "47.96.254.45",//本地环境redis地址-数据库地址
      // "host": "10.80.222.216",//测试环境redis地址-数据库地址
        "port": 6379,//redis端口号
        "password": "kaipuyun_fw",//redis密码
        "maxAge": 1800000//session失效时长
    },
    "session": {
        "key": 'publicBkSystem_back_ucap'//session key
    },
    "templateUrl": "http://47.96.254.45:8086/api/publicService",//公共服务引擎接口
    "scheduleJobTime":30,//定时任务时间（分钟单位）
    "localUrl": "http://xhs.test.kaipuyun.cn/",//服务搜索时，补充服务请求地址域名
    "oss": {
        "region": "oss-cn-hangzhou",
        "accessKeyId": "LTAI22D6wtz3B0AE",
        "accessKeySecret": "XUM0ddurv60P14CagYouwxrj8UKx6s",
        "bucket": "cloud3test",
        "ossUrl": "http://cloud3test.oss-cn-hangzhou.aliyuncs.com",
        "folderPath":"publicService/app-Ucap"
    }
};