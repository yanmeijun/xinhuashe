$(function () {
    $("#getCode").click(function () {
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
            $("#getCode").attr("src", data);
        })
    });
    $("#getCode").click();
    $("#loginSubmit").click(function () {
        if (!$("#mobile").val()) {
            masktime("请输入手机号码！")
            return;
        } else if (!$("#password").val()) {
            masktime("请输入密码！")
            return;
        } else if (!$("#code").val()) {
            masktime("请输入验证码！")
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
            password: $("#password").val(),
            code: $("#code").val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/login',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                if (data.responseBody.data == "success") {
                    if (comeFrom == "register") {
                        comeFrom = "sDHospital"
                    }
                    window.location.href = "/sDHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y
                } else if (data.responseBody.data == "password") {
                    masktime("用户名或密码错误！");
                    return;
                } else if (data.responseBody.data == "code") {
                    masktime("验证码错误！");
                    return;
                } else {
                    masktime("登录失败！");
                    return;
                }
            } else {
                masktime("登录失败！");
                return;
            }
        })
    });
    function masktime(mgs) {
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
    $("#back").click(function () {
        window.location.href = "/sDHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
});
function renderTo(pageName) {
    window.location.href = "/sDHospital?page=" + pageName + "&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
}