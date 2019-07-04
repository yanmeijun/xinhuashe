$(function () {
    $('#personalCenterInfor').html("");
    $('#personalCenterInfor').html(" ");
    /*时间获取订单时间查询时间*/
    function addDay(addDay) {
        var date = new Date();
        date.setTime(date.getTime() - addDay * 24 * 60 * 60 * 1000);
        return date;
    };
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;

    }
    var startTime = addDay(14).Format("yyyy-MM-dd");//开始时间
    var endTime = addDay(-14).Format("yyyy-MM-dd");//结束时间
    $('#appDate').val(startTime);
    $('#appTime').val(endTime);
    //查询动画提示开始
    $('#dialogMask,#dialog').show();
    lookAllOrder();
    getMyProfile();
});
//定义全局变量
var pageNum = 1, totalPage = 0, falg = false, totalNum = 0;
var parentMobile = "";
// 返回按钮
$('#back').on('click', function () {
    var url = "/shanxiHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    ;
    window.location.href = url;
});
$("#orderStatusTrigger,#orderStatus").click(function () {
    var weekdate = [
        {"name": "全部", "id": "0"},
        {"name": "未支付", "id": "1"},
        {"name": "挂号成功", "id": "2"},
        {"name": "已取号", "id": "3"},
        {"name": "已退费", "id": "4"},
        {"name": "已取消", "id": "5"},
        {"name": "已爽约", "id": "6"},
        {"name": "已取消,退费中", "id": "7"},
        {"name": "挂号失败", "id": "8"},
        {"name": "已支付,挂号处理中", "id": "9"}
    ];
    orderStatusTrigger("#orderStatusTrigger", "请选择状态", weekdate);
});
function orderStatusTrigger(mgs, titleMes, date) {
    $(".mobileSelect").remove();
    var permissionSelect = new MobileSelect({
        trigger: mgs,
        title: titleMes,
        wheels: [
            {data: date}
        ],
        position: [0]//初始化定位
    })
    $(".mobileSelect").addClass("mobileSelect-show");
};
function lookAllOrder() {
    var orderStatus = $('#orderStatusTrigger').attr("data_id");
    var sTime = $('#appDate').val();
    var eTime = $('#appTime').val();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        beginDate: sTime,
        endDate: eTime,
        orderStatus: orderStatus,
        pageIndex: pageNum,
        pageSize: 10
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/lookAllOrder",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    var html = "";
                    totalNum = data.responseBody.fullData.count;//总条数
                    totalPage = Math.ceil(Number(totalNum) / 10);
                    $('#total').html(totalNum);
                    $.each(data.responseBody.fullData.orderList, function (index, val) {
                        var length = val["idCode"].length;
                        var card = val["idCode"].substr(0, 3) + "**********" + val["idCode"].substr(length - 3, length);
                        var mobilelength = val["regMobil"].length;
                        var mobile = val["regMobil"].substr(0, 3) + "*****" + val["regMobil"].substr(mobilelength - 3, length);
                        html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                            "<h2 class=\"q-r-tit hospitalTitle sDTit\">" + val.hospName + "<em class=\"alreadyReserved colorBlue\">" + val.showStatusByChinese + "</em></h2>" +
                            "<hr class=\"hrLine\">" +
                            "<div class=\"reservationDetails\">" +
                            "<ul>" +
                            "<li><em></em><label>就诊日期：</label><span>" + val.regDate + "&nbsp;" + val.startTime + "-" + val.endTime + "</span></li>" +
                            "<li><em></em><label>预约医生：</label><span><small class=\"color0083e0\">" + val.docName + " </small>" + val.jobTitleName + "</span></li>" +
                            "<li><em></em><label>就诊科室：</label><span>" + val.deptName + "</span></li>" +
                            "<li><em></em><label>就诊人：</label><span>" + val.regName + "</span></li>" +
                            "<li><em></em><label>联系电话：</label><span>" + mobile + "</span></li>" +
                            "<li><em></em><label>身份证号：</label><span>" + card + "</span></li>" +
                            "<li><em></em><label>诊疗费：</label><span><b>￥ " + val.regFee + "</b>元</span></li>" +
                            "<li><em></em><label>挂号费：</label><span><b>￥ " + val.payFee + "</b>元</span></li>" +
                            "</ul>" +
                            "</div>" +
                            "<div class=\"reminder\">" +
                            "<p>注意事项：请与就诊当天前往医院窗口支付挂号费用</p>" +
                            "</div>";
                        if (val.showStatusByChinese == "已取消") {
                            html += "<div class=\"btn-box btnRegBox\">" +
                                "<input type=\"button\" value=\"再次挂号\" onclick='homePage()'/>" +
                                "</div>";
                        } else {
                            html += "<div class=\"btn-box\">" +
                                "<input type=\"button\" value=\"取消预约\" onclick=cancelOrder('" + val.orderNo + "')  />" +
                                "</div>";
                        }
                        html += "</div>";
                    });
                    $('#personalCenterInfor').append(html);
                    falg = true;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=personalCenter";
                    window.location.href = url;
                } else {
                    $('#total').html("0");
                }
            } else {
                // var url="/shanxiHospital?page=login&randomKey="+randomKey+"&userID="+userID+
                //     "&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x+"&local_y="+local_y+"&comeFrom=shanxiHospital";
                // window.location.href=url;
            }
        },
        error: function () {

        }
    })
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
            lookAllOrder();
        }
    }
});


