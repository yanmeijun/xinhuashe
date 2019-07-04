$(function () {
    var RegResources = {
        idReg: new RegExp("\\$\\{id\\}", "g"),
        fwzhReg: new RegExp("\\$\\{fwzh\\}", "g"),
        titleReg: new RegExp("\\$\\{title\\}", "g"),
        fdateReg: new RegExp("\\$\\{fdate\\}", "g"),
        sdateReg: new RegExp("\\$\\{sdate\\}", "g"),
        urlReg: new RegExp("\\$\\{url\\}", "g")
    };
    $(document).on("touchstart", "img[id^='tab-tit-']", function () {
        var id = $(this).attr("id").replace("tab-tit-", "");
        $("#tab-content-" + id).toggle(100)
    })
    $("#search").click(function () {
        var keyword = $("#keyword").val();
        if (keyword == "" || keyword == "请输入关键字") {
            masktime("请输入关键字");
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            keyword: $("#keyword").val()
        };
        $('#dialogMask,#dialog').show();
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/mofcom/search',
            contentType: 'application/json'
        }).done(function (data) {
            $('#dialogMask,#dialog').hide();
            $("#park_result_err").hide();
            $("#results_div").html("")
            if (data.retCode == '000000') {
                var dataList = data.responseBody;
                var template = $("#results_div_temp").html(), html = "";
                $.each(dataList, function (_index, _item) {
                    $.each(_item.cList, function (index, item) {
                        html += template.replace(RegResources.titleReg, item.title)
                            .replace(RegResources.idReg, _index + "" + index)
                            .replace(RegResources.fwzhReg, item.fwzh)
                            .replace(RegResources.sdateReg, item.sdate)
                            .replace(RegResources.fdateReg, item.fdate)
                            .replace(RegResources.urlReg, item.url)
                    });
                });
                $("#results_div").html(html).show();
            } else {
                $("#park_result_err").html('<span></span>提示：未找到相关行政法规文件').show()
                // alert("未找到相关行政法规文件");
            }
        })
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
