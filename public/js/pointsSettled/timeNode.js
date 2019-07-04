function anginCalculation() {
    var url = "/pointsSettled?page=pointsSettled&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}