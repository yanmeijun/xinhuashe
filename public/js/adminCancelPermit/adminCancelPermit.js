var adminCanel = new Vue({
    el: "#adminCancelPermit",
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
        // citysrc: citySRC || "",
        noDate: "",
        masktime: ""
    },
    created: function () {

    },
    mounted: function () {
        this.dialogMask = true;
        this.Exhibition = true;
        this.fnSize();
        window.addEventListener('resize', this.fnSize, false);
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
                if (adminCanel.isCanScroll) {
                    adminCanel.PageNumber++;
                    adminCanel.dialogMask = true;
                    adminCanel.search(department);
                }
            }
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
                url: '/adminCancelPermit/adminCancelPermitSearch',
                data: JSON.stringify(parameters),
                async: true,
                contentType: 'application/json'
            }).then(function (res) {
                adminCanel.dialogMask = "";//查询动画
                if (res.data.responseBody.data) {
                    adminCanel.maskFn("无更多数据");
                    return;
                }
                if (res.data.retCode == "000000") {
                    if (res.data.responseBody.list != 0) {
                        var list = res.data.responseBody.list;
                        for (var i = 0; i < list.length; i++) {
                            adminCanel.lists.push(list[i]);
                        }
                        if (departmentList == undefined || departmentList == "") {
                            adminCanel.adminCount = res.data.responseBody.maxNumber;
                        } else {
                            adminCanel.adminCount = res.data.responseBody.count;
                        }

                        adminCanel.totalPage = Math.ceil(res.data.responseBody.count / list.length);
                        if (adminCanel.PageNumber >= adminCanel.totalPage) {
                            adminCanel.searchBarFixed = false;
                            adminCanel.dialogMask = "";////查询动画
                        } else {
                            adminCanel.searchBarFixed = true;
                            adminCanel.isCanScroll = true;
                        }
                        ;
                        adminCanel.noDate = "";
                        adminCanel.dialogMask = "";////查询动画
                    } else {
                        adminCanel.isCanScroll = false;
                        adminCanel.adminCount = "0";
                        adminCanel.noDate = "暂无查询结果";
                        adminCanel.dialogMask = "";//查询动画
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
            adminCanel.lists = [];
            adminCanel.adminCount = "";
            adminCanel.totalPage = 0;
            adminCanel.PageNumber = 1;
            adminCanel.noDate = "";
            var department;
            var weekdayArr = [
                {"id": "", "name": "全部"},
                {"id": "住房城乡建设部", "name": "住房城乡建设部"},
                {"id": "税务总局", "name": "税务总局"},
                {"id": "质检总局", "name": "质检总局"},
                {"id": "国土资源部", "name": "国土资源部"},
                {"id": "商务部", "name": "商务部"},
                {"id": "财政部", "name": "财政部"},
                {"id": "国务院国资委", "name": "国务院国资委"},
                {"id": "中国冶金建设协会", "name": "中国冶金建设协会"},
                {"id": "水利部", "name": "水利部"},
                {"id": "中国商业联合会", "name": "中国商业联合会"},
                {"id": "交通运输部", "name": "交通运输部"},
                {"id": "中国拍卖行业协会", "name": "中国拍卖行业协会"},
                {"id": "中国机械工业质量管理协会", "name": "中国机械工业质量管理协会"},
                {"id": "中国机械工业标准化技术协会", "name": "中国机械工业标准化技术协会"},
                {"id": "证监会", "name": "证监会"},
                {"id": "保监会", "name": "保监会"},
                {"id": "国家发展改革委", "name": "国家发展改革委"},
                {"id": "审计署", "name": "审计署"},
                {"id": "国家知识产权局", "name": "国家知识产权局"},
                {"id": "原由中国人民银行中国金融教育发展基金会实施", "name": "原由中国人民银行中国金融教育发展基金会实施"},
                {"id": "国家粮食局", "name": "国家粮食局"},
                {"id": "工业和信息化部", "name": "工业和信息化部"},
                {"id": "农业部", "name": "农业部"},
                {"id": "国家卫生计生委", "name": "国家卫生计生委"},
                {"id": "安全监管总局", "name": "安全监管总局"},
                {"id": "国家林业局", "name": "国家林业局"},
                {"id": "国家烟草局", "name": "国家烟草局"},
                {"id": "中国民航局", "name": "中国民航局"},
                {"id": "中国煤炭建设协会", "name": "中国煤炭建设协会"},
                {"id": "中国物流与采购联合会", "name": "中国物流与采购联合会"},
                {"id": "中国石油和化学工业联合会", "name": "中国石油和化学工业联合会"},
                {"id": "中国有色金属工业协会", "name": "中国有色金属工业协会"},
                {"id": "中国轻工业联合会", "name": "中国轻工业联合会"},
                {"id": "民政部", "name": "民政部"},
                {"id": "国家铁路局", "name": "国家铁路局"},
                {"id": "文化部", "name": "文化部"},
                {"id": "中国机械工业联合会", "name": "中国机械工业联合会"},
                {"id": "国家文物局", "name": "国家文物局"},
                {"id": "中国人民银行", "name": "中国人民银行"},
                {"id": "中国铸造协会", "name": "中国铸造协会"},
                {"id": "中国汽车工业协会", "name": "中国汽车工业协会"},
                {"id": "中国钢铁工业协会", "name": "中国钢铁工业协会"},
                {"id": "中国电力建设企业协会", "name": "中国电力建设企业协会"},
                {"id": "中国企业国有产权交易机构协会", "name": "中国企业国有产权交易机构协会"},
                {"id": "工商总局", "name": "工商总局"},
                {"id": "中国气象局", "name": "中国气象局"},
                {"id": "中国铁路总公司", "name": "中国铁路总公司"},
                {"id": "人力资源社会保障部", "name": "人力资源社会保障部"},
                {"id": "新闻出版广电总局", "name": "新闻出版广电总局"},
                {"id": "中国地震局", "name": "中国地震局"},
                {"id": "中国纺织工业联合会", "name": "中国纺织工业联合会"},
                {"id": "中国石油化工集团公司", "name": "中国石油化工集团公司"},
                {"id": "国家旅游局", "name": "国家旅游局"},
                {"id": "中国企业联合会", "name": "中国企业联合会"},
                {"id": "中国船舶工业集团公司", "name": "中国船舶工业集团公司"},
                {"id": "农业部、中国轻工业联合会", "name": "农业部、中国轻工业联合会"},
                {"id": "国家中医药局", "name": "国家中医药局"},
                {"id": "供销合作总社", "name": "供销合作总社"},
                {"id": "中国石油天然气集团公司", "name": "中国石油天然气集团公司"},
                {"id": "中国盐业总公司", "name": "中国盐业总公司"},
                {"id": "中国建筑材料联合会", "name": "中国建筑材料联合会"},
                {"id": "农业部、供销合作总社", "name": "农业部、供销合作总社"},
                {"id": "国家海洋局", "name": "国家海洋局"},
                {"id": "中国电力企业联合会", "name": "中国电力企业联合会"},
                {"id": "海关总署", "name": "海关总署"}
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
                    adminCanel.search(department);
                    document.getElementById("cityTrigger").style.color="#474747";
                }
            });
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
            document.getElementsByClassName("grayLayer")[0].addEventListener('click', function () {
                department = document.getElementById("cityTrigger").getAttribute("data_id");
                adminCanel.search(department);
            });
        },
        upDown: function () {
            adminCanel.Exhibition = adminCanel.Exhibition == true ? adminCanel.Exhibition = false : adminCanel.Exhibition = true;
        },
        back: function () {
            window.location.href = "/adminCancelPermit?page=adminCancelPermit&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        },
        /*
         *输入不正确的查询语句提示语
         */
        maskFn: function (mgs) {
            adminCanel.masktime = mgs;
            setTimeout(function () {
                adminCanel.masktime = "";
            }, 1500);
            return;

        },
        getSearch: function () {
            adminCanel.lists = [];
            adminCanel.adminCount = "";
            adminCanel.PageNumber = 1;
            adminCanel.noDate = "";
            var department = document.getElementById("cityTrigger").getAttribute("data_id");
            adminCanel.search(department)
        }
//                guoWYTitle(){
//                    var guoWY = document.getElementsByClassName("guoWYTitle");
//                    for(var i=0;i<guoWY.length;i++){
//                        guoWY[i].onclick=function(){
//                            for(var j=0;j<guoWY.length;j++){
//                                guoWY[j].classList.remove("active");
//							}
//                            adminCanel.classList.add('active');
//						}
//					}
//				},
//                getDate(ind){
//                    if(adminCanel.index==ind){
//                        adminCanel.PageNumber=1;
//                        adminCanel.addminPlace=""
//                        adminCanel.search();
//                    }
//                }
    }

})