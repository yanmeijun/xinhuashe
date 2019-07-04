var orderNo = sessionStorage.getItem("orderNo");
var currentCard = sessionStorage.getItem("currentCard");
var startTime, endTime;
$(function () {
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
    startTime = addDay(14).Format("yyyy-MM-dd");//开始时间
    endTime = addDay(-14).Format("yyyy-MM-dd");//结束时间
    lookOrder();
});

$('#back').on('click', function () {
    var url = "/shanxiHospital?page=registeredConfirm&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
});
function lookOrder() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        orderno: orderNo,//就诊人的id（muserId）
        beginDate: startTime,
        endDate: endTime,
        orderStatus: "",
        pageIndex: 1,
        pageSize: 100
    };
    $.ajax({
        async: false,
        url: "/shanxiHospital/lookOrder",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == 'SUCCESS') {
                    var html = "";
                    $.each(data.responseBody.fullData.orderList, function (index, val) {
                        html += "<li><em></em><label>就诊人：</label><span>" + val.regName + "</span></li>" +
                            "<li><em></em><label>证件号：</label><span>" + currentCard + "</span></li>" +
                            "<li><em></em><label>预约医生：</label><span><small class=\"color0083e0\">" + val.docName + "</small>（" + val.hospName + "-" + val.deptName + "）</span></li>" +
                            "<li><em></em><label>就诊时间：</label><span>" + val.regDate + "&nbsp;" + val.startTime + "-" + val.endTime + "</span></li>" +
                            "<li><em></em><label>门诊类型：</label><span>" + val.jobTitleName + "</span></li>" +
                            "<li><em></em><label>诊疗费：</label><span><b>￥ " + val.regFee + "</b>元</span></li>" +
                            "<li><em></em><label>挂号费：</label><span><b>￥ " + val.payFee + "</b>元</span></li>";
                    });
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=reservation";
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data.indexOf("您的账号已经在另一处登录了,你被迫下线!") > 0) {
                    alert("您的账号已经在另一处登录了,你被迫下线!");
                }
                $('#patientReservation').html(html);
            } else {
                maskTip("获取个人详情列表失败");
                return;
            }
        },
        error: function () {

        }
    })
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=reservation";
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=reservation";
                    window.location.href = url;
                    return;
                } else {
                    maskTip(data.responseBody.returnMsg);
                    return;
                }
            }
        },
        error: function () {

        }
    });
});