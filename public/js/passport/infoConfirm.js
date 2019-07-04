var V = new Vue({
    el: '#infoConfirm',
    data: {
        citySRC: citySRC || "/images/banner.png",
        masktime: '',
        name: '',
        idCard: '',
        bzlx: '',
        pthzlb: '',
        verycodeSrc: '',
        verycode: '',
        isSubmit: false
    },
    mounted: function () {
        this.name = localStorage.getItem("ZWXM") + "（" + localStorage.getItem("YWXM") + "）"
        this.idCard = localStorage.getItem("SFZH")
        this.bzlx = localStorage.getItem("bzlx") == 101 ? "普通护照" : (localStorage.getItem("bzlx") == 102 ? "往来港澳通行证和签注" : "往来台湾通行证和签注")
        this.pthzlb = localStorage.getItem("pthzlb") == 11 ? "首次申领" : (localStorage.getItem("pthzlb") == 12 ? "失效重新申领" : (localStorage.getItem("pthzlb") == 21 ? "补发" : "换发"))
        this.getVerycode();
    },
    methods: {
        back: function () {
            window.location.href = '/passport?&page=certificationType&randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        },
        maskFn: function (mgs) {
            V.masktime = mgs;
            setTimeout(function () {
                V.masktime = "";
            }, 1500);
            return;
        },
        getVerycode: function () {
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/passport/getVerycode",
                data: JSON.stringify({randomKey: randomKey}),
                contentType: 'application/json'
            }).then(function (res) {
                V.verycodeSrc = res.data;
            })
        },
        showTips: function () {
            if (!V.verycode) {
                V.maskFn("请输入图片验证码");
                return;
            }
            V.isSubmit = V.isSubmit ? false : true;
        },
        submit: function () {
            var txtXML = '<DATAINFO><YWSLID datatype="0" state="0" assign="{YWLX}{DATE}{CRJ_ZB}" pk="1"/><YWLX datatype="0" state="9">03</YWLX><CRJ_CXTJ datatype="0" state="9" query="CRJ_CXTJ">'
                + localStorage.getItem("CRJ_CXTJ") + '</CRJ_CXTJ><CRJ_SFZHLXDH datatype="0" state="9" query="CRJ_SFZHDH">'
                + localStorage.getItem("CRJ_SFZHLXDH") + '</CRJ_SFZHLXDH><GXRXX_1><GXR_ID datatype="0" state="0" assign="{GUID}"/><GXRLB datatype="0" state="0">6</GXRLB><ZWXM datatype="0" state="0">'
                + localStorage.getItem("ZWXM") + '</ZWXM><LXDH datatype="0" state="0">'
                + localStorage.getItem("LXDH") + '</LXDH></GXRXX_1><SQXX_1 datatype="0" state="0"><ZB_ID datatype="0" state="0" fk="YWSLID"/><ZJSQLB datatype="0" state="0">14</ZJSQLB><YYBH datatype="0" state="0" assign="EEA{DATE}{YWBH}"/><BZLB datatype="0" state="0">'
                + localStorage.getItem("pthzlb") + '</BZLB><XCZJHM datatype="0" state="0"/><XCZJYXQZ datatype="3" state="0"/></SQXX_1><JZXX_1 datatype="0" state="0"><JZ_ID datatype="0" state="0" assign="{GUID}"/><YYBH datatype="0" state="0" fk="SQXX_1/YYBH"/><JZZL datatype="0" state="0">19</JZZL><JZLR datatype="0" state="0">'
                + localStorage.getItem("JZXX_1_JZLR") + '</JZLR></JZXX_1><JZXX_2 datatype="0" state="0"><JZ_ID datatype="0" state="0" assign="{GUID}"/><YYBH datatype="0" state="0" fk="SQXX_1/YYBH"/><JZZL datatype="0" state="0">11</JZZL><JZLR datatype="0" state="0">'
                + localStorage.getItem("JZXX_2_JZLR") + '</JZLR></JZXX_2><JZXX_3 datatype="0" state="0"><JZ_ID datatype="0" state="0" assign="{GUID}"/><YYBH datatype="0" state="0" fk="SQXX_1/YYBH"/><JZZL datatype="0" state="0">1A</JZZL><JZLR datatype="0" state="0">'
                + localStorage.getItem("JZXX_3_JZLR") + '</JZLR></JZXX_3><QZXX_1 datatype="0" state="9"><QZ_ID datatype="0" state="0" assign="{GUID}"/><QZZL datatype="0" state="0"/><QWD datatype="0" state="0"/><QZYXQ datatype="0" state="0"/><QZYXQDW datatype="0" state="9"/><QZYXCS datatype="0" state="0"/><YYBH datatype="0" state="0" fk="SQXX_2/YYBH"/><GXR_ID datatype="0" state="0" fk="GXRXX_2/GXR_ID"/></QZXX_1><GXRXX_2 datatype="0" state="9"><GXR_ID datatype="0" state="0" assign="{GUID}"/><GXRLB datatype="0" state="0"/><ZWXM datatype="0" state="0"/><XB datatype="0" state="0"/><SFZHM datatype="0" state="0"/><CRJZJHM datatype="0" state="0"/><QSGX datatype="0" state="0"/></GXRXX_2><QZXX_2 datatype="0" state="9"><QZ_ID datatype="0" state="0" assign="{GUID}"/><QZZL datatype="0" state="0"/><QWD datatype="0" state="0"/><QZYXQ datatype="0" state="0"/><QZYXQDW datatype="0" state="9"/><QZYXCS datatype="0" state="0"/><YYBH datatype="0" state="0" fk="SQXX_2/YYBH"/><GXR_ID datatype="0" state="0" fk="GXRXX_3/GXR_ID"/></QZXX_2><GXRXX_3 datatype="0" state="9"><GXR_ID datatype="0" state="0" assign="{GUID}"/><GXRLB datatype="0" state="0"/><ZWXM datatype="0" state="0"/><XB datatype="0" state="0"/><SFZHM datatype="0" state="0"/><CRJZJHM datatype="0" state="0"/><QSGX datatype="0" state="0"/></GXRXX_3><SQXX_2 datatype="0" state="9"><ZB_ID datatype="0" state="0" fk="YWSLID"/><YYBH datatype="0" state="0" assign="EEA{DATE}{YWBH}"/><ZJSQLB datatype="0" state="0"/><BZLB datatype="0" state="0"/><GATXZLB datatype="0" state="9"/><XCZJHM datatype="0" state="0"/><XCZJYXQZ datatype="3" state="0"/><XGCJSY datatype="0" state="9"/><AMCJSY datatype="0" state="9"/><TWTXZLB datatype="0" state="9"/></SQXX_2><SQXX_3 datatype="0" state="9"><ZB_ID datatype="0" state="0" fk="YWSLID"/><YYBH datatype="0" state="0"/><ZJSQLB datatype="0" state="0"/><BZLB datatype="0" state="0"/><XCZJHM datatype="0" state="0"/><XCZJYXQZ datatype="3" state="0"/><CJSY datatype="0" state="9"/></SQXX_3><QZXX_3 datatype="0" state="9"><QZZL datatype="0" state="0"/><QZ_ID datatype="0" state="0" assign="{GUID}"/><YYBH datatype="0" state="0" fk="SQXX_3/YYBH"/><QWD datatype="0" state="0"/><QZYXQ datatype="0" state="0"/><QZYXQDW datatype="0" state="9"/><QZYXCS datatype="0" state="0"/><RJXKLB datatype="0" state="0"/><RJXKZH datatype="0" state="0"/></QZXX_3><JBXX><ZB_ID datatype="0" state="0" fk="YWSLID"/><YWLX datatype="0" state="0">01</YWLX><YYSJID datatype="0" state="0">'
                + localStorage.getItem("YYSJID") + '</YYSJID><CFYZSJ datatype="0" state="0">'
                + localStorage.getItem("CFYZSJ") + '</CFYZSJ><SLDW datatype="0" state="0">'
                + localStorage.getItem("SLDW") + '</SLDW><SLDWMC datatype="0" state="9" result="1">'
                + localStorage.getItem("SLDWMC") + '</SLDWMC><SLDWDZ datatype="0" state="9" result="1">'
                + localStorage.getItem("SLDWDZ") + '</SLDWDZ><WSYYRQ datatype="3" state="0" result="1">'
                + localStorage.getItem("WSYYRQ").replace('-', '').replace('-', '') + '</WSYYRQ><WSYYSJ datatype="0" state="0" result="1">'
                + localStorage.getItem("WSYYSJ") + '</WSYYSJ><GXR_ID datatype="0" state="0" fk="GXRXX_1/GXR_ID"/><YYBH_HZ datatype="0" state="0" fk="SQXX_1/YYBH"/><YYBH_GA datatype="0" state="0" fk="SQXX_2/YYBH"/><YYBH_FT datatype="0" state="0" fk="SQXX_3/YYBH"/><SLRQ datatype="4" state="0" assign="{DATETIME}"/><YYMM datatype="0" state="0" fk="YYMM"/><IP datatype="0" state="0" fk="IP"/><JSDW datatype="0" state="0">'
                + localStorage.getItem("cityID").substring(0, 2) + '</JSDW><JSZT datatype="0" state="0">01</JSZT><SQRLX datatype="0" state="0">'
                + localStorage.getItem("SQRLX") + '</SQRLX><ZWX datatype="0" state="0">'
                + localStorage.getItem("ZWX") + '</ZWX><ZWM datatype="0" state="0">'
                + localStorage.getItem("ZWM") + '</ZWM><ZWXM datatype="0" state="0" result="1">'
                + localStorage.getItem("ZWXM") + '</ZWXM><YWX datatype="0" state="0">'
                + localStorage.getItem("YWX") + '</YWX><YWM datatype="0" state="0">'
                + localStorage.getItem("YWM") + '</YWM><YWXM datatype="0" state="0">'
                + localStorage.getItem("YWXM") + '</YWXM><SFZH datatype="0" state="0">'
                + localStorage.getItem("SFZH") + '</SFZH><XB sv="'
                + localStorage.getItem("XB_sv") + '" datatype="0" state="0">'
                + localStorage.getItem("XB") + '</XB><MZ sv="'
                + localStorage.getItem("MZ_sv") + '" datatype="0" state="0">'
                + localStorage.getItem("MZ") + '</MZ><CSRQ sv="'
                + localStorage.getItem("CSRQ") + '" datatype="3" state="0">'
                + localStorage.getItem("CSRQ").replace('-', '').replace('-', '') + '</CSRQ><CSD sv="'
                + localStorage.getItem("CSD_sv") + '" datatype="0" state="0">'
                + localStorage.getItem("CSD") + '</CSD><LXDH datatype="0" state="0">'
                + localStorage.getItem("LXDH") + '</LXDH><HKSZDDZ datatype="0" state="9">'
                + localStorage.getItem("HKSZDDZ") + '</HKSZDDZ><HKSZD datatype="0" state="0">'
                + localStorage.getItem("HKSZD") + '</HKSZD><SFXTKZD datatype="0" state="0">'
                + localStorage.getItem("qzfs") + '</SFXTKZD><EMSDZ datatype="0" state="0">'
                + localStorage.getItem("EMSDZ") + '</EMSDZ><YZBM datatype="0" state="0">'
                + localStorage.getItem("YZBM") + '</YZBM><SJR datatype="0" state="0">'
                + localStorage.getItem("SJR") + '</SJR><SJRLXDH datatype="0" state="0">'
                + localStorage.getItem("SJRLXDH") + '</SJRLXDH></JBXX></DATAINFO>'
            var data = {
                randomKey: randomKey,
                bzlx: localStorage.getItem("bzlx"),
                yzbm: V.verycode,
                qzfs: localStorage.getItem("qzfs"),
                pthzlb: localStorage.getItem("pthzlb"),
                txtXML: txtXML
            }
            document.getElementById("dialogMask").style.display = "block";
            document.getElementById("dialog").style.display = "block";
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/passport/submit",
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                if (res.data.responseBody.data.indexOf("<ERRORRESULT>0</ERRORRESULT>") > -1) {
                    axios({
                        async: true,
                        url: "/passport/getOrderInfo",
                        method: "post",
                        data: {randomKey: randomKey},
                        contentType: "application/json"
                    }).then(function (res) {
                        if (res.data.responseBody.data.indexOf("YYMM") > -1) {
                            localStorage.setItem('YYMM', JSON.parse(res.data.responseBody.data).YYMM);//密码
                            localStorage.setItem('res_WSYYRQ', JSON.parse(res.data.responseBody.data).WSYYRQ);//日期
                            localStorage.setItem('res_WSYYSJ', JSON.parse(res.data.responseBody.data).WSYYSJ);//时间
                            localStorage.setItem('res_SLDWMC', JSON.parse(res.data.responseBody.data).SLDWMC);//服务大厅名称
                            localStorage.setItem('res_SLDWDZ', JSON.parse(res.data.responseBody.data).SLDWDZ);//服务大厅地址
                            localStorage.setItem('res_ZWXM', JSON.parse(res.data.responseBody.data).ZWXM);//姓名
                            window.location.href = '/passport?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=appointmentSuccess&comeForm=infoConfirm";
                        } else {
                            window.location.href = '/passport?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=appointmentFailed&comeForm=infoConfirm";
                        }
                        document.getElementById("dialogMask").style.display = "none";
                        document.getElementById("dialog").style.display = "none";
                    })
                } else if (res.data.responseBody.data.indexOf("YZBM_ERROR") > -1) {
                    document.getElementById("dialogMask").style.display = "none";
                    document.getElementById("dialog").style.display = "none";
                    V.isSubmit = false
                    V.maskFn("图片验证码错误");
                    return;
                } else {
                    document.getElementById("dialogMask").style.display = "none";
                    document.getElementById("dialog").style.display = "none";
                    window.location.href = '/passport?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=appointmentFailed&comeForm=infoConfirm";
                }

            })
        }
    }
});