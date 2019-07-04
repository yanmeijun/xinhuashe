$(function () {
});
// 返回按钮
$('#back').on('click', function () {
    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
});


$('#modifyPwd').on("click", function () {
    var cardId = $('#card').val();
    var password = $("#password").val();//请输入登录密码
    var aginPassword = $("#aginPassword").val();//请再次输入登录密码
    var message = $("#message").val();
    var phone = $("#phone").val();//手机号码注册
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
    //请输入登录密码
    if (password.trim() == "") {
        maskTip("请输入密码");
        return;
    } else if (password.indexOf(" ") != -1) {
        maskTip("中间不能有空格");
        return;
    }
    ;
    //请再次输入登录密码
    if (aginPassword == "") {
        maskTip("请再次输入密码");
        return;
    } else if (aginPassword.indexOf(" ") != -1) {
        maskTip("中间不能有空格");
        return;
    }
    ;
    /*
     *登录密码和再次输入登录密码
     */
    if (password != aginPassword) {
        maskTip("两次密码输入不一致");
        return;
    }
    ;
    //330821199908129385
    correctCode(cardId, message, phone, aginPassword);//确认修改密码

});
function correctCode(cardId, message, phone, aginPassword) {
    var data = setSendMessageRequest(phone, "", "", "", "", "", "", "", "RETVE_PWD_VCODE", 2, "", "", "", message);
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
                    comfirmModfiyPwd(cardId, message, phone, aginPassword)
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
// 确认修改密码
function comfirmModfiyPwd(cardId, message, phone, aginPassword) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        memCard: cardId,
        vCode: message,
        memTel: phone
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/retrievePassword",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    confirmModifyPassword(cardId, message, phone, aginPassword);
                } else {
                    maskTip("身份证号与电话不匹配");
                    return;
                }
            } else {
                maskTip("请求异常");
                return;
            }
        },
        error: function () {

        }
    })
};
function confirmModifyPassword(cardId, message, phone, aginPassword) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        memCard: cardId,
        newPwd: md5(aginPassword),
        memTel: phone
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/confirmModifyPassword",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            console.log(data)
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    window.location.href = url;
                } else {
                    maskTip("身份证号与电话不匹配");
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
};
var wait = 60;
//点击短信验证
$("#getCode").click(function () {
    //$('#message').val();
    var cardId = $('#card').val();
    var phone = $("#phone").val();//手机号码注册
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
    var data = setSendMessageRequest(phone.trim(), "", "", "", "", "", "", "", "RETVE_PWD_VCODE", 1, "", "", "");
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=forgetPwd";
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=forgetPwd";
                    window.location.href = url;
                    return;
                }
            }
        },
        error: function () {

        }
    });
});

