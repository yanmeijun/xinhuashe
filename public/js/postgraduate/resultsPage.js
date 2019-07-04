var time = new Date().getFullYear();
$('#time').html(time);

var result = JSON.parse(localStorage.getItem("resultPage"));
var arr = [];
arr.push(result)
var html = "", htmls = "";
$.each(arr, function (index, val) {
    htmls += '<div class="tab-content inforConfirm">' +
        '<div class="text-list-div clearfix">' +
        '<label>姓名：</label>' +
        '<span>' + val.name + '</span>' +
        '</div>' +
        '<div class="text-list-div clearfix">' +
        '<label>报名号：</label>' +
        '<span>' + val.RegistrationNumber + '</span>' +
        '</div>' +
        '<div class="text-list-div clearfix">' +
        '<label>准考证号：</label>' +
        '<span>' + val.TicketNumber + '</span>' +
        '</div>' +
        '</div>'
    html += '<div class="peccancyQuery userInfor onlyStyle">' +
        '<div class="tab-content inforConfirm">' +
        '<div class="text-list-div textListTit clearfix">' +
        '<label class="resultsTitle"><span></span>总分：</label>' +
        '<span>' + val.score + '</span>' +
        '</div>' +
        '<div class="text-list-div clearfix">' +
        '<label>第一门：</label>' +
        '<span>' + val.first + '</span>' +
        '</div>' +
        '<div class="text-list-div clearfix">' +
        '<label>第二门：</label>' +
        '<span>' + val.second + '</span>' +
        '</div>' +
        '<div class="text-list-div clearfix">' +
        '<label>第三门：</label>' +
        '<span>' + val.third + '</span>' +
        '</div>' +
        '<div class="text-list-div clearfix">' +
        '<label>第四门：</label>' +
        '<span>' + val.forth + '</span>' +
        '</div>' +
        '<div class="inquireTips">' +
        '<p>备注：' + val.Note + '</p>' +
        '</div>' +
        '</div>' +
        '</div>'
});
$('#resultPage').html(htmls);
$('#resultDetail').html(html);

$('#back').on("click", function () {
    var url = "/postgraduate?page=postgraduate&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
    localStorage.removeItem("resultPage");
})