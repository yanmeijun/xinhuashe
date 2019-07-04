var fs = require('fs'),
    _ = require('underscore');

function loadJson(filePath, cb) {

    fs.readFile(filePath, 'UTF-8', (err, data) => {
        var tempData = null,
            tempErr = null;

        if (err) {
            return cb(err, null);
        }
        try {
            tempData = JSON.parse(data);
        } catch (parseErr) {
            tempErr = parseErr;
        }
        return cb(tempErr, tempData);
    });
}

function getValueFromJson(orgin, vName) {
    var value = orgin || {},
        tmpNames;

    if (vName.indexOf(".") === -1) {
        value = value[vName];
    } else {
        tmpNames = vName.split('.');
        _.every(tmpNames, (item) => {
            // console.log(value[item]);
            value = value[item];
            return !_.isUndefined(value);
        });
    }
    if (value == null || value == undefined || value == "undefined") {
        value = "";
    }
    return value;
}

function parse(str) {
    var result;

    try {
        result = JSON.parse(str);
    } catch (e) {
        return null;
    }

    return result;
}

function stringify(obj) {
    var result = obj;

    if (_.isObject(obj)) {
        result = JSON.stringify(obj);
    }

    return result;
}

exports.loadJson = loadJson;
exports.getValueFromJson = getValueFromJson;
exports.parse = parse;
exports.stringify = stringify;
