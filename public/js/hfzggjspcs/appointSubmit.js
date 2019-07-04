$(function () {
    function address() {
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
            url: "/hfzggjspcs/orderAddress",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (res) {
                if (res.retCode == "000000") {
                    var list = JSON.parse(res.responseBody.data).lists;
                    $('#city,#cityTrigger').on("click", function () {
                        $(".mobileSelect").remove();
                        var permissionSelect = new MobileSelect({
                            trigger: "#cityTrigger",
                            title: "请选择办事地点",
                            wheels: [
                                {data: list}
                            ],
                            callback: function () {
                                $('#cityTrigger').css("color","#474747")
                            },
                            position: [1]//初始化定位
                        })
                        $(".mobileSelect").addClass("mobileSelect-show");
                    })

                }
            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        });
    }

    address();
});
$('#next').on("click", function () {
    $('#dialogMask,#dialog').show();
    var name = $('#name').val().trim(),
        phone = $('#phone').val().trim(),
        card = $('#card').val().trim(),
        address = $('#address').val().trim(),
        cityTrigger = $('#cityTrigger').attr("data_id");
    if (!name) {
        $('#dialogMask,#dialog').hide();
        maskTip("请输入姓名");
        return;
    }
    if (!phone) {
        $('#dialogMask,#dialog').hide();
        maskTip("请输入手机号");
        return;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(phone))) {
        $('#dialogMask,#dialog').hide();
        maskTip("请输入正确的手机号");
        return;
    }
    ;
    if (!card) {
        $('#dialogMask,#dialog').hide();
        maskTip("请输入身份证号");
        return;
    } else if (!validateIdCard(card)) {
        $('#dialogMask,#dialog').hide();
        maskTip("身份证号码错误！");
        return;
    }
    if (!address) {
        $('#dialogMask,#dialog').hide();
        maskTip("请输入通讯地址");
        return;
    }
    if (!cityTrigger) {
        $('#dialogMask,#dialog').hide();
        maskTip("请输入办事地点");
        return;
    }
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        contactName: name,
        telePhone: phone,
        idNo: card,
        address: address,
        placeCode: cityTrigger
    };
    $.ajax({
        async: true,
        url: "/hfzggjspcs/orderTime",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            if (res.retCode == "000000") {
                sessionStorage.setItem("time", res.responseBody.data);
                sessionStorage.setItem("contactName", name);
                sessionStorage.setItem("telePhone", phone);
                sessionStorage.setItem("idNo", card);
                sessionStorage.setItem("address", address);
                sessionStorage.setItem("placeCode", cityTrigger);
                sessionStorage.setItem("cityDz", $('#cityTrigger').html())
                var url = "/hfzggjspcs?page=appointment&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;//跳转到对应的页面
                $('#dialogMask,#dialog').hide();
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });

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
        return false;
    }
}