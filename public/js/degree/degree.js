$(function () {
    if(localFrom == "xinhuashe_app"){
        getInputInfo();
    }
    //获取回填信息
    function getInputInfo() {
        var data = {
            clientID: clientID,
            serviceID: "CAC0001"
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/userLoginInfo/getUserInfo',
            contentType: 'application/json'
        }).done(function (data) {
            $("#phoneNum").val(data.mobilephone);//手机号码
            $("#name").val(data.xm);//姓名
            $("#xwzsbh").val(data.xwzsbh);//证书编号
        });
    }
    $("input[name='randomKey']").val(randomKey);
    $("input[name='userID']").val(userID);
    $("input[name='clientID']").val(clientID);
    $("input[name='cityID']").val(cityID);
    $("input[name='local_x']").val(local_x);
    $("input[name='local_y']").val(local_y);
    //点击验证码
    $("#veriCodeImg").on("click", function (event) {
        $("#veriCodeImg").attr("src", "/images/yanzm.gif");
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
            url: '/degree/getVeryCode',
            contentType: 'application/json'
        }).done(function (data) {
            $("#veriCodeImg").attr("src", data);
        });
        event.preventDefault();
    });
    $("#veriCodeImg").click();

    var wait = 60;

    function time(but) {
        if (wait == 0) {
            $(but).removeAttr("disabled").removeClass("ccc");
            $(but).text("获取校验码");
            wait = 60;
        } else {
            $(but).attr("disabled", true).addClass("ccc");
            $(but).text("重新发送(" + wait + ")");
            wait--;
            setTimeout(function () {
                time(but);
            }, 1000);
        }
    }

    var phoneExg = /^1[3,4,5,7,8]\d{9}$/;

    $("#phoneNum").on("change", function (event) {
        if (phoneExg.test($(this).val())) {
            if (wait == 60) {
                $("#getVel").removeClass("ccc").removeAttr("disabled")
            }
        } else {
            $("#getVel").addClass("ccc");
        }
        event.preventDefault();
    });
//点击获取验证码
    $("#getVel").on("click", function (event) {
        var verifycode = $("#verifycode").val();//图片验证码
        var mphone = $("#phoneNum").val();//手机号码
        var name = $("#name").val();//姓名
        var xwzsbh = $("#xwzsbh").val();//证书编号
        if (xwzsbh == "") {
            masktime("证书编号不能为空");
            return;
        }
        if (name == "") {
            masktime("姓名不能为空");
            return;
        }
        if (verifycode == "") {
            masktime("图片验证码不能为空");
            return;
        }
        if (mphone == "") {
            masktime("手机号码不能为空");
            return;
        }
        if (!phoneExg.test(mphone)) {
            masktime("手机号码格式不正确");
            return;
        }
        if (!phoneExg.test($("#phoneNum").val())) {
            masktime("手机号码格式不正确");
            return;
        }
        var jsonObj = {};
        jsonObj["verifycode"] = verifycode.trim();
        jsonObj["phone"] = mphone.trim();
        jsonObj["name"] = name.trim();
        jsonObj["xwzsbh"] = xwzsbh.trim();
        jsonObj["randomKey"] = randomKey;
        jsonObj["userID"] = userID;
        jsonObj["clientID"] = clientID;
        jsonObj["cityID"] = cityID;
        jsonObj["local_x"] = local_x;
        jsonObj["local_y"] = local_y;
        $.ajax({
            async: false,
            type: "POST",
            url: "/degree/getCode",
            dataType: "json",
            data: JSON.stringify(jsonObj),
            contentType: "application/json"
        }).done(function (response) {
            if (response.retCode != "000000") {
                masktime(response.responseBody.errorMsg || "短信发送失败");
            } else {
                masktime("短信验证码正在发送中，请查看手机短信，如果2分钟内没有收到，请核实填写的手机号码。");
                $(this).addClass("ccc");
                time($("#getVel"));
            }
        }).fail(function (data) {
        }).always(function () {
        });
        event.preventDefault();
    });
    //点击查询
    $("#searchBtn").on("click", function () {
        var verifycode = $("#verifycode").val();//图片验证码
        var mphone = $("#phoneNum").val();//手机号码
        var name = $("#name").val();//姓名
        var xwzsbh = $("#xwzsbh").val();//证书编号
        var phoneCode = $("#phoneCode").val();//手机验证码
        if (xwzsbh == "") {
            masktime("证书编号不能为空");
            return;
        }
        if (name == "") {
            masktime("姓名不能为空");
            return;
        }
        if (verifycode == "") {
            masktime("图片验证码不能为空");
            return;
        }
       /* if (mphone == "") {
            masktime("手机号码不能为空");
            return;
        }
        if (!phoneExg.test(mphone)) {
            masktime("手机号码格式不正确");
            return;
        }
        if (!phoneExg.test($("#phoneNum").val())) {
            masktime("手机号码格式不正确");
            return;
        }
        if (phoneCode == "") {
            masktime("短信验证码不能为空");
            return;
        }*/
        ;
        $('#dialogMask,#dialog').show();
        $("#searchForm").submit();
        event.preventDefault();
    });
    function masktime(mgs) {
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
});
//点击最新上网情况
function jumpPro() {
    window.location.href = "/degree?page=degreeInternetSituation&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
}