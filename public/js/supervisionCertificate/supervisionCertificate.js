var supervisionVue = new Vue({
    el: "#supervisionCertificate",
    data: {
        citySRC: citySRC || "/images/banner.png",
        dataList: [],
        dataCount: 0,
        ifShow: -1,
        masktimeFalse: "",
        masktime: "",
        noResults: false,
        pageNo: 1,
        isCanScroll: true,
        sendBefore: false
    },
    mounted: function () {
        this.masktimeFalse = false;
        this.masktimeFalse = false;
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll: function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var bodyHeight = document.body.clientHeight;
            var clientHeight = document.documentElement.clientHeight;//可视区高度
            if (scrollTop + clientHeight + 20 > bodyHeight) {
                if (this.isCanScroll) {
                    this.pageNo++;
                    this.search();
                }
            }
        },
        search: function () {
            supervisionVue.isCanScroll = false;
            var filter_LIKE_QYMC = this.$refs.entName.value.replace(/\s/g, ""),
                filter_LIKE_YYZZZCH = this.$refs.YYZZZCH.value.replace(/\s/g, "");
            if (!filter_LIKE_QYMC && !filter_LIKE_YYZZZCH) {
                supervisionVue.masktimeFalse = true;
                supervisionVue.masktime = "请输入查询内容！";
                setTimeout(function () {
                    supervisionVue.masktimeFalse = false;
                }, 1500);
                return;
            }
            supervisionVue.sendBefore = true;
            var params = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                filter_LIKE_QYMC: filter_LIKE_QYMC,
                filter_LIKE_YYZZZCH: filter_LIKE_YYZZZCH,
                currentPage: supervisionVue.pageNo
            };
            if (supervisionVue.pageNo <= 1) {
                supervisionVue.dataList = [];
                supervisionVue.dataCount = 0;
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: "/supervisionCertificate/supervisionCertificate",
                data: JSON.stringify(params),
                contentType: 'application/json'
            }).then(function (res) {
                supervisionVue.noResults = false;
                supervisionVue.sendBefore = false;
                if (res.data.retCode == "000000") {
                    var dataList = res.data.data;
                    for (var k in dataList) {
                        supervisionVue.dataList.push(dataList[k])
                    }
                    if (supervisionVue.dataList.length > 0) {
                        supervisionVue.dataCount = res.data.total || res.data.data.length;
                    } else {
                        supervisionVue.noResults = true;
                    }
                    if (Number(res.data.page) < Number(res.data.totalPages)) {
                        supervisionVue.isCanScroll = true;
                    }
                } else {
                    supervisionVue.noResults = true;
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        detail: function (certificateNo) {
            window.location.href = "/supervisionCertificate/certificateDetail?randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y
                + "&ZZZSBH=" + certificateNo;
        }
    }
})