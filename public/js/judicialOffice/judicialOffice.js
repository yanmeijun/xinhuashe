var v = new Vue({
    el: '#max',
    data: {
        txtName: '',
        txtPlace: '',
        searchBarFixed: true,
        masktime: "",
        list: [],
        totalPage: '',
        isCanScroll: true,
        page: 1,
        noResult: false,
        dialogMask:false
    },
    mounted: function () {
        this.getNext()
    },
    methods: {
        getData: function () {
            v.dialogMask = true;
            if (this.searchBarFixed) {
                this.searchBarFixed = false;
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,
                    localFrom:localFrom,
                    local_y: local_y,
                    Xzqh:this.txtPlace.replace(/'/g,""),
                    PageIndex:this.page,
                    Query:this.txtName.trim()
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/judicialOffice/search',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    v.dialogMask = false;
                    if (res.data.retCode == "000000") {
                        var dataArr = JSON.parse(res.data.responseBody.data);
                        if (dataArr.list.length == 0) {
                            v.list = [];
                            v.totalPage = "0";
                            v.noResult = true;
                        } else {
                            v.noResult = false;
                            v.list = v.list.concat(dataArr.list);
                            v.totalPage = dataArr.totalPage;
                        }
                    } else {
                        v.list = [];
                        v.totalPage = "0";
                        v.noResult = true;
                    }
                    v.searchBarFixed = true;
                    v.isCanScroll = true;
                }).catch(function (err) {
                    v.list = [];
                    v.dialogMask = false;
                    v.maskFn("通信错误");
                    v.totalPage = "0";
                    v.noResult = true;
                    v.searchBarFixed = true;
                })

            }
        },
        search: function () {
            v.page = 1;
            v.list = [];
            v.searchBarFixed = true;
            v.isCanScroll = true;
            v.getData();
        },
        maskFn: function (mgs) {
            this.masktime = mgs;
            setTimeout(function () {
                v.masktime = "";
            }, 1500);
            return;
            this.searchBarFixed = true;
        },
        handleScroll: function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var bodyHeight = document.body.clientHeight;
            var clientHeight = document.documentElement.clientHeight;//可视区高度
            if (scrollTop + clientHeight + 20 > bodyHeight) {
                if (v.isCanScroll) {
                    v.isCanScroll = false;
                    v.page++;
                    if (this.page >Math.ceil(this.totalPage/9)) {
                        // this.maskFn("已加载完毕")
                        return;
                    }
                    v.getData();
                }
            }
        },
        getNext: function () {
            this.list = [];
            this.isCanScroll = false;
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,
                localFrom:localFrom,
                local_y: local_y,
                Xzqh:this.txtPlace,
                PageIndex:this.page,
                Query:this.txtName
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: '/judicialOffice/search',
                data: data,
                contentType: 'application/json'
            }).then(function (res) {
                if (res.data.retCode == "000000") {
                    var dataArr = JSON.parse(res.data.responseBody.data);
                    if (dataArr.list.length == 0) {
                        v.list = [];
                        v.totalPage = "0"
                    } else {
                        v.page += 1;
                        var newList = v.list.concat(dataArr.list);
                        v.list = newList;
                        v.totalPage = dataArr.totalPage;
                    }
                } else {
                    v.list = [];
                    v.totalPage = "0";
                    v.page = 0;
                }
                v.isCanScroll = true;
            }).catch(function (err) {
                v.list = [];
                v.maskFn("通信错误");
                v.totalPage = "0";
                v.isCanScroll = true;
            })
        },
        getCode: function () {
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: '/judicialOffice/getCode',
                data: data,
                contentType: 'application/json'
            }).then(function (res) {
                if ( res.data.retCode == "000000") {
                    var weekdayArr = JSON.parse(res.data.responseBody.data).list;
                    if (document.getElementsByClassName('mobileSelect')[0]) {
                        document.getElementsByClassName('mobileSelect')[0].remove();
                    }
                    var mobileSelect1 = new MobileSelect({
                        trigger: '#cityTrigger',
                        title: '请选择地区',
                        wheels: [
                            {data: weekdayArr}
                        ],
                        callback: function () {
                            v.txtPlace = document.getElementById("cityTrigger").getAttribute("data_id");
                            document.getElementById("cityTrigger").style.color="#474747";
                        }
                    });
                    document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
                } else {

                }
            }).catch(function (err) {
                v.maskFn("通信错误");

            })
        }
    },
    created: function () {
        window.addEventListener('scroll', this.handleScroll);
    }
})

