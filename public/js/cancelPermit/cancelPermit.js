var department;
var cancelPermit = new Vue({
    el: "#cancelPermit",
    data: {
        maskProject: "",
        addminPlace: "",
        lists: [],
        adminCount: "",
        PageNumber: 1,
        isCanScroll: true,
        totalNum: 0,
        searchBarFixed: true,
        dialogMask: "",
        Exhibition: true,
        noDate: "",
        flag: 0,
        projectCancel: "",
        projectName: "",
        projectDepartment: ""
    },
    created: function () {
        this.fnSize();
        this.lists = [];
        this.Exhibition = true;
        window.addEventListener('resize', this.fnSize, false);
    },
    mounted: function () {
        this.dialogMask = true;
        this.guoWYTitle();
        this.search();
        window.addEventListener('scroll', this.handleScroll);

    },
    methods: {
        fnSize: function () {
            document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
        },
        handleScroll: function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var bodyHeight = document.body.clientHeight;
            var clientHeight = document.documentElement.clientHeight;//可视区高度
            var department = document.getElementById("cityTrigger").getAttribute("data_id");
            if (scrollTop + clientHeight + 20 > bodyHeight) {
                if (cancelPermit.isCanScroll) {
                    cancelPermit.PageNumber++;
                    cancelPermit.dialogMask = true;
                    if (cancelPermit.flag == 0) {
                        cancelPermit.search(department);
                    } else if (cancelPermit.flag == 1) {
                        cancelPermit.getAdminSearch(department);
                    }

                }
            }
        },
        /*
         *输入不正确的查询语句提示语
         */
        maskFn: function (mgs) {
            cancelPermit.masktime = mgs;
            setTimeout(function () {
                cancelPermit.masktime = "";
            }, 1500);
            return;

        },
        search: function (departmentList) {
            this.isCanScroll = false;
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                department: departmentList || "",//部门（默认值为空，即全部）
                pageNo: this.PageNumber,//页码
                searchContent: this.addminPlace.trim() || ""//查询条件
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: '/cancelPermit/cancelPermitSearch',
                data: JSON.stringify(parameters),
                async: true,
                contentType: 'application/json'
            }).then(function (res) {
                cancelPermit.dialogMask = "";//查询动画
                if (res.data.responseBody.data) {
                    cancelPermit.maskFn("无更多数据");
                    return;
                }
                if (res.data.retCode == "000000") {
                    if (res.data.responseBody.list != 0) {
                        var list = res.data.responseBody.list;
                        for (var i = 0; i < list.length; i++) {
                            cancelPermit.lists.push(list[i]);
                        }
                        ;
                        cancelPermit.adminCount = res.data.responseBody.count;
                        cancelPermit.totalPage = Math.ceil(res.data.responseBody.count / list.length);
                        if (cancelPermit.PageNumber >= cancelPermit.totalPage) {
                            cancelPermit.searchBarFixed = false;
                            cancelPermit.dialogMask = "";//查询动画
                        } else {
                            cancelPermit.searchBarFixed = true;
                            cancelPermit.isCanScroll = true;
                            cancelPermit.dialogMask = "";//查询动画
                        }
                        ;
                        cancelPermit.noDate = "";
                        cancelPermit.dialogMask = "";////查询动画
                        cancelPermit.flag = 0;
                    } else {
                        cancelPermit.lists = [];
                        cancelPermit.adminCount = "0";
                        cancelPermit.noDate = "暂无查询结果";
                        cancelPermit.dialogMask = "";//查询动画
                        cancelPermit.flag = 0;
                    }

                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        city: function () {
            /*
             *选择省份
             */
            cancelPermit.lists = [];
            cancelPermit.adminCount = "";
            cancelPermit.totalPage = 0;
            cancelPermit.PageNumber = 1;
            cancelPermit.noDate = "";
            var department;
            var weekdayArr;
            if (cancelPermit.flag == 0) {
                weekdayArr = [
                    {"id": "", "name": "全部"},
                    {"id": "国家发展改革委", "name": "国家发展改革委"},
                    {"id": "教育部", "name": "教育部"},
                    {"id": "科技部", "name": "科技部"},
                    {"id": "工业和信息化部", "name": "工业和信息化部"},
                    {"id": "公安部", "name": "公安部"},
                    {"id": "民政部", "name": "民政部"},
                    {"id": "司法部", "name": "司法部"},
                    {"id": "财政部", "name": "财政部"},
                    {"id": "人力资源社会保障部", "name": "人力资源社会保障部"},
                    {"id": "国土资源部", "name": "国土资源部"},
                    {"id": "环境保护部", "name": "环境保护部"},
                    {"id": "住房城乡建设部", "name": "住房城乡建设部"},
                    {"id": "交通运输部", "name": "交通运输部"},
                    {"id": "省级地方海事机构", "name": "省级地方海事机构"},
                    {"id": "水利部", "name": "水利部"},
                    {"id": "农业部", "name": "农业部"},
                    {"id": "商务部", "name": "商务部"},
                    {"id": "文化部", "name": "文化部"},
                    {"id": "国家卫生计生委", "name": "国家卫生计生委"},
                    {"id": "中国人民银行", "name": "中国人民银行"},
                    {"id": "国务院国资委", "name": "国务院国资委"},
                    {"id": "海关总署", "name": "海关总署"},
                    {"id": "税务机关", "name": "税务机关"},
                    {"id": "税务总局", "name": "税务总局"},
                    {"id": "工商总局", "name": "工商总局"},
                    {"id": "出入境检验检疫机构", "name": "出入境检验检疫机构"},
                    {"id": "质检总局", "name": "质检总局"},
                    {"id": "新闻出版广电总局", "name": "新闻出版广电总局"},
                    {"id": "体育总局", "name": "体育总局"},
                    {"id": "安全监管总局", "name": "安全监管总局"},
                    {"id": "食品药品监管总局", "name": "食品药品监管总局"},
                    {"id": "国家林业局", "name": "国家林业局"},
                    {"id": "国家旅游局", "name": "国家旅游局"},
                    {"id": "中国地震局", "name": "中国地震局"},
                    {"id": "中国气象局", "name": "中国气象局"},
                    {"id": "银监会", "name": "银监会"},
                    {"id": "证监会", "name": "证监会"},
                    {"id": "保监会", "name": "保监会"},
                    {"id": "国家粮食局", "name": "国家粮食局"},
                    {"id": "国家能源局", "name": "国家能源局"},
                    {"id": "国家国防科工局", "name": "国家国防科工局"},
                    {"id": "国家烟草局", "name": "国家烟草局"},
                    {"id": "国家外专局", "name": "国家外专局"},
                    {"id": "国家海洋局", "name": "国家海洋局"},
                    {"id": "国家测绘地信局", "name": "国家测绘地信局"},
                    {"id": "原铁道部", "name": "原铁道部"},
                    {"id": "铁路管理机构", "name": "铁路管理机构"},
                    {"id": "铁路公安机关", "name": "铁路公安机关"},
                    {"id": "国家铁路局", "name": "国家铁路局"},
                    {"id": "中国民航局", "name": "中国民航局"},
                    {"id": "国家邮政局", "name": "国家邮政局"},
                    {"id": "国家文物局", "name": "国家文物局"},
                    {"id": "国家外汇局", "name": "国家外汇局"},
                    {"id": "国家密码局", "name": "国家密码局"}
                ];
                if (document.getElementsByClassName('mobileSelect')[0]) {
                    document.getElementsByClassName('mobileSelect')[0].remove();
                }
                var mobileSelect1 = new MobileSelect({
                    trigger: '#cityTrigger',
                    title: '请选择部门',
                    wheels: [
                        {data: weekdayArr}
                    ],
                    callback: function () {
                    	document.getElementById("cityTrigger").style.color="#474747";
                        department = document.getElementById("cityTrigger").getAttribute("data_id");
                        cancelPermit.search(department);
                    }
                });
                document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
                document.getElementsByClassName("grayLayer")[0].addEventListener('click', function () {
                    department = document.getElementById("cityTrigger").getAttribute("data_id");
                    cancelPermit.search(department);
                });
            } else if (cancelPermit.flag == 1) {
                weekdayArr = [
                    {"id": "", "name": "全部"},
                    {"id": "国家发展改革委", "name": "国家发展改革委"},
                    {"id": "科技部", "name": "科技部"},
                    {"id": "工业和信息化部", "name": "工业和信息化部"},
                    {"id": "公安部", "name": "公安部"},
                    {"id": "司法部", "name": "司法部"},
                    {"id": "财政部", "name": "财政部"},
                    {"id": "国土资源部", "name": "国土资源部"},
                    {"id": "环境保护部", "name": "环境保护部"},
                    {"id": "住房城乡建设部", "name": "住房城乡建设部"},
                    {"id": "交通运输部", "name": "交通运输部"},
                    {"id": "农业部", "name": "农业部"},
                    {"id": "文化部", "name": "文化部"},
                    {"id": "国家卫生计生委", "name": "国家卫生计生委"},
                    {"id": "海关总署", "name": "海关总署"},
                    {"id": "税务机关", "name": "税务机关"},
                    {"id": "税务总局", "name": "税务总局"},
                    {"id": "工商总局", "name": "工商总局"},
                    {"id": "质检总局", "name": "质检总局"},
                    {"id": "新闻出版广电总局", "name": "新闻出版广电总局"},
                    {"id": "体育总局", "name": "体育总局"},
                    {"id": "安全监管总局", "name": "安全监管总局"},
                    {"id": "食品药品监管总局", "name": "食品药品监管总局"},
                    {"id": "国家林业局", "name": "国家林业局"},
                    {"id": "国家知识产权局", "name": "国家知识产权局"},
                    {"id": "国家旅游局", "name": "国家旅游局"},
                    {"id": "国家宗教局", "name": "国家宗教局"},
                    {"id": "中国气象局", "name": "中国气象局"},
                    {"id": "国家能源局", "name": "国家能源局"},
                    {"id": "国家烟草局", "name": "国家烟草局"},
                    {"id": "国家外专局", "name": "国家外专局"},
                    {"id": "国家海洋局", "name": "国家海洋局"},
                    {"id": "中国民航局", "name": "中国民航局"},
                    {"id": "国家邮政局", "name": "国家邮政局"},
                    {"id": "国家文物局", "name": "国家文物局"}
                ];
                if (document.getElementsByClassName('mobileSelect')[0]) {
                    document.getElementsByClassName('mobileSelect')[0].remove();
                }
                var mobileSelect1 = new MobileSelect({
                    trigger: '#cityTrigger',
                    title: '请选择部门',
                    wheels: [
                        {data: weekdayArr}
                    ],
                    callback: function () {
                        department = document.getElementById("cityTrigger").getAttribute("data_id");
                        cancelPermit.getAdminSearch(department);
                    }
                });
                document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
                document.getElementsByClassName("grayLayer")[0].addEventListener('click', function () {
                    department = document.getElementById("cityTrigger").getAttribute("data_id");
                    cancelPermit.getAdminSearch(department);
                });
            }
        },
        upDown: function () {
            cancelPermit.Exhibition = cancelPermit.Exhibition == true ? cancelPermit.Exhibition = false : cancelPermit.Exhibition = true;
        },
        back: function () {
            window.location.href = "/adminCancelPermit?page=adminCancelPermit&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        },
        getSearch: function () {
            cancelPermit.lists = [];
            cancelPermit.adminCount = "";
            cancelPermit.PageNumber = 1;
            var department = document.getElementById("cityTrigger").getAttribute("data_id");
            if (cancelPermit.flag == 0) {
                cancelPermit.search(department);
            } else if (cancelPermit.flag == 1) {
                cancelPermit.getAdminSearch(department);
            }
        },
        guoWYTitle: function () {
            var guoWY = document.getElementsByClassName("cancelTitle");
            for (var i = 0; i < guoWY.length; i++) {
                guoWY[i].onclick = function () {
                    for (var j = 0; j < guoWY.length; j++) {
                        guoWY[j].classList.remove("active");
                    }
                    this.classList.add('active');
                    var underLine = document.getElementsByClassName("under-line")[0];
                    var left = this.offsetLeft + this.offsetWidth / 2 - underLine.offsetWidth - 2;
                    underLine.style.left = left + "px";
                }
            }
        },
        getAdminSearch: function (departmentList) {
            cancelPermit.isCanScroll = false;
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                department: departmentList || "",//部门（默认值为空，即全部）
                pageNo: cancelPermit.PageNumber,//页码
                searchContent: cancelPermit.addminPlace.trim() || ""//查询条件
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: '/cancelPermit/cancelPermitPublic',
                data: JSON.stringify(parameters),
                async: true,
                contentType: 'application/json'
            }).then(function (res) {
                cancelPermit.dialogMask = "";//查询动画
                if (res.data.responseBody.data) {
                    cancelPermit.maskFn("无更多数据");
                    return;
                }
                if (res.data.retCode == "000000") {
                    if (res.data.responseBody.list != 0) {
                        var list = res.data.responseBody.list;
                        for (var i = 0; i < list.length; i++) {
                            cancelPermit.lists.push(list[i]);
                        }
                        ;
                        cancelPermit.adminCount = res.data.responseBody.count;
                        cancelPermit.totalPage = Math.ceil(res.data.responseBody.count / list.length);
                        if (cancelPermit.PageNumber >= cancelPermit.totalPage) {
                            cancelPermit.searchBarFixed = false;
                            cancelPermit.dialogMask = "";//查询动画
                        } else {
                            cancelPermit.searchBarFixed = true;
                            cancelPermit.isCanScroll = true;
                            cancelPermit.dialogMask = "";//查询动画
                        }
                        ;
                        cancelPermit.noDate = "";
                        cancelPermit.dialogMask = "";////查询动画
                        cancelPermit.flag = 1;
                    } else {
                        cancelPermit.lists = [];
                        cancelPermit.isCanScroll = false;
                        cancelPermit.adminCount = "0";
                        cancelPermit.noDate = "暂无查询结果";
                        cancelPermit.dialogMask = "";//查询动画
                        cancelPermit.flag = 1;
                    }

                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        administration: function (ind) {
            cancelPermit.lists = [];
            cancelPermit.adminCount = "";
            cancelPermit.PageNumber = 1;
            cancelPermit.totalPage = 0;
            var department = document.getElementById("cityTrigger").getAttribute("data_id");
            if (ind == "0") {
                cancelPermit.search(department);
            } else if (ind == "1") {
                cancelPermit.getAdminSearch(department);
            }
        },
        project: function (projectCancel, projectName, projectDepartment) {
            cancelPermit.maskProject = true;
            cancelPermit.projectCancel = projectCancel;
            cancelPermit.projectName = projectName;
            cancelPermit.projectDepartment = projectDepartment;
            document.getElementById("cancelPermit").style.position = "fixed";
        },
        close: function () {
            cancelPermit.maskProject = "";
            cancelPermit.projectCancel = "";
            cancelPermit.projectName = "";
            cancelPermit.projectDepartment = "";
            document.getElementById("cancelPermit").style.position = "static";
        }
    }

})