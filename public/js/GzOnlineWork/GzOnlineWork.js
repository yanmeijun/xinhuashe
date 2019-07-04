var v = new Vue({
    el: "#GzOnlineWork",
    data: {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        veryCode: "",
        masktimeFalse: false,
        masktime: "",
        dialogMask: ""
    },
    mounted: function () {
        if(err){
            this.masktimeFalse = true;
            this.masktime = err || "登录失败";
            setTimeout(function () {
                v.masktimeFalse = false;
            }, 1500);
            // return;
        }
        // v.dialogMask = "";
        this.getVeryCode(this);
    },
    methods: {
        getVeryCode: function (v) {
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y
            };
            v.veryCode = "/images/yanzm.gif";
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/GzOnlineWork/getVeryCode',
                data: parameters,
                contentType: 'application/json'
            }).then(function (res) {
                v.veryCode = res.data;
            }).catch(function (err) {

            })
        },
        doSubmit: function () {
            var username = document.getElementById("username").value,
                password = document.getElementById("password").value,
                piccode = document.getElementById("piccode").value;
            if (!username) {
                v.masktimeFalse = true;
                v.masktime = "请输入用户名！";
                setTimeout(function () {
                    v.masktimeFalse = false;
                }, 1500);
                return;
            } else if (!password) {
                v.masktimeFalse = true;
                v.masktime = "请输入密码！";
                setTimeout(function () {
                    v.masktimeFalse = false;
                }, 1500);
                return;
            } else if (!piccode) {
                v.masktimeFalse = true;
                v.masktime = "请输入验证码！";
                setTimeout(function () {
                    v.masktimeFalse = false;
                }, 1500);
                return;
            }
            v.dialogMask = true;
            document.getElementsByName('randomKey')[0].value = randomKey;
            document.getElementById("loginForm").submit();
        }
    }
})