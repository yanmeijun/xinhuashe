var deptId = sessionStorage.getItem("deptId");//科室id
var depName = sessionStorage.getItem("depName");//科室名称
var hosId = sessionStorage.getItem("hosId");//从接口task="1"的得到医院记录号hosId
var hosName = sessionStorage.getItem("hosName");

var doctorId = sessionStorage.getItem("doctorId");
var regDate = sessionStorage.getItem("regDate");
var doctorName = sessionStorage.getItem("doctorName");
var regLevel = sessionStorage.getItem("regLevel");
var isTime = sessionStorage.getItem("isTime");
var cliFee = sessionStorage.getItem("cliFee");
var regFee = sessionStorage.getItem("regFee");
var avatar = sessionStorage.getItem("avatar");
var startTime = sessionStorage.getItem("startTime");
var endTime = sessionStorage.getItem("endTime");
var totalFee = sessionStorage.getItem("totalFee");
var timeFlag = sessionStorage.getItem("timeFlag");
var oneSelfAccountId = sessionStorage.getItem("accountId");//本人的id
var address;
//查询支付参数需要企业id信息
var QcorpId = "";
var QhosName = "";
//挂号人信息--当前登录者信息 平台用户
var parentIdCardNo = "";
var parentIdCardType = "";
var parentMobile = "";
var parentName = "";
var QdeptName = "";
//患者信息------就诊人
var patientmuserId = "";
var patientuName = "";
var patientuSex = "";
var patientidType = "";
var patientidCode = "";
var patientbirthday = "";
var patientmobile = "";
var patientaddress = "";
//初复诊字段
//returnFlag 是否复诊	Int	√	0：否，1：是
var returnFlag = 0;//默认是0  出诊
//挂号类别 患者类型， 1.小孩  2.成人
var patientType = "2";
//挂号类别 患者类型，1：为本人挂号，2：为子女挂号，3：为他人挂号
var busRight = '1,1,1';//联系人控制
var regType = "1";
var isOnlineBuild = 1;
var buildWay = 0;
var reCome = "error";

var isComplete = true;
//卡信息
var selCardNo = "";
var selCardType = "";
var regBindCardno = 0;//挂号是否要求使用卡，0：否，1
$(function () {
    $('#ks_title').html(hosName + "--" + depName);
    outpatient();
    registerInfo();
    inforCon();
    patientInfo();
    //获取当前登录者的信息
    getMyProfile();
});
// 返回按钮
$('#back').on('click', function () {
    var url = "/shanxiHospital?page=registeredTime&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
});
//挂号页面 所需要的信息
function registerInfo() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        docCode: doctorId,//doctorId (从科室门诊详情 余量查询)
        deptCode: deptId,//deptId（从接口科室信息中获取）
        hosCode: hosId//hosId（从接口默认展示医院中获取）
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/registerInfo",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    var html = "";
                    $.each([data.responseBody.fullData], function (index, val) {
                        if (data.responseBody.fullData.avatar == null || data.responseBody.fullData.avatar == "") {
                            html += "<dt><a href=\"javascript:;\"><img src='images/heNanHospital/photo.jpg' class=\"photo\"></a></dt>";
                        } else {
                            html += "<dt><a href=\"javascript:;\"><img src='http://tpwz.sx.witdoctor.cn:8089/" + val.avatar + "' class=\"photo\" onerror=\"this.src='http://tpwz.sx.witdoctor.cn:8089//UpPic/no.jpg'\"></a></dt>";
                        }
                        html += "<dd>" +
                            "<p class=\"nameOffice\"><span>" + val.doctorName + "</span>" + val.jobTitleName + "</p>" +
                            "<p class=\"hospitalName\">" + val.hosName + "</p>" +
                            "<p class=\"introduce color47\">地址：<span id='address'>陕西省西安市友谊西路256号</span></p>" +
                            "</dd>"
                    })
                    $('#register').html(html);
                    $('#address').html(address)
                }
            }
        }
    })
}

