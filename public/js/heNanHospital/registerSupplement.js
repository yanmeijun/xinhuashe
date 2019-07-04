$(function () {
    var phoneName = sessionStorage.getItem("phoneName");//用户名
    $("#phone").val(phoneName);
    //同意协议、性别按钮切换
    $("#sexBoy picture,#sexGirl picture").on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).parent().siblings("span").find('picture').removeClass("active");
        } else {
            $(this).addClass("active");
            $(this).parent().siblings("span").find('picture').removeClass("active");
        }
    });
    $('#registerBtn').click(function () {
        var phone = $("#phone").val();//仅限手机号码注册
        var password = $("#password").val();//请输入登录密码
        var aginPassword = $("#aginPassword").val();//请再次输入登录密码
        var name = $("#name").val();//请填写真实姓名
        var carName = $("#carName").attr("data_id");//身份证
        var nameID = $("#nameID").val();//请填写证件号码
        var email = $("#email").val();//请填写邮箱
        var veriCode = sessionStorage.getItem("veriCode");//图片验证码
        var code = sessionStorage.getItem("code");//短信验证码
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if (phone.trim() == "") {
            maskTip("请输入手机号");
            return;
        } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(phone))) {
            maskTip("请输入正确的手机号");
            return;
        }
        //请输入登录密码
        if (password.trim() == "") {
            maskTip("请输入登录密码");
            return;
        } else if (password.indexOf(" ") != -1) {
            maskTip("中间不能有空格");
            return;
        }
        ;
        //请再次输入登录密码
        if (aginPassword == "") {
            maskTip("请再次输入登录密码");
            return;
        } else if (aginPassword.indexOf(" ") != -1) {
            maskTip("中间不能有空格");
            return;
        }
        ;
        /*
         *登录密码和再次输入登录密码
         */
        if (password != aginPassword) {
            maskTip("登录密码不一致");
            return;
        }
        //请填写真实姓名
        var regName = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/
        if (name == "") {
            maskTip("请填写真实姓名");
            return;
        } else if (!regName.test(name)) {
            maskTip("真实姓名有误");
            return;
        }
        ;
        //证件号码
        var regIdNo = /(^\d{}$)|(^\d{}$)|(^\d{}(\d|X|x)$)/;
        if (nameID == "") {
            maskTip("请填写证件号码");
            return;
        } else if (nameID.indexOf(" ") != -1) {
            maskTip("证件号有空格");
            return;
        } else if (/[\u4E00-\u9FA5]/i.test(nameID)) {
            maskTip("证件号有中文");
            return;
        }
        validateIdCard(nameID.trim());
        //邮箱格式
        var regs = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (email == "") {
            maskTip("请填写邮箱");
            return;
        } else if (!reg.test(email)) {
            maskTip("邮箱格式错误！");
            return;
        } else if (email.indexOf(" ") != -1) {
            maskTip("中间不能有空格");
            return;
        } else if (!regs.test(email)) {
            maskTip("邮箱格式错误！");
            return;
        }
        ;

        /* 验证性别*/
        // if($('.active').attr("man-sex")!=IdCard(nameID.trim(),2)){
        //     maskTip("请选择性别");
        //     return;
        // }
        if (!$('#sexBoy picture').hasClass("active") && !$('#sexGirl picture').hasClass("active")) {
            maskTip("请选择性别");
            return;
        }
        var parameters = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            nlogname: phone.trim(),//登录名
            npassword: password.trim(),//登录密码
            nname: name.trim(),//真实姓名
            nidnotype: carName,//身份证 证件类型（身份证的编号为1，出生证的编号为6）
            nidno: nameID.trim(),//证件号
            nphone: phone,//手机号
            nemail: email.trim(),//邮箱
            ngender: $('.active').attr("sex-id"),//性别（女的编号为0，男的编号为1）
            nage: IdCard(nameID.trim(), 3)//年龄
        };
        // validateCode:veriCode || "",//图片验证码 非必填
        //     logname:phone.trim(),//手机号
        //     code:code || "",//手机号验证码 非必填
        $.ajax({
            async: true,
            url: "/heNanHospital/registerCode",
            type: "post",
            data: JSON.stringify(parameters),
            contentType: 'application/json',
            success: function (res) {
                if (res.retCode == "000000") {
                    if (res.responseBody.resultCode == "001") {
                        maskTip(res.responseBody.resultMsg);
                        return;
                    } else if (res.responseBody.resultCode == "000") {
                        maskTip(res.responseBody.resultMsg);
                        var url = "/heNanHospital?page=heNanHospital&randomKey=" + randomKey + "&userID=" + userID +
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                        window.location.href = url;
                    }
                }
            },
            error: function () {
                maskTip("请求异常");
                return;
            }
        })
    })

})

function IdCard(UUserCard, num) {
    if (num == 1) {
        //获取出生日期
        birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
        return birth;
    }
    if (num == 2) {
        //获取性别
        if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
            //男
            return "男";
        } else {
            //女
            return "女";
        }
    }
    if (num == 3) {
        //获取年龄
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
        if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
            age++;
        }
        return age;
    }
}
//js 验证身份证格式
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
                    maskTip("身份证号码错误！");
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    //alert("恭喜通过验证啦！");
                    return true;
                } else {
                    maskTip("身份证号码错误！");
                    return false;

                }
            }
        } else {
            maskTip("身份证号码错误！");
            return false;
        }
    } else {
        //alert("身份证格式不正确!");
        maskTip("身份证号码错误！");
        return false;
    }
}


/*返回按钮*/
function back() {
    var url = "/heNanHospital?page=register&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
}