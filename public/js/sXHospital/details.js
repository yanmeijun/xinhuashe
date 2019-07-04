$(function () {
    //查询动画提示开始
    $('#dialogMask,#dialog').show();
    ajaxLoad("/shanxiHospital/shaanxiDepartment")//页面初始化加载
    ajaxLoad("/shanxiHospital/ksList")
});
var hosId = sessionStorage.getItem("hosId");//从接口task="1"的得到医院记录号hosId
var ind = -1;
function ajaxLoad(apiUrl) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        hosId: hosId,
        hosCode: hosId,
        pId: ""
    };
    $.ajax({
        async: false,
        url: apiUrl,
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            //查询动画提示结束
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.detailResult) {
                    var ksResult = JSON.parse(data.responseBody.ksResult) //得到科室信息
                    var detailResult = JSON.parse(data.responseBody.detailResult) //得到每一个医院所对应的详细信息
                    var html = "";
                    var reg = /">([^<]+)/g;
                    $.each(detailResult.fullData.hosList, function (index, val) {
                        sessionStorage.setItem("hosName", val.hosName);
                        html += "<div class=\"peccancyQuery userInfor onlyStyle clearfix\">" +
                            "<dl class=\"hosList hNHosList sXDefaultList\">" +
                            "<dt><a href=\"javascript:;\"><img src='http://tpwz.sx.witdoctor.cn:8089/" + val.logo + "'></a></dt>" +
                            "<dd class=\"department\">" +
                            "<p class=\"title\">" + val.hosName + "<span class=\"titSpan\"></span></p>" +
                            "<p class=\"address\"><i class=\"icon-address\"></i>" + val.address + "</p>";
                        if (val.tel) {
                            html += "<p class=\"tel\"><i class=\"icon-tel\"></i>" + val.tel + "</p>";
                        } else {
                            html += "<p class=\"tel\"></p>";
                        }
                        if (!reg.test(val.hosSpecialty)) {
                            html += "<p class=\"intro\"><i class=\"icon-intro\"></i>" + val.hosSpecialty.replace(/<[^>]+>/g, "") + "</p>";
                        } else {
                            html += "<p class=\"intro\"><i class=\"icon-intro\"></i>" + val.hosSpecialty + "</p>";
                        }
                        "</dd>" +
                        "</dl>" +
                        "</div>"
                    })
                    $('#sX_detailResult').html(html);//渲染医院对应的信息
                } else {
                    if (data.responseBody.returnCode == "SUCCESS") {
                        var result = data.responseBody;
                        var array = new Array();
                        var hashTable = new Object();   // 声明对象
                        var htmls = "";
                        var htmlDetail = "";
                        for (var i = 0; i < result.fullData.deptList.length; i++) {
                            if (result.fullData.deptList[i]["level"] == '1') {
                                ind++
                                if (ind == 0) {
                                    htmls += "<li class=\"active\" onclick=dapart('" + ind + "')><a href=\"javascript:;\"> " + result.fullData.deptList[i]["deptName"] + "</a></li>";
                                    htmlDetail += "<div class=\"tabConBox\" id=\"" + result.fullData.deptList[i]["deptId"] + "\" style='display: block'></div>";
                                } else {
                                    htmls += "<li onclick=dapart('" + ind + "')><a href=\"javascript:;\"> " + result.fullData.deptList[i]["deptName"] + "</a></li>";
                                    htmlDetail += "<div class=\"tabConBox\" id=\"" + result.fullData.deptList[i]["deptId"] + "\" style='display: none'></div>";
                                }
                                if (result.fullData.deptList[i]["hasChild"] == '1') {
                                    loadLeave2DeptList(result.fullData.deptList[i]["deptId"]);
                                } else {
                                    array[result.fullData.deptList[i]["deptId"]] = result.fullData.deptList[i]["deptName"];
                                    hashTable[result.fullData.deptList[i]["deptId"]] = result.fullData.deptList[i]["deptName"];
                                }
                            }
                        }
                        ;
                        $('#ksList').html(htmls);
                        $('#departmentCon').html(htmlDetail);
                        for (var key in hashTable) {
                            var html2 = "";
                            html2 = "<p id='0' value=" + key + " name=" + key + " onclick=allowance('" + key + "','" + hashTable[key] + "')>" + hashTable[key] + "</p>";
                            $("#" + key + "").append(html2);

                        }
                    }
                }
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
};
//获取二级科室
function loadLeave2DeptList(pid) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        hosCode: hosId,
        pId: pid
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/ksList",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var result2 = data.responseBody;
                var html2 = "";
                for (var i = 0; i < result2.fullData.deptList.length; i++) {
                    //如果有科室加载子科室id，否则加载父id
                    if (result2.fullData.deptList[i]["hasChild"] == '1') {
                        html2 += "<p id='1' value='" + pid + "' name='" + pid + "' onclick=allowance('" + pid + "','" + result2.fullData.deptList[i]["deptName"] + "')>" + result2.fullData.deptList[i]["deptName"] + "</p>";
                    }
                    else {
                        html2 += "<p id='0' value=" + result2.fullData.deptList[i]["deptId"] + " name=" + result2.fullData.deptList[i]["deptId"] + "  onclick=allowance('" + result2.fullData.deptList[i]["deptId"] + "','" + result2.fullData.deptList[i]["deptName"] + "')>" + result2.fullData.deptList[i]["deptName"] + "</p>";
                    }
                }
                $("#" + pid).append(html2);
            }
            ;
        },
        error: function () {

        }
    })
};
$('#back').on('click', function () {
    var url = "/shanxiHospital?page=shanxiHospital&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
});
function dapart(ind) {
    $('#ksList li').eq(ind).addClass('active').siblings().removeClass("active");
    $('#departmentCon .tabConBox').eq(ind).show().siblings().hide();
};
/*科室门诊详情--余量查询*/
function allowance(deptId, depName) {
    sessionStorage.setItem("deptId", deptId);
    sessionStorage.setItem("depName", depName);
    var url = "/shanxiHospital?page=registered&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=details";
    window.location.href = url;
};


var orderNo = sessionStorage.getItem("orderNo");
if (!orderNo) {
    orderNo = "45436"
}
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=details";
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=details";
                    window.location.href = url;
                    return;
                }
            }
        },
        error: function () {

        }
    });
});
