var hosYuyue = localStorage.getItem('hospitalYuyue'),//医院ID(第十一个接口获取)
    dutyYuyue = localStorage.getItem('dutySourceYuyue'),//预约号ID(第十一个接口获取)
    departYuyue = localStorage.getItem('departmentYuyue'),//科室ID(第十一个接口获取)
    docYuyue = localStorage.getItem('doctorYuyue');//医生ID(第十一个接口获取)
var patientIdd = "";//病人的id
/*
 *返回按钮
 */
$('#backhistory').on("click", function () {
    var url = "/hospital?page=reserve&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
})
$(function () {
    if(err){
        masktime(err)
    }
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();

    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        hospitalId: hosYuyue,//医院ID
        dutySourceId: dutyYuyue,//预约号ID
        departmentId: departYuyue,//科室ID
        doctorId: docYuyue,//医生ID

    };
    $.ajax({
        async: true,
        url: "/hospital/registerInfo",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var doctorlist = data.responseBody;
                var doctorItem = data.responseBody.list;
                /*
                 *科室信息
                 */
                if (data.responseBody.typelist.length == 0 && data.responseBody.list == 0) {
                    masktime("请求超时,请稍候再试");
                }
                var htmls = "";
                htmls += '<div class="text-list-div clearfix">' +
                    '<label>科室：</label>' +
                    '<span>' + doctorlist.ks + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>医生：</label>' +
                    '<span>' + doctorlist.ys + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>时间：</label>' +
                    '<span>' + doctorlist.sj + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>医事服务费：</label>' +
                    '<span>￥' + doctorlist.ylfw + '</span>' +
                    '</div>';
                $('#inforConfirm').html(htmls);//


                // 添加就诊人
                var doctorItemhtml = "";
                $.each(doctorItem, function (index, val) {
                    //patientIdd=val.patientid;
                    doctorItemhtml += '<span class="icon-default special-style icon-default1">' +
                        '<input type="radio" value="0" name="checkbox" main-val="' + val.patientid + '">' +
                        '<i class="icon-check"></i>' + val.name +
                        '</span>';
                })
                $('#docItem').html(doctorItemhtml);
                $('#docItem .icon-default').find('input[name="checkbox"]').get(0).checked = true;
                if(doctorItem.length==4){
                    $('.addPatient').hide()
                }else{
                    $('.addPatient').show()
                }

                addName(data.responseBody.typelist);//调用插件
                /*
                 *查询动画提示结束
                 */
                $('#dialogMask,#dialog').hide();

            } else {
                /*
                 *查询动画提示结束
                 */
                $('#dialogMask,#dialog').hide();
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
            alert('Ajax error!请刷新页面重新请求')
        }
    })
})
/*报销类型*/
function addName(datas) {
    $(".mobileSelect").remove();
    var weekdayArr = [];
    $.each(datas, function (index, val) {
        var arr = {};
        arr["id"] = val.typeID
        arr["name"] = val.typeName;
        weekdayArr.push(arr);
    });
    $('#downMenu,#downPlac').on("click", function () {
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#downPlac',
            title: '报销类型',
            wheels: [
                {data: weekdayArr}
            ],
			callback: function () {
		    	$('#downPlac').css("color","#474747")
		    }
        })
        $(".mobileSelect").addClass("mobileSelect-show");
    })
}

/*
 *获取短信验证码
 */
var wait = 60;
$('#getCode').on("click", function () {
    var placType = $('#downPlac').attr("data_id");//报销类型
    if (wait == 60) {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
        };
        $.ajax({
            async: true,
            url: "/hospital/registerCode",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (body) {
                if (body.retCode == '000000') {
                    if (body.responseBody.code == "200") {
                        $("#mask").show();
                        $("#tips_text").html("短信已发送到您手机上，如果1分钟内没有收到短信验证码，请点击按钮重新获取，此服务免费。");
                        $("#tips").show();
                        time($("#getCode"));
                    } else {
                        $("#mask").show();
                        $("#tips_text").html(body.responseBody.msg);
                        $("#tips").show();
                        if (!body.responseBody.msg) {
                            $("#mask").show();
                            $("#tips_text").html("免费预约次数用尽,请过3分钟再预约");
                            $("#tips").show();
                        }
                    }
                } else {
                    $("#mask").show();
                    $("#tips_text").html(body.responseBody.msg);
                    $("#tips").show();
                    if (!body.responseBody.msg) {
                        $("#mask").show();
                        $("#tips_text").html("免费预约次数用尽,请过3分钟再预约");
                        $("#tips").show();
                    }
                }
            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        });
    }
})

