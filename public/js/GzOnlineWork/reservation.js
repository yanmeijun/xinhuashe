$(function () {
    var areaArr = [
        {name: "请选择", id: ""},
        {name: "省级", id: "520000"},
        {name: "贵阳市", id: "520100"},
        {name: "南明区", id: "520102"},
        {name: "云岩区", id: "520103"},
        {name: "花溪区", id: "520111"},
        {name: "乌当区", id: "520112"},
        {name: "白云区", id: "520113"},
        {name: "贵阳经开区", id: "520114"},
        {name: "观山湖区", id: "520115"},
        {name: "双龙航空港经济区", id: "520116"},
        {name: "贵阳高新区", id: "520117"},
        {name: "开阳县", id: "520121"},
        {name: "息烽县", id: "520122"},
        {name: "修文县", id: "520123"},
        {name: "清镇市", id: "520181"},
        {name: "贵阳综保区", id: "520184"},
        {name: "六盘水市", id: "520200"},
        {name: "钟山区", id: "520201"},
        {name: "六枝特区", id: "520203"},
        {name: "水城县", id: "520221"},
        {name: "盘州市", id: "520222"},
        {name: "遵义市", id: "520300"},
        {name: "红花岗区", id: "520302"},
        {name: "汇川区", id: "520303"},
        {name: "播州区", id: "520321"},
        {name: "桐梓县", id: "520322"},
        {name: "绥阳县", id: "520323"},
        {name: "正安县", id: "520324"},
        {name: "道真县", id: "520325"},
        {name: "务川县", id: "520326"},
        {name: "凤冈县", id: "520327"},
        {name: "湄潭县", id: "520328"},
        {name: "余庆县", id: "520329"},
        {name: "习水县", id: "520330"},
        {name: "赤水市", id: "520381"},
        {name: "仁怀市", id: "520382"},
        {name: "新蒲新区", id: "520383"},
        {name: "南部新区", id: "520384"},
        {name: "安顺市", id: "520400"},
        {name: "西秀区", id: "520402"},
        {name: "平坝区", id: "520421"},
        {name: "普定县", id: "520422"},
        {name: "镇宁县", id: "520423"},
        {name: "关岭县", id: "520424"},
        {name: "紫云县", id: "520425"},
        {name: "安顺开发区", id: "520491"},
        {name: "黄果树旅游区", id: "520492"},
        {name: "毕节市", id: "520500"},
        {name: "七星关区", id: "520502"},
        {name: "大方县", id: "520521"},
        {name: "黔西县", id: "520522"},
        {name: "金沙县", id: "520523"},
        {name: "织金县", id: "520524"},
        {name: "纳雍县", id: "520525"},
        {name: "威宁县", id: "520526"},
        {name: "赫章县", id: "520527"},
        {name: "金海湖新区", id: "520528"},
        {name: "贵安新区", id: "520555"},
        {name: "铜仁市", id: "520600"},
        {name: "碧江区", id: "520602"},
        {name: "万山区", id: "520603"},
        {name: "江口县", id: "520621"},
        {name: "玉屏县", id: "520622"},
        {name: "石阡县", id: "520623"},
        {name: "思南县", id: "520624"},
        {name: "印江县", id: "520625"},
        {name: "德江县", id: "520626"},
        {name: "沿河县", id: "520627"},
        {name: "松桃县", id: "520628"},
        {name: "黔西南州", id: "522300"},
        {name: "兴义市", id: "522301"},
        {name: "兴仁县", id: "522322"},
        {name: "普安县", id: "522323"},
        {name: "晴隆县", id: "522324"},
        {name: "贞丰县", id: "522325"},
        {name: "望谟县", id: "522326"},
        {name: "册亨县", id: "522327"},
        {name: "安龙县", id: "522328"},
        {name: "义龙新区", id: "522391"},
        {name: "百里杜鹃管理区", id: "522429"},
        {name: "黔东南州", id: "522600"},
        {name: "凯里市", id: "522601"},
        {name: "黄平县", id: "522622"},
        {name: "施秉县", id: "522623"},
        {name: "三穗县", id: "522624"},
        {name: "镇远县", id: "522625"},
        {name: "岑巩县", id: "522626"},
        {name: "天柱县", id: "522627"},
        {name: "锦屏县", id: "522628"},
        {name: "剑河县", id: "522629"},
        {name: "台江县", id: "522630"},
        {name: "黎平县", id: "522631"},
        {name: "榕江县", id: "522632"},
        {name: "从江县", id: "522633"},
        {name: "雷山县", id: "522634"},
        {name: "麻江县", id: "522635"},
        {name: "丹寨县", id: "522636"},
        {name: "凯里开发区", id: "522691"},
        {name: "黔南州", id: "522700"},
        {name: "都匀市", id: "522701"},
        {name: "福泉市", id: "522702"},
        {name: "荔波县", id: "522722"},
        {name: "贵定县", id: "522723"},
        {name: "瓮安县", id: "522725"},
        {name: "独山县", id: "522726"},
        {name: "平塘县", id: "522727"},
        {name: "罗甸县", id: "522728"},
        {name: "长顺县", id: "522729"},
        {name: "龙里县", id: "522730"},
        {name: "惠水县", id: "522731"},
        {name: "三都县", id: "522732"},
        {name: "都匀经开区", id: "522791"}
    ];
    $(document).on('click', '#area,#areaSelect', function () {
        if (document.getElementsByClassName('mobileSelect')[0]) {
            document.getElementsByClassName('mobileSelect')[0].remove();
        }
        var areaSelect = new MobileSelect({
            trigger: '#area',
            //title: '标题',
            wheels: [
                {data: areaArr}
            ],
            position: [0]//初始化定位
        });
        $("#department,#permission").attr("data_id", "");
        $("#department,#permission").text("请选择");
        $(".mobileSelect").addClass("mobileSelect-show");
    });
    $(document).on('click', "#department,#departmentSelect", function () {
        var areaid = $("#area").attr("data_id");
        if (!areaid) {
            masktime("请先选择区划！");
            return;
        }
        var param = {
            areaid: areaid, randomKey: randomKey, userID: userID, clientID: clientID, cityID: cityID, local_x: local_x ,localFrom:localFrom, local_y: local_y
        };
        $.ajax({
            async: true,
            type: "post",
            data: JSON.stringify(param),
            url: "/GzOnlineWork/getDepartment",
            contentType: "application/json"
        }).done(function (data) {
            $(".mobileSelect").remove();
            var departmentSelect = new MobileSelect({
                trigger: '#department',
                //title: '标题',
                wheels: [
                    {data: data}
                ],
                position: [0]//初始化定位
            });
            $("#permission").attr("data_id", "");
            $("#permission").text("请选择");
            $(".mobileSelect").addClass("mobileSelect-show");
        })
    });
    $("#permission,#permissionSelect").click(function () {
        var deptId = $("#department").attr("data_id");
        if (!deptId) {
            masktime("请先选择事项！");
            return;
        }
        var param = {
            deptId: deptId, randomKey: randomKey, userID: userID, clientID: clientID, cityID: cityID, local_x: local_x ,localFrom:localFrom, local_y: local_y
        };
        $.ajax({
            async: true,
            type: "post",
            data: JSON.stringify(param),
            url: "/GzOnlineWork/getPermission",
            contentType: "application/json"
        }).done(function (data) {
            $(".mobileSelect").remove();
            var permissionSelect = new MobileSelect({
                trigger: '#permission',
                //title: '标题',
                wheels: [
                    {data: data}
                ],
                position: [0]//初始化定位
            })
            $(".mobileSelect").addClass("mobileSelect-show");
        })
    })
    $("#createtime").click(function () {
        var time = new Date();
        var day = time.getDay();
        var AddDayCount;
        if (day == 3 || day == 4) {
            AddDayCount = 4
        } else {
            AddDayCount = 3
        }
        time.setDate(time.getDate() + AddDayCount);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;//获取当前月份的日期
        var d = time.getDate();
        var newDate = y + "-" + m + "-" + d;
        WdatePicker({minDate: newDate, el: this, dateFmt: 'yyyy-MM-dd', disabledDays: [0, 6]})
    })
    $("#reservation").click(function () {
        var areaid = $("#area").attr("data_id"),
            departmentid = $("#department").attr("data_id"),
            permissionitemId = $("#permission").attr("data_id"),
            createtime = $("#createtime").text();
        if (!areaid) {
            masktime("请选择区划！");
            return;
        } else if (!departmentid) {
            masktime("请选择部门！");
            return;
        } else if (!permissionitemId) {
            masktime("请选择事项！");
            return;
        } else if (!createtime || createtime == '请选择') {
            masktime("请选择预约日期！");
            return;
        }
        var param = {
            areaid: areaid, departmentid: departmentid, permissionitemId: permissionitemId,
            createtime: createtime, randomKey: randomKey, userID: userID, clientID: clientID,
            cityID: cityID, local_x: local_x ,localFrom:localFrom, local_y: local_y
        };
        $.ajax({
            async: true,
            type: "post",
            data: JSON.stringify(param),
            url: "/GzOnlineWork/reserve",
            contentType: "application/json"
        }).done(function (data) {
            if (data.retCode == "000000") {
                alert("预约成功")
            } else {
                alert("预约失败")
            }
        })
    });
    $("#myReservationPage").click(function () {
        window.location.href = "/GzOnlineWork?page=reservationRecord&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y +
            "&user_name=" + user_name + "&cardno=" + cardno + "&email=" + email + "&oldmobile=" + oldmobile
    });
    $("#back").click(function () {
        window.location.href = "/GzOnlineWork?page=GzOnlineWork&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y
    });
    function masktime(mgs) {
        $('#masktime').html(mgs);
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000);
        return
    }
})