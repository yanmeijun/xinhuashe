var name = sessionStorage.getItem("name"),
    card = sessionStorage.getItem("card"),
    phone = sessionStorage.getItem("phone"),
    city = sessionStorage.getItem("city");
$(function () {
    $('#verification').click();//验证码获取
});
//获取验证码
$('#verification').click(function () {
    $("#verification").attr("src", "/images/yanzm.gif");
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: "/dutyCrimeReport/getVeryCode",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#verification').attr("src", data);
        }
    })
});
/*
* 举报正文之前需要进行非空判断
**/
$('#submit').on("click", function () {
    var beReportName = $('#beReportName').val(),
        beReportUnit = $('#beReportUnit').val(),
        citySelect = $('#citySelect').text(),
        cardType = $('#cardType').text(),
        suspectedNature = $('#suspectedNature').text(),
        specialStatus = $('#specialStatus').text(),
        suspectedArea = $('#suspectedArea').text(),
        content = $('#content').val(),
        reportImg = $('#reportImg').val();
    //请选择涉嫌性质
    if (!beReportName) {
        maskTip("请填写被举报人姓名");
        return;
    } else if (!beReportUnit) {
        maskTip("请填写被举报人单位");
        return;
    } else if (citySelect == "请选择省/市/区") {
        maskTip("请选择省/市/区");
        return;
    } else if (cardType == "请选择身份") {
        maskTip("请选择身份");
        return;
    } else if (suspectedNature == "请选择涉嫌性质") {
        maskTip("请选择涉嫌性质");
        return;
    }  else if (!content) {
        maskTip("请输入举报内容");
        return;
    } else if (!reportImg) {
        maskTip("请输入验证码");
        return;
    }
   /* else if (specialStatus == "请选择特殊身份") {
        maskTip("请选择特殊身份");
        return;
    } else if (suspectedArea == "请选择涉嫌领域") {
        maskTip("请选择涉嫌领域");
        return;
    } */

    ajaxData(beReportName, beReportUnit, citySelect, cardType, suspectedNature, specialStatus, suspectedArea, content, reportImg)
});

