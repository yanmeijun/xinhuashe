//相差几个月份的时间
function getPreMonthDay(date, monthNum) {
    let dateArr = date.split('-')
    let year = dateArr[0] //获取当前日期的年份
    let month = dateArr[1] //获取当前日期的月份
    let day = dateArr[2] //获取当前日期的日
    let days = new Date(year, month, 0)
    days = days.getDate() //获取当前日期中月的天数
    let year2 = year
    let month2 = parseInt(month) - monthNum
    if (month2 <= 0) {
        year2 =
            parseInt(year2) -
            parseInt(month2 / 12 == 0 ? 1 : Math.abs(parseInt(month2 / 12)) + 1)
        month2 = 12 - (Math.abs(month2) % 12)
    }
    let day2 = day
    let days2 = new Date(year2, month2, 0)
    days2 = days2.getDate()
    if (day2 > days2) {
        day2 = days2
    }
    if (month2 < 10) {
        month2 = '0' + month2
    }
    let t2 = year2 + '-' + month2 + '-' + day2;
    return t2
}
var jsTime = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
if((new Date().getMonth() + 1)<10){
    jsTime = new Date().getFullYear() + "-0" + (new Date().getMonth()+ 1) + "-" + new Date().getDate()
}
var ksTime = getPreMonthDay(jsTime, 3);
$('#appDate').attr("main-time", ksTime);
$('#appDate').attr("placeholder", ksTime);
$('#appTime').attr("main-time", jsTime);
$('#appTime').attr("placeholder", jsTime);
var pageNum = 1, totlePage = 0, totalnum = 0;//定义全局变量
$(function () {
    fnSize();
    window.addEventListener('resize', fnSize, false);
    function fnSize() {
        document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
    }
    $('#businessfund').html("");
});

/*
 * 返回按钮
 */
function back() {
    var url = "/bjgjj?page=basicInfo&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
};
$('#search').on('click', function () {
    var tmp = $('#appDate').attr("main-time").split("-");
    var firstDate = new Date(tmp[0],tmp[1],tmp[2]);
    var tmps = $('#appTime').attr("main-time").split("-");
    var secondDate = new Date(tmps[0],tmps[1],tmps[2]);
    var years=0;
    while (firstDate.setFullYear(firstDate.getFullYear() + 1) <= secondDate)
    {
        years++;
    }
    if(years>2){
        masktime("当前时间和结束时间不能超过2年");
        return;
    }
    $('#businessfund').html("");
    pageNum = 1;
    falg = true;
    $('#dialogMask,#dialog').show();
    businessfund();
})

function businessfund() {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        pageNum: pageNum,
        ksrq: $('#appDate').attr("main-time"),//开始日期
        jsrq: $('#appTime').attr("main-time")//结束日期

    };
    $.ajax({
        async: true,
        url: "/bjgjj/housingFund",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            $('#dialogMask,#dialog').hide();
            if (res.retCode == "000000") {
                pageNum++;
                totlePage = res.responseBody.data.totalPages;//总页数
                if (res.responseBody.data.list.length == 0) {
                    $('#noDate').show();
                    $('#bus').hide();
                    return;
                }
                ;
                var htmls = "";
                $.each(res.responseBody.data.list, function (index, item) {
                    var itemArr = JSON.stringify(item);
                    htmls += "<div class=\"text-list-div clearfix\">" +
                        "<label>" + item.ywfsrq + "</label>" +
                        "<img src=\"/images/icon-rightArrow.png\" class=\"icon-rightArrow\" onclick='tipCon(" + itemArr + ")'>" +
                        "<span>" + "+" + item.zjje + "</span>" +
                        "</div>";
                });
                $('#businessfund').append(htmls);
                $('#bus').show();
                $('#noDate').hide();
                falg = true;
            } else {
                masktime(res.responseBody.errorMsg);
                if(pageNum == 2){
                    pageNum = 1
                }
                return;
            }
        },
        error: function () {
            masktime("请求异常");
            return;
        }
    });
};

function tipCon(mgs) {
    document.getElementsByTagName('body')[0].style.position = "fixed";
    $('#detail,#detailCon').show();
    var html = "";
    $.each([mgs], function (index, val) {
        html += "<li><span>业务发生日期：</span><span>" + val.ywfsrq + "</span></li>" +
            "<li><span>单位登记号：</span><span>" + val.dwdjrq + "</span></li>" +
            "<li><span>账户名称：</span><span>" + val.zhmc + "</span></li>" +
            "<li><span>业务类型：</span><span>" + val.ywlx + "</span></li>" +
            "<li><span>汇缴年月：</span><span>" + val.hjny + "</span></li>" +
            "<li><span>增加金额：</span><span>" + val.zjje + "</span></li>" +
            "<li><span>减少金额：</span><span>" + val.jsje + "</span></li>" +
            "<li><span>余额：</span><span>" + val.ye + "</span></li>" +
            "<li><span>缴款单位：</span><span>" + val.jkdw + "</span></li>" +
            "<li><span>操作平台：</span><span>" + val.czpt + "</span></li>";
    });
    $('#list').html(html);
};
$('#detail').on("click", function () {
    $('#detail,#detailCon').hide();
    document.getElementsByTagName('body')[0].style.position = "static";
})

//提示语
function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
};
var falg = true;
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(window).height();
    if (scrollTop + windowHeight >= scrollHeight - 10) {
        if (pageNum > totlePage) {
            return;
        }
        if (falg) {
            falg = false;
            $('#dialogMask,#dialog').show();
            businessfund();
        }
    }
});

$(function () {//来电时间和来电日期
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
        endYear: currYear + 12, //结束年份
        onBeforeShow: function (inst) {//展示前的事件
            document.activeElement.blur();
            document.getElementsByTagName('body')[0].style.position = "fixed";
        },
        onSelect: function (valueText, inst) {//选择时事件（点击确定后），valueText 为选择的时间，
            $(this).attr("main-time", valueText);
            document.getElementsByTagName('body')[0].style.position = "static";
        },
        onClose:function(textVale,inst){ //插件效果退出时执行 inst:表示点击的状态反馈：set/cancel
            document.getElementsByTagName('body')[0].style.position = "static";
        }
    };
    $("#appDates").click(function () {
        $("#appDate").mobiscroll("show");
    });
    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));


    /*结束时间*/
    $("#appTimes").click(function () {
        $("#appTime").mobiscroll("show");
    });
    $("#appTime").mobiscroll($.extend(opt['date'], opt['default']));
});