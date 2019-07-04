/*点击查询*/
$('#queryService').on("click", function () {
    queryName()//查询符合条件的医院
})

function queryName() {
    var hospitalName = $('#hospitalName').val();//医院名称
    if (hospitalName == '') {
        // 提示语
        maskTip("请输入医院名称")
    } else {
        /*
         *查询动画提示结束
         */
        $('#dialogMask,#dialog').show();

        /*
         *data请求参数
         * name医院名称
         * get请求
         */
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            name: hospitalName
        };
        $.ajax({
            async: true,
            url: "/hospital/getInfo",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                if (data.retCode == "000000") {
                    if (data.responseBody.result) {
                        var html = '<div class="peccancyQuery userInfor onlyStyle">' +
                            '<h2 class="q-r-tit"><span></span>暂无数据</h2>' +
                            '</div>';
                        $('#hospitalInfo').hide();//默认页面隐藏
                        $('#queryResultInfo').html(html);//渲染页面
                        /*
                         *查询动画提示结束
                         */
                        $('#dialogMask,#dialog').hide();
                        return;
                    }
                    var queryResult = data.responseBody.lists;
                    var htmls = "";
                    $.each(queryResult, function (index, val) {
                        var fhsjTime = val.fhsj.split(":")[1] + ":" + val.fhsj.split(":")[2] //放号时间
                        htmls += '<div class="peccancyQuery userInfor onlyStyle">' +
                            '<dl class="hosList">' +
                            '<dt><a href="javascript:;" target="_blank" onclick="dapartment(' + val.yyId + ')"><img src="' + val.img + '"></a></dt>' +
                            '<dd class="title" target="_blank" onclick="dapartment(' + val.yyId + ')">' + val.yymc + '</dd>' +
                            '<dd class="time"><span>' + val.yydj + '</span><span>每天' + fhsjTime + '放号</span></dd>';
                        if (val.yydhxx.indexOf("医院总机查号台") != -1) {//判断字段中是否有医院总机查号台
                            htmls += '<dd class="tel" title=' + val.yydhxx + '>' + val.yydhxx + '</dd>' +
                                '</dl>' +
                                '</div>';
                        } else {//字段中没有医院总机查号台
                            htmls += '<dd class="tel" title=' + val.yydhxx + '>医院总机查号台：' + val.yydhxx + '</dd>' +
                                '</dl>' +
                                '</div>'
                        }

                    })
                    $('#hospitalInfo').hide();//默认页面隐藏
                    $('#queryResultInfo').html(htmls);//渲染页面
                    /*
                     *查询动画提示结束
                     */
                    $('#dialogMask,#dialog').hide();

                } else {
                    /*
                     *查询动画提示结束
                     */
                    $('#dialogMask,#dialog').hide();

                    //maskTip(data.responseBody.rtnMsg)//请求参数不正确时出现提示语
                }
            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        })
    }
}

// 参数为空时的提示语
function maskTip(mgs) {
    $('#masktime').html(mgs);
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
}

function dapartment(hospitalId) {
    localStorage.setItem('hospitalId', hospitalId);//存储本地id
    var url = "/hospital?page=department&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
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
        /*  var url="/hospital?page=registerList&randomKey="+randomKey+"&userID="+userID.trim()+"&clientID="+clientID.trim()+"&cityID="+cityID.trim()+"&local_x="+local_x+"&local_y="+local_y
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
                    window.location.href = "/hospital?page=login&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=hospital";
                } else {//登陆过跳转个人中心
                    window.location.href = "/hospital?page=reservationDetail&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=hospital";
                }
            }).fail(function (data) {
                commitStatus = true;
            }).always(function () {

            });
        }
    })
    //点击首页的个人中心-end
})
