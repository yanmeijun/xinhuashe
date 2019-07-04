var shopId = sessionStorage.getItem("shopId"), sName = "";//医院得id
$(function () {
    confirmQuit()
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();
    getDetail();
    load();//页面初始化加载
});
function load() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        shopId: shopId
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/getDepartment",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.CODE == "1") {
                    maskTip(data.responseBody.MSG);
                    return false;
                }
                var dataLength = data.responseBody.oneLevel.length - 1;
                if (dataLength < 0) {
                    $('#nodata').show();
                    $('#havedata').hide();
                    return
                } else {
                    $('#nodata').hide();
                    $('#havedata').show();
                }
                /**渲染科室*/
                var hospitalCategory = '';
                var twoDepa = "";
                data.responseBody.oneLevel.forEach(function (val, ind) {
                    if (ind == 0) {
                        hospitalCategory += '<li class="active" onclick=dapart("' + ind + '")><a href="javascript:;">' + val.NAME + '</a></li>';
                    } else {
                        hospitalCategory += '<li onclick=dapart("' + ind + '")><a href="javascript:;" >' + val.NAME + '</a></li>';
                    }
                    var num = 0;
                    $.each(data.responseBody.twoLevel, function (i, v) {
                        if (i == val.ID) {
                            twoDepa += '<div class="tabConBox">'
                            $.each(v, function (z, v2) {
                                twoDepa += '<p onclick=\'click_depa("' + shopId + '","' + v2.ID + '","' + v2.NAME + '")\'>' + v2.NAME + v2.NS_TOTAL + '</p>';
                                num++;
                            });
                            twoDepa += '</div>';
                        }
                    });
                });
                //装入数据
                $("#hospitalCategoryInfo").empty();
                $("#departmentCon").empty();
                $('#hospitalCategoryInfo').html(hospitalCategory);
                $('#departmentCon').html(twoDepa);
                $('#departmentCon .tabConBox').eq(0).show().siblings().hide();
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}
function dapart(ind) {
    $('#hospitalCategoryInfo li').eq(ind).addClass('active').siblings().removeClass("active");
    $('#departmentCon .tabConBox').eq(ind).show().siblings().hide();
};
function getDetail() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        shopId: shopId
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/getDetail",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                var html = "";
                if (data.responseBody.CODE == "1") {
                    maskTip(data.responseBody.MSG);
                    html += '<h1 class="p-q-tit"><img src="/images/icon-return.png" class="icon-return" onclick="back()"/>医院</h1>';
                    $('#peccancyQuery').html(html);
                    return false;
                }
                //医院数据写入
                sName = encodeURI(encodeURI(data.responseBody.NAME));
                html += '<h1 class="p-q-tit"><img src="/images/icon-return.png" class="icon-return" onclick="back()"/>' + data.responseBody.NAME + '</h1>' +
                    '<hr class="hrLine">' +
                    '<div class="peccancyQuery userInfor onlyStyle clearfix">' +
                    '<dl class="hosList anhuiSelectList"><dt>' +
                    '<a href="javascript:;"><img src="' + data.responseBody.IMAGE + '" onclick="goDetail()"></a>' +
                    '</dt><dd class="department"><p class="title" onclick="goDetail()">' +
                    '<span class="marTit">' + data.responseBody.NAME + '</span><span class="level3">' + data.responseBody.LEVEL + '</span>' +
                    '</p><p class="address clearfix"><i class="icon-address"></i>' +
                    '<span>' + data.responseBody.ADDRESS + '</span></p>' +
                    '<p class="tel"><i class="icon-tel"></i>' + data.responseBody.TEL + '</p></dd></dl>' +
                    '<div class="intro">' +
                    '<span class="introW">';
                if (data.responseBody.SUMMARY) {
                    html += '<i class="icon-intr" style="float:none"></i>' + data.responseBody.SUMMARY + '</span>';
                }
                html += '<a onclick="goDetail()">[详情]</a></div>' +
                    '</div>';
                $('#peccancyQuery').html(html);
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}
function back() {
    var url = "/anhuiHospital?page=anhuiHospital&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
function goDetail() {
    var url = "/anhuiHospital?page=details&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}

function click_depa(shopId, depaId, deptName) {
    sessionStorage.setItem("depaId", depaId);
    //location.href=projectName+"/jsp/source.jsp?shopId="+shopId+"&depaId="+depaId+"&depaName="+encodeURI(encodeURI(deptName))+"&hosName="+sName;
    var url = "/anhuiHospital?page=appointmentTimeSelect&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}

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
            var url = "/anhuiHospital?page=anhuiHospital&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=selectDepartment";
                    window.location.href = url;
                    return false;
                }
            }
            var url = "/anhuiHospital?page=userCenter&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=selectDepartment";
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
        pageNo: 0,
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