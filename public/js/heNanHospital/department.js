var hosIdDeatils = sessionStorage.getItem("hosIdDeatils");//记录号（从接口1中获取）
$(function () {
    $('#dialogMask,#dialog').show();

    hospitalDetails();
});
function hospitalDetails() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        id: hosIdDeatils//记录号（从接口1中获取）
    };
    $.ajax({
        async: true,
        type: 'post',
        url: "/heNanHospital/hospitalDetails",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                $('#ksImg').attr("src", data.responseBody.img);
                $('#hosName').html(data.responseBody.hosName);
                $('#yyxq').html(data.responseBody.yyxq.trim());
                $('#yyueNum').html(data.responseBody.yyueNum);
                $('#yyueRule').html(data.responseBody.yyueRule);
                sessionStorage.setItem("hosName", data.responseBody.hosName);
                sessionStorage.setItem("srcImg", data.responseBody.img);
                sessionStorage.setItem("yyxq", data.responseBody.yyxq);
                if (data.responseBody.lists.length == 0) {
                    $('#noDate').show();
                    $('#havaDate').hide();
                    $('#dialogMask,#dialog').hide();

                    return;
                }
                var departmentArr = [];//定义数组储存大类
                for (k in data.responseBody.lists) {
                    departmentArr.push(data.responseBody.lists[k].kshdl)//科室追加到数组中
                }
                var dplicatedItemArr = dplicatedItem(departmentArr)//获得重复的数据分类
                var arr = removeDuplicatedItem(departmentArr)//排重得到科室
                /*
                 *渲染科室
                 */
                var hospitalCategory = "";
                for (var i = 0; i < arr.length; i++) {
                    if (i == 0) {
                        //hospitalCategory+=`<li onclick="dapart(${i})" class="dapar active"><a href="javascript:;" >${arr[i]}</a></li>`;
                        hospitalCategory += "<li onclick=dapart('" + i + "') class='dapar active'><a href=\"javascript:;\" >" + arr[i] + "</a></li>";
                    } else {
                        //hospitalCategory+=`<li onclick="dapart(${i})" class="dapar"><a href="javascript:;" >${arr[i]}</a></li>`
                        hospitalCategory += "<li onclick=dapart('" + i + "') class=\"dapar\"><a href=\"javascript:;\" >" + arr[i] + "</a></li>";
                    }

                }
                $('#sectionDetails').html(hospitalCategory);
                $('#dialogMask,#dialog').hide();
                /*
                 *循环科室详情信息
                 */
                var hospitalCategoryInfo = "", ind = 0, department = data.responseBody;
                for (var i = 0; i < arr.length; i++) {
                    hospitalCategoryInfo += "<div class=\"tabConBox\">";
                    for (var j = 0; j < dplicatedItemArr[i].length; j++) {
                        var length = ind++;
                        //hospitalCategoryInfo+=`<p onclick="hospitalCategory(\'`+department.lists[length].id+`\')">${department.lists[length].kshname}</p>`;
                        hospitalCategoryInfo += "<p onclick=hospitalCategory('" + department.lists[length].id + "')>" + department.lists[length].kshname + "</p>";
                    }
                    hospitalCategoryInfo += "</div>";
                }
                ;
                $('#hospitalCategoryInfo').html(hospitalCategoryInfo);
                $('#hospitalCategoryInfo .tabConBox').eq(0).show().siblings().hide();
                $('#hospitalCategoryInfo').css({"height": $('#sectionDetails').height(), "overflow-y": "scroll", "min-height": "350px"});
                $('#dialogMask,#dialog').hide();

                $('#noDate').hide();
                $('#havaDate').show();
            }
        },
        error: function () {
            console.log('axr error')
        }
    });
};
function removeDuplicatedItem(ar) {//排重
    var ret = [];
    for (var i = 0, j = ar.length; i < j; i++) {
        if (ret.indexOf(ar[i]) === -1) {
            ret.push(ar[i]);
        }
    }
    return ret;
};

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
};
function back() {
    var url = "/heNanHospital?page=heNanHospital&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
};
function lookDetail() {
    var url = "/heNanHospital?page=details&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}

function dapart(ind) {
    $('#sectionDetails li').eq(ind).addClass('active').siblings().removeClass("active");
    $('#hospitalCategoryInfo .tabConBox').eq(ind).show().siblings().hide();
};

function hospitalCategory(categoryId) {
    sessionStorage.setItem("categoryId", categoryId)
    var url = "/heNanHospital?page=departmentRegister&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
/*
 *查询预约记录
 */
var userCenter = true;   //个人中心开关
$(".userAvatarBox").on("click", function (event) {
    if (userCenter) {
        userCenter = false;
        $(".userAvatarBox #userCenter").show();//记录
    } else {
        userCenter = true;
        $(".userAvatarBox #userCenter").hide();
    }

});
$("#userCenter li").on("click", function (event) {
    event.stopPropagation();
});
//点击挂号记录，判断是否登陆，再跳转页面
$("#record").on("click", function (event) {
//            let recodeHe=JSON.parse(sessionStorage.getItem("recodeHe"));
//            console.log(recodeHe.time.split(":")[2])
//            console.log(new Date().getMinutes())
//            /*
//            *登录后跳转页面
//            */
//            if(new Date().getTime()-new Date(recodeHe.time.slice(5)).getTime()<=10){
//                var url="/heNanHospital?page=registeredRecord&randomKey="+randomKey+"&userID="+userID+
//                    "&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x+"&local_y="+local_y+"&comeFrom=department";
//                window.location.href=url;
//                return;
//            }
//            let eidmgs=sessionStorage.getItem("eidRecord");//记录号（从接口3中获取）
//            let slmgs=sessionStorage.getItem("slRecord")//记录号（从接口3中获取）
//            let data = {
//                randomKey: randomKey,
//                userID: userID,
//                clientID: clientID,
//                cityID: cityID,
//                local_x: local_x ,localFrom:localFrom,
//                local_y: local_y,
//                eid:eidmgs || "",//记录号（从接口3中获取）
//                sl:slmgs || ""//记录号（从接口3中获取）
//            };
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        p: 1,//页码（默认值为1）
        yys: "",//预约开始时间
        yye: "",//预约结束时间
        state: 0//预约状态（默认值为0）
    };
    $.ajax({
        async: true,
        type: 'post',
        url: "/heNanHospital/getDetail",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (data) {
            if (data.rtnCode == "000000") {
                if (data.data.datail) {
                    var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=department";
                    window.location.href = url;
                }
                ;
            }
            ;
            /*
             *登录后跳转页面
             */
            if (data.retCode == "000000") {
                if (!data.responseBody.scdlsj) {
                    var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=department";
                    window.location.href = url;
                    return;
                }
                var url = "/heNanHospital?page=registeredRecord&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=department";
                window.location.href = url;
            }
        }
    })
});
/*
 *点击退出
 */
$('#quit').on("click", function () {
    maskTip("退出中。。。");
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        type: 'post',
        url: "/heNanHospital/addPeople",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            console.log(data)
            if (data.retCode == "000000") {
                var url = "/heNanHospital?page=heNanHospital&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;
            } else {
                maskTip("未登陆或已退出");
                return;
            }
            ;
        },
        error: function () {
            maskTip("请求异常");
            return;
        }
    })
})