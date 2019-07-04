$(function () {
    var RegResources = {
        treatname: new RegExp("\\$\\{treatname\\}", "g"),
        mobile: new RegExp("\\$\\{mobile\\}", "g"),
        idnum: new RegExp("\\$\\{idnum\\}", "g"),
        treatid: new RegExp("\\$\\{treatid\\}", "g")
    };
    var weekdayArr = [], responseBody, patientList = '';
    getRegisterData();
    getPatientList();
    function getRegisterData() {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            scheduleAmPmId: scheduleAmPmId
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/getRegisterData',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask_2,#dialog_2").show();
            }
        }).done(function (data) {
            $("#dialogMask_2,#dialog_2").hide();
            if (data.retCode == '000000') {
                responseBody = data.responseBody;
                if (data.responseBody.isCardNeed) {
                    $("#isCardNeed").show()
                    $("#isCardNeed_tip").show()
                }
                $("#hosName").text(data.responseBody.hosName);
                $("#docName").text(data.responseBody.docName);
                $("#jiuzhenshijian").text(data.responseBody.jiuzhenshijian);
                $("#opTypeText").text(data.responseBody.opTypeText);
                $("#reservation_price").text(data.responseBody.reservation_price.split("（")[0]);
                $("#docPic").attr("src", data.responseBody.docPic);
                if (data.responseBody.timeList.length <= 0) {
                    weekdayArr = [
                        {id: "000", name: "暂无挂号排班"}
                    ];
                } else {
                    $.each(data.responseBody.timeList, function (index, item) {
                        weekdayArr.push({id: item.ampmid + "_" + item.regionid + "_" + item.appnum + "_" + item.end, name: item.begin})
                    })
                }

            } else {

            }
        });
    }

    function getPatientList() {
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
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/getPatientList',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                var temple = $("#result_template_div").html(), html = "";
                $.each(data.responseBody.patientList, function (index, item) {
                    html += temple.replace(RegResources.idnum, item.idnum)
                        .replace(RegResources.mobile, item.mobile)
                        .replace(RegResources.treatid, item.treatid)
                        .replace(RegResources.treatname, item.treatname)
                })
                $("#result_div").html(html);
            } else {

            }
        });
    }

    $("#timeTrigger").click(function () {
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#timeTrigger',
            title: '选择时间',
            wheels: [
                {data: weekdayArr}
            ],
			callback: function () {
			  $('#timeTrigger').css("color","#474747")
			}
        })
        $(".mobileSelect").addClass("mobileSelect-show");
    });
    $(document).on("touchstart", "img[id^='img_']", function () {
        var treatid = $(this).attr("id").replace("img_", "");
        if ($(this).attr("src").indexOf("yh") > -1) {
            patientList = '';
            $(this).attr("src", "/images/icon-checkBox-default.png")
        } else {
            $("img[id^='img_']").attr("src", "/images/icon-checkBox-default.png")
            patientList = {treatid: treatid,
                treatname: $("#treatname_" + treatid).text().replace(" ", ""),
                mobile: $("#mobile_" + treatid).text().replace("手机：", ""),
                idnum: $("#idnum_" + treatid).text().replace("身份证：", "")
            };
            $(this).attr("src", "/images/icon-yh-check.png")
        }
    })
    $("#registerSubmit").click(function () {
        if (!$("#timeTrigger").attr("data_id") || !$("#timeTrigger").text() || $("#timeTrigger").attr("data_id") == "000") {
            masktime("请选择就诊时间！");
            return;
        } else if (patientList == "") {
            masktime("请选择就诊人！");
            return;
        } else if (!$("#agreeSelect").attr("class")) {
            masktime("请阅读挂号协议并打钩！");
            return;
        }
        if (responseBody.isCardNeed) {
            if (!$("#card").val()) {
                masktime("请输入就诊卡！");
                return;
            }
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            docName: responseBody.docName,
            hospitalName: responseBody.hosName,
            deptName: responseBody.deptName,
            opType: responseBody.opType,
            scheduleDate: responseBody.scheduleDate,
            amOrPm: responseBody.amOrPm,
            arAmt: responseBody.arAmt,
            treatName: patientList.treatname,
            treatId: patientList.treatid,
            beginTime: $("#timeTrigger").text(),
            endTime: $("#timeTrigger").attr("data_id").split("_")[3],
            regionid: $("#timeTrigger").attr("data_id").split("_")[1],
            ampmid: $("#timeTrigger").attr("data_id").split("_")[0],
            hospitalId: localStorage.getItem('hospitalID'),
            deptId: localStorage.getItem('deptId'),
            docId: docId,
            medicalCardNum: $("#card").val() || "",
            docCode: responseBody.docCode,
            deptCode: responseBody.deptCode,
            hosCode: responseBody.hosCode,
            branchId: localStorage.getItem('branchId'),
            branchName: responseBody.branchName,
            schDateType: '2',
            appNum: $("#timeTrigger").attr("data_id").split("_")[2],
            isPatientCard: isPatientCard || "2",
            idCardNum: patientList.idnum
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/registerHosp',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                if (data.responseBody.text.indexOf("（元 ）") > -1) {
                    localStorage.setItem('text', data.responseBody.text.replace("（元 ）", ""));
                } else {
                    localStorage.setItem('text', data.responseBody.text);
                }
                localStorage.setItem('patientName', data.responseBody.patientName);
                localStorage.setItem('docName', data.responseBody.docName);
                localStorage.setItem('time', data.responseBody.time);
                window.location.href = "/sDHospital?page=reserveSuccess&randomKey="
                    + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x
                    + "&local_y=" + local_y + "&localFrom=" + localFrom;
            } else {
                window.location.href = "/sDHospital?page=reserveFailure&randomKey="
                    + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x
                    + "&local_y=" + local_y + "&localFrom=" + localFrom;
            }
        })
    });
    $("img[id='back']").click(function () {
        window.location.href = "/sDHospital?page=registered&randomKey="
            + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x
            + "&local_y=" + local_y + "&localFrom=" + localFrom;
    })
    $("#addPatient").click(function () {
        window.location.href = "/sDHospital?page=patientManage&randomKey="
            + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x
            + "&local_y=" + local_y + "&localFrom=" + localFrom;
    })
    function masktime(mgs) {
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
})