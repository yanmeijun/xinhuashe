var calltimes;
//点击确认
$("#report").on("click", function (event) {
    /*
     * 0  未发生过致人伤亡事故
     * 1  发生过致人伤亡事故
     * */
    var cllx = $('#carinspectTrigger').attr("data_id");
    if (cllx == undefined) {
        masktime("请选择车辆类型")
        return;
    }
    if (calltimes == undefined) {
        masktime("请选择注册登记时间")
        return;
    } else if (calltimes == "请选择注册日期") {
        masktime("请选择注册登记时间")
        return;
    }
    ;
    var ccdjrq = new Date($("#appDate").val().replace(/-/g, "/"));//注册登记时间
    var sgqk = $("input:radio[name='radio']:checked").val();
    var sysDate = new Date(), day = new Date(), lastday = new Date();
    if (cllx == "1") {
        //取5年内的最后一天比较
        lastday = cal_lastday(ccdjrq, 5);
        if (sysDate <= lastday) {
            cal_jyqz(ccdjrq, sysDate, 12, 0);
            return;
        }
        //每6个月检验一次
        cal_jyqz(ccdjrq, sysDate, 6, 0);
        return;
    }

    if (cllx == "2") {
        //取10年内的最后一天比较
        lastday = cal_lastday(ccdjrq, 10);
        if (sysDate <= lastday) {
            cal_jyqz(ccdjrq, sysDate, 12, 0);
            return;
        }
        //每6个月检验一次
        cal_jyqz(ccdjrq, sysDate, 6, 0);
        return;
    }

    if (cllx == "3") {
        //6年免检，取4年内的最后一天比较，对于前2个周期提示属于免检
        lastday = cal_lastday(ccdjrq, 4);

        if (sysDate <= lastday) {
            if (sgqk == "0" && ccdjrq >= new Date("2010/09/01")) {
                cal_jyqz(ccdjrq, sysDate, 24, 1);
            } else {
                cal_jyqz(ccdjrq, sysDate, 24, 0);
            }
            return;
        }
        //15年内
        lastday = cal_lastday(ccdjrq, 15);
        if (sysDate <= lastday) {
            cal_jyqz(ccdjrq, sysDate, 12, 0);
            return;
        }
        //每6个月检验一次
        cal_jyqz(ccdjrq, sysDate, 6, 0);
        return;
    }

    if (cllx == "4") {
        //取6年内的最后一天比较
        lastday = cal_lastday(ccdjrq, 4);
        if (sysDate <= lastday) {
            cal_jyqz(ccdjrq, sysDate, 24, 0);
            return;
        }
        cal_jyqz(ccdjrq, sysDate, 12, 0);
        return;
    }

    if (cllx == "5") {
        cal_jyqz(ccdjrq, sysDate, 12, 0);
        return;
    }

    if (cllx == "6") {
        //取6年内的最后一天比较
        lastday = cal_lastday(ccdjrq, 6);
        if (sysDate <= lastday) {
            cal_jyqz(ccdjrq, sysDate, 24, 0);
            return;
        }
        //15年内
        lastday = cal_lastday(ccdjrq, 15);
        if (sysDate <= lastday) {
            cal_jyqz(ccdjrq, sysDate, 12, 0);
            return;
        }
        //每6个月检验一次
        cal_jyqz(ccdjrq, sysDate, 6, 0);
        return;
    }
});

function cal_jyqz(ccdjrq, sysDate, interval, sfmj) {
    var day = new Date();
    if (sysDate.getFullYear() == ccdjrq.getFullYear() && sysDate.getMonth() == ccdjrq.getMonth())
        day = new Date(sysDate.getFullYear() + interval / 12, sysDate.getMonth() + 1, 1);
    else
        day = new Date(sysDate.getFullYear(), sysDate.getMonth()
            + (12 * (sysDate.getFullYear() - ccdjrq.getFullYear() + 2)
            + ccdjrq.getMonth() - sysDate.getMonth()) % interval
            + 1, 1);

    var last = new Date(day - 86400000);

    if (last >= new Date("2014/09/01") && sfmj == "1") {
        $("#jybzrq").html(
                last.getFullYear() + "年" + (last.getMonth() + 1) + "月"
                + last.getDate() + "日");
        $("#rq1").css('display', 'block');
        $("#rq2").css('display', 'none');
    }
    else {
        $("#jyrq").html(
                last.getFullYear() + "年" + (last.getMonth() + 1) + "月"
                + last.getDate() + "日");
        $("#rq2").css('display', 'block');
        $("#rq1").css('display', 'none');
    }
    $("#result").css('display', 'block');
}

function cal_lastday(ccdjrq, year) {
    return new Date(new Date(ccdjrq.getFullYear() + year,
            ccdjrq.getMonth() + 1, 1) - 86400000);
}

/*
 *选择车辆类型
 */
$('#carinspect,#carinspectTrigger').on('click', function () {
    var weekdayArr = [
        {"id": "1", "name": "营运客车"},
        {"id": "2", "name": "货车,大中型客车"},
        {"id": "3", "name": "7座以下非营运小客车"},
        {"id": "6", "name": "面包车和7座（含）以上非营运小客车"},
        {"id": "4", "name": "摩托车"},
        {"id": "5", "name": "其他机动车"}
    ];
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#carinspectTrigger',
        title: '车辆类型',
        wheels: [
            {data: weekdayArr}
        ]
    });
    $(".mobileSelect").addClass("mobileSelect-show");
})

/*
 *选择日期
 */
$(function () {
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
        endYear: currYear, //结束年份
        onBeforeShow: function (inst) {//展示前的事件
            document.activeElement.blur()
        },
        onSelect: function (valueText, inst) {//选择时事件（点击确定后），valueText 为选择的时间，
            //valueText.match(/^\d{4}\-\d{2}\-\d{2}$/);
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
                if (n >= curr) {
                    if (yu > currMonth + 1) {//所选的日期大于今天的日期
                        alert("注册日期超过当前时间，请重新选择！ ");
                        valueText = "请选择注册日期";
                        $("#appDate").val(valueText)
                    }
                    if (rii > currDay) {
                        alert("注册日期超过当前时间，请重新选择！");
                        valueText = "请选择注册日期";
                        $("#appDate").val(valueText)
                    }
                }
                selectedDate["date"] = valueText;
            }
            calltimes = selectedDate.date;
        }
    };

    $("#appTime").click(function () {
        $("#appDate").mobiscroll("show");
    });
    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
    var optDateTime = $.extend(opt['datetime'], opt['default']);

});

function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
}