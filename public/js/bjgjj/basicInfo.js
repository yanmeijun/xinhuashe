/*
 * 返回按钮
 */
function back() {
    var url = "/bjgjj?page=bjGJJ&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
};
var loginResult = JSON.parse(sessionStorage.getItem("loginResult"));
$(function () {
    fnSize();
    window.addEventListener('resize', fnSize, false);
    function fnSize() {
        document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
    }

    $("#userCenter").click(function () {
        var getDisplay = document.getElementById("userCenterList").style.display;
        if (getDisplay == "none") {
            $("#userCenterList").show();
        } else {
            $("#userCenterList").hide();
        }
    });
});
$('#dialogMask,#dialog').show();
$('#housingFund').html("");
var html = '';
html += "<div class=\"text-list-div clearfix\">" +
    "<label>预留手机号：</label>" +
    "<span>" + loginResult.ylsjh + "</span>" +
    "</div>" +
    "<div class=\"text-list-div clearfix\">" +
    "<label>证件号码：</label>" +
    "<span>" + loginResult.zjhm + "</span>" +
    "</div>" +
    "<div class=\"text-list-div clearfix\">" +
    "<label>公积金账号：</label>" +
    "<span>" + loginResult.gjjzh + "</span>" +
    "</div>" +
    "<div class=\"text-list-div clearfix\">" +
    "<label>用户状态：</label>" +
    "<span>" + loginResult.yhzt + "</span>" +
    "</div>";
$('#housingFund').html(html);
$('#dialogMask,#dialog').hide();
//提示语
function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
};
function next() {
    var url = "/bjgjj?page=accountInfo&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
};
function aginnext() {
    var url = "/bjgjj?page=businessInfo&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
}