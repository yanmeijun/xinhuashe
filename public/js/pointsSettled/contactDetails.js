function back() {
    var url = "/pointsSettled?page=pointsSettled&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
function mack(mgs) {
    $('#Call').attr("href", "tel:" + mgs);
    $('#title').html(mgs)
    $('#dialogMask,#dialog').show();

};
$('#del').on("click", function () {
    $('#dialogMask,#dialog').hide();

});
function nextPage(address) {
    localStorage.setItem("detailAddress", address);
    //let url="/pointsSettled?page=qualificatMap&randomKey="+randomKey+"&userID="+userID.trim()+"&clientID="+clientID.trim()+"&cityID="+cityID.trim()+"&local_x="+local_x+"&local_y="+local_y;
    //window.location.href=url;
}