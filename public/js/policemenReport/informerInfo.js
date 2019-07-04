/*
 *@author ymj
 * $.fn.next [function]  校验非空判断
*/
var back = function () {
    var goBack = document.getElementById('goback');
    goBack.onclick = function () {
        var url = "/policemenReport?page=policemenReport&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    }
}();
var domLoadFnArr = [];
$.fn.next = function (opt) {
    var obj = {
        targetEle: ".emptyField",
        cityCon: ".cityCon",
        cityTest: "请选择",
        citySelect: ".citySelect",
        mask: ".mask",
        diaMask: ".diaMask",
        url: "/policemenReport/regionalIdentity",// url接口
        domLoadFnArr: [],
        cityArr: []
    }
    var _set = $.extend({}, obj, opt)
    return $(this).each(function () {
        $(this).on("click", function () {
            if (!$(_set.targetEle).eq(0).val()) {
                maskTip("请输入举报人姓名");
                return;
            } else if (!$(_set.targetEle).eq(1).val()) {
                maskTip("请输入举报人身份证号");
                return;
            } else if (!validateIdCard($(_set.targetEle).eq(1).val())) {
                maskTip("身份证号格式不正确");
                return;
            } else if (!$(_set.targetEle).eq(2).val()) {
                maskTip("请输入举报人联系电话");
                return;
            } else if ($(_set.cityCon).text() == _set.cityTest) {
                maskTip("请选择所在地区");
                return;
            }
            sessionStorage.setItem("name", $(_set.targetEle).eq(0).val());
            sessionStorage.setItem("card", $(_set.targetEle).eq(1).val());
            sessionStorage.setItem("phone", $(_set.targetEle).eq(2).val());
            window.location.href = "/policemenReport?page=bInformerInfo&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
            return;
        });
        //选择地区
        $(_set.citySelect).on("click", function () {
            $('#dialogMask,#dialog').show();
            ajaxData();
        });
        //关闭地区选择  需要回填所选的数据
        var _close = function () {
            document.getElementById("dialog-close").onclick = function () {
                var con = ""
                for (var i in cityArr) {
                    con += cityArr[i] + "/"
                }
                con = con.substring(0, con.lastIndexOf("/"));
                $('#citySelect').html(con)
                $('#citySelect').attr("main-code", cityCode[cityCode.length - 1]);
                sessionStorage.setItem("city", $('#citySelect').attr("main-code"));
                $(_set.mask).hide();
                $(_set.diaMask).hide();
            }
        }();

        //请求数据
        function ajaxData() {
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
                url: "/policemenReport/regionalIdentity",
                type: "post",
                data: JSON.stringify(parameters),
                contentType: 'application/json',
                success: function (res) {
                    $('#dialogMask,#dialog').hide()
                    if (res.retCode == "000000") {
                        var data = res.responseBody.rows.ZONE;
                        domLoadFnArr = data
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

        // 渲染一级数据
        function select(data) {
            var html = "";
            data.forEach(function (item, index) {
                html += "<li main-data = " + item.id + " onclick=initSelect('" + item.text + "','" + item.id + "','" + index + "')>" + item.text + "</li>";
            })
            $("#countrySelect").html(html);
        };
    })
}
$('.next').next({});
//获取地区 渲染二级数据
var cityArr = [];
var cityCode = [];
var flag = false;
var initSelect = function (mgs, id, index) {
    cityArr = [];
    cityCode = [];//对应的编码
    $('#titleCon').html("");
    sessionStorage.setItem("city", id);
    if (id == "0") {
        return;
    }
    cityArr.push(mgs);
    cityCode.push(id);
    cityArrFun(cityArr)
    $("#countrySelect").html();
    var html = "";
    if (domLoadFnArr[index].children.length == 0) {
        $('#citySelect').html(cityArr[0])
        $('.diaMask').hide();
        $('.mask').hide();
    }
    domLoadFnArr[index].children.forEach(function (item, i) {
        html += '<li  main-data=' + item.id + '  onclick=countrySelect("' + item.text + '","' + item.id + '","' + index + '")>' + item.text + '</li>';
    })
    $('#countrySelect').html(html)
};

/*
*渲染三级数据
*/
function countrySelect(mgs, id, oldindex) {
    cityArr.push(mgs);
    cityCode.push(id);
    cityArrFun(cityArr);
    sessionStorage.setItem("city", id);
    $('#countrySelect').html();
    var html = "";
    domLoadFnArr[oldindex].children.forEach(function (item, ind) {
        if (item.id == id) {
            if (item.children.length != 0) {
                item.children.forEach(function (items, inds) {
                    html += '<li  main-data=' + items.id + '  onclick=countrySelects("' + items.text + '","' + items.id + '","' + inds + '")>' + items.text + '</li>';
                })
            } else {
                $('#citySelect').html(cityArr[0] + "/" + cityArr[1])
                $('.diaMask').hide();
                $('.mask').hide();
            }
        }
    })
    $('#countrySelect').html(html)
};

function countrySelects(mgs, id, inds) {
    sessionStorage.setItem("city", id);
    cityArr.push(mgs);
    cityCode.push(id);
    cityArrFun(cityArr)
    $('.diaMask').hide();
    $('.mask').hide();
    $('#citySelect').html(cityArr[0] + "/" + cityArr[1] + "/" + cityArr[2]);
};

/*
*回填所选地区
* 地区选择中的标题
*/
function cityArrFun(cityArr) {
    var titleMgs = ""
    for (var i in cityArr) {
        titleMgs += '<li><label></label><span>' + cityArr[i] + '</span></li>';
    }
    titleMgs += '<li class="btnSelect"><label></label><span>请选择</span></li>';
    $('#titleCon').html(titleMgs);
    //$('#citySelect').html();
}