var v = new Vue({
    el: "#indexPage",
    data: {
        cityID: cityID,
        // citySRC: citySRC || "/images/banner.png",
        hotService: [],//热门服务
        traffic: [],//交通类
        socialSecurity: [],//社会保障类
        medical: [],//医疗类
        education: [],//教育类
        tourism: [],//旅游类
        lawRule: [],//法规类
        cultural: [],//文化体育类
        complaint: [],//举报投诉
        civil: [],//民政类
        tax: [],//税务类
        credit: [],//信用类
        other: [],//其他服务
        government: [],//政务服务
        passport: []//出境入境
    },
    mounted: function () {
        this.getAllService()
    },
    methods: {
        getAllService: function () {
            axios({
                headers: {"Content-Type": "application/json"},
                method: "get",
                url: '/getAllService?cityID=' + this.cityID + "&localFrom=" + localFrom,
                contentType: 'application/json'
            }).then(function (res) {
                res.data.slice(0, 4).forEach(function (item) {
                    item.src = "/images/homePage/hotService/" + (item.logo.split("/")[6] ? item.logo.split("/")[6] : item.logo.split("/")[3]);
                    v.hotService.push(item);
                })
                res.data.forEach(function (item) {
                    item.logo = "/images" + item.logo.split("images")[1];
                    item.url = "/" + item.url.split("/")[3];
                    var serviceType = item.serviceID.charAt(0);
                    switch (serviceType) {
                        case "A":
                            v.traffic.push(item);
                            break;
                        case "B":
                            v.socialSecurity.push(item);
                            break;
                        case "C":
                            v.education.push(item);
                            break;
                        case "D":
                            v.medical.push(item);
                            break;
                        case "E":
                            v.civil.push(item);
                            break;
                        case "G":
                            v.tourism.push(item);
                            break;
                        case "H":
                            v.passport.push(item);
                            break;
                        case "I":
                            v.complaint.push(item);
                            break;
                        case "K":
                            v.tax.push(item);
                            break;
                        case "L":
                            v.government.push(item);
                            break;
                        case "M":
                            v.cultural.push(item);
                            break;
                        case "X":
                            v.credit.push(item);
                            break;
                        case "Y":
                            v.lawRule.push(item);
                            break;
                        case "Z":
                            v.other.push(item);
                            break;
                        default:
                            v.other.push(item);
                            break;
                    }
                })
            }).catch(function (err) {

            })
        },
        doSubmit: function (formID) {
            // v.$refs[formID].submit();
            document.getElementById(formID).submit()
        }
    }
})