var entrySite = [
    {"data": [
        {"id": 1, "name": "刚察"},
        {"id": 2, "name": "尖扎"},
        {"id": 3, "name": "西海"},
        {"id": 4, "name": "玉树"},
        {"id": 5, "name": "同仁"}
    ]}
];
var endSite = [
    {"data": [
        {"id": 1, "name": "尖扎"}
    ]}
];
var carType = [
    {"data": [
        {"id": 1, "name": "不限车型"},
        {"id": 2, "name": "中型中客"},
        {"id": 3, "name": "大型高一"},
        {"id": 4, "name": "中型高二"},
        {"id": 5, "name": "大型高一卧"},
        {"id": 6, "name": "大型高二卧"},
        {"id": 7, "name": "大型中卧"},
        {"id": 8, "name": "大型高二"},
        {"id": 9, "name": "中型高一"},
        {"id": 10, "name": "大型中客"},
        {"id": 11, "name": "小型高一"}
    ]}
];
var enterStation = $("#start").html();
var exitStation = $("#end").html();
var vehicvarype = $("#carType").html();
var oldChoose = "刚察";
$("#clickStart").on("click", function () {
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#start',
        title: '起点',
        wheels: entrySite,
        callback: function (indexArr, data) {
            var start = data[0].name;
			$('#start').css("color","#474747")
            if (start == "刚察") {
                endSite = [
                    {"data": [
                        {"id": 1, "name": "海晏"},
                        {"id": 1, "name": "西宁"}
                    ]}
                ];
                $("#end").html("海晏")
                /*if (start != oldChoose) {
                    $("#end").html("海晏")
                }*/
            } else if (start == "尖扎") {
                endSite = [
                    {"data": [
                        {"id": 2, "name": "西宁"},
                        {"id": 2, "name": "同仁"}
                    ]}
                ];
                if (start != oldChoose) {
                    $("#end").html("西宁")
                }
            } else if (start == "西海") {
                endSite = [
                    {"data": [
                        {"id": 3, "name": "共和"},
                        {"id": 3, "name": "祁连"},
                        {"id": 3, "name": "刚察（海晏）"},
                        {"id": 3, "name": "西宁"},
                        {"id": 3, "name": "门源"}
                    ]}
                ];
                if (start != oldChoose) {
                    $("#end").html("共和")
                }
            } else if (start == "玉树") {
                endSite = [
                    {"data": [
                        {"id": 4, "name": "西宁（卧）"},
                        {"id": 4, "name": "西宁"}
                    ]}
                ];
                if (start != oldChoose) {
                    $("#end").html("西宁（卧）")
                }
            } else if (start == "同仁") {
                endSite = [
                    {"data": [
                        {"id": 5, "name": "尖扎"},
                        {"id": 5, "name": "临夏"},
                        {"id": 5, "name": "西宁（高客）"},
                        {"id": 5, "name": "泽库"},
                        {"id": 5, "name": "河南"},
                        {"id": 5, "name": "坎布拉"},
                        {"id": 5, "name": "夏河"},
                        {"id": 5, "name": "循化"}
                    ]}
                ];
                if (start != oldChoose) {
                    $("#end").html("尖扎")
                }
            }
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
    event.preventDefault();
})

$("#clickEnd").on("click", function () {
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#end',
        title: '终点',
        wheels: endSite,
        callback: function () {
			$('#end').css("color","#474747")
		}
    });

    $(".mobileSelect").addClass("mobileSelect-show");
    event.preventDefault();
})
$("#clickCarType").on("click", function () {
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#carType',
        title: '车型',
        wheels: carType,
        callback: function () {
			$('#carType').css("color","#474747")
		}
    });
    $(".mobileSelect").addClass("mobileSelect-show");
    event.preventDefault();
})

