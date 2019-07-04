$(function () {
    /*
     *省市县
     */
    $("#regAddList1").on("click", function () {
        province();
        if ($('#cityTrriger').html() == "市") {
            $('#cityTrriger').html("市");
        } else {
            $('#cityTrriger').html("市");//市级名称
            $('#cityTrriger').attr("data_id", "");
        }
        ;
    })
    $('#regAddList2').on('click', function () {
        if (!$('#provinceTrriger').attr("data_id")) {
            return;
        }
        ;
        if ($('#provinceTrriger').html().indexOf("市") != -1) {
            $('#city').attr("onclick", "");
            return;
        }
        city();
    })
    function province() {
        $('#dialogMask,#dialog').show();
        $(".mobileSelect").remove();
       var parameters = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            aab301: ""
        };
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
    }

    function city() {
        $('#dialogMask,#dialog').show();
        $(".mobileSelect").remove();
        var provinceTrriger = $('#provinceTrriger').attr("data_id");
        if (!provinceTrriger) {
            return;
        }
        var parameters = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            aab301: provinceTrriger
        };
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
    }

    function masktime(mgs) {
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
})
function searchremote() {
    var Medical = $('#Medical').val();//医疗机构名称
    var cityAttr = $('#cityTrriger').html();
    var cityger = $('#cityTrriger').attr("data_id");
    var prov = $('#provinceTrriger').html();
    var provin = $('#provinceTrriger').attr("data_id");
    var cityTrriger = "";
    if (cityAttr == "市") {
        cityAttr = "";
    }
    if (prov == "省份") {
        prov = ""
    }
    ;
    if (provin) {
        if (provin.charAt(provin.length - 1) == "0") {
            cityTrriger = provin.replace(/(0*$)/g, "");
        } else {
            cityTrriger = provin;
        }
    }
    if (cityger) {
        if (cityger.charAt(cityger.length - 1) == "0") {
            cityTrriger = cityger.replace(/(0*$)/g, "");
        } else {
            cityTrriger = cityger;
        }
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
        provinceDesc: provin,//省级名称
        townDesc: cityger,//市级名称
        aab299: cityTrriger,//所属行政区编码
        pageNo: 1,//页码
        akb021: Medical
    };
    $.ajax({
        async: true,
        type: "post",
        data: JSON.stringify(parameters),
        url: "/remoteHosp/remoteHospSearch",
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                $('#resultData').hide();
                if (data.responseBody.result) {
                    $('#noData').html(data.responseBody.result)
                    $('#resultData').show();
                    return;
                }
                localStorage.setItem("medicalx", JSON.stringify(data.responseBody));
                localStorage.setItem("medicalNamex", Medical);//医疗机构名称
                localStorage.setItem("provx", prov)//省级名称
                localStorage.setItem("cityAttrx", cityAttr);//市级名称
                localStorage.setItem("cityTrrigerx", cityTrriger);//所属行政区编码
                var url = "/remoteHosp?page=queryResults&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;

            } else {
                $('#resultData').show();
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
}
