$(function () {
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();

    var pageNum = 0, totlePage = 0, orderType;
    var RegResources = {
        idReg: new RegExp("\\$\\{id\\}", "g"),
        yyReg: new RegExp("\\$\\{yy\\}", "g"),
        ksReg: new RegExp("\\$\\{ks\\}", "g"),
        ysReg: new RegExp("\\$\\{ys\\}", "g"),
        jzsjReg: new RegExp("\\$\\{jzsj\\}", "g"),
        qhsjReg: new RegExp("\\$\\{qhsj\\}", "g"),
        qhddReg: new RegExp("\\$\\{qhdd\\}", "g"),
        orderIdReg: new RegExp("\\$\\{orderId\\}", "g"),
        sbmReg: new RegExp("\\$\\{sbm\\}", "g"),
        ghrReg: new RegExp("\\$\\{ghr\\}", "g"),
        ysfwfReg: new RegExp("\\$\\{ysfwf\\}", "g"),
        hospitalTypeReg: new RegExp("\\$\\{hospitalType\\}", "g"),
        statusReg: new RegExp("\\$\\{status\\}", "g")
    };
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
    $("#startDate").mobiscroll($.extend(opt['date'], opt['default']));
    $("#endDate").mobiscroll($.extend(opt['date'], opt['default']));
    //------------------日历选择插件end------------------------------

    $("#orderType").val("");
    $("#orderType_choose,#orderType").click(function () {
        document.activeElement.blur();
        $("#mask, #orderType_list_div").show()
    })
    $("#mask").click(function () {
        $("#mask, #orderType_list_div").hide()
    })
    $("#orderType_list>li>a").click(function () {
        orderType = $(this).attr("data-index");
        $("#orderType").val($(this).text());
        $("#mask, #orderType_list_div").hide()
    });
    var getDetail = function (page, startDate, endDate) {
        var today = new Date(), start = '', end = '';
        var year = today.getFullYear(),
            month = today.getMonth(),
            date = today.getDate();
        start += year;
        start += (month + 1).toString().length > 1 ? '-' : "-0" + parseInt(month + 1);
        start += date.toString().length > 1 ? '-' : "-0";
        start += date;
        end += year;
        end += (month + 4).toString().length > 1 ? '-' : "-0" + parseInt(month + 4);
        end += date.toString().length > 1 ? '-' : "-0";
        end += date;
        var params = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            orderType: orderType || "-1",
            page: page || "1",
            startDate: startDate || start,
            endDate: endDate || end
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(params),
            url: '/hospital/registerList',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.retCode == '000000') {
                $("#result_err").hide();
                var html = "",
                    list = data.responseBody.list ? data.responseBody.list : [],
                    template, status;
                if (params.orderType == "1" || params.orderType == "-1") {
                    status = params.orderType == "1" ? "待就诊" : "全部";
                    template = $("#waitDoc_template").html();
                } else {
                    if (params.orderType == "2" || params.orderType == "3840") {
                        status = params.orderType == "2" ? "已取消" : "停诊"
                    } else {
                        status = params.orderType == "64" ? "爽约" : "已过期"
                    }
                    template = $("#other_template").html();
                }
                $("#total").text('共' + list == [] ? 0 : list.length + '条');
                $.each(list, function (index, item) {
                    html += template.replace(RegResources.yyReg, item.yy)
                        .replace(RegResources.idReg, index)
                        .replace(RegResources.ksReg, item.ks)
                        .replace(RegResources.ysReg, item.ys)
                        .replace(RegResources.jzsjReg, item.jzsj)
                        .replace(RegResources.qhsjReg, item.qhsj)
                        .replace(RegResources.qhddReg, item.qhdd)
                        .replace(RegResources.orderIdReg, item.orderId)
                        .replace(RegResources.sbmReg, item.sbm)
                        .replace(RegResources.ghrReg, item.ghr)
                        .replace(RegResources.ysfwfReg, item.fwf)
                        .replace(RegResources.hospitalTypeReg, item.hospitalType)
                        .replace(RegResources.statusReg, status);
                })
                $("#results").html(html);
                /*
                 *查询动画提示结束
                 */
                $('#dialogMask,#dialog').hide();

            } else {
                /*
                 *查询动画提示结束
                 */
                $('#dialogMask,#dialog').hide();

                $("#total_div").hide()
                $("#results").html("")
                $("#result_err").html(data.rtnMsg).show()
            }
            ;
        })
    }
    $(document).on("touchstart", "img[id^='tab-tit-']", function () {
        var id = $(this).attr("id").replace("tab-tit-", "");
        $("#tab-content-" + id).toggle(100)
    })
    getDetail();
    $("#search").click(function () {
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        getDetail("1", startDate, endDate);
    })
    cancelReg = function (param) {
        var orderId = param.split("_")[0],
            hospitalType = param.split("_")[1];
        if (!orderId || !hospitalType) {
            masktime("已过退号时间！");
            return;
        }
        var data = {
            orderId: orderId,
            hospitalType: hospitalType.trim(),
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
            url: '/hospital/regCancel',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.retCode == '000000' && data.responseBody.code == '200') {
                masktime("取消挂号成功！");
                getDetail()
            } else {
                masktime(data.responseBody.msg || "取消挂号失败！")
            }
        })
    }
    $('#back').on("click", function () {
        var url = "/hospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;//跳转到对应的页面
    })
    function masktime(mgs) {
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
});
