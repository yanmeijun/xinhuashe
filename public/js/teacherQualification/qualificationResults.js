var cerResults = localStorage.getItem("cerResults");
var cerresults = JSON.parse(cerResults);
var arr = []
arr.push(cerresults)
var html = "";
$(function () {
   /* if (citySRC) {
        $("#citySRC").attr("src", citySRC)
    } else {
        $("#citySRC").attr("src", "../images/banner.png")
    }
    ;*/
})
$.each(arr, function (index, val) {
    $('#username').html(val.xm);
    $('#pdf').attr("href", val.jlh)
    $('#imgPer').attr("src", val.kszp);
    html += '<div class="text-list-div clearfix">' +
        '<label>' +
        '<div>证书编号：</div>' +
        '<div class="font18">Certificate Number</div>' +
        '</label>' +
        '<span>' + val.zmbh + '</span>' +
        '</div>' +
        '<div class="text-list-div clearfix">' +
        '<label>' +
        '<div>考试省份：</div>' +
        '<div class="font18">Entry Province</div>' +
        '</label>' +
        '<span>' +
        '<div>' + val.kssf + '</div>' +
        '<div class="font18">' + val.entryProvince + '</div>' +
        '</span>' +
        '</div>' +
        '<div class="text-list-div clearfix">' +
        '<label>' +
        '<div>考试类别：</div>' +
        '<div class="font18">Certificate Number</div>' +
        '</label>' +
        '<span>' +
        '<div>' + val.kslb + '</div>' +
        '<div class="font18">' + val.examinationCategory + '</div>' +
        '</span>' +
        '</div>' +
        '<div class="text-list-div clearfix">' +
        '<label>' +
        '<div>身份证号：</div>' +
        '<div class="font18">Certificate Number</div>' +
        '</label>' +
        '<span>' + val.sfzh + '</span>' +
        '</div>';
})
$('#userText').html(html);

function back() {
    window.location.href = "/teacherQualification?page=qualificationCertificate&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
        + "&cityName=" + cityName + "&citySRC=" + citySRC + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
}