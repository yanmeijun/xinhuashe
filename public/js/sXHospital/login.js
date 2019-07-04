$(function () {
    $("#veriCodeImg").trigger("click");
});
// 返回按钮
$('#back').on('click', function () {
    var url = "/shanxiHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
});


$('#veriCodeImg').on("click", function () {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/pictureCode",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            $("#veriCodeImg").attr('src', res);
            return;
        },
        error: function () {
            maskTip("请求异常！");
            return;
        }
    })
});

$('#login').on('click', function () {
    var user = $('#user').val();
    var password = $('#password').val();
    var Verification = $('#Verification').val();
    if (!user) {
        maskTip("请输入手机号");
        return;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(user))) {
        maskTip("请输入正确的手机号");
        return;
    }
    ;
    if (!password) {
        maskTip("请输入密码");
        return;
    }
    if (!Verification) {
        maskTip("请输入图片验证");
        return;
    }
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        loginId: user,
        password: md5(password),
        _password: password,
        validCode: Verification,
        isRemember: true
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/login",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            if (res.retCode == "000000") {
                if (res.responseBody.returnCode == "SUCCESS") {
                    sessionStorage.setItem("accountId", res.responseBody.fullData.accountId);
                    var url = "/shanxiHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    window.location.href = url;
                } else {
                    maskTip(res.responseBody.returnMsg);
                    $("#veriCodeImg").trigger("click");
                    return;
                }
            } else {
                maskTip("网络异常，请刷新");
                return;
            }
        },
        error: function () {
            maskTip("网络异常，请刷新");
            return;
        }
    })
});

$('#forgetPwd').on("click", function () {
    var url = "/shanxiHospital?page=forgetPwd&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
});
$('#register').on("click", function () {
    var url = "/shanxiHospital?page=register&randomKey=" + randomKey + "&userID=" + userID +
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
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    window.location.href = url;
                    return;
                }
            }
        },
        error: function () {

        }
    });
});