function outpatient() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        deptCode: deptId,
        hosCode: hosId
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/getDeptInfo",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    $.each([data.responseBody.fullData], function (index, val) {
                        address = val.laction;
                        QcorpId = val.corpId;
                        QhosName = val.hosName;
                        QdeptName = val.deptName;
                    });

                }
            }
        }
    })
};
function inforCon() {
    var html = "";
    html += "<div class=\"tab-content inforConfirm sXRegConfirm\">" +
        "<div class=\"text-list-div clearfix\">" +
        "<label>门诊类型：</label>" +
        "<span>专家门诊</span>" +
        "</div>" +
        "<div class=\"text-list-div clearfix\">" +
        "<label>就诊时间：</label>" +
        "<span>" + regDate + " " + startTime + "-" + endTime + "</span>" +
        "</div>" +
        "<div class=\"text-list-div clearfix\">" +
        "<label>门诊诊查费：</label>" +
        "<span><em class=\"coloref8935\">￥" + regFee + "</em>元</span>" +
        "</div>" +
        "<div class=\"text-list-div clearfix\">" +
        "<label>挂号费：</label>" +
        "<span><em class=\"coloref8935\">￥" + cliFee / 100 + "</em>元</span>" +
        "</div>" +
        "</div>";
    $('#inforConfirm').html(html);
}

function patientInfo() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        docCode: doctorId,
        deptCode: deptId,
        hospCode: hosId,
        regDateDate: regDate,
        isTime: isTime,
        regLevel: regLevel,
        timeFlag: timeFlag,
        regFee: regFee,
        cliFee: cliFee,
        totalFee: totalFee,
        startTime: startTime,
        endTime: endTime,
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
                if (data.responseBody.returnCode == "SUCCESS") {
                    var htmls = "";
                    htmls += "<div class=\"text-list-div inforCheck-style\">" +
                        "<label>就诊人：</label>";
                    $.each(data.responseBody.fullData.userList, function (index, val) {
                        var length = val["idCode"].length;
                        var card = val["idCode"].substr(0, 3) + "**********" + val["idCode"].substr(length - 3, length);
                        var mobilelength = val["mobile"].length;
                        var mobile = val["mobile"].substr(0, 3) + "*****" + val["mobile"].substr(mobilelength - 3, length);
                        htmls += "<div class=\"accounts-all clearfix\" style='float: right'>" +
                            "<div class=\"jiuZList\">" +
                            "<span class='icon-default icon-default1'>" +
                            "<input type=\"radio\" value=\"0\" name=\"checkbox\" main-val=" + val.muserId + " onclick=getMuserInfo('" + val.muserId + "','" + card + "')><i class=\"icon-check\"></i><em style='padding-left: 0.3rem;'>" + val.uName + "</em></span>" +
                            "<div class=\"y-g-tel\">手机：" + mobile + "</div>" +
                            "<div class=\"y-g-ID\">身份证：" + card + "</div>" +
                            "</div></div><div style=\"clear: both\"></div>";
                    });
                    htmls += "<div class=\"addPatient\"  style='margin-left: 3rem;color: #0083e0;font-size: .3rem;' onclick='addPatient()'>+ 添加就诊人</div>" +
                        "</div>" +
                        "<div class=\"text-list-div borderHava clearfix\">" +
                        "<label>初复诊选择：</label>\n" +
                        "<span>初诊（第一次去这家医院）</span>\n" +
                        "</div>";
                    $('#patientInfor').html(htmls);
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
                    window.location.href = url;
                    return;
                }
            }
        },
        error: function () {

        }
    })
};
/*添加就诊人*/
function addPatient() {
    var url = "/shanxiHospital?page=addPatient&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
    window.location.href = url;
};
//获取单个联系人信息
function getMuserInfo(muserId, cardId) {
    sessionStorage.setItem("currentCard", cardId);
    selCardNo = "";
    selCardType = "";
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        docCode: doctorId,
        deptCode: deptId,
        hospCode: hosId,
        regDateDate: regDate,
        isTime: isTime,
        regLevel: regLevel,
        timeFlag: timeFlag,
        regFee: regFee,
        cliFee: cliFee,
        totalFee: totalFee,
        startTime: startTime,
        endTime: endTime,
        accountId: oneSelfAccountId,//accountId本人
        muserId: muserId//muserId选择联系人的muserId
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/patientInfo",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (result) {
            if (result.retCode == "000000") {
                if (result.responseBody.returnCode == 'SUCCESS') {
                    patientmuserId = result.responseBody.fullData.userList[0]["muserId"];
                    patientuName = result.responseBody.fullData.userList[0]["uName"];
                    patientuSex = result.responseBody.fullData.userList[0]["uSex"];
                    patientidType = result.responseBody.fullData.userList[0]["idType"];
                    patientidCode = result.responseBody.fullData.userList[0]["idCode"];
                    patientbirthday = result.responseBody.fullData.userList[0]["birthday"];
                    patientmobile = result.responseBody.fullData.userList[0]["mobile"];
                    patientaddress = result.responseBody.fullData.userList[0]["address"];
                    healthAccountId = result.responseBody.fullData.userList[0]["healthAccountId"];
                    patientType = result.responseBody.fullData.userList[0]["muserType"];
                    regType = result.responseBody.fullData.userList[0]["muserAttr"];
                    getCardList();
                } else if (result.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
                    window.location.href = url;
                    return;
                } else {
                    maskTip("获取单个联系人失败!!");
                    return;
                }
            }
        }
    });
};
//兼容直连进行卡查询接口
function getCardList() {
    reCome = "reComeError";

    if (QcorpId == "") {
        reCome = "reComeRrror";
        return;
    }
    //getCardList();

    if (regBindCardno == 0) {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            mUserId: patientmuserId,
            hosId: hosId,
            corpId: QcorpId,
            patientuName: patientuName,
            returnFlag: returnFlag,
            regDateDate: regDate,
            patientidType: patientidType,
            patientuSex: patientuSex,
            patientidCode: patientidCode,
            patientmobile: patientmobile,
            patientbirthday: patientbirthday
        }
        $.ajax({
            async: true,
            url: "/shanxiHospital/getCardList",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                //var regBindCardno = 0;//挂号是否要求使用卡，0：否，1
                //var isbuildReturn = 0;//是否保存建档返回信息：0.否 1.是
                //var buildWay = 0;//建档方式：0.无密码建档  1.密码建档
                //var isOnlineBuild = 0;//是否支持在线建档: 0.否 1.是

                //if (regBindCardno == 0) {
                //    reCome = "reCome";
                //}
                //else
                var result = data.responseBody;
                if (regBindCardno == 0) {

                    if (result.returnMsg == "selectChuKaError") {

                        reCome = "reComeRrror";
                        alert("已经在本院就诊过,请选择复诊");
                    }
                    if (result.returnMsg == "selecFuError") {
                        // 复诊医院无卡
                        reCome = "reComeRrror";
                        alert("无该医院诊疗卡,请选择初诊");
                    }

                    if (result.returnMsg == "selecFuKaError") {
                        reCome = "reComeRrror";
                        //判断是否建档 以及建档是否需要密码
                        alert("该院内诊疗卡以失效,个人中心该院卡已删除,请选择初诊");

                    }

                    if (result.returnMsg == "selectFuRight" || result.returnMsg == "selecChuRight") {
                        // 看是否需要卡

                        if (isOnlineBuild == 1) {

                            if (buildWay == 0) {//0
                                reCome = "reCome";
                            } else {
                                //弹框让输入密码
                                if (returnFlag == 0) {//初诊
                                    maskTip("此功能暂不开通");
                                    return;
                                    //openAlterPassWord();
                                }
                                reCome = "reCome";

                            }
                        }// if (isOnlineBuild == 0)
                        else {
                            reCome = "reCome";
                        }
                    }
                }

                //var regBindCardno = 0;//挂号是否要求使用卡，0：否，1
                //var isbuildReturn = 0;//是否保存建档返回信息：0.否 1.是
                //var buildWay = 0;//建档方式：0.无密码建档  1.密码建档
            }  //var isOnlineBuild = 0;//是否支持在线建档: 0.否 1.是；
        })
    }
    else {
        reCome = "reCome";
    }
    isComplete = true;
};

