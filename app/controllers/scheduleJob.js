const schedule = require("node-schedule"),
    config = require('../../config'),
    moment = require('moment'),
    sfCodeDAO = require("../dao/sf").sfCodeDAO;

exports.updateJob = () => {
    /*
     * 周一到周日的02点30分执行任务
     * 省份代号更新
     * 
     */
    let rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 6)];
    rule.hour = config.get("system.scheduleJob.hour");
    rule.minute = config.get("system.scheduleJob.minute");
    console.log("定时省份代号更新---任务已启动：%s", moment().format('YYYY-MM-DD HH:mm:ss'));
    schedule.scheduleJob(rule, () => {
        console.log("定时省份代号更新---任务开始执行：%s", moment().format('YYYY-MM-DD HH:mm:ss'));
        sfCodeDAO.sfCodeUpdate((err) => {
            if (err) {
                console.log(err)
            }
        })
    })
}
