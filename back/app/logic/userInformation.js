'use strict'
const log4js = require('../util/log4j'),
    util = require("../util/util").util,
    urlParse = require('url'),
    _ = require("underscore"),
    path = require('path'),
    Busboy = require('busboy'),
    request = require('request'),
    fs = require('fs'),
    config = require('../../config/config'),
    moment = require('moment'),
    userInformationDAO = require("../dao/userInformation").userInformationDAO,
    codeDAO = require("../dao/code").codeDAO;
let userInformationService = {};
/*登录*/
userInformationService.login = async (ctx) => {
    const user = {
        password: ctx.request.body.password,
        userName: ctx.request.body.userName
    };
    const flag = util.isEmptyValue("userInformationService.login", user);
    //非空判断
    if (flag) {
        ctx.body = {"msg": "用户名或密码为空", "code": 500}
        return;
    }
    //数据正确性校验
    try {
        let query = {
            $or: [{userName: user.userName},
                {mobile: user.userName}]
        }
        const dataUser = await userInformationDAO.getUserByUserID(query);
        if (dataUser) {
            //用户状态(账号是否被停用 "0"代表停用 "1"代表启用)
            if (dataUser.isStop == "0") {
                ctx.body = {"msg": "账号被停用", "code": 203};
            } else {
                //判断密码是否一致
                if (dataUser.password == user.password) {
                    ctx.session.user = user;
                    ctx.body = {
                        "msg": "登陆成功",
                        "code": 200,
                        userName: dataUser.userName,
                        openID: dataUser.openID,
                        confirmStatus: dataUser.confirmStatus
                    }
                } else {
                    ctx.body = {"msg": "用户名或密码错误", "code": 201}
                }
            }
            // if(dataUser.confirmStatus == "0"){//用户认证状态 认证状态 "0"未通过 "1"待审核 "2"已通过
            //     ctx.body = {"msg": "用户认证未通过", "code": 100002};
            // }else if(dataUser.confirmStatus == "1"){
            //     ctx.body = {"msg": "用户认证待审核", "code": 100003};
            // }else if(dataUser.confirmStatus == "2"){
            //     ctx.body = {"msg": "用户认证已通过", "code": 100004};
            // }
        } else {
            ctx.body = {"msg": "该用户不存在", "code": 404}
        }
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};

userInformationService.isLogin = async (ctx) => {
    if (!ctx.session.user) {
        ctx.body = {
            code: 402,
            msg: "用户未登录"
        };
    } else {
        ctx.body = {
            code: 200,
            msg: "用户已登录"
        };
    }
}

/*注册绑定用户是否注册过*/
userInformationService.isRegister = async (ctx) => {
    let body = ctx.request.body;
    const flag = util.isEmptyValue("userInformationService.register", body);
    //非空判断
    if (flag) {
        ctx.body = {"msg": "请求参数不完整", "code": 500};
        return;
    } else {
        let query = {
            $or: [{userName: body.userName},
                {mobile: body.mobile}]
        }
        const dataUser = await userInformationDAO.getUserByUserID(query);
        if (dataUser) {
            if (dataUser.userName == body.userName) {
                ctx.body = {"msg": "该用户已注册", "code": 203};
            } else if (dataUser.mobile == body.mobile) {
                ctx.body = {"msg": "该手机号已注册", "code": 204}
            }
        } else {
            ctx.body = {"msg": "该用户不存在", "code": 200};
        }
    }
};
/*注册*/
userInformationService.register = async (ctx) => {
    const user = {
        password: ctx.request.body.password,
        password2: ctx.request.body.password2,
        userName: ctx.request.body.userName,
        mobile: ctx.request.body.mobile,
        checkCode: ctx.request.body.checkCode
    };
    const flag = util.isEmptyValue("userInformationService.register", user);
    //非空判断
    if (flag) {
        ctx.body = {"msg": "请求参数不完整", "code": 500};
        return;
    } else {
        if (user.password !== user.password2) {
            ctx.body = {"msg": "注册失败", "code": 500};
            return;
        }
        try {
            //step1判断是否存在该用户userName，如果有注册失败
            const dataUser = await userInformationDAO.getUserByUserID({userName: user.userName});
            if (!_.isEmpty(dataUser)) {
                ctx.body = {"msg": "注册失败", "code": 500};
                return;
            }
            //step2校验短信验证码
            const codeData = await codeDAO.findOne({"mobile": user.mobile, "actionName": "register"});
            if (!_.isEmpty(codeData) && codeData.checkCode == user.checkCode && moment.now() < moment(codeData.expireTime)) {
                //数据库添加该用户，注册成功
                await userInformationDAO.addUser(_.omit(user,'checkCode'));
                ctx.body = {"msg": "注册成功", "code": 200};
            } else {
                ctx.body = {"msg": "注册失败", "code": 500};
            }
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: err
            };
        }
    }
};

