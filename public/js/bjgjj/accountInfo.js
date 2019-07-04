$(function () {
    fnSize();
    window.addEventListener('resize', fnSize, false);
    function fnSize() {
        document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
    }
    getfund();//页面加载时执行
})
/*
 * 返回按钮
 */
function back() {
    var url = "/bjgjj?page=basicInfo&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
};
function getfund() {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: "/bjgjj/getfund",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            console.log(res)
            if (res.retCode == "000000") {
                $('#noDate').hide();
                var html = ""
                $.each(res.responseBody.data.list, function (index, item) {
                    html += "<div class=\"text-list-div clearfix\">" +
                        "<label>用户姓名：</label>" +
                        "<span>" + item.xm + "</span>" +
                        "</div>" +
                        "<div class=\"text-list-div clearfix\">" +
                        "<label>证件类型：</label>" +
                        "<span>" + item.zjlx + "</span>" +
                        "</div>" +
                        "<div class=\"text-list-div clearfix\">" +
                        "<label>证件号码：</label>" +
                        "<span>" + item.zjhm + "</span>" +
                        "</div>" +
                        "<div class=\"text-list-div clearfix\">" +
                        "<label>公积金账号：</label>" +
                        "<span>" + item.gjjzh + "</span>" +
                        "</div>" +
                        "<div class=\"text-list-div clearfix\">" +
                        "<label>单位名称：</label>" +
                        "<span>" + item.dwmc + "</span>" +
                        "</div>" +
                        "<div class=\"text-list-div clearfix\">" +
                        "<label>个人缴存基数：</label>" +
                        "<span>" + item.grjcjs + "</span>" +
                        "</div>" +
                        "<div class=\"text-list-div clearfix\">" +
                        "<label>单位月缴存额：</label>" +
                        "<span>" + item.dwyjce + "</span>" +
                        "</div>" +
                        "<div class=\"text-list-div clearfix\">" +
                        "<label>个人月缴存额：</label>" +
                        "<span>" + item.gryjce + "</span>" +
                        "</div>" +
                        "<div class=\"text-list-div clearfix\">" +
                        "<label>月缴存额：</label>" +
                        "<span>" + item.yjce + "</span>" +
                        "</div>" +
                        "<div class=\"text-list-div clearfix\">" +
                        "<label>缴存状态：</label>" +
                        "<span>" + item.jczt + "</span>" +
                        "</div>" +
                        "<div class=\"text-list-div clearfix\">" +
                        "<label>个人账户余额：</label>" +
                        "<span>" + item.grzhye + "</span>" +
                        "</div>" +
                        "<div class=\"text-list-div clearfix\">" +
                        "<label>冻结金额：</label>" +
                        "<span>" + item.djje + "</span>" +
                        "</div>";
                        /*"<div class=\"text-list-div clearfix\">" +
                        "<label>开户日期：</label>" +
                        "<span>" + item.khrq + "</span>" +
                        "</div>"*/
                });
                $('#haveDate').html(html);
                $('#haveDate').show();
            } else {
                $('#haveDate').hide();
                $('#errorCon').html(res.responseBody.errorMsg);
                $('#noDate').show();
                return;
            }
        },
        error: function () {
            masktime("请求异常");
            return;
        }
    });
};
//提示语
function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
};