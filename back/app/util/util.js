const log4js = require('../util/log4j'),
    _ = require('underscore'),
    redis = require("redis"),
    crypto = require('crypto'),//加载加密文件
    fs = require('fs'),
    path = require('path'),
    Busboy = require('busboy'),
    OSS = require('ali-oss'),
    sysConfig = require('../../config/config');
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
//发布redis消息，引擎接收到消息，重新加载指定的xml服务模板
util.redisPublish = async (jsonData) => {
    try {
        const RDS_PORT = sysConfig.redis.port,                //端口号
            RDS_HOST = sysConfig.redis.host,    //服务器IP  要连接的A服务器redis
            RDS_PWD = sysConfig.redis.password,     //密码
            RDS_OPTS = {},                  //设置项
            client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
        client.auth(RDS_PWD, function (err) {
            console.log('redis认证：%s', err ? "失败" + err : "成功");
        });
        client.publish("xml:message", JSON.stringify(jsonData));
        console.log("redis发送消息")
    } catch (err) {
        console.log('redis认证：%s', err ? "失败" + err : "成功");
    }
}
//新增服务类别时，获取两个数组中不同元素，并返回其中一个值
util.getDiffOne = async(existArr, level) => {
    const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let level1 = [], level2 = [];
    for (let i = 0; i < a.length; i++) {
        level1.push(a[i]);
        for (let j = 0; j < a.length; j++) {
            level2.push(a[i] + a[j])
        }
    }
    let difference = _.difference(level == 1 ? level1 : level2, existArr);
    let num = Math.floor(Math.random() * (0 - difference.length) + difference.length);
    return difference[num];
};
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
            console.log('file upload finished...')
        })

        _emmiter.on('error', function (err) {
            console.log('file upload err...')
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
util.uploadToOss = async (filePath, ossPath) =>{
    // filePath = '/upload/118111310133368/新华社客户端上线服务事项清单.xlsx'
    if(_.isEmpty(filePath)){
        return;
    }
    let client = new OSS({
        region: sysConfig.oss.region,
        accessKeyId: sysConfig.oss.accessKeyId,
        accessKeySecret: sysConfig.oss.accessKeySecret,
        bucket: sysConfig.oss.bucket
    });
//流式上传
    try {
        let path = `${sysConfig.oss.folderPath}/${ossPath}${filePath.split("/")[3]}`
        let stream = fs.createReadStream(`./dist${filePath}`);
        await client.putStream(path, stream);
        return `${sysConfig.oss.ossUrl}/${path}`;
    } catch (e) {
        console.log(e)
        throw new Error("上传到ali-oss服务器失败")
    }
}
/**
 * 删除文件夹及文件夹里的所有文件
 * @param {string} filePath 文件夹路径
 */
util.deleteFolder = async (filePath) =>{
    // filePath = "./dist/upload/118111311134045"
    if(_.isEmpty(filePath)){
        return;
    }
    var files = [];
    if(await fs.existsSync(filePath)) {
        files = await fs.readdirSync(filePath);
        files.forEach(async function(file, index) {
            var curPath = filePath + "/" + file;
            // if(fs.statSync(curPath).isDirectory()) { // recurse
            //     deleteall(curPath);
            // } else { // delete file
            await fs.unlinkSync(curPath);
            // }
        });
        await fs.rmdirSync(filePath);
        return("ok")
    }else{
        return("ok")
    }
}
module.exports = util;