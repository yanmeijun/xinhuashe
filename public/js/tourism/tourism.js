$(function () {
    $("#complainBtn").on("click", function (event) {
        window.location.href = "/touristComplaint?randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        event.preventDefault();
    });
    $("#complainSearch").on("click", function (event) {
        window.location.href = "/tourismComplaintProgress?randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        event.preventDefault();
    });
})