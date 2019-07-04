const schedule = require("node-schedule"),
    config = require('./config/config'),
    log4js = require('./app/util/log4j'),
    originTask = require('./app/schedule/originTask').originTask,
    tmpMonitorTask = require('./app/schedule/tmpMonitorTask').tmpMonitorTask;

const scheduleJob = () => {
    let rule = new schedule.RecurrenceRule();
    rule.minute = config.scheduleJobTime;
    // rule.second = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56];
    schedule.scheduleJob(rule, async() => {
        try{
           await originTask.createOriginTask();
           await tmpMonitorTask.createTmpMonitorTask();
        }catch(err){
            log4js.error(err);
        }
    })
};
scheduleJob();