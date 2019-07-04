$(function () {
    $(".userInfor").hide();
    var provinceNum = cityID.substring(0, 2);
    if (cityName) {
        $("#sameName_address").text(cityName)
    }
    var province;
    switch (provinceNum) {
        case "41"://河南省重名查询
            $(".downMenu-style").show();
            province = "河南省";
            break;
        case "46"://海南省重名查询
            $(".downMenu-style").hide();
            province = "海南省";
            break;
        case "32"://江苏省重名查询
            $(".downMenu-style").hide();
            province = "江苏省";
            break;
        case "14"://山西省重名查询
            $(".downMenu-style").hide();
            province = "山西省";
            break;
        case "22"://吉林省重名查询
            $(".downMenu-style").hide();
            province = "吉林省";
            break;
    }
    $(".data-sources").html("服务来源：" + province + "公安厅");
    $("#city,#city_img").on('click', function () {
        getCity();
    })
    $("#country,#country_img").on('click', function () {
        if ($("#city").attr("data_id") == "410000") {
            return;
        }
        getCountry();
    })

    function getCity() {
        var data = [
            {"name": "全部", "id": "410000"},
            {"name": "郑州市", "id": "410100"},
            {"name": "开封市", "id": "410200"},
            {"name": "洛阳市", "id": "410300"},
            {"name": "平顶山市", "id": "410400"},
            {"name": "安阳市", "id": "410500"},
            {"name": "鹤壁市", "id": "410600"},
            {"name": "新乡市", "id": "410700"},
            {"name": "焦作市", "id": "410800"},
            {"name": "濮阳市", "id": "410900"},
            {"name": "许昌市", "id": "411000"},
            {"name": "漯河市", "id": "411100"},
            {"name": "三门峡市", "id": "411200"},
            {"name": "南阳市", "id": "411300"},
            {"name": "商丘市", "id": "411400"},
            {"name": "信阳市", "id": "411500"},
            {"name": "周口市", "id": "411600"},
            {"name": "驻马店市", "id": "411700"},
            {"name": "济源市", "id": "410881"},
            {"name": "巩义市", "id": "410181"},
            {"name": "兰考县", "id": "410225"},
            {"name": "汝州市", "id": "410482"},
            {"name": "滑县", "id": "410526"},
            {"name": "长垣县", "id": "410728"},
            {"name": "邓州市", "id": "411381"},
            {"name": "永城市", "id": "411481"},
            {"name": "固始县", "id": "411525"},
            {"name": "鹿邑县", "id": "411628"},
            {"name": "新蔡县", "id": "411729"}
        ];
        $(".mobileSelect").remove();
        var permissionSelect = new MobileSelect({
            trigger: "#city",
            title: "请选择城市",
            wheels: [
                {data: data}
            ],
            position: [0],//初始化定位
            callback: function () {
                $("#country").attr("data_id", '410000').html("全部");
                 $('#city').css("color","#474747")
            }
        })
        $(".mobileSelect").addClass("mobileSelect-show");
    }

    function getCountry() {
        $(".mobileSelect").remove();
        var result = [];
        var pID = $("#city").attr("data_id");
        var parameters = {
            "randomKey": randomKey,
            "userID": userID,
            "clientID": clientID,
            "cityID": cityID,
            "local_x": local_x,
            "local_y": local_y,
            "pID": pID
        }
        $.ajax({
            async: "true",
            type: "post",
            url: "/sameName/getCityDetail",
            data: JSON.stringify(parameters),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.retCode == "000000") {
                    for (var item of data.responseBody) {
                        result.push({"name": item[1].Value, "id": item[0].Value});
                    }
                    var permissionSelect = new MobileSelect({
                        trigger: "#country",
                        title: "请选择区县",
                        wheels: [
                            {data: result}
                        ],
                        callback: function () {
						  $('#country').css("color","#474747")
						},
                        position: [0]//初始化定位
                    })
                    $(".mobileSelect").addClass("mobileSelect-show");
                }
            },
            error: function () {
                $("#sumNum").text("0");
                $("#detail").html("<div class=\"text-list-div clearfix\"><span>" + ("服务器繁忙，请稍后重试！") + "</span></div>")
                $(".userInfor").show();
            }
        })
    }

    $("#submit").on("click", function () {
        var queryName = $("#queryName").val().trim();
        if (!queryName) {
            maskTip("请输入需要查询的姓名");
            return;
        }
        ;
        /*
         *查询动画提示结束
         */
        $('#dialogMask,#dialog').show();
        var parameters = {
            "randomKey": randomKey,
            "userID": userID,
            "clientID": clientID,
            "cityID": cityID,
            "local_x": local_x,
            "local_y": local_y,
            "queryName": queryName
        }
        if (provinceNum == "41") {//河南省同名查询，需要form_areaid，form_areaname参数
            var form_areaid = $("#country").attr("data_id") == "410000" ? $("#city").attr("data_id") : $("#country").attr("data_id"),
                form_areaname = $("#country").text() == "全部" ? $("#city").text() : $("#country").text();
            parameters["form_areaid"] = form_areaid, parameters["form_areaname"] = form_areaname;
        }
        $.ajax({
            async: "true",
            type: "post",
            url: "/sameName/getSameName",
            data: JSON.stringify(parameters),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                /*
                 *查询动画提示结束
                 */
                $('#dialogMask,#dialog').hide();
                if (data.retCode == "000000") {
                    var resultHtml = "";
                    switch (provinceNum) {
                        case "41"://河南省重名查询
                            $("#sumNum").text(data.responseBody.num);
                            // resultHtml = "<div class=\"text-list-div clearfix\"><span>" + data.responseBody.name + "</span></div><div class=\"text-list-div clearfix\"><span>" + data.responseBody.range + "</span></div>"
                            break;
                        case "46"://海南省重名查询
                            if (data.responseBody.result) {
                                $("#sumNum").text("0");
                                // resultHtml = "<div class=\"text-list-div clearfix\"><span>" + data.responseBody.result + "</span></div>";
                            } else {
                                $("#sumNum").text(data.responseBody.Sl.replace(/[^0-9]/ig, ""));
                                // resultHtml = "<div class=\"text-list-div clearfix\"><span>" + data.responseBody.Xm + "</span></div>";
                            }
                            break;
                        case "32"://江苏省重名查询
                            $("#sumNum").text(data.responseBody.totalnum.replace(/[^0-9]/ig, ""));
                            resultHtml = "<div class=\"text-list-div clearfix\"><span>姓名：" + data.responseBody.name + "</span></div><div class=\"text-list-div clearfix\"><span>" + data.responseBody.man + "</span></div><div class=\"text-list-div clearfix\"><span>" + data.responseBody.woman + "</span></div>"
                            break;
                        case "14"://山西省重名查询
                            $("#sumNum").text(data.responseBody.result.replace(/[^0-9]/ig, ""));
                            // resultHtml = "<div class=\"text-list-div clearfix\"><span>" + data.responseBody.result + "</span></div>"
                            break;
                        case "22"://吉林省重名查询
                            $("#sumNum").text(data.responseBody.count);
                            resultHtml = "<div class=\"text-list-div clearfix\"><span>姓名：" + data.responseBody.name + "</span></div>"
                            break;
                    }
                    $("#detail").html(resultHtml)
                    $(".userInfor").show();
                } else {
                    $("#sumNum").text("0");
                    $("#detail").html("<div class=\"text-list-div clearfix\"><span>" + ( data.responseBody.errorMsg || "服务器繁忙，请稍后重试！") + "</span></div>")
                    $(".userInfor").show();
                }
            },
            error: function () {
                $("#sumNum").text("0");
                $("#detail").html("<div class=\"text-list-div clearfix\"><span>" + ("服务器繁忙，请稍后重试！") + "</span></div>")
                $(".userInfor").show();
            }
        })
    })
})