var pageNum = 0;
var isCanScroll = true;
var totalNum = 0;
//点击查询按钮
$("#searchBtn").on("click", function () {
    $("#reault").html("");
    pageNum = 0;
    totalNum = 0;
    isCanScroll = true;
    enterStation = $("#start").html();
    exitStation = $("#end").html();
    vehicvarype = $("#carType").html();
    if (enterStation.trim() == "" || enterStation.trim() == "请选择起点") {
        maskTip("请选择入口收费站");
        $("#searchResult").hide();
        return;
    }
    if (exitStation == "" || exitStation == "请选择终点") {
        maskTip("请选择出口收费站");
        $("#searchResult").hide();
        return;
    }

    if (vehicvarype == "" || vehicvarype == "请选择车型" || !vehicvarype) {
        maskTip("请选择车型");
        $("#searchResult").hide();
        return;
    }
    if (enterStation === exitStation) {
        maskTip("起点和终点不能相同");
        $("#searchResult").hide();
        return;
    }
    ;
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();
    getData();

   // event.preventDefault();
})
// 参数为空时的提示语
function maskTip(mgs) {
    $('#masktime').html(mgs);
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return;
}
window.addEventListener('scroll', handleScroll);
function handleScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var bodyHeight = document.body.clientHeight;
    var clientHeight = document.documentElement.clientHeight;//可视区高度
    if (scrollTop + clientHeight + 20 > bodyHeight) {
        if (isCanScroll) {
            if (totalNum != 0) {
                if (pageNum + 1 >= totalNum) {
                    isCanScroll = false;
                    //maskTip("数据加载完毕");
                    return;
                }
            }
            pageNum++;
            /*
             *查询动画提示结束
             */
            $('#dialogMask,#dialog').show();
            getData();
        }
    }
}
var dataLord = true;
function getData() {
    isCanScroll = false;
    if (dataLord) {
        dataLord = false;
        var parameters = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,
            localFrom:localFrom,
            local_y: local_y,
            currentpage:pageNum,
            pagesize:"6",
            startstation:enterStation,
            endstation:exitStation,
            model:vehicvarype
        };
        //xml: "{'token':'Epoint_WebSerivce_**##0601','params':{'currentpage':" + pageNum + ",'pagesize':6,'startstation':'" + enterStation + "','model':'" + vehicvarype + "'}}"
        $.ajax({
            async: true,
            url: "/QhPassengerTransport/search",
            type: "post",
            data: JSON.stringify(parameters),
            contentType: 'application/json',
            success: function (res) {
                /**查询动画提示结束*/
                $('#dialogMask,#dialog').hide();
                if (res.retCode == "000000") {
                    if (res.responseBody.custom.totalcount == 0) {
                        $("#searchResult").hide();
                        $("#searchNoResult").show();
                        dataLord = true;
                        return;
                    }
                    $("#searchNoResult").hide();
                    var data = res.responseBody.custom.passlinedatalist;
                    $("#totalNum").html(res.responseBody.custom.totalcount);
                    var strCode = "";
                    totalNum =Math.ceil(res.responseBody.custom.totalcount/6)
                    //totalNum = res.responseBody.pagenum;
                    for (var i = 0; i < data.length; i++) {
                        strCode += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                            "<h2 class=\"q-r-tit k-y-title\">" + data[i].CHECI + "次<label class=\"date\">班期：" + data[i].BANQI + "</label></h2>" +
                            "<hr class=\"hrLine\">" +
                            "<div class=\"con-box k-y-infor clearfix\">" +
                            "<span>" +
                            "<p>发车站点：<b class=\"colorBlue\">" + data[i].LINE.split("-")[0] + "</b></p>" +
                            "<p>发车时间：<b class=\"colorBlue\">" + data[i].FACHETIME + "</b></p>" +
                            "</span>" +
                            "<span>" +
                            "<p><b></b><b></b></p>" +
                            "</span>" +
                            "<span>" +
                            "<p>终点站：<b class=\"colorBlue\">" + data[i].LINE.split("-")[1] + "</b></p>" +
                            "<p>票价：<b class=\"colorRed\">" + data[i].FARE + "</b></p>" +
                            "</span>" +
                            "</div>" +
                            "<div class=\"syNum\">" +
                            "<span>座位数：<b class=\"colorBlue\">" + data[i].SEAT + "</b></span>" +
                            "<span>车牌号：" + data[i].NUMBERPLATE + "</span>" +
                            "<span>车牌颜色：" + data[i].CHEPAICOLOR + "</span>" +
                            "</div>" +
                            "</div>";
                    }
                    $("#reault").append(strCode);
                    $("#searchResult").show();
                    isCanScroll = true;
                    dataLord = true;
                }
            },
            error: function () {
                maskTip("查询错误");
                $("#searchResult").hide();
                $("#searchNoResult").hide();
                dataLord = true;
            }
        })
    }

}