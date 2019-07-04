var v = new Vue({
    el: "#realName",
    data: {
        name: '',
        email: '',
        mobile: '',
        code: '',
        masktime: '',
        dialogMask: false,
        get_code: false,
        wait: 60,
        get_code_text: "获取验证码",
        address: ''
    },
    methods: {
        getCode: function () {
            if (v.wait != 60) {
                return;
            }
            if (!v.mobile.trim() || !(/^1(3|4|5|7|8|9)\d{9}$/.test(v.mobile.trim()))) {
                v.maskFn("请输入正确的手机号码");
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
                telephone: v.mobile
            }
            v.dialogMask = true;
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/getCode',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                v.time();
                if (res.data.retCode == "000000") {
                    v.maskFn("短信发送成功");
                } else {
                    v.maskFn("短信发送失败");
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        time() {
            if (v.wait == 0) {
                v.get_code = true;
                v.get_code_text = "获取验证码";
                v.wait = 60;
            } else {
                v.get_code = false;
                v.get_code_text = "重新发送(" + v.wait + ")";
                v.wait--;
                setTimeout(function () {
                    v.time();
                }, 1000);
            }
        },
        select: function () {
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: "#area",
                title: "省/市/区",
                wheels: [
                    {data: areaList}
                ],
                callback: ""
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        back: function () {
            window.location.href = "/zywxReport?page=reportSelect";
        },
        next: function () {
            if (!v.name.trim()) {
                v.maskFn("真实姓名不能为空");
                return;
            }else if(/[^a-zA-Z\u4E00-\u9FA5·]/.test(v.name.trim())){
            	v.maskFn("真实姓名只允许包含英文·或汉字");
                return;
            }
            if (!v.email.trim()) {
                v.maskFn("请输入电子邮箱");
                return;
            }else if(!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v.email.trim()))){
            	v.maskFn("请输入正确的电子邮箱");
                return;
            }
            if (!v.mobile.trim()) {
                v.maskFn("请输入手机号码");
                return;
            }else if(!(/^1(3|4|5|7|8|9)\d{9}$/.test(v.mobile.trim()))){
            	v.maskFn("请输入正确的手机号码");
                return;
            }
           /* if (!v.code.trim()) {
                v.maskFn("请输入验证码");
                return;
            }*/
            var area = document.getElementById("area").getAttribute("data_id")
            if (!area) {
                v.maskFn("请选择地域");
                return;
            }

            console.log("111111111111111")

            var obj = document.getElementsByName("radio"), sex;
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].checked) {
                    sex = obj[i].value;
                }
            }
            window.sessionStorage.setItem("name", v.name)
            window.sessionStorage.setItem("sex", sex)
            window.sessionStorage.setItem("email", v.email)
            window.sessionStorage.setItem("tel", v.mobile)
            window.sessionStorage.setItem("provincecode", area.split(" ")[0])
            window.sessionStorage.setItem("citycode", area.split(" ")[1])
            window.sessionStorage.setItem("countycode", area.split(" ")[2])
            window.sessionStorage.setItem("address", v.address)
            window.location.href = "/zywxReport?page=realNameNext&realName=true"


            /*var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom,
                verifyCode: v.code
            }
            v.dialogMask = true;
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/zywxReport/checkCode',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                v.time();
                if (res.data.retCode == "000000") {
                    if (res.data.responseBody.result.indexOf("错误") > -1) {
                        v.maskFn(res.data.responseBody.result);
                        return;
                    } else {
                        var obj = document.getElementsByName("radio"), sex;
                        for (var i = 0; i < obj.length; i++) {
                            if (obj[i].checked) {
                                sex = obj[i].value;
                            }
                        }
                        window.sessionStorage.setItem("name", v.name)
                        window.sessionStorage.setItem("sex", sex)
                        window.sessionStorage.setItem("email", v.email)
                        window.sessionStorage.setItem("tel", v.mobile)
                        window.sessionStorage.setItem("provincecode", area.split(" ")[0])
                        window.sessionStorage.setItem("citycode", area.split(" ")[1])
                        window.sessionStorage.setItem("countycode", area.split(" ")[2])
                        window.sessionStorage.setItem("address", v.address)
                        window.location.href = "/zywxReport?page=realNameNext&realName=true"
                    }
                } else {
                    v.maskFn("短信验证码校验失败");
                    return;
                }
            }).catch(function (err) {
                console.log(err)
            })*/
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