var phone = sessionStorage.getItem("phone");
var veriCode = sessionStorage.getItem("veriCode");
var code = sessionStorage.getItem("code");
var password = sessionStorage.getItem("password");
var aginPassword = sessionStorage.getItem("aginPassword");
var citySelectName = sessionStorage.getItem("cityName");
$(function () {
    if (citySelectName) {
        $('#cityName').html(citySelectName);
    } else {
        $('#cityName').html(cityName);
    }
})

$('#registerBtn').on("click", function () {
    if (!$("#name").val()) {
        maskTip("请输入姓名");
        return;
    } else if (!$("#idNo").val()) {
        maskTip("请输入身份证号码");
        return;
    } else if (!validateIdCard($("#idNo").val())) {
        maskTip("身份证号码错误");
        return;
    }
    if (!$("#countyTrigger").attr("data_id") || !$("#cityTrigger").attr("data_id") || !$("#provinceTrigger").attr("data_id")) {
        maskTip("请选择现居住地");
        return;
    }
    if (!$('input[name="smsra"]:checked').val()) {
        maskTip("未同意用户协议");
        return;
    }
    var data = {
        phone: phone,
        B1: "注册",
        validatecode: veriCode,
        fromurl: "",
        addrcountryid: $("#countyTrigger").attr("data_id"),//区县ID
        addrcityid: $("#cityTrigger").attr("data_id") + "|" + $('#cityTrigger').text(),//城市ID
        addrprovinceid: $("#provinceTrigger").attr("data_id") + "|" + $('#provinceTrigger').text(),//省份ID
        code: code,
        idcard: $("#idNo").val(),
        username: $("#name").val(),
        userpwd: password,
        userpwd_r: aginPassword,
        tyxy: "1",
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
        url: '/sXHospital/register',
        contentType: 'application/json'
    }).done(function (data) {
        if (data.retCode == '000000') {
            //maskTip("");
            var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
            window.location.href = url;//跳转到对应的页面
            return;
        } else {
            alert(data.responseBody.errorMsg);
            return;
        }
    })
})


$("#province,#provinceTrigger").on("click", function () {
    $(".mobileSelect").remove();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        taskId: "21"
    };
    $.ajax({
        async: true,
        type: 'post',
        data: JSON.stringify(data),
        url: '/sXHospital/province',
        contentType: 'application/json'
    }).done(function (data) {
        $("#countyTrigger").text("区县")
        if (data.retCode == '000000') {
            $(".mobileSelect").remove();
            var weekdayArr = [];
            var list = data.responseBody.lists;
            list.forEach(function (item, index) {
                weekdayArr.push({
                    name: item.name,
                    id: item.selectId
                })
            });
            var mobileSelect1 = new MobileSelect({
                trigger: '#provinceTrigger',
                title: '选择省份',
                wheels: [
                    {data: weekdayArr}
                ],
				callback: function () {
				  $('#provinceTrigger').css("color","#474747")
				}
            })
            $(".mobileSelect").addClass("mobileSelect-show");
        }
    })


});
$("#city,#cityTrigger").on("click", function () {
    $(".mobileSelect").remove();
    var provinceId = $("#provinceTrigger").attr("data_id");
    if (!provinceId) {
        return;
    }
    /*sel: provinceId,*/
    var data = {
        sel: provinceId,
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
        url: '/sXHospital/addrcity',
        contentType: 'application/json'
    }).done(function (data) {
        $("#countyTrigger").text("区县");
        if (data.retCode == '000000') {
            $(".mobileSelect").remove();
            var weekdayArr = [];
            var list = data.responseBody.lists;
            list.forEach(function (item, index) {
                weekdayArr.push({
                    name: item.name,
                    id: item.selectId
                })
            });
            var mobileSelect1 = new MobileSelect({
                trigger: '#cityTrigger',
                title: '选择城市',
                wheels: [
                    {data: weekdayArr}
                ],
					callback: function () {
					  $('#cityTrigger').css("color","#474747")
					}
            })
            $(".mobileSelect").addClass("mobileSelect-show");
        }
    })
});
$("#county,#countyTrigger").on("click", function () {
    $(".mobileSelect").remove();
    var cityId = $("#cityTrigger").attr("data_id");
    if (!cityId) {
        return;
    }
    var data = {
        sel: cityId,
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
        url: '/sXHospital/addrcountry',
        contentType: 'application/json'
    }).done(function (data) {
        if (data.retCode == '000000') {
            $(".mobileSelect").remove();
            // var weekdayArr = [];
            var list = data.responseBody.lists;
            var mobileSelect1 = new MobileSelect({
                trigger: '#countyTrigger',
                title: '选择区县',
                wheels: [
                    {data: list}
                ],
				callback: function () {
				  $('#countyTrigger').css("color","#474747")
				}
            })
            $(".mobileSelect").addClass("mobileSelect-show");
        }
    })
});
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
        //alert("身份证格式不正确!");
        //maskTip("身份证号码错误！");
        return false;
    }
}


$('#userAvatarBox').on("click", function () {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        type: "post",
        url: "/sXHospital/record",
        async: true,
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var url = "/sXHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                window.location.href = url;//跳转到对应的页面
            } else {
                if (data.responseBody.errorCode == "110003") {
                    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    window.location.href = url;//跳转到对应的页面
                    return;
                } else {
                    maskTip(data.responseBody.errorMsg);
                }
            }
        },
        error: function () {

        }
    })
})


$('#back').on("click", function () {
    var url = "/sXHospital?page=register&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
});
$('#goLogin').on("click", function () {
    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
})