/*
{"responseBody":{"search_code":"925137","report_no":"jb201812250000858"},"retCode":"000000"}*/

$('#back').click(function(){
    var url = "/networkCrimeReport?page=userInfo&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
})
$('#backHome').click(function(){
    var url = "/networkCrimeReport?page=networkCrimeReport&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
})
$('#aginReport').click(function(){
    var url = "/networkCrimeReport?page=reportInfo&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
})
var resultSuccess = sessionStorage.getItem("resultSuccess");
var successResult = JSON.parse(resultSuccess);
$(function(){
    $('#code').html(successResult.report_no);
    $('#searchCode').html(successResult.search_code);
})
