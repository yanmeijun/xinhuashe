$(function () {
    $("#toStep1").click(function () {
        $("#step1").show()
        $("#step2").hide()
    })
    $("#toStep2").click(function () {
        if (!$("#mobile").val()) {
            masktime("请输入手机号码！");
            return;
        } else if (!$("#code").val()) {
            masktime("请输入验证码！");
            return;
        } else if (!$("#password").val()) {
            masktime("请输入新密码！");
            return;
        } else if (!$("#conformPassword").val()) {
            masktime("请再次输入新密码！");
            return;
        } else if ($("#password").val() != $("#conformPassword").val()) {
            masktime("两次输入的密码不一致！");
            return;
        } else if (!$("#agreeSelect").attr("class")) {
            masktime("请阅读用户注册协议并打钩！");
            return;
        } else if(!$('#codes').val()){
            masktime("请输入验证码！");
            return;
        }
        else {
            $("#step1").hide()
            $("#step2").show()
        }
    })
    $("#getCode").click(function () {
        if (!$("#mobile").val()) {
            masktime("请输入手机号码！");
            return;
        }
        if(!$('#codes').val()){
            masktime("请输入验证码！");
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            mobile: $("#mobile").val(),
            imgCode: $('#codes').val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/getRegisterCode',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                if (data.responseBody.success == true) {
                    masktime("获取短信验证码成功！");
                } else {
                    masktime(data.responseBody.message || "获取短信验证码失败！");
                }
            } else {
                masktime("获取短信验证码失败！");
            }
        })
    });
    $("#submit").click(function () {
        if (!$("#mobile").val()) {
            masktime("请输入手机号码！");
            return;
        } else if (!$("#code").val()) {
            masktime("请输入验证码！");
            return;
        } else if (!$("#password").val()) {
            masktime("请输入新密码！");
            return;
        } else if (!$("#conformPassword").val()) {
            masktime("请再次输入新密码！");
            return;
        } else if ($("#password").val() != $("#conformPassword").val()) {
            masktime("两次输入的密码不一致！");
            return;
        } else if (!$("#agreeSelect").attr("class")) {
            masktime("请阅读用户注册协议并打钩！");
            return;
        } else if (!$("#realName").val()) {
            masktime("请输入真实姓名！");
            return;
        } else if (!$("#idCard").val()) {
            masktime("请输入身份证号码！");
            return;
        } else if (!$("#conformIdCard").val()) {
            masktime("请输入确认证件号码！");
            return;
        } else if ($("#idCard").val() != $("#conformIdCard").val()) {
            masktime("两次输入的证件号码不一致！");
            return;
        } else if (!$("#email").val()) {
            masktime("请输入常用邮箱！");
            return;
        } else if (!$('#codes').val()) {
            masktime("请输入图片验证码");
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,
            localFrom:localFrom,
            local_y: local_y,
            mobile: $("#mobile").val(),
            code: $("#code").val(),
            sMSCode: $("#code").val(),
            password: $("#password").val(),
            conformPassword: $("#conformPassword").val(),
            realName: $("#realName").val(),
            idCard: $("#idCard").val(),
            conformIdCard: $("#conformIdCard").val(),
            email: $("#email").val(),
            imgCode: $('#codes').val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/register',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                if (data.responseBody.success == true) {
                    masktime("注册成功！");
                    window.location.href = "/sDHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                } else {
                    masktime(data.responseBody.message || "注册失败！");
                }
            } else {
                masktime("注册失败！");
            }
        })
    });
    function masktime(mgs) {
        $('#masktime').html(mgs);
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
    $("#back,#toLogin").click(function () {
        window.location.href = "/sDHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });


    $("#getCodes").click(function () {
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
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/getPicCode',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            $("#getCodes").attr("src", data);
        })
    });
    $("#getCodes").click();
})