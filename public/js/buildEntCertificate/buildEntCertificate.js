var v = new Vue({
    el: "#buildEntCertificate",
    data: {
        dataList: [],
        dataCount: 0,
        ifShow: -1,
        masktimeFalse: false,
        masktime: "",
        noResults: false,
        pageNo: 1,
        isCanScroll: true,
        isCanRequest: false,
        sendBefore: false
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
        search: function () {
            var filter_LIKE_QYMC = v.$refs.entName.value.replace(/\s/g, ""),
                filter_LIKE_YYZZZCH = v.$refs.YYZZZCH.value.replace(/\s/g, ""),
                filter_LIKE_ZSBH = v.$refs.ZSBH.value.replace(/\s/g, ""),
                filter_LIKE_XXDZ = v.$refs.XXDZ.value.replace(/\s/g, "");
            if (!filter_LIKE_QYMC && !filter_LIKE_YYZZZCH && !filter_LIKE_ZSBH && !filter_LIKE_XXDZ) {
                v.masktimeFalse = true;
                v.masktime = "请输入查询内容！";
                setTimeout(function () {
                    v.masktimeFalse = false;
                }, 1500);
                return;
            }
            v.sendBefore = true;
            var params = {
                randomKey: randomKey, userID: userID, clientID: clientID, cityID: cityID,
                local_x: local_x ,localFrom:localFrom, local_y: local_y, filter_LIKE_QYMC: filter_LIKE_QYMC,
                filter_LIKE_YYZZZCH: filter_LIKE_YYZZZCH, filter_LIKE_ZSBH: filter_LIKE_ZSBH,
                filter_LIKE_XXDZ: filter_LIKE_XXDZ, currentPage: v.pageNo
            };
            if (v.pageNo <= 1) {
                v.dataList = [];
                v.dataCount = 0;
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: "/buildEntCertificate/buildEntCertificate",
                data: JSON.stringify(params),
                contentType: 'application/json'
            }).then(function (res) {
                v.noResults = false;
                v.sendBefore = false;
                if (res.data.retCode == "000000") {
                    var dataList = res.data.list;
                    for (var k in dataList) {
                        v.dataList.push(dataList[k])
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
        },
        detail: function (certificateNo) {
            window.location.href = "/buildEntCertificate/certificateDetail?randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y
                + "&ZSBH=" + certificateNo;
        }
    }
})