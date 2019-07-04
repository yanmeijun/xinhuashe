var v = new Vue({
    el: "#reportQuery",
    data: {
        searchCode: '',
        masktime: '',
        dialogMask: false,
        verifyCode: '',
        verifyCodeSrc: '/images/yanzm.gif',
        reportType: '',
        reportContent: '',
        reportSchedule: ''
    },
    mounted: function () {
        this.getVerifyCode(this);
    },
    methods: {
        getVerifyCode: function (a) {
            v = v || a;
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom
            }
            v.verifyCodeSrc = '/images/yanzm.gif';
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/getVerifyCode',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.verifyCodeSrc = res.data;
            }).catch(function (err) {
                console.log(err)
            })
        },
        submit: function () {
            if (!v.searchCode.trim()) {
                v.maskFn("请输入查询码");
                return;
            }
            if (!v.verifyCode.trim()) {
                v.maskFn("请输入图片验证码");
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
                querycode: v.searchCode,
                verifyCode: v.verifyCode
            }
            v.dialogMask = true;
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/reportSearch',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                if (res.data.retCode == "000000") {
                    v.reportType = res.data.responseBody.reportType;
                    v.reportContent = res.data.responseBody.reportContent;
                    v.reportSchedule = res.data.responseBody.reportSchedule;
                    v.getVerifyCode();
                } else {
                    v.maskFn(res.data.responseBody.errorMsg || "查询失败");
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        back: function () {
            window.location.href = "/zywxReport?page=reportSelect";
        },
        maskFn: function (mgs) {
            v.masktime = mgs;
            setTimeout(function () {
                v.masktime = "";
            }, 1500);
            return;
        },
    }
})