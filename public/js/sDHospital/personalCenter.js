$(function () {
    var searchPageNum = 1, searchTotalPage = 0, pageSize = 5;
    var RegResources = {
        hosName: new RegExp("\\$\\{hosName\\}", "g"),
        state: new RegExp("\\$\\{state\\}", "g"),
        appDate: new RegExp("\\$\\{appDate\\}", "g"),
        doctorName: new RegExp("\\$\\{doctorName\\}", "g"),
        deptName: new RegExp("\\$\\{deptName\\}", "g"),
        treatName: new RegExp("\\$\\{treatName\\}", "g"),
        registryAmt: new RegExp("\\$\\{registryAmt\\}", "g"),
        id: new RegExp("\\$\\{id\\}", "g")
    };
    var stateArr = [
        {id: 1, name: "已预约"},
        {id: 2, name: "停诊"},
        {id: 3, name: "爽约"},
        {id: 4, name: "已取消"},
        {id: 5, name: "挂号成功"},
        {id: 6, name: "已评价"}
    ]
    $("#state,#stateImg").click(function () {
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
    $("#startTime").mobiscroll($.extend(opt['date'], opt['default']));
    $("#endTime").mobiscroll($.extend(opt['date'], opt['default']));
    //------------------日历选择插件end------------------------------
    function search() {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            page: searchPageNum,
            pageSize: pageSize,
            state: $("#state").attr("data_id"),
            startTime: $("#startTime").val().replace("-", "").replace("-", ""),
            endTime: $("#endTime").val().replace("-", "").replace("-", "")
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/searchRegisterHosp',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                searchTotalPage = data.dataNum.totalPage;
                $("#totalCount").html('<span></span>共 ' + data.dataNum.totalCount + ' 条挂号记录')
                $("#totalCount_div").show();
                var temple_cancel = $("#result_template_cancel").html(), html = "";
                var temple_other = $("#result_template_other").html();
                $.each(data.responseBody, function (index, item) {
                    if (item.state == "已预约") {
                        html += temple_cancel.replace(RegResources.hosName, item.branchName || item.hosName)
                            .replace(RegResources.state, item.state)
                            .replace(RegResources.appDate, item.appDate)
                            .replace(RegResources.doctorName, item.doctorName)
                            .replace(RegResources.deptName, item.deptName)
                            .replace(RegResources.treatName, item.treatName)
                            .replace(RegResources.registryAmt, item.registryAmt)
                            .replace(RegResources.id, item.id)
                    } else {
                        html += temple_other.replace(RegResources.hosName, item.branchName || item.hosName)
                            .replace(RegResources.state, item.state)
                            .replace(RegResources.appDate, item.appDate)
                            .replace(RegResources.doctorName, item.doctorName)
                            .replace(RegResources.deptName, item.deptName)
                            .replace(RegResources.treatName, item.treatName)
                            .replace(RegResources.registryAmt, item.registryAmt)
                    }
                })
                $("#result_div").append(html);
            }
        })
    };
    $("#search").click(function () {
        searchPageNum = 1;
        searchTotalPage = 0;
        $("#result_div").html("");
        search();
    });

    var cancel_id;
    // $("input[id^='cancel_']").click(function(){
    $(document).on("touchstart", "input[id^='cancel_']", function () {
        cancel_id = $(this).attr("id").replace("cancel_", "")
        $("#cancel_mask,#cancel_tip").show();
    })
    $("#cancel_close").click(function () {
        cancel_id = '';
        $("#cancel_mask,#cancel_tip").hide();
    })
    $("#cancel_yes").click(function () {
        if (!cancel_id) {
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            id: cancel_id
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/cancelRegisterHosp',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            cancel_id = '';
            $("#cancel_mask,#cancel_tip").hide();
            if (data.retCode == '000000') {
                if (data.responseBody.re == "success") {
                    masktime("取消预约成功");
                    $("#search").click()
                } else {
                    masktime("取消预约失败");
                }
            } else {
                masktime("取消预约失败");
            }
        })
    })
    $("#back").click(function () {
        window.location.href = "/sDHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    function masktime(mgs) {
        $('#masktime').html(mgs);
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
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

