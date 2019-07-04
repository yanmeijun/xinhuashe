/**
 * By default DataTables only uses the sAjaxSource variable at initialisation
 * time, however it can be useful to re-read an Ajax source and have the table
 * update. Typically you would need to use the `fnClearTable()` and
 * `fnAddData()` functions, however this wraps it all up in a single function
 * call.
 *
 * DataTables 1.10 provides the `dt-api ajax.url()` and `dt-api ajax.reload()`
 * methods, built-in, to give the same functionality as this plug-in. As such
 * this method is marked deprecated, but is available for use with legacy
 * version of DataTables. Please use the new API if you are used DataTables 1.10
 * or newer.
 *
 *  @name fnReloadAjax
 *  @summary Reload the table's data from the Ajax source
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *  @deprecated
 *
 *  @param {string} [sNewSource] URL to get the data from. If not give, the
 *    previously used URL is used.
 *  @param {function} [fnCallback] Callback that is executed when the table has
 *    redrawn with the new data
 *  @param {boolean} [bStandingRedraw=false] Standing redraw (don't changing the
 *      paging)
 *
 *  @example
 *    var table = $('#example').dataTable();
 *
 *    // Example call to load a new file
 *    table.fnReloadAjax( 'media/examples_support/json_source2.txt' );
 *
 *    // Example call to reload from original file
 *    table.fnReloadAjax();
 */