function ajaxData(beReportName, beReportUnit, citySelect, cardType, suspectedNature, specialStatus, suspectedArea, content, reportImg) {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        JBKJXSLY_SFSM1: "1",
        JBKJXSLY_JBRXM1: name.trim(),
        JBKJXSLY_JBRSFZH1: card.trim(),
        JBKJXSLY_JBRDH1: phone.trim(),
        JBKJXSLY_LXDQ1: city,
        JBKJXSLY_BJBRDW1: beReportUnit,
        JBKJXSLY_BJBRXM1: beReportName,
        JBKJXSLY_AFDQ1: $('#citySelect').attr("main-area"),
        JBKJXSLY_SF1: $('#cardType').attr("main-area"),
        JBKJXSLY_TSSF1: $('#specialStatus').attr("main-area") || "",
        JBKJXSLY_SALY1: $('#suspectedArea').attr("main-area") || "",
        JBKJXSLY_ZYSXXZ1: $('#suspectedNature').attr("main-area"),
        JBKJXSLY_SYZY: content.trim(),
        number: reportImg.trim()
    };
    $.ajax({
        async: true,
        url: "/dutyCrimeReport/reportText",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if (res.retCode == "000000") {
                sessionStorage.setItem("dutyCrimeResult", JSON.stringify(res.responseBody));
                if (res.responseBody.status.indexOf("成功") != -1) {
                    window.location.href = "/dutyCrimeReport?page=success&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                    return;
                } else {
                    window.location.href = "/dutyCrimeReport?page=failed&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                    return;
                }
            }
        },
        error: function () {
            maskTip("请求失败");
            return;
        }
    })
};
document.getElementById("back").onclick = function () {
    window.location.href = "/dutyCrimeReport?page=informerInfo&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
};
var domLoadFnArr = [], cityArr = [], globalCon = '', cityCode = [];
/*
* @params
* $.fn.next[function] 封装了获取地区;身份;性质数据
* citySelect mask 是隐藏域
* url 接口地址
*/
$.fn.next = function (opt) {
    var obj = {
        citySelect: ".citySelect",
        mask: ".mask",
        diaMask: ".diaMask",
        url: "/dutyCrimeReport/allType"// url接口
    }
    var _set = $.extend({}, obj, opt);
    return $(this).each(function () {
        $(this).on("click", function () {
            $('#dialogMask,#dialog').show();
            ajaxData();//选择地区
        });
        //关闭地区选择
        var _close = function () {
            document.getElementById("dialog-close").onclick = function () {
                var con = ""
                for (var i in cityArr) {
                    con += cityArr[i] + "/"
                }
                con = con.substring(0, con.lastIndexOf("/"));
                if (globalCon == '.citySelect') {
                    if(!con){
                        $('#citySelect').html("请选择省/市/区");
                        $('#citySelect').attr("main-area", "");
                    }else{
                        $('#citySelect').html(con);
                        $('#citySelect').attr("main-area", cityCode[cityCode.length - 1]);
                    }
                } else if (globalCon == '.cardType') {
                    if(!con){
                        $('#cardType').html("请选择身份");
                        $('#cardType').attr("main-area", "");
                    }else{
                        $('#cardType').html(con);
                        $('#cardType').attr("main-area", cityCode[cityCode.length - 1]);
                    }
                } else if (globalCon == '.suspectedNature') {
                    if(!con){
                        $('#suspectedNature').html("请选择涉嫌性质");
                        $('#suspectedNature').attr("main-area", "");
                    }else{
                        $('#suspectedNature').html(con);
                        $('#suspectedNature').attr("main-area", cityCode[cityCode.length - 1]);
                    }
                } else if (globalCon == '.specialStatus') {
                    if(!con){
                        $('#specialStatus').html("请选择特殊身份");
                        $('#specialStatus').attr("main-area", "");
                    }else{
                        $('#specialStatus').html(con);
                        $('#specialStatus').attr("main-area", cityCode[cityCode.length - 1]);
                    }
                }
                $(_set.mask).hide();
                $(_set.diaMask).hide();
            }
        }();

        //请求数据
        function ajaxData() {
            $("#countrySelect").html("");
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                localFrom: localFrom,
                local_y: local_y,
            };
            $.ajax({
                async: true,
                url: "/dutyCrimeReport/allType",
                type: "post",
                data: JSON.stringify(parameters),
                contentType: 'application/json',
                success: function (res) {
                    $('#dialogMask,#dialog').hide();
                    if (res.retCode == "000000") {
                        globalCon = _set.citySelect;
                        var data = res.responseBody.rows.ZONE;
                        if (globalCon == '.citySelect') {
                            data = res.responseBody.rows.ZONE;
                        } else if (globalCon == '.cardType') {
                            data = res.responseBody.rows.ID;
                        } else if (globalCon == '.suspectedNature') {
                            data = res.responseBody.rows.NATURE;
                        } else if (globalCon == '.specialStatus') {
                            data = res.responseBody.rows.SPECIAL_ID;
                        }
                        domLoadFnArr = data;
                        select(data);
                        $(_set.mask).show();
                        $(_set.diaMask).show();
                        $('#titleCon').html("");
                    }
                },
                error: function () {
                    maskTip("请求失败");
                    return;
                }
            })
        };

        /*渲染一级菜单*/
        function select(data) {
            cityArr = [];//释放缓存
            cityCode = [];//释放缓存
            var html = "";
            data.forEach(function (item, index) {
                html += "<li main-data = " + item.id + "  onclick=initSelect('" + item.text.trim() + "','" + item.id + "','" + index + "')>" + item.text + "</li>";
            })
            $("#countrySelect").html(html);
        };
    })
};
/*渲染二级菜单*/
var initSelect = function (mgs, id, index) {
    cityArr = [];//释放缓存
    cityCode = [];//释放缓存
    $('#titleCon').html();//清空标题
    //sessionStorage.setItem("JBKJXSLY_AFDQ1", id);
    if (id == "0") {
        return;
    }
    cityArr.push(mgs);
    cityCode.push(id);
    cityArrFun(cityArr)//调用回填数据
    $("#countrySelect").html();
    var html = "";
    if (domLoadFnArr[index].children.length == 0) {
        if (globalCon == '.citySelect') {
            $('#citySelect').html(cityArr[0]);
            $('#citySelect').attr("main-area", id);
        } else if (globalCon == '.cardType') {
            $('#cardType').html(cityArr[0]);
            $('#cardType').attr("main-area", id);
        } else if (globalCon == '.suspectedNature') {
            $('#suspectedNature').html(cityArr[0]);
            $('#suspectedNature').attr("main-area", id);
        } else if (globalCon == '.specialStatus') {
            $('#specialStatus').html(cityArr[0]);
            $('#specialStatus').attr("main-area", id);
        }
        $('.diaMask').hide();
        $('.mask').hide();
    }
    domLoadFnArr[index].children.forEach(function (item, i) {
        html += '<li  main-data=' + item.id + '  onclick=countrySelect("' + item.text.trim() + '","' + item.id + '","' + index + '")>' + item.text + '</li>';
    })
    $('#countrySelect').html(html)
};

