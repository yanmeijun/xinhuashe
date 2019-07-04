var v = new Vue({
    el: "#reservationRecord",
    data: {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        records: [],
        pageNo: 1,
        totalNumber: 0,
        totalPage: 0,
        isCanScroll: true,
        sendBefore: false
    },
    mounted: function () {
        this.getRecords(),
            window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll: function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var bodyHeight = document.body.clientHeight;
            var clientHeight = document.documentElement.clientHeight;//可视区高度
            if (scrollTop + clientHeight + 20 > bodyHeight) {
                if (v.isCanScroll) {
                    v.pageNo++;
                    this.getRecords();
                }
            }
        },
        getRecords: function (pageName) {
            this.isCanScroll = false;
            var parameters = {
                pageNo: this.pageNo,
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y
            };
            this.sendBefore = true;
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/GzOnlineWork/myReservation',
                data: parameters,
                contentType: 'application/json'
            }).then(function (res) {
                v.sendBefore = false;
                if (res.data.retCode == "000000") {
                    v.totalNumber = res.data.responseBody.TotalNumber;
                    v.totalPage = Math.ceil(res.data.responseBody.TotalNumber / 20);
                    var arr = res.data.responseBody.reservation || res.data.responseBody["我的预约"];
                    for (var k in arr) {
                        v.records.push(arr[k])
                    }
                    if (v.pageNo < v.totalPage) {
                        v.isCanScroll = true;
                    }
                }

            }).catch(function (err) {

            })
        },
        back: function () {
            window.location.href = "/GzOnlineWork?page=reservation&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y +
                "&user_name=" + user_name + "&cardno=" + cardno + "&email=" + email + "&oldmobile=" + oldmobile;
        }
    }
})