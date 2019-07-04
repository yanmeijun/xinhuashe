$(function () {
    $("#getCode").click(function () {
        if (!$("#mobile").val()) {
            masktime("请输入手机号码！");
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            mobile: $("#mobile").val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/getResetPassCode',
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
        } else if (!$("#newPassword").val()) {
            masktime("请输入新密码！");
            return;
        } else if (!$("#confirmPassword").val()) {
            masktime("请再次输入新密码！");
            return;
        } else if ($("#newPassword").val() != $("#confirmPassword").val()) {
            masktime("两次输入的密码不一致！");
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
            code: $("#code").val(),
            newPassword: $("#newPassword").val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/resetPassword',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                if (data.responseBody.success == true) {
                    masktime("修改密码成功！");
                    window.location.href = "/sDHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom 
                        +  "&local_y=" + local_y
                } else {
                    masktime(data.responseBody.message || "修改密码失败！");
                }
            } else {
                masktime("修改密码失败！");
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
    $("#back").click(function () {
        window.location.href = "/sDHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
})