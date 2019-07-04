$(function () {
    var search_result = [];
    var sParam = {
        "orderKey": "departtime",
        "orderType": "ASC",
        "departTimeRange": 0,
        "arriveTimeRange": 0,
        "trainType": 'QB'
    }, filterDatas;
    var queryConditions = {
        "departTimeRange": 0,
        "arriveTimeRange": 0,
        "trainType": 'QB'
    };
    $("#sellTime_city").val(window.sessionStorage.getItem('saleTimeQueryName'));
    $("#yupiao_fromStation").val(window.sessionStorage.getItem('departName'));
    $("#yupiao_toStation").val(window.sessionStorage.getItem('destinationName'));
    var RegResources = {
        xhReg: new RegExp("\\$\\{xh\\}", "g"),
        czmcReg: new RegExp("\\$\\{czmc\\}", "g"),
        qssjReg: new RegExp("\\$\\{qssj\\}", "g"),
        zmReg: new RegExp("\\$\\{zm\\}", "g"),
        dsReg: new RegExp("\\$\\{ds\\}", "g"),
        fsReg: new RegExp("\\$\\{fs\\}", "g"),
        tlReg: new RegExp("\\$\\{tl\\}", "g"),
        ccReg: new RegExp("\\$\\{cc\\}", "g"),
        cfsjReg: new RegExp("\\$\\{cfsj\\}", "g"),
        cfzReg: new RegExp("\\$\\{cfz\\}", "g"),
        lsReg: new RegExp("\\$\\{ls\\}", "g"),
        ddsjReg: new RegExp("\\$\\{ddsj\\}", "g"),
        ddzReg: new RegExp("\\$\\{ddz\\}", "g"),
        ed_numReg: new RegExp("\\$\\{ed_num\\}", "g"),
        yd_numReg: new RegExp("\\$\\{yd_num\\}", "g"),
        sw_numReg: new RegExp("\\$\\{sw_num\\}", "g"),
        yw_numReg: new RegExp("\\$\\{yw_num\\}", "g"),
        yz_numReg: new RegExp("\\$\\{yz_num\\}", "g"),
        rw_numReg: new RegExp("\\$\\{rw_num\\}", "g"),
        wz_numReg: new RegExp("\\$\\{wz_num\\}", "g")
    };
    if (window.location.href.indexOf("trainTimetable") != -1 || window.location.href.indexOf("trainYupiao") != -1) {
        getPreSaleDays()
    }
    /*if (citySRC) {
        $(".train_citySRC").attr("src", citySRC)
    } else {
        $(".train_citySRC").attr("src", "../images/banner.png")
    }*/
    $("#trainSellTime").click(function () {
        window.location.href = "/trainSellTime?randomKey=" + randomKey + "&userID=" + userID + "&citySRC=" + citySRC +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    $("#trainTimetable").click(function () {
        window.location.href = "/trainTimetable?randomKey=" + randomKey + "&userID=" + userID + "&citySRC=" + citySRC +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    $("#trainYupiao").click(function () {
        window.location.href = "/trainYupiao?randomKey=" + randomKey + "&userID=" + userID + "&citySRC=" + citySRC +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    // 选择车站页面跳转
    $("#sellTime_choiceStation").on("click", function () {
        window.sessionStorage.setItem('stationType', "depart");
        window.sessionStorage.setItem('stationJump', "saleTimeQuery");
        window.location.href = "/stationList?randomKey=" + randomKey + "&userID=" + userID + "&citySRC=" + citySRC +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    // 出发地选择
    $('#yupiao_depart').on('click', function () {
        window.sessionStorage.setItem('stationType', "depart");
        window.sessionStorage.setItem('stationJump', "queryTicket");
        //window.location.href="/stationList";
        window.location.href = "/stationList?randomKey=" + randomKey + "&userID=" + userID + "&citySRC=" + citySRC +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    // 目的地选择
    $('#yupiao_destination').on('click', function () {
        window.sessionStorage.setItem('stationType', "destination");
        window.sessionStorage.setItem('stationJump', "queryTicket");
        window.location.href = "/stationList?randomKey=" + randomKey + "&userID=" + userID + "&citySRC=" + citySRC +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });

    $("#timetable_ticketNo").val(window.sessionStorage.getItem("traninList"))
    // 选择乘车日期页面跳转
    $("#timetable_DateDiv").on("click", function () {
        window.sessionStorage.setItem('dateSelectType', "timetable");
        if ($("#timetable_ticketNo").val() != "请输入车次，如G101") {
            window.sessionStorage.setItem("traninList", $("#timetable_ticketNo").val());
            $("#timetable_ticketNo").val(window.sessionStorage.getItem("traninList"));
        } else {

        }
        window.location.href = "/timetable?randomKey=" + randomKey + "&userID=" + userID + "&citySRC=" + citySRC +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    $("#yupiao_DateDiv").on("click", function () {
        window.sessionStorage.setItem('dateSelectType', "yupiao");
        window.location.href = "/timetable?randomKey=" + randomKey + "&userID=" + userID + "&citySRC=" + citySRC +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    $("#timetable_date").val(window.sessionStorage.getItem('timetable'));
    $("#yupiao_trainDate").val(window.sessionStorage.getItem('yupiao'));
    //售票时间查询
    $("#sellTime_search").click(function () {
        if (!$("#sellTime_city").val().trim()) {
            masktime("请选择出发地！")
            return;
        }
        $("#sellTime_results_title").hide();
        $("#sellTime_results_div").hide();
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            stationName: $("#sellTime_city").val().trim()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/train/searchStartTime',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                var dataList = data.responseBody.data;
                var d = new Date(), str = '';
                str += d.getFullYear() + '年';
                str += d.getMonth() + 1 + '月';
                str += d.getDate() + '日';
                $("#sellTime_title_val").html("<span></span>" + str + "<label>" + "起售信息 " + dataList.length + " 条" + "</label>");
                var template = $("#sellTime_dataList_template").html(), html = "";
                $.each(dataList, function (index, item) {
                    html += template.replace(RegResources.xhReg, index + 1)
                        .replace(RegResources.czmcReg, item.name)
                        .replace(RegResources.qssjReg, item.value)
                });
                $("#sellTime_dataList").html(html);
                $("#sellTime_results_title").show();
                $("#sellTime_results_div").show();
            } else {
                masktime(data.responseBody.errorMsg || "查询结果为空！");
            }
        })
    });
    //火车时刻表查询
    $("#timetable_search").click(function () {
        if (!$("#timetable_ticketNo").val().trim()) {
            masktime("请输入车次！")
            return;
        } else if (!$("#timetable_date").val()) {
            masktime("请选择日期！")
            return;
        }
        $("#timetable_results_title").hide();
        $("#timetable_results_div").hide();
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            ticketNo: $("#timetable_ticketNo").val().toUpperCase().trim(),
            date: $("#timetable_date").val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/train/searchTime',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                var dataList = data.responseBody;
                if(dataList.length < 1){
                    masktime("没有查询到车次信息");
                    return;
                }
                dataList[0].arrive_time = "--"
                $("#timetable_ci_h").html("<span></span>" + dataList[0].station_train_code + "<label>" + $("#timetable_date").val() + "</label>");
                $("#timetable_sfsj").text(dataList[0].start_time);
                $("#timetable_sfz").text(dataList[0].start_station_name);
                $("#timetable_ci").text(dataList[0].station_train_code);
                $("#timetable_yxsc").text(dataList[dataList.length - 1].running_time);
                $("#timetable_dzsj").text(dataList[dataList.length - 1].arrive_time);
                $("#timetable_zdz").text(dataList[0].end_station_name);

                var template = $("#timetable_dataList_template").html(), html = "";
                $.each(dataList.splice(0, dataList.length), function (index, item) {
                    html += template.replace(RegResources.xhReg, item.station_no)
                        .replace(RegResources.zmReg, item.station_name)
                        .replace(RegResources.dsReg, item.arrive_time)
                        .replace(RegResources.fsReg, item.start_time)
                        .replace(RegResources.tlReg, item.stopover_time)
                });
                $("#timetable_dataList").html(html);
                $("#timetable_results_title").show();
                $("#timetable_results_div").show();
            } else {
                // alert(data.responseBody.errorMsg || "查询结果为空！");
                masktime(data.responseBody.errorMsg || "没有查询到车次信息！")
                return;
            }
        })
    });
    //余票查询
    $("#yupiao_search").click(function () {
        var departCode = window.sessionStorage.getItem('departCode'),
            destinationCode = window.sessionStorage.getItem('destinationCode');
        if (!$("#yupiao_fromStation").val() || !departCode) {
            masktime("请选择出发地！")
            return;
        } else if (!$("#yupiao_toStation").val() || !destinationCode) {
            masktime("请选择目的地！")
            return;
        } else if (!$("#yupiao_trainDate").val()) {
            masktime("请选择日期！")
            return;
        }
        $("#yupiao_results_title").hide();
        $("#yupiao_results_div").hide();
        $("#dialogMask,#dialog").show();
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            fromStation: $("#yupiao_fromStation").val(),
            departCode: departCode,//出发地code
            toStation: $("#yupiao_toStation").val(),
            destinationCode: destinationCode,//到达地code
            trainDate: $("#yupiao_trainDate").val(),
            purposeCodes: $("#yupiao_purposeCodes").is(':checked') == true ? "0X00" : "ADULT"
        };
        $.ajax({
            async: false,
            type: 'post',
            data: JSON.stringify(data),
            url: '/train/searchRemainTicket',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                var dataList = data.responseBody;
                if(checkLeftNewDTO(dataList)){
                    initDataInfo(search_result);
                    filterData();
                    $("#yupiao_trainCount").text("列车数量：" + search_result.length + "辆");
                    var template_G = $("#yupiao_results_template_G").html(),
                        template_other = $("#yupiao_results_template_other").html(),
                        html = "";
                    $.each(filterDatas, function (index, item) {
                        if (item.station_train_code.indexOf("G") == -1) {
                            html += template_other.replace(RegResources.ccReg, item.station_train_code)
                                .replace(RegResources.cfzReg, item.from_station_name)
                                .replace(RegResources.ddzReg, item.to_station_name)
                                .replace(RegResources.cfsjReg, item.start_time)
                                .replace(RegResources.ddsjReg, item.arrive_time)
                                .replace(RegResources.lsReg, item.lishi)
                                .replace(RegResources.sw_numReg, item.swz_num)
                                .replace(RegResources.yd_numReg, item.zy_num)
                                .replace(RegResources.ed_numReg, item.zy_num)
                                .replace(RegResources.rw_numReg, item.rw_num)
                                .replace(RegResources.yw_numReg, item.yw_num)
                                .replace(RegResources.yz_numReg, item.yz_num)
                                .replace(RegResources.wz_numReg, item.wz_num)
                        } else {
                            html += template_G.replace(RegResources.ccReg, item.station_train_code)
                                .replace(RegResources.cfzReg, item.from_station_name)
                                .replace(RegResources.ddzReg, item.to_station_name)
                                .replace(RegResources.cfsjReg, item.start_time)
                                .replace(RegResources.ddsjReg, item.arrive_time)
                                .replace(RegResources.lsReg, item.lishi)
                                .replace(RegResources.sw_numReg, item.swz_num)
                                .replace(RegResources.yd_numReg, item.zy_num)
                                .replace(RegResources.ed_numReg, item.zy_num)
                                .replace(RegResources.rw_numReg, item.rw_num)
                                .replace(RegResources.yw_numReg, item.yw_num)
                                .replace(RegResources.yz_numReg, item.yz_num)
                                .replace(RegResources.wz_numReg, item.wz_num)
                        }
                    });
                    $(".yupiao_G").hide();
                    $("#yupiao_results_title").show();
                    $("#yupiao_results_div").html(html).show();
                }else{
                    masktime("没有查询到余票信息");
                }


            } else {
                masktime(data.responseBody.errorMsg || "查询结果为空！");
            }
        })
    });
    $("#yupiao_all").click(function () {
        $(".yupiao_G,.yupiao_other").show();
    });
    $("#yupiao_G").click(function () {
        $(".yupiao_G").show();
        $(".yupiao_other").hide();
    });
    $("#yupiao_other").on("click", function () {
        $(".yupiao_G").hide();
        $(".yupiao_other").show();
    });
    $("#yupiao_switch").click(function () {
        var fromStation = $("#yupiao_fromStation").val(),
            toStation = $("#yupiao_toStation").val();
        $("#yupiao_fromStation").val(toStation);
        $("#yupiao_toStation").val(fromStation);
    });

    $(".icon-return").click(function () {
        window.location.href = "/train?randomKey=" + randomKey + "&userID=" + userID + "&citySRC=" + citySRC +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    });
    function getPreSaleDays() {
        // $.ajax({
        //     async: true,
        //     type: 'post',
        //     data: JSON.stringify({
        //         randomKey: randomKey,
        //         userID: userID,
        //         clientID: clientID,
        //         cityID: cityID,
        //         local_x: local_x ,localFrom:localFrom,
        //         local_y: local_y
        //     }),
        //     url: '/train/searchDate',
        //     contentType: 'application/json'
        // }).done(function (data) {
            var preSaleDays = 30;
        //     if (data.rtnCode == '000000') {
        //         preSaleDays = data.data.list.length - 1;
        //     } else {
        //         preSaleDays = 30;
        //     }
            window.sessionStorage.setItem('preSaleDays', preSaleDays);
        // })
    }

    function masktime(mgs) {
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };

    function checkLeftNewDTO(data) {
        if(data && data.httpstatus===200 && data.status === true){
            if(!isQueryLocal){
                data.data = fromStringToList(data.data.result,data.data.map);
            }
            if (data.data && data.data.length > 0) {
                $(".result-line").show();
                $(".result-filter").show();
                search_result = [];
                for (var i = 0; i < data.data.length; i++) {
                    search_result.push(data.data[i]);
                }
                return true;
            }
        }
        return false;
    };

    function fromStringToList(data,map){
        var list = [];
        for(var k =0 ; k <data.length; k++){
            var datas = data[k].split('|');
            var queryLeftNewDTO = {};
            queryLeftNewDTO['train_no'] = datas[2];
            queryLeftNewDTO['station_train_code'] = datas[3];
            queryLeftNewDTO['start_station_telecode'] = datas[4];
            queryLeftNewDTO['end_station_telecode'] = datas[5];
            queryLeftNewDTO['from_station_telecode'] = datas[6];
            queryLeftNewDTO['to_station_telecode'] = datas[7];
            queryLeftNewDTO['start_time'] = datas[8];
            queryLeftNewDTO['arrive_time'] = datas[9];
            queryLeftNewDTO['lishi'] = datas[10];
            queryLeftNewDTO['canWebBuy'] = datas[11];
            queryLeftNewDTO['yp_info'] = datas[12];
            queryLeftNewDTO['start_train_date'] = datas[13];
            queryLeftNewDTO['train_seat_feature'] = datas[14];
            queryLeftNewDTO['location_code'] = datas[15];
            queryLeftNewDTO['from_station_no'] = datas[16];
            queryLeftNewDTO['to_station_no'] = datas[17];
            queryLeftNewDTO['is_support_card'] = datas[18];
            queryLeftNewDTO['controlled_train_flag'] = datas[19];
            queryLeftNewDTO['gg_num'] = datas[20] ? datas[20] : '--';
            queryLeftNewDTO['gr_num'] = datas[21] ? datas[21] : '--';
            queryLeftNewDTO['qt_num'] = datas[22] ? datas[22] : '--';
            queryLeftNewDTO['rw_num'] = datas[23] ? datas[23] : '--';
            queryLeftNewDTO['rz_num'] = datas[24] ? datas[24] : '--';
            queryLeftNewDTO['tz_num'] = datas[25] ? datas[25] : '--';
            queryLeftNewDTO['wz_num'] = datas[26] ? datas[26] : '--';
            queryLeftNewDTO['yb_num'] = datas[27] ? datas[27] : '--';
            queryLeftNewDTO['yw_num'] = datas[28] ? datas[28] : '--';
            queryLeftNewDTO['yz_num'] = datas[29] ? datas[29] : '--';
            queryLeftNewDTO['ze_num'] = datas[30] ? datas[30] : '--';
            queryLeftNewDTO['zy_num'] = datas[31] ? datas[31] : '--';
            queryLeftNewDTO['swz_num'] = datas[32] ? datas[32] : '--';
            queryLeftNewDTO['srrb_num'] = datas[33] ? datas[33] : '--';
            queryLeftNewDTO['yp_ex'] = datas[34];
            queryLeftNewDTO['seat_types'] = datas[35];
            queryLeftNewDTO['exchange_train_flag'] = datas[36];
            queryLeftNewDTO['houbu_train_flag'] = datas[37];
            queryLeftNewDTO['from_station_name'] = map[datas[6]];
            queryLeftNewDTO['to_station_name'] = map[datas[7]];
            list.push(queryLeftNewDTO);
        }
        return list;
    };

    function initDataInfo(datas) {
        for (var i = 0; i < datas.length; i++) {
            if (typeof datas[i].queryLeftNewDTO !== "undefined") {
                datas[i] = datas[i].queryLeftNewDTO;
            }
            datas[i].istart_time = datas[i].start_time.replace(':', '') * 1;
            datas[i].iarrive_time = datas[i].arrive_time.replace(':', '') * 1;
            datas[i].cost_time = datas[i].lishi.replace(':', '') * 1;
            datas[i].train_type = KYFW.getTrainType(datas[i].station_train_code);
            datas[i].start_time_type = KYFW.GetDayRangeType(datas[i].start_time);
            datas[i].arrive_time_type = KYFW.GetDayRangeType(datas[i].arrive_time);
        }
    };

    function filterData() {
        filterDatas = [];
        var trainTypes = sParam.trainType.split(',');
        for (var i = 0; i < search_result.length; i++) {
            var data = search_result[i],
                ckTT = sParam.trainType == KYFW.traintype_qb || sParam.trainType == '' || inArr(data.train_type, trainTypes),
                ckDT = filterDepartTime(data.start_time_type),
                ckAT = filterArriveTime(data.arrive_time_type);
            if (ckTT && ckDT && ckAT) {
                filterDatas.push(data);
            }
        }
    };
    function filterDepartTime(dt) {
        if (sParam.departTimeRange == 0) {
            return true;
        }
        if (dt == (sParam.departTimeRange & dt)) {
            return true;
        }
        return false;
    };
    function filterArriveTime(at) {
        if (sParam.arriveTimeRange == 0) {
            return true;
        }
        if (at == (sParam.arriveTimeRange & at)) {
            return true;
        }
        return false;
    }
    function isQueryLocal(){
        $("#dialogMask,#dialog").show();
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify({
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y
            }),
            url: '/train/isQueryLocal',
            contentType: 'application/json'
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                var data=data.responseBody.data;
                data_today = data.today;
                data_weak = data.weak;
                data_xsysq_count=data.xsysq_count;
                data_ysq_count=data.ysq_count;
                hlwlptysq=data.hlwlptysq;
                spjlptysq=data.spjlptysq;
                isQueryLocal = data.isQueryLocal;
            }
        })
    }
    isQueryLocal()

});
