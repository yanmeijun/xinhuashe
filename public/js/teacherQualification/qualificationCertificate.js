function loadDate() {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: "/teacherQualification/examTime",
        type: 'post',
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if (res.retCode == "000000") {
                var weekdayArr = res.responseBody.dataList
                $(".mobileSelect").remove();
                var mobileSelect1 = new MobileSelect({
                    trigger: '#selecText',
                    title: '考试时间',
                    wheels: [
                        {data: weekdayArr}
                    ]
                });
                $(".mobileSelect").addClass("mobileSelect-show");
            } else {

                return;
            }
        },
        error: function () {
            console.log("err")
        }
    })
};
$(function () {
    if(localFrom == "xinhuashe_app"){
        getInputInfo();
    }
    //获取回填信息
    function getInputInfo() {

        var data = {
            clientID: clientID,
            serviceID: "CAJ0001"
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/userLoginInfo/getUserInfo',
            contentType: 'application/json'
        }).done(function (data) {
            $('#name').val(data.name);//用户名
            $('#placehold').val(data.zkzh);//准考证号
            $('#idcard').val(data.sfzh);//身份证号
        });
    }
    /*if (citySRC) {
        $("#citySRC").attr("src", citySRC)
    } else {
        $("#citySRC").attr("src", "../images/banner.png")
    }
    ;*/
    $("#veriCodeImage").click();
})

$('#selec,#selecText').on('click', function () {
    $(".mobileSelect").remove();
    loadDate();
});
$('#country,#count').on('click', function () {
    var weekdayArr = [
        {"name": "全国", "id": "01"}
    ]
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#country',
        title: '省份',
        wheels: [
            {data: weekdayArr}
        ]
    });
    $(".mobileSelect").addClass("mobileSelect-show");
});
$('#countjb,#countryjb').on('click', function () {
    var weekdayArr = [
        {"name": "教师资格考试合格证明", "id": "1"}
    ]
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#countryjb',
        title: '教师资格级别',
        wheels: [
            {data: weekdayArr}
        ]
    });
    $(".mobileSelect").addClass("mobileSelect-show");
})

$(".mobileSelect").addClass("mobileSelect-show");
function back() {
    var url = "/teacherQualification?page=teacherQualification&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
function search() {
    var name = $('#name');//姓名
    var idcard = $('#idcard');//证件号
    var veriCode = $('#veriCode');//验证码
    var placehold = $('#placehold');
    var re = /^[\\u4e00-\\u9fa5]+[·?][\\u4e00-\\u9fa5]+$/;
    var res = /[\\u4e00-\\u9fa5]+/g;
    if (!name.val() && !idcard.val()) {
        masktime("至少输入你姓名、准考证号、证件号码中的任意两项");
        $("#masktime").addClass("masktimes");
        return;
    }
    ;
    if (!idcard.val() && !placehold.val()) {
        $("#masktime").addClass("masktimes");
        masktime("至少输入你姓名、准考证号、证件号码中的任意两项");
        return;
    }
    ;
    if (!name.val() && !placehold.val()) {
        $("#masktime").addClass("masktimes");
        masktime("至少输入你姓名、准考证号、证件号码中的任意两项");
        return;
    }
    ;
    if (placehold.val()) {
        if (placehold.val().indexOf(" ") != -1) {
            $("#masktime").removeClass("masktimes");
            masktime("准考证号中间有空格");
            return;
        } else if (!qhcheckString(placehold.val())) {
            masktime("准考证号格式错误");
            return;
        }
    }

    if (idcard.val()) {
        if (idcard.val().indexOf(" ") != -1) {
            $("#masktime").removeClass("masktimes");
            masktime("身份证号中间有空格");
            return;
        } else if (!qhcheckString(idcard.val())) {
            masktime("身份证号格式错误");
            return;
        }
    }
    if (!veriCode.val()) {
        $("#masktime").removeClass("masktimes");
        masktime("请输入验证码");
        return;
    }
    ;
    if ($('#selecText').attr('data_id') == undefined) {
        $('#selecText').attr('data_id', "2JtIFB81FcMHF1OLPZXiFz")
    }
    ;
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();

    var param = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        username: $('#name').val(),//用户名
        //bkjb: $('#countryjb').attr('data_id'),//报考级别（代号1）
        verifycode: $('#veriCode').val(),//验证码
        ksnf: $('#selecText').attr('data_id'),//考试时间(从考试时间examTime的接口中获取，对应的值是value)
        zkzh: $('#placehold').val(),//准考证号
        sfzh: $('#idcard').val()//身份证号
        //sf: $('#country').attr('data_id'),//省份（代号01）
    };
    $.ajax({
        async: true,
        url: "/teacherQualification/examResult",
        type: 'post',
        data: JSON.stringify(param),
        contentType: 'application/json',
        success: function (res) {
            /*
             *查询动画提示结束
             */
            $('#dialogMask,#dialog').hide();
            if (res.retCode == "000000") {
                var stringify = JSON.stringify(res.data)//将对象"序列化"为JSON数据(字符串格式)
                localStorage.setItem("cerResults", stringify);
                window.location.href = "/teacherQualification?page=qualificationResults&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&cityName=" + cityName + "&citySRC=" + citySRC + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            } else {
                if (res.responseBody.data) {
                    $('#errorImg').html("请输入正确查询信息");
                    $('#nodata').show();
                    return;
                }
                ;
                $('#errorImg').html(res.responseBody.errorMsg);
                $('#nodata').show()
                return;
            }
        },
        error: function () {
            console.log("err")
        }
    })
}

$("#veriCodeImage").on("click", function (event) {
    $("#veriCodeImage").attr("src", "/images/yanzm.gif");
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
        type: 'post',
        data: JSON.stringify(data),
        url: '/teacherQualification/examResultVertica',
        contentType: 'application/json'
    }).done(function (data) {
        $("#veriCodeImage").attr("src", data);
    });
});
// 参数为空时的提示语
function masktime(mgs) {
    $('#masktime').html(mgs);
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
}

function qhcheckString(str) {
    for (var i = 0; i < str.length; i++) {
        var t = true;
        switch (str.charAt(i)) {
            case '<' :
                t = false;
                break;
            case '>' :
                t = false;
                break;
            case '"' :
                t = false;
                break;
            case '\'' :
                t = false;
                break;
            case '\\' :
                t = false;
                break;
            case '/' :
                t = false;
                break;
            case '%' :
                t = false;
                break;
            case ';' :
                t = false;
                break;
            case '(' :
                t = false;
                break;
            case ')' :
                t = false;
                break;
            case '&' :
                t = false;
                break;
            case '+' :
                t = false;
                break;
        }
        if (t == false) {
            return t;
        }
    }
    return true;
};