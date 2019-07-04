var orderInfor = sessionStorage.getItem("orderInfor");

var RegResources = {
    nameReg: new RegExp("\\$\\{name\\}", "g"),
    cardReg: new RegExp("\\$\\{card\\}", "g"),
    blsxReg: new RegExp("\\$\\{blsx\\}", "g"),
    addressReg: new RegExp("\\$\\{address\\}", "g"),
    timeReg: new RegExp("\\$\\{time\\}", "g"),
    yyhReg: new RegExp("\\$\\{yyh\\}", "g")
};
var data = JSON.parse(orderInfor).list;
var template = $("#calculatorBox").html(), html = "";
html += template.replace(RegResources.nameReg, data.xm)
    .replace(RegResources.cardReg, data.idCard)
    .replace(RegResources.blsxReg, data.blsx)
    .replace(RegResources.addressReg, data.sldd)
    .replace(RegResources.timeReg, data.slsj)
    .replace(RegResources.yyhReg, data.yyh)
$("#calculatorBox").html(html);


$('#back').on("click", function () {
    var url = "/hfzggjspcs?page=fillInfo&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
});
$('#agin').on("click", function () {
    var url = "/hfzggjspcs?page=hfzggjspcs&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
})
