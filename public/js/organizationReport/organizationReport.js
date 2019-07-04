$('#search').click(function () {
    sessionStorage.setItem("backFrom", "organizationReport");
    var url = "/organizationReport?page=feedback&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
})
$('#report').click(function () {
    var url = "/organizationReport?page=reportingNotice&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
});
function report(element){
    if(element == 'until'){
       sessionStorage.setItem("redirect",element);
    }else if(element == 'person'){
       sessionStorage.setItem("redirect",element);
    }
    var url = "/organizationReport?page=reportingNotice&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
    return;
}