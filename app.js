const express = require("express"),
    app = express(),
    step = require('step'),
    async = require('async'),
    moment = require('moment'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    RedisStore = require('connect-redis')(session),
    conf = require('./configfile/system.json'),
    config = require('./config'),
    connect = require('./app/db/mongoDB').connect(conf.db.url, conf.db.options),
    routes = require('./routes');
    // scheduleJob = require("./app/controllers/scheduleJob");

//view engine html
app.set("view engine", "html");
app.engine('.html', require('ejs').__express);
// app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser(conf.secret.sessionSecret));
app.use(session({
    store: new RedisStore({
        host: conf.redis.ip,
        port: conf.redis.port,
        password: conf.redis.password
    }),
    secret: conf.secret.sessionSecret,//与cookieParser中的一致
    resave: true,
    saveUninitialized: true
}));

routes(app);

process.on('uncaughtException', function (err) {
    console.info("未捕获的异常：%s", err);
});

process.on('unhandledRejection', (reason, p) => {
    console.info("未捕获的Promise异常: %s ；reason: %s", p, reason);
});

/*
 * 设置所有HTTP请求的超时时间
 * 设置所有HTTP请求的服务器响应超时时间
 */

app.use((req, res, next) => {
    req.setTimeout(600000);
    res.setTimeout(600000);
    next();
});


step(
    //读取配置文件
    function () {
        console.log("load config.");
        var group = this.group();
        config.configFiles.forEach(function (x) {
            config.loadConfig(__dirname + x, group());
        });
    },
    function (err) {
        if (err) {
            console.log("加载配置文件异常 :%s", err);
            process.exit(1);
        }
        connect((DB) => {
            console.log('connect to success : %s', config.get("system.db.url"));
            this.group();
        });
    },
    function (err) {
        if (err) {
            console.log("连接数据库异常 :%s", err);
            process.exit(1);
        }
        if (!config.get("system.server.status")) {
            return this.group();
        }
        // 设置IP：0.0.0.0,直接映射到当前服务器，监听端口port：3000
        const server = app.listen(config.get("system.server.port") || 3000, '0.0.0.0', () => {
            const port = server.address().port;
            const host = server.address().address;
            console.log("服务器启动时间:%s---地址 http://%s:%s", moment().format('YYYY-MM-DD HH:mm:ss'), host, port)
            this.group();
        });
    },
    function (err) {
        if (err) {
            console.log("服务器启动异常 :%s", err);
            process.exit(1);
        }
        // if (config.get("system.scheduleJob.status")) {
        //     console.log("定时省份代号更新---任务执行已启动");
        //      scheduleJob.updateJob();
        // }
    }
);
