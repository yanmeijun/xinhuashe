$(function () {
    var RegResources = {
        hospName: new RegExp("\\$\\{hospName\\}", "g"),
        deptName: new RegExp("\\$\\{deptName\\}", "g"),
        processState: new RegExp("\\$\\{processState\\}", "g"),
        regDate: new RegExp("\\$\\{regDate\\}", "g"),
        timeFlag: new RegExp("\\$\\{timeFlag\\}", "g"),
        startTime: new RegExp("\\$\\{startTime\\}", "g"),
        seqNo: new RegExp("\\$\\{seqNo\\}", "g"),
        takeNumberCode: new RegExp("\\$\\{takeNumberCode\\}", "g"),
        doctorName: new RegExp("\\$\\{doctorName\\}", "g"),
        patientName: new RegExp("\\$\\{patientName\\}", "g"),
        phone: new RegExp("\\$\\{phone\\}", "g"),
        cardId: new RegExp("\\$\\{cardId\\}", "g"),
        orderId: new RegExp("\\$\\{orderId\\}", "g")
    };
    var searchPageNum = 1, searchTotalPage = 0, pageSize = 5;
    var stateArr = [
        {id: "", name: "全部"},
        {id: 0, name: "已预约"},
        {id: 1, name: "已完成"},
        {id: 2, name: "已取消"},
        {id: 3, name: "逾期"},
        {id: 4, name: "作废"},
        {id: 5, name: "预约中"},
        {id: 6, name: "支付中"},
        {id: 7, name: "取消预约中"},
        {id: 8, name: "预约登记失败"}
    ];
    $("#state,#state_img").click(function () {//监护关系选择
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#state',
            title: '选择状态',
            wheels: [
                {data: stateArr}
            ]
        })
        $(".mobileSelect").addClass("mobileSelect-show");
    });
    //------------------日历选择插件start------------------------------
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
            if (valueText.match(/^\d{4}\-\d{2}\-\d{2}$/)) {
                selectedDate["date"] = valueText;
            } else {
                selectedDate["time"] = valueText;
            }
            calltimes = selectedDate.date + " " + selectedDate.time;
        }
    };
    $("#start").mobiscroll($.extend(opt['date'], opt['default']));
    $("#end").mobiscroll($.extend(opt['date'], opt['default']));
    //------------------日历选择插件end------------------------------
    $("#submit").click(function () {
        searchPageNum = 1;
        searchTotalPage = 0;
        $("#results_div").html("");
        search();
    })
    function search() {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            processStatus: $("#state").attr("data_id") || "",
            startTime: $("#start").val(),
            endTime: $("#end").val(),
            pageIndex: searchPageNum,
            pageSize: pageSize
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/getRegisterList',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                var resultData = JSON.parse(JSON.parse(data.responseBody.data));
                searchTotalPage = resultData.pageTotal;
                var cancel = $("#cancel_template_div").html(),
                    other = $("#other_template_div").html(),
                    html = "";
                console.log(resultData.data)
                $.each(resultData.data, function (index, item) {
                    html += other.replace(RegResources.hospName, item.hospName)
                        .replace(RegResources.deptName, item.deptName)
                        .replace(RegResources.processState, stateArr[item.isStatus + 1].name)
                        .replace(RegResources.regDate, item.regDate)
                        .replace(RegResources.timeFlag, item.timeFlag)
                        .replace(RegResources.startTime, item.startTime)
                        .replace(RegResources.seqNo, item.seqNo)
                        .replace(RegResources.takeNumberCode, item.takeNumberCode == null ? "" : item.takeNumberCode)
                        .replace(RegResources.doctorName, item.doctorName)
                        .replace(RegResources.patientName, item.patientName)
                        .replace(RegResources.phone, item.phone == null ? "" : item.phone)
                        .replace(RegResources.cardId, item.cardId == null ? "" : item.cardId);
                    if (item.processState == "已预约") {
                        html += cancel.replace(RegResources.orderId, item.orderId)
                    }
                });
                $("#results_div").append(html);
            } else {
                // $("#noResult").show()
            }
        });
    }

    var orderId;
    $(document).on("touchstart", "input[id^='cancel_']", function () {
        $("#cancel_mask_show").show();
        $("#cancel_show").show();
        orderId = this.id.split("_")[1];
    });
    $("#cancel_hide").click(function () {
        $("#cancel_mask_show").hide();
        $("#cancel_show").hide();
    });
    $("#do_cancel").click(function () {
        if (!orderId) {
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            orderId: orderId
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/cancelRegister',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                if (JSON.parse(JSON.parse(data.responseBody.data)).resultCode == "success") {
                    masktime("取消成功");
                    $("#cancel_hide").click();
                    $("#submit").click();
                } else {
                    masktime("取消失败");
                }
            } else {
                masktime("取消失败");
            }
        })
    });
    $(document).on("touchstart", "img[id='back']", function () {
        window.location.href = "/jxHospital?page=" + comeFrom + "&cityID=" + cityID + "&localFrom=" + localFrom;
    });
    function masktime(mgs) {
        $('#masktime').html(mgs);
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000);
        return
    };
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(window).height();
        if (scrollTop + windowHeight >= scrollHeight) {
            searchPageNum++;
            if (searchPageNum > searchTotalPage) {
                searchPageNum = 1;
                searchTotalPage = 0;
                return;
            }
            search();
        }
    });
})
