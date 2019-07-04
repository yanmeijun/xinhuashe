var result = JSON.parse(localStorage.getItem("Results"));//获取结果
var queryVue = new Vue({
    data: {
        resultData: [],
        PageNumber: 1,
        isCanScroll: true,
        totalNum: 0,
        searchBarFixed: true,
        totalPage: '',
        dialogMask: ""
    },
    mounted: function () {
        this.resultData = result;
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        back() {//返回按钮
            localStorage.removeItem("Results");
            var url = "/touristAttraction5A?page=touristAttraction5A&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
            window.location.href = url;
        },
        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var bodyHeight = document.body.clientHeight;
            var clientHeight = document.documentElement.clientHeight;//可视区高度
            if (scrollTop + clientHeight + 20 > bodyHeight) {
                if (this.isCanScroll) {
                    this.isCanScroll = false;
                    this.PageNumber++;
                    this.dialogMask = true;
                    this.getDate();
                }
            }
        },
        getDate() {
            if (queryVue.searchBarFixed) {
                queryVue.searchBarFixed = false;
                var parameters = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    searchword2: queryVue.searchword,//用户名
                    AADDRESS: queryVue.aaddress,//选择的地区名称
                    AYEAR: queryVue.ayear,//验证码
                    page: queryVue.PageNumber
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: "post",
                    url: "/touristAttraction5A/touristAttractionSearch",
                    data: JSON.stringify(parameters),
                    contentType: 'application/json'
                }).then(res=> {
                    queryVue.dialogMask = "";
                    if (res.data.retCode == "000000") {
                        // this.totalNum=res.data.data.totalNumber;
                        queryVue.totalPage = res.data.responseBody.data[res.data.responseBody.data.length - 1].split(':')[1];
                        var arr = res.data.responseBody.data
                        for (k in arr) {
                            queryVue.resultData.push(arr[k])
                        }
                        if (queryVue.PageNumber >= queryVue.totalPage) {
                            queryVue.searchBarFixed = false;
                        } else {
                            queryVue.searchBarFixed = true;
                            queryVue.isCanScroll = true;
                        }
                        queryVue.dialogMask = "";
                    } else {
                    }
                }).catch(err=> {
                    console.log(err)
                })
            }
        }
    }

}).$mount("#maxapp")