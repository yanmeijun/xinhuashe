$(function () {
    var falg = false;
    $('#regAddList1').on('click', function (event) {
        event.stopPropagation();
        $('#cityTrriger').html("市");
        $('#cityTrriger').attr("data_id", "");
        $('#countyTrriger').html("区");
        $('#countyTrriger').attr("data_id", "");
        province()
    });
    $('#regAddList2').on("click", function (event) {
        event.stopPropagation();
        falg = false;
        var prov = $('#provinceTrriger').attr("data_id");
        if (!prov) {
            return;
        }
        ;
        $('#countyTrriger').html("区");
        $('#countyTrriger').attr("data_id", "");
        province(prov)
    });

    $('#regAddList3').on("click", function (event) {
        event.stopPropagation();
        var cityTrrig = $('#cityTrriger').attr("data_id");
        if (!cityTrrig) {
            return;
        }
        ;
        falg = true;
        province(cityTrrig, true);
    });
    function province(prov, cityTrrig, falg) {
        $('#dialogMask,#dialog').show();
        $(".mobileSelect").remove();
        var parameters;
        if (prov) {
            parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                aab301: prov
            };
        } else if (cityTrrig) {
            parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                aab301: cityTrrig
            };
        } else {
            parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                aab301: ""
            };
        }
        $.ajax({
            async: true,
            type: "post",
            data: JSON.stringify(parameters),
            url: "/remoteHosp/getRegionCode",
            contentType: 'application/json',
            success: function (data) {
                $('#dialogMask,#dialog').hide();
                if (data.retCode == "000000") {
                    if (data.responseBody.success) {
                        var weekdayArr = [];
                        weekdayArr = data.responseBody.fieldData.codelist
                        $(".mobileSelect").remove();
                        if (falg || cityTrrig) {
                            if (weekdayArr.length == 0) {
                                masktime("没有相关项目")
                                return;
                            } else {
                                var mobileSelect1 = new MobileSelect({
                                    trigger: '#countyTrriger',
                                    title: '区',
                                    wheels: [
                                        {data: weekdayArr}
                                    ],
									callback: function () {
									  $('#countyTrriger').css("color","#474747");
                                        $("html").css("height","100%");
									}
                                });
                            }
                        } else {
                            if (prov) {
                                falg = false;
                                var mobileSelect1 = new MobileSelect({
                                    trigger: '#cityTrriger',
                                    title: '市',
                                    wheels: [
                                        {data: weekdayArr}
                                    ],
									callback: function () {
									  $('#cityTrriger').css("color","#474747");
                                        $("html").css("height","100%");
									}
                                });
                            } else {
                                falg = false;
                                var mobileSelect1 = new MobileSelect({
                                    trigger: '#provinceTrriger',
                                    title: '省',
                                    wheels: [
                                        {data: weekdayArr}
                                    ],
									callback: function () {
									  $('#provinceTrriger').css("color","#474747");
                                        $("html").css("height","100%");
									}
                                });
                            }
                        }
                        ;
                        $("html").css("height","106%");
                        document.documentElement.scrollTop = 10;
                        document.body.scrollTop = 10;
                        $(".mobileSelect").addClass("mobileSelect-show");
                    }
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
    }
});
function search() {
    var provinceTrriger = $('#provinceTrriger').attr("data_id");
    var cityTrr = $('#cityTrriger').attr("data_id");
    var county = $('#countyTrriger').attr("data_id");
    var prov = $('#provinceTrriger').html();
    var city = $('#cityTrriger').html();
    var coun = $('#countyTrriger').html();
    var yab = '';
    if (!provinceTrriger) {
        yab = '';
    } else {
        if (provinceTrriger.charAt(provinceTrriger.length - 1) == "0") {
            yab = provinceTrriger.replace(/(0*$)/g, "");
        } else {
            yab = provinceTrriger;
        }

    }
    ;
    if (cityTrr) {
        if (cityTrr.charAt(cityTrr.length - 1) == "0") {
            yab = cityTrr.replace(/(0*$)/g, "");
        } else {
            yab = cityTrr;
        }
    }
    if (county) {
        if (county.charAt(county.length - 1) == "0") {
            yab = county.replace(/(0*$)/g, "");
        } else {
            yab = county;
        }
    }
    ;
    if (prov == "省份") {
        prov = ""
    }
    ;
    if (city == "市") {
        city = ""
    }
    if (coun == "区") {
        coun = ""
    }
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        provinceDesc: prov,
        townDesc: city,
        countyDesc: coun,
        yab003: yab,
        pageNo: 1
    };
    $.ajax({
        async: true,
        type: "post",
        data: JSON.stringify(parameters),
        url: "/remoteHosp/mechanismSearch",
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.result) {
                    $('#noDate').html(data.responseBody.result);
                    $('#noData').show();
                    return;
                }
                $('#noData').hide();

                var url = "/remoteHosp?page=medicalQueryResults&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;
                localStorage.setItem("medicalQuery", JSON.stringify(data.responseBody));
                localStorage.setItem("provs", prov)//省级名称
                localStorage.setItem("citys", city);//市级名称
                localStorage.setItem("yabs", yab);//所属行政区编码
            } else {
                $('#noData').show();
            }
            /*
             *查询动画提示结束
             */
            $('#dialogMask,#dialog').hide();
        },
        error: function (err) {
            console.log(err)
        }
    })
};