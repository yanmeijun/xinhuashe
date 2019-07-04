/*河北，原站暂时没域名，自动跳转到110.249.184.14:808   130000
海南某些市还在开发中   460000
上海原站打不开  310000
甘肃某些页面请求延迟，及不能访问  620000
北京国家监委打不开  110000 特殊
山东提交地址以县级为单位  370000
新疆自治区不能正常提交举报  650000 特殊
天津请求不到验证码地址 120000
重庆限制ip 不能提交 500000 特殊
*/
$(function () {
    $('#regionArea').hide();
    $.each(regionCode, function (ind, val) {
        if (oldCity == val.code) {
            $('#report').val(val.region);
            if (val.code == "650000") {
                $('#report').attr("main-data", "660000");//地区编码
            } else {
                $('#report').attr("main-data", val.code);//地区编码
            }
            sessionStorage.setItem("reportUrl", val.reportUrl);//代表提交举报地址
            sessionStorage.setItem("verificationUrl", val.verificationUrl);//代表验证码地址
            sessionStorage.setItem("searchUrl", val.searchUrl);//代表查询地址
            sessionStorage.setItem("correctReportImg", val.correctReportImg);//代表判断验证码是否正确地址
            sessionStorage.setItem("region", val.region);//名称
            sessionStorage.setItem("typeUrl", val.typeUrl);//代表 政治面貌	级别	职务	问题类别 地址
            $('#copyright').html(val.copyright.split(" ")[0] + "<br>" + val.copyright.split(" ")[1]);
            if (val.regionArea) {//新疆生产建设兵团纪委监委（特殊处理）
                $('#regionArea').val(val.regionArea);
                $('#regionArea').attr("main-data", val.regionAreaId);
                $('#regionArea').show();
            }
            return;
        }
    })
});
$('#report,#regionArea').click(function () {
    sessionStorage.setItem("province", $(this).attr("main-data"));
    sessionStorage.setItem("copyright", $('#copyright').html());
    sessionStorage.setItem("regionId", $(this).attr("main-data"));//名称
    if ($(this).attr("main-data") == "130000" || $(this).attr("main-data") == "460000" || $(this).attr("main-data") == "310000" || $(this).attr("main-data") == "620000" || $(this).attr("main-data") == "370000" || $(this).attr("main-data") == "120000" || $(this).attr("main-data") == "650000" || $(this).attr("main-data") == "110001" || $(this).attr("main-data") == "500000" || $(this).attr("main-data") == "450000") {
        maskTip("此功能维护中");
        return;
    }
    window.location.href = "/monitorReport?page=reportPlatform&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
})
$('#reportSearch').click(function () {
    window.location.href = "/monitorReport?page=reportInquire&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
})