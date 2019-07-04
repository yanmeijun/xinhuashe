const monk = require('monk'),
    moment = require('moment'),
    log4js = require('../util/log4j'),
    util = require("../util/util").util,
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options);
const table = "userInformation";
let userInformationDAO = {};

/*
*查找用户信息 注册判断用户是否注册过 退出登录
*/
userInformationDAO.getUserByUserID = async (query) => {
    try {
        return await DB.get(table).findOne(query);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
/*注册*/
userInformationDAO.addUser = async (parameter) => {
    let selectChar = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    let charNum = "", num = "";
    for (var i = 0; i < 4; i++) {//4个英文字母随机数
        var charIndex = Math.floor(Math.random() * 60);
        charNum += selectChar[charIndex];
    }
    for (var i = 0; i < 3; i++) {//时间的格式注册日期（eg:20180725）
        num += moment().format('L').split("-")[i];
    }
    let openId = charNum + Math.floor(Math.random() * 10000000000000000 + 10000000000000000000) + num;
    let insertData = {
        password: parameter.password,//密码（md5加密）
        userName: parameter.userName,//登录名
        mobile: parameter.mobile,
        isStop: "1",//账号是否被停用 "0"代表停用 "1"代表启用
        confirmStatus: "0",//认证状态 "2"未通过 "1"待审核 "3"已通过 "0" 未认证
        openID: util.md5(openId), //（4位字母+注册日期（eg:20180725）+20位随机数字）需求进行（md5加密） open moment().format('YYYY-MM-DD HH:mm:ss')
        registerTime: moment().format('YYYY-MM-DD HH:mm:ss'),//用户注册时间
        name: "",//实名认证（联系人的姓名）
        sex: "",//实名认证（联系人的性别）
        idCard: "",//实名认证（联系人的身份证）
        idCardJust: "",
        idCardBack: "",
        mailbox: "",
        mechanismType: "",//企业信息（机构类型 "1"政府 "2"事业单位 "3"事业单位媒体 "4"社会团体 "5"企业法人 "6"企业媒体）
        companyName: "",
        companyUrl: "",
        organization: "",//企业信息（组织机构代码证上传文件url）
        mediaType: "",//企业信息（媒体类型 "1"电视广播 "2"报刊 "3"杂志 "4" 网络媒体）
        businessLicense: "",//企业信息（工商营业执照上传文件）
        mediaLicense: "",//企业信息（媒体许可上传文件）
        legalLicense: "",//企业信息（事业单位法人证书上传文件）
        sociologyGroup: "",//企业信息（社会团体登记证书上传文件）
        creatTime: "",
        modifyTime: "",
        publicLetter: "",//申请公函
        rejectOpinion: ""//驳回意见
    };
    try {
        return await DB.get(table).insert(insertData);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
/*
*修改密码
*/
userInformationDAO.ModifyPassword = async (query, paramter) => {
    try {
        return await DB.get(table).update(query, {$set: {password: paramter.aginPassword}});
    } catch (err) {
        log4js.errLogger(err)
    }
};
/*
*修改手机号
*/
userInformationDAO.modifyPhone = async (query, paramter) => {
    try {
        return await DB.get(table).update(query, {$set: {mobile: paramter.mobile}});
    } catch (err) {
        log4js.errLogger(err)
    }
};
/*
*政府认证审核confirmCooperation
*/
userInformationDAO.confirmCooperation = async (query, paramter) => {
    try {
        let updateAllList = [];
        updateAllList.push({
            updateOne:
                {
                    filter: query,
                    update: {$set: paramter},
                    upsert: true
                }
        })
        const data = await DB.get(table).bulkWrite(updateAllList);
        DB.close();
        return {status: '200', data: data};
    } catch (err) {
        log4js.errLogger(err)
    }
};
//根据openID获取用户信息
userInformationDAO.getUserByOpenID = async (query) => {
    try {
        return await DB.get(table).findOne(query);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
userInformationDAO.modify = async (query, modifyFields) => {
    try {
        return await DB.get(table).update(query, {$set: modifyFields});
    } catch (err) {
        log4js.errLogger(err)
        throw new Error("修改个人信息失败")
    }
};
exports.userInformationDAO = userInformationDAO;