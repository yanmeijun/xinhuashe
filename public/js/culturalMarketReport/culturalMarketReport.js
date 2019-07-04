
/*查询跳转*/
$("#queryReport").on("click",function(){
    sessionStorage.setItem("backFrom","culturalMarketReport");
    var url = "/culturalMarketReport?page=reportQuery&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
    return ;
});
/*举报跳转*/
$("#messageReport").on("click",function(){
    sessionStorage.setItem("backFrom","culturalMarketReport");
    var url = "/culturalMarketReport?page=complaintMessage&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
    return ;
});
