var citySelectName = sessionStorage.getItem("cityName");
var wait = 60;
function time(but) {
    if (wait == 0) {
        $(but).removeAttr("disabled").removeClass("ccc");
        $(but).text("获取校验码");
        wait = 60;
    } else {
        $(but).attr("disabled", true).addClass("ccc");
        $(but).text("重新发送(" + wait + ")");
        wait--;
        setTimeout(function () {
            time(but);
        }, 1000);
    }
};
//获取手机验证码
$("#getCode").on("click", function () {
    if (wait != 60) {
        return;
    }
    var phone = $("#phone").val();
    var veriCode = $("#veri").val();
    if (phone.trim() == "") {
        maskTip("请输入手机号");
        return;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(phone))) {
        maskTip("请输入正确的手机号");
        return;
    }
    ;
    if (veriCode.trim() == "") {
        maskTip("请输入图片验证码");
        return;
    }
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        phone: phone.trim(),
        validatecode: veriCode.trim(),
        next: "下一步"
    };
    $.ajax({
        async: true,
        url: "/sXHospital/forgetPassword",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if (res.retCode == "000000") {
                getCode(phone)
            } else {
                maskTip(res.responseBody.errorMsg);
                return;
            }
        },
        error: function () {
            maskTip("短信验证码获取失败");
            return;
        }
    })
})

function getCode(phone) {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        phone: phone,
        next: "获取短信验证码"
    };
    $.ajax({
        async: true,
        url: "/sXHospital/getMessage",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            console.log(res);
            if (res.retCode == "000000") {
                maskTip(res.responseBody.lists);
                $(this).addClass("ccc");
                time($("#getCode"));
                return;
            } else {
                maskTip(res.responseBody.errorMsg);
            }
        },
        error: function () {
            maskTip("短信验证码获取失败");
            return;
        }
    })
};
$('#forgetPas').on("click", function () {
    var password = $('#password').val().trim();
    var aginPassword = $('#newpassword').val().trim();
    var phone = $("#phone").val();
    var veriCode = $("#veri").val();
    var code = $('#code').val();
    var newReg = /(?!(\d+|[a-zA-Z]+|[~!@#$-%^,+_，.&*?]+)$)^[\w~!@#$-%^,+_，.&*?]{6,14}$/;
    if (phone.trim() == "") {
        maskTip("请输入手机号");
        return;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(phone))) {
        maskTip("请输入正确的手机号");
        return;
    }
    ;
    if (veriCode.trim() == "") {
        maskTip("请输入图片验证码");
        return;
    }
    if (code.trim() == "") {
        maskTip("请输入短信验证码");
        return;
    }
    //请输入登录密码
    if (password.trim() == "") {
        maskTip("请输入登录密码");
        return;
    } else if (password.indexOf(" ") != -1) {
        maskTip("中间不能有空格");
        return;
    }
    ;
    if (!newReg.exec(password) || password.trim().length > 14 || password.trim().length < 6) {
        maskTip("密码长度6-14位，建议数字、字母、符号组成");
        $('#masktime').css({"line-height": "20px", "padding-top": "4px"});
        return;
    } else {
        $('#masktime').css({"line-height": "50px", "padding-top": "0"});
    }
    //请再次输入登录密码
    if (aginPassword == "") {
        maskTip("请再次输入登录密码");
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
        maskTip("登录密码不一致");
        return;
    }
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        phone: phone.trim(),
        validatecode: $("#veri").val().trim(),
        next: "下一步",
        code: $('#code').val(),
        userpwd: $('#password').val().trim(),
        userpwd_r: $('#newpassword').val().trim()
    };
    $.ajax({
        async: true,
        url: "/sXHospital/getPassword",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if (res.retCode == "000000") {
                maskTip(res.responseBody.lists);
                var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                window.location.href = url;
                return;
            } else {
                maskTip(res.responseBody.errorMsg);
            }
        },
        error: function () {
            maskTip("网络异常，请稍后");
            return;
        }
    })
});


$(function () {
    if (citySelectName) {
        $('#cityName').html(citySelectName);
    } else {
        $('#cityName').html(cityName);
    }
    //获取验证码
    var velidate, commitStatus = true;
    $("#veriCodeImg").on("click", function (event) {
        var parameters = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            Round: Math.random()
        };
        $.ajax({
            async: true,
            url: "/sXHospital/Verification",
            type: "post",
            data: JSON.stringify(parameters),
            contentType: 'application/json',
            success: function (res) {
                console.log(res)
                $("#veriCodeImg").attr('src', res);
            },
            error: function () {
                maskTip("验证码获取失败");
                return;
            }
        })
    });
    $("#veriCodeImg").trigger("click");
})
$('#back').on("click", function () {
    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
})

$('#userAvatarBox').on("click", function () {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        type: "post",
        url: "/sXHospital/record",
        async: true,
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var url = "/sXHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                window.location.href = url;//跳转到对应的页面
            } else {
                if (data.responseBody.errorCode == "110003") {
                    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    window.location.href = url;//跳转到对应的页面
                    return;
                } else {
                    maskTip(data.responseBody.errorMsg);
                }
            }
        },
        error: function () {

        }
    })
})