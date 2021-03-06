var USERNAME = sessionStorage.getItem('anhuiHospital_USERNAME');
var PASSWORD = sessionStorage.getItem('anhuiHospital_PASSWORD');
$(function () {
    $('#dialogMask,#dialog').show();
    confirmQuit()
    verification();
    if (USERNAME) {
        $("#mobile").val(USERNAME);
        $("#password").val(PASSWORD);
    }
})
function verification() {
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
        url: "/anhuiHospital/verification",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                initGeetest({
                    gt: data.responseBody.gt,
                    challenge: data.responseBody.challenge,
                    product: "float", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                    offline: !data.responseBody.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                }, handlerEmbed);
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}


function handlerEmbed(captchaObj) {
    $('#login').on("click", function () {
        var validate = captchaObj.getValidate();
        var mobile = $("#mobile").val();
        var password = $("#password").val();
        if ("" == password || "" == mobile) {
            maskTip("请填写手机号和密码");
            return false;
        } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(mobile))) {
            maskTip("手机号格式不正确");
            return false;
        }
        if (!validate) {
            maskTip("请先拖动验证码到相应位置");
            return false;
        }
        ;
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            mobile: mobile.trim(),
            password: password.trim(),
            challenge: validate.geetest_challenge,
            validate: validate.geetest_validate,
            seccode: validate.geetest_seccode
        };
        $.ajax({
            async: true,
            url: "/anhuiHospital/login",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                /**查询动画提示结束**/
                $('#dialogMask,#dialog').hide();
                if (data.retCode == "000000") {
                    if ("ERROR_0" == data.responseBody.code) {
                        maskTip(data.responseBody.msg);
                        return false;
                    }
                    if ("ERROR_1" == data.responseBody.code) {
                        maskTip("请求数据失败");
                        return false;
                    }
                    if ("1" == data.responseBody.code) {
                        if (data.responseBody.url == null || data.responseBody.url == "" || data.responseBody.url == "null") {
                            var url = "/anhuiHospital?page=anhuiHospital&randomKey=" + randomKey + "&userID=" + userID +
                                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                            window.location.href = url;
                        } else {
                            var url = "/anhuiHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
                                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                            window.location.href = url;
                        }
                        /* else if(data.responseBody.url.indexOf("/web/source/info")!=-1){
                         var url="/anhuiHospital?page=selectDepartment&randomKey="+randomKey+"&userID="+userID+
                         "&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x+"&local_y="+local_y;
                         window.location.href=url;
                         }*/
                    }
                }
            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        });
    })
    captchaObj.appendTo("#captcha");// 将验证码加到id为captcha的元素里
    captchaObj.onReady(function () {
        $("#wait").css("display", "none");
        $('#captchaCon').show();
    });
};

$('#register').click(function () {
    var url = "/anhuiHospital?page=register&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    ;
    window.location.href = url;
})
$('#pwdRecovery').click(function () {
    var url = "/anhuiHospital?page=pwdRecovery&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    ;
    window.location.href = url;
})
$('#back').click(function () {
    var url = "/anhuiHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
})


/**查询预约记录*/
var userCenter = true;   //个人中心开关
$(".userAvatarBox").on("click", function (event) {
    if (userCenter) {
        userCenter = false;
        $(".userAvatarBox #userCenter").show();//记录
    } else {
        userCenter = true;
        $(".userAvatarBox #userCenter").hide();
    }

});
$('#quit').click(function () {
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
        url: "/anhuiHospital/signOTut",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            maskTip("退出成功");
            var url = "/anhuiHospital?page=anhuiHospital&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
})
$('#personCon').click(function () {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageNo: "0",
        pageSize: 10,
        keyword: "",
        stime: "",
        etime: ""
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/personCenter",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.responseBody.data) {
                if (data.responseBody.data.indexOf("login.jsp") != -1) {//跳转到登录页面
                    var url = "/anhuiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    window.location.href = url;
                    return false;
                }
            }
            var url = "/anhuiHospital?page=userCenter&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
            window.location.href = url;
            return false;
        }
    })
})
function confirmQuit() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageNo: 0,
        pageSize: 10,
        keyword: "",
        stime: "",
        etime: ""
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/personCenter",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.responseBody.data) {
                if (data.responseBody.data.indexOf("login.jsp") != -1) {//跳转到登录页面
                    $('#quit').css("display", "none");
                    return;
                }
            }
            ;
            $('#quit').css("display", "block");
        }
    })
}


