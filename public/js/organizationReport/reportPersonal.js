$('.peccancyQuery>h2>img').on("click", function () {
    if ($(this).attr("src") == "/images/icon-downMenu.png") {
        $(this).attr("src", "/images/icon-upMenu.png");
        $(this).parent().parent().find(".pubListBox").hide()
    } else {
        $(this).attr("src", "/images/icon-downMenu.png");
        $(this).parent().parent().find(".pubListBox").show();
    }
})
$(function () {
    reporteduty();
})
$('#submit').click(function () {
    var reportedname = $('#reportedname').val();
    var peopleidnumber = $('#peopleidnumber').val();
    var email = $('#email').val().trim();
    var mobilephone = $('#mobilephone').val().trim();
    var phone = $('#phone').val();
    var regincode = $('#regincodeTrigger').attr("data_id");
    var reginname = $('#regincodeTrigger').text();
    var peopleaddress = $('#peopleaddress').val().trim();
    var card = $('#card').val();
    var peoplepostalcode = $('#peoplepostalcode').val().trim();
    if (!reportedname) {
        maskTip("被举报人姓名不能为空");
        return;
    }
    if (!$('input[name="smsradios"]:checked').val()) {
        maskTip("请选择性别");
        return;
    }
    if (!$('#politicalcodeTrigger').attr("data_id")) {
        maskTip("政治面貌不能为空");
        return;
    }
    if (!$('#reportedunit').val()) {
        maskTip("所在单位不能为空");
        return;
    }
    if (!$('#reportedutycodeTrigger').attr("data_id")) {
        maskTip("职务不能为空");
        return;
    }
    if (!$('#dutylevelTrigger').attr("data_id")) {
        maskTip("级别不能为空");
        return;
    }
    if (!$('#cityTrigger').attr("data_id")) {
        maskTip("所在地区不能为空");
        return;
    }
    if (!$('#textarea').val()) {
        maskTip("主要问题不能为空");
        return;
    }
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        reportedname: reportedname,//填写被举报人
        reportedunit: $('#reportedunit').val(),//填写举报人单位
        reportedutycode: $('#reportedutycodeTrigger').attr("data_id"),//填写被举报人职务
        reportedreginname: $('#cityTrigger').text(),//填写被举报人地区
        reportedregincode: $('#cityTrigger').attr("data_id").split(" ")[$('#cityTrigger').attr("data_id").split(" ").length - 1],//填写被举报人地区编号
        problem: $('#textarea').val(),//填写举报问题
        peopleidnumber: peopleidnumber,//举报人姓名
        gendercode: $('input[name="smsradio"]:checked').val(),//举报人性别
        peopleunit: $('#peopleunit').val(),//举报人单位
        dutycode: $('#dutycode').text(),
        peopleidnumber: card,//举报人身份证号码
        peoplepostalcode: peoplepostalcode,//举报人所在地区邮政编码
        peopleaddress: peopleaddress,//举报人地址
        reginname: reginname,//举报人地区
        regincode: regincode,//举报人地区编号
        phone: phone,//举报人电话号码
        mobilephone: mobilephone,//举报人手机号码
        email: email,//举报人邮箱地址
        reportedgendercode: $('input[name="smsradios"]:checked').val(),//被举报人性别
        reportedpoliticalcode: $('#politicalcodeTrigger').attr("data_id"),//被举报人政治面貌
        reporteddutylevelcode: $('#dutylevelTrigger').attr("data_id")//被举报人级别
    };
    $.ajax({
        async: true,
        url: "/organizationReport/reportPerson",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                sessionStorage.setItem("searchCode", data.responseBody.result);
                sessionStorage.setItem("backFrom", "reportPersonal");
                var url = "/organizationReport?page=result&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                window.location.href = url;
            } else {
                maskTip("提交失败");
                return;
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
});
var weekdayArr = [
    {name: "中国共产党党员", id: "01"},
    {name: "中国共产党预备党员", id: "02"},
    {name: "中国共产主义青年团团员", id: "03"},
    {name: "中国国民党革命委员会会员", id: "04"},
    {name: "中国民主同盟盟员", id: "05"},
    {name: "中国民主建国会会员", id: "06"},
    {name: "中国民主促进会会员", id: "07"},
    {name: "中国农工民主党党员", id: "08"},
    {name: "中国致公党党员", id: "09"},
    {name: "九三学社社员", id: "10"},
    {name: "台湾民主自治同盟盟员", id: "11"},
    {name: "无党派民主人士", id: "12"},
    {name: "群众", id: "13"}
]
$('#politicalcodeTrigger,#politicalcode').on("click", function () {
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#politicalcodeTrigger',
        title: '选择政治面貌',
        wheels: [
            {data: weekdayArr}
        ],
        callback: function (indexArr, data) {
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
})

var arr = [
    {name: "省部级正职", id: "0111"},
    {name: "省部级副职", id: "0112"},
    {name: "厅局级正职(巡视员)", id: "0121"},
    {name: "厅局级副职(副巡视员)", id: "0122"},
    {name: "县处级正职(调研员)", id: "0131"},
    {name: "县处级副职(副调研员)", id: "0132"},
    {name: "乡科级正职(主任科员)", id: "0141"},
    {name: "乡科级副职(副主任科员)", id: "0142"},
    {name: "科员", id: "0150"},
    {name: "办事员", id: "0160"},
    {name: "其他", id: "9Z"}
]
$('#dutylevelTrigger,#dutylevel').on("click", function () {
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#dutylevelTrigger',
        title: '选择单位级别',
        wheels: [
            {data: arr}
        ],
        callback: function (indexArr, data) {
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
});
$('#cityTrigger,#city').click(function () {
    $(".mobileSelect").remove();
    var mobileSelect5 = new MobileSelect({
        trigger: '#cityTrigger',
        title: '所在地区',
        wheels: [
            {data: UplinkData}
        ],
        transitionEnd: function (indexArr, data) {
            //console.log(data);
        },
        callback: function (indexArr, data) {
        	$('#cityTrigger').css("color","#474747")
            if (data.length == 2) {
                if ($('#cityTrigger').text().split(" ")[1] == "请选择市") {
                    $('#cityTrigger').text($('#cityTrigger').text().split(" ")[0])
                    $('#cityTrigger').attr("data_id", $('#cityTrigger').attr("data_id").split(" ")[0])
                }
            }
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
})
//职务
function reporteduty() {
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
        url: "/organizationReport/reporteduty",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var uplinkData = data.responseBody;
                $('#reportedutycodeTrigger,#reportedutycode').click(function () {
                    duty('#reportedutycodeTrigger',uplinkData)
                });
                $('#dutycodeTrigger,#dutycode').click(function () {
                    duty('#dutycodeTrigger',uplinkData)
                });
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
}

function duty(element,uplinkData){
    $(".mobileSelect").remove();
    var mobileSelect5 = new MobileSelect({
        trigger: element,
        title: '职务',
        wheels: [
            {data: uplinkData}
        ],
        transitionEnd: function (indexArr, data) {
            //console.log(data);
        },
        callback: function (indexArr, data) {
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
}


$('#regincodeTrigger,#regincode').click(function () {
    $(".mobileSelect").remove();
    var mobileSelect5 = new MobileSelect({
        trigger: '#regincodeTrigger',
        title: '所在地区',
        wheels: [
            {data: UplinkData}
        ],
        transitionEnd: function (indexArr, data) {
            //console.log(data);
        },
        callback: function (indexArr, data) {
            if (data.length == 2) {
                if ($('#regincodeTrigger').text().split(" ")[1] == "请选择市") {
                    $('#regincodeTrigger').text($('#regincodeTrigger').text().split(" ")[0])
                    $('#regincodeTrigger').attr("data_id", $('#regincodeTrigger').attr("data_id").split(" ")[0])
                }
            }
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
})

$('#angin').on("click", function () {
    var url = "/organizationReport?page=reportPersonal&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
})
$('#back').on("click", function () {
    var url = "/organizationReport?page=reportingNotice&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
})
$('.publicListText input').on("keyup", function () {
    $(this).next().show();
    $(this).next().on("click", function () {
        $(this).hide();
        $(this).prev().val("");
    })
})