//提示信息
function time(but) {
    if (wait == 0) {
        $(but).removeAttr("disabled").removeClass("get_code_wait").addClass("get-code");
        $(but).text("获取校验码");
        wait = 60;
    } else {
        $(but).attr("disabled", true).addClass("get_code_wait");
        $(but).text("重新发送(" + wait + ")");
        wait--;
        setTimeout(function () {
            time(but);
        }, 1000);
    }
}

//取消提示信息
$('#iKnow').on("click", function () {
    $("#tips").hide();
    $("#mask").hide();
})


/*
 * 确认预约
 */
$('#getBtn').on("click", function () {
    var phoneCode = $('#vercode').val();//短信验证码
    var placType = $('#downPlac').attr("data_id");//报销类型
    var patientIdd = $('input[name="checkbox"]:checked').attr("main-val")//获取病人的id
    var doc = $('#doctoCar').val();
    var car = $('#cardNumber').val();
    // if($('#cardNumber').val()=='' && $('#doctoCar').val()==''){
    //     masktime("请选择就诊卡或医保卡");
    //     return;
    // }
    // if(placType=="" || placType=="请输入报销类型"){
    //     masktime("请选择报销类型");
    //     return;
    // }
    if (phoneCode == '') {
        masktime("请输入短信验证码");
        return;
    }

    if (!placType) {
        placType = "-1";
    }

    $("#randomKey").val(randomKey);
    $("#localFrom").val(localFrom);
    $("#userID").val(userID);
    $("#clientID").val(clientID);
    $("#cityID").val(cityID);
    $("#local_x").val(local_x);
    $("#local_y").val(local_y);

    $("#dutySourceId").val(dutyYuyue);
    $("#type").val(placType);
    $("#doctorId").val(docYuyue);
    $("#departmentId").val(departYuyue);
    $("#hospitalId").val(hosYuyue);
    $("#hospitalCardId").val($('#cardNumber').val());//医保卡号
    $("#phonecode").val(phoneCode);//就诊卡号
    $("#medicareCardId").val($('#doctoCar').val());
    $("#patientId").val(patientIdd);

    $("#loginForm").submit();

//console.log("预约号"+dutyYuyue,"报销类型"+placType,"医生ID"+docYuyue,"科室ID"+departYuyue,"医院ID"+hosYuyue,"短信验证码"+phoneCode,"病人ID"+patientIdd,"就诊卡号"+$('#cardNumber').val(),"医保卡号"+$('#doctoCar').val())
    //  var data = {
    //      randomKey: randomKey,
    //      userID: userID,
    //      clientID: clientID,
    //      cityID: cityID,
    //      local_x: local_x ,localFrom:localFrom,
    //      local_y: local_y,
    //      dutySourceId:dutyYuyue,//预约号ID(第十一个接口)
    //      type:placType,//报销类型(第十二个接口)
    //      doctorId:docYuyue,//医生ID(第十一个接口)
    //      departmentId:departYuyue,//科室ID(第十一个接口)
    //      hospitalId:hosYuyue,//医院ID(第十一个接口)
    //      hospitalCardId:$('#cardNumber').val(),//就诊卡号
    //      phonecode:phoneCode,//短信验证码
    //      medicareCardId:$('#doctoCar').val(),//医保卡号
    //      patientId:patientIdd//病人ID(第十二个接口)
    //  };
})


// 参数为空时的提示语
function masktime(mgs) {
    $('#masktime').html(mgs);
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
}

function addPatient() {
    var url = "/hospital?page=addPatients&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
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
                    window.location.href = "/hospital?page=login&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=informationConfirm";
                } else {//登陆过跳转个人中心
                    window.location.href = "/hospital?page=reservationDetail&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=informationConfirm";
                }
            }).fail(function (data) {
                commitStatus = true;
            }).always(function () {

            });
        }
    })
    //点击首页的个人中心-end
})

