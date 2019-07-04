var searchCode = sessionStorage.getItem("searchCode");
var backFrom = sessionStorage.getItem("backFrom");
$('#back').on("click", function () {
    if (backFrom == "reportPersonal") {
        var url = "/organizationReport?page=reportPersonal&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    } else {
        var url = "/organizationReport?page=reportUnits&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    }
})
$(function () {
    $('#searchResult').html(searchCode)
})
$('#backHome').click(function () {
    var url = "/organizationReport?page=organizationReport&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
});
$('#feedback').click(function () {
    var url = "/organizationReport?page=feedback&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
});