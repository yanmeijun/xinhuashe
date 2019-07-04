$(function () {
    $("#next").click(function () {
        if (!$("#userName").val().trim()) {
            masktime("请输入用户名")
            return;
        } else if (!$("#password").val().trim()) {
            masktime("请输入密码")
            return;
        } else if (!$("#rePassword").val().trim()) {
            masktime("请再次输入密码")
            return;
        } else if ($("#password").val().trim() != $("#rePassword").val().trim()) {
            masktime("两次输入密码不一致")
            return;
        }
        $("#step1").hide();
        $("#step2").show();
    });
    $("#showStep1").click(function () {
        $("#step1").show();
        $("#step2").hide();
    })
    $("#getCode").click(function () {
        if (!$("#userName").val().trim()) {
            masktime("请输入用户名")
            return;
        } else if (!$("#password").val().trim()) {
            masktime("请输入密码")
            return;
        } else if (!$("#rePassword").val().trim()) {
            masktime("请再次输入密码")
            return;
        } else if ($("#password").val().trim() != $("#rePassword").val().trim()) {
            masktime("两次输入密码不一致")
            return;
        } else if (!$("#name").val().trim()) {
            masktime("请输入真实姓名")
            return;
        } else if (!$("#idCard").val().trim()) {
            masktime("请输入身份证号码")
            return;
        } else if (!$("#mobile").val().trim()) {
            masktime("请输入手机号")
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            phone: $("#mobile").val().trim(),
            type: "0"
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/getPhoneCode',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                if (JSON.parse(JSON.parse(data.responseBody.data)).resultCode == "success") {
                    masktime("验证码发送成功");
                    return;
                } else {
                    masktime(JSON.parse(JSON.parse(data.responseBody.data)).resultMsg || "验证码发送失败");
                    return;
                }
            } else {
                masktime("验证码发送失败");
                return;
            }
        })
    });
    $("#submit").click(function () {
        if (!$("#userName").val().trim()) {
            masktime("请输入用户名")
            return;
        } else if (!$("#password").val().trim()) {
            masktime("请输入密码")
            return;
        } else if (!$("#rePassword").val().trim()) {
            masktime("请再次输入密码")
            return;
        } else if ($("#password").val().trim() != $("#rePassword").val().trim()) {
            masktime("两次输入密码不一致")
            return;
        } else if (!$("#name").val().trim()) {
            masktime("请输入真实姓名")
            return;
        } else if (!$("#idCard").val().trim()) {
            masktime("请输入身份证号码")
            return;
        } else if (!$("#mobile").val().trim()) {
            masktime("请输入手机号")
            return;
        } else if (!$("#code").val().trim()) {
            masktime("请输入短信验证码")
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            userName: $("#userName").val().trim(),
            phone: $("#mobile").val().trim(),
            password: $("#password").val().trim(),
            validateCode: $("#code").val().trim(),
            realName: $("#name").val().trim(),
            identityNO: $("#idCard").val().trim(),
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/register',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                if (JSON.parse(JSON.parse(data.responseBody.data)).resultCode == "success") {
                    masktime("注册成功");
                    window.location.href = "/jxHospital?page=login&cityID=" + cityID + "&localFrom=" + localFrom;
                } else {
                    masktime(JSON.parse(JSON.parse(data.responseBody.data)).resultMsg || "注册失败");
                    return;
                }
            } else {
                masktime("注册失败");
                return;
            }
        })
    });
    $(document).on("touchstart", "[id^='back']", function () {
        window.location.href = "/jxHospital?page=login&cityID=" + cityID + "&localFrom=" + localFrom;
    })
    function masktime(mgs) {
        $('#masktime').html(mgs);
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
})
