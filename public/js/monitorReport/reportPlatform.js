var province = sessionStorage.getItem("province");
var copyright = sessionStorage.getItem("copyright");
$(function () {
    $('#copyright').html(copyright);
    initSelectCity(province)//生成省的列表项
    selectArea()
})
$('#back').click(function () {
    window.location.href = "/monitorReport?page=monitorReport&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
})

function selectArea() {
    if (area.length <= 0) {
        window.location.href = "/monitorReport?page=reportInfo&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        return;
    }
    areaArray = area.split(",");
    var html = "";
    for (i = 0; i < areaArray.length; i++) {
        var temp = areaArray[i].split(":")
        html += "<li onclick=initSelect('" + temp[1] + "','" + temp[0] + "','" + temp[2] + "')>" + temp[0] + "<i class='rightArrow'></i></li>";
    }
    $('#reportCityList').html(html);
}

//生成县区
var obj = [], country = [], areaPing = [];

function initSelect(selectCity, selectCityArea, areaPingying) {
    obj.push(selectCity)
    country.push(selectCityArea);
    areaPing.push(areaPingying);
    sessionStorage.setItem("areaCode", obj);//所属市/区id
    sessionStorage.setItem("countryCode", country);//所属市/区名称
    sessionStorage.setItem("selectCityArea", selectCityArea);
    sessionStorage.setItem("areaPin", areaPing);
    /*
    *如果是哈尔滨市 域名改名
    */
    if (selectCity == "230100") {
        sessionStorage.setItem("typeUrl", "http://haerbin.12388.gov.cn/");
        sessionStorage.setItem("reportUrl", "http://haerbin.12388.gov.cn/xinfang/reportAction.do?method=save");//代表提交举报地址
        sessionStorage.setItem("verificationUrl", "http://haerbin.12388.gov.cn/xinfang/servlet/randimg");//代表验证码地址
        sessionStorage.setItem("correctReportImg", "http://haerbin.12388.gov.cn/xinfang/reportAction.do?method=check_save");//代表判断验证码是否正确地址
    }
    initSelectArea(selectCity)//
    var html = "";
    if (area.length > 0) {
        selectArea();
    } else {
        window.location.href = "/monitorReport?page=reportNotice&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        return;
    }
}
