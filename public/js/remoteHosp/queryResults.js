var pageNum = 1, totlePage = 0;//定义全局变量
var med = JSON.parse(localStorage.getItem("medicalx"));
var prov = localStorage.getItem("provx");//省级名称
var cityAttr = localStorage.getItem("cityAttrx");//市级名称
var cityTrriger = localStorage.getItem("cityTrrigerx");//所属行政区编码
var medicalName = localStorage.getItem("medicalNamex");//医疗机构名称
$(function () {
    /*
     *返回
     */
    $('#backhos').on("click", function () {
        var url = "/remoteHosp?page=remoteHosp&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;
        localStorage.removeItem('medicalx');
        localStorage.removeItem("provx");
        localStorage.removeItem("cityAttrx");
        localStorage.removeItem("cityTrrigerx");
        localStorage.removeItem("medicalNamex")
    })
    $('#total').html(med.total);//中共数据
    totlePage = Math.ceil(med.total / med.list.length);//总页数
    var html = "";
    $.each(med.list, function (index, val) {
        html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
            "<div class=\"tab-content inforConfirm\">" +
            "<div class=\"text-list-div textListTit clearfix\">" +
            "<label>所属行政区：</label>" +
            "<span>" + val.aab299 + "</span>" +
            "</div>" +
            "<div class=\"text-list-div nameList clearfix\">" +
            "<label>医疗机构名称：</label>" +
            "<span>" + val.akb021 + "</span>";
        dengji(val)//医院等级
        html += "</div>" +
            "<div class=\"text-list-div clearfix\">" +
            "<label>医疗机构编码：</label>" +
            "<span>" + val.akb020 + "</span>" +
            "</div>" +
            "<div class=\"text-list-div clearfix\">" +
            "<label>医疗机构分类：</label>";
        hospital(val)//医院类型
        html += "</div>" +
            "<div class=\"text-list-div clearfix\">" +
            "<label>地址：</label>" +
            "<span>" + val.aae006 + "</span>" +
            "</div>" +
            "</div>" +
            "</div>"
    })
    $('#medDate').html(html);

    function hospital(val) {
        if (val.akb023 == "10") {
            html += "<span>医院</span>";
        } else if (val.akb023 == "11") {
            html += "<span>综合医院</span>"
        } else if (val.akb023 == "12") {
            html += "<span>中医医院</span>"
        } else if (val.akb023 == "13") {
            html += "<span>中西医结合医院</span>"
        } else if (val.akb023 == "14") {
            html += "<span>民族医院</span>";
        } else if (val.akb023 == "15") {
            html += "<span>专科医院</span>";
        } else if (val.akb023 == "16") {
            html += "<span>疗养院</span>";
        } else if (val.akb023 == "17") {
            html += "<span>护理院（站）</span>";
        } else if (val.akb023 == "20") {
            html += "<span>社区卫生服务中心（站）</span>";
        } else if (val.akb023 == "21") {
            html += "<span>社区卫生服务中心</span>";
        } else if (val.akb023 == "22") {
            html += "<span>社区卫生服务站</span>";
        } else if (val.akb023 == "30") {
            html += "<span>卫生院</span>";
        } else if (val.akb023 == "31") {
            html += "<span>街道卫生院</span>";
        } else if (val.akb023 == "32") {
            html += "<span>乡镇卫生院</span>";
        } else if (val.akb023 == "40") {
            html += "<span>门诊部、诊所、医务室、村卫生室</span>";
        } else if (val.akb023 == "41") {
            html += "<span>门诊部</span>";
        } else if (val.akb023 == "42") {
            html += "<span>诊所</span>";
        } else if (val.akb023 == "43") {
            html += "<span>卫生所（室）</span>";
        } else if (val.akb023 == "44") {
            html += "<span>医务室</span>";
        } else if (val.akb023 == "45") {
            html += "<span>中小学卫生保健所</span>";
        } else if (val.akb023 == "46") {
            html += "<span>村卫生室</span>";
        } else if (val.akb023 == "47") {
            html += "<span>急救中心（站）</span>";
        } else if (val.akb023 == "70") {
            html += "<span>妇幼保健院（所、站）</span>";
        } else if (val.akb023 == "71") {
            html += "<span>妇幼保健院</span>";
        } else if (val.akb023 == "72") {
            html += "<span>妇幼保健所</span>";
        } else if (val.akb023 == "73") {
            html += "<span>妇幼保健站</span>";
        } else if (val.akb023 == "74") {
            html += "<span>生殖保健中心</span>";
        } else if (val.akb023 == "80") {
            html += "<span>专科病防治院（所、站）</span>";
        } else if (val.akb023 == "81") {
            html += "<span>专科病防治院</span>";
        } else if (val.akb023 == "82") {
            html += "<span>专科病防治院（站、中心）</span>";
        }
    }

    function dengji(val) {//医院等级
        if (val.aka101 == "08") {
            html += "<em class=\"level\">一级甲等</em>";
        } else if (val.aka101 == "11") {
            html += "<em class=\"level\">无等级</em>";
        } else if (val.aka101 == "10") {
            html += "<em class=\"level\">一级丙等</em>";
        } else if (val.aka101 == "09") {
            html += "<em class=\"level\">一级乙等</em>";
        } else if (val.aka101 == "07") {
            html += "<em class=\"level\">二级丙等</em>";
        } else if (val.aka101 == "06") {
            html += "<em class=\"level\">二级乙等</em>";
        } else if (val.aka101 == "05") {
            html += "<em class=\"level\">二级甲等</em>";
        } else if (val.aka101 == "04") {
            html += "<em class=\"level\">三级丙等</em>";
        } else if (val.aka101 == "03") {
            html += "<em class=\"level\">三级乙等</em>";
        } else if (val.aka101 == "02") {
            html += "<em class=\"level\">三级甲等</em>";
        } else if (val.aka101 == "01") {
            html += "<em class=\"level\">三级特等</em>";
        }
    }
})
/*
 *滚动加载中
 */
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
                townDesc: cityAttr,
                aab299: cityTrriger,
                pageNo: pageNum,
                akb021: medicalName
            };
            $.ajax({
                async: "true",
                type: "post",
                url: "/remoteHosp/remoteHospSearch",
                data: JSON.stringify(parameters),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    /*
                     *查询动画提示结束
                     */
                    $('#dialogMask,#dialog').hide();

                    if (!data.responseBody) {
                        masktime("请求异常，请稍后");
                        return;
                    }
                    if (data.retCode == "000000") {
                        var html = "";
                        $.each(data.responseBody.list, function (index, val) {
                            html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                                "<div class=\"tab-content inforConfirm\">" +
                                "<div class=\"text-list-div textListTit clearfix\">" +
                                "<label>所属行政区：</label>" +
                                "<span>" + val.aab299 + "</span>" +
                                "</div>" +
                                "<div class=\"text-list-div nameList clearfix\">" +
                                "<label>医疗机构名称：</label>" +
                                "<span>" + val.akb021 + "</span>";
                            if (val.aka101 == "08") {
                                html += "<em class=\"level\">一级甲等</em>"
                            } else if (val.aka101 == "11") {
                                html += "<em class=\"level\">无等级</em>"
                            } else if (val.aka101 == "10") {
                                html += "<em class=\"level\">一级丙等</em>";
                            } else if (val.aka101 == "09") {
                                html += "<em class=\"level\">一级乙等</em>";
                            } else if (val.aka101 == "07") {
                                html += "<em class=\"level\">二级丙等</em>";
                            } else if (val.aka101 == "06") {
                                html += "<em class=\"level\">二级乙等</em>";
                            } else if (val.aka101 == "05") {
                                html += "<em class=\"level\">二级甲等</em>"
                            } else if (val.aka101 == "04") {
                                html += "<em class=\"level\">三级丙等</em>"
                            } else if (val.aka101 == "03") {
                                html += "<em class=\"level\">三级乙等</em>"
                            } else if (val.aka101 == "02") {
                                html += "<em class=\"level\">三级甲等</em>";
                            } else if (val.aka101 == "01") {
                                html += "<em class=\"level\">三级特等</em>";
                            }
                            html += "</div>" +
                                "<div class=\"text-list-div clearfix\">" +
                                "<label>医疗机构编码：</label>" +
                                "<span>" + val.akb020 + "</span>" +
                                "</div>" +
                                "<div class=\"text-list-div clearfix\">" +
                                "<label>医疗机构分类：</label>"
                            if (val.akb023 == "10") {
                                html += "<span>医院</span>";
                            } else if (val.akb023 == "11") {
                                html += "<span>综合医院</span>";
                            } else if (val.akb023 == "12") {
                                html += "<span>中医医院</span>";
                            } else if (val.akb023 == "13") {
                                html += "<span>中西医结合医院</span>";
                            } else if (val.akb023 == "14") {
                                html += "<span>民族医院</span>";
                            } else if (val.akb023 == "15") {
                                html += "<span>专科医院</span>";
                            } else if (val.akb023 == "16") {
                                html += "<span>疗养院</span>";
                            } else if (val.akb023 == "17") {
                                html += "<span>护理院（站）</span>";
                            } else if (val.akb023 == "20") {
                                html += "<span>社区卫生服务中心（站）</span>";
                            } else if (val.akb023 == "21") {
                                html += "<span>社区卫生服务中心</span>";
                            } else if (val.akb023 == "22") {
                                html += "<span>社区卫生服务站</span>";
                            } else if (val.akb023 == "30") {
                                html += "<span>卫生院</span>";
                            } else if (val.akb023 == "31") {
                                html += "<span>街道卫生院</span>";
                            } else if (val.akb023 == "32") {
                                html += "<span>乡镇卫生院</span>";
                            } else if (val.akb023 == "40") {
                                html += "<span>门诊部、诊所、医务室、村卫生室</span>";
                            } else if (val.akb023 == "41") {
                                html += "<span>门诊部</span>";
                            } else if (val.akb023 == "42") {
                                html += "<span>诊所</span>";
                            } else if (val.akb023 == "43") {
                                html += "<span>卫生所（室）</span>";
                            } else if (val.akb023 == "44") {
                                html += "<span>医务室</span>";
                            } else if (val.akb023 == "45") {
                                html += "<span>中小学卫生保健所</span>";
                            } else if (val.akb023 == "46") {
                                html += "<span>村卫生室</span>";
                            } else if (val.akb023 == "47") {
                                html += "<span>急救中心（站）</span>";
                            } else if (val.akb023 == "70") {
                                html += "<span>妇幼保健院（所、站）</span>";
                            } else if (val.akb023 == "71") {
                                html += "<span>妇幼保健院</span>";
                            } else if (val.akb023 == "72") {
                                html += "<span>妇幼保健所</span>";
                            } else if (val.akb023 == "73") {
                                html += "<span>妇幼保健站</span>";
                            } else if (val.akb023 == "74") {
                                html += "<span>生殖保健中心</span>";
                            } else if (val.akb023 == "80") {
                                html += "<span>专科病防治院（所、站）</span>";
                            } else if (val.akb023 == "81") {
                                html += "<span>专科病防治院</span>";
                            } else if (val.akb023 == "82") {
                                html += "<span>专科病防治院（站、中心）</span>";
                            }
                            html += "</div>" +
                                "<div class=\"text-list-div clearfix\">" +
                                "<label>地址：</label>" +
                                "<span>" + val.aae006 + "</span>" +
                                "</div>" +
                                "</div>" +
                                "</div>";
                        });
                        $('#medDate').append(html);
                        falg = true;
                    } else {
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            })
        }
    }
});
/*
 *提示
 */
function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
}