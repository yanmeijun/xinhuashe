$(function () {
    var code;
    //获取验证码
    var velidate, commitStatus = true;
    $("#veriCodeImg").on("click", function (event) {
        var parameters = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            url: "/heNanHospital/verifycode",
            type: "post",
            data: JSON.stringify(parameters),
            contentType: 'application/json',
            success: function (res) {
                $("#veriCodeImg").attr('src', res);
            },
            error: function () {
                alert("验证码获取失败");
            }
        })
    });
    $("#veriCodeImg").trigger("click");

    //获取手机验证码
    $("#getCode").on("click", function () {
        if (wait != 60) {
            return;
        }
        var phone = $("#phone").val();
        var veriCode = $("#veriCode").val();
        if (phone.trim() == "") {
            maskTip("请输入手机号");
            return;
        } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(phone))) {
            maskTip("请输入正确的手机号");
            return;
        }
        ;
        if (veriCode.trim() == "") {
            maskTip("请输入图片验证码");
            return;
        }
        var parameters = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            validateCode: veriCode.trim(),//图片验证码
            logname: phone.trim()
        };
        $.ajax({
            async: true,
            url: "/heNanHospital/getPhoneVerification",
            type: "post",
            data: JSON.stringify(parameters),
            contentType: 'application/json',
            success: function (res) {
                if (res.responseBody.resultCode == "002") {
                    if (res.responseBody.resultMsg == "图片验证码错误！") {
                        maskTip("图片验证码错误！");
                        $('#veriCodeImg').click();
                        return;
                        $("#veriCodeImg").trigger("click");
                    } else if (res.responseBody.resultMsg == "发送成功，请注意查收短信。") {
                        maskTip("发送成功，请注意查收短信。");
                        return;
                        $(this).addClass("ccc");
                        time($("#getCode"));
                    } else if (res.responseBody.resultMsg == "此登录名已存在！") {
                        maskTip("此登录名已存在！");
                        return;
                        $("#veriCodeImg").trigger("click");
                    }

                } else if (res.responseBody.resultCode == "001") {
                    maskTip(res.responseBody.resultMsg);
                    return;
                    if (res.responseBody.resultMsg == "发送频繁，稍等下再请求发送！") {
                        maskTip("发送频繁，稍等下再请求发送!");
                        return;
                        $("#veriCodeImg").trigger("click");
                    } else if (res.responseBody.resultMsg == "发送失败") {
                        maskTip("发送失败");
                        return;
                        $("#veriCodeImg").trigger("click");
                    }
                } else if (res.responseBody.resultCode == "000") {
                    maskTip(res.responseBody.resultMsg);
                    $(this).addClass("ccc");
                    time($("#getCode"));
                    return;
                }
            },
            error: function () {
                maskTip("短信验证码获取失败");
                return;
            }
        })
    })
    //点击登陆按钮，跳转页面
    $("#goLogin").on("click", function () {
        var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
        window.location.href = url;
    });
    //点击注册按钮
    // $("#registerBtn").on("click",function(){
    //     var phone=$("#phone").val();
    //     var veriCode=$("#veriCode").val();
    //     if(phone.trim()==""){
    //         alert("请输入手机号");
    //     }
    //     if(veriCode.trim()==""){
    //         alert("请输入图片验证码");
    //     };
    //     let parameters={
    //         randomKey:randomKey,
    //         userID:userID,
    //         clientID:clientID,
    //         cityID:cityID,
    //         local_x:local_x,
    //         local_y:local_y,
    //         validateCode:veriCode,
    //         logname:phone,
    //
    //     };
    //     $.ajax({
    //         async:true,
    //         url:"/heNanHospital/getPhoneVerification",
    //         type:"post",
    //         data: JSON.stringify(parameters),
    //         contentType: 'application/json',
    //         success:function(res){
    //             console.log(res);
    //         },
    //         error:function(){
    //             alert("短信验证码获取失败");
    //         }
    //     })
    //     event.preventDefault();
    // });

})
$("#next").on("click", function () {
    var phone = $("#phone").val();//
    var veriCode = $("#veriCode").val();//图片验证码
    var code = $("#code").val();//短信验证码
    if (phone.trim() == "") {
        maskTip("请输入手机号");
        return;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(phone))) {
        maskTip("请输入正确的手机号");
        return;
    }
    ;
    if (veriCode.trim() == "") {
        maskTip("请输入图片验证码");
        return;
    }
    ;
    if (code.trim() == "") {
        maskTip("请输入短信验证码");
        return;
    }
    ;
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        validateCode: veriCode.trim(),//图片验证码
        logname: phone.trim(),//登录名
        code: code.trim()//手机验证码
    };
    $.ajax({
        async: true,
        url: "/heNanHospital/nextRegister",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if (res.retCode == "000000") {
                sessionStorage.setItem("veriCode", veriCode);//图片验证码
                sessionStorage.setItem("code", code);//短信验证码
                sessionStorage.setItem("phoneName", phone.trim());//用户名
                var url = "/heNanHospital?page=registerSupplement&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                window.location.href = url;
            } else {
                maskTip(res.responseBody.errorMsg);
                return;
            }
        },
        error: function () {
            maskTip("请求异常");
            return;
        }
    });
});


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
};

function back() {
    var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
};