jQuery.fn.dataTableExt.oApi.fnReloadAjax = function (oSettings, sNewSource, fnCallback, bStandingRedraw) {
    // DataTables 1.10 compatibility - if 1.10 then `versionCheck` exists.
    // 1.10's API has ajax reloading built in, so we use those abilities
    // directly.
    if (jQuery.fn.dataTable.versionCheck) {
        var api = new jQuery.fn.dataTable.Api(oSettings);

        if (sNewSource) {
            api.ajax.url(sNewSource).load(fnCallback, !bStandingRedraw);
        } else {
            api.ajax.reload(fnCallback, !bStandingRedraw);
        }
        return;
    }

    if (sNewSource !== undefined && sNewSource !== null) {
        oSettings.sAjaxSource = sNewSource;
    }

    // Server-side processing should just call fnDraw
    if (oSettings.oFeatures.bServerSide) {
        this.fnDraw();
        return;
    }

    this.oApi._fnProcessingDisplay(oSettings, true);
    var that = this;
    var iStart = oSettings._iDisplayStart;
    var aData = [];

    this.oApi._fnServerParams(oSettings, aData);

    oSettings.fnServerData.call(oSettings.oInstance, oSettings.sAjaxSource, aData, function (json) {
        /* Clear the old information from the table */
        that.oApi._fnClearTable(oSettings);

        /* Got the data - add it to the table */
        var aData = (oSettings.sAjaxDataProp !== "") ?
            that.oApi._fnGetObjectDataFn(oSettings.sAjaxDataProp)(json) : json;

        for (var i = 0; i < aData.length; i++) {
            that.oApi._fnAddData(oSettings, aData[i]);
        }

        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

        that.fnDraw();

        if (bStandingRedraw === true) {
            oSettings._iDisplayStart = iStart;
            that.oApi._fnCalculateEnd(oSettings);
            that.fnDraw(false);
        }

        that.oApi._fnProcessingDisplay(oSettings, false);

        /* Callback user function - for event handlers etc */
        if (typeof fnCallback == 'function' && fnCallback !== null) {
            fnCallback(oSettings);
        }
    }, oSettings);
};
var oCache = {
    iCacheLower: -1
};
function fnDataTablesPipeline(sSource, aoData, fnCallback, oSettings) {
    var iPipe = 1;
    var bNeedServer = false;
    var sEcho = fnGetKey(aoData, "sEcho");
    var iRequestStart = fnGetKey(aoData, "iDisplayStart");
    var iRequestLength = fnGetKey(aoData, "iDisplayLength");
    var iRequestEnd = iRequestStart + iRequestLength;
    oCache.iDisplayStart = iRequestStart;

    var flag = false,
        $active,
        active = "";
    if (oSettings.sInstance == "tenantMonitorManager") {
        var $status = $("[id^='monitor_'][checked='checked']");
        flag = $status.length >= 0;
        var status = "";
        if ($("#checkAllMonitor").attr("checked") == 'checked') {
            status += $("#checkAllMonitor").val() + ",";
        }
        $status.each(function () {
            status += $(this).val() + ",";
        });
        aoData.push({name: "status", value: status.substring(0, status.length - 1)});
    } else if (oSettings.sInstance == "tenantRemoveManager") {
        flag = true;
    } else if (oSettings.sInstance == "tenantManager") {
        $active = $("[id^='tenants_filter_'][checked='checked']");
        flag = $active.length >= 0;
        $active.each(function () {
            active += $(this).val() + ",";
        });
        aoData.push({name: "status", value: active.substring(0, active.length - 1)},
            {name: "startDate", value: $("#start_date").val()},
            {name: "endDate", value: $("#end_date").val()});
    } else if (oSettings.sInstance == "tenantUseSituationManager") {
        $active = $("[id^='filter_'][checked='checked']");
        flag = $active.length >= 0;
        $active.each(function () {
            active += $(this).val() + ",";
        });
        aoData.push({name: "status", value: active.substring(0, active.length - 1)});
    }

    /* outside pipeline? */
    if (oCache.iCacheLower < 0 || iRequestStart < oCache.iCacheLower || iRequestEnd > oCache.iCacheUpper || flag) {
        bNeedServer = true;
    }

    /* sorting etc changed? */
    if (oCache.lastRequest && !bNeedServer) {
        for (var i = 0, iLen = aoData.length; i < iLen; i++) {
            if (aoData[i].name != "iDisplayStart" && aoData[i].name != "iDisplayLength" && aoData[i].name != "sEcho") {
                if (aoData[i].value != oCache.lastRequest[i].value) {
                    bNeedServer = true;
                    break;
                }
            }
        }
    }

    /* Store the request for checking next time around */
    oCache.lastRequest = aoData.slice();

    if (bNeedServer) {
        if (iRequestStart < oCache.iCacheLower) {
            iRequestStart = iRequestStart - (iRequestLength * (iPipe - 1));
            if (iRequestStart < 0) {
                iRequestStart = 0;
            }
        }

        oCache.iCacheLower = iRequestStart;
        oCache.iCacheUpper = iRequestStart + (iRequestLength * iPipe);
        oCache.iDisplayLength = fnGetKey(aoData, "iDisplayLength");
        fnSetKey(aoData, "iDisplayStart", iRequestStart);
        fnSetKey(aoData, "iDisplayLength", iRequestLength * iPipe);

        var pos = (iRequestStart / iRequestLength + 1) > 1 ? (iRequestStart / iRequestLength + 1) : 1;
        aoData.push({name: "size", value: (iRequestLength)});
        aoData.push({name: "pos", value: pos});

        oSettings.jqXHR = $.getJSON(sSource, aoData, function (json) {
            /* Callback processing */
            json["items"]=json.items||json.rows;
            oCache.lastJson = jQuery.extend(true, {}, json);

            if (oCache.iCacheLower != oCache.iDisplayStart) {
                json.items.splice(0, oCache.iDisplayStart - oCache.iCacheLower);
            }
            json.items.splice(oCache.iDisplayLength, json.items.length);

            fnCallback(json);
        });
    } else {
        var json = jQuery.extend(true, {}, oCache.lastJson);
        json.sEcho = sEcho;
        /* Update the echo for each response */
        json.items.splice(0, iRequestStart - oCache.iCacheLower);
        json.items.splice(iRequestLength, json.items.length);
        fnCallback(json);
    }
}

function fnSetKey(aoData, sKey, mValue) {
    for (var i = 0, iLen = aoData.length; i < iLen; i++) {
        if (aoData[i].name == sKey) {
            aoData[i].value = mValue;
        }
    }
}

function fnGetKey(aoData, sKey) {
    for (var i = 0, iLen = aoData.length; i < iLen; i++) {
        if (aoData[i].name == sKey) {
            return aoData[i].value;
        }
    }
    return null;
}

function getDate(data) {
    var timearray = data.split("T");
    var nyr = timearray[0];
    var tsfm = timearray[1].substr(0, 5);
    var ts = eval(tsfm.split(":")[0] - 0 + 8) + "";
    var tf = tsfm.split(":")[1];
    if (ts.length < 2) {
        ts = "0" + ts;
    }
    if (tf.length < 2) {
        tf = "0" + tf;
    }
    var sfm = ts + ":" + tf;
    return nyr + " " + sfm;
}