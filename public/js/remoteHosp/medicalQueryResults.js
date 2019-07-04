var pageNum = 1, totlePage = 0;//定义全局变量
var medicalQuery = JSON.parse(localStorage.getItem("medicalQuery"));
var prov = localStorage.getItem("provs")//省级名称
var city = localStorage.getItem("citys");//市级名称
var yab = localStorage.getItem("yabs");//所属行政区编码
$(function () {
    $('#back').on("click", function () {
        var url = "/remoteHosp?page=seekMedicalAdvice&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;
        localStorage.clear();
    });
    $('#total').html(medicalQuery.total);
    totlePage = Math.ceil(medicalQuery.total / medicalQuery.list.length);//总页数
    var html = '';
    $.each(medicalQuery.list, function (index, val) {
        html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
            "<div class=\"tab-content inforConfirm\">" +
            "<div class=\"text-list-div textListTit clearfix\">" +
            "<label>行政区划：</label>" +
            "<span>" + val.yab003 + "</span>" +
            "</div>" +
            "<div class=\"text-list-div clearfix\">" +
            "<label>经办机构或部门名称：</label>" +
            "<span>" + val.orgname + "</span>" +
            "</div>" +
            "<div class=\"text-list-div clearfix\">" +
            "<label>联系地址：</label>" +
            "<span>" + val.address + "</span>" +
            "</div>" +
            " </div>" +
            " </div>"

    })
    $('#seekMedical').html(html);

    var falg = true;
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(window).height();
        if (scrollTop + windowHeight >= scrollHeight - 20) {
            if (pageNum >= totlePage) {
                return;
            }
            if (falg) {
                falg = false;
                pageNum++;
                /*
                 *查询动画提示结束
                 */
                $('#dialogMask,#dialog').show();
                var parameters = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    provinceDesc: prov,
                    townDesc: city,
                    yab003: yab,
                    pageNo: pageNum
                };
                $.ajax({
                    async: "true",
                    type: "post",
                    url: "/remoteHosp/mechanismSearch",
                    data: JSON.stringify(parameters),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        /*
                         *查询动画提示结束
                         */
                        $('#dialogMask,#dialog').hide();
                        if (data.retCode == "000000") {
                            var htmls = "";
                            $.each(data.responseBody.list, function (index, val) {
                                htmls += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                                    " <div class=\"tab-content inforConfirm\">" +
                                    "<div class=\"text-list-div textListTit clearfix\">" +
                                    "<label>行政区划：</label>" +
                                    "<span>" + val.yab003 + "</span>" +
                                    "</div>" +
                                    "<div class=\"text-list-div clearfix\">" +
                                    "<label>经办机构或部门名称：</label>" +
                                    "<span>" + val.orgname + "</span>" +
                                    "</div>" +
                                    "<div class=\"text-list-div clearfix\">" +
                                    "<label>联系地址：</label>" +
                                    " <span>" + val.address + "</span>" +
                                    "</div>" +
                                    "</div>" +
                                    "</div>"
                            })

                            $('#seekMedical').append(htmls);
                            falg = true;
                        } else {

                        }

                    },
                    error: function () {

                    }
                })
            }
        }
    });
})