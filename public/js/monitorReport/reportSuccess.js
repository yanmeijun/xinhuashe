var copyright = sessionStorage.getItem("copyright");
var success = sessionStorage.getItem("success");
$(function(){
    $('#copyright').html(copyright);
    if(success){
        $('#searchResult').html(success);
    }else{
        $('#searchResult').html("举报失败");
    }

})
$('#back').click(function () {
    window.location.href = "/monitorReport?page=reportInfo&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
});
$('#backHome').click(function () {
    window.location.href = "/monitorReport?page=monitorReport&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
});
$('#btnDefault').click(function () {
    window.location.href = "/monitorReport?page=reportInquire&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
});
