$('.peccancyQuery>h2>img').on("click", function () {
    if ($(this).attr("src") == "/images/icon-downMenu.png") {
        $(this).attr("src", "/images/icon-upMenu.png");
        $(this).parent().parent().find(".pubListBox").hide()
    } else {
        $(this).attr("src", "/images/icon-downMenu.png");
        $(this).parent().parent().find(".pubListBox").show();
    }
})
$('#submit').click(function () {
    var peoplename = $('#peoplename').val();
    var peopleunit = $('#peopleunit').val();
    var dutyid = $('#dutyid').val();
    var card = $('#card').val();
    var peoplepostalcode = $('#peoplepostalcode').val().trim();
    var peopleaddress = $('#peopleaddress').val().trim();
    var email = $('#email').val().trim();
    var mobilephone = $('#mobilephone').val().trim();
    var phone = $('#phone').val();
    var regincode = $('#regincodeTrigger').attr("data_id");
    var reginname = $('#regincodeTrigger').text();
    if (!$('#unit').val()) {
        maskTip("单位名称不能为空");
        return;
    }
    if (!$('#unitlevelTrigger').attr("data_id")) {
        maskTip("单位级别不能为空");
        return;
    }
    if (!$('#unitlevelTrigger').attr("data_id")) {
        maskTip("单位级别不能为空");
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
        unit: $('#unit').val(),
        unitlevelcode: $('#unitlevelTrigger').attr("data_id"),//填写被举报单位级别
        unitreginname: $('#cityTrigger').text(),//填写被举报单位所在地区
        unitregincode: $('#cityTrigger').attr("data_id").split(" ")[$('#cityTrigger').attr("data_id").split(" ").length - 1],//填写被举报单位地区编号   级联菜单的最后一个
        problem: $('#textarea').val(), //填写主要问题
        peoplename: peoplename || "",//举报人姓名
        genderid: $('input[name="smsradio"]:checked').val() || "",//举报人性别
        peopleunit: peopleunit || "",//举报人单位
        dutycode: dutyid || "",//举报人职务
        peopleidnumber: card || "",//举报人身份证号码
        peoplepostalcode: peoplepostalcode || "",//举报人所在地区邮政编码
        peopleaddress: peopleaddress || "",//举报人地址
        reginname: reginname || "",//举报人地区
        regincode: regincode || "",//举报人地区编号
        phone: phone || "",//举报人电话号码
        mobilephone: mobilephone || "",//举报人手机号码
        email: email || ""//举报人邮箱地址
    };
    $.ajax({
        async: true,
        url: "/organizationReport/reportUnit",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                sessionStorage.setItem("searchCode", data.responseBody.result);
                sessionStorage.setItem("backFrom", "reportUnits");
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
})
var weekdayArr = [
    {name: "省、部级", id: "103"},
    {name: "副省、副部级", id: "104"},
    {name: "地、厅、司、局级", id: "105"},
    {name: "副地、副厅、副司、副局级", id: "106"},
    {name: "县、处级", id: "107"},
    {name: "副县、副处级", id: "108"},
    {name: "乡、科级", id: "109"},
    {name: "副乡、副科级", id: "110"},
    {name: "其他", id: "999"}
]
$('#unitlevelTrigger,#unitlevel').on("click", function () {
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: '#unitlevelTrigger',
        title: '选择单位级别',
        wheels: [
            {data: weekdayArr}
        ],
        callback: function (indexArr, data) {
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
})
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
        	$('#regincodeTrigger').css("color","#474747")
            if (data.length == 2) {
                if ($('#regincodeTrigger').text().split(" ")[1] == "请选择市") {
                    $('#regincodeTrigger').text($('#regincodeTrigger').text().split(" ")[0]);
                    $('#regincodeTrigger').attr("data_id", $('#regincodeTrigger').attr("data_id").split(" ")[0]);
                }else{
                    $('#regincodeTrigger').attr("data_id", $('#regincodeTrigger').attr("data_id").split(" ")[1]);
                }
            }else if(data.length == 3){
                if($('#regincodeTrigger').text().split(" ")[1] == "市辖区" || $('#regincodeTrigger').text().split(" ")[1] == "县"){
                    $('#regincodeTrigger').text($('#regincodeTrigger').text().split(" ")[0]+$('#regincodeTrigger').text().split(" ")[2]);
                    $('#regincodeTrigger').attr("data_id", $('#regincodeTrigger').attr("data_id").split(" ")[2]);
                }else if($('#regincodeTrigger').text().split(" ")[2] == "市辖区"){
                    $('#regincodeTrigger').text($('#regincodeTrigger').text().split(" ")[0]+$('#regincodeTrigger').text().split(" ")[1]);
                    $('#regincodeTrigger').attr("data_id", $('#regincodeTrigger').attr("data_id").split(" ")[1]);
                }else{
                    $('#regincodeTrigger').attr("data_id", $('#regincodeTrigger').attr("data_id").split(" ")[2]);
                }
            }
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
})
$('#back').on("click", function () {
    var url = "/organizationReport?page=reportingNotice&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
})
$('#aginWrite').on("click", function () {
    var url = "/organizationReport?page=reportUnits&randomKey=" + randomKey + "&userID=" + userID +
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