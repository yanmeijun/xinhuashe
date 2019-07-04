'use strict'
const userDAO = require("../dao/user").userDAO,
    log4js = require('../util/log4j'),
    util = require("../util/util"),
    _ = require("underscore");

let userService = {};
/*
*登录
*/
userService.login = async (ctx) => {
    const user = {
        password: ctx.request.body.password,
        userName: ctx.request.body.userName
    };
    const flag = util.isEmptyValue("userService.login", user);
    //非空判断
    if (flag) {
        ctx.body = {"msg": "用户名或密码为空", "code": 500}
        return;
    }
    //数据正确性校验
    try {
        const dataUser = await userDAO.getUserByUserID(util.md5(user.userName));
        if (dataUser) {
            //判断密码是否一致
            if (!dataUser.isEnable) {
                ctx.body = {"msg": "该账号已被停用", "code": 202}
            } else if (dataUser.password == user.password) {
                ctx.session.user = user;
                ctx.body = {"msg": "登陆成功", "code": 200, user: dataUser}
            } else {
                ctx.body = {"msg": "密码错误", "code": 201}
            }
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
/*
*修改密码
*/
userService.ModifyPassword = async (ctx) => {
    const parameter = {
        userName: ctx.request.body.userName,
        password: ctx.request.body.password,//旧密码
        aginPassword: ctx.request.body.aginPassword//新密码
    }
    const flag = util.isEmptyValue("userService.login", parameter);
    if (flag) {
        ctx.body = {"msg": "旧密码和新密码不能为空", "code": 500}
        return;
    }
    ;
    //数据正确性校验
    try {
        const dataUser = await userDAO.getUserByUserID(util.md5(parameter.userName));
        if (dataUser) {
            //判断密码是否一致
            if (dataUser.password == parameter.password) {
                const updateUser = await userDAO.ModifyPassword({userID: util.md5(parameter.userName)}, parameter);
                if (updateUser) {
                    ctx.body = {"msg": "修改密码操作成功", "code": 200};
                } else {
                    ctx.body = {"msg": "修改密码操作失败", "code": 204};
                }
            }
            else {
                ctx.body = {"msg": "旧密码错误", "code": 203}
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
/*
*退出登录
*/
userService.logout = async (ctx) => {
    const parameter = {
        userName: ctx.request.body.userName
    };
    const flag = util.isEmptyValue("userService.logout", parameter);
    if (flag) {
        ctx.body = {"msg": "未登陆或登陆超时", "code": 500}
        return;
    }
    ;
    //数据正确性校验
    try {
        const dataUser = await userDAO.getUserByUserID(util.md5(parameter.userName));
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
}

/*
*判断是否已经绑定邮箱
*/
userService.mailbox = async (ctx) => {
    const parameter = {
        userName: ctx.request.body.userName
    };
    const flag = util.isEmptyValue("userService.logout", parameter);
    if (flag) {
        ctx.body = {"msg": "未登陆或登陆超时", "code": 500}
        return;
    }
    ;
    //数据正确性校验
    try {
        const dataUser = await userDAO.getUserByUserID(util.md5(parameter.userName));
        if (dataUser) {
            if (!dataUser.email) {
                ctx.body = {"msg": "邮箱未绑定", "code": 202, userName: dataUser.userName, dataUser}
            } else {
                ctx.body = {"msg": "邮箱已绑定", "code": 200, userName: dataUser.userName, dataUser}
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

/*
*绑定邮箱
*/
userService.mailboxBind = async (ctx) => {
    const parameter = {
        userName: ctx.request.body.userName,
        email: ctx.request.body.email
    };
    const flag = util.isEmptyValue("userService.logout", parameter);
    if (flag) {
        ctx.body = {"msg": "邮箱不能为空", "code": 500}
        return;
    }
    ;
    //数据正确性校验
    try {
        const dataUser = await userDAO.getUserByUserID(util.md5(parameter.userName));
        if (dataUser) {
            if (!dataUser.email) {
                const updateUser = await userDAO.mailboxBind({userID: util.md5(parameter.userName)}, parameter);
                if (updateUser) {
                    ctx.body = {"msg": "邮箱绑定成功", "code": 200}
                } else {
                    ctx.body = {"msg": "邮箱绑定失败", "code": 202}
                }
            } else {
                ctx.body = {"msg": "邮箱绑定失败", "code": 202}
            }
        } else {
            ctx.body = {"msg": "绑定邮箱操作失败", "code": 500}
        }
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};
/*
*修改绑定邮箱
*/
userService.modifyBindMail = async (ctx) => {
    const parameter = {
        userName: ctx.request.body.userName,
        email: ctx.request.body.email
    };
    const flag = util.isEmptyValue("userService.logout", parameter);
    if (flag) {
        ctx.body = {"msg": "邮箱不能为空", "code": 500}
        return;
    }
    ;
    //数据正确性校验
    try {
        const dataUser = await userDAO.getUserByUserID(util.md5(parameter.userName));
        if (dataUser) {
            const updateUser = await userDAO.modifyBindMail({userID: util.md5(parameter.userName)}, parameter);
            if (updateUser) {
                ctx.body = {"msg": "修改邮箱地址操作成功", "code": 200}
            } else {
                ctx.body = {"msg": "修改邮箱地址操作失败", "code": 202}
            }
        } else {
            ctx.body = {"msg": "修改绑定邮箱操作失败", "code": 500}
        }
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};
/*
*选择预警方式
*/
userService.earlyWarning = async (ctx) => {
    const parameter = {
        userName: ctx.request.body.userName,
        warning: ctx.request.body.warning
    };
    const flag = util.isEmptyValue("userService.logout", parameter);
    if (flag) {
        ctx.body = {"msg": "预警方式不能为空", "code": 500}
        return;
    }
    ;
    //数据正确性校验
    try {
        const dataUser = await userDAO.getUserByUserID(util.md5(parameter.userName));
        if (dataUser) {
            const updateUser = await userDAO.earlyWarning({userID: util.md5(parameter.userName)}, parameter);
            if (updateUser) {
                ctx.body = {"msg": "操作成功", "code": 200}
            } else {
                ctx.body = {"msg": "操作失败", "code": 202}
            }
        } else {
            ctx.body = {"msg": "选择预警方式操作失败", "code": 500}
        }
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};
//根据userName获取用户信息
userService.getUser = async (ctx) => {
    const parameter = {
        userName: ctx.request.body.userName
    };
    const flag = util.isEmptyValue("userService.getUser", parameter);
    if (flag) {
        ctx.body = {"msg": "userName不能为空", "code": 500}
        return;
    }
    ;
    //数据正确性校验
    try {
        const dataUser = await userDAO.getUserByUserID(util.md5(parameter.userName));
        ctx.body = {"user": dataUser, "code": 200}
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
}
//添加用户
userService.addUser = async (ctx) => {
    const parameter = {
        userName: ctx.request.body.userName,
        password: ctx.request.body.password,
        name: ctx.request.body.name,
        permission: ctx.request.body.permission,
        domain: ctx.request.body.domain
    };
    const flag = util.isEmptyValue("userService.addUser", parameter);
    if (flag) {
        ctx.body = {"msg": "参数不全", "code": 500};
        return;
    }
    ;
    //数据正确性校验
    try {
        const dataUser = await userDAO.add(ctx.request.body);
        ctx.body = {"user": dataUser, "code": 200}
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
}
//获取用户列表
userService.getUserList = async (ctx) => {
    const body = ctx.request.body;
    let query = body.query, userQuery = {};
    if (ctx.session.user.userName != "ucap_manager") {
        userQuery = {"userName": {$nin: ["ucap_manager"]}};
    }
    let options = {
        sort: body.sort || {createDate: -1},
        skip: (body.page - 1) * body.rows || 0,
        limit: body.rows || 10
    };
    try {
        let results = await userDAO.getUserList(body.isSearch ? _.extend(userQuery, {name: new RegExp(query.name)}) : _.extend(userQuery, query), options);
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
//修改用户信息
userService.modifyUser = async (ctx) => {
    let query = ctx.request.body.query, modify = ctx.request.body.modify;
    if (util.isEmptyValue("userService.modifyUser", {
            query: query,
            modify: modify
        })) {
        ctx.body = {
            msg: "error",
            error: "参数不全"
        };
    } else {
        try {
            let results = await userDAO.modify(query, modify);
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
//删除用户（支持批量）
userService.deleteUser = async (ctx) => {
    if (util.isEmptyValue("userService.deleteUser", {userID: ctx.request.body.userID})) {
        ctx.body = {
            msg: "error",
            error: "userID"
        };
    } else {
        let queryArray = ctx.request.body.userID;
        try {
            await Promise.all(queryArray.map(async function (item) {
                const user = await userDAO.getUserByUserID(item);
                if (ctx.session.user.userName == user.userName) {return;}
                log4js.info(ctx.session.user.userName + '删除了用户' + user.userName);
                await userDAO.delete({userID: item});
            }));
            ctx.body = {
                code: 200,
                msg: "success"
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
};

exports.userService = userService;