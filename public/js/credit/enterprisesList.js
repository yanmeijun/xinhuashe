var encrysrc = localStorage.getItem("encryStr");//记录号，接口3详情所需参数
var encryname = localStorage.getItem("encryname");
$(function () {
    $('#dialogMask,#dialog').show();
    getProblemEntDetail()//页面初始化执行
})

// 点击返回按钮
$('#back').on('click', function () {
    var url = "/credit?page=enterprise&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
})
$('.q-r-tit').on("click", function () {
    if ($(this).hasClass("down")) {
        $(this).removeClass("down");
        $(this).find('img').attr("src", "/images/credit/icon-upMenu.png");
        $(this).parent().parent().find(".tab-content").hide();
    } else {
        $(this).addClass("down");
        $(this).find('img').attr("src", "/images/icon-downMenu.png");
        $(this).parent().parent().find(".tab-content").show();
    }
})
function getProblemEntDetail() {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        encryStr: encrysrc,
        name: encryname
    }
    $.ajax({
        async: "true",
        type: "post",
        url: "/credit/getProblemEntDetails",
        data: JSON.stringify(parameters),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                $('#companyName').html(data.responseBody.entName);
                if (data.responseBody.entstatus == "1") {
                    $('#companyStatus').html("在营");//gsdqzt
                } else {
                    $('#companyStatus').html("吊销");//gsdqzt
                }

                document.title = data.responseBody.entName;
                // 公司详细介绍
                var html = '';
                if (data.responseBody.creditCode) {
                    html += '<div class="text-list-div clearfix">' +
                        '<label>统一社会信用代码：</label>' +
                        '<span >' + data.responseBody.creditCode + '</span>' +
                        '</div>';
                } else {
                    html += '<div class="text-list-div clearfix">' +
                        '<label>统一社会信用代码：</label>' +
                        '<span > —  —</span>' +
                        '</div>';
                }
                if (data.responseBody.address == "") {
                    html += '<div class="text-list-div clearfix">' +
                        '<label>地址：</label>' +
                        '<span>无</span>' +
                        '</div>';
                } else {
                    html += '<div class="text-list-div clearfix">' +
                        '<label>地址：</label>' +
                        '<span>' + data.responseBody.address + '</span>' +
                        '</div>';
                }
                html += '<div class="text-list-div clearfix">' +
                    '<label>报告参看时间：</label>' +
                    '<span>' + data.responseBody.timestatmp + '</span>' +
                    '</div>';
                $('#companyInfo').html(html);

                /*
                 * 信息概览
                 */
                companyList(data.responseBody.xxgl)//

                /*
                 *行政许可
                 */
                companyLicense(data.responseBody.xzxklist)
                /*
                 *行政处罚
                 */
                companyPunish(data.responseBody.xzcflist)
                /*
                 *守信红名单
                 */
                companyRedList(data.responseBody.hmdlist)
                /*
                 *重点关注名称
                 */
                companyKeyList(data.responseBody.zdgzlist)
                /*
                 *黑名单
                 */
                // var hmd2=data.data.hmd_2;
                // var hmd1=data.data.hmd_1;
                // var hmd=data.data.hmd;
                // var arr=[];
                // if(hmd!=0){
                //     $.each(hmd,function(index,val){
                //         arr.push(val)
                //     })
                // }
                // if(hmd1!=0){
                //     $.each(hmd1,function(index,val){
                //         arr.push(val)
                //     })
                // }
                // if(hmd2!=0){
                //     $.each(hmd2,function(index,val){
                //         arr.push(val)
                //     })
                // }
                companyBlackList(data.responseBody.blacklist)

            } else {
                masktime("网络超时，请稍后");
                return
            }

        },
        error: function () {
            console.log("axr error")
        }
    })
}
function companyList(data) {
    var html = '';
    $.each(data, function (index, val) {
        html += '<div class="tab-content companyListBox" >' +
            '<div class="text-list-div clearfix">' +
            '<label>工商注册号：</label>' +
            '<span>' + val.regno + '</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '<label>法人信息：</label>' +
            '<span>' + val.legalPerson + '</span>' +
            '</div>';
        if (val.esdate) {
            html += '<div class="text-list-div clearfix">' +
                '<label>成立日期：</label>' +
                '<span>' + val.esdate + '</span>' +
                '</div>';
        }
        if (val.enttype) {
            html += '<div class="text-list-div clearfix">' +
                '<label>企业类型：</label>' +
                '<span>' + val.enttype + '</span>' +
                '</div>';
        }
        if (val.regorg) {
            html += '<div class="text-list-div clearfix">' +
                '<label>登记机关：</label>' +
                '<span>' + val.regorg + '</span>' +
                '</div>';
        }
        html += '</div>';
    })
    $('#companyListBox').html(html);
}


