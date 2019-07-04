$(function () {
    $("#submit").click(function () {
        if (!$("#userName").val().trim()) {
            masktime("请输入用户名")
            return;
        } else if (!$("#password").val().trim()) {
            masktime("请输入密码")
            return;
        } else  if (!$('#Verification').val()) {
            masktime("验证码不能为空")
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            UserName: $("#userName").val().trim(),
            Password: $("#password").val().trim(),
            Code:$('#Verification').val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/login',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == "000000") {
                if (data.responseBody.data == "/YYZL/PersonalCenter/PersonalCenterIndex") {
                    window.location.href = "/jxHospital?page=" + comeFrom + "&cityID=" + cityID + "&localFrom=" + localFrom;
                }
               /* else if (data.responseBody.data.indexOf("你输入的密码错误") > -1) {
                    masktime("密码错误，请重新输入")
                    return;
                } else if (data.responseBody.data.indexOf("您输入的用户名或身份证不存在") > -1) {
                    masktime("您输入的用户名或身份证不存在")
                    return;
                }*/
            } else {
                masktime(data.responseBody.errorMsg)
                return;
            }
        })
    });
    $(document).on("touchstart", "img[id='back']", function () {
        window.location.href = "/jxHospital?page=" + comeFrom + "&cityID=" + cityID + "&localFrom=" + localFrom;
    })
    function masktime(mgs) {
        $('#masktime').html(mgs);
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };




    $("#veriCodeImg").on("click", function (event) {
        $("#veriCodeImg").attr('src', "/images/yanzm.gif");
        var parameters = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,
            localFrom:localFrom,
            local_y: local_y
            /*Round: Math.random()*/
        };
        $.ajax({
            async: true,
            url: "/jxHospital/getVerification",
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

})
function renderTo(pageName) {
    window.location.href = "/jxHospital?page=" + pageName + "&comeFrom2=login&cityID=" + cityID + "&localFrom=" + localFrom;
};