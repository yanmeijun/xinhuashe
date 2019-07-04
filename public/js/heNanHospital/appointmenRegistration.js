var eidRecord = sessionStorage.getItem("eidRecord");//记录号（从接口3中获取）
var slRecord = sessionStorage.getItem("slRecord")//记录号（从接口3中获取）
$(function () {
    var beGood = sessionStorage.getItem("beGood");
    var appointmen = JSON.parse(sessionStorage.getItem("appointmen"));
    var appointArr = [];
    appointArr.push(appointmen);
    $('#tipCon').html(appointmen.tips);
    $('#timeTrigger').html(appointmen.time.split(' ')[0]);
    var patientArr = appointmen.patient.split(' ');//病人的信息
    var htmls = "<span class=\"icon-default\" >" + patientArr[0] + "</span>" +
        "<div class=\"y-g-tel\">" + patientArr[1] + "</div>" +
        "<div class=\"y-g-ID\">" + patientArr[2] + "</div>"
    $('#patient').html(htmls);
    var html = "";
    $.each(appointArr, function (index, val) {
        var kemz = val.hosName.split(" ")[1];
        var jzhTimes = val.jzhTime.split("-");
        var jzhTime = jzhTimes[0] + "-" + jzhTimes[1] + "-" + jzhTimes[2];
        html += "<dl class='hosList hNHosList'>";
        if (val.img.indexOf("jpg") != -1) {
            html += "<dt><a href=\"javascript:;\"><img src=" + val.img + " class='photo'></a></dt>";
        } else {
            html += "<dt><a href=\"javascript:;\"><img src='images/heNanHospital/nopho.jpg' class='photo'></a></dt>";
        }
        html += "<dd class=\"y-g\">" +
            "<p class=\"nameOffice\"><span>" + val.name + "</span>" + val.mzhlb + "</p>" +
            "<p class=\"introduce\">擅长：" + beGood + "</p>" +
            "<p class=\"times\"><span>" + jzhTime + "</span><span style=\"padding: 0 .2rem;\">" + kemz + "</span><span><em>" + val.ghf + "</em></span></p>" +
            "</dd>" +
            "</dl>";
    })
    $('#HosList').html(html);
    /*
     *就诊时间
     */
    $('#time,#timeTrigger').click(function () {
        var arrTime = appointmen.time.split(' ');
        timeTrigger(arrTime);
    });
    function timeTrigger(arrTime) {
        var weekdayArr = []
        for (k in arrTime) {
            var arr = {};
            arr["id"] = k
            arr["name"] = arrTime[k];
            weekdayArr.push(arr);
        }
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#timeTrigger',
            title: '就诊卡类型',
            wheels: [
                {data: weekdayArr}
            ],
            callback: function () {
                $("#timeTrigger").css("color","rgb(71, 71, 71)");
            }
        });
        $(".mobileSelect").addClass("mobileSelect-show");
    }

    /*
     *初复诊
     */
    $('#diagnosis,#diagnosisTrigger').on('click', function () {
        diagnosisTrigger();
    });
    function diagnosisTrigger() {
        var weekdayArr = [
            {"name": "初诊", "id": "1"},
            {"name": "复诊", "id": "2"}
        ];
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#diagnosisTrigger',
            title: '初诊号',
            wheels: [
                {data: weekdayArr}
            ],
            callback: function (indexArr, data) {
                $("#diagnosisTrigger").css("color","rgb(71, 71, 71)");
                if ($('#diagnosisTrigger').attr("data_id") == "2") {
                    $('#selectCon').show();
                } else {
                    $('#selectCon').hide();
                }
            }
        });
        $(".mobileSelect").addClass("mobileSelect-show");
    };
    /*
     *就诊卡类型
     */
    $('#Visit,#VisitTrigger').click(function () {
        VisitTrigger();
    });
    function VisitTrigger() {
        var weekdayArr = [
            {"name": "医保卡", "id": "01"},
            {"name": "院内就诊卡", "id": "02"}
        ];
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#VisitTrigger',
            title: '就诊卡类型',
            wheels: [
                {data: weekdayArr}
            ],
            callback: function () {
                $("#VisitTrigger").css("color","rgb(71, 71, 71)");
            }
        });
        $(".mobileSelect").addClass("mobileSelect-show");
    };
    /*
     *获取验证码
     */
    $('#veriCodeImg').on("click", function () {
        ajax()
    });
    $("#veriCodeImg").trigger("click");

});
/*
 *返回按钮
 */
function back() {
    var url = "/heNanHospital?page=departmentRegister&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
/*
 *点击确定预约
 */
function sure() {
    var validate = $('#validate').val();
    if (!validate) {
        maskTip("请输入验证码");
        return;
    }
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        validate: validate,//验证码
        cfz: $('#diagnosisTrigger').attr("data_id"),//初复诊选择（1为初诊，2为复诊）
        schdid: slRecord,//记录号，与接口3中的sl一致
        expert: eidRecord,//记录号，与接口3中的eid一致
        person: 0,//可选择的联系人（默认值为0）
        jzktype: $('#VisitTrigger').attr("data_id"),//就诊卡类型（01为医保卡，02为院内就诊卡）
        jzkno: $('#cardPerson').val() || ""//就诊卡号
    };
    $.ajax({
        type: "post",
        url: "/heNanHospital/getInfo",
        async: true,
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if (res.retCode == "000000") {
                sessionStorage.setItem("reservation", JSON.stringify(res.responseBody));
                var url = "/heNanHospital?page=reservationDetail&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;
            } else {
                if (res.responseBody.data) {
                    maskTip(res.responseBody.data);
                    return;
                }
                maskTip(res.responseBody.errorMsg);
                return;
            }
            if (res.rtnCode == "000000") {
                maskTip("脚本执行异常");
                return;
            }
        },
        error: function () {
            maskTip("请求异常，请稍后");
            return;
        }
    });
};
/*
 *获取请求
 */
function ajax() {
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
        url: "/heNanHospital/verifycode",
        async: true,
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            $("#veriCodeImg").attr('src', res);
        },
        error: function () {
            maskTip("验证码获取失败");
            return;
        }
    })
}
/*
 *查询预约记录
 */
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
$("#userCenter li").on("click", function (event) {
    event.stopPropagation();
});
//点击挂号记录，判断是否登陆，再跳转页面
$("#record").on("click", function (event) {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        p: 1,//页码（默认值为1）
        yys: "",//预约开始时间
        yye: "",//预约结束时间
        state: 0//预约状态（默认值为0）
    };
    $.ajax({
        async: true,
        type: 'post',
        url: "/heNanHospital/getDetail",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (data) {
            if (data.rtnCode == "000000") {
                if (data.data.datail) {
                    var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmenRegistration";
                    window.location.href = url;
                }
            }
            /*
             *登录后跳转页面
             */
            if (data.retCode == "000000") {
                if (!data.responseBody.scdlsj) {
                    var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmenRegistration";
                    window.location.href = url;
                    return;
                }
                var url = "/heNanHospital?page=registeredRecord&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmenRegistration";
                window.location.href = url;
            }
        }
    })
});
/*
 *点击退出
 */
$('#quit').on("click", function () {
    maskTip("退出中。。。");
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
        url: "/heNanHospital/addPeople",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var url = "/heNanHospital?page=heNanHospital&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;
            } else {
                maskTip("未登陆或已退出");
                return;
            }
        },
        error: function () {
            maskTip("请求异常");
            return;
        }
    })
})