/*
var v = new Vue({
    el: "#resultPage",
    data: {
        province: false,
        dataList: [],
        dataLength: -1,
        provinceInfo: {},
        open: -1,
        sendBefore: true
    },
    mounted: function () {
        this.getData()
    },
    methods: {
        getData: function () {
            var param = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,
                    localFrom:localFrom,
                    local_y: local_y
                },
                url = "";
            if (code) {
                param.code = code;
                url = "/administrativeDivisions/searchByCode";
            } else {
                param.keyword = keyword;
                url = "/administrativeDivisions/searchByKeyword";
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: url,
                data: JSON.stringify(param),
                contentType: 'application/json'
            }).then(function (res) {
                if (res.data.retCode == "000000") {
                    if (res.data.responseBody.statistic) {
                        if (code.indexOf("0000") > -1) {
                            v.province = true;
                            v.provinceInfo = {
                                statistic: res.data.responseBody.statistic,
                                shenghui: provinceName + res.data.responseBody.shenghui
                            };
                        }
                        var dataList = res.data.responseBody.list,
                            cityList = [],
                            resultsList = [];
                        if (!dataList[0].areaCode) {
                            resultsList.push({cityInfo: dataList[0], countyList: dataList.slice(1)});
                        } else {
                            dataList.forEach(function (item) {
                                if (cityList.length > 0 && cityList[0].areaCode == item.areaCode) {
                                    cityList.push(item)
                                } else {
                                    if (cityList.length > 0) {
                                        resultsList.push({cityInfo: cityList[0], countyList: cityList.slice(1)});
                                    }
                                    cityList = [];
                                    cityList.push(item);
                                }
                            });
                            if (resultsList.length == 0) {
                                resultsList.push({cityInfo: cityList[0], countyList: cityList.slice(1)});
                            }
                        }
                        v.dataList = resultsList;
                        v.dataLength = v.dataList.length;
                    } else {
                        var dataList = res.data.responseBody.list,
                            resultsList = [];
                        dataList.forEach(function (item) {
                            item.name = item.shengji + " " + item.diji + " " + item.xianji;
                            resultsList.push({cityInfo: item, countyList: []});
                        });
                        v.dataList = resultsList;
                        v.dataLength = v.dataList.length;
                    }
                } else {
                    v.dataLength = 0;
                }
                v.sendBefore = false;
            }).catch(function (err) {
                console.log(err)
            })
        },
        openLower: function (e, index) {
            if (v.open == index) {
                v.open = -1;
                e.target.setAttribute('src', "/images/icon-downMenu.png")
            } else {
                v.open = index;
                e.target.setAttribute('src', "/images/icon-upMenu.png")
            }

        },
        back: function () {
            window.location.href = "/administrativeDivisions?page=administrativeDivisions&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        }
    }
})*/
var v = new Vue({
    el: "#resultPage",
    data: {
        province: false,
        dataList: [],
        dataLength: -1,
        provinceInfo: {},
        open: -1,
        sendBefore: true
    },
    mounted: function () {
        this.getData();
        if(diji !="-1"){
            this.open = 0;
            //e.target.setAttribute('src', "/images/icon-downMenu.png")
        }else{
            this.open = -1;
        }
    },
    methods: {
        getData: function () {
            var param = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,
                    localFrom:localFrom,
                    local_y: local_y,
                    shengji : shengji,
                    diji : diji,
                    xianji : xianji
                }
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: "/administrativeDivisions/searchByCode",
                data: JSON.stringify(param),
                contentType: 'application/json'
            }).then(function (res) {
                if (res.data.retCode == "000000") {
                    if (res.data.responseBody.statistic2 != "xianji") {
                        if (res.data.responseBody.title) {
                            v.province = true;
                            v.provinceInfo = {
                                statistic: res.data.responseBody.statistic,
                                shenghui: res.data.responseBody.shenghui,
                                title: res.data.responseBody.title
                            };
                        }
                        var dataList = res.data.responseBody.list,
                            cityList = [],
                            resultsList = [];
                        dataList.forEach(function (item) {
                            item.name = item.sh;
                            resultsList.push({cityInfo: item, countyList: item.firstStage});
                        });
                        /*if (!dataList[0].areaCode) {
                            resultsList.push({cityInfo: dataList[0], countyList: dataList.slice(1)});
                        } else {
                            dataList.forEach(function (item) {
                                console.log(item)
                                if (cityList.length > 0 && cityList[0].areaCode == item.areaCode) {
                                    cityList.push(item)
                                } else {
                                    if (cityList.length > 0) {
                                        resultsList.push({cityInfo: cityList[0], countyList: cityList.slice(1)});
                                    }
                                    cityList = [];
                                    cityList.push(item);
                                }
                            });
                            if (resultsList.length == 0) {
                                resultsList.push({cityInfo: cityList[0], countyList: cityList.slice(1)});
                            }
                        }*/
                        v.dataList = resultsList;
                        v.dataLength = v.dataList.length;
                    } else {
                        var dataList = res.data.responseBody.list,
                            resultsList = [];


                        dataList.forEach(function (item) {
                            item.name = item.sh;
                            item.statistic2 = res.data.responseBody.statistic2;
                            //item.name = item.diji + " " + item.xianji;
                            resultsList.push({cityInfo: item, countyList: []});
                        });
                        v.dataList = resultsList;
                        v.dataLength = v.dataList.length;
                    }
                } else {
                    v.dataLength = 0;
                }
                v.sendBefore = false;
            }).catch(function (err) {
                console.log(err)
            })
        },
        openLower: function (e, index) {
            if (v.open == index) {
                v.open = -1;
                e.target.setAttribute('src', "/images/icon-downMenu.png")
            } else {
                v.open = index;
                e.target.setAttribute('src', "/images/icon-upMenu.png")
            }

        },
        back: function () {
            window.location.href = "/administrativeDivisions?page=administrativeDivisions&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        }
    }
})