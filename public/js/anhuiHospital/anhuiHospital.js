var pageNum = 0, totlePage = 0, falg = true, searchFalg = false;//定义全局变量
var cateval = "ah04";
$(function () {
    $('#peccancyQuery').empty();
    confirmQuit()
    /**查询动画提示结束*/
    $('#dialogMask,#dialog').hide();
    LoadAll();//页面初始化加载
});
function LoadAll() {
    $('#dialogMask,#dialog').show();
    searchFalg = false
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageNo: pageNum,//页码（默认值为1）
        pageSize: "10",
        lname: "全部",
        tname: "全部",
        cid: "340000",
        odType: "1",
        clevel: "1"
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/getHospList",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                totlePage = data.responseBody.TOTAL_PAGE;
                $('#result').html("热门医院");
                $('#nodata').hide();
                $('#haveData').show();
                var html = '';
                $.each(data.responseBody.PAGE, function (ind, val) {
                    html += '<div class="peccancyQuery userInfor onlyStyle">' +
                        '<dl class="hosList hNHosList anhuiHosList" onclick=searchDep("' + val.ID + '")>' +
                        '<dt><a href="javascript:;" onclick=searchDep("' + val.ID + '")><img src="' + val.PIC + '"></a></dt>' +
                        '<dd><p class="title">' + val.NAME + '</p>' +
                        '<p class="time"><span>' + val.LEVEL + '</span><span class="sX-yy-num">累计预约 ' + val.TOTAL + '次</span>' +
                        '</p><p class="address"><i class="icon-address"></i>' +
                        '<span>' + val.ADDRESS + '</span>' +
                        '</p><p class="tel"><i class="icon-tel"></i>' + val.TEL + '</p>' +
                        '</dd></dl>' +
                        '</div>';
                })
                $('#peccancyQuery').append(html);
                falg = true;
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
            falg = false;
            pageNum++;
            $('#dialogMask,#dialog').show();
            if (searchFalg) {
                search();
            } else {
                LoadAll();
            }
        }
    }
});
/*医院搜索列表    ah04  ah03*/
function search() {
    $('#dialogMask,#dialog').show();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        keyWord: $('#keyWord').val().trim() || "",
        currentPage: pageNum,
        cateId: cateval
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/getSearchList",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.articles.length == 0) {
                    $('#nodata').show();
                    $('#haveData').hide();
                    return;
                }
                totlePage = parseInt(data.responseBody.PageCount);
                $('#result').html("相关结果");
                $('#haveData').show();
                var html = '';
                $.each(data.responseBody.articles, function (ind, val) {
                    if ("ah03" == val.cateId) {//按医生搜索
                        html += '<div class="peccancyQuery userInfor onlyStyle">' +
                            '<dl class="hosList hNHosList anhuiHosList" onclick=openDoctorPage("' + val.articleId + '","' + val.title + '")>' +
                            '<dd class="wh100">' +
                            '<p class="nameJob"><span class="name">' + val.title + '</span>' +
                            '<span class="job">' + val.subtitle + '</span>' +
                            '</p><p class="hospitalTit">' + val.author + '</p>' +
                            '<p class="intrGray intrDepartment">' + val.summary + '</p>' +
                            '<p class="intrGray">' + val.keywords + '</p>' +
                            '</dd></dl>' +
                            '</div>';
                    } else if ("ah04" == val.cateId) {//按医院搜索
                        html += '<div class="peccancyQuery userInfor onlyStyle">' +
                            '<dl class="hosList hNHosList anhuiHosList" onclick=searchDep("' + val.articleId + '")>' +
                            '<dd class="wh100"><p class="title"><span class="marTit">' + val.title + '</span>' +
                            '<span class="level3">' + val.subtitle + '</span></p>' + val.keywords + '</span></p>' +
                            '<p class="address"><i class="icon-address"></i>' +
                            '<span>' + val.summary + '</span></p>' +
                            '<p class="tel"><i class="icon-tel"></i>' + val.number + '</p>' +
                            '</dd></dl>' +
                            '</div>';
                    } else {
                        html += '<div class="peccancyQuery userInfor onlyStyle">' +
                            '<dl class="hosList hNHosList anhuiHosList" onclick=searchDep("' + val.articleId + '")>' +
                            '<dd class="wh100"><p class="title" onclick=searchDep("' + val.ID + '")><span class="marTit">' + val.title + '</span>' +
                            '<span>' + val.summary + '</span>' +
                            '</dd></dl>' +
                            '</div>';
                    }

                });
                $('#nodata').hide();
                $('#peccancyQuery').append(html);
                falg = true;
            }

        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}
$('#keySearch').on("click", function () {
    if (!$('#keyWord').val().trim()) {
        maskTip("请输入医院名称/医生名称");
        return;
    }
    $('#peccancyQuery').empty();
    pageNum = 1;
    searchFalg = true;
    search()
});
function searchDep(shopId) {
    sessionStorage.setItem("shopId", shopId.trim());//医院得id
    var url = "/anhuiHospital?page=selectDepartment&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}

function openDoctorPage(doctorId, doctorName) {
    /*doctorId,doctorName,deptId,hosId*/
    sessionStorage.setItem("doctorId", doctorId);
    sessionStorage.setItem("doctorName", doctorName);
    var url = "/anhuiHospital?page=openDoctorPage&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}

var searchDocCenter = true;   //个人中心开关
$('.searchHos').on("click", function (event) {
    event.stopPropagation();
    if (searchDocCenter) {
        searchDocCenter = false;
        $(".searchHos #searchHos").show();//记录
        $(this).find(".downMenuIcon").addClass("topArrow");
    } else {
        $(this).find(".downMenuIcon").removeClass("topArrow");
        searchDocCenter = true;
        $(".searchHos #searchHos").hide();
    }
});
$(document).on("click",function(event){
    if(!searchDocCenter){
        searchDocCenter = true;
        $(".searchHos #searchHos").hide();
    }
})
$('#hosList li').click(function(){
   $('#hos').html($(this).text())
    cateval = $(this).attr("main-cateval");
})


/**查询预约记录*/
var userCenter = true;   //个人中心开关
$(".userAvatarBox").on("click", function (event) {
    if (userCenter) {
        userCenter = false;
        $(".userAvatarBox #userCenter").show();//记录
    } else {
        userCenter = true;
        $(".userAvatarBox #userCenter").hide();
    }

});
$('#quit').click(function () {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/signOTut",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            maskTip("退出成功");
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
})
$('#personCon').click(function () {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageNo: "0",
        pageSize: 10,
        keyword: "",
        stime: "",
        etime: ""
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/personCenter",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.responseBody.data) {
                if (data.responseBody.data.indexOf("login.jsp") != -1) {//跳转到登录页面
                    var url = "/anhuiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=anhuiHospital";
                    window.location.href = url;
                    return false;
                }
            }
            var url = "/anhuiHospital?page=userCenter&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=anhuiHospital";
            window.location.href = url;
            return false;
        }
    })
})


function confirmQuit() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageNo: pageNum,
        pageSize: 10,
        keyword: "",
        stime: "",
        etime: ""
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/personCenter",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.responseBody.data) {
                if (data.responseBody.data.indexOf("login.jsp") != -1) {//跳转到登录页面
                    $('#quit').css("display", "none");
                    return;
                }
            }
            ;
            $('#quit').css("display", "block");
        }
    })
}