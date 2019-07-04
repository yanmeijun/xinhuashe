$(function () {
    $('#dialogMask,#dialog').hide();
});
var scount = 1;
function search() {
    var citydi = $('#cityTrriger').html();//所在地区
    var name = $("#name").val();//所长姓名
    var nature = $('#NatureTrriger').html();//性质
    var thing = $('#thing').val();//事务所名称

    if (!thing && !name) {
        masktime("事务所名称和所长姓名至少填一项");
        return;
    };

    $('#dialogMask,#dialog').show();

    if(sessionStorage.getItem("scount")>= 10){
        $("#veriCodeImg").click();
        $('#veriCode').show();
        if(!$('#getCode').val()){
            masktime("请输入验证码");
            return;
        }
        checkVerification();
    }else{
        taxOfficeSearch();
    }
};

function taxOfficeSearch() {
    var citydi = $('#cityTrriger').html();//所在地区
    var name = $("#name").val();//所长姓名
    var nature = $('#NatureTrriger').html();//性质
    var thing = $('#thing').val();//事务所名称
    if (citydi == "请选择") {
        citydi = "";
    }
    ;
    if (nature == "请选择") {
        nature = "";
    };
    if (thing.indexOf(" ") != -1) {
        //去除字符算中的空格
        thing = thing.replace(/\s/g, "");
    }
    ;

    if (nature.indexOf(" ") != -1) {
        //去除字符算中的空格
        nature = nature.replace(/\s/g, "");
    };


    /*randCode:"sz44xr76",
    scount:sessionStorage.getItem("scount") || scount,*/
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x, localFrom: localFrom,
        local_y: local_y,
        articleField02: thing.trim(),//事务所名称
        articleField03: nature.trim(),//性质
        articleField07: name,//所长姓名
        articleField09: citydi,//所在地区
        randCode:"",
        scount:"",
        cPage:"1"//页码（默认值为1）
    };
    $.ajax({
        async: true,
        type: "post",
        url: "/taxOffice/taxOfficeSearch",
        data: JSON.stringify(parameters),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.responseBody.data == "请求第三方失败403" || data.responseBody.data == "请求第三方异常") {
                masktime("网络超时，请稍后");
                return;
            }
            ;
            if (data.retCode == "000000") {
                if (data.responseBody.result == "无符合条件的数据") {
                    $('#errData').html(data.responseBody.result);
                    $('#onDate').show();
                    return;
                }
                ;
                $('#onDate').hide();
                var res = JSON.stringify(data.responseBody);
                //sessionStorage.setItem("scount",scount++)// 验证码加
                localStorage.setItem("Taxoffice", res);
                if(thing || nature || name || citydi){
                    localStorage.setItem("thing", thing);
                    localStorage.setItem("nature", nature);
                    localStorage.setItem("name", name);
                    localStorage.setItem("citydi", citydi);
                }else{
                    localStorage.setItem("thing", "");
                    localStorage.setItem("nature", "");
                    localStorage.setItem("name", "");
                    localStorage.setItem("citydi", "");
                }
                var url = "/taxOffice?page=queryResults&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                window.location.href = url;
            } else {
                if (data.retCode == "000011") {
                    masktime("网络超时，请稍后");
                    return;
                }
                ;
                $('#errData').html("很抱歉，未查询到数据，请检查输入是否有误！");
                $('#onDate').show();
            }
        },
        error: function (err) {
            $('#dialogMask,#dialog').hide();
            masktime("服务器繁忙，请稍后重试！");
            return;
        }
    })
}

function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
};

$('#city,#cityTrriger').on("click", function () {
    city()
});

function city() {
    var weekdayArr = [
        {"id": "01", "name": "北京"},
        {"id": "02", "name": "天津"},
        {"id": "03", "name": "河北"},
        {"id": "04", "name": "山西"},
        {"id": "05", "name": "内蒙古"},
        {"id": "06", "name": "辽宁"},
        {"id": "07", "name": "大连"},
        {"id": "08", "name": "吉林"},
        {"id": "09", "name": "黑龙江"},
        {"id": "10", "name": "上海"},
        {"id": "11", "name": "江苏"},
        {"id": "12", "name": "浙江"},
        {"id": "13", "name": "宁波"},
        {"id": "14", "name": "安徽"},
        {"id": "15", "name": "福建"},
        {"id": "16", "name": "厦门"},
        {"id": "17", "name": "江西"},
        {"id": "18", "name": "山东"},
        {"id": "19", "name": "青岛"},
        {"id": "20", "name": "河南"},
        {"id": "21", "name": "湖北"},
        {"id": "22", "name": "湖南"},
        {"id": "23", "name": "广东"},
        {"id": "24", "name": "深圳"},
        {"id": "25", "name": "广西"},
        {"id": "26", "name": "海南"},
        {"id": "27", "name": "重庆"},
        {"id": "28", "name": "四川"},
        {"id": "29", "name": "贵州"},
        {"id": "30", "name": "云南"},
        {"id": "31", "name": "西藏"},
        {"id": "32", "name": "陕西"},
        {"id": "33", "name": "甘肃"},
        {"id": "34", "name": "青海"},
        {"id": "35", "name": "宁夏"},
        {"id": "36", "name": "新疆"}
    ];
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#cityTrriger',
        title: '所在地区',
        wheels: [
            {data: weekdayArr}
        ],
        callback: function () {
            $('#cityTrriger').css("color", "#474747")
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
}

$('#Nature,#NatureTrriger').on('click', function () {
    Nature()
})

function Nature() {
    var weekdayArr = [
        {"id": "1", "name": "有限责任"},
        {"id": "2", "name": "特殊普通合伙"},
        {"id": "3", "name": "合伙"}
    ];
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#NatureTrriger',
        title: '性质',
        wheels: [
            {data: weekdayArr}
        ],
        callback: function () {
            $('#NatureTrriger').css("color", "#474747")
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
}


$("#veriCodeImg").click(function () {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        type: 'post',
        data: JSON.stringify(data),
        url: '/taxOffice/getPicCode',
        contentType: 'application/json',
        beforeSend: function () {
            /*$("#dialogMask,#dialog").show();*/
        }
    }).done(function (data) {
        $("#dialogMask,#dialog").hide();
        $("#veriCodeImg").attr("src", data);
    })
});

function checkVerification() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        verifyCode: $('#getCode').val()
    };
    $.ajax({
        async: true,
        url: '/taxOffice/checkVerification',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            $("#dialogMask,#dialog").hide();
            if (res.responseBody.data != "Y") {
                masktime("请输入正确的验证码！");
                return;
            } else {
                taxOfficeSearch();
            }
        }
    })
}