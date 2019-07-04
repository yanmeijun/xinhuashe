const config = require('./configfile/system.json'),
    scheduleJob = require("./app/controllers/scheduleJob");

if (config.scheduleJob.status) {
    scheduleJob.updateJob();
}