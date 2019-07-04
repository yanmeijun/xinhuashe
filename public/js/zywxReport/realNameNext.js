var v = new Vue({
    el: "#realNameNext",
    data: {
        isReal: realName ? "实名" : "匿名",
        reportType: "0",
        websiteName: '',
        websiteUrl: 'http://',
        sEType: '',
        sEKeyword: '',
        sEWebsiteName: '',
        sEUrl: 'http://',
        otherSE: '',
        appName: '',
        appCol: '',
        appDownload: '',
        otherAppDownload: '',
        toolName: '',
        otherTool: '',
        otherDrive: '',
        driveName: '',
        accountName: '',
        driveAccountName: '',
        reportContent: '',
        masktime: '',
        dialogMask: false,
        verifyCode: '',
        verifyCodeSrc: '/images/yanzm.gif',
        fileCount: 0,
        formData: new FormData(),
        imgs: {},
        imgLen: 0,
        drivenameName:"",
        drivename:""/*社会论坛名称*/
    },
    mounted: function () {
        this.getVerifyCode(this);
    },
    methods: {
        imgChange: function (event) {
            var inputDOM = v.$refs.inputer;
            // 通过DOM取文件数据
            var fil = inputDOM.files;
            var oldLen = v.imgLen;
            if (v.fileCount >= 10) {
                v.maskFn('最多可上传10张');
                return;
            }
            v.fileCount = fil.length + oldLen;
            for (var i = 0; i < fil.length; i++) {
                var size = Math.floor(fil[i].size / 1024);
                if (size > 5 * 1024 * 1024) {
                    v.maskFn('请选择5M以内的图片！');
                    return
                }
                v.imgLen++;
                v.$set(v.imgs, fil[i].name + '?' + new Date().getTime() + i, fil[i]);
            }
        },
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        delImg(key){
            v.$delete(this.imgs, key);
            v.imgLen--;
            v.fileCount--;
        },
        getVerifyCode: function (a) {
            v = v || a;
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom
            }
            v.verifyCodeSrc = '/images/yanzm.gif';
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/getVerifyCode',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.verifyCodeSrc = res.data;
            }).catch(function (err) {
                console.log(err)
            })
        },
        reportTypeSelect: function () {
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom
            }
            v.dialogMask = true;
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/reportTypeList',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                var reportType = [
                    {id: "0", name: "网站"},
                    {id: "1", name: "搜索引擎"},
                    {id: "2", name: "客户端APP"},
                    {id: "14", name: "网络账号"}
                ];
                if (res.data.retCode == "000000") {
                    reportType = JSON.parse(res.data.responseBody.data).lists;
                }
                var info = {
                    arr: reportType,
                    title: '举报类型',
                    id: '#reportType'
                };
                v.select(info, function () {
                    v.reportType = document.getElementById("reportType").getAttribute("data_id");
                });
            }).catch(function (err) {
                console.log(err)
            })
        },
        sETypeSelect: function () {
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom
            }
            v.dialogMask = true;
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/sETypeList',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                var type = [
                    {id: " | ", name: "请选择"},
                    {id: "1|http://www.baidu.com|百度", name: "百度"},
                    {id: "2|http://www.haosou.com|好搜", name: "好搜"},
                    {id: "3|http://www.sogou.com|搜狗", name: "搜狗"},
                    {id: "5|http://www.soso.com|搜搜", name: "搜搜"},
                    {id: "4|http://cn.bing.com|必应", name: "必应"},
                    {id: "-1| |其他", name: "其他"}
                ];
                if (res.data.retCode == "000000") {
                    type = JSON.parse(res.data.responseBody.data).lists;
                }
                var info = {
                    arr: type,
                    title: '搜索引擎类型',
                    id: '#sEType'
                };
                v.select(info, function () {
                    v.sEType = document.getElementById("sEType").getAttribute("data_id");
                });
            }).catch(function (err) {
                console.log(err)
            })
        },
        appDownloadSelect: function () {
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom
            }
            v.dialogMask = true;
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/appDownloadList',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                var type = [
                    {id: "", name: "请选择"},
                    {id: "1", name: "苹果应用商店"},
                    {id: "2", name: "应用宝"},
                    {id: "3", name: "PP助手"},
                    {id: "4", name: "小米应用商店"},
                    {id: "5", name: "华为应用商店"},
                    {id: "6", name: "豌豆荚"},
                    {id: "7", name: "安智市场"},
                    {id: "8", name: "乐商店"},
                    {id: "9", name: "魅族Flyme应用中心"},
                    {id: "10", name: "木蚂蚁市场"},
                    {id: "11", name: "应用汇"},
                    {id: "12", name: "应用之家"},
                    {id: "0", name: "其他"},
                ];
                if (res.data.retCode == "000000") {
                    type = JSON.parse(res.data.responseBody.data).lists;
                }
                var info = {
                    arr: type,
                    title: '下载资源类别',
                    id: '#appDownload'
                };
                v.select(info, function () {
                    v.appDownload = document.getElementById("appDownload").getAttribute("data_id");
                });
            }).catch(function (err) {
                console.log(err)
            })

        },
        toolNameSelect: function () {
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom
            }
            v.dialogMask = true;
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/toolNameList',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                var type = [
                    {id: "", name: "请选择"},
                    {id: "1", name: "微信"},
                    {id: "2", name: "QQ"},
                    {id: "8", name: "微博"},
                    {id: "9", name: "贴吧"},
                    {id: "10", name: "论坛社区"},
                    {id: "11", name: "博客"},
                    {id: "12", name: "网盘"},
                    {id: "13", name: "直播平台"},
                    {id: "0", name: "其他"},
                ];
                if (res.data.retCode == "000000") {
                    type = JSON.parse(res.data.responseBody.data).lists;
                }
                var info = {
                    arr: type,
                    title: '通讯工具名称',
                    id: '#toolName'
                };
                v.select(info, function () {
                    v.toolName = document.getElementById("toolName").getAttribute("data_id");
                    switch(v.toolName){
                        case '10':
                            v.drivenameName = "论坛社区名称";
                            break;
                        case '11':
                            v.drivenameName = "博客名称";
                            break;
                        case '12':
                            v.drivenameName = "网盘名称";
                            break;
                        case '13':
                            v.drivenameName = "平台名称";
                            break;
                        case '0':
                            v.drivenameName = "平台名称";
                            break;
                    }
                });
            }).catch(function (err) {
                console.log(err)
            })
        },
        accountNatureSelect: function () {
            var appType = document.getElementById('toolName').getAttribute("data_id");
            var typeArr = [];
            switch(appType){
                case '1':
                    typeArr = [
                        {"name":"个人","id":"0"},
                        {"name":"公众","id":"1"},
                        {"name":"群组","id":"3"},
                    ];
                break;
                case  '2':
                    typeArr = [
                        {"name":"个人","id":"0"},
                        {"name":"群组","id":"3"},
                    ];
                break;
                case  '8':
                    typeArr = [
                        {"name":"认证","id":"4"},
                        {"name":"非认证","id":"5"}
                    ];
                    break;
                default:
                    typeArr = [

                    ];
                    break;
            }
            var info = {
                arr: typeArr,
                title: '账号性质',
                id: '#accountNature'
            };
            v.select(info);
           /* var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom
            }
            v.dialogMask = true;
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/accountNatureList',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                var type = [
                    {id: "", name: "请选择"},
                    {id: "0", name: "个人账号"},
                    {id: "1", name: "公众账号"},
                    {id: "3", name: "群账号"},
                    {id: "2", name: "其他"},
                ];
                if (res.data.retCode == "000000") {
                    type = JSON.parse(res.data.responseBody.data).lists;
                }
                var info = {
                    arr: type,
                    title: '账号性质',
                    id: '#accountNature'
                };
                v.select(info);
            }).catch(function (err) {
                console.log(err)
            })*/
        },
        driveNameSelect: function () {
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom
            }
            v.dialogMask = true;
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/driveNameList',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                var type = [
                    {id: "", name: "请选择"},
                    {id: "0", name: "百度云盘"},
                    {id: "1", name: "360网盘"},
                    {id: "2", name: "115网盘"},
                    {id: "3", name: "其他"},
                ];
                if (res.data.retCode == "000000") {
                    type = JSON.parse(res.data.responseBody.data).lists;
                }
                var info = {
                    arr: type,
                    title: '网盘名称',
                    id: '#driveName'
                };
                v.select(info, function () {
                    v.driveName = document.getElementById("driveName").getAttribute("data_id");
                });
            }).catch(function (err) {
                console.log(err)
            })
        },
        accountNaturesSelect: function () {
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom
            }
            v.dialogMask = true;
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/accountNatureList',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                var type = [
                    {id: "", name: "请选择"},
                    {id: "0", name: "个人账号"},
                    {id: "1", name: "公众账号"},
                    {id: "3", name: "群账号"},
                    {id: "2", name: "其他"},
                ];
                if (res.data.retCode == "000000") {
                    type = JSON.parse(res.data.responseBody.data).lists;
                }
                var info = {
                    arr: type,
                    title: '账号性质',
                    id: '#accountNatures'
                };
                v.select(info);
            }).catch(function (err) {
                console.log(err)
            })
        },
        harmTypeSelect: function () {
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom
            }
            v.dialogMask = true;
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/harmTypeList',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                var type = [
                    {id: "", name: "请选择"},
                    {id: "0102", name: "政治类"},
                    {id: "0108", name: "暴恐类"},
                    {id: "0107", name: "谣言类"},
                    {id: "0109", name: "色情类"},
                    {id: "0106", name: "低俗类"},
                    {id: "0103", name: "赌博类"},
                    {id: "0104", name: "诈骗类"},
                    {id: "0105", name: "侵权类"},
                    {id: "0110", name: "其他"},
                ];
                if (res.data.retCode == "000000") {
                    type = JSON.parse(res.data.responseBody.data).lists;
                }
                var info = {
                    arr: type,
                    title: '有害信息类型',
                    id: '#harmType'
                };
                v.select(info);
            }).catch(function (err) {
                console.log(err)
            })
        },
        select(info, cb){
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: info.id,
                title: info.title,
                wheels: [
                    {data: info.arr}
                ],
                callback: cb
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
            //document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        submit: function () {
            if (v.reportType == "0") {//网站
                if (!(/^(http|https):\/\/\S/.test(v.websiteUrl))) {
                    v.maskFn("请输入正确的详细网址");
                    return;
                }
            } else if (v.reportType == "1") {//搜索引擎
                var type = document.getElementById("sEType").getAttribute("data_id")
                if (!type) {
                    v.maskFn("请选择搜索引擎类型");
                    return;
                }
                if (!v.sEKeyword.trim()) {
                    v.maskFn("举报关键字不能为空");
                    return;
                }
                if (type == '-1| |其他' && !v.otherSE.trim()) {
                    v.maskFn("其他搜索引擎名称不能为空");
                    return;
                }

                if (!(/^(http|https):\/\/\S/.test(v.sEUrl))) {
                    v.maskFn("请输入正确的详细网址");
                    return;
                }
            } else if (v.reportType == "2") {//违法APP
                if (!v.appName.trim()) {
                    v.maskFn("APP名称不能为空");
                    return;
                }
                var type = document.getElementById("appDownload").getAttribute("data_id")
                if (!type) {
                    v.maskFn("请选择下载源类别");
                    return;
                }
                if (type == '0' && !v.otherAppDownload.trim()) {
                    v.maskFn("其他下载源不能为空");
                    return;
                }
            } else if (v.reportType == "14") {//网络账号
                var type = document.getElementById("toolName").getAttribute("data_id")
                if (!type) {
                    v.maskFn("请选择平台类别");
                    return;
                }
                if(v.toolName == '1' || v.toolName == '2' || v.toolName == '8'){
                    var type1 = document.getElementById("accountNature").getAttribute("data_id")
                    if (!type1) {
                        v.maskFn("请选择账号性质");
                        return;
                    }
                }
                if (!v.drivename.trim()) {
                    v.maskFn(v.drivenameName + "不能为空");
                    return;
                }
                if (!v.accountName.trim()) {
                    v.maskFn("账号不能为空");
                    return;
                }
               /* if (type == '0' && !v.otherTool.trim()) {
                    v.maskFn("其他名称不能为空");
                    return;
                }*/


            } else if (v.reportType == "7") {//网盘账号
                var type = document.getElementById("driveName").getAttribute("data_id")
                if (!type) {
                    v.maskFn("请选择网盘名称");
                    return;
                }
                if (type == '3' && !v.otherDrive.trim()) {
                    v.maskFn("其他名称不能为空");
                    return;
                }
                var type1 = document.getElementById("accountNatures").getAttribute("data_id")
                if (!type1) {
                    v.maskFn("请选择账号性质");
                    return;
                }
                if (!v.driveAccountName.trim()) {
                    v.maskFn("账号不能为空");
                    return;
                }
            }
            if (!v.reportContent.trim()) {
                v.maskFn("举报内容不能为空");
                return;
            }
            /*var type = document.getElementById("harmType").getAttribute("data_id")
            if (!type) {
                v.maskFn("请选择有害信息类型");
                return;
            }*/
            if (!v.verifyCode.trim()) {
                v.maskFn("请输入验证码");
                return;
            }
            for (var key in v.imgs) {
                var name = key.split('?')[0];
                v.formData.append('multipartFiles', this.imgs[key], name);
            }
            v.dialogMask = true;
            axios.post('/zywxReport/upload', v.formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(resFile => {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x,
                    local_y: local_y,
                    localFrom: localFrom,
                    ossList: resFile.data
                }
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: "post",
                    url: '/zywxReport/getFilePath',
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                }).then(function (res) {
                    var data = {
                        randomKey: randomKey,
                        userID: userID,
                        clientID: clientID,
                        cityID: cityID,
                        local_x: local_x,
                        local_y: local_y,
                        localFrom: localFrom,
                        verifyCode:v.verifyCode
                    };
                    axios({
                        headers: {"Content-Type": "application/json"},
                        method: "post",
                        url: '/zywxReport/checkCode',
                        data: JSON.stringify(data),
                        contentType: 'application/json'
                    }).then(function (res) {

                        console.log(res)
                        if(res.data.retCode != "000000"){
                            v.maskFn("验证码错误");
                            return;
                        }
                        var reportData = {
                            randomKey: randomKey,
                            userID: userID,
                            clientID: clientID,
                            cityID: cityID,
                            local_x: local_x,
                            local_y: local_y,
                            localFrom: localFrom,
                            realName: realName,
                            reporttype: v.reportType,//举报类型
                            webname: v.reportType == "0" ? v.websiteName : (v.sEWebsiteName || ""),
                            pageurl: v.reportType == "0" ? v.websiteUrl : (v.sEUrl || ""),
                            seids: document.getElementById("sEType").getAttribute("data_id") || "",
                            seid: document.getElementById("sEType").getAttribute("data_id") ? document.getElementById("sEType").getAttribute("data_id").split("|")[0] : "",
                            keyword: v.sEKeyword,
                            otherengine: v.otherSE,
                            appname: v.appName,
                            appsourcecod: document.getElementById("appDownload").getAttribute("data_id") || "",
                            appsourcename: v.otherAppDownload,
                            col: v.appCol,
                            toolname: document.getElementById("toolName").getAttribute("data_id") || "",
                            othername: "http://",
                            accountnature: v.reportType == "14" ? (v.toolName=='1' || v.toolName=='2' || v.toolName=='8')?document.getElementById("accountNature").getAttribute("data_id"):"" :"",
                            accountname: v.reportType == "6" ? v.accountName : (v.driveAccountName || ""),
                            drivename: v.drivename || "",
                            content: v.reportContent,
                            typecatalog: document.getElementById("harmType")?document.getElementById("harmType").getAttribute("data_id"):"",
                            verifyCode: v.verifyCode,
                            uploadFile: resFile.data
                        };
                        if (realName) {
                            reportData.name = window.sessionStorage.getItem("name");
                            reportData.sex = window.sessionStorage.getItem("sex");
                            reportData.email = window.sessionStorage.getItem("email");
                            reportData.tel = window.sessionStorage.getItem("tel");
                            reportData.provincecode = window.sessionStorage.getItem("provincecode");
                            reportData.citycode = window.sessionStorage.getItem("citycode");
                            reportData.countycode = window.sessionStorage.getItem("countycode");
                            reportData.address = window.sessionStorage.getItem("address");
                        }
                        axios({
                            headers: {"Content-Type": "application/json"},
                            method: "post",
                            url: '/zywxReport/report',
                            data: JSON.stringify(reportData),
                            contentType: 'application/json'
                        }).then(function (res) {
                            v.dialogMask = false;
                            if (res.data.retCode == "000000") {
                                // v.maskFn("举报成功");
                                window.sessionStorage.setItem("searchCode", res.data.responseBody.searchCode);
                                window.location.href = "/zywxReport?page=reportSuccess"
                            } else {
                                v.maskFn(res.data.responseBody.errorMsg || "举报失败");
                            }
                        }).catch(function (err) {
                            console.log(err)
                        })
                    }).catch(function (err) {
                        console.log(err)
                    });
                })
            });

        },
        back: function () {
            window.location.href = realName ? "/zywxReport?page=realName" : "/zywxReport?page=reportSelect"
        },
        maskFn: function (mgs) {
            v.masktime = mgs;
            setTimeout(function () {
                v.masktime = "";
            }, 1500);
            return;
        },
    }
})