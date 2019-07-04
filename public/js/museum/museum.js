new Vue({
    el: "#onlineBookingSelection",
    data: {
        dateList: []
    },
    mounted: function () {
        this.getDateList()
    },
    methods: {
        getDateList: function () {
            const parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/museum/dateList',
                data: parameters,
                contentType: 'application/json'
            }).then(res=> {
                if (res.data.rtnCode == "000000") {
                    res.data.data.forEach((item)=> {
                        if (item.zt == '本日闭馆' || item.zt.indexOf("可预约0张") > -1) {
                            item.ifCanBook = true;
                        }
                    })
                    this.dateList = res.data.data;
                } else {
                }
            }).catch(err=> {
                console.log(err)
            })
        },
        toNextPage(param) {
            window.location.href = "/museum?page=onlineBooking&param=" + param + "&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        },
        returnPage: function () {
            window.location.href = "/museum?page=museum&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y
        }
    }

});
new Vue({
    el: "#onlineBooking",
    data: {
        imageSrc: "/image?action=museum&randomKey=" + randomKey + "&" + new Date().getTime()
    },
    mounted: function () {
        this.getImageCode()
    },
    methods: {
        getImageCode: function () {
            this.imageSrc = "/image?action=museum&randomKey=" + randomKey + "&" + new Date().getTime();
        },
        returnPage: function () {
            window.location.href = "/museum?page=onlineBookingSelection&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y
        }
    }
});
new Vue({
    el: "#reservationSuccess",
    data: {
    },
    mounted: function () {
    },
    methods: {
        returnPage: function () {
            window.location.href = "/museum?page=onlineBooking&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y
        }
    }
});
new Vue({
    el: "#reservationInquiry",
    data: {
        xm: "",
        zjh: "",
        noResult: false,
        hasResult: false,
        dataList: [],
        err: ""
    },
    mounted: function () {
    },
    methods: {
        registerSearch: function () {
            if (!this.xm) {
                alert("请输入姓名！")
                return;
            }
            if (!this.zjh) {
                alert("请输入证件号！")
                return;
            }
            const parameters = {
                xm: this.xm,
                zjh: this.zjh,
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/museum/registerSearch',
                data: parameters,
                contentType: 'application/json'
            }).then(res=> {
                if (res.data.rtnCode == "000000" && res.data.data.list.length > 0) {
                    this.dataList = res.data.data.list;
                    this.noResult = false;
                    this.hasResult = true;
                } else {
                    this.err = res.data.rtnMsg == "success" ? "很抱歉，没有查询到相关信息。" : (res.data.rtnMsg || "很抱歉，没有查询到相关信息。");
                    this.hasResult = false;
                    this.noResult = true;
                }
            }).catch(err=> {
                this.err = err;
                this.hasResult = false;
                this.noResult = true;
            })
        },
        returnPage: function () {
            window.location.href = "/museum?page=museum&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y
        }
    }
});