function toUserCenter(pageName) {
    window.location.href = "/jxHospital/toUserCenter?randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y +
        "&comeFrom=" + pageName;
}