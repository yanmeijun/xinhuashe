const Koa = require('koa'),
    app = new Koa(),
    urlParse = require('url'),
    logger = require('koa-logger'),
    moment = require('moment'),
    router = require('koa-router')(),
    onerror = require('koa-onerror'),
    koaStatic = require('koa-static'),
    bodyParser = require('koa-body'),
    config = require('./config/config'),
    log4js = require('./app/util/log4j'),
    routes = require('./route/routes'),
    session = require('koa-session'),
    RedisStore = require('koa2-session-redis'),
    //cors = require('koa-cors'),
    monk = require('monk'),
    _ = require("underscore");
//错误信息处理
onerror(app);
//app.use(cors());
app.use(logger());
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(koaStatic(__dirname + '/dist'));
app.keys = [config.session.key];

const redis_conf = {
    key: config.session.key,
    maxAge: config.redis.maxAge,
    overwrite: true,
    httpOnly: true,
    rolling: false,
    sign: true,
    store: new RedisStore({
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password
    })
};

app.use(session(redis_conf, app));

//控制台打印请求信息
app.use(async (ctx, next) => {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "");
    //每次接口请求保持session的会话，防止session过期
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    const pathNameArr = ["userInformation/login", "userInformation/isLogin", "userInformation/register", "userInformation/isRegister",
        "code/getCode", "code/code", "userInformation/isOnlymobile", "code/retrievePwd", "userInformation/findPassword",
        "service/getServiceList", "service/getServiceDetail", "service/searchByKwd", "service/getHotService"]
    if (_.contains(pathNameArr, pathName)) {
        await next();
        log4js.resLogger(ctx);
    } else if (ctx.session.user) {
        await next();
        log4js.resLogger(ctx);

    } else {
        /*await next();
        log4js.resLogger(ctx);
         console.log("-----pathName-------"+pathName)*/
        ctx.body = {
            code: 401,
            error: "未登录"
        };
    }
});
routes(router);
app.use(router.routes(), router.allowedMethods());
app.on('error', (err, ctx) => {
    log4js.errLogger(ctx, err)
});
const start = async () => {
    const DB = monk(config.db.url, config.db.options);
    try {
        await app.listen(config.port || 3000, '0.0.0.0');
        log4js.info("服务器启动时间:" + moment().format('YYYY-MM-DD HH:mm:ss') + "---端口:" + config.port || 3000)
        DB.then(() => {
            log4js.info('连接数据库成功 : ' + config.db.url);
        }).catch((err) => {
            log4js.error('连接数据库失败 : ' + config.db.url);
            log4js.error(err);
            process.exit();
        })
    } catch (err) {
        log4js.error('服务器启动失败 !');
        process.exit();
    }
}
start();
