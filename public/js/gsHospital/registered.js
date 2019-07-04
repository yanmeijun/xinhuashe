var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            hoskey: hoskey,
            deptKey: deptKey,
            startDate: '',
            dataList: [],
            weList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            nextDataList: [],
            prevDataList: [],
            deptName: deptName,
            HOS_NAME: HOS_NAME,
            userkey: userkey,
            pesCenterFlag: false,
            maskFlag: false,
            exitFlag: false,
            noResult: false,
            arrTime: ""

        },
        created: function () {
            var day3 = new Date();
            day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000);
            this.startDate = day3.getFullYear() + "-" + this.toDou(day3.getMonth() + 1) + "-" + this.toDou(day3.getDate());
            this.getAllData();
        },
        methods: {
            getAllData: function () {
                var self = this;
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    hosKey: this.hoskey,
                    deptKey: this.deptKey,
                    startDate: this.startDate
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalDeptRili',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        v.dataList = res.data.responseBody.data;
                        if (!res.data.responseBody.data) {
                            v.noResult = true;
                            return;
                        }
                        /*                        v.dataList.forEach(function(item,i){
                         console.log(item,i)
                         item.startDate=v.startDate;
                         item.weekList=v.showDate(v.startDate,7,1);
                         var arr=[];
                         item.amList.forEach(function(date){
                         arr.push(Object.values(date)[0].substring(5))
                         })
                         v.dataList[i] = Object.assign({}, v.dataList[i], {dateList:arr});
                         v.$set(v.dataList,i,v.dataList[i]);
                         //item.dateList=arr;
                         });*/


                        var arr = [];
                        for (var i = 0; i < v.dataList.length; i++) {
                            var amList = v.dataList[i].amList;
                            for (var j = 0; j < amList.length; j++) {
                                arr.push(Object.values(amList[j])[0].substring(5));
                            }
                            ;
                        }
                        /*for(var i=0;i<7;i++){
                         v.arrTime+= "<th>"+v.weList[v.showDate(v.startDate,7,1)[i]]+"<br>"+arr[i]+"</th>";
                         }*/
                        for (var i = 0; i < v.dataList.length; i++) {
                            var arr = [];
                            var amList = v.dataList[i].amList;
                            for (var j = 0; j < amList.length; j++) {
                                arr.push(Object.values(amList[j])[0].substring(5));
                            }
                            ;
                            //v.arrTime = "<th>"+v.weList[v.showDate(v.startDate,7,1)[i]]+"<br>"+arr[i]+"</th>";
                            //v.arrTime = arr;
                            //v.arrTime+= "<th>"+v.weList[v.showDate(v.startDate,7,1)[i]]+"<br>"+arr[i]+"</th>";
                            self.dataList[i] = Object.assign({}, self.dataList[i], {
                                weList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                                dateList: arr, startDate: v.startDate, weekList: self.showDate(self.startDate, 7, 1)});
                            self.$set(self.dataList, i, self.dataList[i]);
                            //v.dataList[i].dateList =arr;
                        }

                    }
                }).catch(function (err) {
                })
            },
            next: function (index) {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    hosKey: this.hoskey,
                    deptKey: this.deptKey,
                    startDate: this.getNextday(index)
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalDeptRili',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        v.nextDataList = res.data.responseBody.data;
                        var arr = [];
                        v.nextDataList[index].amList.forEach(function (date) {
                            arr.push(Object.values(date)[0].substring(5))
                        });
                        v.dataList[index].amList = v.nextDataList[index].amList;
                        v.dataList[index].pmList = v.nextDataList[index].pmList;
                        v.dataList[index].dateList = arr;
                        v.dataList[index].startDate = v.getNextday(index);
                    }
                    var startDate = new Date(v.startDate).getTime() + 24 * 3600 * 1000;
                    if (startDate < new Date(data.startDate).getTime()) {
                        v.$refs.prev[index].style.display = "block";
                    } else {
                        v.$refs.prev[index].style.display = "none";
                    }
                }).catch(function (err) {
                })
            },
            prev: function (index) {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    hosKey: this.hoskey,
                    deptKey: this.deptKey,
                    startDate: this.getPrevday(index)
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalDeptRili',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        v.prevDataList = res.data.responseBody.data;
                        var arr = [];
                        v.prevDataList[index].amList.forEach(function (date) {
                            arr.push(Object.values(date)[0].substring(5))
                        });
                        v.dataList[index].amList = v.prevDataList[index].amList;
                        v.dataList[index].pmList = v.prevDataList[index].pmList;
                        v.dataList[index].dateList = arr;
                        v.dataList[index].startDate = v.getPrevday(index);
                    }
                    var startDate = new Date(v.startDate).getTime() + 24 * 3600 * 1000;
                    if (startDate > new Date(data.startDate).getTime()) {
                        v.$refs.prev[index].style.display = "none";
                    } else {
                        v.$refs.prev[index].style.display = "block";
                    }
                }).catch(function (err) {
                })
            },
            getNextday: function (i) {
                var startDateNow = new Date(this.dataList[i].startDate);
                var time = startDateNow.getTime();
                var day7 = new Date(time + 7 * 24 * 3600 * 1000);
                return day7.getFullYear() + "-" + this.toDou(day7.getMonth() + 1) + "-" + this.toDou(day7.getDate());
            },
            getPrevday: function (i) {
                var startDateNow = new Date(this.dataList[i].startDate);
                var time = startDateNow.getTime()
                var day7 = new Date(time - 7 * 24 * 3600 * 1000);
                // var startDate=new Date(v.startDate).getTime()+24*3600*1000;
                // if(startDate>day7.getTime()){
                //     v.$refs.prev[i].style.display="none";
                // }else{
                //     v.$refs.prev[i].style.display="block";
                // }
                return day7.getFullYear() + "-" + this.toDou(day7.getMonth() + 1) + "-" + this.toDou(day7.getDate());
            },
            showDate: function (startDate, num, flag) {
                if (flag == 1) {  //正向数7天
                    // var arr=startDate.split('-');
                    var date = new Date(startDate);
                    var time = date.getTime();
                    var dateStrList = [];
                    var sevenDays = [];
                    for (var i = 0; i < 7; i++) {
                        var date = new Date(time + i * 24 * 3600 * 1000);
                        var weekTime = date.getDay();
                        sevenDays.push(weekTime);
                    }
                    return sevenDays;

                }
            },
            back: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=selectDepartment";
            },
            jumpAppoint: function (doctorKey, deptKey, orderDate, orderSort, doctorName, rankName, imagId) {
                if (this.userkey) {//已登录，跳转预约界面
                    sessionStorage.setItem("doctorKey", doctorKey);
                    sessionStorage.setItem("deptKey", deptKey);
                    sessionStorage.setItem("orderDate", orderDate);
                    sessionStorage.setItem("orderSort", orderSort);
                    sessionStorage.setItem("doctorName", doctorName);
                    sessionStorage.setItem("rankName", rankName);
                    sessionStorage.setItem("imagId", imagId);
                    window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=appointmenRegistration&comeForm=registered";
                } else {//未登录，跳转登录界面
                    window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=registered";
                }

            },
            maskFn: function (mgs) {
                if (mgs.length > 16 && mgs.length <= 32) {
                    this.masktime = mgs;
                    this.$nextTick(function () {
                        this.$refs.masktime.style.lineHeight = '20px';
                        this.$refs.masktime.style.height = '50px';
                        this.$refs.masktime.style.padding = '5px';
                    })
                } else if (mgs.length > 32) {
                    this.masktime = mgs;
                    this.$nextTick(function () {
                        this.$refs.masktime.style.lineHeight = '20px';
                        this.$refs.masktime.style.height = '70px';
                        this.$refs.masktime.style.padding = '5px';
                    })
                } else {
                    this.masktime = mgs;
                    this.$nextTick(function () {
                        this.$refs.masktime.style.lineHeight = '49px';
                        this.$refs.masktime.style.height = '49px';
                        this.$refs.masktime.style.padding = '0px';
                    })
                }
                setTimeout(function () {
                    v.masktime = "";
                }, 1500);
                return;
            },
            toDou: function (n) {
                return n < 10 ? '0' + n : '' + n;
            },
            checkUser: function () {
                if (!userkey) {
                    window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=registered";
                    return;
                } else {
                    this.pesCenterFlag = !this.pesCenterFlag;
                }
            },
            jumpPerson: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalCenter&comeForm=registered";
                return;
            },
            exitBtn: function () {
                this.maskFlag = true;
                this.exitFlag = true;
                document.getElementsByTagName('body')[0].style.position = 'fixed';
            },
            exit: function () {
                document.getElementsByTagName('body')[0].style.position = 'static';
                sessionStorage.setItem("userKey", "");
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=gsHospital";
                return;
            },
            cancelExit: function () {
                this.maskFlag = false;
                this.exitFlag = false;
                document.getElementsByTagName('body')[0].style.position = 'static';
            }
        },
        beforeMount: function () {

        },
        mounted: function () {
           
        },
        watch: {
            dataList: function (val) {
                // console.log(val);
            }
        }
    }
)

