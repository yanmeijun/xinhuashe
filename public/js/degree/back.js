$(function () {
    $(".icon-return").on("click", function () {
        window.location.href = "/degree?page=degreeInternetSituation&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        event.preventDefault();
    });
});