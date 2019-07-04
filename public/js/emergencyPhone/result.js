var resultList = sessionStorage.getItem("resultList");
var data = JSON.parse(resultList);
$("#back,#goHome").click(function(){
    var url = "/emergencyPhone?page=emergencyPhone&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
})
if(data.tel.indexOf("/")!=-1){
    var phone = data.tel.split("/");
}else if(data.tel.indexOf(" ")!=-1){
    var phone = data.tel.split(" ");
}else{
    var phone = data.tel;
}
$('#embassy').html(data.embassy);
var html = "";
if(phone instanceof Array){
    phone.forEach(function(item,i){
        html += "<p class=\"phoneNum\">"+item+"</p>";
    })
}else{
    html += "<p class=\"phoneNum\">"+data.tel+"</p>";
}
$("#resultsTable").html(html);
