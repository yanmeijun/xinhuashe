$(function () {
    var RegResources = {
        idReg: new RegExp("\\$\\{id\\}", "g"),
        jfnyReg: new RegExp("\\$\\{jfny\\}", "g"),
        jflbReg: new RegExp("\\$\\{jflb\\}", "g"),
        jfjsReg: new RegExp("\\$\\{jfjs\\}", "g"),
        dwjfReg: new RegExp("\\$\\{dwjf\\}", "g"),
        grjfReg: new RegExp("\\$\\{grjf\\}", "g"),
        jfdwmcReg: new RegExp("\\$\\{jfdwmc\\}", "g"),
        itemReg: new RegExp("\\$\\{item\\}", "g")
    };
    $("#downMenu>p").click(function () {
        $("#type").html($(this).html());
        $(".mask").fadeOut(100);
        $("#downMenu").fadeOut(100);
    });
    // $(document).on("click", "img[id^='tab-tit-']", function () {
    //     var id = $(this).attr("id").replace("tab-tit-","");
    //     $("#tab-content-"+id).toggle(100)
    // })
    $("#paymentSearch").click(function () {
        var typeInput = $("#type").html(), type;
        if (typeInput == "养老保险") {
            type = "oldage";
        } else if (typeInput == "失业保险") {
            type = "unemployment";
        } else if (typeInput == "工伤保险") {
            type = "injuries";
        } else if (typeInput == "生育保险") {
            type = "maternity";
        } else if (typeInput == "医疗保险") {
            type = "medicalcare";
        }
        if (!$("#searchYear").val()) {
            masktime("请输入查询年份！");
            return;
        } else if (!type) {
            masktime("请选择险种！");
            return;
        }
        var data = {
            searchYear: $("#searchYear").val(),
            type: type,
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
            url: '/insurance/searchByYear',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.retCode == '000000') {
                $("#sfzh").text(data.responseBody.sfzh);
                $("#xm").text(data.responseBody.xm);
                $("#dw").text(data.responseBody.dw);
                var dataList = [];
                dataList = data.responseBody.list;
                var template = $("#results_div_temp").html(), html = "";
                $.each(dataList, function (index, item) {
                    var template1 = $("#results_div_temp_item").html(), html_item = "";
                    $.each(item.list, function (index, item) {
                        html_item += template1.replace(RegResources.jflbReg, item.jflb || "-")
                            .replace(RegResources.jfjsReg, item.jfjs || "-")
                            .replace(RegResources.dwjfReg, item.dwjf || "-")
                            .replace(RegResources.grjfReg, item.grjf || "-")
                            .replace(RegResources.jfdwmcReg, item.jfdwmc || "-")
                    });
                    html += template.replace(RegResources.jfnyReg, item.jfny || "-")
                        .replace(RegResources.idReg, index)
                        .replace(RegResources.itemReg, html_item)
                });
                $("#results_title").show();
                $("#results_div").html(html).show();
            } else {
                alert(data.rtnMsg || "查询失败");
            }
        });
    });
    function masktime(mgs) {
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
});
