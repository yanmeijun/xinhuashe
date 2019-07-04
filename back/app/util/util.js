const log4js = require('../util/log4j'),
    _ = require('underscore'),
    path = require('path'),
    request = require('request'),
    crypto = require('crypto'),
    yunPianCfg = require("../../config/yunpian"),//加载加密文件
    fs = require('fs'),
    Busboy = require('busboy'),
    config = require("../../config/config"),
    OSS = require('ali-oss');
let util = {};

util.isEmptyValue = (method, parma) => {
    let isNull = false;
    const keyList = _.keys(parma);
    _.each(keyList, (item) => {
        if (parma[item] === "" || parma[item] === null || parma[item] === "undefined") {
            log4js.error("调用方法:" + method + "参数为空的key值:" + item + ",value值:" + parma[item])
            isNull = true;
        }
    });
    return isNull;
}
//md5加密方法
util.md5 = (str) => {
    if (!str) {
        return str;
    }
    let md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};

util.sendCode = async (param) => {
    const options = {
        apikey: yunPianCfg.yunpian.APIKEY,
        mobile: param.mobile,
        tpl_id: param.tpl_id,
        tpl_value: param.tpl_value,
    };
    return new Promise((resolve, reject) => {
        request.post({url: yunPianCfg.yunpian.URI_TPL_SEND_SMS, form: options}, function (err, resp, data) {
            const result = JSON.parse(data);
            if (err || result.code != 0) {
                log4js.error(JSON.stringify(result))
                reject({"code": 1, "msg": "短信验证码发送失败"})
            } else {
                resolve(data)
            }
        });
    })

}
// 上传到本地服务器
util.uploadFile = async (ctx, options) => {
    const _emmiter = new Busboy({headers: ctx.req.headers})
    const filePath = options.filePath;
    await dirExists(options.serverPath);//判断文件存储路径是否存在，不存在则创建
    return new Promise((resolve, reject) => {
        _emmiter.on('file', function (fieldname, file, filename, encoding, mimetype) {
            const fileName = filename;
            const saveTo = options.serverPath + fileName;
            file.pipe(fs.createWriteStream(saveTo))
            file.on('end', function () {
                resolve({
                    filePath: `${filePath}${fileName}`,
                    fileName: fileName
                })
            })
        })
        _emmiter.on('finish', function () {
            console.log('finished...')
        })

        _emmiter.on('error', function (err) {
            console.log('err...')
            reject(err)
        })
        ctx.req.pipe(_emmiter)
    })
}

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve(false);
            } else {
                resolve(stats);
            }
        })
    })
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir) {
    let isExists = await getStat(dir);
    //如果该路径且不是文件，返回true
    if (isExists && isExists.isDirectory()) {
        return true;
    } else if (isExists) {     //如果该路径存在但是文件，返回false
        return false;
    }
    //如果该路径不存在
    let tempDir = path.parse(dir).dir;      //拿到上级路径
    //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await dirExists(tempDir);
    let mkdirStatus;
    if (status) {
        mkdirStatus = await mkdir(dir);
    }
    return mkdirStatus;
}

/**
 * 将已上传到本地服务器的文件上传到ali-oss服务器
 * @param {string} filePath 本地文件路径
 */
util.uploadToOss = async (filePath) => {
    // filePath = '/upload/118111310133368/新华社客户端上线服务事项清单.xlsx'
    if (_.isEmpty(filePath)) {
        return;
    }
    let client = new OSS({
        region: config.oss.region,
        accessKeyId: config.oss.accessKeyId,
        accessKeySecret: config.oss.accessKeySecret,
        bucket: config.oss.bucket
    });
//流式上传
    try {
        let stream = fs.createReadStream(`./dist${filePath}`);
        await client.putStream(`${config.oss.folderPath}${filePath}`, stream);
        return {filePath: `${config.oss.ossUrl}/${config.oss.folderPath}${filePath}`};
    } catch (e) {
        console.log(e)
        return null;
    }
//直接上传async实现
//     try {
//         await client.put(`publicAuditWeb${filePath}`, `./dist${filePath}`);
//         return {filePath: `${config.oss.ossUrl}/publicAuditWeb${filePath}`};
//     } catch (e) {
//         console.log(e);
//         return null;
//     }
//直接上传promise实现    
//     return new Promise((resolve, reject) => {
//         client.put(`publicAuditWeb${filePath}`, `./dist${filePath}`)
//             .then(result => {
//                 resolve({filePath: `${config.oss.ossUrl}/publicAuditWeb${filePath}`})
//             })
//             .catch(err => {
//                 reject(err)
//             });
//     })
}
/**
 * 删除文件夹及文件夹里的所有文件
 * @param {string} filePath 文件夹路径
 */
util.deleteFolder = async (filePath) => {
    // filePath = "./dist/upload/118111311134045"
    if (_.isEmpty(filePath)) {
        return;
    }
    var files = [];
    if (await fs.existsSync(filePath)) {
        files = await fs.readdirSync(filePath);
        files.forEach(async function (file, index) {
            var curPath = filePath + "/" + file;
            // if(fs.statSync(curPath).isDirectory()) { // recurse
            //     deleteall(curPath);
            // } else { // delete file
            await fs.unlinkSync(curPath);
            // }
        });
        await fs.rmdirSync(filePath);
        return ("ok")
    } else {
        return ("ok")
    }
}
exports.util = util;