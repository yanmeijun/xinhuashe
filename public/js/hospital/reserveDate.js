/*
 *科室详情路径(从上个接口获取)
 */
var hospitalIdpath = localStorage.getItem('hospitalIdpath');//科室详情路径(从上个接口获取)
var hospitalkeshi = localStorage.getItem('keshiId');//科室ID(从第九个接口获取)
var hospitalyiyuan = localStorage.getItem('hospitalId');//医院ID(从第八个接口获取)
/*
 *科室详情路径(从上个接口获取)
 * data请求参数
 * post请求
 */
var c=[],a = [],weekNum=1,yearTime=[],hospitalId,departmentId,relType,sdFirstId,sdSecondId;
function surplus() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        idPath: hospitalIdpath
    };
    $.ajax({
        async: true,
        type: "post",
        url: "/hospital/surplus",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var medicinePatient = data.responseBody;
                $('#medicine').html(medicinePatient.yymc);//医院名称
                $('#outpatient').html(medicinePatient.ksmzmc);//医院所对应的科室名称
                localStorage.setItem('hospitalmingcheng', medicinePatient.yymc);
                localStorage.setItem('hospitalmingke', medicinePatient.ksmzmc);
                /*
                 *医院所对应的门诊时间
                 */
                var patientTime = "", patientArr = data.responseBody.yygz;
                patientTime += '<p>更新时间：' + patientArr.gesj + '</p>' +
                    '<p>预约周期：' + patientArr.yyzq + '</p>' +
                    '<p>停挂时间： ' + patientArr.tgsj + '</p>' +
                    '<p>退号时间： ' + patientArr.thsj + '</p>' +
                    '<p class="title">特殊规则：</p>' +
                    '<p>' + medicinePatient.tsgz + '</p>';
                $('#outpatientTime').html(patientTime);
                var pattern = /[\u4e00-\u9fa5]+/g;
                var pattern1 = /^\d{4}\-\d{2}\-\d{2}$/g;
                var pattern2 = /^0.*/g;//首字母为0
                var timeMonths = [], timeYears = [], timeDatas = [];//获取几个月份

                 hospitalId = medicinePatient.yygz.hId;
                 departmentId = medicinePatient.yygz.dId;
                 relType = medicinePatient.yygz.relType;
                 sdFirstId = medicinePatient.yygz.sdFirstId;
                 sdSecondId = medicinePatient.yygz.sdSecondId;
                time('1');
                /*var param = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,
                    localFrom:localFrom,
                    local_y: local_y,
                    hospitalId: hospitalId,
                    departmentId:departmentId,
                    relType:relType,
                    sdFirstId:sdFirstId,
                    sdSecondId:sdSecondId,
                    departmentName:"",
                    week:weekNum
                };
                $.ajax({
                    async: true,
                    type: "post",
                    url: "/hospital/surplusTime",
                    data: JSON.stringify(param),
                    contentType: 'application/json',
                    success:function(res){
                       console.log(res)
                        if(res.retCode == "000000"){
                            if(weekNum=='1'){
                                c=a.concat(res.responseBody.dutyCalendars);
                            }else{
                                Array.prototype.push.apply(c,res.responseBody.dutyCalendars);
                            }
                            weekNum++
                            console.log(c)
                            if(res.responseBody.monthBetween.split("-").length=='2'){
                                yearTime.push(res.responseBody.monthBetween);
                            }
                            console.log(res.responseBody.lastWeek)
                            console.log(weekNum)

                            if(weekNum>res.responseBody.lastWeek){return}
                            surplus(weekNum);
                        }
                        $('#dialogMask,#dialog').hide()
                    },
                    error: function (xhr, type) {
                        console.log('Ajax error!')
                    }
                });*/


                /*
                 *查询动画提示结束
                 */
                //$('#dialogMask,#dialog').hide()

                // for (var i = 0; i < data.responseBody.list.length; i++) {
                //     var m = data.responseBody.list[i].date.match(pattern)//得到星期
                //     var months = data.responseBody.list[i].date.split("-")[1];
                //     years = data.responseBody.list[i].date.split("-")[0].slice(3);
                //     var datas = data.responseBody.list[i].date.split("-")[2];
                //     if (months.match(pattern2)) {//首字母为0
                //         months = data.responseBody.list[i].date.split("-")[1].replace("0", "");
                //     } else {
                //         months = data.responseBody.list[i].date.split("-")[1]
                //     }
                //     timeMonths.push(months);//获取月
                //     timeYears.push(years);//获取年
                //     if (datas.match(pattern2)) {
                //         datas = data.responseBody.list[i].date.split("-")[2].replace("0", "");
                //     } else {
                //         datas = data.responseBody.list[i].date.split("-")[2]
                //     }
                //     timeDatas.push(datas)//获取日
                // }
                // var monthsItem = dplicatedItem(timeMonths);
                // // 调用日历
                // var m = removeDuplicatedItem(timeMonths);//排重获取月
                //
                // // var year=removeDuplicatedItem(timeYears);
                // for (var i = 0; i < m.length; i++) {
                //     calender(years, m[i], data.responseBody.list);
                // }
                //
                // $.each(data.responseBody.list, function (index, val) {
                //     var months = val.date.split("-")[1];
                //     var datas = val.date.split("-")[2];
                //     var yea = val.date.slice(3);//获得日期
                //     if (months.match(pattern2)) {
                //         months = val.date.split("-")[1].replace("0", "");
                //     } else {
                //         months = val.date.split("-")[1]
                //     }
                //     if (datas.match(pattern2)) {
                //         datas = val.date.split("-")[2].replace("0", "");
                //     } else {
                //         datas = val.date.split("-")[2]
                //     }
                //     var dates = months + "-" + datas;
                //     if (val.num == "有号") {
                //         $('#' + dates).addClass("on");
                //         /*
                //          *yea有剩余号的日期（从第十个接口获取）
                //          * hospitalkeshi科室ID(从第九个接口获取)
                //          * hospitalyiyuan医院ID(从第八个接口获取)
                //          */
                //         var type = "";
                //         if (val.time == "上午") {
                //             type = 1;
                //             $('#' + dates).attr("main-morn", type);
                //         } else if (val.time == "下午") {
                //             type = 2;
                //             $('#' + dates).attr("main-after", type);
                //         } else if (val.time == "晚上") {
                //             type = 3;
                //             $('#' + dates).attr("main-night", type);
                //         }
                //         var wee = val.date.slice(2, 3);
                //         $('#' + dates).removeClass("grayon");
                //         $('#' + dates).arrt("onclick", "hospitalId('" + yea + "','" + wee + "',this)");
                //         $('#' + dates).find('em').html('有号');
                //     } else if (val.num == "约满") {
                //         if ($('#' + dates).hasClass("on")) {
                //             $('#' + dates).removeClass("grayon");
                //             $('#' + dates).find('em').html('有号');
                //         } else {
                //             $('#' + dates).addClass("grayon");
                //             $('#' + dates).find('em').html('约满');
                //         }
                //     } else if (val.num.indexOf("预约") != -1) {
                //         $('#' + dates).addClass("on");
                //         var type = "";
                //         if (val.time == "上午") {
                //             type = 1;
                //             $('#' + dates).attr("main-morn", type);
                //         } else if (val.time == "下午") {
                //             type = 2;
                //             $('#' + dates).attr("main-after", type);
                //         } else if (val.time == "晚上") {
                //             type = 3;
                //             $('#' + dates).attr("main-night", type);
                //         }
                //         var wee = val.date.slice(2, 3);
                //         $('#' + dates).removeClass("grayon");
                //         //$('#'+dates).attr("onclick","hospitalId('"+yea+"','"+wee+"',this)");
                //         $('#' + dates).attr("onclick", "hospitalId('" + yea + "','" + wee + "',this)");
                //         $('#' + dates).find('em').html('有号');
                //     }
                // });


            }
            ;
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }


    })

};
var newM=[]
function time(weekNum){
    $('#dialogMask,#dialog').show()
    var param = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y,
        hospitalId: hospitalId,
        departmentId:departmentId,
        relType:relType,
        sdFirstId:sdFirstId,
        sdSecondId:sdSecondId,
        departmentName:"",
        week:weekNum
    };
    $.ajax({
        async: true,
        type: "post",
        url: "/hospital/surplusTime",
        data: JSON.stringify(param),
        contentType: 'application/json',
        success:function(res){
            if(res.retCode == "000000"){
                if(weekNum=='1'){
                    c=a.concat(res.responseBody.dutyCalendars);
                }else{
                    Array.prototype.push.apply(c,res.responseBody.dutyCalendars);
                }
                weekNum++;
                if(res.responseBody.monthBetween.split("-").length=='2'){
                    yearTime.push(res.responseBody.monthBetween);
                }else if(res.responseBody.monthBetween.split("-").length=='4'){
                    yearTime.push(res.responseBody.monthBetween.split("-")[0]+"-"+res.responseBody.monthBetween.split("-")[1]);
                }
                newM = removeDuplicatedItem(yearTime); //排重获取年月
                // 调用日历
                if(weekNum>res.responseBody.lastWeek){
                    for(var j=0;j<newM.length;j++){
                        calender(newM[j].split('-')[0], newM[j].split('-')[1]);
                    };
                    $.each(c, function (index, val) {
                        if (val.remainAvailableNumber>0) {//有号
                            $('#' + val.dutyDate).addClass("on");
                            /*
                             *yea有剩余号的日期（从第十个接口获取）
                             * hospitalkeshi科室ID(从第九个接口获取)
                             * hospitalyiyuan医院ID(从第八个接口获取)
                             */
                            /*var type = "";
                            if (val.time == "上午") {
                                type = 1;
                                $('#' + dates).attr("main-morn", type);
                            } else if (val.time == "下午") {
                                type = 2;
                                $('#' + dates).attr("main-after", type);
                            } else if (val.time == "晚上") {
                                type = 3;
                                $('#' + dates).attr("main-night", type);
                            }
                            var wee = val.date.slice(2, 3);*/

                            $('#' + val.dutyDate).removeClass("grayon");

                            $('#' + val.dutyDate).find('em').html('有号');
                            //$('#' + val.dutyDate).arrt("onclick", "hospitalId('" + yea + "','" + wee + "',this)");
                            $('#' + val.dutyDate).attr("onclick", "hospitalIds('','','"+val.dutyDate+"',this)");
                        } else if (val.remainAvailableNumber.num == 0 || val.remainAvailableNumber.num<0) {//约满
                            $('#' + val.dutyDate).addClass("grayon");
                            $('#' + val.dutyDate).find('em').html('约满');
                        }
                        /*else if (val.num.indexOf("预约") != -1) {
                            $('#' + dates).addClass("on");
                            var type = "";
                            if (val.time == "上午") {
                                type = 1;
                                $('#' + dates).attr("main-morn", type);
                            } else if (val.time == "下午") {
                                type = 2;
                                $('#' + dates).attr("main-after", type);
                            } else if (val.time == "晚上") {
                                type = 3;
                                $('#' + dates).attr("main-night", type);
                            }
                            var wee = val.date.slice(2, 3);
                            $('#' + dates).removeClass("grayon");
                            //$('#'+dates).attr("onclick","hospitalId('"+yea+"','"+wee+"',this)");
                            $('#' + dates).attr("onclick", "hospitalId('" + yea + "','" + wee + "',this)");
                            $('#' + dates).find('em').html('有号');
                        }*/
                    })
                    $('#dialogMask,#dialog').hide();
                    return
                }
                setTimeout(function(){
                    time(weekNum);
                },1000)
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}

/*
 *返回按钮
 */
$('#back').on("click", function () {
    var url = "/hospital?page=department&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
})

/*
 *日历
 */
function calender(year, yue, monthsItem) {
    var time = new Date(year, yue - 1, 27);
    y = time.getFullYear(),//年
        m = time.getMonth(),//月
        date = time.getDate(),//日
        week = new Date(y, m, 1).getDay(),//星期几
        arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        row = Math.ceil((arr[m] + week) / 7);
    //渲染thead
    var ar = ["日", "一", "二", "三", "四", "五", "六"],
        str = "<thead><tr><td colspan='7' class='title'><span class='yueBg'>" + yue + "</span><span class='fryue'><em><i></i>约满</em><em><i></i>有号</em></span></td></tr><tr>";
    for (var i = 0; i < ar.length; i++) {
        str += "<td>" + ar[i] + "</td>";
    }
    str += "</tr></thead>";
    $(".table").append($(str));
    //渲染tbody
    var strB = "<tbody id=" + yue + "mount  main-yue=" + yue + ">";
    for (var i = 1; i <= row; i++) {
        strB += "<tr>";
        for (var n = 1; n <= 7; n++) {
            var num = (i - 1) * 7 + n - week;
            if (num <= 0) {
                strB += "<td></td>";
            } else {
                if (num == date) {
                    if(num<10){
                        strB += "<td id="+year + "-" + yue + "-" + ("0"+num) + "><span >" + num + "<em></em></span></td>";
                    }else{
                        strB += "<td id="+year + "-" + yue + "-" + num + "><span >" + num + "<em></em></span></td>";
                    }
                } else {
                    if (num > arr[m]) {
                        strB += "<td></td>";
                    } else {
                        if(num<10){
                            strB += "<td id="+year + "-" + yue + "-" + ("0"+num) + "><span >" + num + "<em></em></span></td>";
                        }else {
                            strB += "<td id="+year + "-" + yue + "-" + num + "><span>" + num + "<em></em></span></td>";
                        }

                    }
                }
            }
        }
        strB += "</tr>";
    }
    strB += "</tbody>";
    $(".table").append($(strB));
}

function dplicatedItem(arr) {//绘重
    var newArr = [],
        tempArr = [];
    for (var i = 0, j = arr.length; i < j; i++) {
        if (arr[i] == arr[i + 1]) {
            tempArr.push(arr[i]);
        } else {
            tempArr.push(arr[i]);
            newArr.push(tempArr.slice(0));
            tempArr.length = 0;
        }
    }
    return newArr;
}

function removeDuplicatedItem(ar) {//排重
    var ret = [];
    for (var i = 0, j = ar.length; i < j; i++) {
        if (ret.indexOf(ar[i]) === -1) {
            ret.push(ar[i]);
        }
    }
    return ret;
}


//跳转到对应的页面
function hospitalIds(yeapath, weekhospital, dutyDate,_this) {
   /* localStorage.setItem('doctorYear', yeapath);//有剩余号的日期（从第十个接口获取）
    //localStorage.setItem('doctorTime',typetime);//预约时间段 字典值（1 上午 2 下午 3 晚上 从第十个接口获取）
    localStorage.setItem('hospitaweek', weekhospital);//储存周几*/


    var hospitalkeshi = localStorage.getItem('keshiId');//科室ID(从第九个接口获取)
    var hospitalyiyuan = localStorage.getItem('hospitalId');//医院ID(从第八个接口获取)
    localStorage.setItem('doctorYear', dutyDate)

    /*var morn = $(_this).attr("main-morn");
    var after = $(_this).attr("main-after");
    var night = $(_this).attr("main-night");
    var strTime = "";
    if (morn != undefined) {
        strTime += morn;
    }
    if (after != undefined) {
        strTime += "," + after;
    }
    if (night != undefined) {
        strTime += "," + night;
    }
    localStorage.setItem('doctorTime', strTime);//预约时间段 字典值（1 上午 2 下午 3 晚上 从第十个接口获取）

    var doctorList = localStorage.getItem('doctorTime').split(",").filter(function (item) {
        return item
    });*/
    var paramData = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        dutyDate: dutyDate,//有剩余号的日期
        departmentId: hospitalkeshi,//科室ID
        hospitalId: hospitalyiyuan,//医院ID
        /*dutyCode:  1,//预约时间段 字典值*/
    };
    $.ajax({
        async: true,
        url: "/hospital/doctorInfo",
        type: 'post',
        data: JSON.stringify(paramData),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode != "000000") {//没有登陆，跳转登陆页面
                window.location.href = "/hospital?page=login&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=reserveDate";
            } else {//登陆过跳转个人中心
                var url = "/hospital?page=reserve&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;//跳转到对应的页面
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })

}


$(function () {
    $('#dialogMask,#dialog').show();

    surplus();//页面加载中执行

    var commitStatus = true;
    //点击首页的个人中心-start
    $("#userAvatarBox").on("click", function () {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            orderType: -1,
            page: 1,
            startDate: "2018-05-18",
            endDate: "2018-08-17"
        }
        /*  var url="/hospital?page=registerList&randomKey="+randomKey+"&userID="+userID.trim()+"&clientID="+clientID.trim()+"&cityID="+cityID.trim()+"&local_x="+local_x+"&local_y="+local_y
         +'&orderType=2&page=1&startDate=2018-01-01&endDate=2018-12-31';*/
        if (commitStatus) {
            commitStatus = false;
            $.ajax({
                async: false,
                type: "post",
                url: "/hospital/registerList",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
            }).done(function (response) {
                commitStatus = true;
                if (response.retCode == "000001") {//没有登陆，跳转登陆页面
                    window.location.href = "/hospital?page=login&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=reserveDate";
                } else {//登陆过跳转个人中心
                    window.location.href = "/hospital?page=reservationDetail&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=reserveDate";
                }
            }).fail(function (data) {
                commitStatus = true;
            }).always(function () {

            });
        }
    })
    //点击首页的个人中心-end
})