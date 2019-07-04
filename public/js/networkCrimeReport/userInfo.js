$('#back').click(function(){
    var url = "/networkCrimeReport?page=reportInfo&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
})
var event_time = sessionStorage.getItem("event_time");//事件发生时间
var ext22 = sessionStorage.getItem("t_wfjb_report.ext22");//举报类型
var ext21 = sessionStorage.getItem("t_wfjb_report.ext21");//举报类型二级
var event_description = sessionStorage.getItem("event_description");//网站地址
var app_type = sessionStorage.getItem("app_type");//网络应用
var app_account = sessionStorage.getItem("app_account");//应用账号
var website_name = sessionStorage.getItem("website_name");//网站名称
var website_url = sessionStorage.getItem("website_url");//网站地址
$(function(){
    if(sessionStorage.getItem("is_victim") == "是"){
        $('#publicSelect').show();
    }else{
        $('#publicSelect').hide();
    }
})
$('#submit').click(function(){
    if(sessionStorage.getItem("is_victim") == "是"){
        var name = $('#name').val();
        var sex = $('input[name="smsradio"]:checked').val();
        var cardDate =  $('#cardTrigger').attr("data_id");
        var cardID = $('#cardID').val();
        var phone = $('#phone').val();
        if(!name){
            maskTip("请输入姓名");
            return;
        }
        if(!sex){
            maskTip("请选择性别");
            return;
        }
        if(cardDate == "0"){
            maskTip("请选择证件类型");
            return;
        }
        if(!cardID){
            maskTip("请输入证件号码");
            return;
        }else if(!validateIdCard(cardID)){
            maskTip("请输入正确的证件号码");
            return;
        }
        if(!phone){
            maskTip("请输入联系电话");
            return;
        }
        if(!$('#provinceTrigger').attr("data_id") || !$('#cityTrigger').attr("data_id") || !$('#countyTrigger').attr("data_id")){
            maskTip("请选择所在位置");
            return;
        }
    }
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y,
        taskId:"1",
        "t_wfjb_report.report_type":ext21,
        "t_wfjb_report.event_time":event_time,
        "t_wfjb_report.ext22":ext22,
        "t_wfjb_report.website_name":website_name || "",
        "t_wfjb_report.website_url":website_url || "",
        "t_wfjb_report.app_type":app_type || "",
        "t_wfjb_report.app_account":app_account || "",
        "t_wfjb_report.event_description":event_description,
        "uploadForm.file":"",
        "t_wfjb_report.anonymity_user_name":$('#name').val() || "",
        "t_wfjb_report.anonymity_user_sex":$('input[name="smsradio"]:checked').val() || "0",
        "t_wfjb_report.anonymity_credentials_type":$("#cardTrigger").attr("data_id") || "0",
        "t_wfjb_report.anonymity_credentials_no":$('#cardID').val(),
        "t_wfjb_report.anonymity_phone":$('#phone').val(),
        "t_wfjb_report.anonymity_email":$('#email').val()

    };
    var url = "";
    if(sessionStorage.getItem("is_victim") == "是" || sessionStorage.getItem("is_victim") == "否"){
        $.extend(true,parameters,{
            taskId:"2",
            "t_wfjb_report.is_victim": sessionStorage.getItem("is_victim") == "否"?"0":"1",
            "t_wfjb_report.ext40": sessionStorage.getItem("ext40"),
            "t_wfjb_report.ext31": "",
            "secondRegion_num":$('#provinceTrigger').attr("data_id") || "0",
            "region_num1":$('#cityTrigger').attr("data_id") || "0",
            "t_wfjb_report.region_num":$('#countyTrigger').attr("data_id") || "0"
        })
        url =  "/networkCrimeReport/fraudReport";
    }else{
        $.extend(true,parameters,{
            taskId:"1"
        })
        url =  "/networkCrimeReport/ordinaryReport";
    }
    $.ajax({
        async: true,
        url: url,
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if(res.retCode == "000000") {
                sessionStorage.setItem("resultSuccess",JSON.stringify(res.responseBody));
                var url = "/networkCrimeReport?page=result&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                window.location.href = url;
            }else{
                maskTip("举报失败");
                return;
            }
        },
        error: function () {
            maskTip("请求失败");
            return;
        }
    })
})
$('#cardTrigger,#card').click(function(){
    $(".mobileSelect").remove();
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
        url: "/networkCrimeReport/allType",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if(res.retCode == "000000"){
                var weekdayArr = res.responseBody.cardType;
                $(".mobileSelect").remove();
                var mobileSelect1 = new MobileSelect({
                    trigger: "#cardTrigger",
                    title: "证件类型",
                    wheels: [
                        {data: weekdayArr}
                    ],
                    callback: function (indexArr, data) {

                    }
                });
                $(".mobileSelect").addClass("mobileSelect-show");
            }else{
                //$('#selectReport').hide();
            }
        },
        error: function () {
            maskTip("请求失败");
            return;
        }
    })
})

$('#provinceTrigger,#province').click(function(){
    $(".mobileSelect").remove();
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
        url: "/networkCrimeReport/allType",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if(res.retCode == "000000"){
                var weekdayArr = res.responseBody.region;
                $(".mobileSelect").remove();
                var mobileSelect1 = new MobileSelect({
                    trigger: "#provinceTrigger",
                    title: "请选择省",
                    wheels: [
                        {data: weekdayArr}
                    ],
                    callback: function (indexArr, data) {
                        $('#cityTrigger').html("请选择市");
                        $('#countyTrigger').html("请选择区县");
                        $('#cityTrigger,#countyTrigger').attr("data_id","");
                    }
                });
                $(".mobileSelect").addClass("mobileSelect-show");
            }else{
                //$('#selectReport').hide();
            }
        },
        error: function () {
            maskTip("请求失败");
            return;
        }
    })
});
$("#cityTrigger,#city").click(function(){
    if(!$('#provinceTrigger').attr("data_id")){
        return;
    };
    selectCity($('#provinceTrigger').attr("data_id"),"#cityTrigger","请选择市")
});
$('#countyTrigger,#county').click(function(){
    if(!$('#cityTrigger').attr("data_id")){
        return;
    }
    selectCity($('#cityTrigger').attr("data_id"),"#countyTrigger","区县")
});
function selectCity(cityCode,element,title){
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y,
        secondValue:cityCode
    };
    $.ajax({
        async: true,
        url: "/networkCrimeReport/country",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if(res.retCode == "000000") {
                if(res.responseBody.length == 0){
                    return;
                }
                var weekdayArr=[];
                res.responseBody.forEach(function(item,i){
                    var arr = {}
                    arr['name']=item.name;
                    arr['id']=item.num;
                    weekdayArr.push(arr)
                })
                //mobileSelect(element,title,weekdayArr)
                $(".mobileSelect").remove();
                var mobileSelect1 = new MobileSelect({
                    trigger: element,
                    title: title,
                    wheels: [
                        {data: weekdayArr}
                    ],
                    callback: function (indexArr, data) {
                        if(element == "#cityTrigger"){
                            $('#countyTrigger').html("请选择区县");
                            $('#countyTrigger').attr("data_id","");
                        }
                    }
                });
                $(".mobileSelect").addClass("mobileSelect-show");
            }
        },
        error: function () {
            maskTip("请求失败");
            return;
        }
    })
}