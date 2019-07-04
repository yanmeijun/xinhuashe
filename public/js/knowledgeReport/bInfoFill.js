var v = new Vue({
    el: "#bInfoFill",
    data: {
        name: '',
        mobile: '',
        content: '',
        related_0: false,
        related_1: false,
        related_2: false,
        related_3: false,
        related_4: false,
        related_5: false,
        related_6: false,
        related_7: false,
        masktime: '',
        dialogMask: false,
        isHandle: false,
        handleArea: '',
        handleName: '请选择',
        handleID: '',
        handleAreaList: [],
        handleNameList: [],
        handleList: [{"name":"中国(温州)知识产权维权援助中心","id":"103"},{"name":"中国(佛山)知识产权维权援助中心","id":"99"}],
    },
    methods: {
        select: function(item){
            v[item] = !v[item]
        },
        empty: function(item){
            v[item] = '';
        },
        areaChoose: function(){
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger:  '#area',
                title: '选择地区',
                wheels: [
                    {data: areaList}
                ],
                callback: function(){}
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        handleChoose: function(){
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom
            }
            v.dialogMask = true;
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/knowledgeReport/getHandleList',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                if(res.data.retCode == "000000"){
                    v.handleAreaList = res.data.responseBody.data.areas;
                    v.handleNameList = res.data.responseBody.data.groupCenter;
                    v.handleList = v.handleAreaList;
                    v.handleArea = "";
                    v.handleName = "请选择";
                    v.isHandle = true;
                }
            }).catch(function (err) {
                console.log(err)
            })

        },
        handleClose: function(){
            v.isHandle = false;
            v.handleName = "请选择";
            v.handleArea = "";
        },
        handleListChoose: function(name, id){
            if(v.handleArea){
                v.isHandle = false;
                v.handleName = name;
                v.handleID = id;
            }else{
                v.handleArea = name;
                v.handleList = [];
                v.handleNameList.forEach(function(item){
                    if(item.areaCode == id){
                        v.handleList.push(item)
                    }
                })
            }
        },
        submit: function(){
            if (!v.name.trim()) {
                v.maskFn("举报人姓名不能为空");
                return;
            }else if(/[^a-zA-Z\u4E00-\u9FA5·]/.test(v.name.trim())){
                v.maskFn("姓名只允许包含英文·或汉字");
                return;
            }
            var data_id = document.getElementById("area").getAttribute("data_id");
            if(!data_id){
                v.maskFn("请选择举报人地址");
                return;
            }
            if (!v.mobile.trim()) {
                v.maskFn("请输入手机号码");
                return;
            }else if(!(/^1(3|4|5|7|8|9)\d{9}$/.test(v.mobile.trim()))){
                v.maskFn("请输入正确的手机号码");
                return;
            }
            if (!v.content.trim()) {
                v.maskFn("请输入举报投诉内容");
                return;
            }
            if(!v.related_0 && !v.related_1 && !v.related_2 && !v.related_3 && !v.related_4 && !v.related_5 && !v.related_6 && !v.related_7){
                v.maskFn("请选择涉及权利类别");
                return;
            }
            if (!v.handleID) {
                v.maskFn("请选择受理维权中心");
                return;
            }
            var data_area = document.getElementById("area").innerHTML;
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom,
                ReportName_Input: window.sessionStorage.getItem("name"),
                BakStr1_Input: window.sessionStorage.getItem("idCard"),
                ProvinceId_Input: window.sessionStorage.getItem("areaCode").split(" ")[0],
                ProvinceId_Txt: window.sessionStorage.getItem("area").split(" ")[0],
                CityId_Input: window.sessionStorage.getItem("areaCode").split(" ")[1],
                CityId_Txt: window.sessionStorage.getItem("area").split(" ")[0],
                Phone_Input: window.sessionStorage.getItem("mobile"),
                ByReportName_Input: v.name,
                ByReportProvinceId_Input: data_id.split(" ")[0],
                ByReportProvinceId_Txt: data_area.split(" ")[0],
                ByReportCityId_Input: data_id.split(" ")[1],
                ByReportCityId_Txt: data_area.split(" ")[1],
                ByReportPhone_Input: v.mobile,
                ReportContent_Input: v.content,
                HandleGroupId_Input: v.handleID,
                HandleGroupId_Txt: v.handleName
            };
            v.related_0 ? data.RelatedRightId_Input$0 = '1' : "";
            v.related_1 ? data.RelatedRightId_Input$1 = '2' : "";
            v.related_2 ? data.RelatedRightId_Input$2 = '3' : "";
            v.related_3 ? data.RelatedRightId_Input$3 = '4' : "";
            v.related_4 ? data.RelatedRightId_Input$4 = '5' : "";
            v.related_5 ? data.RelatedRightId_Input$5 = '6' : "";
            v.related_6 ? data.RelatedRightId_Input$6 = '7' : "";
            v.related_7 ? data.RelatedRightId_Input$7 = '99' : "";
            v.dialogMask = true;
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/knowledgeReport/report',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                if(res.data.retCode == "000000"){
                    if(res.data.responseBody.data.indexOf("在线举报投诉成功") > -1){
                        var searchCode = res.data.responseBody.data.split("：")[1].split("，")[0];
                        window.sessionStorage.setItem('searchCode', searchCode);
                        window.location.href = "/knowledgeReport?page=result&randomKey=" + randomKey + "&userID=" + userID
                            + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom
                            + "&local_y=" + local_y;
                    }else{
                        v.maskFn(res.data.responseBody.data || "提交失败");
                        return;
                    }
                }else{
                    window.location.href = "/knowledgeReport?page=failed&randomKey=" + randomKey + "&userID=" + userID
                        + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom
                        + "&local_y=" + local_y;
                }
            }).catch(function (err) {
                console.log(err)
            })
            
        },
        maskFn: function (mgs) {
            v.masktime = mgs;
            setTimeout(function () {
                v.masktime = "";
            }, 1500);
            return;
        },
        back: function(){
            window.location.href = "/knowledgeReport?page=infoFill&randomKey=" + randomKey + "&userID=" + userID
                + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom
                + "&local_y=" + local_y;
        }
    }
})