$(function () {
    if(localFrom == "xinhuashe_app"){
        getInputInfo();
    }
    //获取回填信息
    function getInputInfo() {
        var data = {
            clientID: clientID,
            serviceID: "CAB0001"
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/userLoginInfo/getUserInfo',
            contentType: 'application/json'
        }).done(function (data) {
            $("#name").val(data.xm)
            $("#zsbh").val(data.zsbh)
            $("#mphone").val(data.mphone)
        });
    }
    getVeryCode();
    $("#image").on("click", function () {
        getVeryCode()
    });
    $("#iKnow").click(function () {
        $("#mask").hide();
        $("#tips").hide();
    });
    //获取图片验证码
    function getVeryCode() {
        $("#image").attr("src", "/images/yanzm.gif");
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
            type: 'post',
            data: JSON.stringify(data),
            url: '/education/getVeryCode',
            contentType: 'application/json'
        }).done(function (data) {
            $("#image").attr("src", data);
        });
    }

    $("#getCode").click(function (event) {
        event.preventDefault();
        if (!$("#mphone").val()) {
            masktime("请输入手机号！");
            return;
        } else if (!$("#name").val()) {
            masktime("请输入姓名！");
            return;
        } else if (!$("#zsbh").val()) {
            masktime("请输入证书编号！");
            return;
        } else if (!$("#verifycode").val()) {
            masktime("请输入验证码！");
            return;
        }
        var data = {
            userID: userID,
            clientID: clientID,
            randomKey: randomKey,
            localFrom:localFrom,
            name: $("#name").val(),
            zsbh: $("#zsbh").val(),
            verifycode: $("#verifycode").val(),
            mphone: $("#mphone").val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/education/getPhoneCode',
            contentType: 'application/json'
        }).done(function (body) {
            if (body.retCode == '000000') {
                $("#mask").show();
                $("#tips_text").text("短信已发送到您手机上，如果1分钟内没有收到短信验证码，请点击按钮重新获取，此服务免费。");
                $("#tips").show();
                time($("#getCode"));
            } else {
                // alert(body.rtnMsg);
                $("#mask").show();
                $("#tips_text").text(body.rtnMsg || "获取短信验证码失败");
                $("#tips").show();
            }
        });
    });
    $("#xlSearch").click(function () {
        if (!$("#mphone").val()) {
            masktime("请输入手机号！");
            return;
        } else if (!$("#name").val()) {
            masktime("请输入姓名！");
            return;
        } else if (!$("#zsbh").val()) {
            masktime("请输入证书编号！");
            return;
        } else if (!$("#verifycode").val()) {
            masktime("请输入验证码！");
            return;
        }
        if ($("#phoneCode").val()) {
            $('#dialogMask,#dialog').show();
            $("#searchForm").submit();
            // window.location.href = "/education?page=educationInfo&randomKey="+randomKey+"&userID="+userID+
            //     "&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x+"&local_y="+local_y
            //     +"&phoneCode="+$("#phoneCode").val();
        } else {
            masktime("短信验证码不能为空！")
        }
    });
    $(".icon-return").click(function () {
        window.location.href = "/education?page=education&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y
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
