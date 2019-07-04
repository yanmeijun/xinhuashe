$(function () {
    var RegResources = {
        renderType: new RegExp("\\$\\{renderType\\}", "g"),
        NAME: new RegExp("\\$\\{NAME\\}", "g"),
        LVL: new RegExp("\\$\\{LVL\\}", "g"),
        TYPE: new RegExp("\\$\\{TYPE\\}", "g"),
        NUMS: new RegExp("\\$\\{NUMS\\}", "g"),
        TEL: new RegExp("\\$\\{TEL\\}", "g"),
        PIC: new RegExp("\\$\\{PIC\\}", "g"),
        ADDR: new RegExp("\\$\\{ADDR\\}", "g"),
        img_div: new RegExp("\\$\\{img_div\\}", "g")
    };
    var pageNum = 1, searchPageNum = 1, totalPage = 0, searchTotalPage = 0, pageSize = 9, isSearch = false;
    $("#checkStr").val("");
    getHospList();
    function getHospList() {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            page: pageNum,
            pageSize: pageSize
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/getHospList',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                totalPage = data.responseBody.totalpages;
                // pageNum++;
                var temple = $("#result_template_div").html(), html = "";
                $.each(data.responseBody.result, function (index, item) {
                    html += temple.replace(RegResources.NAME, item.NAME)
                        .replace(RegResources.LVL, item.LVL)
                        .replace(RegResources.TYPE, item.TYPE)
                        // .replace(RegResources.PIC, item.PIC)
                        .replace(RegResources.ADDR, item.ADDR)
                        .replace(RegResources.TEL, item.TEL)
                        .replace(RegResources.hospitalCode, item.hospitalCode)
                        .replace(RegResources.hospitalID, item.ID)
                        .replace(RegResources.hospUrl, item.hospUrl)
                        .replace(RegResources.NUMS, item.NUMS)
                        .replace(RegResources.renderType,
                        item.hospitalCode ? "hospitalCode_" + item.hospitalCode : (item.ID ? "hospitalID_" + item.ID : "hospUrl_" + item.hospUrl))
                        .replace(RegResources.img_div, '<img src=/getIMG?img=' + item.PIC + ' onerror="this.src=\'/images/sDHospital/sdhospital.png\'">')
                })
                $("#result_div").append(html);
            } else {
                $("#noResult").show()
            }
        });
    }

    function searchHospList() {
        var checkStr = $("#checkStr").val();
        if (!checkStr) {
            masktime("请输入查询关键字！");
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            checkStr: checkStr,
            page: searchPageNum,
            pageSize: pageSize
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/hospSearch',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                searchTotalPage = data.responseBody.pageTotal;
                // pageNum++;
                var temple = $("#result_template_div").html(), html = "";
                $.each(JSON.parse(data.responseBody.result), function (index, item) {
                    html += temple.replace(RegResources.NAME, item.NAME)
                        .replace(RegResources.LVL, item.LVL + item.GRADE)
                        .replace(RegResources.TYPE, item.TYPE)
                        // .replace(RegResources.PIC, item.PIC)
                        .replace(RegResources.ADDR, item.ADDR)
                        .replace(RegResources.TEL, item.TEL)
                        .replace(RegResources.hospitalCode, item.hospitalCode)
                        .replace(RegResources.hospitalID, item.ID)
                        .replace(RegResources.hospUrl, item.hospUrl)
                        .replace(RegResources.NUMS, item.NUMS)
                        .replace(RegResources.renderType,
                            item.hospitalCode || item.CODE ? "hospitalCode_" + (item.hospitalCode || item.CODE) : (item.ID ? "hospitalID_" + item.ID : "hospUrl_" + item.hospUrl))
                        .replace(RegResources.img_div, '<img src=' + item.PIC + ' onerror="this.src=\'http://www.sd12320.gov.cn:80/images/hospital.png\'">')
                })
                $("#count").text(data.responseBody.nums);
                $("#search_div").append(html);
                $("#hotHosp,#result_div").hide();
                $("#searchCount").show();
                $("#noResult").hide()
                isSearch = true;
            } else {
                $("#noResult").show()
            }
        });
    }

    $("#hospSearch").click(function () {
        var checkStr = $("#checkStr").val();
        if (!checkStr) {
            masktime("请输入查询关键字！");
            return;
        }
        searchPageNum = 1;
        searchTotalPage = 0;
        $("#search_div").html("");
        searchHospList();
    });
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(window).height();
        if (scrollTop + windowHeight >= scrollHeight) {
            pageNum++;
            searchPageNum++;
            if (isSearch) {
                if (searchPageNum >= searchTotalPage) {
                    searchPageNum = 1;
                    searchTotalPage = 0;
                    return;
                }
                searchHospList();
            } else {
                if (pageNum >= totalPage) {
                    pageNum = 1;
                    totalPage = 0;
                    return;
                }
                getHospList();
            }
        }
    });
    function masktime(mgs) {
        $('#masktime').html(mgs);
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };

})
function renderTo(renderType) {
    localStorage.setItem('hospitalCode', "")
    localStorage.setItem('branchId', "")
    localStorage.setItem('hospitalID', "")
    if (renderType.indexOf("hospitalCode") > -1) {
        window.location.href = "/sDHospital?page=details&comeFrom2=sDHospital&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y +
            "&hospitalCode=" + renderType.replace("hospitalCode_", "")
    } else if (renderType.indexOf("hospitalID") > -1) {
        window.location.href = "/sDHospital?page=chooseHospital&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y +
            "&hospitalID=" + renderType.replace("hospitalID_", "")
    } else if (renderType.indexOf("hospUrl") > -1) {
        window.location.href = renderType.replace("hospUrl_", "")
    } else {
        return;
    }
}