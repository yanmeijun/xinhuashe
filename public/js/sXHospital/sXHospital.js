//定义全局变量
var pageNum = 1, totalPage = 0, falg = false, totalNum = 0, hospitalOrDoctor = false;
$(function () {
    $('#hotSearchHospital').html(" ");
    load("/shanxiHospital/defaultHospital", "")//页面初始化加载
});
function load(addressUrl, hosName) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageSize: 4,//当前页显示几条数据
        pageIndex: pageNum,//页码（默认值为1）
        hosName: hosName
    };
    $.ajax({
        async: true,
        url: addressUrl,
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    totalNum = data.responseBody.fullData.count;//总条数
                    totalPage = Math.ceil(Number(totalNum) / 4);
                    var html = " ";
                    if (data.responseBody.fullData.DoctorListInfoList) {
                        $('#hotHos').html("相关医生");
                        $.each(data.responseBody.fullData.DoctorListInfoList, function (index, val) {
                            html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                                "<dl class=\"hosList hNHosList shanxiDlWh userPicAuto\">" +
                                "<dt><a href=\"javascript:;\"><img src='http://tpwz.sx.witdoctor.cn:8089/" + val.docImg + "' onclick=shaanxiDepar('" + val.docCode + "','" + val.hospCode + "','" + val.deptCode + "','" + val.hospName + "','" + val.deptName + "','" + val.docJob + "')></a></dt>" +
                                "<dd>" +
                                "<p class=\"nameOffice\"><span onclick=shaanxiDepar('" + val.docCode + "','" + val.hospCode + "','" + val.deptCode + "','" + val.hospName + "','" + val.deptName + "','" + val.docJob + "')>" + val.docName + "</span>" + val.deptName + /*"<a href=\"javascript:;\" class=\"btn-guahao\" onclick=shaanxiDepar('"+val.docCode+"','"+val.hospCode+"','"+val.deptCode+"','"+val.hospName+"','"+val.deptName+"','"+val.docJob+"')>挂号</a>"+
                             */"</p>" +
                                "<p class='hospitalName'>" + val.hospName + "<span >预约量" + val.RegNum + "</span></p>" +
                                "<p class=\"introduce\">擅长：" + val.specialty + "</p>" +
                                "</dd>" +
                                "</dl>" +
                                "</div>";
                        });
                        hospitalOrDoctor = true;
                    } else if (data.responseBody.fullData.hosList) {
                        $('#hotHos').html("热门医院");
                        $.each(data.responseBody.fullData.hosList, function (index, val) {
                            html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                                "<dl class=\"hosList hNHosList shanxiDlWh\">" +
                                "<dt><a href=\"javascript:;\"><img src='http://tpwz.sx.witdoctor.cn:8089/" + val.logo + "' onclick=shaanxiDepartment('" + val.hosId + "')></a></dt>" +
                                "<dd>" +
                                "<p class=\"title\" onclick=shaanxiDepartment('" + val.hosId + "')>" + val.hosName + /*"<a href=\"javascript:;\" class=\"btn-guahao\" >挂号</a>"+
                             */"</p>" +
                                "<p class='time'><span>" + val.levelName + "</span><span class='sX-yy-num'>预约量" + val.regNum + "</span></p>" +
                                "<p class=\"tel\"><i class=\"icon-tel\"></i>" + val.tel + "</p>" +
                                "</dd>" +
                                "</dl>" +
                                "</div>";
                        });
                        hospitalOrDoctor = false;
                    }
                    $('#hotSearchHospital').append(html);
                    $('#hotSearch').show();
                    falg = true;
                }
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
                load("/shanxiHospital/allHospital", $('#keyWord').val().trim());
            } else {
                load("/shanxiHospital/defaultHospital", "");
            }
        }
    }
});
/*点击查询*/
$('#search').on('click', function () {
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
    $('#hotSearchHospital').html(" ");
    $('#hotSearchHospital').html("");
    $('#hotSearch').hide();
    $('#noSearchHospital').hide();
    pageNum = 1;
    load("/shanxiHospital/allHospital", hosName);
});

//医院详情页面接口，点击医院名称进入该医院的详情页面包含医院的预约科室信息，医院科室预约挂号信息和医院的详情介绍等
function shaanxiDepartment(hosId) {
    sessionStorage.setItem("hosId", hosId);
    var url = "/shanxiHospital?page=details&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=shanxiHospital";
    window.location.href = url;
    return;
}
//orderno:orderNo,//就诊人的id（muserId）
/*点击个人中心查看订单详情*/
$('#personalCenter').on("click", function () {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        docCode: "6580",
        deptCode: "2783",
        hospCode: "61010009",
        regDateDate: "2018-10-16",
        isTime: "1",
        regLevel: "1",
        timeFlag: "2",
        regFee: "0",
        cliFee: "0",
        totalFee: "0",
        startTime: "14:30",
        endTime: "15:00",
        accountId: "",
        muserId: ""
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/patientInfo",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == 'SUCCESS') {
                    var url = "/shanxiHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=shanxiHospital";
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=shanxiHospital";
                    window.location.href = url;
                    return;
                }
            }
        },
        error: function () {

        }
    });
});
function shaanxiDepar(docCode, hosIdCode, deptCode, hospName, deptName, jobTitleName) {
    sessionStorage.setItem("deptId", deptCode);//科室id
    sessionStorage.setItem("depName", deptName);//科室名称
    sessionStorage.setItem("hosId", hosIdCode);//从接口task="1"的得到医院记录号hosId
    sessionStorage.setItem("docCodeId", docCode);
    sessionStorage.setItem("hosName", hospName);
    sessionStorage.setItem("jobTitleName", jobTitleName);
    var url = "/shanxiHospital?page=personRegistered&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=shanxiHospital";
    window.location.href = url;
}



