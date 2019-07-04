var success = sessionStorage.getItem("success");
$(function () {
    $('#xinjiang_citySrc').attr("src", citySRC || "/images/monitorReport/banner.png");
    if (success) {
        $('#searchResult').html(success);
    } else {
        $('#searchResult').html("举报失败");
    }

})
$('#back').click(function () {
    window.location.href = "/corruptionReport?page=reportComplaintMsg&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
});
$('#backHome').click(function () {
    window.location.href = "/corruptionReport?page=corruptionReport&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
});
$('#btnDefault').click(function () {
    window.location.href = "/corruptionReport?page=reportQuery&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
});
