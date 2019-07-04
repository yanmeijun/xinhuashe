var queryResult = JSON.parse(sessionStorage.getItem("queryResult"));

$(function(){

    $("#textName").html(queryResult.certName);
    $("#fdegree").html(queryResult.certNumber);

    var queryarray = queryResult.certText.split("。");
    $("#certificateInfo_1").html(queryarray[0]);
    $("#certificateInfo_2").html(queryarray[1]);
    $("#certificateInfo_3").html(queryarray[2]);
    //$("#certificateInfo").html(queryResult.certText);
    $("#certTail1").html(queryResult.certTail1);
    $("#certDate").html(queryResult.certDate);
    $("#certTopImg").attr("src","http://cscserzsearch.cscse.edu.cn/"+queryResult.certTopImg);
});
$("#goback").click(function(){
    var url = "/fdegreeCertification?page=fdegreeCertification&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
});