$(function () {
    $("#veriCodeImage").on("click", function (event) {
        $("#veriCodeImage").attr("src", "/images/yanzm.gif");
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
            url: '/unhealthy/verifyCode',
            contentType: 'application/json'
        }).done(function (data) {
            $("#veriCodeImage").attr("src", data);
        });
    });
    $("#veriCodeImage").click();
});


//点击举报
$("#report").on("click", function (event) {
    var verifycode = $('#verification').val(); //验证码
    var content = $('#content').val();//描述
    if (content == "") {
        $('#masktime').html("举报内容描述")
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    }

    if (verifycode == '') {
        $('#masktime').html("请输入验证码")
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
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
        sms_content: $("#content").val(),
        code: $("#verification").val()
    }

    $.ajax({
        async: true,
        type: 'post',
        data: JSON.stringify(data),
        url: '/unhealthy/subPersonInfo',
        contentType: 'application/json'
    }).done(function (data) {
        $('#dialogMask,#dialog').hide();
        if (data.retCode == '000000') {
            if (data.responseBody.statusCode == "1") {
                $("#tips_text").html(data.responseBody.rtnMsg);
                $("#tips").show();
                $('#mask').show();
            } else {
                $("#tips_text").html(data.responseBody.rtnMsg);
                $("#tips").show();
                $('#mask').show();
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
                if (data.responseBody.errorMsg) {
                    $("#tips_text").html(data.responseBody.errorMsg)
                    $("#tips").show();
                    $('#mask').show();
                    return;
                } else {
                    $("#tips_text").html("请求异常，请稍后")
                    $("#tips").show();
                    $('#mask').show();
                    return;
                }
            }
        }

    })
});

//取消提示信息
$('#iKnow').on("click", function () {
    $("#tips").hide();
    $("#mask").hide();
})


fnSize()
window.addEventListener('resize', fnSize, false)
function fnSize() {
    document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
}

/*
 点击返回按钮
 */
$('#back').on("click", function () {
    var url = "/unhealthy?randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
})