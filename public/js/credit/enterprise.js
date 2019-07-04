var pageNum = 0, totlePage = 0, totalnum = 0, ind = "";//定义全局变量
// 点击切换法人和自然法人
$('#personType ul li').on("click", function () {
    if (document.documentElement.offsetWidth > 1024) {
        var Width = Math.ceil(document.documentElement.offsetWidth * (0.45));
        var widthLeft = (document.documentElement.offsetWidth - Width) / 2
        var left = $(this).offset().left + $(this).width() / 2 - $(".under-line").width() - 7 - widthLeft;
        $(".under-line").css({"transition-timing-function": "ease-in", "transition": "left .5s", "left": left})
    } else {
        var left = $(this).offset().left + $(this).width() / 2 - $(".under-line").width() - 7;
        $(".under-line").css({"transition-timing-function": "ease-in", "transition": "left .5s", "left": left})
    }
    $('#personType ul li').removeClass("active");
    $(this).addClass("active");
    ind = $(this).index();
    if ($(this).index() == 1) {
        $("#personList3").html("暂无自然法人数据");
        $("#personList2").show();
        $('#personList').hide();
        $('#total').html(0);
        return;
    } else {
        $("#personLists").html("暂无法人数据");
        $('#personList').show();
        $("#personList2").hide();
        $('#total').html(totalnum);
        return;
    }
})

// 点击查询
$('#search').on("click", function () {
    pageNum = 1;
    var searchText = $('#searchText').val();//企业或个人信息
    var re = /[`~!@#$%^&*_+<>{}\/'[\]]/im;//匹配特殊字符
    if (searchText == "" || searchText == "请输入企业或个人信息") {
        masktime("请输入企业或个人信息");
        $('#personResult').hide();
        return;
    }
    if (re.test(searchText)) {//存在特殊字符
        masktime("存在特殊字符");
        return;
    }
    if (searchText.indexOf(" ") != -1) {
        //去除字符算中的空格
        searchText = searchText.replace(/\s/g, "");
    }
    $('#personList').html("");
    $('#total').html("");
    $('#personResult').hide();
    $('#dialogMask,#dialog').show();
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageNum: 1,
        keyword: searchText.trim()
    }
    $.ajax({
        async: "true",
        type: "post",
        url: "/credit/getProblemEntLists",
        data: JSON.stringify(parameters),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            var html = "";
            if (data.retCode == "000000") {
                $('#personList2').hide()
                totlePage = data.responseBody.totalPageCount;
                $('#total').html(data.responseBody.totalCount);//总条数
                if ($('#personType ul li:nth-of-type(2)').hasClass("active")) {
                    if ($('#personType ul li:nth-of-type(2)').html() == "主体类型/自然人") {
                        $('#total').html(0);//总条数
                        $('#personList2').show();
                        $('#personList').hide();
                        $("#personList3").html("暂无自然法人数据");
                    } else {
                        $('#total').html(data.responseBody.totalCount);//总条数
                        $('#personList').show();
                        $('#personList2').hide()
                    }
                } else {
                    $('#total').html(data.responseBody.totalCount);//总条数
                }
                totalnum = data.responseBody.totalCount;
                $.each(data.responseBody.list, function (index, val) {
                    html += '<div class="peccancyQuery userInfor onlyStyle">' +
                        '<div class="tab-content">' +
                        '<div class="text-list-div clearfix">' +
                        '<label>主题类型/法人</label>' +
                        '<span class="titleCredit" onclick=enterprise("' + val.encryStr.trim() + '","' + val.name.trim() + '")>' + val.name + '</span>' +
                        '</div>' +
                        '<div class="text-list-div clearfix">' +
                        '<label>组织机构代码/身份证号</label>' +
                        '<span>' + val.idCardOrOrgCode + '</span>' +
                        '</div>' +
                        '<div class="text-list-div clearfix">' +
                        '<label>记录类型(受承黑名单)</label>' +
                        '<span>' + val.badCount + '</span>' +
                        '</div>' +
                        '</div></div>';
                })
                $('#personList').append(html);
                falg = true;
                $('#personResult').show();
                if (totlePage > 1) {
                    $('#search_result').hide();
                }
                ;
                if (data.responseBody.list.length == 0) {
                    $('#personList').html("<div class=\"tab-content\"><p id=\"personLists\" style=\"text-align: center;font-size: .27rem; margin: .2rem 0.4rem;padding: .5rem 0;background: #fff\">暂无法人数据</p></div>")
                    return;
                }
            } else {
                $('#search_result').show();
                $('#creditError').html(data.responseBody.data);
                $('#personResult').hide();
            }
        },
        error: function () {
            console.log("axr error")
        }
    })
})


/*输入不正确的查询语句提示语*/
function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
}

var falg = false;
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(window).height();
    var searchText = $('#searchText').val();//企业或个人信息
    if (falg) {
        if (searchText == "" || searchText == "请输入企业或个人信息") {
            masktime("请输入企业或个人信息");
            falg = false;
            return;
        }
    }
    if (scrollTop + windowHeight >= scrollHeight - 10) {
        //console.log(pageNum,totlePage)
        if (pageNum >= totlePage) {
            return;
        }
        if (falg) {
            falg = false;
            pageNum++;
            if (searchText.indexOf(" ") != -1) {
                //去除字符算中的空格
                searchText = searchText.replace(/\s/g, "");
            }
            ;
            $('#dialogMask,#dialog').show();
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                pageNum: pageNum,
                keyword: searchText.trim()
            }
            $.ajax({
                async: "true",
                type: "post",
                url: "/credit/getProblemEntLists",
                data: JSON.stringify(parameters),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    $('#dialogMask,#dialog').hide();
                    if (data.responseBody.datail) {
                        masktime("请求参数不完整，请检查");
                        return
                    }
                    if (ind == 1) {
                        $("#personList3").html("暂无自然法人数据")
                        $("#personList2").show();
                    }
                    if (data.retCode == "000000") {
                        var htmls = "";
                        $.each(data.responseBody.list, function (index, val) {
                            htmls += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                                "<div class=\"tab-content\">" +
                                "<div class=\"text-list-div clearfix\">" +
                                "<label>主题类型/法人</label>" +
                                "<span class=\"titleCredit\" onclick=enterprise('" + val.encryStr.trim() + "','" + val.name.trim() + "')>" + val.name + "</span>" +
                                "</div>" +
                                "<div class=\"text-list-div clearfix\">" +
                                "<label>组织机构代码/身份证号</label>" +
                                "<span>" + val.idCardOrOrgCode + "</span>" +
                                "</div>" +
                                "<div class=\"text-list-div clearfix\">" +
                                "<label>记录类型(受承黑名单)</label>" +
                                "<span>" + val.badCount + "</span>" +
                                "</div>" +
                                "</div></div>"
                        })
                        $('#personList').append(htmls);
                        $('#personResult').show();
                        falg = true;
                    } else {
                        $('#search_result').show();
                        $('#creditError').html(data.responseBody.data);
                        $('#personResult').hide();
                    }

                },
                error: function () {

                }
            })
        }
    }
});
function enterprise(mgs, name) {
    localStorage.setItem("encryStr", mgs);
    localStorage.setItem("encryname", name);
    var url = "/credit?page=enterprisesList&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
$('#back').on("click", function () {
    var url = "/credit?page=credit&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
});