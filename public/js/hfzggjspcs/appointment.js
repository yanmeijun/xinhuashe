var contactName = sessionStorage.getItem("contactName");
var telePhone = sessionStorage.getItem("telePhone");
var idNo = sessionStorage.getItem("idNo");
var address = sessionStorage.getItem("address");
var placeCode = sessionStorage.getItem("placeCode");
var cityDz = sessionStorage.getItem("cityDz");

$(function () {
    $('#contactName').html(contactName);
    $('#telePhone').html(telePhone);
    $('#idNo').html(idNo);
    $('#address').html(cityDz);
})
var arr = JSON.parse(sessionStorage.getItem("time"));
$("#timeDate,#timeDateTrigger").click(function () {
    $(".mobileSelect").remove();
    var permissionSelect = new MobileSelect({
        trigger: "#timeDateTrigger",
        title: "请选择时间段",
        wheels: [
            {data: arr.reserveTime}
        ],
        callback: function () {
            $('#timeDateTrigger').css("color","#474747")
        },
        position: [0]//初始化定位
    })
    $(".mobileSelect").addClass("mobileSelect-show");
})
$('#back').on("click", function () {
    var url = "/hfzggjspcs?page=fillInfo&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
});
$("#time,#timeTrigger").click(function () {
    $(".mobileSelect").remove();
    var permissionSelect = new MobileSelect({
        trigger: "#timeTrigger",
        title: "请选择预约日期",
        wheels: [
            {data: arr.reserveDate}
        ],
        callback: function () {
            $('#timeTrigger').css("color","#474747")
        },
        position: [0]//初始化定位
    })
    $(".mobileSelect").addClass("mobileSelect-show");
});
$('#submit').on("click", function () {
    if (!$('#timeTrigger').attr("data_id")) {
        maskTip("请选择预约日期");
        return;
    }
    if (!$('#timeDateTrigger').attr("data_id")) {
        maskTip("请选择时间段");
        return;
    }
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        reserveDate: $('#timeTrigger').attr("data_id"),
        reserveTime: $('#timeDateTrigger').attr("data_id"),
        applyId: arr.applyId
    };
    $.ajax({
        async: true,
        url: "/hfzggjspcs/confirmOrder",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            sessionStorage.setItem("orderInfor", res.responseBody.data);
            if (res.retCode == "000000") {
                var url = "/hfzggjspcs?page=appointmentSuccess&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;//跳转到对应的页面
            } else {
                var url = "/hfzggjspcs?page=appointmentFailed&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;//跳转到对应的页面
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
})