/*渲染三级菜单*/
function countrySelect(mgs, id, oldindex) {
    cityArr.push(mgs);
    cityCode.push(id);
    cityArrFun(cityArr);
    //sessionStorage.setItem("JBKJXSLY_AFDQ1", id);
    if (globalCon == '.citySelect') {
        $('#citySelect').html(cityArr[0] + "/" + cityArr[1]);
        $('#citySelect').attr("main-area", id);
    } else if (globalCon == '.cardType') {
        $('#cardType').html(cityArr[0] + "/" + cityArr[1]);
        $('#cardType').attr("main-area", id);
    } else if (globalCon == '.suspectedNature') {
        $('#suspectedNature').html(cityArr[0] + "/" + cityArr[1]);
        $('#suspectedNature').attr("main-area", id);
    } else if (globalCon == '.specialStatus') {
        $('#specialStatus').html(cityArr[0] + "/" + cityArr[1]);
        $('#specialStatus').attr("main-area", id);
    }
    var html = "";
    domLoadFnArr[oldindex].children.forEach(function (item, ind) {
        if (item.id == id) {
            //console.log(item.children == undefined)
            if (item.children != undefined && item.children.length != 0) {
                item.children.forEach(function (items, inds) {
                    html += '<li  main-data=' + items.id + '  onclick=countrySelects("' + items.text.trim() + '","' + items.id + '","' + inds + '")>' + items.text + '</li>';
                })
            } else {
                $(".mask,.diaMask").hide();
            }
        }

    })
    $('#countrySelect').html(html)
};

function countrySelects(mgs, id, inds) {
    //sessionStorage.setItem("JBKJXSLY_AFDQ1", id);
    cityArr.push(mgs);
    cityCode.push(id);
    cityArrFun(cityArr)
    if (globalCon == '.citySelect') {
        $('#citySelect').html(cityArr[0] + "/" + cityArr[1] + "/" + cityArr[2]);
        $('#citySelect').attr("main-area", id);
    } else if (globalCon == '.cardType') {
        $('#cardType').html(cityArr[0] + "/" + cityArr[1] + "/" + cityArr[2]);
        $('#cardType').attr("main-area", id);
    } else if (globalCon == '.suspectedNature') {
        $('#suspectedNature').html(cityArr[0] + "/" + cityArr[1] + "/" + cityArr[2]);
        $('#suspectedNature').attr("main-area", id);
    } else if (globalCon == '.specialStatus') {
        $('#specialStatus').html(cityArr[0] + "/" + cityArr[1] + "/" + cityArr[2]);
        $('#specialStatus').attr("main-area", id);
    }
    $('.diaMask').hide();
    $('.mask').hide();
};

function cityArrFun(cityArr) {
    var titleMgs = ""
    for (var i in cityArr) {
        titleMgs += '<li><label></label><span>' + cityArr[i] + '</span></li>';
    }
    titleMgs += '<li class="btnSelect"><label></label><span>请选择</span></li>';
    $('#titleCon').html(titleMgs);
}

$('#select .citySelect').next({
    citySelect: ".citySelect"
});
$('#card .cardType').next({
    citySelect: ".cardType"
});
$('#nature .suspectedNature').next({
    citySelect: ".suspectedNature"
});
$('#status .specialStatus').next({
    citySelect: ".specialStatus"
});
$('#area').on("click", function () {
    $("#countrySelect").html("");
    $('#titleCon').html("");
    $('#dialogMask,#dialog').show();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: "/dutyCrimeReport/suspectedArea",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            $('#dialogMask,#dialog').hide();
            var data = res.responseBody.rows.JBKJXSLY_SALY;
            var html = "";
            data.forEach(function (item, index) {
                html += "<li main-data = " + item.id + "  onclick=initSelectArea('" + item.text.trim() + "','" + item.id + "','" + index + "')>" + item.text + "</li>";
            })
            $("#countrySelect").html(html);
            $(".mask").show();
            $(".diaMask").show();
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
});

function initSelectArea(mgs, id, inds) {
    $('#suspectedArea').html(mgs);
    $('#suspectedArea').attr("main-area", id);
    $(".mask").hide();
    $(".diaMask").hide();
}