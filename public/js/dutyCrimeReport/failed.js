$('#back').on("click",function(){
    window.location.href = "/dutyCrimeReport?page=bInformerInfo&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
});
$('#aginReport').on("click",function(){
    window.location.href = "/dutyCrimeReport?page=informerInfo&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
});
var dutyCrimeResult =  JSON.parse(sessionStorage.getItem("dutyCrimeResult"));
$(function(){
    $('#searchCode').html(dutyCrimeResult.status)
})