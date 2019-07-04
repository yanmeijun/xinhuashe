var pageNum = 1, totlePage = 0;//定义全局变量
var Tax = JSON.parse(localStorage.getItem("Taxoffice"));
var thing = localStorage.getItem("thing");
var nature = localStorage.getItem("nature");
var name = localStorage.getItem("name");
var citydi = localStorage.getItem("citydi");
var sum = Tax.totalPage;
var regexp = /\d+/g;
var total = sum.match(regexp).join();
totlePage = Math.ceil(total / Tax.data.length);
$(function(){
    //$('#address').html("");
})
function back() {
    localStorage.removeItem('Taxoffice');
    localStorage.removeItem("thing");
    localStorage.removeItem("nature");
    localStorage.removeItem("name");
    localStorage.removeItem("citydi");
    var url = "/taxOffice?page=taxOffice&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
var html = "";
$('#address').html("");
$.each(Tax.data, function (index, val) {
    html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
        "<div class=\"tab-content inforConfirm\">" +
        "<div class=\"text-list-div iconList clearfix q-r-titt down\" onclick='upMenu(this)'>" +
        "<label>事务所名称：</label>" +
        "<span>" + val.office + "</span>" +
        "<img src=\"/images/icon-downMenu.png\" class=\"icon-downMenu\">" +
        "</div>" +
        "<div class=\"tab-contents\">" +
        "<div class=\"text-list-div iconList clearfix\">" +
        "<label>所长姓名：</label>" +
        "<span>" + val.name + "</span>" +
        "</div>" +
        "<div class=\"text-list-div iconList clearfix\">" +
        "<label>地址：</label>" +
        "<span id=\"searchText\">" + val.address + "</span>" +
        "<img id=\"address\" src=\"/images/taxOffice/icon-address.png\" class=\"icon-address\">" +
        "</div>" +
        "<div class=\"text-list-div iconList clearfix\">" +
        "<label>联系方式：</label>" +
        "<span>" + val.phone + "</span>" +
        "<img src=\"/images/taxOffice/icon-tel.png\" class=\"icon-tel\" onclick='tel()'>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
});
$('#address').html(html);

/*
 *滚动加载中
 */
function tel() {
    $('#dialogMask,#dialog').show();

};
$('#del').on("click", function () {
    $('#dialogMask,#dialog').hide();

});
var falg = true;
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(window).height();
    if (scrollTop + windowHeight >= scrollHeight - 40) {
        if (pageNum >= totlePage) {
            return;
        }
        if (falg) {
            falg = false;
            pageNum++;
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                sessionId: "fujunyinid",
                taskId: "1",
                articleField02: thing,//事务所名称
                articleField03: nature,//性质
                articleField07: name,//所长姓名
                articleField09: citydi,//所在地区
                cPage: pageNum
            };
            $.ajax({
                async: "true",
                type: "post",
                url: "/taxOffice/taxOfficeSearch",
                data: JSON.stringify(parameters),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    if (!data.responseBody) {
                        masktime("请求异常，请稍后");
                        return;
                    }
                    ;
                    if (data.retCode == "000000") {
                        var html = "";
                        $.each(data.responseBody.data, function (index, val) {
                            html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                                "<div class=\"tab-content inforConfirm\">" +
                                "<div class=\"text-list-div iconList clearfix q-r-titt\" onclick='upMenu(this)'>" +
                                "<label>事务所名称：</label>" +
                                "<span>" + val.office + "</span>" +
                                "<img src=\"/images/credit/icon-upMenu.png\" class=\"icon-downMenu\">" +
                                "</div>" +
                                "<div class=\"tab-contents\" style=\"display: none\">" +
                                "<div class=\"text-list-div iconList clearfix\">" +
                                "<label>所长姓名：</label>" +
                                "<span>" + val.name + "</span>" +
                                "</div>" +
                                "<div class=\"text-list-div iconList clearfix\">" +
                                "<label>地址：</label>" +
                                "<span id=\"searchText\">" + val.address +"</span>" +
                                "<img src=\"/images/taxOffice/icon-address.png\" class=\"icon-address\">" +
                                "</div>" +
                                "<div class=\"text-list-div iconList clearfix\">" +
                                "<label>联系方式：</label>" +
                                "<span>" + val.phone + "</span>" +
                                "<img id=\"address\" src=\"/images/taxOffice/icon-tel.png\" class=\"icon-tel\" onclick='tel()'>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>";
                        });
                        $('#address').append(html);
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
function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
};


function upMenu(_this) {
    if ($(_this).hasClass("down")) {
        $(_this).removeClass("down");
        $(_this).find('img').attr("src", "/images/credit/icon-upMenu.png");
        $(_this).parent().parent().find(".tab-contents").hide();
    } else {
        $(_this).addClass("down");
        $(_this).find('img').attr("src", "/images/icon-downMenu.png");
        $(_this).parent().parent().find(".tab-contents").show();
    }
}
// $('.q-r-titt').on("click",function(){
//
// })

// 百度地图API功能
// var map = new BMap.Map("allmap",{enableMapClick:true} )
// map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
// //map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
// map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
// map.enableScrollWheelZoom(); //启用滚轮放大缩小
// map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
//map.setMapStyle({style:'midnight'});
//$('#address').on("click",function(){
// window.location.href="taxOffice/map?searchText="+$("#searchText").html()+"&randomKey="+randomKey+"&userID="+userID.trim()+"&clientID="+clientID.trim()+"&cityID="+cityID.trim()+"&local_x="+local_x+"&local_y="+local_y;
// map.centerAndZoom(new BMap.Point(113.638, 34.771), 11);  // 初始化地图,设置中心点坐标和地图级别
// var searchText=$("#searchText").html()
// var local = new BMap.LocalSearch(map, {
//     renderOptions:{map: map},
//     pageCapacity:5,
// });
// local.search(searchText);
//})