function companyLicense(data) {
    $('#licHot').html(data.xzxk.length);
    var html = "";
    if (data.xzxk != null && data.xzxk.length != 0) {
        $.each(data.xzxk, function (index, val) {
            html += '<div class="tab-content ListLineBox" style="display:none;">' +
                '<div class="text-list-div clearfix">' +
                '<label>行政许可决定书文号：</label>' +
                '<span>' + val.xkWsh + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>审核类型：</label>' +
                '<span>' + val.xkSplb + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>法人代表人姓名：</label>' +
                '<span>' + val.xkFr + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>内容许可：</label>' +
                '<span>' + val.xkNr + '</span>' +
                '</div>';
            if (val.xkYxq) {
                html += '<div class="text-list-div clearfix">' +
                    '<label>许可有效期：</label>' +
                    '<span>' + val.xkYxq + '</span>' +
                    '</div>';
            } else {
                html += '<div class="text-list-div clearfix">' +
                    '<label>许可有效期：</label>' +
                    '<span>— —</span>' +
                    '</div>';
            }
            html += '<div class="text-list-div clearfix">' +
                '<label>许可决定日期：</label>' +
                '<span>' + val.xkJdrq + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>许可截止日期：</label>' +
                '<span>' + val.xkJzq + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>地方编码：</label>' +
                '<span>' + val.xkDfbm + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>许可机关：</label>' +
                '<span>' + val.xkXzjg + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>数据更新时间：</label>' +
                '<span>' + val.xkSjc + '</span>' +
                '</div>' +
                '</div>';
        })
    } else {
        html += '<div class="tab-content ListLineBox noData" style="display: none">' +
            '<div class="text-list-div clearfix">' +
            '<p class="credit-txt">企业没有相关记录</p>' +
            '</div>' +
            '</div>';
    }
    $('#license').html(html)

}


function companyPunish(data) {
    $('#punHot').html(data.xzcf.length);
    var html = "";
    if (data.xzcf != null && data.xzcf.length != 0) {
        $.each(data.xzcf, function (index, val) {
            html += '<div class="tab-content ListLineBox" style="display: none">' +
                '<div class="text-list-div clearfix">' +
                '<label>决定书问号：</label>' +
                '<span>' + val.cfWsh + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>处罚名称：</label>' +
                '<span>' + val.cfCfmc + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>法人代表人姓名：</label>' +
                '<span>' + val.cfFr + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>处罚类别：</label>' +
                '<span>' + val.cfCflb1 + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>处罚结果：</label>' +
                '<span>' + val.cfJg + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>处罚事由：</label>' +
                '<span>' + val.cfSy + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>处罚依据：</label>' +
                '<span>' + val.cfYj + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>处罚机关：</label>' +
                '<span>' + val.cfXzjg + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>处罚决定日期：</label>' +
                '<span>' + val.cfJdrq + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>处罚期限：</label>' +
                '<span>' + val.cfQx + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>数据更新时间：</label>' +
                '<span>' + val.cfSjc + '</span>' +
                '</div>'
            '</div>';
        })
    } else {
        html += '<div class="tab-content ListLineBox noData" style="display: none">' +
            '<div class="text-list-div clearfix">' +
            '<p class="credit-txt">企业没有相关记录</p>' +
            '</div>' +
            '</div>';
    }
    $('#Punish').html(html)
}
/*输入不正确的查询语句提示语*/
function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
}

