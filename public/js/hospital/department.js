var hospitalId = localStorage.getItem('hospitalId');
;
(function ($) {
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();

    load();
})(Zepto)
function load() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        id: hospitalId
    };
    $.ajax({
        async: true,
        url: "/hospital/getDetail",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var department = data.responseBody;
                var hostList = '';
                /*
                 *渲染医院信息
                 */
                var fhsjTime = department.fhsj.split("： ")[1] //放号时间
                hostList += '<dl class="hosList">' +
                    '<dt class="listPic"><a href="javascript:;" onclick="hospitalDetail(' + hospitalId + ')"><img src="' + department.yytp + '"></a></dt>' +
                    '<dd class="title" onclick="hospitalDetail(' + hospitalId + ')">' + department.yymc + '</dd>' +
                    '<dd class="time"><span>' + department.yydj + '</span><span>每天' + fhsjTime + '放号</span></dd>';
                if (department.yydh.indexOf("医院总机查号台") != -1) {
                    hostList += '<dd class="tel">' + department.yydh + '</dd>' +
                        '<dd class="getAddress">' +
                        '<i class="icon-address"></i>' +
                        department.yydz +
                        '</dd>' +
                        '</dl>';
                } else {
                    hostList += '<dd class="tel">医院总机查号台: ' + department.yydh + '</dd>' +
                        '<dd class="getAddress">' +
                        '<i class="icon-address"></i>' +
                        department.yydz +
                        '</dd>' +
                        '</dl>';
                }
                var departmentArr = [];//定义数组储存大类
                if (department.list == 0) {
                    $('#errorConent').html("暂无选择科室数据");
                    $('#errorConent').css({"font-size": ".28rem", "text-align": "center", "line-height": "1.6rem"});
                    $('#errorConent').show();
                } else {
                    $('#errorConent').html("");
                    $('#errorConent').hide();
                }
                $.each(department.list, function (index, val) {
                    departmentArr.push(val.ksdl)//科室追加到数组中
                })
                var dplicatedItemArr = dplicatedItem(departmentArr)//获得重复的数据分类
                var arr = removeDuplicatedItem(departmentArr)//排重得到科室
                /*
                 *渲染科室
                 */
                var hospitalCategory = "";
                for (var i = 0; i < arr.length; i++) {
                    if (i == 0) {
                        hospitalCategory += '<li onclick="dapart(' + i + ')" class="dapar active"><a href="javascript:;" >' + arr[i] + '</a></li>';
                    } else {
                        hospitalCategory += '<li onclick="dapart(' + i + ')" class="dapar"><a href="javascript:;" >' + arr[i] + '</a></li>';
                    }

                }
                $('#hospitalCategory').append(hospitalCategory);

                /*
                 *循环科室详情信息
                 */
                var hospitalCategoryInfo = "", ind = 0;
                for (var i = 0; i < arr.length; i++) {
                    //console.log(department.ksList[i].idPath)
                    hospitalCategoryInfo += '<div class="tabConBox">'
                    for (var j = 0; j < dplicatedItemArr[i].length; j++) {
                        var length = ind++;
                        hospitalCategoryInfo += '<p onclick="hospitalCategory(\'' + department.list[length].idPath + '\',\'' + department.list[length].id + '\')">' + department.list[length].name + '</p>';
                    }
                    hospitalCategoryInfo += '</div>';
                }
                ;
                $('#hospitalCategoryInfo').append(hospitalCategoryInfo);
                $('#hospitalCategoryInfo .tabConBox').eq(0).show().siblings().hide();
                $('#hospitalCategoryInfo').css({"height": $('#hospitalCategory').height(), "overflow-y": "scroll", "min-height": "350px"});
                $('#hosList').html(hostList);
                $('#dialogMask,#dialog').hide();
            }
            //localStorage.removeItem('hospitalId');
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}
function hospitalDetail(hospitalDetailId) {//跳转到对应的医院详情页面
    var url = "/hospital?page=details&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}

$('#back').on('click', function () {//返回页面
    var url = "/hospital?page=hospital&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
})

function removeDuplicatedItem(ar) {//排重
    var ret = [];
    for (var i = 0, j = ar.length; i < j; i++) {
        if (ret.indexOf(ar[i]) === -1) {
            ret.push(ar[i]);
        }
    }
    return ret;
}

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
}


function hospitalCategory(idpath, keshiKd) {
    localStorage.setItem('hospitalIdpath', idpath);//存储本地id
    localStorage.setItem('keshiId', keshiKd);//获取科室的id
    var url = "/hospital?page=reserveDate&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
}

/*
 *tab切换点击科室对应的科室详情
 */
function dapart(mgs) {
    $('#hospitalCategoryInfo .tabConBox').eq(mgs).show().siblings().hide();
    $('#hospitalCategory li.dapar').eq(mgs).addClass("active").siblings().removeClass("active");
}


$(function () {
    var commitStatus = true;
    //点击首页的个人中心-start
    $("#userAvatarBox").on("click", function () {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            orderType: -1,
            page: 1,
            startDate: "2018-05-18",
            endDate: "2018-08-17"
        }
        /*var url="/hospital/registerList?randomKey="+randomKey+"&userID="+userID.trim()+"&clientID="+clientID.trim()+"&cityID="+cityID.trim()+"&local_x="+local_x+"&local_y="+local_y
         +'&orderType=2&page=1&startDate=2018-01-01&endDate=2018-12-31';*/
        if (commitStatus) {
            commitStatus = false;
            $.ajax({
                async: false,
                type: "post",
                url: "/hospital/registerList",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
            }).done(function (response) {
                commitStatus = true;
                if (response.retCode == "000001") {//没有登陆，跳转登陆页面
                    window.location.href = "/hospital?page=login&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=department";
                } else {//登陆过跳转个人中心
                    window.location.href = "/hospital?page=reservationDetail&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=department";
                }
            }).fail(function (data) {
                commitStatus = true;
            }).always(function () {

            });
        }
    })
    //点击首页的个人中心-end
})