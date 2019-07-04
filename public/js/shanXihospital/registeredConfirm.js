var id = sessionStorage.getItem("id");
var periodname = sessionStorage.getItem("periodname");
var price = sessionStorage.getItem("price");
var workid = sessionStorage.getItem("workid");
var workrank = sessionStorage.getItem("workrank");
var workdate = sessionStorage.getItem("workdate");
var configurl = sessionStorage.getItem("conUrlPm");
var hospitaluid = sessionStorage.getItem("hospitaluid");
var citySelectName = sessionStorage.getItem("cityName");
var comefrom = sessionStorage.getItem("comefromBack");
/*
 *返回按钮
 */

$('#backhistory').on("click", function () {
    if (comefrom == "sXHospital") {
        var url = "/sXHospital?page=appointmenSelect&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=sXHospital";
        window.location.href = url;//跳转到对应的页面
        return;
    } else {
        var url = "/sXHospital?page=appointmenSelect&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comefrom;
        window.location.href = url;//跳转到对应的页面
        return;
    }

})
$(function () {
    if (citySelectName) {
        $('#cityName').html(citySelectName);
    } else {
        $('#cityName').html(cityName);
    }
    //获取验证码
    var velidate, commitStatus = true;
    $("#veriCodeImg").on("click", function (event) {
        var parameters = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            Round: Math.random()
        };
        $.ajax({
            async: true,
            url: "/sXHospital/Verification",
            type: "post",
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
    });
    $("#veriCodeImg").trigger("click");
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();
    load();
});


function confirmAppointment() {
};
/*
 * 确认预约
 */
$('#getBtn').on("click", function () {
    var hospitalname = sessionStorage.getItem("hospitalname");
    var doctorname = sessionStorage.getItem("doctorname");
    var deptname = sessionStorage.getItem("deptname");

    var doc = $('#doctoCar').val();
    var car = $('#cardNumber').val();
    if ($('#downPlac').attr("data_id") == undefined) {
        maskTip("未选择就诊时间!");
        return;
    }
    if ($('#veri').val() == '') {
        maskTip("请输入图片验证码");
        return;
    }
    if (!$('input[name="smsradio"]:checked')) {
        maskTip("请同意用户协议");
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
        jzr_xz: "",
        showerrorinfo: "预约挂号成功",
        noplace: "",//医院地址
        orderid: "52720008116",//挂号订单号
        resid: $("#downPlac").attr("data_id"),
        commonpeopleid: $('input[name="checkbox"]:checked').val(),
        treattype: $("#treattypePlac").attr("data_id"),//初诊
        mtype: $("#mtypePlac").attr("data_id"),//选择医保类型
        validatecode: $('#veri').val(),
        qr: $('input[name="smsradio"]:checked').val(),//用户协议
        qryy: "确认预约",
        workid: workid,
        configurl: configurl,
        hospitaluid: hospitaluid,//医院的id
        hospitalname: hospitalname,
        doctorname: doctorname,
        deptname: deptname,
        periodname: periodname,
        price: price,
        workdate: workdate,
        workrank: workrank,
        cphone: $('input[name="checkbox"]:checked').attr("main-val"),
        starttime: $("#downPlac").text(),
        jzrname: $('input[name="checkbox"]:checked').attr("main-name")
    };
    $.ajax({
        async: true,
        url: "/sXHospital/confirmAppointment",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                $('#dialogMask,#dialog').show();
                sessionStorage.setItem("resid", $("#downPlac").attr("data_id"));
                sessionStorage.setItem("commonpeopleid", $('input[name="checkbox"]:checked').val());
                sessionStorage.setItem("treattype", $("#treattypePlac").attr("data_id"));
                sessionStorage.setItem("mtype", $("#mtypePlac").attr("data_id"));
                sessionStorage.setItem("validatecode", $('#veri').val());
                var url = "/sXHospital?page=appointmentDetails&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comefrom;
                window.location.href = url;//跳转到对应的页面
            } else {
                if (data.responseBody.errorMsg == undefined) {
                    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
                    window.location.href = url;//跳转到对应的页面
                    return;
                } else {
                    sessionStorage.setItem("Fail", data.responseBody.errorMsg);
                    var url = "/sXHospital?page=appointmentFailed&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comefrom;
                    window.location.href = url;//跳转到对应的页面
                }

            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
            alert('Ajax error!请刷新页面重新请求')
        }
    })
});