function companyRedList(data) {
    $('#redHot').html(data.hmdnum);
    var html = "";
    if (data.hmd != null && data.hmd.length != 0) {
        $.each(data, function (index, val) {
            html += '<div class="tab-content blacklist ListLineBox" style="display: none">' +
                '<div class="abnormal-list abnor-list abnorBg">A级纳税人</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>数据来源：</label>' +
                '<span>' + val.sjly + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>案号：</label>' +
                '<span>' + val.xh + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>纳税人名称：</label>' +
                '<span class="color-fa6e08">' + val.nsrmc + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>评价年度：</label>' +
                '<span>' + val.pjnd + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>最新更新日期：</label>' +
                '<span>' + val.zxgxrq + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>文件名：</label>' +
                '<span>' + val.wjm + '</span>' +
                '</div>' +
                '</div>';
        })
    } else {
        html += '<div class="tab-content ListLineBox noData" style="display: none">' +
            '<div class="text-list-div clearfix">' +
            '<p class="credit-txt">企业没有相关记录</p>' +
            '</div>' +
            '</div>';
    }
    $('#RedList').html(html)
}


function companyKeyList(data) {
    $('#keyHot').html(data.zdgznum);
    var html = "";
    if (data.zdgz != null && data.zdgz.length != 0) {
        var arr = [];
        for (var i = 0; i < data.zdgz.length; i++) {
            var weebArr = {};
            var zdgzSum = []
            $.each(data.zdgz[i], function (index, val) {
                zdgzSum.push(val)
            });
            weebArr.zch = zdgzSum[0];
            weebArr.fddbr = zdgzSum[1];
            weebArr.lxmc = zdgzSum[2];
            weebArr.gxrq = zdgzSum[3];
            weebArr.jgmc = zdgzSum[4];
            weebArr.sjly = zdgzSum[5];
            weebArr.slrq = zdgzSum[6];
            weebArr.qymc = zdgzSum[7];
            weebArr.sjlb = zdgzSum[8];
            arr.push(weebArr)
        }
        $.each(arr, function (index, val) {
            html += '<div class="tab-content blacklist ListLineBox" style="display: none">' +
                '<div class="abnormal-list">' + val.sjlb + '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>数据来源：</label>' +
                '<span>' + val.sjly + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>企业名称：</label>' +
                '<span>' + val.qymc + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>注册号：</label>' +
                '<span>' + val.zch + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>法定代表人：</label>' +
                '<span>' + val.fddbr + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>列入经营异常名录原因以及类型：</label>' +
                '<span class="color-fa6e08">' + val.lxmc + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>设立日期：</label>' +
                '<span>' + val.slrq + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>列入决定机关名称：</label>' +
                '<span>' + val.jgmc + '</span>' +
                '</div>' +
                '<div class="text-list-div clearfix">' +
                '<label>最后更新日期：</label>' +
                '<span>' + val.gxrq + '</span>' +
                '</div>' +
                '</div>';
        })
    } else {
        html += '<div class="tab-content ListLineBox noData" style="display: none">' +
            '<div class="text-list-div clearfix">' +
            '<p class="credit-txt">企业没有相关记录</p>' +
            '</div>' +
            '</div>';
    }
    $('#KeyList').html(html)
}


