var v = new Vue({
    el: "#haiNanTourism",
    data: {
        masktime: "",
        pageNum: 1,
        pagesize: 8,
        isCanScroll: true,
        searchBarFixed: true,
        pagetotal: "",
        keyword: '',
        list: [],
        typeList: [
            {id: "99", name: "全部"},
            {id: "1", name: "滨海旅游"},
            {id: "2", name: "热带雨林旅游"},
            {id: "3", name: "民俗文化旅游"},
            {id: "4", name: "商务会展旅游"},
            {id: "5", name: "红色旅游"},
            {id: "6", name: "温泉SPA旅游"},
            {id: "7", name: "邮轮游艇旅游"},
            {id: "8", name: "海洋旅游"},
            {id: "9", name: "潜水"},
            {id: "10", name: "高尔夫旅游"},
            {id: "11", name: "乡村旅游"},
            {id: "12", name: "自助旅游"}
        ],
        regionList: [
            {id: "99", name: "不限"},
            {id: "5", name: "海口"},
            {id: "3", name: "三亚"},
            {id: "6", name: "琼海"},
            {id: "8", name: "文昌"},
            {id: "7", name: "万宁"},
            {id: "9", name: "定安"},
            {id: "10", name: "昌江"},
            {id: "11", name: "屯昌"},
            {id: "12", name: "琼中"},
            {id: "13", name: "五指山"},
            {id: "14", name: "临高"},
            {id: "15", name: "儋州"},
            {id: "16", name: "澄迈"},
            {id: "17", name: "保亭"},
            {id: "18", name: "乐东"},
            {id: "19", name: "白沙"},
            {id: "20", name: "东方"},
            {id: "21", name: "陵水"},
        ],
        peopleList: [
            {id: "99", name: "全部"},
            {id: "1", name: "老年家庭"},
            {id: "2", name: "情侣"},
            {id: "3", name: "商务"},
            {id: "4", name: "朋友"},
            {id: "5", name: "个人"},
        ],
        priceList: [
            {id: "99", name: "全部"},
            {id: "1", name: "50元以下"},
            {id: "2", name: "50元至100元"},
            {id: "3", name: "100元以上"},
        ],
        gradeList: [
            {id: "99", name: "全部"},
            {id: "128", name: "AAAAA级"},
            {id: "127", name: "AAAA级"},
            {id: "126", name: "AAA级"},
            {id: "125", name: "AA级"},
            {id: "124", name: "A级"},
            {id: "123", name: "非A级"},
        ],
        showResult: false
    },
    mounted: function () {
        window.addEventListener('resize', this.fnSize, false)
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        typeSelect: function () {
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: '#type',
                title: '选择状态',
                wheels: [
                    {data: v.typeList}
                ],
                callback: function () {
					document.getElementById("type").style.color="#474747";
                }
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        regionSelect: function () {
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: '#region',
                title: '选择状态',
                wheels: [
                    {data: v.regionList}
                ],
                callback: function () {
					document.getElementById("region").style.color="#474747";
                }
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        gradeSelect: function () {
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: '#grade',
                title: '选择状态',
                wheels: [
                    {data: v.gradeList}
                ],
                callback: function () {
					document.getElementById("grade").style.color="#474747";
                }
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        priceSelect: function () {
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: '#price',
                title: '选择状态',
                wheels: [
                    {data: v.priceList}
                ],
                callback: function () {
					document.getElementById("price").style.color="#474747";
                }
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        maskFn: function (mgs) {
            v.masktime = mgs;
            setTimeout(function () {
                v.masktime = "";
            }, 1500);
            return;

        },
        search: function () {
            if (!v.keyword) {
                v.maskFn("请输入景区");
                return;
            }
            v.pageNum = 1;
            v.list = [];
            v.searchBarFixed = true;
            v.isCanScroll = true;
            v.dialogMask = true;
            v.getSearch();
        },
        getSearch: function () {
            v.isCanScroll = false;
            if (v.searchBarFixed) {
                v.searchBarFixed = false;
                var Price_down = '', Price_up = '';
                var price = document.getElementById("price").getAttribute("data_id")
                if (price == "1") {
                    Price_down = "0"
                    Price_up = "50"
                } else if (price == "2") {
                    Price_down = "50"
                    Price_up = "100"
                } else if (price == "3") {
                    Price_down = "100"
                }
                var parameters = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    page: v.pageNum,//页码
                    pagesize: v.pagesize,//页码
                    Theme: document.getElementById("type").textContent == "全部" ? "" : document.getElementById("type").textContent,
                    // crowd: document.getElementById("people").textContent == "全部"?"":document.getElementById("people").textContent,
                    ScenicLevel: document.getElementById("grade").textContent == "全部" ? "" : document.getElementById("grade").getAttribute("data_id"),
                    Price_down: Price_down,
                    Price_up: Price_up,
                    organID: document.getElementById("region").getAttribute("data_id") == '99' ? '' : document.getElementById("region").getAttribute("data_id"),
                    RelatedWords: v.keyword//
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: "post",
                    url: '/haiNanTourism/search',
                    data: JSON.stringify(parameters),
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        var lists = res.data.responseBody.rows || [];
                        for (var i = 0; i < lists.length; i++) {
                            v.list.push(lists[i]);
                        }
                        v.pagetotal = res.data.responseBody.total;//总页数
                        if (v.pageNum >= res.data.responseBody.total) {
                            v.searchBarFixed = false;
                        } else {
                            v.isCanScroll = true;
                            v.searchBarFixed = true;
                        }
                    }
                    v.showResult = true;
                    document.getElementById("searchResult").style.display = 'block'
                }).catch(function (err) {
                    console.log(err)
                })
            }
        },
        handleScroll: function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var bodyHeight = document.body.clientHeight;
            var clientHeight = document.documentElement.clientHeight;//可视区高度
            if (scrollTop + clientHeight + 20 > bodyHeight) {
                if (v.isCanScroll) {
                    v.pageNum++;
                    this.getSearch();
                }
            }
        }
    }
})