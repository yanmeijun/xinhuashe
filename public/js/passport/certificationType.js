var V = new Vue({
    el: '#certificationType',
    data: {
        citySRC: citySRC || "/images/banner.png",
        cityName: cityName,
        cerTypeCheck: true,
        showIdCard: false,
        typeArr: [
            {id: 11, name: "首次申领"},
            {id: 12, name: "失效重新申领"},
            {id: 21, name: "补发"},
            {id: 31, name: "换发"},
        ],
        idCard: '',
        nameUsed: '',
        name: '',
        passportUsed: '',
        address: '',
        postCode: '',
        postName: '',
        postMobile: '',
        getTypeArr: [
            {id: 1, name: "邮政速递"},
            {id: 0, name: "到公安机关领取"},
        ],
        isPost: false,
        masktime: '',
        provinceName: ''
    },
    mounted: function () {
        this.provinceName = window.localStorage.getItem("provinceName");
    },
    methods: {
        cerTypeCheckClick: function () {
            V.cerTypeCheck = V.cerTypeCheck ? false : true;
        },
        chooseType: function () {
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: '#type',
                title: '选择状态',
                wheels: [
                    {data: V.typeArr}
                ],
                callback: function () {
                    var data_id = document.getElementById("type").getAttribute("data_id")
                    if (data_id == 21 || data_id == 31) {
                        V.showIdCard = true;
                    } else {
                        V.showIdCard = false;
                    }
                }
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        chooseGetType: function () {
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: '#getType',
                title: '选择状态',
                wheels: [
                    {data: V.getTypeArr}
                ],
                callback: function () {
                    var data_id = document.getElementById("getType").getAttribute("data_id")
                    if (data_id == 1) {
                        V.isPost = true;
                    } else {
                        V.isPost = false;
                    }
                }
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        chooseDate: function () {
            var selectedDate = {};
            var currYear = (new Date()).getFullYear();
            var opt = {};
            opt.date = {preset: 'date'};
            opt.datetime = {preset: 'datetime'};
            opt.time = {preset: 'time'};
            opt.default = {
                theme: 'android-ics light', //皮肤样式
                display: 'modal', //显示方式
                mode: 'scroller', //日期选择模式
                dateFormat: 'yyyy-mm-dd',
                lang: 'zh',
                showNow: true,
                nowText: "今天",
                startYear: currYear - 10, //开始年份
                endYear: currYear + 10, //结束年份
                onBeforeShow: function (inst) {//展示前的事件
                    document.activeElement.blur()
                },
                onSelect: function (valueText, inst) {//选择时事件（点击确定后），valueText 为选择的时间，
                    valueText.match(/^\d{4}\-\d{2}\-\d{2}$/);
                    if (valueText.match(/^\d{4}\-\d{2}\-\d{2}$/)) {
                        selectedDate["date"] = valueText;
                    } else {
                        selectedDate["time"] = valueText;
                    }
                    calltimes = selectedDate.date + " " + selectedDate.time;
                }
            };
            $("#idCardDate").mobiscroll($.extend(opt['date'], opt['default']));
            $("#idCardDate").mobiscroll("show");
        },
        back: function () {
            window.location.href = '/passport?&page=basicInfo&randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        },
        submit: function () {
            if (!V.cerTypeCheck) {
                V.maskFn("请选择办证类型");
                return;
            } else if (!document.getElementById("type").getAttribute("data_id")) {
                V.maskFn("请选择申请类型");
                return;
            } else if (!document.getElementById("getType").getAttribute("data_id")) {
                V.maskFn("请选择取证方式");
                return;
            } else if (document.getElementById("getType").getAttribute("data_id") == 1) {
                if (!V.address) {
                    V.maskFn("请输入速递地址");
                    return;
                } else if (!V.postCode) {
                    V.maskFn("请输入速递邮编");
                    return;
                } else if (!V.postName) {
                    V.maskFn("请输入速递收件人");
                    return;
                } else if (!V.postMobile) {
                    V.maskFn("请输入速递联系电话");
                    return;
                }
            }
            var data = {
                randomKey: randomKey,
                sldw: localStorage.getItem('SLDW'),
                wsyyrq: localStorage.getItem('WSYYRQ'),
                wsyysj: localStorage.getItem('WSYYSJ'),
                provinceCode: localStorage.getItem('cityID').substring(0, 2),
                cityCode: localStorage.getItem('cityID')
            }
            $.ajax({
                async: true,
                url: "/passport/getIdNumber",
                method: "post",
                data: JSON.stringify(data),
                contentType: "application/json"
            }).then(function (res) {
                if (res.retCode == "000000") {
                    localStorage.setItem('bzlx', 101);//办证类型
                    localStorage.setItem('qzfs', document.getElementById("getType").getAttribute("data_id"));//取证方式
                    localStorage.setItem('pthzlb', document.getElementById("type").getAttribute("data_id"));//申请类型
                    localStorage.setItem('JZXX_1_JZLR', V.nameUsed);//曾用名
                    localStorage.setItem('JZXX_2_JZLR', V.name);//姓名
                    localStorage.setItem('JZXX_3_JZLR', V.passportUsed);//曾持照
                    localStorage.setItem('EMSDZ', V.address);//快递地址
                    localStorage.setItem('YZBM', V.postCode);//快递地址
                    localStorage.setItem('SJR', V.postName);//快递地址
                    localStorage.setItem('SJRLXDH', V.postMobile);//快递地址
                    localStorage.setItem('YYSJID', res.responseBody.YYSJID);//订单号
                    window.location.href = '/passport?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=infoConfirm&comeForm=certificationType";
                } else {
                    V.maskFn("提交失败，请重试");
                    return;
                }
            })


        },
        maskFn: function (mgs) {
            V.masktime = mgs;
            setTimeout(function () {
                V.masktime = "";
            }, 1500);
            return;
        }
    }
});