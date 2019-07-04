var sendMessage = {
    parentMobile: "",
    patientName: "",
    hosName: "",
    deptName: "",
    docName: "",
    regDateDate: "",
    timeValues: "",
    orderNo: "",
    busType: "",
    cancelYzm: "",
    timeFlag: "",
    hosOrderNo: "",
    patientId: "",
    vCode: "",
    Timestamp: ""
};
/*请求参数封装*/
function setSendMessageRequest(parentMobile, patientName, hosName, deptName, docName, regDateDate, timeValues, orderNo, busType, cancelYzm, timeFlag, hosOrderNo, patientId, vCode) {
    sendMessage.parentMobile = parentMobile;
    sendMessage.patientName = patientName;
    sendMessage.hosName = hosName;
    sendMessage.deptName = deptName;
    sendMessage.docName = docName;
    sendMessage.regDateDate = regDateDate;
    sendMessage.timeValues = timeValues;
    sendMessage.orderNo = orderNo;
    sendMessage.busType = busType;
    sendMessage.cancelYzm = cancelYzm;
    sendMessage.timeFlag = timeFlag;
    sendMessage.hosOrderNo = hosOrderNo;
    sendMessage.patientId = patientId;
    sendMessage.vCode = vCode;
    sendMessage.Timestamp = new Date().getTime();
    return sendMessage;
};
/*短信验证码*/
function sendMessageAjax(encodeData) {
    var returnValue = "1";
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        data: encodeData
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/messageCode",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.code == "0") {
                    returnValue = "0";
                }
            } else {
                maskTip("短信发送失败！");
                return;
            }
        },
        error: function () {

        }
    })
    return returnValue;
};
function getYZm() {
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var str = '';
    for (var i = 0; i < 6; i++) {
        str += '' + arr[Math.floor(Math.random() * arr.length)];
    }
    return str;
};

//根据身份证获取出生日期
function getBirthday(userCard) {
    return userCard.substring(6, 10) + "-" + userCard.substring(10, 12) + "-" + userCard.substring(12, 14);
}
//根据身份证获取性别
function getSex(userCard) {
    if (parseInt(userCard.substr(16, 1)) % 2 == 1) {
        return "1";
    } else {
        return "2";
    }
}
//js 验证身份证格式
function validateIdCard(idCard) {
    //15位和18位身份证号码的正则表达式
    // var regIdCard = /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X|x])$)/;
    var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }
            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                    //alert("恭喜通过验证啦！");

                } else {
                    return false;
                    //maskTip("身份证号码错误！");
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    //alert("恭喜通过验证啦！");
                    return true;
                } else {
                    //maskTip("身份证号码错误！");
                    return false;

                }
            }
        } else {
            //maskTip("身份证号码错误！");
            return false;
        }
    } else {
        //alert("身份证格式不正确!");
        //maskTip("身份证号码错误！");
        return false;
    }
};