$(function () {
    var isLogin = false;   //记录用户是否登陆
    var userCenter = true;   //个人中心开关
    $(".userAvatarBox").on("click", function (event) {
        if (userCenter) {
            if (isLogin) {
                $("#userCenter #quit").show();
            } else {
                $("#userCenter #quit").hide();//退出
                $("#userCenter li").css("border", "none");
            }
            $(".userAvatarBox #userCenter").show();//记录
        } else {
            $("#userCenter #quit").show();
            $(".userAvatarBox #userCenter").hide();
        }
        userCenter = !userCenter;

    })
    $("#userCenter li").on("click", function (event) {
        event.stopPropagation();
    });
    //点击挂号记录，判断是否登陆，再跳转页面
    $("#record").on("click", function (event) {
        var parameters = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            p: 1,//页码（默认值为1）
            yys: "",//预约开始时间
            yye: "",//预约结束时间
            state: 0//预约状态（默认值为0）
        };
        $.ajax({
            async: true,
            type: 'post',
            url: "/heNanHospital/getDetail",
            data: JSON.stringify(parameters),
            contentType: 'application/json',
            success: function (data) {
                if (data.rtnCode == "000000") {
                    if (data.data.datail) {
                        var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=heNanHospital";
                        window.location.href = url;
                    }
                    ;
                }
                ;
                if (data.retCode == "000000") {
                    if (!data.responseBody.scdlsj) {
                        var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=heNanHospital";
                        window.location.href = url;
                        return;
                    }
                    var url = "/heNanHospital?page=registeredRecord&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=heNanHospital";
                    window.location.href = url;
                }
            }
        });
    });
});
var pageNum = 1, totlePage = 0, falg = true;//定义全局变量
$(function () {
    LoadAll(cityID);//页面初始化加载 cityID
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').hide();


});
function Load() {
    var cityTrigger = $('#cityTrigger').attr("data_id");
    var categoryTrigger = $('#categoryTrigger').attr("data_id");//医院类别（默认值为-1）
    var GradeTrigger = $('#GradeTrigger').attr("data_id");//等级（默认值为-1）
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        p: pageNum,//页码（默认值为1）
        dept_a: categoryTrigger || "-1",//医院类别（默认值为-1）
        dept_b: GradeTrigger || "-1",//等级（默认值为-1）
        city: cityTrigger || 0
    };
    $.ajax({
        async: true,
        url: "/heNanHospital/allHospital",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                totlePage = data.responseBody.totalPage;//总页数
                if (data.responseBody.lists != null && data.responseBody.lists.length != 0) {
                    $('#HosTotal').html(data.responseBody.totalNum);
                    var html = '';
                    $.each(data.responseBody.lists, function (index, val) {
                        // html+=`<div class="peccancyQuery userInfor onlyStyle">
                        // 		<dl class="hosList hNHosList">
                        // 			<dt><a href="javascript:;"><img src=${val.img}  onclick="hosDetails('${val.id}')"></a></dt>
                        // 			<dd>
                        // 				<p class="title" onclick="hosDetails('${val.id}')">${val.hosName}</p>
                        // 				<p class="time"><span>${val.yydj}</span><span>${val.yylb}</span><span>${val.yyNum}人已预约</span></p>
                        // 				<p class="address"><i class="icon-address"></i>${val.address}</p>
                        // 				<p class="tel"><i class="icon-tel"></i>医院总机查号台：${val.phone}</p>
                        // 			</dd>
                        // 		</dl>
                        // 	</div>`;

                        html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                            "<dl class=\"hosList hNHosList\">" +
                            "<dt><a href=\"javascript:;\"><img src=" + val.img + "  onclick=hosDetails('" + val.id + "')></a></dt>" +
                            "<dd>" +
                            "<p class=\"title\" onclick=hosDetails('" + val.id + "')>" + val.hosName + "</p>" +
                            "<p class=\"time\"><span>" + val.yydj + "</span><span>" + val.yylb + "</span><span>" + val.yyNum + "人已预约</span></p>" +
                            "<p class=\"address\"><i class=\"icon-address\"></i>" + val.address + "</p>" +
                            "<p class=\"tel\"><i class=\"icon-tel\"></i>医院总机查号台：" + val.phone + "</p>" +
                            "</dd>" +
                            "</dl>" +
                            "</div>";
                    });
                    $('#ContentHos').append(html);
                    $('#havaDate').show();
                    $('#circle').hide();//下拉动画
                    $('#noDate').hide();//查询无结果
                    falg = true;
                } else {
                    $('#havaDate').hide();
                    if (data.responseBody.result) {
                        $('#noDateCon').html(data.responseBody.result);
                    } else {
                        $('#noDateCon').html("暂无数据");
                    }
                    $('#noDate').show();
                }
                /*
                 *查询动画提示结束
                 */
                $('#dialogMask,#dialog').hide();
                $('#circle').hide();

            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
};
/*
 *下拉加载
 */
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(window).height();
    if (scrollTop + windowHeight >= scrollHeight - 10) {
        if (pageNum >= totlePage) {
            return;
        }
        if (falg) {
            $('#circle').show();
            falg = false;
            pageNum++;
            Load();
        }
    }
});
/*
 *查询
 */