/*
*退出登录
*/
userInformationService.logout = async (ctx) => {
    const paramter = {
        userName: ctx.request.body.userName
    };
    const flag = util.isEmptyValue("userInformationService.logout", paramter);
    if (flag) {
        ctx.body = {"msg": "未登陆或登陆超时", "code": 500}
        return;
    }
    //数据正确性校验
    try {
        let query = {
            $or: [{userName: paramter.userName},
                {mobile: paramter.userName}]
        };
        const dataUser = await userInformationDAO.getUserByUserID(query);
        if (dataUser) {
            if (ctx.session.user) {
                ctx.session.user = "";
                ctx.body = {"msg": "退出成功", "code": 200}
            } else {
                ctx.body = {"msg": "未登陆或登陆超时", "code": 404}
            }
        } else {
            ctx.body = {"msg": "未登陆或登陆超时", "code": 500}
        }
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};
//判断用户是否实名认证
userInformationService.realName = async (ctx) => {
    let body = ctx.request.body;
    const flag = util.isEmptyValue("userInformationService.realName", body);
    //非空判断
    if (flag) {
        ctx.body = {"msg": "请求参数不完整", "code": 500};
        return;
    } else {
        let query = {
            $or: [{userName: body.userName},
                {mobile: body.userName}]
        }
        const result = await userInformationDAO.getUserByUserID(query);
        if (result) {
            ctx.body = {
                result,
                "code": 200
            }
        } else {
            ctx.body = {"msg": "该用户不存在", "code": 204};
        }
    }
};
/*
*修改密码
*/
userInformationService.ModifyPassword = async (ctx) => {
    const paramter = {
        userName: ctx.request.body.userName,
        password: ctx.request.body.password,//旧密码
        aginPassword: ctx.request.body.aginPassword//新密码
    }
    const flag = util.isEmptyValue("userInformationService.ModifyPassword", paramter);
    if (flag) {
        ctx.body = {"msg": "旧密码和新密码不能为空", "code": 500}
        return;
    }
    //数据正确性校验
    try {
        let query = {
            $or: [{userName: paramter.userName},
                {mobile: paramter.userName}]
        }
        const dataUser = await userInformationDAO.getUserByUserID(query);
        if (dataUser) {
            //判断密码是否一致
            if (dataUser.password == paramter.password) {
                const updateUser = await userInformationDAO.ModifyPassword(query, paramter);
                if (updateUser) {
                    ctx.body = {"msg": "修改密码成功,请重新登录", "code": 200};
                } else {
                    ctx.body = {"msg": "修改密码操作失败", "code": 204};
                }
            }
            else {
                ctx.body = {"msg": "∗ 密码不匹配！", "code": 203}
            }
        } else {
            ctx.body = {"msg": "修改密码操作失败", "code": 404}
        }
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};
//忘记密码
userInformationService.findPassword = async (ctx) => {
    const paramter = {
        mobile: ctx.request.body.mobile,
        checkCode: ctx.request.body.checkCode,
        password: ctx.request.body.password,//密码
        aginPassword: ctx.request.body.aginPassword//确认密码
    }
    const flag = util.isEmptyValue("userInformationService.findPassword", paramter);
    if (flag) {
        ctx.body = {"msg": "旧密码和新密码不能为空", "code": 500}
        return;
    }
    //数据正确性校验
    try {
        if (paramter.password != paramter.aginPassword) {
            ctx.body = {"msg": "修改密码操作失败", "code": 204};
            return;
        }
        let query = {mobile: paramter.mobile};
        //判断校验码是否正确，是否超过使用期限
        const codeData = await codeDAO.findOne({"mobile": paramter.mobile, "actionName": "forgetPass"});
        if (!_.isEmpty(codeData) && codeData.checkCode == paramter.checkCode && moment.now() < moment(codeData.expireTime)) {
            await userInformationDAO.ModifyPassword(query, paramter);
            ctx.body = {"msg": "找回密码成功", "code": 200};
        } else {
            ctx.body = {"msg": "修改密码操作失败", "code": 204};
        }
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};
//判断密码是否正确
userInformationService.isJsutPassword = async (ctx) => {
    const paramter = {
        userName: ctx.request.body.userName,
        password: ctx.request.body.password
    }
    const flag = util.isEmptyValue("userInformationService.isJsutPassword", paramter);
    if (flag) {
        ctx.body = {"msg": "请求参数不完整", "code": 500}
        return;
    }
    try {
        let query = {
            $or: [{userName: paramter.userName},
                {mobile: paramter.userName}]
        };
        const dataUser = await userInformationDAO.getUserByUserID(query);
        if (dataUser) {
            if (dataUser.password == paramter.password) {
                ctx.body = {"msg": "密码正确", "code": 200};
            } else {
                ctx.body = {"msg": "密码不匹配！", "code": 203};
            }
        } else {
            ctx.body = {"msg": "密码操作失败", "code": 404};
        }

    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};
//绑定手机号是否注册过
userInformationService.isOnlymobile = async (ctx) => {
    const paramter = {
        mobile: ctx.request.body.mobile
    }
    const flag = util.isEmptyValue("userInformationService.isOnlymobile", paramter);
    if (flag) {
        ctx.body = {"msg": "请求参数不完整", "code": 500}
        return;
    }
    try {
        const dataUser = await userInformationDAO.getUserByUserID(paramter);
        if (dataUser) {
            if (dataUser.mobile == paramter.mobile) {
                ctx.body = {"msg": "已使用该手机号，请更换其他手机号", "code": 203};
            } else {
                ctx.body = {"msg": "该手机号没有注册过", "code": 200};
            }
        } else {
            ctx.body = {"msg": "该手机号没有注册过", "code": 200}
        }

    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};
//修改手机号
userInformationService.modifyPhone = async (ctx) => {
    const paramter = {
        userName: ctx.request.body.userName,
        mobile: ctx.request.body.mobile,
        checkCode: ctx.request.body.checkCode
    }
    const flag = util.isEmptyValue("userInformationService.modifyPhone", paramter);
    if (flag) {
        ctx.body = {"msg": "请求参数不能为空", "code": 500}
        return;
    }
    //数据正确性校验
    try {
        let query = {
            $or: [{userName: paramter.userName},
                {mobile: paramter.userName}]
        };
        //判断校验码是否正确，是否超过使用期限
        const codeData = await codeDAO.findOne({"mobile": paramter.mobile, "actionName": "modifyMobile"});
        if (!_.isEmpty(codeData) && codeData.checkCode == paramter.checkCode && moment.now() < moment(codeData.expireTime)) {
            const dataUser = await userInformationDAO.getUserByUserID(query);
            if (dataUser) {
                const updateUser = await userInformationDAO.modifyPhone(query, paramter);
                if (updateUser) {
                    ctx.body = {"msg": "更换手机号成功！", "code": 200};
                } else {
                    ctx.body = {"msg": "更换手机号操作失败", "code": 204};
                }
            } else {
                ctx.body = {"msg": "更换手机号操作失败", "code": 204}
            }
        } else {
            ctx.body = {"msg": "更换手机号操作失败", "code": 204};
        }
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};

/*上传图片*/
userInformationService.upload = async (ctx) => {
    const idNumber = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[2];
    const serverPath = `./dist/upload/${idNumber}/`;
    if (util.isEmptyValue("userInformationService.upload", {
            idNumber: idNumber
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "idNumber不能为空"
        };
    } else {
        try {
            const result = await util.uploadFile(ctx, {
                filePath: `/upload/${idNumber}/`,
                serverPath: serverPath
            })
            ctx.body = {
                code: 200,
                msg: "success",
                filePath: result.filePath,
                fileName: result.fileName
            }
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
};

//提交政府申请实名认证
userInformationService.government = async (ctx) => {
    var params = ctx.request.body;
    //企业信息（机构类型 "1"政府 "2"事业单位 "3"事业单位媒体 "4"社会团体 "5"企业法人 "6"企业媒体）
    if (!params.openID) {
        ctx.body = {"msg": "opendID不能为空", "code": 500}
    }
    var paramter;
    switch (params.mechanismType) {
        case "1":
            paramter = {
                "openID": params.openID,
                "name": params.name,
                "sex": params.sex,
                "idCard": params.idCard,
                "idCardJust": params.idCardJust,
                "idCardBack": params.idCardBack,
                "mailbox": params.mailbox,
                "mechanismType": params.mechanismType,
                "companyName": params.companyName,
                "companyUrl": params.companyUrl,
                "organization": params.organization,
                "confirmStatus": params.confirmStatus,
                "publicLetter": params.publicLetter
            };
            break;
        case "2":
            paramter = {
                "openID": params.openID,
                "name": params.name,
                "sex": params.sex,
                "idCard": params.idCard,
                "idCardJust": params.idCardJust,
                "idCardBack": params.idCardBack,
                "mailbox": params.mailbox,
                "mechanismType": params.mechanismType,
                "companyName": params.companyName,
                "companyUrl": params.companyUrl,
                "legalLicense": params.legalLicense,
                "confirmStatus": params.confirmStatus,
                "publicLetter": params.publicLetter
            };
            break;
        case "3":
            paramter = {
                "openID": params.openID,
                "name": params.name,
                "sex": params.sex,
                "idCard": params.idCard,
                "idCardJust": params.idCardJust,
                "idCardBack": params.idCardBack,
                "mailbox": params.mailbox,
                "mechanismType": params.mechanismType,
                "companyName": params.companyName,
                "companyUrl": params.companyUrl,
                "legalLicense": params.legalLicense,
                "confirmStatus": params.confirmStatus,
                "mediaLicense": params.mediaLicense,
                "mediaType": params.mediaType,
                "publicLetter": params.publicLetter
            };
            break;
        case "4":
            paramter = {
                "openID": params.openID,
                "name": params.name,
                "sex": params.sex,
                "idCard": params.idCard,
                "idCardJust": params.idCardJust,
                "idCardBack": params.idCardBack,
                "mailbox": params.mailbox,
                "mechanismType": params.mechanismType,
                "companyName": params.companyName,
                "companyUrl": params.companyUrl,
                "organization": params.organization,
                "confirmStatus": params.confirmStatus,
                "sociologyGroup": params.sociologyGroup,
                "publicLetter": params.publicLetter
            };
            break;
        case "5":
            paramter = {
                "openID": params.openID,
                "name": params.name,
                "sex": params.sex,
                "idCard": params.idCard,
                "idCardJust": params.idCardJust,
                "idCardBack": params.idCardBack,
                "mailbox": params.mailbox,
                "mechanismType": params.mechanismType,
                "companyName": params.companyName,
                "companyUrl": params.companyUrl,
                "businessLicense": params.businessLicense,
                "confirmStatus": params.confirmStatus,
                "publicLetter": params.publicLetter
            };
            break;
        case "6":
            paramter = {
                "openID": params.openID,
                "name": params.name,
                "sex": params.sex,
                "idCard": params.idCard,
                "idCardJust": params.idCardJust,
                "idCardBack": params.idCardBack,
                "mailbox": params.mailbox,
                "mechanismType": params.mechanismType,
                "companyName": params.companyName,
                "companyUrl": params.companyUrl,
                "businessLicense": params.businessLicense,
                "confirmStatus": params.confirmStatus,
                "mediaLicense": params.mediaLicense,
                "mediaType": params.mediaType,
                "publicLetter": params.publicLetter
            };
            break;
    }
    //数据正确性校验
    try {
        const dataUser = await userInformationDAO.getUserByUserID({openID: paramter.openID});
        const reg = config.oss.bucket;
        if (dataUser) {
            if (!_.isEmpty(paramter.idCardJust) && paramter.idCardJust.indexOf(reg) < 0) {
                let testReport = await util.uploadToOss(paramter.idCardJust);
                paramter.idCardJust = testReport.filePath;
            }
            if (!_.isEmpty(paramter.idCardBack) && paramter.idCardBack.indexOf(reg) < 0) {
                let testReport = await util.uploadToOss(paramter.idCardBack);
                paramter.idCardBack = testReport.filePath;
            }
            if (!_.isEmpty(paramter.organization) && paramter.organization.indexOf(reg) < 0) {
                let testReport = await util.uploadToOss(paramter.organization);
                paramter.organization = testReport.filePath;
            }
            if (!_.isEmpty(paramter.publicLetter) && paramter.publicLetter.indexOf(reg) < 0) {
                let testReport = await util.uploadToOss(paramter.publicLetter);
                paramter.publicLetter = testReport.filePath;
            }
            //企业信息（社会团体登记证书上传文件）
            if (!_.isEmpty(paramter.sociologyGroup) && paramter.sociologyGroup.indexOf(reg) < 0) {
                let testReport = await util.uploadToOss(paramter.sociologyGroup);
                paramter.sociologyGroup = testReport.filePath;
            }
            //企业信息（事业单位法人证书上传文件）
            if (!_.isEmpty(paramter.legalLicense) && paramter.legalLicense.indexOf(reg) < 0) {
                let testReport = await util.uploadToOss(paramter.legalLicense);
                paramter.legalLicense = testReport.filePath;
            }
            //企业信息（工商营业执照上传文件）
            if (!_.isEmpty(paramter.businessLicense) && paramter.businessLicense.indexOf(reg) < 0) {
                let testReport = await util.uploadToOss(paramter.businessLicense);
                paramter.businessLicense = testReport.filePath;
            }
            //企业信息（媒体许可上传文件）
            if (!_.isEmpty(paramter.mediaLicense) && paramter.mediaLicense.indexOf(reg) < 0) {
                let testReport = await util.uploadToOss(paramter.mediaLicense);
                paramter.mediaLicense = testReport.filePath;
            }
            const updateUser = await userInformationDAO.confirmCooperation({openID: paramter.openID}, paramter);
            let deleteFolder = await util.deleteFolder(`./dist/upload/${dataUser.userName}`);
            if (updateUser.status != "200") {
                ctx.body = {
                    success: false,
                    info: updateUser,
                    code: "203"
                }
            } else {
                ctx.body = {
                    success: true,
                    info: updateUser,
                    code: "200"
                }
            }
        } else {
            ctx.body = {"msg": "提交认证操作失败", "code": 404}
        }
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
}
//根据OpenID获取用户信息
userInformationService.getUserByOpenID = async (ctx) => {
    const openID = ctx.request.body.openID;
    if (util.isEmptyValue("userInformationService.getUserByOpenID", {
            openID: openID
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "openID不能为空"
        };
    } else {
        try {
            let results = await userInformationDAO.getUserByOpenID({openID: openID});
            ctx.body = {
                code: 200,
                msg: "success",
                results: results
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
}
/*上传图片*/
userInformationService.uploadfile = async (ctx) => {
    // 获取上存图片
    const result = await uploadFiles(ctx, {
        fileType: 'album',
        path: "./route/"
    });
    ctx.body = {
        msg: "ok"
    };
};

// 上传到本地服务器
function uploadFiles(ctx, options) {
    const _emmiter = new Busboy({headers: ctx.req.headers})
    const fileType = options.fileType;
    const filePath = path.join(options.path, fileType);
    const confirm = mkdirsSync(filePath)
    if (!confirm) {
        return
    }
    log4js.info('start uploading... ');
    return new Promise((resolve, reject) => {
        _emmiter.on('file', function (fieldname, file, filename, encoding, mimetype) {
            const fileName = filename;
            const saveTo = "./route/" + fileName;
            file.pipe(fs.createWriteStream(saveTo))
            file.on('end', function () {
                resolve({
                    imgPath: `/${fileType}/${fileName}`,
                    imgKey: fileName
                })
            })
        });
        _emmiter.on('finish', function () {
            log4js.info('finished...');
        });
        _emmiter.on('error', function (err) {
            log4js.info('err...')
            reject(err)
        });
        ctx.req.pipe(_emmiter);
    });
}

userInformationService.getWarnEmail = async (ctx) => {
    const openID = ctx.request.query.openID;
    if (util.isEmptyValue("userInformationService.getWarnEmail", {
            openID: openID
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "openID不能为空"
        };
    } else {
        try {
            let results = await userInformationDAO.getUserByOpenID({openID: openID});
            let warnEmailList = results.hasOwnProperty('warnEmail') ? results.warnEmail.split(";") : [], warnEmail = [];
            for (let item of warnEmailList) {
                warnEmail.push({name: item.split("<")[0], email: item.split("<")[1].replace(">", "")})
            }
            ctx.body = {
                code: 200,
                msg: "success",
                results: warnEmail
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
}
userInformationService.modifyWarnEmail = async (ctx) => {
    const openID = ctx.request.body.openID, warnEmail = ctx.request.body.warnEmail;
    if (util.isEmptyValue("userInformationService.modifyWarnEmail", {
            openID, warnEmail
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "openID、warnEmail不能为空"
        };
    } else {
        try {
            let results = await userInformationDAO.modify({openID: openID}, {warnEmail: warnEmail});
            ctx.body = {
                code: 200,
                msg: "success",
                results: results
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
}
exports.userInformationService = userInformationService;