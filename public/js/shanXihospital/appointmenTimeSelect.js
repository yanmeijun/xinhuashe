var insur_swiper = new Swiper('.btm-swiper-container', {
    slidesPerView: 'auto',
    paginationClickable: true,
    spaceBetween: 20
});
var deptuid = sessionStorage.getItem('keshiId');//获取科室的id
var keshiName = sessionStorage.getItem('keshiName');
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
    load()
});


function load() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        deptuid: deptuid
    };
    $.ajax({
        async: true,
        url: "/sXHospital/getSurplus",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.lists.length == 0) {
                    var htmls = "";
                    htmls += '<div class="peccancyQuery userInfor onlyStyle clearfix">' +
                        '<dl class="hosList hNHosList sXHosList">' +
                        '<dd class="doctorsInfo yyTimeS"><p class="hospitalName">无符合条件的医生</p></dd>' +
                        '</dl>' +
                        '</div>';
                    $('#doctorList').html(htmls);

                } else {
                    var doctorList = data.responseBody.lists;
                    var html = "";
                    keshiName = data.responseBody.lists[0].hosName + "--" + data.responseBody.lists[0].doctorMz;
                    $('#keshiName').html(keshiName);
                    $.each(doctorList, function (index, val) {
                        var httpReg = val.doctorImg;
                        html += '<div class="peccancyQuery userInfor onlyStyle clearfix">' +
                            '<dl class="hosList hNHosList sXHosList">' +
                            '<dt>' +
                            '<a href="javascript:;" onclick="onlyHosScreen(\'' + val.doctorId + '\')">';
                        if (httpReg.indexOf("http") == -1) {
                            html += '<img src="http://www.sxyygh.com/' + val.doctorImg + '" class="photo">';
                        } else {
                            html += '<img src="' + val.doctorImg + '" class="photo">';
                        }
                        html += '</a>' +
                            '</dt>' +
                            '<dd class="doctorsInfo yyTimeS">' +
                            '<p class="nameOffice">' +
                            '<span onclick="onlyHosScreen(\'' + val.doctorId + '\')">' + val.doctorName + '</span>' + val.doctorWork + '<a href="javascript:;" class="btn-guahao yyray" onclick="onlyHosScreen(\'' + val.doctorId + '\')">' + val.yygh + '</a>' +
                            '</p>' +
                            '<p class="hospitalName">' + val.doctorMz + '<span class="yy-remaining">' + val.cost + '</span></p>' +
                            '<p class="introduce timeSelect" onclick="onlyHosScreen(\'' + val.doctorId + '\')" >' + val.hosSpecialty + '</p>' +
                            '</dd>' +
                            '</dl>' +
                            '</div>';
                    })
                }
                $('#doctorList').html(html);
            }


//            就诊日期
            var visitTime = "";
            visitTime += '<div class="swiper-slide"><table class="reservationList sDTableData"><tr>';
            visitTime += '<th >就诊<br>日期</th>';

            for (var i = 0; i < 7; i++) {
                visitTime += '<th  onclick="hospitalScreen(\'' + data.responseBody.list2[i].deptuid + '\',\'' + data.responseBody.list2[i].enddate + '\')">' + data.responseBody.list2[i].riTime.split(" ")[0] + '<br>' + data.responseBody.list2[i].riTime.split(" ")[1] + '</th>'
            }
            ;
            visitTime += '</tr></table>' +
                '</div>';
            if (data.responseBody.list2.length > 7 && data.responseBody.list2.length < 15) {
                // for(var i=0;i<2;i++){
                visitTime += '<div class="swiper-slide"><table class="reservationList sDTableData"><tr>';
                for (var j = 7; j < 15; j++) {
                    visitTime += '<th   onclick="hospitalScreen(\'' + data.responseBody.list2[j].deptuid + '\',\'' + data.responseBody.list2[j].enddate + '\')">' + data.responseBody.list2[j].riTime.split(" ")[0] + '<br>' + data.responseBody.list2[j].riTime.split(" ")[1] + '</th>'
                }
                visitTime += '</tr></table>' +
                    '</div>';
                //  };

            } else {
                visitTime += '<div class="swiper-slide"><table class="reservationList sDTableData"><tr>';
                for (var j = 7; j < 15; j++) {
                    visitTime += '<th onclick="hospitalScreen(\'' + data.responseBody.list2[j].deptuid + '\',\'' + data.responseBody.list2[j].enddate + '\')">' + data.responseBody.list2[j].riTime.split(" ")[0] + '<br>' + data.responseBody.list2[j].riTime.split(" ")[1] + '</th>'
                }
                visitTime += '</tr></table>' +
                    '</div>';

                visitTime += '<div class="swiper-slide"><table class="reservationList sDTableData"><tr>';
                for (var j = 15; j < data.responseBody.list2.length; j++) {
                    visitTime += '<th  onclick="hospitalScreen(\'' + data.responseBody.list2[j].deptuid + '\',\'' + data.responseBody.list2[j].enddate + '\')">' + data.responseBody.list2[j].riTime.split(" ")[0] + '<br>' + data.responseBody.list2[j].riTime.split(" ")[1] + '</th>'
                }
                visitTime += '</tr></table>' +
                    '</div>';
            }
            $('#visitTime').html(visitTime);
            new Swiper('.btm-swiper-container', {
                paginationClickable: true,
                spaceBetween: 20
            });
            $('#dialogMask,#dialog').hide();

        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}


