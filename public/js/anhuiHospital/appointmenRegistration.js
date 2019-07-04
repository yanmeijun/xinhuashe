var sourceId = sessionStorage.getItem("sourceId");
var dateTime = sessionStorage.getItem("dateTime");
var period = sessionStorage.getItem("period");
var shopId = sessionStorage.getItem("shopId");
var depaId = sessionStorage.getItem("depaId");
var nsName = sessionStorage.getItem("nsName");
$(function () {
    confirmQuit()
    /**查询动画提示结束*/
    $('#dialogMask,#dialog').show();
    appointment();
    appointmentTime();
})
function appointment() {
    var pageSize = "1000";
    var pageNo = "0";
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageSize: pageSize,
        pageNo: pageNo
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/appointment",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.data) {
                    if (data.responseBody.data.indexOf("login.jsp") != -1) {//跳转到登录页面
                        var url = "/anhuiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                        window.location.href = url;
                    }
                }
                if (data.responseBody.code == "0") {
                    maskTip(data.responseBody.value);
                    return false;
                }
                var friendList = data.responseBody.PAGE;
                var userList = "";
                $.each(friendList, function (i, e) {
                    //判断你是不是自己
                    var isAdult = "";
                    if (e.TYPE == 0) {
                        isAdult = "active";
                        sessionStorage.setItem("name", e.NAME);
                        sessionStorage.setItem("gender", e.GENDER);
                        sessionStorage.setItem("age", e.AGE);
                        sessionStorage.setItem("sfcode", e.SFCODE);
                        sessionStorage.setItem("mobile", e.MOBILE);
                        click_friend(e.NAME, e.GENDER, e.AGE, e.SFCODE, e.ADDRESS, e.MOBILE, e.CARD_NUM, e.G_NAME, e.G_SFCODE, e.G_MOBILE, e.BIRTHDAY, e.IS_ADULT);
                    }
                    var sex = e.GENDER;
                    if (sex != "" && sex == 1) {
                        sex = "男";
                    } else if (sex != "" && sex == 2) {
                        sex = "女";
                    } else {
                        sex = "";
                    }
                    userList += '<div class="jiuZList ' + isAdult + '" onclick=\'click_friend("' + e.NAME + '","' + e.GENDER + '","' + e.AGE + '","' + e.SFCODE + '","' + e.ADDRESS + '","' + e.MOBILE + '","' + e.CARD_NUM + '","' + e.G_NAME + '","' + e.G_SFCODE + '","' + e.G_MOBILE + '","' + e.BIRTHDAY + '","' + e.IS_ADULT + '")\'>' +
                        '<i class="selectPic"></i><span class="icon-default">' + e.NAME + '</span>' +
                        '<div class="y-g-tel">手机：' + plusXing(e.MOBILE, 3, 4) + '</div>' +
                        '<div class="y-g-ID">身份证：' + plusXing(e.SFCODE, 2, 2) + '</div>' +
                        '</div>'
                });
                $(".patientList").empty();
                $(".patientList").append(userList);
                selectPatient();
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}