function companyBlackList(data) {
    $('#blackHot').html(data.blacknum);
    var html = "";
    if (data.black != null && data.black.length != 0) {
        var arr = [];
        for (var i = 0; i < data.black.length; i++) {
            var weebArr = {};
            var zdgzSum = []
            $.each(data.black[i], function (index, val) {
                zdgzSum.push(val)
            });
            weebArr.gxrq = zdgzSum[9];
            weebArr.wlxbf = zdgzSum[15];
            weebArr.lxbf = zdgzSum[13];
            weebArr.lasj = zdgzSum[16];
            weebArr.fbsj = zdgzSum[12];
            weebArr.jtqx = zdgzSum[8];
            weebArr.lxqk = zdgzSum[3];
            weebArr.flyw = zdgzSum[0];
            weebArr.zczxyjdw = zdgzSum[6];
            weebArr.zxyjwh = zdgzSum[4];
            weebArr.dymc = zdgzSum[2];
            weebArr.dyfy = zdgzSum[14];
            weebArr.qyfrxm = zdgzSum[5];
            weebArr.sxbzxrmc = zdgzSum[10];
            weebArr.sjly = zdgzSum[11];
            weebArr.sjlb = zdgzSum[7];
            weebArr.ah = zdgzSum[1];

            /*重大税收违法案件当事人名单*/
            weebArr.nsrmc = data.black[i].纳税人名称;
            weebArr.sjlb = data.black[i].数据类别;
            weebArr.nsrsbm = data.black[i].纳税人识别码;
            weebArr.zzjgdm = data.black[i].组织机构代码;
            weebArr.zcdz = data.black[i].注册地址;
            weebArr.fddbrxm = data.black[i].法定代表人或者负责人姓名;
            weebArr.fddbrxb = data.black[i].法定代表人或者负责人性别;
            weebArr.fddbrzjmc = data.black[i].法定代表人或者负责人证件名称;
            weebArr.fzrxb = data.black[i].负有直接责任的财务负责人姓名;
            weebArr.fzrzjmc = data.black[i].负有直接责任的财务负责人证件名称;
            weebArr.cyryxx = data.black[i].负有直接责任的中介机构信息及其从业人员信息;
            weebArr.ajxz = data.black[i].案件性质;
            weebArr.zywfss = data.black[i].主要违法事实;
            weebArr.xgflyj = data.black[i].相关法律依据及税务处理处罚情况;
            weebArr.ajsbq = data.black[i].案件上报期;
            weebArr.zxgxrq = data.black[i].最新更新日期;


            /*财政部采购不良记录数据*/
            weebArr.cgbtydm = data.black[i].统一社会信用代码或组织机构代码;
            weebArr.gyshdljgmc = data.black[i].供应商或代理机构名称;
            weebArr.dz = data.black[i].地址;
            weebArr.blxwdjtqx = data.black[i].不良行为的具体情形;
            weebArr.cfjg = data.black[i].处罚结果;
            weebArr.cfyj = data.black[i].处罚依据;
            weebArr.cfrq = data.black[i]["处罚（记录）日期"];
            weebArr.zfdw = data.black[i]["执法（记录）单位"];
            weebArr.jssj = data.black[i].处罚结束时间;
            arr.push(weebArr)
        }
        $.each(arr, function (index, val) {
            if (val.dyfy) {
                html += '<div class="tab-content blacklist ListLineBox" style="display: none">' +
                    '<div class="abnormal-list abnor-list">' + val.sjlb + '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>数据来源：</label>' +
                    '<span>' + val.sjly + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>案号：</label>' +
                    '<span>' + val.ah + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>失信被执行人名称：</label>' +
                    '<span>' + val.sxbzxrmc + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>企业法人姓名：</label>' +
                    '<span>' + val.qyfrxm + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>执行法院：</label>' +
                    '<span>' + val.dyfy + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>地域名称：</label>' +
                    '<span class="color-fa6e08">' + val.dymc + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>执行依据文号：</label>' +
                    '<span>' + val.zxyjwh + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>作出执行依据单位：</label>' +
                    '<span>' + val.zczxyjdw + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>法律生效文书确定的义务：</label>' +
                    '<span>' + val.flyw + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>被执行人的履行情况：</label>' +
                    '<span>' + val.lxqk + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>失信被执行人具体情形：</label>' +
                    '<span>' + val.jtqx + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>发布时间：</label>' +
                    '<span>' + val.fbsj + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>立案时间：</label>' +
                    '<span>' + val.lasj + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>已履行部分：</label>' +
                    '<span>' + val.lxbf + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>未履行部分：</label>' +
                    '<span>' + val.wlxbf + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>最新更新日期：</label>' +
                    '<span>' + val.gxrq + '</span>' +
                    '</div>' +
                    '</div>';
            } else if (val.sjlb == "财政部采购不良记录数据") {
                html += '<div class="tab-content blacklist ListLineBox" style="display: none">' +
                    '<div class="abnormal-list abnor-list">' + val.sjlb + '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>数据来源：</label>' +
                    '<span>' + val.sjly + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>供应商或代理机构名称：</label>' +
                    '<span>' + val.gyshdljgmc + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>地址：</label>' +
                    '<span>' + val.dz + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>不良行为的具体情形：</label>' +
                    '<span>' + val.blxwdjtqx + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>处罚结果：</label>' +
                    '<span>' + val.cfjg + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>处罚依据：</label>' +
                    '<span>' + val.cfyj + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>处罚（记录）日期：</label>' +
                    '<span>' + val.cfrq + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>执法（记录）单位：</label>' +
                    '<span>' + val.zfdw + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>处罚结束时间：</label>' +
                    '<span>' + val.jssj + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>最新更新日期：</label>' +
                    '<span>' + val.zxgxrq + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>统一社会信用代码或组织机构代码：</label>' +
                    '<span>' + val.cgbtydm + '</span>' +
                    '</div>' +
                    '</div>';
            } else if (val.sjlb == "失信黑名单-法人") {
                html += '<div class="tab-content blacklist ListLineBox" style="display: none">' +
                    '<div class="abnormal-list abnor-list">' + val.sjlb + '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>数据来源：</label>' +
                    '<span>' + val.sjly + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>纳税人名称：</label>' +
                    '<span>' + val.nsrmc + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>纳税人识别码：</label>' +
                    '<span>' + val.nsrsbm + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>组织机构代码：</label>' +
                    '<span>' + val.zzjgdm + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>注册地址：</label>' +
                    '<span>' + val.zcdz + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>法定代表人或者负责人姓名：</label>' +
                    '<span>' + val.fddbrxm + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>法定代表人或者负责人性别：</label>' +
                    '<span class="color-fa6e08">' + val.fddbrxb + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>法定代表人或者负责人证件名称：</label>' +
                    '<span>' + val.fddbrzjmc + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>负有直接责任的财务负责人姓名：</label>' +
                    '<span>' + val.fzrxb + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>负有直接责任的财务负责人性别：</label>' +
                    '<span>' + val.fzrxb + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>负有直接责任的财务负责人证件名称：</label>' +
                    '<span>' + val.fzrzjmc + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>负有直接责任的中介机构信息及其从业人员信息：</label>' +
                    '<span>' + val.cyryxx + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>案件性质：</label>' +
                    '<span>' + val.ajxz + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>主要违法事实：</label>' +
                    '<span>' + val.zywfss + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>相关法律依据及税务处理处罚情况：</label>' +
                    '<span>' + val.xgflyj + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>案件上报期：</label>' +
                    '<span>' + val.ajsbq + '</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '<label>最新更新日期：</label>' +
                    '<span>' + val.zxgxrq + '</span>' +
                    '</div>' +
                    '</div>';
            }
        })
    } else {
        html += '<div class="tab-content ListLineBox noData" style="display: none">' +
            '<div class="text-list-div clearfix">' +
            '<p class="credit-txt">企业没有相关记录</p>' +
            '</div>' +
            '</div>';
    }
    $('#BlackList').html(html)
}