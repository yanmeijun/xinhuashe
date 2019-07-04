var doctorYear = localStorage.getItem('doctorYear');//有剩余号的日期（从第十个接口获取）
//var doctorTime = localStorage.getItem('doctorTime');//预约时间段 字典值（1 上午 2 下午 3 晚上 从第十个接口获取）
var keshi = localStorage.getItem('keshiId');//科室ID(从第九个接口获取)
var yiyuan = localStorage.getItem('hospitalId');//医院ID(从第八个接口获取)
var mingcheng = localStorage.getItem('hospitalmingcheng');//获取医院名称
var mingke = localStorage.getItem('hospitalmingke');//huoqu医院对应的科室
var hosweek = localStorage.getItem('hospitaweek');
$('#reservehos').html(mingcheng);
$('#reservekeshi').html(mingke);

$(function () {
    /*
     *返回按钮
     */
    $('#back').on("click", function () {
        var url = "/hospital?page=reserveDate&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;//跳转到对应的页面
    })
   /* var tim = ["上午", "下午", "晚上"];
    var doctorarr = doctorTime.split(",");
    //var doctorarrs=doctorarr.filter(item=>item);
    var doctorarrs = doctorarr.filter(function (item) {
        return item
    });*/
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y,
        dutyDate: doctorYear,//有剩余号的日期
        departmentId: keshi,//科室ID
        hospitalId: yiyuan,//医院ID
        /*dutyCode: doctorarrs[i]//预约时间段 字典值*/

    };
   /* var tim = "";
    if (doctorarrs[i] == "1") {
        tim = "上午"
    }
    if (doctorarrs[i] == "2") {
        tim = "下午"
    }
    if (doctorarrs[i] == "3") {
        tim = "晚上"
    }*/
    $.ajax({
        async: true,
        url: "/hospital/doctorInfo",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if(data.responseBody.msg == "用户未登录!"){
                     //alert("用户未登录!");
                    masktime("登录超时");
                    window.location.href = "/hospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=reserve";
                    $('#dialogMask,#dialog').hide();
                     return;
                }
                console.log(data.responseBody.data[1])
                var doctorList = data.responseBody.data;
                var ListHtml = "";
                Object.keys(doctorList).forEach(function(index,val){
                    $.each(data.responseBody.data[index], function (index, val) {
                        ListHtml += '<div class="reserveList clearfix">' +
                            '<div class="reserveLeft">' +
                            '<p class="name">' + val.doctorTitleName + '<span>' + val.totalFee + '</span>元</p>' +
                            '<p class="time">' + doctorYear + '<span>' + val.dutyCodeName + '</span> 周' + hosweek + '</p>' +
                            '<p class="field">' + val.skill + '</p>' +
                            '</div>';
                        if (val.remainAvailableNumber != "0") {
                            ListHtml += '<div class="reserveRight spacTop">' +
                                '<p class="btn-reserve"><a href="javascript:;" onclick=\'doctorBack("' + val.hospitalId + '","' + val.dutySourceId + '","' + val.departmentId + '","' + val.doctorId + '","' + val.dutyCodeName + '")\'>预约</a></p>' +
                                '<p class="remainingNumber">剩余' + val.remainAvailableNumber + '个</p>' +
                                '</div>' +
                                '</div>';
                        } else {
                            ListHtml += '<div class="reserveRight spacTop">' +
                                '<p class="btn-reserve"><a href="javascript:;" style="background-color: #dfe2e7;color: #8d8d8d;">预约</a></p>' +
                                '<p class="remainingNumber">剩余' + val.remainAvailableNumber + '个</p>' +
                                '</div>' +
                                '</div>';
                        }

                    })
                })
                $('#listhtmls').append(ListHtml);
                /*
                 *查询动画提示结束
                 */
                $('#dialogMask,#dialog').hide();

            } else {
                /*
                 *查询动画提示结束
                 */
                $('#dialogMask,#dialog').hide();

                masktime(data.responseBody.errorMsg);
                return;
            }
            ;

        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })

    /*for (var i = 0; i < doctorarrs.length; i++) {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,
            localFrom:localFrom,
            local_y: local_y,
            dutyDate: doctorYear,//有剩余号的日期
            departmentId: keshi,//科室ID
            hospitalId: yiyuan,//医院ID
            dutyCode: doctorarrs[i]//预约时间段 字典值

        };
        var tim = "";
        if (doctorarrs[i] == "1") {
            tim = "上午"
        }
        if (doctorarrs[i] == "2") {
            tim = "下午"
        }
        if (doctorarrs[i] == "3") {
            tim = "晚上"
        }
        $.ajax({
            async: true,
            url: "/hospital/doctorInfo",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                if (data.retCode == "000000") {
                    var doctorList = data.responseBody.list;
                    var ListHtml = "";
                    $.each(doctorList, function (index, val) {
                        ListHtml += '<div class="reserveList clearfix">' +
                            '<div class="reserveLeft">' +
                            '<p class="name">' + val.ysch + '<span>' + val.ylfwf + '</span>元</p>' +
                            '<p class="time">' + doctorYear + '<span>' + tim + '</span> 周' + hosweek + '</p>' +
                            '<p class="field">' + val.ystc + '</p>' +
                            '</div>';
                        if (val.syhl != "0") {
                            ListHtml += '<div class="reserveRight spacTop">' +
                                '<p class="btn-reserve"><a href="javascript:;" onclick="doctorBack(' + val.hospitalId + ',' + val.dutySourceId + ',' + val.departmentId + ',' + val.doctorId + ')">预约</a></p>' +
                                '<p class="remainingNumber">剩余' + val.syhl + '个</p>' +
                                '</div>' +
                                '</div>';
                        } else {
                            ListHtml += '<div class="reserveRight spacTop">' +
                                '<p class="btn-reserve"><a href="javascript:;" style="background-color: #dfe2e7;color: #8d8d8d;">预约</a></p>' +
                                '<p class="remainingNumber">剩余' + val.syhl + '个</p>' +
                                '</div>' +
                                '</div>';
                        }

                    })
                    $('#listhtmls').append(ListHtml);
                    /!*
                     *查询动画提示结束
                     *!/
                    $('#dialogMask,#dialog').hide();

                } else {
                    /!*
                     *查询动画提示结束
                     *!/
                    $('#dialogMask,#dialog').hide();

                    masktime(data.responseBody.errorMsg);
                    return;
                }
                ;

            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        })
    }*/
})


