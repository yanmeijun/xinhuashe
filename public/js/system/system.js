$(function () {
    var i = 1, serviceID;
    var fwTableRule = {
        "sDom": '<"top"T<"clear">>frt<"toolbar">lip',
        "bDestroy": true,
        "bFilter": false,
        "bAutoWidth": true,
        "bDeferRender": true,
        "bJQueryUI": false,
        "sPaginationType": "full_numbers",
        "iDisplayLength": 5,
        // "oTableTools": {
        //     "sSwfPath": "/lib/tableTools/media/swf/copy_csv_xls_pdf.swf",
        //     "sRowSelect": "single",      //可选中行，single单行。multi多行
        //     "aButtons": []
        // },
        "fnInitComplete": function () {
        },
        "footerCallback": function (row, data, start, end, display) {

        },
        "oLanguage": {
            "sSearch": "查询:",
            "sLengthMenu": '本页显示 <select id="usagesLength">' +
                '<option value="5">5</option>' +
                '<option value="10">10</option>' +
                '<option value="25">25</option>' +
                '<option value="50">50</option>' +
                '</select> ',
            "oPaginate": {
                "sFirst": "首页",
                "sLast": "尾页",
                "sNext": "下一页",
                "sPrevious": "上一页"
            },
            "sInfo": "共 _TOTAL_ 条记录",
            "sProcessing": "正在加载中......",
            // "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
            // "sInfoEmpty": "共 0 条记录",
            "sZeroRecords": "没有要显示的数据！"
        },
        "bProcessing": true,
        "bInfo": true,
        "bPaginate": true,
        "bRetrieve": true,
        "bServerSide": true,
        "sAjaxSource": "/system/getAllService",
        "fnPreDrawCallback": function () {
        },
        "fnDrawCallback": function () {
        },
        "sAjaxDataProp": function (data) {
            $("#usagesLength").append("<option value='" + data.totalRecords + "'>全部</option>");
            return data.items;
        },
        "aoColumns": [
            {
                "mDataProp": "serviceID",
                "sWidth": 80,
                "sClass": "center",
                "render": function (data, type, row) {
                    serviceID = data;
                    return '<span id="fw_serviceID_' + serviceID + '" >' + data + '</span>';
                }
            },
            {
                "mDataProp": "serviceName",
                "sWidth": 100,
                "render": function (data) {
                    return '<span id="fw_serviceName_' + serviceID + '" >' + data + '</span>'
                }
            },
            {
                "mDataProp": "url",
                "sWidth": 80,
                "sClass": "center",
                "render": function (data, type, row) {
                    return '<span id="fw_url_' + serviceID + '" >' + data + '</span>';
                }
            },
            {
                "mDataProp": "summary",
                "sWidth": 80,
                "sClass": "center",
                "render": function (data, type, row) {
                    return '<span id="fw_summary_' + serviceID + '" >' + data + '</span>';
                }
            },
            {
                "mDataProp": "logo",
                "sWidth": 80,
                "sClass": "center",
                "render": function (data, type, row) {
                    return '<span id="fw_logo_' + serviceID + '" >' + data + '</span>';
                }
            },
            {
                "mDataProp": "city",
                "sWidth": 80,
                "sClass": "center",
                "render": function (data, type, row) {
                    return '<span id="fw_city_' + serviceID + '" >' + data + '</span>';
                }
            },
            {
                "mDataProp": "index",
                "sWidth": 80,
                "sClass": "center",
                "render": function (data, type, row) {
                    return '<span id="fw_index_' + serviceID + '" >' + data + '</span>';
                }
            },
            {
                "mDataProp": "online",
                "sWidth": 80,
                "sClass": "center",
                "render": function (data, type, row) {
                    return '<span id="fw_online_' + serviceID + '" >' + data + '</span>';
                }
            },
            {
                "mDataProp": "action",
                "sWidth": 80,
                "sClass": "center",
                "render": function () {
                    return '<a id="fw_modify_' + serviceID + '" href="javascript:;">修改 </a>' +
                        '<a id="fw_delete_' + serviceID + '" href="javascript:;">删除</a>';
                }
            }
        ],
        "fnServerData": fnDataTablesPipeline
    }
    var userID, mobile, clientID;
    var userTableRule = {
        // "sDom": '<"top"T<"clear">>frt<"toolbar">lip',
        // "bDestroy": true,
        // "bFilter": false,
        // "bAutoWidth": false,
        // "bDeferRender": true,
        // "bJQueryUI": false,
        // "sPaginationType": "full_numbers",
        // "iDisplayLength": 5,
        // "fnInitComplete": function () {
        // },
        // "footerCallback": function (row, data, start, end, display) {
        //
        // },
        // "oLanguage": {
        //     "sSearch": "查询:",
        //     "sLengthMenu": '本页显示 <select id="usagesLength">' +
        //     '<option value="5">5</option>' +
        //     '<option value="10">10</option>' +
        //     '<option value="25">25</option>' +
        //     '<option value="50">50</option>' +
        //     '</select> ',
        //     "oPaginate": {
        //         "sFirst": "首页",
        //         "sLast": "尾页",
        //         "sNext": "下一页",
        //         "sPrevious": "上一页"
        //     },
        //     "sInfo": "共 _TOTAL_ 条记录",
        //     "sProcessing": "正在加载中......",
        //     "sZeroRecords": "没有要显示的数据！"
        // },
        // "bProcessing": true,
        // "bInfo": true,
        // "bPaginate": true,
        // "bRetrieve": true,
        // "bServerSide": true,
        // "sAjaxSource": "/system/getAllUser",
        // "fnPreDrawCallback":function(){
        // },
        // "fnDrawCallback": function () {
        // },
        // "sAjaxDataProp": function (data) {
        //     $("#usagesLength").append("<option value='" + data.totalRecords + "'>全部</option>");
        //     return data.items;
        // },
        // "aoColumns": [
        //     {
        //         "mDataProp": "userID",
        //         "sWidth": 80,
        //         "sClass": "center",
        //         "render": function (data, type, row) {
        //             userID = data;
        //             return '<span id="user_userID_'+userID+'" >'+data+'</span>';
        //         }
        //     },
        //     {
        //         "mDataProp": "mobile",
        //         "sWidth": 100,
        //         "render": function (data) {
        //             mobile = data;
        //             return '<span id="user_mobile_'+userID+'" >'+data+'</span>'
        //         }
        //     },
        //     {
        //         "mDataProp": "clientID",
        //         "sWidth": 100,
        //         "render": function (data) {
        //             clientID = data
        //             return '<span id="user_clientID_'+userID+'" >'+data+'</span>'
        //         }
        //     },
        //     {
        //         "mDataProp": "action",
        //         "sWidth": 100,
        //         "sClass": "center",
        //         "render": function () {
        //             return '<a id="userInfo_'+userID+'" href="/system/getUser?userID='+userID+"&mobile="+mobile+"&clientID="+clientID+'">详情</a>'
        //         }
        //     }
        // ],
        // "fnServerData": fnDataTablesPipeline
    }
    var $fw_table = $("#fw_table").dataTable(fwTableRule);
    var $user_table = $("#user_table").dataTable(userTableRule);
    $fw_table.dataTable();
    // $user_table.dataTable();
    $("#fw_add").click(function () {
        // $("#main").hide()
        $("#modify_mask").show()
        $("#create_new_fw").show()
    });
    $("#create_fw").click(function () {
        var data = {
            name: $("#create_fw_name").val(),
            ID: $("#create_fw_id").val(),
            logo: $("#create_fw_logo").val(),
            url: $("#create_fw_url").val(),
            summary: $("#create_fw_summary").val(),
            city: $("#create_fw_city").val(),
            index: $("#create_index_city").val(),
            online: $("#create_online").val() == "true" ? true : false
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            dataType: "json",
            url: '/system/addService',
            contentType: 'application/json'
        }).always(function () {
            $.ajax({
                async: true,
                type: 'get',
                data: JSON.stringify(data),
                dataType: "json",
                url: '/system/getAllService',
                contentType: 'application/json'
            }).done(function (data) {
                $fw_table.fnClearTable();
                // $fw_table.fnDestroy();
                $fw_table.fnAddData(data.items);
                $("#create_new_fw").hide()
                $("#modify_mask").hide()
                // $("#main").show()
                // $("#fw_table").dataTable(fwTableRule);
            })
        })
    });
    $("#create_fw_close").click(function () {
        // $("#main").show()
        $("#create_new_fw").hide()
        $("#modify_mask").hide()
    });

    $(document).on("click", "a[id^='fw_delete_']", function () {
        var id = $(this).attr("id").replace("fw_delete_", "");
        var data = {
            id: id
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            dataType: "json",
            url: '/system/deleteService',
            contentType: 'application/json'
        }).always(function () {
            alert("删除成功！")
            // $('#fw_table').dataTable().fnClearTable(true)
            $fw_table.fnClearTable(true)
            $('#fw_table').dataTable().api().ajax.reload()
            // $('#fw_table').dataTable().fnReloadAjax()
            // $.ajax({
            //     async: true,
            //     type: 'get',
            //     data: JSON.stringify(data),
            //     dataType:"json",
            //     url: '/getAllService',
            //     contentType: 'application/json'
            // }).done(function(data){
            //     $fw_table.fnClearTable();
            //     // $fw_table.fnDestroy();
            //     $fw_table.fnDraw();
            //     $fw_table.fnAddData(data.items);
            // // $("#fw_table").dataTable(fwTableRule);
            // })
        })
    });
    var modify_id;
    $(document).on("click", "a[id^='fw_modify_']", function () {
        modify_id = $(this).attr("id").replace("fw_modify_", "");
        $("#fw_serviceName").val($("#fw_serviceName_" + modify_id).text())
        $("#fw_serviceID").val($("#fw_serviceID_" + modify_id).text())
        $("#fw_logo").val($("#fw_logo_" + modify_id).text())
        $("#fw_url").val($("#fw_url_" + modify_id).text())
        $("#fw_summary").val($("#fw_summary_" + modify_id).text())
        $("#fw_city").val($("#fw_city_" + modify_id).text())
        $("#fw_index").val($("#fw_index_" + modify_id).text())
        $("#fw_online").val($("#fw_online_" + modify_id).text()) == "true" ? true : false
        $("#modify_mask").show();
        $("#fw_modify_div").show()
    })
    $("#modify_cancel").click(function () {
        $("#modify_mask").hide();
        $("#fw_modify_div").hide()
    })
    $("#fw_modify").click(function () {
        var data = {
            name: $("#fw_serviceName").val(),
            ID: $("#fw_serviceID").val(),
            logo: $("#fw_logo").val(),
            url: $("#fw_url").val(),
            summary: $("#fw_summary").val(),
            city: $("#fw_city").val(),
            index: $("#fw_index").val(),
            online: $("#fw_online").val() == "true" ? true : false
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            dataType: "json",
            url: '/system/modifyService',
            contentType: 'application/json'
        }).done(function () {
            $("#modify_mask").hide();
            $("#fw_modify_div").hide()
        })

    })
});
