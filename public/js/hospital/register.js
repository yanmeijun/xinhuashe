//确认证件号码事件
$("#idNum2").on("blur", function () {
    if ($(this).val() != $("#idNum").val()) {
        maskTip("两次输入证件号码不一致");
        return;
    }
});
//确认密码事件
$("#passWord2").on("blur", function () {
    if ($(this).val() != $("#passWord").val()) {
        maskTip("两次输入密码不一致");
        return;
    }
});
//点击注册页面返回按钮,考虑到登陆页面的返回按钮
$("#backLogin").on("click", function () {
    window.location.href = "/hospital?page=login&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
})
var commitStatus3 = true;
//同意协议、性别按钮切换
$("#agreeSelect").on("click", function () {
    $(this).toggleClass("active");
})
$("#sexBoy picture,#sexGirl picture").on("click", function () {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).parent().siblings("span").find('picture').removeClass("active");
    } else {
        $(this).addClass("active");
        $(this).parent().siblings("span").find('picture').removeClass("active");
    }
})
//点击验证码
$("#veriCodeImg").on("click", function (event) {
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
        url: "/hospital/veriCode",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            $("#veriCodeImg").attr("src", res);
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })

});
$("#veriCodeImg").click();

//点击注册按钮
$("#resigterBtn").on("click", function () {
    var idNum = $("#idNum").val();
    var idNum2 = $("#idNum2").val();
    var userName = $("#userName").val();
    var sex = $(".sex.active").siblings("i").html();
    if (sex == "男") {
        sex = "1";
    } else if (sex == "女") {
        sex = "2";

    }
    var _cityID = $("#citySele").attr("data_id");
    var mobile = $("#phone").val();
    var countyID = $("#xianSele").attr("data_id");
    var verifycode = $("#verifycode").val();
    var provinceID = $("#proSele").attr("data_id");
    var passWord = $("#passWord").val();
    var passWord2 = $("#passWord2").val();

    //获取出生日期
    var birth = idNum.substring(6, 10) + "-" + idNum.substring(10, 12) + "-" + idNum.substring(12, 14);

    var phoneCode = $("#verlidate").val();
    if (!phoneCode) {
        maskTip("手机验证码不能为空");
        return;
    }
    ;
    if (!userName) {
        maskTip("姓名不能为空");
        return;
    }
    if (!sex || sex == "") {
        maskTip("性别不能为空");
        return;
    }
    if (idNum == "" || idNum2 == "") {
        maskTip("证件号码不能为空");
        return;
    } else if (idNum.trim() != idNum2.trim()) {
        maskTip("两次输入的证件号码不一致");
        return;
    }
    if (passWord == "" || passWord2 == "") {
        maskTip("密码不能为空");
        return;
    }
    if (passWord.trim() != passWord2.trim()) {
        maskTip("两次输入的密码不一致");
        return;
    }
    if (!provinceID) {
        maskTip("省份不能为空");
        return;
    }
    if (!_cityID) {
        maskTip("城市不能为空");
        return;
    }
    if (!countyID) {
        maskTip("区县不能为空");
        return;
    }
    ;
    if (mobile == "") {
        maskTip("手机号码不能为空");
        return;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(mobile))) {
        maskTip("请输入正确的手机号");
        return;
    }
    ;
    if (verifycode == "") {
        maskTip("验证码不能为空");
        return;
    }
    if (commitStatus3) {
        commitStatus3 = false;
        var data = {
            smsCode: phoneCode.trim(),//手机验证码
            birthday: birth,//出生年月日(证件类别为1的时候默认值为0-0-0)
            code: verifycode,//图片验证码
            mobileNo: mobile,//手机号码
            countyId: countyID,//区县ID（接口9返回的id字段）
            cityId: _cityID,//城市ID（接口8返回的id字段）
            provinceId: provinceID,//省份ID（接口7返回的id字段）
            passwordConfirm: passWord2,//确认设置密码
            password: passWord,//设置密码
            cardNoConfirm: idNum2,//确认身份证号
            idNo: idNum,//身份证号
            idType: "1",//证件类别  字典值（身份证：1 军官证：2 护照：3 港澳通行证：4 台胞证：5
            sex: sex,//性别(1  男 2 女)
            name: userName,//姓名
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        }
        $.ajax({
            async: false,
            type: "post",
            url: "/hospital/regSub",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json",
        }).done(function (response) {
            console.log(response)
            sessionStorage.setItem("res", response)
            commitStatus3 = true;
            if (response.retCode == "000000") {
                maskTip(response.responseBody.result);//成功的话跳转登陆页面
                window.location.href = "/hospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&local_y=" + local_y + "&comeFrom=" + comeFrom;
            } else {
                maskTip(response.responseBody.errorMsg);
            }
        }).fail(function (data) {
            commitStatus3 = true;
            console.log("btnfail");
            maskTip("通信错误");
        }).always(function (data) {
        });
    }

    event.preventDefault();
});
var province = [];
var cityData = [];
var xianData = [];

