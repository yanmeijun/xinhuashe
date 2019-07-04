var vcode;
$(function () {
    $('#dialogMask,#dialog').show();
    confirmQuit()
    verification();
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
    $('#getSMSCode').on("click", function () {
        if (wait != 60) {
            return;
        }
        var validate = captchaObj.getValidate();
        var mobile = $("#mobile").val();
        if ("" == mobile) {
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
        //生成序号（字母+两位整数）
        var letter = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
        var randomLetter = Math.round(Math.random() * 24) + 0;
        var rand = letter[randomLetter];
        var number = "";
        if ("undefined" == rand) {
            rand = "a";
        }
        for (var i = 0; i < 2; i++) {
            number += Math.floor(Math.random() * 10);
        }
        var randomCode = rand + number;
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            mobile: mobile.trim(),
            randomCode: randomCode,
            challenge: validate.geetest_challenge,
            validate: validate.geetest_validate,
            seccode: validate.geetest_seccode,
            type: "1"
        };
        $.ajax({
            async: true,
            url: "/anhuiHospital/getMessage",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                /**查询动画提示结束**/
                $('#dialogMask,#dialog').hide();
                if (data.retCode == "000000") {
                    if ("ERROR_0" == data.responseBody.code || "ERROR_1" == data.responseBody.code) {
                        maskTip(data.responseBody.msg)
                        return false;
                    }
                    if ("1" == data.responseBody.code) {
                        var note = "序号：" + randomCode;
                        vcode = note;
                        maskTip("验证码发送成功");
                        time($("#getSMSCode"));
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


// 至少8个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符。
var passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
//!passwordReg.test(password)
function getRegister() {
    var mobile = $("#mobile").val().trim();
    var password = $("#password").val();
    var aginPassword = $('#aginPassword').val();
    var name = $('#name').val().trim();
    var card = $('#card').val().trim();
    if ("" == mobile) {
        maskTip("请填写手机号和密码");
        return false;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(mobile))) {
        maskTip("手机号格式不正确");
        return false;
    }
    if ($('#message').val().trim() == "") {
        maskTip("短信验证码不能为空");
        return false;
    }
    if (password == "") {
        maskTip("请填写新密码");
        return false;
    } else if (!passwordReg.test(password)) {
        maskTip("校验密码格式，8-16位字符，包含大小写字母和数字");
        return false;
    }
    if (aginPassword == "") {
        maskTip("请重新输入新密码");
        return false;
    } else if (password.trim() != aginPassword.trim()) {
        maskTip("两次密码输入不一致");
        return false;
    }
    if (name == "") {
        maskTip("请输入真实姓名");
        return false;
    }
    if (card == "") {
        maskTip("校验身份证号");
        return false;
    } else if (!validateIdCard(card)) {
        maskTip("身份证格式错误");
        return;
    }
    $('#dialogMask,#dialog').show();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        mobile: mobile.trim(),
        vcode: $('#message').val().trim(),
        password: password,
        name: name,
        sfcode: card,
        province: ""
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/register",
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
                    maskTip("注册成功");
                    var url = "/anhuiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    ;
                    window.location.href = url;
                }
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
};
$('#btn').click(function () {
    getRegister()
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
$('#back').click(function () {
    var url = "/anhuiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    ;
    window.location.href = url;
})

function validateIdCard(idCard) {
    //15位和18位身份证号码的正则表达式
    // var regIdCard = /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X|x])$)/;
    var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }
            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                    //alert("恭喜通过验证啦！");

                } else {
                    return false;
                    //maskTip("身份证号码错误！");
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    //alert("恭喜通过验证啦！");
                    return true;
                } else {
                    //maskTip("身份证号码错误！");
                    return false;

                }
            }
        } else {
            //maskTip("身份证号码错误！");
            return false;
        }
    } else {
        return false;
    }
}

$('#login').click(function () {
    var url = "/anhuiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    ;
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
                    ;
                    window.location.href = url;
                    return false;
                }
            }
            var url = "/anhuiHospital?page=userCenter&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=register";
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