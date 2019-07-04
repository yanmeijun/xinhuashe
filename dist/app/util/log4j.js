const log4js = require('log4js'),
    {formatError, formatRes} = require('./formatLog')

log4js.configure({
    appenders: {
        error: {
            type: 'dateFile',
            category: 'errLogger',
            filename: __dirname + '/../../logs/',
            pattern: 'errors-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            maxLogSize: 104800,
            backups: 100
        },
        response: {
            type: 'dateFile',
            category: 'resLogger',
            filename: __dirname + '/../../logs/',
            pattern: 'responses-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            maxLogSize: 104800,
            backups: 100
        },
        info: {
            type: 'dateFile',
            category: 'info',
            filename: __dirname + '/../../logs/',
            pattern: 'info-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            maxLogSize: 104800,
            backups: 100
        }
    },
    categories: {
        error: {appenders: ['error'], level: 'error'},
        response: {appenders: ['response'], level: 'info'},
        info: {appenders: ['info'], level: 'info'},
        default: {
            appenders: ['response'],
            level: 'info'
        }
    },
    replaceConsole: false,
    disableClustering: true,
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID'
})

let logger = {}

let errorLogger = log4js.getLogger('error')
let resLogger = log4js.getLogger('response')
let infoLogger = log4js.getLogger('info')

// 封装错误日志
logger.errLogger = (ctx, error) => {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error))
    }
}
// 封装info日志
logger.info = (text) => {
    if (text) {
        console.info(text)
        infoLogger.info(text)
    }
}
// 封装err日志
logger.error = (text) => {
    if (text) {
        console.error(text)
        errorLogger.error(text)
    }
}

// 封装相应日志
logger.resLogger = (ctx) => {
    if (ctx) {
        resLogger.info(formatRes(ctx))
    }
}

module.exports = logger