function addPatient() {
    sessionStorage.setItem("comeFrom", comefrom);
    var url = "/sXHospital?page=addPatient&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
};
function load() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        id: id,
        workid: workid,
        accesstype: "1",
        price: price,
        periodname: periodname,
        workdate: workdate,
        workrank: workrank
    };
    $.ajax({
        async: true,
        url: "/sXHospital/appointment",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                var doctorlist = data.responseBody.lists;
                var doctorItem = data.responseBody.jzrInformation;
                var htmls = "";
                var httpReg = doctorlist.doctorImg;
                htmls += '<dl class="hosList hNHosList sXHosList">' +
                    '<dt><a href="javascript:;">';
                if (httpReg.indexOf("http") == -1) {
                    htmls += '<img src="http://www.sxyygh.com/' + doctorlist.doctorImg + '" class="photo">';
                } else {
                    htmls += '<img src="' + doctorlist.doctorImg + '" class="photo">';
                }
                htmls += '</a></dt>' +
                    '<dd>' +
                    '<p class="nameOffice"><span>' + doctorlist.doctorName + '</span>' + doctorlist.doctorWork + '</p>' +
                    '<p class="hospitalName">' + doctorlist.doctorHospital + '---' + doctorlist.doctorMz + '</p>' +
                    '<p class="introduce color47">' + doctorlist.jzsj + '参考费用：<span class="color-fa6e08">￥' + doctorlist.cost + '</span></p>' +
                    '</dd>' +
                    '</dl>';
                $('#inforConfirm').html(htmls);//


                sessionStorage.setItem("hospitalname", doctorlist.doctorHospital);
                sessionStorage.setItem("doctorname", doctorlist.doctorName);
                sessionStorage.setItem("deptname", doctorlist.doctorMz);

                // 添加就诊人
                var doctorItemhtml = "";
                $.each(doctorItem, function (index, val) {
                    doctorItemhtml += '<div class="jiuZList padTop">' +
                        '<span class="icon-default">' +
                        '<input type="radio" value="' + val.jzrInfo + '" name="checkbox" main-val="' + val.jzrPhone + '" main-name="' + val.jzrName + '">' +
                        '<i class="icon-check"></i>' + val.jzrName +
                        '</span>' +
                        '<div class="y-g-tel">手机：' + val.jzrPhone + '</div>' +
                        '<div class="y-g-ID">身份证：' + val.jzrCard + '</div>' +
                        '</div>';
                })
                doctorItemhtml += '<div class="addPatient" onclick="addPatient()" style="font-size: 16px;">+ 添加就诊人</div>';
                sessionStorage.setItem("jzrNum", doctorItem.length);
                $('#docItem').html(doctorItemhtml);
                $('#docItem .icon-default').find('input[name="checkbox"]').get(doctorItem.length - 1).checked = true;
                addName(data.responseBody.visitTime);//调用插件
                treattype(data.responseBody.jzlx);
                mtype(data.responseBody.yblx);
                /*请选择医保类型*/
            } else {
                var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmenSelect";
                window.location.href = url;//跳转到对应的页面
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
            alert('Ajax error!请刷新页面重新请求')
        }
    })
}

/*请选择就诊时间*/
function addName(datas) {
    $(".mobileSelect").remove();
    var weekdayArr = [];
    $.each(datas, function (index, val) {
        var arr = {};
        arr["id"] = val.resid
        arr["name"] = val.jzsj;
        weekdayArr.push(arr);
    });
    $('#downMenu,#downPlac').on("click", function () {
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#downPlac',
            title: '请选择就诊时间',
            wheels: [
                {data: weekdayArr}
            ],
			callback: function () {
			  $('#downPlac').css("color","#474747")
			}
        })
        $(".mobileSelect").addClass("mobileSelect-show");
    })
}

/*初诊*/
function treattype(weekdayArr) {
    $(".mobileSelect").remove();
    $('#treattypeMenu,#treattypePlac').on("click", function () {
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#treattypePlac',
            title: '请选择初诊',
            wheels: [
                {data: weekdayArr}
            ],
			callback: function () {
			  $('#treattypePlac').css("color","#474747")
			}
        })
        $(".mobileSelect").addClass("mobileSelect-show");
    })
}
/*请选择医保类型*/
function mtype(weekdayArr) {
    $(".mobileSelect").remove();
    $('#mtypeMenu,#mtypePlac').on("click", function () {
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#mtypePlac',
            title: '请选择医保类型',
            wheels: [
                {data: weekdayArr}
            ],
			callback: function () {
			  $('#mtypePlac').css("color","#474747")
			}
        })
        $(".mobileSelect").addClass("mobileSelect-show");
    })
}

$('#userAvatarBox').on("click", function () {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        id: id,//
        workid: workid,//
        accesstype: "1",
        price: price,
        periodname: periodname,
        workdate: workdate,
        workrank: workrank
    };
    $.ajax({
        async: true,
        url: "/sXHospital/appointment",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var url = "/sXHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
                window.location.href = url;//跳转到对应的页面
            } else {
                var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
                window.location.href = url;//跳转到对应的页面
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
});