//选择省份
$("#province,#proSele").on("click", function () {
    $(".mobileSelect").remove();
    $("#citySele").text("城市");
    $("#xianSele").text("区县");
    var weekdayArr = [
        {"id": "110000", "name": "北京市"},
        {"id": "120000", "name": "天津市"},
        {"id": "130000", "name": "河北省"},
        {"id": "140000", "name": "山西省"},
        {"id": "150000", "name": "内蒙古自治区"},
        {"id": "210000", "name": "辽宁省"},
        {"id": "220000", "name": "吉林省"},
        {"id": "230000", "name": "黑龙江省"},
        {"id": "310000", "name": "上海市"},
        {"id": "320000", "name": "江苏省"},
        {"id": "330000", "name": "浙江省"},
        {"id": "340000", "name": "安徽省"},
        {"id": "350000", "name": "福建省"},
        {"id": "360000", "name": "江西省"},
        {"id": "370000", "name": "山东省"},
        {"id": "410000", "name": "河南省"},
        {"id": "420000", "name": "湖北省"},
        {"id": "430000", "name": "湖南省"},
        {"id": "440000", "name": "广东省"},
        {"id": "450000", "name": "广西壮族自治区"},
        {"id": "460000", "name": "海南省"},
        {"id": "500000", "name": "重庆市"},
        {"id": "510000", "name": "四川省"},
        {"id": "520000", "name": "贵州省"},
        {"id": "530000", "name": "云南省"},
        {"id": "540000", "name": "西藏自治区"},
        {"id": "610000", "name": "陕西省"},
        {"id": "620000", "name": "甘肃省"},
        {"id": "630000", "name": "青海省"},
        {"id": "640000", "name": "宁夏回族自治区"},
        {"id": "650000", "name": "新疆维吾尔自治区"}
    ];
    var mobileSelect1 = new MobileSelect({
        trigger: '#proSele',
        title: '选择省份',
        wheels: [
            {data: weekdayArr}
        ],
	    callback: function () {
	    	$('#proSele').css("color","#474747")
	    }
    })
    $(".mobileSelect").addClass("mobileSelect-show");
});
//选择城市
$("#city").on("click", function () {
    var provinceId = $("#proSele").attr("data_id");
    if (!provinceId) {
        return;
    }
    $(".mobileSelect").remove();
    var data = {
        provinceId: provinceId,
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
        url: '/hospital/getCity',
        contentType: 'application/json'
    }).done(function (data) {
        $("#xianSele").text("区县")
        if (data.retCode == '000000') {
            $(".mobileSelect").remove();
            var weekdayArr = [];
            var list = data.responseBody.list;
            list.forEach(function (item, index) {
                weekdayArr.push({
                    name: item.name,
                    id: item.cityId
                })
            });
            var mobileSelect1 = new MobileSelect({
                trigger: '#citySele',
                title: '选择城市',
                wheels: [
                    {data: weekdayArr}
                ],
				callback: function () {
			    	$('#citySele').css("color","#474747")
			    }
            })
            $(".mobileSelect").addClass("mobileSelect-show");
        }
    })
    event.preventDefault();
});
//选择区县
$("#county").on("click", function () {
    var cityId = $("#citySele").attr("data_id");
    if (!cityId) {
        return;
    }
    var data = {
        cityId: cityId,
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
        url: '/hospital/getCounty',
        contentType: 'application/json'
    }).done(function (data) {
        if (data.retCode == '000000') {
            $(".mobileSelect").remove();
            var weekdayArr = [];
            var list = data.responseBody.list;
            list.forEach(function (item, index) {
                weekdayArr.push({
                    name: item.name,
                    id: item.countryId
                })
            });
            var mobileSelect1 = new MobileSelect({
                trigger: '#xianSele',
                title: '选择区县',
                wheels: [
                    {data: weekdayArr}
                ],
			    callback: function () {
			    	$('#xianSele').css("color","#474747")
			    }
            })
            $(".mobileSelect").addClass("mobileSelect-show");
        }
    })
    event.preventDefault();
});

