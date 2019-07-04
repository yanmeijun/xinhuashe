var  searchResult = JSON.parse(JSON.parse(sessionStorage.getItem("searchResult")));
var backFrom = sessionStorage.getItem("backFrom");
$(function() {
    $("#reportCode span").html(searchResult.name);
    $("#reportInquireCode span").html(searchResult.searchCode);
});

/*按钮跳转*/
function pageSkip(str){
    if(str == "complaintMessage"){
        var url = "/culturalMarketReport?page=complaintMessage&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    }
    if(str == "culturalMarketReport"){
        var url = "/culturalMarketReport?page=culturalMarketReport&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    }
}