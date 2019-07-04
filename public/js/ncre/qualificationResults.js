function back() {
    var url = "/ncre?page=ncre&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
var moreData = localStorage.getItem("moredata");//获得信息列表
var moreArr = [];
moreArr.push(JSON.parse(moreData));
var html = "";
$.each(moreArr, function (index, val) {
    var year = val.time.match(/\d+/g);//获得年月日
    html += '<div class="certificatePic">' +
        '<div class="clearfix">' +
        '<div class="certificate-lf">' +
        '<div class="userName"><span>' + val.name + '</span>参加<span>' + year[0] + '</span>年<span>' + year[1] + '</span>月全国计算机等级考试二级<span>' + val.kskm + '</span>考试。成绩<span>' + val.grade + '</span>。</div>' +
        '</div>' +
        '<div class="avatarBox"><img src="' + val.tx + '"></div>' +
        '</div>' +
        '<div class="userCer">This is to certify that the bearer  has passed the National Computer Rank  Examination  and has achieved level 2.</div>' +
        '</div>' +
        '<div class="text-list-div clearfix">' +
        '<label>' +
        '<div>身份证件号：</div>' +
        '<div class="font18">ID Number</div>' +
        '</label>' +
        '<span>' + val.sfzh + '</span>' +
        '</div>' +
        '<div class="text-list-div clearfix">' +
        '<label>' +
        '<div>准考证号：</div>' +
        '<div class="font18">Examination Number</div>' +
        '</label>' +
        '<span>' + val.zkzh + '</span>' +
        '</div>' +
        '<div class="text-list-div clearfix">' +
        '<label>' +
        '<div>证书编号：</div>' +
        '<div class="font18">Certificate Number</div>' +
        '</label>' +
        '<span>' + val.zsbh + '</span>' +
        '</div>' +
        '</div>';
})
$('#certificateList').html(html);