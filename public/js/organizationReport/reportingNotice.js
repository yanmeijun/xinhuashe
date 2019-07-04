$('#back').click(function () {
    var url = "/organizationReport?page=organizationReport&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
});
function report() {
    /*if (!$('input[name="smsradio"]:checked').val()) {
        maskTip("请阅读举报说明");
        return;
    } else if ($('input[name="smsradio"]:checked').val() == "false") {
        maskTip("请阅读举报说明");
        return;
    }*/
    if (sessionStorage.getItem("redirect") == 'until') {
        var url = "/organizationReport?page=reportUnits&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    } else {
        var url = "/organizationReport?page=reportPersonal&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    }
}