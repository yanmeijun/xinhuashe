$(function () {
    $("#back").on("click", function () {
        window.location.href = "/degree?page=degree&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        event.preventDefault();
    });
});