function search() {
    $('#dialogMask,#dialog').show();
    $('#ContentHos').html("");
    pageNum = 1;
    Load()
}
/*
 *选择城市
 */
$("#city,#cityTrigger").click(function () {
    var weekdate = [
        {"name": "全部", "id": "0"},
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
        {"name": "济源市", "id": "411800"}
    ];
    cityTrigger('#cityTrigger', "请选择城市", weekdate)
});
/*
 *医院类别名称与其对应的编码
 */
$("#category,#categoryTrigger").click(function () {
    var weekdate = [
        {"name": "全部", "id": "-1"},
        {"name": "综合医院", "id": "1"},
        {"name": "专科医院", "id": "2"},
        {"name": "中医院", "id": "3"},
        {"name": "中西医结合", "id": "4"}
    ];
    cityTrigger("#categoryTrigger", "请选择类别", weekdate);
});

/*
 *医院等级名称及其对应的编码
 */
$('#Grade,#GradeTrigger').click(function () {
    var weekdate = [
        {"name": "全部", "id": "-1"},
        {"name": "三级甲等", "id": "1"},
        {"name": "三级", "id": "2"},
        {"name": "二级甲等", "id": "3"},
        {"name": "二级", "id": "4"},
        {"name": "一级", "id": "5"}
    ];
    cityTrigger("#GradeTrigger", "请选择等级", weekdate);
});
function cityTrigger(mgs, titleMes, date) {
    $(".mobileSelect").remove();
    var permissionSelect = new MobileSelect({
        trigger: mgs,
        title: titleMes,
        wheels: [
            {data: date}
        ],
        position: [0],//初始化定位
        callback: function () {
            $(mgs).css("color","rgb(71, 71, 71)");
        }
    })
    $(".mobileSelect").addClass("mobileSelect-show");
};
/*
 *医院详情页面
 */
function hosDetails(idDeatils) {
    sessionStorage.setItem("hosIdDeatils", idDeatils);//记录号（接口2的请求参数）
    var url = "/heNanHospital?page=department&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}

function LoadAll(cityTrigger) {
    var categoryTrigger = $('#categoryTrigger').attr("data_id");//医院类别（默认值为-1）
    var GradeTrigger = $('#GradeTrigger').attr("data_id");//等级（默认值为-1）
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        p: pageNum,//页码（默认值为1）
        dept_a: categoryTrigger || "-1",//医院类别（默认值为-1）
        dept_b: GradeTrigger || "-1",//等级（默认值为-1）
        city: cityTrigger || 0
    };
    $.ajax({
        async: true,
        url: "/heNanHospital/allHospital",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                totlePage = data.responseBody.totalPage;//总页数
                if (data.responseBody.lists != null && data.responseBody.lists.length != 0) {
                    $('#HosTotal').html(data.responseBody.totalNum);
                    var html = '';
                    for (var i = 0; i < 4; i++) {
                        html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                            "<dl class=\"hosList hNHosList\">" +
                            "<dt><a href=\"javascript:;\"><img src=" + data.responseBody.lists[i].img + "  onclick=hosDetails('" + data.responseBody.lists[i].id + "')></a></dt>" +
                            "<dd>" +
                            "<p class=\"title\" onclick=hosDetails('" + data.responseBody.lists[i].id + "')>" + data.responseBody.lists[i].hosName + "</p>" +
                            "<p class=\"time\"><span>" + data.responseBody.lists[i].yydj + "</span><span>" + data.responseBody.lists[i].yylb + "</span><span>" + data.responseBody.lists[i].yyNum + "人已预约</span></p>" +
                            "<p class=\"address\"><i class=\"icon-address\"></i>" + data.responseBody.lists[i].address + "</p>" +
                            "<p class=\"tel\"><i class=\"icon-tel\"></i>医院总机查号台：" + data.responseBody.lists[i].phone + "</p>" +
                            "</dd>" +
                            "</dl>" +
                            "</div>"
                    }
                    // $.each(data.responseBody.lists,function (index,val) {
                    //     html+=`<div class="peccancyQuery userInfor onlyStyle">
                    // 			<dl class="hosList hNHosList">
                    // 				<dt><a href="javascript:;"><img src=${val.img}  onclick="hosDetails('${val.id}')"></a></dt>
                    // 				<dd>
                    // 					<p class="title" onclick="hosDetails('${val.id}')">${val.hosName}</p>
                    // 					<p class="time"><span>${val.yydj}</span><span>${val.yylb}</span><span>${val.yyNum}人已预约</span></p>
                    // 					<p class="address"><i class="icon-address"></i>${val.address}</p>
                    // 					<p class="tel"><i class="icon-tel"></i>医院总机查号台：${val.phone}</p>
                    // 				</dd>
                    // 			</dl>
                    // 		</div>`;
                    // });
                    $('#ContentHos').append(html);
                    $('#havaDate').show();
                    $('#circle').hide();//下拉动画
                    $('#noDate').hide();//查询无结果
                    falg = true;
                } else {
                    $('#havaDate').hide();
                    if (data.responseBody.result) {
                        $('#noDateCon').html(data.responseBody.result);
                    } else {
                        $('#noDateCon').html("暂无数据");
                    }
                    $('#noDate').show();
                }
                /*
                 *查询动画提示结束
                 */
                $('#dialogMask,#dialog').hide();

            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
};