function cancelOrder(orderno) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        orderNo: orderno
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/cancelOrder",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var result = data.responseBody;
                if (result.returnCode == 'SUCCESS') {
                    for (var i = 0; i < result.fullData.orderList.length; i++) {
                        var tatalFee = parseInt(result.fullData.orderList[i]["regFee"]) + parseInt(result.fullData.orderList[i]["cliFee"]);
                        var isPay = result.fullData.orderList[i]["isPay"];
                        var outTradeNo = result.fullData.orderList[i]["outTradeNo"];
                        var bankTradeNo = result.fullData.orderList[i]["bankTradeNo"];
                        var orderNo = result.fullData.orderList[i]["orderNo"];
                        var cancelType = '1';
                        var cancelChannel = '4';
                        var cancelRemark = '全流程网站用户取消';
                        var accountId = '';
                        var outRefundNo = '';
                        var notifyUrl = '';
                        var totalFee = tatalFee;
                        var refundFee = tatalFee;// result.fullData.orderList[i]["refundFee"];
                        var refundType = '1';
                        var refundRemark = "用户取消";
                        var hospCode = result.fullData.orderList[i]["hospCode"];
                        var clinicNo = result.fullData.orderList[i]["clinicNo"];

                        var orderTime = result.fullData.orderList[i]["orderTime"];
                        var regDate = result.fullData.orderList[i]["regDate"];
                        var hospName = result.fullData.orderList[i]["hospName"];
                        var deptName = result.fullData.orderList[i]["deptName"];
                        var docName = result.fullData.orderList[i]["docName"];
                        var regName = result.fullData.orderList[i]["regName"];
                        var regMobil = result.fullData.orderList[i]["regMobil"];
                        var payStatus = result.fullData.orderList[i]["payStatus"];
                        var startTime = result.fullData.orderList[i]["startTime"];
                        var endTime = result.fullData.orderList[i]["endTime"];
                        var timeFlag = result.fullData.orderList[i]["timeFlag"];
                        var timeValues = startTime + "-" + endTime;
                        var patientType = result.fullData.orderList[i]["patientType"];
                        if (isPay == "1" && payStatus == "202") {

                            //cancelPayOrder(outTradeNo, outRefundNo, orderNo, accountId, notifyUrl,
                            //totalFee, refundFee, refundType, refundRemark, hospCode);
                            cancelOrderOption('', orderNo, '', regName, hospName, deptName, docName, orderTime, regMobil, timeValues, "", timeFlag, regDate, patientType);
                            //cancelPayOrder(hospCode, orderNo, bankTradeNo, totalFee, refundFee, clinicNo, regName, regMobil, hospName, deptName, docName, orderTime, timeValues, "CANCEL_ORDER_NOTICE", timeFlag, regDate);
                        } else {
                            //cancelOrder(outTradeNo,bankTradeNo, orderNo, cancelType, cancelChannel, cancelRemark, accountId,
                            //                outRefundNo, notifyUrl, totalFee, refundFee, refundType, refundRemark, hospCode);
                            cancelOrderOption('', orderNo, '', regName, hospName, deptName, docName, orderTime, regMobil, timeValues, "", timeFlag, regDate, patientType);
                            // 取消订单成功后发送短信提示  如：  "张三|陕西省中医院|神经内科|刘德华|2016-10-16|10:00~11:00";
                            //sendTelMessage(regName, hospName, deptName, docName, orderTime, regMobil);
                            //sendTelMessageWithJoint(regMobil, regName, hospName, deptName, docName, orderTime, timeValues, orderNo, "CANCEL_ORDER_NOTICE", "", timeFlag);

                        }


                    }
                }
                else {
                    maskTip(result.returnMsg);
                    return;
                }
            }
        },
        error: function () {

        }
    })
};
//取消没有支付的订单  timeValues, "CANCEL_ORDER_NOTICE", timeFlag
function cancelOrderOption(channelOrderNo, orderNo, accessToken, regName, hospName, deptName, docName, orderTime, regMobil, timeValues, busType, timeFlag, regDate, patientType) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        orderNo: orderNo,
        regName: regName,
        hospName: hospName,
        deptName: deptName,
        docName: docName,
        orderTime: orderTime,
        regMobil: regMobil
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/cancelCurrentOrder",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var result = data.responseBody;
                if (result.returnCode == 'SUCCESS') {

                    maskTip("订单取消成功");
                    sendTelMessageWithJoint(regMobil, regName, hospName, deptName, docName, regDate, timeValues, orderNo, "CANCEL_ORDER_NOTICE_1", 3, timeFlag);
                    if (regMobil != parentMobile) {
                        sendTelMessageWithJoint(parentMobile, regName, hospName, deptName, docName, regDate, timeValues, orderNo, "CANCEL_ORDER_NOTICE_2", 3, timeFlag)
                    }
                    $('#personalCenterInfor').html("");
                    lookAllOrder();
                }
                else {
                    maskTip(result.returnMsg);
                    return;
                }
                ;
            }
        },
        error: function () {

        }
    });
}

