const _ = require('underscore'),
    jsontools = require('./lib/jsontools'),
    configs = {},
    configFiles = [
        "/configfile/system.json"
        // "/configfile/api.json"
    ],
    configCache = {};

function loadConfig(filePath, cb) {
    var filename;

    console.log("Enter loadConfig:" + filePath);

    jsontools.loadJson(filePath, (err, data) => {
        if (err) {
            console.log("--load config :" + filePath + "  --has err.");
            return cb(err);
        }
        filename = filePath.split('/').pop().replace('.json', '');
        configs[filename] = data;
        return cb(null);
    });
}

function get(vName) {
    var value = configCache[vName];
    if (!value) {
        value = jsontools.getValueFromJson(configs, vName);
        configCache[vName] = value;
    }
    return value;
}


exports.configFiles = configFiles;
exports.loadConfig = loadConfig;
exports.get = get;
