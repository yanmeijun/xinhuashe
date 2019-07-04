$(function () {

});
// 返回按钮
$('#back').on('click', function () {
    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
});

var wait = 60;
//点击短信验证
$("#getCode").click(function () {
    var user = $('#user').val();
    var cardId = $('#card').val();
    var phone = $("#tel").val();//手机号码注册
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
    if (!cardId) {
        maskTip("请填写身份证号");
        return;
    } else if (cardId.indexOf(" ") != -1) {
        maskTip("身份证号有空格");
        return;
    } else if (/[\u4E00-\u9FA5]/i.test(cardId)) {
        maskTip("身份证号有中文");
        return;
    }
    ;
    if (!validateIdCard(cardId)) {
        maskTip("身份证号有误");
        return;
    }
    ;
    if (phone.trim() == "") {
        maskTip("请输入手机号");
        return;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(phone))) {
        maskTip("请输入正确的手机号");
        return;
    }
    ;
    //setSendMessageRequest(phone, "", "", "", "", "", "", "", "RETVE_PWD_VCODE", 1, "", "", "");
    var data = setSendMessageRequest(phone.trim(), "", "", "", "", "", "", "", "REG_USER_VCODE", 1, "", "", "");
    var dataToJson = JSON.stringify(data);
    $.base64.utf8encode = true;
    var encodeData = $.base64.btoa(dataToJson, true);
    if (wait == 60) {
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
                        $("#mask").show();
                        $("#tips_text").html("短信已发送到您手机上，如果1分钟内没有收到短信验证码，请点击按钮重新获取，此服务免费。");
                        $("#tips").show();
                        time($("#getCode"));
                    }
                } else {
                    $("#mask").show();
                    $("#tips_text").html("短信发送失败！");
                    $("#tips").show();
                }
            },
            error: function () {

            }
        })
    }

});
//取消提示信息
$('#iKnow').on("click", function () {
    $("#tips").hide();
    $("#mask").hide();
})
//提示信息
function time(but) {
    if (wait == 0) {
        $(but).removeAttr("disabled").removeClass("get_code_wait").addClass("get-code");
        $(but).text("获取校验码");
        wait = 60;
    } else {
        $(but).attr("disabled", true).removeClass("get-code").addClass("get_code_wait");
        $(but).text("重新发送(" + wait + ")");
        wait--;
        setTimeout(function () {
            time(but);
        }, 1000);
    }
};
$('#regBtn').on('click', function () {
    var user = $('#user').val();
    var cardId = $('#card').val();
    var phone = $("#tel").val();//手机号码注册
    var message = $("#message").val();
    var password = $("#password").val();//请输入登录密码
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
    if (!cardId) {
        maskTip("请填写身份证号");
        return;
    } else if (cardId.indexOf(" ") != -1) {
        maskTip("身份证号有空格");
        return;
    } else if (/[\u4E00-\u9FA5]/i.test(cardId)) {
        maskTip("身份证号有中文");
        return;
    }
    ;
    if (!validateIdCard(cardId)) {
        maskTip("身份证号有误");
        return;
    }
    ;
    if (phone.trim() == "") {
        maskTip("请输入手机号");
        return;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(phone))) {
        maskTip("请输入正确的手机号");
        return;
    }
    ;
    if (!message) {
        maskTip("请输入短信验证码");
        return;
    }
    ;
    //请输入登录密码
    if (password.trim() == "") {
        maskTip("请输入密码");
        return;
    } else if (password.indexOf(" ") != -1) {
        maskTip("中间不能有空格");
        return;
    }
    ;
    correctCode(user, cardId, phone, message, password);
});
// 判断注册短信验证码是否正确
function correctCode(user, cardId, phone, message, password) {
    var data = setSendMessageRequest(phone.trim(), "", "", "", "", "", "", "", "REG_USER_VCODE", 2, "", "", "", message);
    var dataToJson = JSON.stringify(data);
    $.base64.utf8encode = true;
    var encodeData = $.base64.btoa(dataToJson, true);
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
                    confirmRegister(user, cardId, phone, message, password);
                } else {
                    maskTip(data.responseBody.message);
                    return;
                }
            } else {
                maskTip("请求异常，请稍后");
                return;
            }
        },
        error: function () {

        }
    })
};
function confirmRegister(user, cardId, phone, message, password) {
    var data = setSendMessageRequest(phone.trim(), "", "", "", "", "", "", "", "REG_USER_VCODE", 2, "", "", "", message);
    var dataToJson = JSON.stringify(data);
    $.base64.utf8encode = true;
    var encodeData = $.base64.btoa(dataToJson, true);
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        data: encodeData,
        telNum: phone,
        loginId: cardId,
        mobileImgCode: message,
        password: md5(password),//密码前台md5加密
        realName: user
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/register",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    window.location.href = url;
                } else {
                    maskTip(data.responseBody.returnMsg);
                    return;
                }
                ;
            } else {

            }
        },
        error: function () {

        }
    });
}


$('#backRegister').on('click', function () {
    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
});
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    ;
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    ;
                    window.location.href = url;
                    return;
                }
            }
        },
        error: function () {

        }
    });
});