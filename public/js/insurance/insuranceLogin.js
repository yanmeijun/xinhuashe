$(function () {
    $("div[id^='tab-content-']").hide();
    $("#shebao_image").on("click", function () {
        $("#shebao_image").attr("src", "/images/yanzm.gif");
        $('#dialogMask,#dialog').show();
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
            url: '/insurance/getVeryCode',
            contentType: 'application/json'
        }).done(function (data) {
            $('#dialogMask,#dialog').hide();
            $("#shebao_image").attr("src", data.data);
            if (data.code && localFrom == "xinhuashe_app" && USERNAME && PASSWORD) {
                $("#validcod").val(data.code);
            }
        });
    });
    $(document).on("touchstart", "img[id^='tab-tit-']", function () {
        var id = $(this).attr("id").replace("tab-tit-", "");
        $("#tab-content-" + id).toggle(100)
    })
    $("#shebao_image").click();

    $("#getCode").click(function () {
        if (!$("#cardno").val()) {
            masktime("请输入身份证号！");
            return;
        } else if (!$("#password").val()) {
            masktime("请输入密码！");
            return;
        } else if (!$("#validcod").val()) {
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
            cardno: $("#cardno").val(),
            password: $("#password").val(),
            validcod: $("#validcod").val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/insurance/getPhoneCode',
            contentType: 'application/json'
        }).done(function (body) {
            if (body.retCode == '000000' && body.responseBody.data.indexOf("1") > -1) {
                $("#mask").show();
                $("#tips_text").text("短信已发送到您手机上，如果1分钟内没有收到短信验证码，请点击按钮重新获取，此服务免费。");
                $("#tips").show();
                setTimeout(function(){
                    $("#mask").hide();
                    $("#tips").hide();
                },7000)
                time($("#getCode"));
            } else {
                $("#mask").show();
                $("#tips_text").text(JSON.parse(body.responseBody.data).split("-")[1] || "短信发送失败");
                $("#tips").show();
                setTimeout(function(){
                    $("#mask").hide();
                    $("#tips").hide();
                },2000)

            }
        });
    });
    $("#iKnow").click(function () {
        $("#mask").hide();
        $("#tips").hide();
    });
    $("#login").click(function () {
        if (!$("#cardno").val()) {
            masktime("请输入身份证号！");
            return;
        } else if (!$("#password").val()) {
            masktime("请输入密码！");
            return;
        } else if (!$("#validcod").val()) {
            masktime("请输入验证码！");
            return;
        } else if (!$("#i_phone").val()) {
            masktime("请输入短信验证码！");
            return;
        }
        ;
        $('#dialogMask,#dialog').show();
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            cardno: $("#cardno").val(),
            password: $("#password").val(),
            validcod: $("#validcod").val(),
            i_phone: $("#i_phone").val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/insurance/login',
            contentType: 'application/json'
        }).done(function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == '000000') {
                if (data.responseBody.data.indexOf("index2") > -1) {
                    window.location.href = "/insurance?page=insuranceList&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                    // window.location.href = "/insuranceList"
                } else {
                    masktime("短信验证码错误");
                    return;
                }
            } else {
                masktime(data.rtnMsg || "登录失败");
                return;
            }

        });
    });
    $("#chaxun").click(function () {
        // window.location.href = "/userInfor?randomKey="+randomKey
        window.location.href = "/insurance?page=userInfor&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    $("#perPayInfo").click(function () {
        window.location.href = "/insurance?page=insurancePayment&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    $("#ylbxdySel").click(function () {
        window.location.href = "/insurance?page=insuranceMedical&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    $(".icon-return").click(function () {
        window.location.href = "/insurance?page=insuranceList&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    $("#insuranceList_back").click(function () {
        window.location.href = "/insurance?page=insuranceLogin&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    var wait = 60;

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
    }

    function masktime(mgs) {
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
})