/*时间插件*/
var calltimes;
$(function () {//来电时间和来电日期
    var selectedDate = {};
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = {preset: 'date'};
    opt.datetime = {preset: 'datetime'};
    opt.time = {preset: 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 10, //开始年份
        endYear: currYear + 10, //结束年份
        onBeforeShow: function (inst) {//展示前的事件
            document.activeElement.blur()
        },
        onSelect: function (valueText, inst) {//选择时事件（点击确定后），valueText 为选择的时间，
            valueText.match(/^\d{4}\-\d{2}\-\d{2}$/);
            //console.log(valueText.match(/^\d{4}\-\d{2}\-\d{2}$/))
            if (valueText.match(/^\d{4}\-\d{2}\-\d{2}$/)) {
                var curr = (new Date()).getFullYear();
                var currMonth = (new Date()).getMonth();
                var currDay = (new Date()).getDate();
                var n = valueText.split("-")[0];//所选的年份
                var yu = valueText.split("-")[1];//所选月份
                var rii = valueText.split("-")[2];//所选月份
                var pattern2 = /^0.*/g;//首字母为0
                if (yu.match(pattern2)) {//首字母为0
                    yu = valueText.split("-")[1].replace("0", "");
                } else {
                    yu = valueText.split("-")[1];
                }
                if (rii.match(pattern2)) {//首字母为0
                    rii = valueText.split("-")[2].replace("0", "");
                } else {
                    rii = valueText.split("-")[2];
                }
                ;
                if (new Date($('#appDate').val()) > new Date($('#appTime').val())) {
                    maskTip("开始时间不能大于结束时间！");
                    valueText = $('#appDate').val();
                    $("#appTime").val(valueText);
                    return;
                }
            }
        }
    };
    $("#appDates").click(function () {
        $("#appDate").mobiscroll("show");
    });
    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
    $("#appTimes").click(function () {
        $("#appTime").mobiscroll("show");
    });
    $("#appTime").mobiscroll($.extend(opt['date'], opt['default']));
});

$('#search').on("click", function () {
    $('#personalCenterInfor').html("");
    pageNum = 1;
    lookAllOrder();
});
//获取当前登录者的信息
function getMyProfile() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/getMyProfile",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    var result = data.responseBody;
                    //parentIdCardNo = result.fullData.idCode;
                    //parentIdCardType = 1;
                    parentMobile = result.fullData.mobile;
                    //parentName = result.fullData.uName;
                } else {
                    maskTip("加载个人资料失败!!");
                    return;
                }
            }
        },
        error: function () {
            maskTip("网络异常！");
            return;
        }
    });
};
//非支付挂号成功发短信
function sendTelMessageWithJoint(parentMobile, patientuName, QhosName, QdeptName, QdocName, regDateDate, timeValues, orderNo, busType, type, timeFlag) {
    var data = setSendMessageRequest(parentMobile, patientuName, QhosName, QdeptName, QdocName, regDateDate, timeValues, orderNo, busType, type, timeFlag, "");
    var dataToJson = JSON.stringify(data);
    $.base64.utf8encode = true;
    var encodeData = $.base64.btoa(dataToJson, true);
    sendMessageAjax(encodeData);
};
/*点击个人中心查看订单详情*/
$('#personalCenter').on("click", function () {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        beginDate: "",
        endDate: "",
        orderStatus: "",
        pageIndex: 1,
        pageSize: 100
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/lookAllOrder",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == 'SUCCESS') {
                    var url = "/shanxiHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    window.location.href = url;
                    return;
                }
            }
        },
        error: function () {

        }
    });
});


function homePage() {
    var url = "/shanxiHospital?page=shanxiHospital&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
    return;
}