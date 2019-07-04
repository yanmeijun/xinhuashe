const client = require('needle'),
    _ = require('underscore'),
    request = require('request'),
    crypto = require('crypto'),
    Busboy = require('busboy'),
    path = require('path'),
    fs = require('fs'),
    OSS = require('ali-oss'),
    config = require('../configfile/system.json');
let util = {};
util.getData = (url, options, cb) => {
    client.get(url, options, (err, resp, body) => {
        cb(err, body)
    })
}
util.postData = (url, options, cb) => {
    request.post(url, options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            cb(null, body);
        } else {
            cb(error);
        }
    })
}
util.isEmptyValue = (method, parma) => {
    let isNull = false;
    const keyList = _.keys(parma);
    _.each(keyList, (item) => {
        if (parma[item] === "" || parma[item] === null || parma[item] === "undefined") {
            console.log("调用方法:%s参数为空的key值:%s,value值:%s", method, item, parma[item])
            isNull = true;
        }
    })
    return isNull;
}
util.parsePostBody = (req, done) => {
    try {
        var length = req.headers['content-length'] - 0;
        var arr = [];
        var chunks;

        req.on('data', buff => {
            arr.push(buff);
        });

        req.on('end', () => {
            chunks = Buffer.concat(arr);
            done(chunks);
        });
    } catch (err) {
        done(null)
    }
};
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
//sha1加密方法
util.sha1 = (str) => {
    if (!str) {
        return str;
    }
    let sha1sum = crypto.createHash('sha1');
    sha1sum.update(str);
    str = sha1sum.digest('hex');
    return str;
};

// 上传到本地服务器
util.uploadFile = (req, options) => {
    const _emmiter = new Busboy({headers: req.headers})
    const filePath = options.filePath;
    var filePathList = [];
    return new Promise((resolve, reject) => {
        dirExists(filePath).then(res => {//判断文件存储路径是否存在，不存在则创建
            _emmiter.on('file', function (fieldname, file, filename, encoding, mimetype) {
                const fileName = filename;
                const saveTo = filePath + fileName;
                file.pipe(fs.createWriteStream(saveTo))
                file.on('end', function () {
                    filePathList.push(saveTo)
                })
            })
            _emmiter.on('finish', function () {
                console.log('finished...')
                resolve(filePathList)
            })

            _emmiter.on('error', function (err) {
                console.log('err...')
                reject(err)
            })
            req.pipe(_emmiter)
        })
    });

}

/**
 * 将已上传到本地服务器的文件上传到ali-oss服务器
 * @param {string} filePath 本地文件路径
 */
util.uploadToOss = (filePath) => {
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
    return new Promise((resolve, reject) => {
        let stream = fs.createReadStream(filePath);
        client.putStream("/publicService" + filePath.replace(".", ""), stream)
            .then(res => {
                resolve(`${config.oss.ossUrl}/publicService${filePath.replace(".", "")}`)
            }).catch(err => {
            reject(err)
        });
    })
}
/**
 * 删除文件夹及文件夹里的所有文件
 * @param {string} filePath 文件夹路径
 */
util.deleteFolder = (filePath) => {
    if (_.isEmpty(filePath)) {
        return;
    }
    var files = [];
    if (fs.existsSync(filePath)) {
        files = fs.readdirSync(filePath);
        Promise.all(files.map(file => {
            return new Promise(resolve => {
                var curPath = filePath + "/" + file;
                fs.unlinkSync(curPath);
                resolve();
            })
        })).then(() => {
            fs.rmdirSync(filePath);
            return ("ok")
        })
    } else {
        return ("ok")
    }
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
function dirExists(dir) {
    return new Promise((resolve, reject) => {
        getStat(dir).then(isExists => {
            //如果该路径且不是文件，返回true
            if (isExists && isExists.isDirectory()) {
                resolve(true);
            } else if (isExists && isExists.isFile()) {     //如果该路径存在但是文件，返回false
                resolve(false);
            } else if (isExists == false) {
                mkdir(dir).then(mkdirStatus => {
                    resolve(mkdirStatus);
                });
            }
            /*  //如果该路径不存在
              let tempDir = path.parse(dir).dir;      //拿到上级路径
              //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
              dirExists(tempDir).then(status => {
                  let mkdirStatus;
                  if (status) {
                      mkdir(dir).then(mkdirStatus => {
                          resolve (mkdirStatus);
                      });
                  }
              });*/

        });
    })


}

exports.util = util;