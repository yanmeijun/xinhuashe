var hospitalId = sessionStorage.getItem("hosId");
var citySelectName = sessionStorage.getItem("cityName");
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
function load() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        hospitaluid: hospitalId
    };
    $.ajax({
        async: true,
        url: "/sXHospital/getDepartment",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            console.log(data)
            if (data.retCode == "000000") {
                var department = data.responseBody.lists[0];
                var hostList = '';
                /*
                 *渲染医院信息
                 */
                var introduction = department.introduction;
                hostList += '<h1 class="p-q-tit"><img src="/images/icon-return.png" class="icon-return" onclick="back()"/>' + department.doctorName + '</h1>' +
                    '<hr class="hrLine">' +
                    '<div class="peccancyQuery userInfor onlyStyle clearfix">' +
                    '<dl class="hosList hNHosList sXDefaultList">' +
                    '<dt><a href="javascript:;"><img src="' + department.doctorImg + '"></a></dt>' +
                    '<dd class="department">' +
                    '<p class="title">' + department.doctorName + '<span class="titSpan">' + department.yydj + '</span></p>' +
                    '<p class="address shanXAaddress"><i class="icon-address"></i>' + department.address + '</p>' +
                    '<p class="tel"><i class="icon-tel"></i>' + department.yydh + '</p>' +
                    '</dd>' +
                    '</dl>' +
                    '</div>' +
                    '<div class="hospitalDetails">' +
                    '<div class="detailsTit">官网：</div>' +
                    '<p>' + department.website + '</p>' +
                    '<div class="detailsTit">路线：</div>' +
                    '<p>' + department.hosptialLx + '</p>' +
                    '<div class="detailsTit">简介：</div>' +
                    '<p class="indent">' + department.introduction + '</p>' +
                    '</div>';

                $('#hosDetail').html(hostList);
                $('#dialogMask,#dialog').hide();
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}

function back() {
    var url = "/sXHospital?page=selectDepartment&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
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
                var url = "/sXHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=details";
                window.location.href = url;//跳转到对应的页面
            } else {
                if (data.responseBody.errorCode == "110003") {
                    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=details";
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