function doctorBack(hospitalYu, dutySourceYu, departmentYu, doctorYu,dutyCodeName) {



    console.log(333333333333)
    localStorage.setItem('doctorTime',dutyCodeName);//预约时间段 字典值（1 上午 2 下午 3 晚上 从第十个接口获取）
    localStorage.setItem('hospitalYuyue', hospitalYu);//医院ID(第十一个接口获取)
    localStorage.setItem('dutySourceYuyue', dutySourceYu);//预约号ID(第十一个接口获取)
    localStorage.setItem('departmentYuyue', departmentYu);//科室ID(第十一个接口获取)
    localStorage.setItem('doctorYuyue', doctorYu);//医生ID(第十一个接口获取)
    var url = "/hospital?page=informationConfirm&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
}

// 参数为空时的提示语
function masktime(mgs) {
    $('#masktime').html(mgs);
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
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
        /* var url="/hospital/registerList?randomKey="+randomKey+"&userID="+userID.trim()+"&clientID="+clientID.trim()+"&cityID="+cityID.trim()+"&local_x="+local_x+"&local_y="+local_y
         +'&orderType=2&page=1&startDate=&endDate=2018-12-31';*/
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
                    window.location.href = "/hospital?page=login&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=reserve";
                } else {//登陆过跳转个人中心
                    window.location.href = "/hospital?page=reservationDetail&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=reserve";
                }
            }).fail(function (data) {
                commitStatus = true;
            }).always(function () {

            });
        }
    })
    //点击首页的个人中心-end
})