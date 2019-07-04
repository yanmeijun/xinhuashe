var citySelectName = sessionStorage.getItem("cityName");
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
                $("#veriCodeImg").attr('src', res);
            },
            error: function () {
                maskTip("验证码获取失败");
                return;
            }
        })
    });
    $("#veriCodeImg").trigger("click");

    //点击登陆按钮
    $("#loginBtn").on("click", function () {
        var username = $("#username").val();
        var pass = $("#pass").val();
        var validate = $("#veri").val();
        if (username.trim() == "") {
            maskTip("请输入手机号");
            return;
        } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(username))) {
            maskTip("请输入正确的手机号");
            return;
        }
        ;
        if (pass.trim() == "") {
            maskTip("请输入密码");
            return;
        }
        if (validate.trim() == "") {
            maskTip("请输入验证码");
            return;
        }
        var parameters = {
            phone: username.trim(),
            userpwd: pass.trim(),
            validatecode: validate.trim(),
            fromurl: "",
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            url: "/sXHospital/login",
            type: "post",
            data: JSON.stringify(parameters),
            contentType: 'application/json',
            success: function (res) {
                if (res.retCode == "000000") {
                    var url = "/sXHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    window.location.href = url;
                } else {
                    if (res.responseBody.data) {
                        maskTip(res.responseBody.data);
                        return;
                    } else {
                        maskTip(res.responseBody.errorMsg);
                        return;
                    }
                }
            },
            error: function () {
                alert("网络异常fail");
            }
        })
    });
    //点击注册按钮
    $("#toRegister").on("click", function () {
        var url = "/sXHospital?page=register&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
        window.location.href = url;
    });
})
function back() {
    var url = "/sXHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmenSelect";
    window.location.href = url;
}

$('#forgetPwd').on("click", function () {
    var url = "/sXHospital?page=forgetPwd&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
});


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