function hospitalScreen(deptuid, enddate) {
    $('#dialogMask,#dialog').show();
    $('#doctorList').html("");
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        deptuid: deptuid,
        cityid: "",
        hosptype: "",
        doctorrankid: "",
        commonid: "",
        hospitaluid: "",
        startdate: enddate,
        enddate: enddate
    };
    $.ajax({
        async: true,
        url: "/sXHospital/getPicCode",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.result) {
                    $('#errorConent').html(data.responseBody.result);
                    $('#errorConent').css({"font-size": ".28rem", "text-align": "center", "line-height": "1.6rem"});
                    $('#errorConent').show();
                    $('#dialogMask,#dialog').hide();
                    return;
                }
                ;
                $('#errorConent').html("");
                $('#errorConent').hide();
                var doctorList = data.responseBody.lists;
                var html = "";
                $.each(doctorList, function (index, val) {
                    var httpReg = val.doctorImg;
                    html += '<div class="peccancyQuery userInfor onlyStyle clearfix">' +
                        '<dl class="hosList hNHosList sXHosList">' +
                        '<dt><a href="javascript:;" onclick="onlyHosScreen(\'' + val.doctorId + '\')">';
                    if (httpReg.indexOf("http") == -1) {
                        html += '<img src="http://www.sxyygh.com/' + val.doctorImg + '" class="photo">';
                    } else {
                        html += '<img src="' + val.doctorImg + '" class="photo">';
                    }
                    html += '</a></dt>' +
                        '<dd class="doctorsInfo yyTimeS">' +
                        '<p class="nameOffice">' +
                        '<span onclick="onlyHosScreen(\'' + val.doctorId + '\')">' + val.doctorName + '</span>' + val.doctorWork + '<a href="javascript:;" class="btn-guahao yyray" onclick="onlyHosScreen(\'' + val.doctorId + '\')">' + val.yygh + '</a>' +
                        '</p>' +
                        '<p class="hospitalName">' + val.doctorMz + '<span class="yy-remaining">' + val.cost + '</span></p>' +
                        '<p class="introduce timeSelect" onclick="onlyHosScreen(\'' + val.doctorId + '\')">' + val.hosSpecialty + '</p>' +
                        '</dd>' +
                        '</dl>' +
                        '</div>';
                })
            }
            $('#doctorList').html(html);
            $('#dialogMask,#dialog').hide();

        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}

function onlyHosScreen(doctorId) {
    sessionStorage.setItem('doctorId', doctorId);//
    var url = "/sXHospital?page=appointmenSelect&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmenTimeSelect";
    window.location.href = url;//跳转到对应的页面
}

$('#back').on("click", function () {
    var url = "/sXHospital?page=selectDepartment&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
});

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
                var url = "/sXHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmenTimeSelect";
                window.location.href = url;//跳转到对应的页面
            } else {
                if (data.responseBody.errorCode == "110003") {
                    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmenTimeSelect";
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