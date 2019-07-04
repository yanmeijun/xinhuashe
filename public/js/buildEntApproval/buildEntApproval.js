var v = new Vue({
    el: "#buildEntApproval",
    data: {
        dataList: [],
        dataCount: 0,
        ifShow: -1,
        masktimeFalse: false,
        masktime: "",
        noResults: false,
        ifShowImg: "/images/icon-downMenu.png",
        pageNo: 1,
        isCanScroll: true,
        sendBefore: false,
        detailInfo:{}
    },
    mounted: function () {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll: function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var bodyHeight = document.body.clientHeight;
            var clientHeight = document.documentElement.clientHeight;//可视区高度
            if (scrollTop + clientHeight + 20 > bodyHeight) {
                if (!v.isCanScroll) {
                    v.isCanScroll = true;
                    v.pageNo++;
                    v.search();
                }
            }
        },
        showHide: function (index,number) {
            var params = {
                randomKey: randomKey, userID: userID, clientID: clientID, cityID: cityID,
                local_x: local_x ,localFrom:localFrom, local_y: local_y,
                ZSBH: number
            };
            if(v.dataList[index].ifShowImg == "/images/icon-downMenu.png"){
                v.sendBefore = true;
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: "/buildEntApproval/detail",
                    data: JSON.stringify(params),
                    contentType: 'application/json'
                }).then(function (res) {
                    v.sendBefore = false;
                    v.noResults = false;
                    if (res.data.retCode == "000000") {
                        v.detailInfo = res.data.responseBody;
                    } else {
                        v.noResults = true;
                    }
                }).catch(function (err) {
                    console.log(err)
                });
            }
            if (v.ifShow == index) {
                v.ifShow = -1;
            } else {
                v.ifShow = index;
            }
            if (v.dataList[index].ifShowImg == "/images/icon-downMenu.png" || v.dataList[index].ifShowImg==undefined) {
                v.dataList[index] = Object.assign({}, v.dataList[index], {ifShowImg: "/images/icon-upMenu.png"});
                this.$set(v.dataList, index, v.dataList[index]);
            } else {
                v.dataList[index] = Object.assign({}, v.dataList[index], {ifShowImg: "/images/icon-downMenu.png"});
                this.$set(v.dataList, index, v.dataList[index]);
            }

        },
        search: function () {
            var filter_LIKE_QYMC = v.$refs.entName.value.replace(/\s/g, "");
            if (!filter_LIKE_QYMC) {
                v.masktimeFalse = true;
                v.masktime = "请输入企业名称！";
                setTimeout(function () {
                    v.masktimeFalse = false;
                }, 1500);
                return;
            }
            v.sendBefore = true;
            var params = {
                randomKey: randomKey, userID: userID, clientID: clientID, cityID: cityID,
                local_x: local_x ,localFrom:localFrom, local_y: local_y, filter_LIKE_QYMC: filter_LIKE_QYMC,
                currentPage: v.pageNo
            }
            if (v.pageNo <= 1) {
                v.dataList = [];
                v.dataCount = 0;
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: "/buildEntApproval/buildEntApproval",
                data: JSON.stringify(params),
                contentType: 'application/json'
            }).then(function (res) {
                v.sendBefore = false;
                v.noResults = false;
                if (res.data.retCode == "000000") {
                    var dataList = res.data.list;
                    for (var k in dataList) {
                        v.dataList.push(dataList[k]);
                        v.dataList[k] = Object.assign({}, v.dataList[k], {ifShowImg: "/images/icon-downMenu.png"});
                        v.$set(v.dataList, k, v.dataList[k]);
                    }
                    v.isCanScroll = false;
                    if (v.dataList.length > 0) {
                        v.dataCount = res.data.total || res.data.list.length;
                    } else {
                        v.noResults = true;
                    }
                    if (Number(res.data.page) >= Number(res.data.totalPages)) {
                        v.isCanScroll = true;
                    }
                } else {
                    v.noResults = true;
                }
            }).catch(function (err) {
                console.log(err)
            })
        }
    },
    watch: {
        dataList(curVal, oldVal) {
            //console.log(curVal)
        }
    }
})