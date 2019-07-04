//点击举报
$("#report").on("click", function (event) {
    var reportPhone = $("#reportPhone").val();//举报的号码
    var phone = $("#phone").val() //请输入您的手机号码
    var verification = $('#verification').val() //验证码
    var messageCode = $('#messageCode').val();//短信验证码
    if (reportPhone == '') {
        $('#masktime').html("请输入举报的号码")
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    }
    if (verification == '') {
        $('#masktime').html("请输入验证码")
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    } else if (verification.indexOf(" ") != -1) {
        //去除字符算中的空格
        verification = verification.replace(/\s/g, "");
    }

    if (phone == '') {
        $('#masktime').html("请输入11位数字的手机号码")
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(phone))) {
        $('#masktime').html("请输入正确的号码格式")
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    }
    if (messageCode == "") {
        $('#masktime').html("短信验证码")
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    }

    if ($('#content').val() == '') {
        $('#masktime').html("短信内容不能为空")
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    }
    var content = $('#content').val();
    if (content.indexOf(" ") != -1) {
        //去除字符算中的空格
        content = content.replace(/\s/g, "");
    }
    ;
    $('#dialogMask,#dialog').show();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x, localFrom: localFrom,
        local_y: local_y,
        code: verification,
        content: content,
        phone: $("#phone").val(),
        smsphone: $("#reportPhone").val(),
        phonecode: $("#messageCode").val()
    }
    $.ajax({
        async: true,
        type: 'post',
        data: JSON.stringify(data),
        url: '/unhealthy/subMessage',
        contentType: 'application/json'
    }).done(function (data) {
        $('#dialogMask,#dialog').hide();
        if (data.retCode == "000000") {
            if (data.responseBody.data == "1") {
                $("#tips_text").html("举报短信成功")
                $("#tips").show();
                $('#mask').show();
                return;
            } else {
                $("#tips_text").html("请求异常，请稍后")
                $("#tips").show();
                $('#mask').show();
                return;
            }
        } else {
            $("#tips_text").html(" ");
            $('#mask').hide();
            $("#tips").hide();
            if (data == "Bad request") {
                $("#tips_text").html("请求异常，请稍后")
                $("#tips").show();
                $('#mask').show();
                return;
            } else {
                $("#tips_text").html(data.responseBody.errorMsg);
                $("#tips").show();
                $('#mask').show();
                return;
            }
        }

    });

});
$(function () {
    /*
     *图片验证码
     */
    $("#veriCodeImage").on("click", function (event) {
        $("#veriCodeImage").attr("src", "/images/yanzm.gif");
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x, localFrom: localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/unhealthy/verifyCode',
            contentType: 'application/json'
        }).done(function (data) {
            $("#veriCodeImage").attr("src", data);
        });
    });
    $("#veriCodeImage").click();
})
$('#iKnow').on('click', function () {
    $("#mask").hide();
    $("#tips").hide();
})
var falg = true;
var wait = 60;
// 点击验证
$("#getCode").on("click", function () {
    var reportPhone = $("#reportPhone").val();//举报的号码
    var phone = $("#phone").val() //请输入您的手机号码
    var verification = $('#verification').val() //验证码
    if (reportPhone == "") {
        $('#masktime').html("请输入举报的号码")
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    }

    if (verification == "") {
        $('#masktime').html("请输入验证码")
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    } else if (verification.indexOf(" ") != -1) {
        //去除字符算中的空格
        verification = verification.replace(/\s/g, "");
    }
    if (phone == "") {
        $('#masktime').html("请输入您的手机号")
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(phone))) {
        $('#masktime').html("请输入正确的号码格式")
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    }

    if (!$("#reportPhone").val() || !$("#phone").val() || !$('#verification').val()) {
        return;
    }
    if (wait == 60) {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x, localFrom: localFrom,
            local_y: local_y,
            code: verification,
            jbphone: $("#phone").val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/unhealthy/shortMessage',
            contentType: 'application/json'
        }).done(function (body) {
            if (body.retCode == '000000') {
                $("#mask").show();
                $("#tips_text").html("短信已发送到您手机上，如果1分钟内没有收到短信验证码，请点击按钮重新获取，此服务免费。");
                $("#tips").show();
                time($("#getCode"));
                return;
            } else {
                $("#mask").show();
                $("#tips_text").html(body.responseBody.errorMsg);
                $("#tips").show();
                return;
            }
        });
    }

});

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

/*
 点击返回按钮
 */
$('#back').on("click", function () {
    var url = "/unhealthy?randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
})