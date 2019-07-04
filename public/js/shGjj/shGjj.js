$(function () {

    if (cityName) {
        $("#sameName_address").text(cityName)
    }
    //如何获取账号密码弹框
    $("#getAccount").on("click", function () {
        $(".mask").show();
        $("#dialog-getAccount").show();
    })
    $(".mask,#btn-close,#img-close").on("click", function () {
        $(".mask").hide();
        $("#dialog-getAccount").hide();
    })
    if (localFrom == "xinhuashe_app" && USERNAME && PASSWORD) {
        document.getElementById('userName').value = USERNAME || sessionStorage.getItem('shGjj_USERNAME');
        document.getElementById('password').value = PASSWORD || sessionStorage.getItem('shGjj_PASSWORD');
        $("#loadMask,#mainTips").show();
    }
    //点击验证码
    $("#veriCodeImg").on("click", function (event) {
        $("#veriCodeImg").attr("src", "/images/yanzm.gif");
        $('#dialogMask,#dialog').show();
        const data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            url: "/shangHaiFund/verification",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (res) {
                $('#dialogMask,#dialog').hide();
                $("#veriCodeImg").attr("src", res.data);
                if (res.code && localFrom == "xinhuashe_app" && USERNAME && PASSWORD) {
                    $("#verifyCode").val(res.code);
                    $("#login").click();
                }
            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        })
        event.preventDefault();
    });
    $("#veriCodeImg").click();
    //用户登录
    var veliNum = 0;
    $("#login").on("click", function () {
        var verifyCode = $("#verifyCode").val();
        var userName = $("#userName").val();
        var password = $("#password").val();
        if (userName.trim() == "") {
            masktime("用户名不能为空");
            return;
        }
        if (password.trim() == "") {
            masktime("密码不能为空");
            return;
        }
        if (verifyCode.trim() == "") {
            masktime("验证码不能为空");
            return;
        }
        if (verifyCode.length > 4 || verifyCode.length < 4) {
            masktime("验证码为4位数字");
            return;
        }
        var jsonObj = {
            "username": userName,
            "password": password,
            "imagecode": verifyCode,
            "ID": 0,
            "randomKey": randomKey,
            "userID": userID,
            "clientID": clientID,
            "cityID": cityID,
            "local_x": local_x,
            "local_y": local_y
        };
        $.ajax({
            async: false,
            type: "POST",
            url: "/shangHaiFund/login",
            dataType: "json",
            data: JSON.stringify(jsonObj),
            contentType: "application/json",
        }).done(function (response) {
            //console.log(response)
            if (response.retCode == "000000") {
                localStorage.setItem('data', JSON.stringify(response.responseBody.data));
                window.location = "/shangHaiFund?page=accountDetails&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            } else {//登陆失败
                masktime(response.responseBody.errorMsg);
                // $("#userName").val("");
                // $("#password").val("");
                // $("#verifyCode").val("");
            }

        })

    })
    //提示
    function masktime(mgs) {
        $("#loadMask,#mainTips").hide();
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };

})