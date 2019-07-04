/*
{"responseBody":{"search_code":"925137","report_no":"jb201812250000858"},"retCode":"000000"}



{search_code: "107021", report_no: "jb201812250001012"}



*/
$('#back').click(function(){
    var url = "/networkCrimeReport?page=networkCrimeReport&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
})
var RegResources = {
    processStatus: new RegExp("\\$\\{processStatus\\}", "g"),
    webName: new RegExp("\\$\\{webName\\}", "g"),
    processResult: new RegExp("\\$\\{processResult\\}", "g"),
    reportNo: new RegExp("\\$\\{reportNo\\}", "g"),
    url: new RegExp("\\$\\{url\\}", "g"),
    reportTime: new RegExp("\\$\\{reportTime\\}", "g")
};
$('#sumbit').click(function(){
    var reportCode = $('#reportCode').val();
    var searchCode= $('#searchCode').val();
    if(!reportCode){
        maskTip("请输入举报编码");
        return;
    }
    if(!searchCode){
        maskTip("请输入查询码");
        return;
    }
    $('#dialogMask,#dialog').show();
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y,
        report_no: reportCode.trim(),
        search_code:searchCode.trim()
    };
    $.ajax({
        async: true,
        url: "/networkCrimeReport/search",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            $('#dialogMask,#dialog').hide();
            if(res.retCode == "000000") {
                var data = res.responseBody;
                var template = $("#results_div_temp").html(), html = "";
                html += template.replace(RegResources.processStatus, data.processStatus || "")
                    .replace(RegResources.webName, data.webName || "")
                    .replace(RegResources.processResult, data.processResult || "")
                    .replace(RegResources.reportNo, data.reportNo || "")
                    .replace(RegResources.url, data.url || "")
                    .replace(RegResources.reportTime, data.reportTime || "");
                $("#results_div_temp").html(html);
                $("#results_div_temp").show();
            }else{
                maskTip("网络异常，请稍后");
            }
        },
        error: function () {
            maskTip("请求失败");
            return;
        }
    })
})