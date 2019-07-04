var flag = false, time = new Date().getFullYear();
$('#time').html(time);
if(localFrom == "xinhuashe_app"){
    getInputInfo();
}
//获取回填信息
function getInputInfo() {
    var data = {
        clientID: clientID,
        serviceID: "CAF0004"
    };
    $.ajax({
        async: true,
        type: 'post',
        data: JSON.stringify(data),
        url: '/userLoginInfo/getUserInfo',
        contentType: 'application/json'
    }).done(function (data) {
        $('#name').val(data.xm);
        $('#code').val(data.zjhm)
        $('#codeNum').val(data.ksbh);
        // $('#examTrigger').attr("data_id", data.bkdwdm);
        // $('#cityTrigger').attr("data_id", data.ssdm);
    });
}
/*
 *判断是否有验证码
 */
ifVeryCode();
function ifVeryCode() {
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
        type: "post",
        data: JSON.stringify(parameters),
        url: "/postgraduate/ifVeryCode",
        contentType: 'application/json',
        success: function (data) {
            if (data.responseBody.data) {
                if (data.responseBody.data.indexOf("html") != -1) {
                    $('#veriCodeNum').hide();
                    flag = false;
                } else {
                    $('#veriCodeNum').show();
                    flag = true;
                    getVeryCode();
                }
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}

/*
 *获取验证码
 */
$('#veriCodeImage').on("click", function () {
    getVeryCode();
})
function getVeryCode() {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
    };
    $.ajax({
        async: true,
        type: "post",
        data: JSON.stringify(parameters),
        url: "/postgraduate/getVeryCode",
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                $("#veriCodeImage").attr("src", "http://47.96.254.45/service/" + data.responseBody.data);
            } else {
                $("#veriCodeImage").attr("src", "/images/yanz.png");
                return;
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}

/*
 *点击查询
 */
function getScore() {
    var name = $('#name').val();
    var code = $('#code').val()//
    var codeNum = $('#codeNum').val();
    var city = $('#examTrigger').attr("data_id");
    var exam = $('#cityTrigger').attr("data_id");
    if (!name) {
        masktime("请输入姓名");
        return;
    }
    ;
    if (!code) {
        masktime("请输入证件号码");
        return;
    }
    ;
    if (!codeNum && !city) {
        masktime("准考证号和报考单位至少填一项");
        return;
    }
    ;
    if (!city) {
        city = "";
    } else {
        if (!exam) {
            masktime("请输入报考单位");
            return;
        }
    }
    if (!exam) {
        exam = "";
    }
    var veriCode = $('#veriCode').val();
    if (flag) {
        if (!veriCode) {
            masktime("请输入验证码");
            return;
        }
    }
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        xm: name,
        zjhm: code,//证件号码
        ksbh: codeNum,//准考证号
        ssdm: city,//报考单位所在省市
        bkdwdm: exam,//报考单位
        captcha: veriCode//验证码
    };
    $.ajax({
        async: true,
        type: "post",
        data: JSON.stringify(parameters),
        url: "/postgraduate/getScore",
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {

                var res = JSON.stringify(data.responseBody);
                localStorage.setItem("resultPage", res);
                var url = "/postgraduate?page=resultsPage&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;
            } else if (data.retCode == "000001") {
                if (data.responseBody.errorCode == "900004") {
                    masktime("验证码错误");
                    getVeryCode();
                    return;
                } else {
                    var url = "/postgraduate?page=noQueryResult&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                    window.location.href = url;
                }
                $('#veriCodeNum').show();
                flag = true;
                getVeryCode();
            }
        },
        error: function (err) {
            console.log(err)
        }

    })
};

function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
};
/*
 *报考单位
 */
$("#exam,#examTrigger").on("click", function () {
    Arr = [];
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#examTrigger',
        title: '请选择省市 ',
        wheels: [
            {data: weekdayArr}
        ],
		callback: function () {
		  $('#examTrigger').css("color","#474747")
		}
    });
    $(".mobileSelect").addClass("mobileSelect-show");
});
/*
 *省市
 */
$('#city,#cityTrigger').on("click", function () {
    cityCon()
})

function cityCon() {
    var exam = $('#examTrigger').attr("data_id");
    if (!exam) {
        return;
    }
    var Arr = [];
    for (k in weekdayArr) {
        if (weekdayArr[k].id == exam) {
            Arr = weekdayArr[k].option;
        }
    }
    ;
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#cityTrigger',
        title: '请选择报考单位',
        wheels: [
            {data: Arr}
        ],
		callback: function () {
		  $('#cityTrigger').css("color","#474747")
		}
    });
    $(".mobileSelect").addClass("mobileSelect-show");
}