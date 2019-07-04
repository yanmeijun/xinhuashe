var doctorId = sessionStorage.getItem('doctorId');//获取科室的id
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
    load(doctorId)
});


function load(doctorId) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        id: doctorId
    };
    $.ajax({
        async: true,
        url: "/sXHospital/getHospDetail",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            console.log(data)
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                var doctorList = data.responseBody.lists;
                var html = "";
                keshiName = data.responseBody.lists[0].docutorHospital + "--" + data.responseBody.lists[0].doctorMz;
                $('#keshiName').html(keshiName);
                $.each(doctorList, function (index, val) {
                    var httpReg = val.doctorImg;
                    sessionStorage.setItem("hospitaluid", val.hospitaluid);
                    html += '<dl class="hosList hNHosList sXHosList">' +
                        '<dt><a href="javascript:;">';
                    if (httpReg.indexOf("http") == -1) {
                        html += '<img src="http://www.sxyygh.com/' + val.doctorImg + '" class="photo">';
                    } else {
                        html += '<img src="' + val.doctorImg + '" class="photo">';
                    }
                    html += '</a></dt>' +
                        '<dd class="doctorsInfo yyTimeS"><p class="nameOffice">' +
                        '<span>' + val.doctorName + '</span>' + val.doctorWork + '</p>' +
                        '<p class="hospitalName">' + val.docutorHospital + '--' + val.doctorMz + '</p>' +
                        '<p class="introduce">' + val.hosTreatment + '</p>' +
                        '</dd>' +
                        '</dl>' +
                        '<div class="moreDetails">' +
                        '<p>' + val.business + '</p>' +
                        '<p>' + val.hosSpecialty + '</p>' +
                        '</div>';
                })
                $('#doctorList').html(html);


//            就诊日期
                var visitTime = "";
                var amT = "上午", pmT = "下午";
                visitTime += '<div class="swiper-slide"><table class="reservationList sDTableData">';
                visitTime += '<tr>';
                for (var i = 0; i < 8; i++) {
                    if (data.responseBody.list2[i].tiTime) {
                        visitTime += '<th >' + data.responseBody.list2[i].tiTime.split(" ")[0] + '<br>' + data.responseBody.list2[i].tiTime.split(" ")[1] + '</th>';
                    } else {
                        visitTime += '<th></th>';
                    }

                }
                ;
                visitTime += '</tr>';
                //            第二个
                visitTime += '<tr style="font-size: 20px;">';
                for (var i = 0; i < 8; i++) {
                    if (data.responseBody.list2[i].am == "预约") {
                        visitTime += '<td  onclick="makeApp(\'' + data.responseBody.list2[i].idAm + '\',\'' + amT + '\',\'' + data.responseBody.list2[i].priceAm + '\',\'' + data.responseBody.list2[i].workidAm + '\',\'' + data.responseBody.list2[i].workrankAm + '\',\'' + data.responseBody.list2[i].workdateAm + '\',\'' + data.responseBody.list2[i].conUrl + '\')">' + data.responseBody.list2[i].am + '</td>';
                    } else {
                        visitTime += '<td >' + data.responseBody.list2[i].am + '</td>';
                    }

                }
                ;
                visitTime += '</tr>';
//            第三个
                visitTime += '<tr style="font-size: 20px;">';
                for (var i = 0; i < 8; i++) {
                    if (data.responseBody.list2[i].pm == "预约") {
                        visitTime += '<td  onclick="makeApp(\'' + data.responseBody.list2[i].idPm + '\',\'' + pmT + '\',\'' + data.responseBody.list2[i].pricePm + '\',\'' + data.responseBody.list2[i].workidPm + '\',\'' + data.responseBody.list2[i].workrankPm + '\',\'' + data.responseBody.list2[i].workdatePm + '\',\'' + data.responseBody.list2[i].conUrlPm + '\')">' + data.responseBody.list2[i].pm + '</td>';
                    } else {
                        visitTime += '<td >' + data.responseBody.list2[i].pm + '</td>';
                    }

                }
                ;
                visitTime += '</tr>';
//            第四个
                if (data.responseBody.list2[0].allTime) {
                    visitTime += '<tr style="font-size: 20px;">';
                    for (var i = 0; i < 8; i++) {
                        if (data.responseBody.list2[i].allTime.indexOf("预约") != -1) {
                            var allT = "全天"
                            var idAllTime = "idAllTime", priceAllTime = "priceAllTime", workidAllTime = "workidAllTime", workrankAllTime = "workrankAllTime", conUrlAllTime = "conUrlAllTime", workdateAllTime = "workdateAllTime";
                            visitTime += '<td>';
                            for (var j = 0; j < data.responseBody.list2[i].allTimeNum; j++) {
                                visitTime += '<span onclick="makeApp(\'' + data.responseBody.list2[i][idAllTime + j] + '\',\'' + allT + '\',\'' + data.responseBody.list2[i][priceAllTime + j] + '\',\'' + data.responseBody.list2[i][workidAllTime + j] + '\',\'' + data.responseBody.list2[i][workrankAllTime + j] + '\',\'' + data.responseBody.list2[i][workdateAllTime + j] + '\',\'' + data.responseBody.list2[i][conUrlAllTime + j] + '\')">' +
                                    '预约</span><br>';
                            }
                            visitTime += '</td>';
                        } else {
                            visitTime += '<td >' + data.responseBody.list2[i].allTime + '</td>';
                        }

                    }
                    visitTime += '</tr>';
                }
                ;
                visitTime += '</table>' +
                    '</div>';

                if (data.responseBody.list2.length > 8 && data.responseBody.list2.length < 16) {
                    visitTime += '<div class="swiper-slide"><table class="reservationList sDTableData">';
                    visitTime += '<tr>';
                    for (var i = 8; i < 16; i++) {
                        visitTime += '<th >' + data.responseBody.list2[i].tiTime.split(" ")[0] + '<br>' + data.responseBody.list2[i].tiTime.split(" ")[1] + '</th>';
                    }
                    ;
                    visitTime += '</tr>';
                    //            第二个
                    visitTime += '<tr style="font-size: 20px;">';
                    for (var i = 8; i < 16; i++) {
                        if (data.responseBody.list2[i].am == "预约") {
                            visitTime += '<td onclick="makeApp(\'' + data.responseBody.list2[i].idAm + '\',\'' + amT + '\',\'' + data.responseBody.list2[i].priceAm + '\',\'' + data.responseBody.list2[i].workidAm + '\',\'' + data.responseBody.list2[i].workrankAm + '\',\'' + data.responseBody.list2[i].workdateAm + '\',\'' + data.responseBody.list2[i].conUrl + '\')">' + data.responseBody.list2[i].am + '</td>';
                        } else {
                            visitTime += '<td>' + data.responseBody.list2[i].am + '</td>';
                        }
                    }
                    ;
                    visitTime += '</tr>';
//            第三个
                    visitTime += '<tr style="font-size: 20px;">';
                    for (var i = 8; i < 16; i++) {
                        if (data.responseBody.list2[i].pm == "预约") {
                            visitTime += '<td onclick="makeApp(\'' + data.responseBody.list2[i].idPm + '\',\'' + pmT + '\',\'' + data.responseBody.list2[i].pricePm + '\',\'' + data.responseBody.list2[i].workidPm + '\',\'' + data.responseBody.list2[i].workrankPm + '\',\'' + data.responseBody.list2[i].workdatePm + '\',\'' + data.responseBody.list2[i].conUrlPm + '\')">' + data.responseBody.list2[i].pm + '</td>';
                        } else {
                            visitTime += '<td >' + data.responseBody.list2[i].pm + '</td>';
                        }
                    }
                    ;
                    visitTime += '</tr>';
//            第四个
                    if (data.responseBody.list2[0].allTime) {
                        visitTime += '<tr style="font-size: 20px;">';
                        for (var i = 8; i < 16; i++) {
                            if (data.responseBody.list2[i].allTime.indexOf("预约") != -1) {
                                var allT = "全天"
                                var idAllTime = "idAllTime", priceAllTime = "priceAllTime", workidAllTime = "workidAllTime", workrankAllTime = "workrankAllTime", conUrlAllTime = "conUrlAllTime", workdateAllTime = "workdateAllTime";
                                visitTime += '<td >';
                                for (var j = 0; j < data.responseBody.list2[i].allTimeNum; j++) {
                                    visitTime += '<span onclick="makeApp(\'' + data.responseBody.list2[i][idAllTime + j] + '\',\'' + allT + '\',\'' + data.responseBody.list2[i][priceAllTime + j] + '\',\'' + data.responseBody.list2[i][workidAllTime + j] + '\',\'' + data.responseBody.list2[i][workrankAllTime + j] + '\',\'' + data.responseBody.list2[i][workdateAllTime + j] + '\',\'' + data.responseBody.list2[i][conUrlAllTime + j] + '\')">' +
                                        '预约</span><br>';
                                }
                                visitTime += '</td>';
                            } else {
                                visitTime += '<td >' + data.responseBody.list2[i].allTime + '</td>';
                            }

                        }
                        visitTime += '</tr>';
                    }
                    ;
                    visitTime += '</table>' +
                        '</div>';
                } else {
                    visitTime += '<div class="swiper-slide"><table class="reservationList sDTableData">';
                    visitTime += '<tr>';
                    for (var i = 8; i < 16; i++) {
                        visitTime += '<th >' + data.responseBody.list2[i].tiTime.split(" ")[0] + '<br>' + data.responseBody.list2[i].tiTime.split(" ")[1] + '</th>';
                    }
                    ;
                    visitTime += '</tr>';
                    //            第二个
                    visitTime += '<tr style="font-size: 20px;">';
                    for (var i = 8; i < 16; i++) {
                        if (data.responseBody.list2[i].am == "预约") {
                            visitTime += '<td onclick="makeApp(\'' + data.responseBody.list2[i].idAm + '\',\'' + amT + '\',\'' + data.responseBody.list2[i].priceAm + '\',\'' + data.responseBody.list2[i].workidAm + '\',\'' + data.responseBody.list2[i].workrankAm + '\',\'' + data.responseBody.list2[i].workdateAm + '\',\'' + data.responseBody.list2[i].conUrl + '\')">' + data.responseBody.list2[i].am + '</td>';
                        } else {
                            visitTime += '<td >' + data.responseBody.list2[i].am + '</td>';
                        }
                    }
                    ;
                    visitTime += '</tr>';
//            第三个
                    visitTime += '<tr style="font-size: 20px;">';
                    for (var i = 8; i < 16; i++) {
                        if (data.responseBody.list2[i].pm == "预约") {
                            visitTime += '<td onclick="makeApp(\'' + data.responseBody.list2[i].idPm + '\',\'' + pmT + '\',\'' + data.responseBody.list2[i].pricePm + '\',\'' + data.responseBody.list2[i].workidPm + '\',\'' + data.responseBody.list2[i].workrankPm + '\',\'' + data.responseBody.list2[i].workdatePm + '\',\'' + data.responseBody.list2[i].conUrlPm + '\')">' + data.responseBody.list2[i].pm + '</td>';
                        } else {
                            visitTime += '<td>' + data.responseBody.list2[i].pm + '</td>';
                        }
                    }
                    ;
                    visitTime += '</tr>';
//            第四个
                    if (data.responseBody.list2[0].allTime) {
                        visitTime += '<tr style="font-size: 20px;">';
                        for (var i = 8; i < 16; i++) {
                            if (data.responseBody.list2[i].allTime.indexOf("预约") != -1) {
                                var allT = "全天"
                                var idAllTime = "idAllTime", priceAllTime = "priceAllTime", workidAllTime = "workidAllTime", workrankAllTime = "workrankAllTime", conUrlAllTime = "conUrlAllTime", workdateAllTime = "workdateAllTime";
                                visitTime += '<td >';
                                for (var j = 0; j < data.responseBody.list2[i].allTimeNum; j++) {
                                    visitTime += '<span onclick="makeApp(\'' + data.responseBody.list2[i][idAllTime + j] + '\',\'' + allT + '\',\'' + data.responseBody.list2[i][priceAllTime + j] + '\',\'' + data.responseBody.list2[i][workidAllTime + j] + '\',\'' + data.responseBody.list2[i][workrankAllTime + j] + '\',\'' + data.responseBody.list2[i][workdateAllTime + j] + '\',\'' + data.responseBody.list2[i][conUrlAllTime + j] + '\')">' +
                                        '预约</span><br>';
                                }
                                visitTime += '</td>';
                            } else {
                                visitTime += '<td>' + data.responseBody.list2[i].allTime + '</td>';
                            }
                        }
                        visitTime += '</tr>';
                    }
                    ;
                    visitTime += '</table>' +
                        '</div>';
                    /********************************************第三个轮播**********************************************/
                    visitTime += '<div class="swiper-slide"><table class="reservationList sDTableData">';
                    visitTime += '<tr>';
                    for (var i = 16; i < data.responseBody.list2.length; i++) {
                        visitTime += '<th>' + data.responseBody.list2[i].tiTime.split(" ")[0] + '<br>' + data.responseBody.list2[i].tiTime.split(" ")[1] + '</th>';
                    }
                    ;
                    visitTime += '</tr>';
                    //            第二个
                    visitTime += '<tr style="font-size: 20px;">';
                    for (var i = 16; i < data.responseBody.list2.length; i++) {
                        if (data.responseBody.list2[i].am == "预约") {
                            visitTime += '<td  onclick="makeApp(\'' + data.responseBody.list2[i].idAm + '\',\'' + amT + '\',\'' + data.responseBody.list2[i].priceAm + '\',\'' + data.responseBody.list2[i].workidAm + '\',\'' + data.responseBody.list2[i].workrankAm + '\',\'' + data.responseBody.list2[i].workdateAm + '\',\'' + data.responseBody.list2[i].conUrl + '\')">' + data.responseBody.list2[i].am + '</td>';
                        } else {
                            visitTime += '<td >' + data.responseBody.list2[i].am + '</td>';
                        }
                    }
                    ;
                    visitTime += '</tr>';
//            第三个
                    visitTime += '<tr style="font-size: 20px;">';
                    for (var i = 16; i < data.responseBody.list2.length; i++) {
                        if (data.responseBody.list2[i].pm == "预约") {
                            visitTime += '<td  onclick="makeApp(\'' + data.responseBody.list2[i].idPm + '\',\'' + pmT + '\',\'' + data.responseBody.list2[i].pricePm + '\',\'' + data.responseBody.list2[i].workidPm + '\',\'' + data.responseBody.list2[i].workrankPm + '\',\'' + data.responseBody.list2[i].workdatePm + '\',\'' + data.responseBody.list2[i].conUrlPm + '\')">' + data.responseBody.list2[i].pm + '</td>';
                        } else {
                            visitTime += '<td >' + data.responseBody.list2[i].pm + '</td>';
                        }
                    }
                    ;
                    visitTime += '</tr>';
//            第四个
                    if (data.responseBody.list2[0].allTime) {
                        visitTime += '<tr style="font-size: 20px;">';
                        for (var i = 16; i < data.responseBody.list2.length; i++) {
                            if (data.responseBody.list2[i].allTime.indexOf("预约") != -1) {
                                var allT = "全天"
                                var idAllTime = "idAllTime", priceAllTime = "priceAllTime", workidAllTime = "workidAllTime", workrankAllTime = "workrankAllTime", conUrlAllTime = "conUrlAllTime", workdateAllTime = "workdateAllTime";
                                visitTime += '<td>';
                                for (var j = 0; j < data.responseBody.list2[i].allTimeNum; j++) {
                                    visitTime += '<span onclick="makeApp(\'' + data.responseBody.list2[i][idAllTime + j] + '\',\'' + allT + '\',\'' + data.responseBody.list2[i][priceAllTime + j] + '\',\'' + data.responseBody.list2[i][workidAllTime + j] + '\',\'' + data.responseBody.list2[i][workrankAllTime + j] + '\',\'' + data.responseBody.list2[i][workdateAllTime + j] + '\',\'' + data.responseBody.list2[i][conUrlAllTime + j] + '\')">' +
                                        '预约</span><br>';
                                }
                                visitTime += '</td>';
                            } else {
                                visitTime += '<td>' + data.responseBody.list2[i].allTime + '</td>';
                            }
                        }
                        visitTime += '</tr>';
                    }
                    ;
                    visitTime += '</table>' +
                        '</div>';
                }
                $('#visitTime').html(visitTime);
                var insur_swiper = new Swiper('.btm-swiper-container', {
                    slidesPerView: 'auto',
                    paginationClickable: true,
                    spaceBetween: 20
                });
            } else {
                alert(data.responseBody.data)
            }

        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}


function makeApp(id, periodname, price, workid, workrank, workdate, conUrlPm) {
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("periodname", periodname);
    sessionStorage.setItem("price", price);
    sessionStorage.setItem("workid", workid);
    sessionStorage.setItem("workrank", workrank);
    sessionStorage.setItem("workdate", workdate);
    sessionStorage.setItem("conUrlPm", conUrlPm);
    $('#dialogMask,#dialog').show();
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
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                sessionStorage.setItem("comefromBack", comeFrom);
                var url = "/sXHospital?page=registeredConfirm&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                ;
                window.location.href = url;//跳转到对应的页面
            } else {
                var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                ;
                window.location.href = url;//跳转到对应的页面
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}

$('#back').on("click", function () {
    if (comeFrom == "sXHospital") {
        var url = "/sXHospital?page=sXHospital&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;
        return;
    } else {
        var url = "/sXHospital?page=appointmenTimeSelect&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;
        return;
    }
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
                var url = "/sXHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmenSelect";
                window.location.href = url;//跳转到对应的页面
            } else {
                if (data.responseBody.errorCode == "110003") {
                    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmenSelect";
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
