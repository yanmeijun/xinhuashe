var scount = "";
var v = new Vue({
    el: "#exportTax",
    data: {
        masktime: "",
        Commoditycode: "",//商品代码
        Commodityname: "",//商品名称
        pageNum: 1,
        isCanScroll: true,
        searchBarFixed: true,
        noDate: false,//查询无数据时的显示
        errorImg: "",
        dataMgs: false,
        list: [],
        pagetotal: "",
        dialogMask: ""

    },
    mounted: function () {
        window.addEventListener('resize', this.fnSize, false)
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        /*
         *输入不正确的查询语句提示语
         */
        maskFn: function (mgs) {
            v.masktime = mgs;
            setTimeout(function () {
                v.masktime = "";
            }, 1500);
            return;

        },
        search: function () {
            var Commoditycode = v.Commoditycode;//商品代码
            var Commodityname = v.Commodityname;//商品名称
            if (!Commoditycode && !Commodityname) {
                v.maskFn("请输入商品代码或商品名称");
                return;
            }
            v.pageNum = 1;
            v.list = [];
            v.searchBarFixed = true;
            v.isCanScroll = true;
            v.noDate = false;
            v.errorImg = "";
            v.dialogMask = true;
            v.getSearch();
        },
        getSearch: function () {
            v.isCanScroll = false;
            if (v.searchBarFixed) {
                v.searchBarFixed = false;
                var parameters = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,
                    localFrom:localFrom,
                    local_y: local_y,
                    pageNum: v.pageNum,//页码
                    spmc: v.Commodityname,//商品名称
                    spdm: v.Commoditycode,//商品代码
                    scount:scount++
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: "post",
                    url: '/exportTax/exportTaxSearchs',
                    data: JSON.stringify(parameters),
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        var lists = res.data.responseBody.list;
                        for (var i = 0; i < lists.length; i++) {
                            v.list.push(lists[i]);
                        }
                        v.pagetotal = res.data.responseBody.totalNumber;//总页数
                        if (v.pageNum >= res.data.responseBody.totalPage) {
                            v.searchBarFixed = false;
                        } else {
                            v.isCanScroll = true;
                            v.searchBarFixed = true;
                        }
                        v.dataMgs = true;
                        v.noDate = false;
                        v.dialogMask = "";
                    } else if(res.data.errorCode == "999999"){
                        v.dialogMask = "";
                        v.noDate = true;
                        v.dataMgs = false;
                        v.errorImg = "网络异常，请再次请求";
                        return;
                    } else {
                        v.dialogMask = "";
                        v.noDate = true;
                        v.dataMgs = false;
                        v.errorImg = "没有查询到结果";
                        return;
                    }
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
        },
        focus: function () {
            v.Commoditycode = "";
        },
        focu: function () {
            v.Commodityname = "";
        }
    }
})