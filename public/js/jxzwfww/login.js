var v = new Vue({
    el: "#login",
    data: {
        veryCode: '',
        password: '',
        userName: '',
        verySrc: '/images/yanzm.gif',
        masktime: '',
        dialogMask: false
    },
    mounted: function(){
        this.getVeryCode(this);
    },
    methods: {
        getVeryCode: function (t) {
            v = v || t;
            v.verySrc = "/images/yanzm.gif";
            const data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x, 
                local_y: local_y,
                localFrom: localFrom
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/jxzwfww/getVeryCode",
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.verySrc = res.data
            });
        },
        submit: function(){
            v.dialogMask = true;
            const data = {
                loginname: v.userName,
                loginpassword: v.password,
                randcode: v.veryCode,
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/jxzwfww/login",
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                if(res.data.retCode == '000000'){
                    sessionStorage.setItem('email', res.data.responseBody.member.email)
                    sessionStorage.setItem('address', res.data.responseBody.member.address)
                    sessionStorage.setItem('realname', res.data.responseBody.member.realname)
                    sessionStorage.setItem('phoneNumber', res.data.responseBody.member.phoneNumber)
                    sessionStorage.setItem('idcard', res.data.responseBody.member.idcard)
                    window.location.href = "/jxzwfww?page=readNotice";
                }else{
                    v.maskFn(res.data.responseBody.data || res.data.responseBody.errorMsg)
                }
            });
        },
        render: function (name) {
            window.location.href = "/jxzwfww?page=" + name;
        },
        maskFn: function (mgs) {
            v.masktime = mgs;
            setTimeout(function () {
                v.masktime = "";
            }, 1500);
            return;
        }
    }
})