//亲友信息选择
function selectPatient() {
    $(".jiuZList").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
}
function appointmentTime() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        depaId: depaId,
        sourceId: sourceId,
        dateTime: dateTime,
        period: period,
        shopId: shopId
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/appointmentTime",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.CODE == "1") {
                    maskTip(data.responseBody.MSG);
                    return false;
                }
                var surceInfoList = data.responseBody;
                sessionStorage.setItem("nsId", surceInfoList.NS_ID);
                sessionStorage.setItem("nsName", surceInfoList.NS_NAME);
                sessionStorage.setItem("nsPrice", surceInfoList.NS_PRICE);
                sessionStorage.setItem("depaId", surceInfoList.DEPT_ID);
                sessionStorage.setItem("depaName", surceInfoList.DEPT_NAME);
                sessionStorage.setItem("lockNo", surceInfoList.LOCK_NO);
                sessionStorage.setItem("hosId", surceInfoList.HOS_ID);
                PICK_CARD = surceInfoList.PICK_CARD;
                var html = '';
                html += '<dl class="hosList hNHosList anhuiRegList">' +
                    '<dt><a href="javascript:;">';
                if (surceInfoList.NS_IMAGE) {
                    html += '<img src="' + surceInfoList.NS_IMAGE + '" class="photo">';
                } else {
                    html += '<img src="/images/anhuiHospital/noDoctors.png" class="photo">';
                }
                html += '</a></dt><dd class="y-g">' +
                    '<p class="nameOffice"><span>' + surceInfoList.NS_NAME + '</span>' + surceInfoList.NS_TITLE + '</p>' +
                    '<p class="nameTitle">' + surceInfoList.HOS_NAME + '</p>' +
                    '<p class="keshi">' + surceInfoList.DEPT_NAME + '</p><p class="timeMz"><span>门诊类型：</span><em>' + (surceInfoList.NS_OT == 0 ? "专家门诊" : "普通门诊") + '</em></p>' +
                    '<p class="timeMz"><span>就诊时间：</span><em>' + surceInfoList.NS_RT + '' + surceInfoList.NS_WEEK + '' + (surceInfoList.NS_PERIOD1 == 0 ? "上午" : "下午") + '</em></p>' +
                    '<p class="timeMz"><span>挂号费：</span><em>￥<b>' + surceInfoList.NS_PRICE + '</b>元</em></p></dd></dl>';
                $('#anhuiRegList').html(html);
                var isOk = true;
                var weekdayArr = []
                $.each(surceInfoList.TIMES, function (i, e) {
                    //判断是不是第一个
                    if (e.NS_SN > 0) {
                        var periodSelect = "";
                        if (isOk) {
                            periodSelect = " periodSelect ";
                            $("#nsPeriod").val(e.NS_PERIOD2);
                            $("#nsDoctorseq").val(e.NS_DOCTORSEQ);
                            $('#timeTrigger').html(e.NS_PERIOD2 + '&nbsp;&nbsp;余' + e.NS_SN);
                            $('#timeTrigger').attr("data_id", e.NS_PERIOD2);
                            isOk = false;
                        }
                    }
                    var arr = {};
                    arr["id"] = e.NS_PERIOD2;
                    arr["name"] = e.NS_PERIOD2 + '&nbsp;&nbsp;余' + e.NS_SN;
                    weekdayArr.push(arr);
                });
                $('#timeTrigger,#time').on("click", function () {
                    $(".mobileSelect").remove();
                    var mobileSelect1 = new MobileSelect({
                        trigger: '#timeTrigger',
                        title: '选择就诊时间',
                        wheels: [
                            {data: weekdayArr}
                        ],
                        callback: function (indexArr, data) {
                        	$('#timeTrigger').css("color","#474747")
                        }
                    });
                    $(".mobileSelect").addClass("mobileSelect-show");
                })

            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}
$('#back').on("click", function () {
    if (sessionStorage.getItem("record") == "openDoctorPage") {
        var url = "/anhuiHospital?page=openDoctorPage&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;
    } else {
        var url = "/anhuiHospital?page=appointmentTimeSelect&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;
    }

})
function click_friend(name, sex, age, sfcode, address, mobile, num, jh_name, jh_sfcode, jh_mobile, friendBirthday, isAdult) {
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("gender", sex);
    sessionStorage.setItem("age", age);
    sessionStorage.setItem("sfcode", sfcode);
    sessionStorage.getItem("mobile", mobile);
}

$('#confirm').click(function () {
    if ($('#timeTrigger').attr("data_id") == "") {
        maskTip("请选择就诊时间");
        return false;
    }
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        nsId: sessionStorage.getItem("nsId"),
        nsName: sessionStorage.getItem("nsName"),
        nsPrice: sessionStorage.getItem("nsPrice"),
        depaId: sessionStorage.getItem("depaId"),
        depaName: sessionStorage.getItem("depaName"),
        lockNo: sessionStorage.getItem("lockNo"),
        hosId: sessionStorage.getItem("hosId"),
        nsTime: dateTime,
        nsPeriod: $('#timeTrigger').attr("data_id"),
        nsDoctorseq: "",
        gender: sessionStorage.getItem("gender"),
        urlsearch: sessionStorage.getItem("urlsearch"),
        name: sessionStorage.getItem("name"),
        age: "",
        sfcode: sessionStorage.getItem("sfcode"),
        address: "",
        mobile: sessionStorage.getItem("mobile"),
        friendBirthday: "",
        patientCard: "",
        num: "",
        tzbNum: "",
        jhName: "",
        jhSfcode: "",
        jhMobile: ""
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/orderSuccess",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.code == "1") {
                    maskTip(data.responseBody.value);
                    sessionStorage.setItem("faildInfo", data.responseBody.value);
                    var url = "/anhuiHospital?page=appointmentFailed&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                    window.location.href = url;
                    return false;
                }
                sessionStorage.setItem("orderId", data.responseBody.orderId);
                var url = "/anhuiHospital?page=appointmentSuccess&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
})
//添加就诊人
$('#addPatient').on("click", function () {
    var url = "/anhuiHospital?page=addPatient&randomKey=" + randomKey + "&userID=" + userID +
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmenRegistration";
                    window.location.href = url;
                    return false;
                }
            }
            var url = "/anhuiHospital?page=userCenter&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmenRegistration";
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