var citySelectName = sessionStorage.getItem("cityName");
var comeFroms = sessionStorage.getItem("comeFrom");
$(function () {
    if (citySelectName) {
        $('#cityName').html(citySelectName);
    } else {
        $('#cityName').html(cityName);
    }
});
var failInfo = sessionStorage.getItem("Fail");
$('#failInfo').html(failInfo);
$('#back').on("click", function () {
    var url = "/sXHospital?page=registeredConfirm&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFroms;
    ;
    window.location.href = url;//跳转到对应的页面
})


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
                var url = "/sXHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmentFailed";
                window.location.href = url;//跳转到对应的页面
            } else {
                if (data.responseBody.errorCode == "110003") {
                    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmentFailed";
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
