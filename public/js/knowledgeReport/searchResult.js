var v = new Vue({
    el: "#searchResult",
    data: {
        searchCode: '',
        isResult_1: false,
        isResult_2: false,
        isResult_err: false,
        results: {},
        result_2: '',
        masktime: '',
        dialogMask: false
    },
    methods: {
        submit: function(){
            if (!v.searchCode.trim()) {
                v.maskFn("请输入查询码");
                return;
            }
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom,
                IDX: v.searchCode.trim(),
            }
            v.dialogMask = true;
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/knowledgeReport/search',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                v.isResult_1 = false;
                v.isResult_2 = false;
                v.isResult_err = false;
                if(res.data.retCode == "000000"){
                    if(res.data.responseBody.data){
                        v.result_2 = res.data.responseBody.data;
                        v.isResult_2 = true;
                    }else if(res.data.responseBody.reportName){
                        v.results = res.data.responseBody;
                        v.isResult_1 = true;
                    }else{
                        v.isResult_err = true;
                    }
                }else{
                    v.isResult_err = true;
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
            window.location.href = "/knowledgeReport?page=knowledgeReport&randomKey=" + randomKey + "&userID=" + userID
                + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom
                + "&local_y=" + local_y;
        }
    }
})