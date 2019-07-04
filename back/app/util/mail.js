'use strict';
const nodeMailer = require('nodemailer'),
    fs = require("fs"),
    ejs = require('ejs'),
    _ = require("underscore"),
    moment = require('moment'),
    mailConfig = require('../../config/mail'),
    log4js = require('../util/log4j'),
    userDAO = require('../dao/user').userDAO,
    userServiceDAO = require('../dao/userService').userServiceDAO,
    procureDAO = require('../dao/procure').procureDAO,
    userInformationDAO = require('../dao/userInformation').userInformationDAO;
const transporter = nodeMailer.createTransport({
    host: mailConfig.sendMail_MailServerHost,
    port: mailConfig.sendMail_ServerPort,
    secure: false,
    auth: {
        user: mailConfig.sendMail_UserName,
        pass: mailConfig.sendMail_Password
    },
    tls: {
        rejectUnauthorized: false
    }
});
let mailOptions = {
    from: mailConfig.sendMail_FromAddress + mailConfig.sendMail_FromAddressMail,
    to: '',//收件人
    subject: '',//邮件主题
    html: ''//邮件内容
};
let mailUtil = {};
const sendHtmlMail = async (info) => {
    mailOptions.to = info.to, mailOptions.subject = info.subject, mailOptions.html = info.html;
    try {
        const mailInfo = await transporter.sendMail(mailOptions);
        log4js.info('预警邮件发送成功，messageId:' + mailInfo.messageId + ";response:" + mailInfo.response + ";收件人:" + mailInfo.accepted);
    } catch (err) {
        log4js.error("预警邮件发送失败:" + err);
    }
}
//发送监控预警邮件
mailUtil.sendMonitorEmail = async (type, mailList) => {
    let template;
    switch (type) {
        case "origin":
            template = await fs.readFileSync(__dirname + '/template/mailNotice-origin.ejs', 'utf8');//邮件模板
            break;
        case "template":
            template = await fs.readFileSync(__dirname + '/template/mailNotice-service.ejs', 'utf8');//邮件模板
            break;
    }
    if (type == "origin") {
        const groupData = _.groupBy(mailList, function (item) {
            return item.userID;
        });
        const keyList = _.keys(groupData);
        _.each(keyList, async (userID) => {
            const user = await userDAO.getUserByUserID(userID);
            if (user.warnEmail && user.warning) {
                const options = {
                        docs: groupData[userID],
                        time: moment().format('YYYY-MM-DD'),
                        length: _.size(groupData[userID])
                    },
                    html = ejs.render(template, options),
                    info = {
                        "to": user.warnEmail,
                        "subject": type == "origin" ? '开普云-源站监控预警' : '开普云-服务模板监控预警',
                        "html": html,
                    }
                await sendHtmlMail(info);
            }
        })
    } else {
        const userInfoQuery = {warnEmail: {$exists: true}};//查询门户用户的条件
        const userInfoList = await userInformationDAO.getUserByQuery(userInfoQuery);
        _.each(userInfoList, async (item) => {
            item.dataList = [];
            const procureQuery = {openID: item.openID, status: 2};
            const procureList = await procureDAO.findProcureAllByOpenID(procureQuery);
            const templateList = _.uniq(_.pluck(procureList, 'templateID'));
            _.filter(mailList, (mailItem) => {
                if (_.contains(templateList, mailItem.templateID)) {
                    item.dataList.push(mailItem);
                }
            })
            if (!_.isEmpty(item.dataList)) {
                const options = {
                        docs: item.dataList,
                        time: moment().format('YYYY-MM-DD'),
                        length: _.size(item.dataList)
                    },
                    html = ejs.render(template, options),
                    info = {
                        "to": item.warnEmail,
                        "subject": type == "origin" ? '开普云-源站监控预警' : '开普云-服务模板监控预警',
                        "html": html,
                    }
                await sendHtmlMail(info);
            }
        })
    }
}
module.exports = mailUtil;