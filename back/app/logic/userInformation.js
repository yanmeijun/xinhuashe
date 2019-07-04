'use strict'
const userInformationDAO = require("../dao/userInformation").userInformationDAO,
  log4js = require('../util/log4j'),
  util = require("../util/util"),
  _ = require("underscore");

let userInformationService = {};
//获取所有的用户信息列表
userInformationService.getUserDate =  async (ctx) =>{
  const body = ctx.request.body;
  let query = body.query;
  let options = {
    sort: body.sort || {registerTime: -1},
    skip: (body.page - 1) * body.rows || 0,
    limit: body.rows || 10
  };
  //数据正确性校验
  try{
    const dataUser = await userInformationDAO.getAllUser(query, options);
    if(dataUser){
      ctx.body = {
        "msg": "成功",
        "code": 200,
        dataUser
      }
    }else{
      ctx.body = {
        "msg": "暂无数据",
        "code": 203,
      }
    }
  } catch (err){
    log4js.error(err);
    ctx.body = {
      code: 500,
      msg: err
    };
  }
};
//模糊查询 用户信息
userInformationService.getUserKey = async(ctx) => {
  let body = ctx.request.body;
  let query = {userName: new RegExp(body.userName)},
    option = {
      sort: body.sort || {registerTime: -1},//排序  按创建时间排 倒叙 -1
      skip: (body.page - 1) * body.rows || 0,
      limit: body.rows || 10
    };
  // 后台管理人员（认证状态 "2"未通过 "1"待审核 "3"已通过 "0" 未认证）（用户认证状态）confirmStatus
  if (body.confirmStatus == "1") {//待审核
    query = _.extend(query, {confirmStatus:"1"})
  } else if (body.confirmStatus == "2") {//未通过
    query = _.extend(query, {confirmStatus:"2"})
  } else if (body.confirmStatus == "3") {//已通过
    query = _.extend(query, {confirmStatus:"3"})
  } else if (body.confirmStatus == "0") {//未认证
    query = _.extend(query, {confirmStatus: "0"})
  };
  try {
    let dataUser = await userInformationDAO.getAllUser(query, option);
    ctx.body = {
      msg: "success",
      "code": 200,
      dataUser
    };
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
userInformationService.ModifyPassword = async (ctx) =>{
  const paramter = {
    userName:ctx.request.body.userName,
    password:ctx.request.body.password,//旧密码
    aginPassword:ctx.request.body.aginPassword//新密码
  }
  const flag = util.isEmptyValue("userInformationService.ModifyPassword", paramter);
  if (flag) {
    ctx.body = {"msg": "密码不能为空", "code": 500}
    return;
  };
  //数据正确性校验
  try{
    let query = {userName: paramter.userName};
    const dataUser = await userInformationDAO.getUserByUserID(query);
    if (dataUser) {
      //判断密码是否一致
        const updateUser = await userInformationDAO.ModifyPassword(query,paramter);
        if(updateUser){
          ctx.body = {"msg": "修改密码成功!", "code": 200};
        }else{
          ctx.body = {"msg": "修改密码操作失败", "code": 204};
        }
    } else {
      ctx.body = {"msg": "修改密码操作失败", "code": 404}
    }
  } catch (err){
    log4js.error(err);
    ctx.body = {
      code: 500,
      msg: err
    };
  }
};
//根据OpenID获取用户信息
userInformationService.getUserByOpenID = async(ctx) => {
  const openID = ctx.request.body.openID;
  if (util.isEmptyValue("serviceJoinLogic.getUserByOpenID", {
      openID: openID
    })) {
    ctx.body = {
      code: 500,
      msg: "error",
      error: "openID不能为空"
    };
  } else {
    try {
      let results = await userInformationDAO.getAllUser({openID: openID});
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
//启用停用
userInformationService.startOrStop = async(ctx) => {
  const openID = ctx.request.body.openID,
      isStop = ctx.request.body.isStop;
  if (util.isEmptyValue("serviceJoinLogic.startOrStop", {
      openID: openID,
        isStop:isStop
    })) {
    ctx.body = {
      code: 500,
      msg: "error",
      error: "openID、isStop不能为空"
    };
  } else {
    try {
      let results = await userInformationDAO.modify({openID: openID},{isStop: isStop});
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
};
//通过审核
userInformationService.checkAdopt = async(ctx) => {
  const openID = ctx.request.body.openID,
    confirmStatus = ctx.request.body.confirmStatus;
  if (util.isEmptyValue("userInformationService.checkAdopt", {
      openID: openID,
      confirmStatus:confirmStatus
    })) {
    ctx.body = {
      code: 500,
      msg: "error",
      error: "openID、confirmStatus不能为空"
    };
  } else {
    try {
      let results = await userInformationDAO.modify({openID: openID},{confirmStatus: confirmStatus});
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
};
//驳回意见
userInformationService.fillReject = async(ctx) => {
  const openID = ctx.request.body.openID,
      rejectOpinion = ctx.request.body.rejectOpinion,
      confirmStatus = ctx.request.body.confirmStatus;
  if (util.isEmptyValue("userInformationService.checkAdopt", {
      openID: openID,
      confirmStatus:confirmStatus
    })) {
    ctx.body = {
      code: 500,
      msg: "error",
      error: "openID、confirmStatus不能为空"
    };
  } else {
    try {
      let results = await userInformationDAO.modify({openID: openID},{confirmStatus: confirmStatus,rejectOpinion:rejectOpinion});
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
};
/*注册*/
userInformationService.register = async (ctx) => {
  const user = {
    password: ctx.request.body.password,
    userName: ctx.request.body.userName,
    mobile:ctx.request.body.mobile
  };
  const flag = util.isEmptyValue("userInformationService.register", user);
  //非空判断
  if (flag) {
    ctx.body = {"msg": "请求参数不完整", "code": 500};
    return;
  }else{
    try{
      //step1判断是否存在该用户userName，如果有注册失败
      //step2校验短信验证码
      //数据库添加该用户，注册成功
      const dataUser = await userInformationDAO.addUser(user);
      if(dataUser){
        ctx.body = {"msg": "注册成功", "code": 200};
      }else{
        ctx.body = {"msg": "注册失败", "code": 100001};
      }
    }catch(err){
      log4js.error(err);
      ctx.body = {
        code: 500,
        msg: err
      };
    }

  };
};
/*注册绑定用户是否注册过*/
userInformationService.isRegister = async (ctx) => {
  let body = ctx.request.body;
  const flag = util.isEmptyValue("userInformationService.register", body);
  //非空判断
  if (flag) {
    ctx.body = {"msg": "请求参数不完整", "code": 500};
    return;
  }else{
    let query = {
      $or: [{userName: body.userName},
        {mobile:body.mobile}]
    }
    const dataUser = await userInformationDAO.getUserByUserID(query);
    if(dataUser){
      if(dataUser.userName == body.userName){
        ctx.body = {"msg": "该用户已注册", "code": 203};
      }else if(dataUser.mobile == body.mobile){
        ctx.body = {"msg": "该手机号已注册", "code": 204}
      }
    }else{
      ctx.body = {"msg": "该用户不存在", "code": 200};
    }
  }
};
exports.userInformationService = userInformationService;