$(function () {
    var pageNum = 0, totalPage = 0;
    var RegResources = {
        tccmcReg: new RegExp("\\$\\{tccmc\\}", "g"),
        ssqxReg: new RegExp("\\$\\{ssqx\\}", "g"),
        tccjyqyReg: new RegExp("\\$\\{tccjyqy\\}", "g"),
        cwxxReg: new RegExp("\\$\\{cwxx\\}", "g"),
        dqlbReg: new RegExp("\\$\\{dqlb\\}", "g")
    }
    $("#park_search").click(function () {
        $("#park_result").hide();
        $("#park_result_err").hide();
        if (!$("#tcczmc").val() || !$("#tcczmc").val().replace(/(^\s*)|(\s*$)/g, "")) {
            masktime("停车场站名称不能为空！");
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            ssqx: $('#trigger').attr("data_id"),
            tcczmc: $("#tcczmc").val().replace(/(^\s*)|(\s*$)/g, "")
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/car/findParking',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                var length = data.responseBody.data.length;
                totalPage = data.responseBody.TotalPage;
                pageNum++;
                $("#park_result_count").html('停车场站信息： ' + length * totalPage + '个');
                var temple = $("#park_result_list_temple").html(), html = "";
                $.each(data.responseBody.data, function (index, item) {
                    html += temple.replace(RegResources.tccmcReg, item.name)
                        .replace(RegResources.ssqxReg, item.county)
                        .replace(RegResources.tccjyqyReg, item.company)
                        .replace(RegResources.cwxxReg, '总车位：' + parseInt(item.mechanical) + parseInt(item['Non-machinery']) + '个<br>（非机械车位：' + item['Non-machinery'] + '个）')
                        .replace(RegResources.dqlbReg, item.type)
                })
                $("#park_result_list").html(html);
                $("#park_result").show();
                $("#park_loadMore").hide();
                if (totalPage > 1) {
                    $("#park_loadMore").show();
                }
            } else {
                $("#park_result_err").html('<span></span>提示：' + "查询结果为空").show()
            }
        });
    });
    // $("#park_loadMore").click(()=>{
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(window).height();
        if (scrollTop + windowHeight == scrollHeight) {
            if (pageNum >= totalPage) {
                $("#park_loadMore").hide();
                pageNum = 0;
                totalPage = 0;
                return;
            }
            $("#park_result_err").hide();
            if (!$("#tcczmc").val()) {
                masktime("停车场站名称不能为空！");
                return;
            }
            var ssqx;
            for (var key of weekdayArr) {
                if (key.value == "全部") {
                    ssqx = ""
                } else if (key.value == $("#trigger").text()) {
                    ssqx = key.id;
                }
            }
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                ssqx: ssqx,
                tcczmc: $("#tcczmc").val().replace(/(^\s*)|(\s*$)/g, ""),
                page: pageNum + 1
            };
            $.ajax({
                async: true,
                type: 'post',
                data: JSON.stringify(data),
                url: '/car/findParking',
                contentType: 'application/json',
                beforeSend: function () {
                    $("#dialogMask,#dialog").show();
                }
            }).done(function (data) {
                $("#dialogMask,#dialog").hide();
                if (data.retCode == '000000') {
                    var temple = $("#park_result_list_temple").html(), html = "";
                    $.each(data.responseBody.data, function (index, item) {
                        html += temple.replace(RegResources.tccmcReg, item.name)
                            .replace(RegResources.ssqxReg, item.county)
                            .replace(RegResources.tccjyqyReg, item.company)
                            .replace(RegResources.cwxxReg, '总车位：' + parseInt(item.mechanical) + parseInt(item['Non-machinery']) + '个<br>（非机械车位：' + item['Non-machinery'] + '个）')
                            .replace(RegResources.dqlbReg, item.type)
                    })
                    $("#park_result_list").append(html);
                    pageNum++;
                    if (pageNum >= totalPage) {
                        $("#park_loadMore").hide();
                        pageNum = 0;
                        totalPage = 0;
                    }
                } else {
                    $("#park_result_err").html('<span></span>提示：' + "查询结果为空").show()
                }
            });
        }
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