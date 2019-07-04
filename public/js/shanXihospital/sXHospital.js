/**
 * Created by dell on 2018/9/27.
 */
//定义全局变量
var pageNum = 1, totalPage = 0, falg = false, totalNum = 0, hospitalOrDoctor = false;
var cityId = sessionStorage.getItem("cityId");
var citySelectName = sessionStorage.getItem("cityName");
$(function () {
    if (citySelectName) {
        $('#cityName').html(citySelectName);
    } else {
        $('#cityName').html(cityName);
    }
    //查询动画提示结束
    $('#dialogMask,#dialog').show();
    load("/sXHospital/getHospList", "")//页面初始化加载
});
/*点击查询*/
$('#search').on('click', function () {
    sessionStorage.removeItem("cityId");
    cityId = "";
    var hosName = $('#keyWord').val();
    if (!hosName) {
        maskTip("请输入医院名称/医生名称");
        return;
    }
    ;
    if (hosName.indexOf(" ") != -1) {
        hosName = hosName.replace(/\s/g, "");
    }
    ;
    $('#hotSearchHospital').html("");
    $('#hotSearch').hide();
    $('#noSearchHospital').hide();
    pageNum = 1;
    //查询动画提示结束
    $('#dialogMask,#dialog').show();
    load("/sXHospital/getHospList", hosName);
});


function load(addressUrl, hosName) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        page: pageNum,//页码（默认值为1）
        hospitalname: hosName,//医院名称搜索
        cityid: ""
    };
    $.ajax({
        async: true,
        url: addressUrl,
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                totalPage = data.responseBody.totalPage;//总条数
                var html = "";
                if (data.responseBody.existence) {
                    $('#hotHos').html("热门医院");
                    $.each(data.responseBody.lists, function (index, val) {
                        var httpReg = val.img;
                        var classColor = "";
                        if (val.hospitaluid == undefined) {
                            classColor = "yyGray";
                        } else {
                            classColor = "";
                        }
                        html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                            "<dl class=\"hosList hNHosList\">";
                        if (httpReg.indexOf("http") == -1) {
                            html += "<dt><a href=\"javascript:;\"><img src='http://www.sxyygh.com/" + val.img + "' onclick=sXDepartment('" + val.hospitaluid + "','" + val.yymc + "')  onerror='http://www.sxyygh.com" + val.img + "'></a></dt>";
                        } else {
                            html += "<dt><a href=\"javascript:;\"><img src='" + val.img + "' onclick=sXDepartment('" + val.hospitaluid + "','" + val.yymc + "')  onerror='http://www.sxyygh.com" + val.img + "'></a></dt>";
                        }
                        html += "<dd>" +
                            "<p class=\"title\" onclick=sXDepartment('" + val.hospitaluid + "','" + val.yymc + "')>" + val.yymc + "<a href=\"javascript:;\" class='btn-guahao  " + classColor + " ' >" + val.yygh.trim() + "</a>" +
                            "</p>" +
                            "<p class=\"time\" onclick=sXDepartment('" + val.hospitaluid + "','" + val.yymc + "')><span>" + val.yydj + "</span><span class=\"noBorder\">" + val.yyfh + "</span></p>" +
                            "<p class='address' onclick=sXDepartment('" + val.hospitaluid + "','" + val.yymc + "')><i class='icon-address'></i>" + val.yydz1 + "</p>" +
                            "<p class=\"tel\" onclick=sXDepartment('" + val.hospitaluid + "','" + val.yymc + "')><i class=\"icon-tel\"></i>电话：" + val.yydh + "</p>" +
                            "</dd>" +
                            "</dl>" +
                            "</div>";
                    });
                    hospitalOrDoctor = true;
                } else {
                    $('#hotHos').html("相关医生");
                    $.each(data.responseBody.lists, function (index, val) {
                        var httpReg = val.doctorImg;
                        var classColor = "";
                        if (val.ksID == undefined) {
                            classColor = "yyGray";
                        } else {
                            classColor = "";
                        }
                        html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                            "<dl class=\"hosList hNHosList\">";
                        if (httpReg.indexOf("http") == -1) {
                            html += "<dt><a href=\"javascript:;\"><img src='http://www.sxyygh.com/" + val.doctorImg + "' onclick=shaanxiDepartment('" + val.ksID + "','" + val.doctorHospital.trim() + "')  onerror='http://www.sxyygh.com" + val.doctorImg + "'></a></dt>";
                        } else {
                            html += "<dt><a href=\"javascript:;\"><img src='" + val.doctorImg + "' onclick=shaanxiDepartment('" + val.ksID + "','" + val.doctorHospital.trim() + "') ></a></dt>";
                        }
                        html += "<dd>" +
                            "<p class=\"nameOffice\"   onclick=shaanxiDepartment('" + val.ksID + "','" + val.doctorHospital.trim() + "')><span>" + val.doctorName + "</span>" + val.doctorWork + "<a href=\"javascript:;\" class='btn-guahao  " + classColor + " '>" + val.yygh + "</a>" +
                            "</p>" +
                            "<p class='hospitalName'>" + val.doctorHospital + val.doctorMz + "</p>" +
                            "<p class=\"introduce\">擅长：" + val.hosSpecialty + "</p>" +
                            "</dd>" +
                            "</dl>" +
                            "</div>";
                    });
                    hospitalOrDoctor = true;
                }
                $('#hotSearchHospital').append(html);
                $('#hotSearch').show();
                falg = true;
            } else {
                $('#noDate').html(data.responseBody.errorMsg);
                $('#hotSearch').hide();
                $('#noSearchHospital').show();
            }
            //查询动画提示结束
            $('#dialogMask,#dialog').hide();
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
};

//下拉加载
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(window).height();
    if (scrollTop + windowHeight >= scrollHeight - 10) {
        if (pageNum >= totalPage) {
            return;
        }
        if (falg) {
            //查询动画提示结束
            $('#dialogMask,#dialog').show();
            falg = false;
            pageNum++;
            /*判断是否加载医院列表还是医生列表*/
            if (hospitalOrDoctor) {
                load("/sXHospital/getHospList", $('#keyWord').val().trim());
            } else {
                load("/sXHospital/getHospList", "");
            }
        }
    }
});
//医院详情页面接口，点击医院名称进入该医院的详情页面包含医院的预约科室信息，医院科室预约挂号信息和医院的详情介绍等
function sXDepartment(hosId, hospitalName) {
    if (hosId == "undefined") {
        return;
    } else {
        sessionStorage.setItem("hosId", hosId);
        sessionStorage.setItem("hospitalName", hospitalName);
        var url = "/sXHospital?page=selectDepartment&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=sXHospital";
        window.location.href = url;
    }
}

function shaanxiDepartment(doctorId, keshiName) {
    if (doctorId == "undefined") {
        return;
    } else {
        sessionStorage.setItem("doctorId", doctorId);
        sessionStorage.setItem("keshiName", keshiName);
        var url = "/sXHospital?page=appointmenSelect&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=sXHospital";
        window.location.href = url;
    }
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
                var url = "/sXHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=sXHospital";
                window.location.href = url;//跳转到对应的页面
            } else {
                if (data.responseBody.errorCode == "110003") {
                    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=sXHospital";
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

//$('#cityAddress').on("click",function(){
//    var url="/sXHospital?page=selectCity&randomKey="+randomKey+"&userID="+userID+"&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x+"&local_y="+local_y+"&comeFrom=sXHospital";
//    window.location.href=url;//跳转到对应的页面
//})


