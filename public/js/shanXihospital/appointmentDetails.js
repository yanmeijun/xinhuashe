var citySelectName = sessionStorage.getItem("cityName");
var comeFroms = sessionStorage.getItem("comeFrom");
$(function () {
    if (citySelectName) {
        $('#cityName').html(citySelectName);
    } else {
        $('#cityName').html(cityName);
    }
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();
    load();
});
var resid = sessionStorage.getItem("resid");
var commonpeopleid = sessionStorage.getItem("commonpeopleid");
var treattype = sessionStorage.getItem("treattype");
var mtype = sessionStorage.getItem("mtype");
var validatecode = sessionStorage.getItem("validatecode");
var workid = sessionStorage.getItem("workid");
function load() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        jzr_xz: "",
        resid: resid,
        commonpeopleid: commonpeopleid,
        treattype: treattype,//初诊
        mtype: mtype,//选择医保类型
        validatecode: validatecode,
        workid: workid,
        qr: "1"//用户协议
    };
    $.ajax({
        async: true,
        url: "/sXHospital/appointmentDetail",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                var html = "";
                html += "<div class=\"reserve-title successMsg-remind\">" +
                    "<span style=\"width:27%;margin-left: 0\">" + data.responseBody.lists.yySuccess + "</span>" +
                    "<span>" + data.responseBody.lists.yyInfo.replace("，请关注以下内容。", "") + "</span>" +
                    "</div>" +
                    "<div class=\"reservationDetails\">" +
                    "<ul>" +
                    "<li><em></em><label>预约号：</label><span>" + data.responseBody.lists.yyh + "</span></li>" +
                    "<li><em></em><label>就诊人：</label><span>" + data.responseBody.lists.jzr.replace("：", "") + "</span></li>" +
                    "<li><em></em><label>预约医生：</label><span class=\"color0083e0\">" + data.responseBody.lists.yyys.replace("：", "") + "</span></li>" +
                    "<li><em></em><label>就诊时间：</label><span>" + data.responseBody.lists.jzsj.replace("：", "") + "</span></li>" +
                    "<li><em></em><label>参考费用：</label><span><b>￥" + data.responseBody.lists.ckfy.replace("：", "") + "</b>元</span></li>" +
                    "<li><em></em><label>取号地点：</label><span>" + data.responseBody.lists.qhdd.replace("：", "") + "</span></li>" +
                    "</ul>" +
                    "</div>";
                $('#successAppointment').html(html);
            } else {

            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
            alert('Ajax error!请刷新页面重新请求')
        }
    })
}
$('#back').on("click", function () {
    var url = "/sXHospital?page=registeredConfirm&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFroms;
    ;
    window.location.href = url;//跳转到对应的页面
})


$('#userAvatarBox,#lookHistory').on("click", function () {
    $('#dialogMask,#dialog').show();
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
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                var url = "/sXHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmentDetails";
                window.location.href = url;//跳转到对应的页面
            } else {
                if (data.responseBody.errorCode == "110003") {
                    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmentDetails";
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

