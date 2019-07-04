function report(element) {
    if(element == "report"){
        if (!$('input[name="smsradio"]:checked').val()) {
            maskTip("请阅读举报说明");
            return;
        }
        var url = "/corruptionReport?page=reportComplaintMsg&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    }else{
        var url = "/corruptionReport?page=reportQuery&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    }
}