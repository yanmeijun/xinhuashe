var hospitalId = sessionStorage.getItem("hosId");
var hospitalName = sessionStorage.getItem("hospitalName");
var citySelectName = sessionStorage.getItem("cityName");
$(function () {
    $('#hospitalName').html(hospitalName);
    if (citySelectName) {
        $('#cityName').html(citySelectName);
    } else {
        $('#cityName').html(cityName);
    }
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();
    load();
});
function load() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        hospitaluid: hospitalId
    };
    $.ajax({
        async: true,
        url: "/sXHospital/getDepartment",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                var department = data.responseBody.lists[0];
                var department3 = data.responseBody;
                var hostList = '';
                /*
                 *渲染医院信息
                 */
                var introduction = department.introduction;
                hostList += '<dl class="hosList hNHosList sXDefaultList">' +
                    '<dt><a href="javascript:;"><img src="' + department.doctorImg + '"></a></dt>' +
                    '<dd class="department">' +
                    '<p class="title">' + department.doctorName + '<span class="titSpan">' + department.yydj + '</span></p>' +
                    '<p class="address"><i class="icon-address"></i>' + department.address + '</p>' +
                    '<p class="tel"><i class="icon-tel"></i>' + department.yydh + '</p>' +
                    '<p class="intro"><i class="icon-intro"></i>' + introduction.substring(0, 40) + '...<a onclick="hospitalDetails()">[详情]</a></p>' +
                    '</dd>' +
                    '</dl>';

                $('#hosList').html(hostList);//
                var departmentArr = [];//定义数组储存大类
                if (department.list2 == 0) {
                    $('#errorConent').html("暂无选择科室数据");
                    $('#errorConent').css({"font-size": ".28rem", "text-align": "center", "line-height": "1.6rem"});
                    $('#errorConent').show();
                } else {
                    $('#errorConent').html("");
                    $('#errorConent').hide();
                }
                $.each(department3.list2, function (index, val) {
                    departmentArr.push(val.keList)//科室追加到数组中
                });
                /*
                 *渲染科室
                 */
                var arr = removeDuplicatedItem(departmentArr)//排重得到科室
                var depInformationArr = arr.filter(item=>item);
                var hospitalCategory = "";
                for (var i = 0; i < depInformationArr.length; i++) {
                    if (i == 0) {
                        hospitalCategory += '<li onclick="dapart(' + i + ')" class="active"><a href="javascript:;" >' + depInformationArr[i].trim() + '</a></li>';
                    } else {
                        hospitalCategory += '<li onclick="dapart(' + i + ')" ><a href="javascript:;" >' + depInformationArr[i].trim() + '</a></li>';
                    }
                }
                $('#hospitalCategory').append(hospitalCategory);
                /*
                 *循环科室详情信息
                 */
                var dplicatedItemArr = data.responseBody.list4;//获得重复的数据分类
                var hospitalCategoryInfo = "", ind = 0;
                for (var i = 0; i < depInformationArr.length; i++) {
                    var ind = ind + 2;
                    hospitalCategoryInfo += '<div class="tabConBox">'
                    for (var j = 0; j < dplicatedItemArr[ind - 1].keMzLists.length; j++) {
                        hospitalCategoryInfo += '<p onclick="hospitalCategory(\'' + dplicatedItemArr[ind - 1].deptuid[j] + '\',\'' + dplicatedItemArr[ind - 1].keMzLists[j] + '\')">' + dplicatedItemArr[ind - 1].keMzLists[j] + '</p>';
                    }
                    hospitalCategoryInfo += '</div>';
                }
                ;
                $('#hospitalCategoryInfo').append(hospitalCategoryInfo);
                $('#hospitalCategoryInfo .tabConBox').eq(0).show().siblings().hide();
                $('#hospitalCategoryInfo').css({"height": $('#hospitalCategory').height(), "overflow-y": "scroll", "min-height": "350px"});
                $('#dialogMask,#dialog').hide();
            }
            //localStorage.removeItem('hospitalId');
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}

/*
 *tab切换点击科室对应的科室详情
 */
function dapart(mgs) {
    $('#hospitalCategoryInfo .tabConBox').eq(mgs).show().siblings().hide();
    $('#hospitalCategory li').eq(mgs).addClass("active").siblings().removeClass("active");
};
function removeDuplicatedItem(ar) {//排重
    var ret = [];
    for (var i = 0, j = ar.length; i < j; i++) {
        if (ret.indexOf(ar[i]) === -1) {
            ret.push(ar[i]);
        }
    }
    return ret;
};
function dplicatedItem(arr) {//绘重
    var newArr = [],
        tempArr = [];
    for (var i = 0, j = arr.length; i < j; i++) {
        if (arr[i] == arr[i + 1]) {
            tempArr.push(arr[i]);
        } else {
            tempArr.push(arr[i]);
            newArr.push(tempArr.slice(0));
            tempArr.length = 0;
        }
    }
    return newArr;
};
function hospitalCategory(keshiKd, keshiName) {
    sessionStorage.setItem('keshiId', keshiKd);//获取科室的id
    sessionStorage.setItem('keshiName', keshiName);//
    var url = "/sXHospital?page=appointmenTimeSelect&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
}

function hospitalDetails() {
    var url = "/sXHospital?page=details&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
}
$('#back').on("click", function () {
    var url = "/sXHospital?page=sXHospital&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
});
$('#userAvatarBox').on("click", function () {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        type: "post",
        url: "/sXHospital/record",
        async: true,
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var url = "/sXHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=selectDepartment";
                window.location.href = url;//跳转到对应的页面
            } else {
                if (data.responseBody.errorCode == "110003") {
                    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=selectDepartment";
                    window.location.href = url;//跳转到对应的页面
                    return;
                } else {
                    maskTip(data.responseBody.errorMsg);
                }
            }
        },
        error: function () {

        }
    })
})