//验证手机号码，发送验证码按钮控制
var phoneExg = /^1[3,4,5,7,8]\d{9}$/;
$("#phone").on("change", function () {
    if (phoneExg.test($(this).val())) {
        $("#getVel").removeClass(" ccc");
    } else {
        $("#getVel").addClass("ccc");
    }
    event.preventDefault();
});
//点击获取验证码
$("#getVel").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var idNum = $("#idNum").val();
    var idNum2 = $("#idNum2").val();
    var userName = $("#userName").val();

    var sex = $(".sex.active").siblings("i").html();
    if (sex == "男") {
        sex = "1";
    } else if (sex == "女") {
        sex = "2";

    }
    var _cityID = $("#citySele").attr("data_id");
    var mobile = $("#phone").val();
    var countyID = $("#xianSele").attr("data_id");
    var verifycode = $("#verifycode").val();
    var provinceID = $("#proSele").attr("data_id");
    var passWord = $("#passWord").val();
    var passWord2 = $("#passWord2").val();
    if (userName == "") {
        maskTip("姓名不能为空");
        return;
    }
    if (!sex || sex == "") {
        maskTip("性别不能为空");
        return;
    }
    if (idNum == "" || idNum2 == "") {
        maskTip("证件号码不能为空");
        return;
    } else if (idNum.trim() != idNum2.trim()) {
        maskTip("两次输入的证件号码不一致");
        return;
    }
    ;
    if (passWord == "" || passWord2 == "") {
        maskTip("密码不能为空");
        return;
    }
    if (passWord || passWord2) {
        if (!/^[0-9a-zA-Z]+$/.test(passWord2)) {
            maskTip("只能使用数字和字母混合");
            return;
        } else if (passWord.trim() != passWord2.trim()) {
            maskTip("两次输入的密码不一致");
            return;
        }
    }
    if (provinceID == "") {
        maskTip("省份不能为空");
        return;
    }
    if (_cityID == "") {
        maskTip("城市不能为空");
        return;
    }
    if (countyID == "") {
        maskTip("区县不能为空");
        return;
    }
    if (mobile == "") {
        maskTip("手机号码不能为空");
        return;
    }
    if (verifycode == "") {
        maskTip("验证码不能为空");
        return;
    }
    $(this).addClass("ccc");
    var jsonObj = {};
    jsonObj["isshefn"] = idNum.trim();//身份证号
    jsonObj["sex"] = sex.trim();
    jsonObj["city"] = _cityID.trim();
    jsonObj["county"] = countyID.trim();
    jsonObj["idType"] = 1;//
    jsonObj["userName"] = userName.trim();//
    jsonObj["sms"] = mobile.trim();//手机号码
    jsonObj["code"] = verifycode.trim();//图片验证码
    jsonObj["province"] = provinceID.trim();
    jsonObj["passWord"] = passWord.trim();
    jsonObj["randomKey"] = randomKey;
    jsonObj["userID"] = userID;
    jsonObj["clientID"] = clientID;
    jsonObj["cityID"] = cityID;
    jsonObj["local_x"] = local_x;
    jsonObj["local_y"] = local_y;
    $.ajax({
        async: false,
        type: "POST",
        url: "/hospital/regCode",
        dataType: "json",
        data: JSON.stringify(jsonObj),
        contentType: "application/json",
    }).done(function (response) {
        if (response.retCode == "000000") {
            if (response.responseBody.code == "200") {
                maskTip("短信已发送,请注意查收短信");
            } else {
                maskTip(response.responseBody.msg);
            }
        } else {
            maskTip(response.responseBody.msg);
        }
    }).fail(function (data) {
        console.log('fail');
    }).always(function () {
    });
});
//点击同意协议
$("#agreeCon").on("click", function () {
    $(".max").eq(0).hide();
    $(".max").eq(1).show();
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    event.preventDefault();
});
//协议返回
$("#back").on("click", function () {
    $(".max").eq(0).show();
    $(".max").eq(1).hide();
    event.preventDefault();
});
// 参数为空时的提示语
function maskTip(mgs) {
    $('#masktime').html(mgs);
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
}