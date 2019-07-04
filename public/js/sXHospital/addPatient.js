$(function () {

});
var accountId = sessionStorage.getItem("accountId");
/*返回按钮*/
$('#back').on('click', function () {
    var url = "/shanxiHospital?page=registeredConfirm&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
});
$('#addBtn').on('click', function () {
    var user = $('#user').val();
    var card = $('#card').val();
    var address = $('#address').val();
    var tel = $('#tel').val();
    //请填写真实姓名
    var regName = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/
    if (!user) {
        maskTip("请填写真实姓名");
        return;
    } else if (!regName.test(user)) {
        maskTip("真实姓名有误");
        return;
    }
    ;
    if (!card) {
        maskTip("请填写身份证号");
        return;
    } else if (card.indexOf(" ") != -1) {
        maskTip("身份证号有空格");
        return;
    } else if (/[\u4E00-\u9FA5]/i.test(card)) {
        maskTip("身份证号有中文");
        return;
    }
    ;
    if (!validateIdCard(card)) {
        maskTip("身份证号有误");
        return;
    }
    if (!tel) {
        maskTip("请输入联系电话");
        return;
    } else if (!/^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test(tel)) {
        maskTip("请输入正确的手机号");
        return;
    }

    if (!address) {
        maskTip("请输入常用地址");
        return;
    }
    patientInformation("/shanxiHospital/addPatient", user, card, tel, address);
});
function patientInformation(apiUrl, user, card, tel, address) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        uName: user,
        idType: "1",//身份证类型
        uSex: getSex(card),//性别 1 代表 男 2 代表 女
        birthday: getBirthday(card),
        idCode: card,//身份证
        mobile: tel,
        address: address,
        mUserType: "2",
        accountId: accountId,//本人信息
        muserId: ""
    };
    $.ajax({
        async: true,
        url: apiUrl,
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    sessionStorage.setItem("patientMuserId", data.responseBody.fullData.accountId);
                    var url = "/shanxiHospital?page=registeredConfirm&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=addPatient";
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=addPatient";
                    window.location.href = url;
                    return;
                } else {
                    maskTip(data.responseBody.returnMsg);
                    return;
                }
            } else {
                maskTip(data.responseBody.data);
                return;
            }
        },
        error: function () {

        }
    })
}


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

/*点击个人中心查看订单详情*/
$('#personalCenter').on("click", function () {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        docCode: "6580",
        deptCode: "2783",
        hospCode: "61010009",
        regDateDate: "2018-10-16",
        isTime: "1",
        regLevel: "1",
        timeFlag: "2",
        regFee: "0",
        cliFee: "0",
        totalFee: "0",
        startTime: "14:30",
        endTime: "15:00",
        accountId: "",
        muserId: ""
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/patientInfo",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == 'SUCCESS') {
                    var url = "/shanxiHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=addPatient";
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=addPatient";
                    window.location.href = url;
                    return;
                }
            }
        },
        error: function () {

        }
    });
});