/*确认预约*/
$('#confirmBtn').on("click", function () {
    var patientIdd = $('input[name="checkbox"]:checked').attr("main-val")//获取病人的id
    var timeValues = startTime + "~" + endTime;
    if (!patientIdd) {
        maskTip("请选择就诊人");
        return;
    }
    ;
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        doctorId: doctorId,
        deptId: deptId,
        hosId: hosId,
        regDate: regDate,
        timeFlag: timeFlag,
        startTime: startTime,
        endTime: endTime,
        payableFee: totalFee,//总费用
        returnFlag: returnFlag,
        regLevel: regLevel,
        regType: regType,
        openId: "111",
        ordType: "2",
        address: patientaddress,
        birthday: patientbirthday,
        cardNo: "",//复诊的时候用
        cardType: "",//复诊的时候用
        idCardNo: patientidCode,
        idCardType: patientidType,
        mobile: patientmobile,
        patientuName: patientuName,
        patientType: patientType,
        sex: patientuSex,
        parentIdCardNo: parentIdCardNo,
        parentIdCardType: parentIdCardType,
        parentMobile: parentMobile,
        parentName: parentName,
        deptName: depName,
        docName: doctorName,
        patientmuserId: patientmuserId,
        regBindCardno: regBindCardno
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/confirmAppointment",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    var result = data.responseBody;
                    var isPay = result.fullData.isPay; //判断是否需要支付  1 需要支付   0 不需要支付
                    var outTradeNo = result.fullData.outTradeNo;
                    var orderNo = result.fullData.orderNo;
                    var hosOrderNo = result.fullData.hosOrderNo;
                    var orderTime = result.fullData.orderTime;
                    var patientId = result.fullData.patientId;
                    var hosSerialNum = result.fullData.hosSerialNum;
                    var hosMedicalNum = result.fullData.hosMedicalNum;
                    var hosGetRegDate = result.fullData.hosGetRegDate;
                    var hosSeeDoctorAddress = result.fullData.hosSeeDoctorAddress;
                    var hosCardNo = result.fullData.hosCardNo;
                    var hosRemark = result.fullData.hosRemark;
                    var isConcessions = result.fullData.isConcessions;
                    if (isConcessions == 1 && result.fullData.concessions != undefined) {
                        var concessionsFee = result.fullData.concessions.concessionsFee;
                        var realRegFee = result.fullData.concessions.realRegFee;
                        var realTreatFee = result.fullData.concessions.realTreatFee;
                        var realTotalFee = result.fullData.concessions.realTotalFee;
                        var concessionsType = result.fullData.concessions.concessionsType;
                    }
                    ;
                    if (isPay == 0) {
                        sendTelMessage(patientmobile, patientuName, QhosName, QdeptName, doctorName, regDate, timeValues, orderNo, "CLINIC_ORDER_NOTICE", 3, timeFlag, hosOrderNo, patientId);
                        if (patientmobile.trim() != parentMobile.trim()) {
                            sendTelMessage(parentMobile, patientuName, QhosName, QdeptName, doctorName, regDate, timeValues, orderNo, "CLINIC_ORDER_NOTICE_OTHER", 3, timeFlag, hosOrderNo, patientId);
                        }
                        //非预付费挂号成功
                        var url = "/shanxiHospital?page=reservation&randomKey=" + randomKey + "&userID=" + userID +
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
                        window.location.href = url;
                    }
                    else {
                        var url = "/shanxiHospital?page=reservation&randomKey=" + randomKey + "&userID=" + userID +
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
                        window.location.href = url;
                        //maskTip("此次挂号需要支付，暂不开通");
                        //return;
                        //非预付费挂号成功
                        //在支付平台创建用户patientmuserId
                        // if (healthAccountId == "" || healthAccountId == null) {//判断当前平台中的用户是否创建健康账户
                        //     creatAccountOnPay(1, QcorpId, "", patientmuserId);//这里传递的是联系人的muserId
                        // }
                        //getPayOrderParamNew(orderNo, orderTime, 5, "预约挂号", parentMobile, patientmobile, hosRemark, healthAccountId, selCardType, selCardNo, hospCode, QhosName, patientuName, patientuSex, patientbirthday, "", QdeptName, QdocName, regDateDate, timeValues, timeFlag, hosOrderNo, patientId);
                    }
                    ;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
                    window.location.href = url;
                    return;
                } else {
                    //maskTip("挂号失败了:" + data.responseBody.returnMsg);
                    sessionStorage.setItem("error", data.responseBody.returnMsg);
                    var url = "/shanxiHospital?page=failReservation&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
                    window.location.href = url;
                    return;
                }
            } else {
                var url = "/shanxiHospital?page=failReservation&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
                window.location.href = url;
            }
        },
        error: function () {
            maskTip("ajax error异常！");
            return;
        }
    })
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
                    parentIdCardNo = result.fullData.idCode;
                    parentIdCardType = 1;
                    parentMobile = result.fullData.mobile;
                    parentName = result.fullData.uName;
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
function sendTelMessage(parentMobile, patientuName, QhosName, QdeptName, QdocName, regDateDate, timeValues, orderNo, busType, cancelYzm, timeFlag, hosOrderNo, patientId) {

    var data = setSendMessageRequest(parentMobile, patientuName, QhosName, QdeptName, QdocName, regDateDate, timeValues, orderNo, busType, cancelYzm, timeFlag, hosOrderNo, patientId);
    sessionStorage.setItem("orderNo", orderNo);
    var dataToJson = JSON.stringify(data);
    $.base64.utf8encode = true;
    var encodeData = $.base64.btoa(dataToJson, true);
    //var encodeData = window.btoa(encodeURIComponent(data));
    sendMessageAjax(encodeData);//发送短信请求
};
var orderNo = sessionStorage.getItem("orderNo");

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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredConfirm";
                    window.location.href = url;
                    return;
                }
            }
        },
        error: function () {

        }
    });
});
