var v = new Vue({
    el: "#infoFill",
    data: {
        realname: sessionStorage.getItem('realname'),
        idcard: sessionStorage.getItem('idcard'),
        phoneNumber: sessionStorage.getItem('phoneNumber'),
        address: sessionStorage.getItem('address'),
        email: sessionStorage.getItem('email'),
        xmmc: "",
        tableFileName: "",
        certificateFileName: "",
        idcardFileName: "",
        unitcharterFileName: "",
        equipmentFileName: "",
        employeeFileName: "",
        hygieneFileName: "",
        landFileName: "",
        masktime: '',
        dialogMask: false
    },
    mounted: function(){},
    methods: {
        radioClick: function(e){
            if(e.target.className){
                e.target.className = ""
            }else{
                e.target.className = "test"
            }
        },
        imgChange: function(e, key, url){
            e.currentTarget.parentElement.previousElementSibling.firstElementChild.setAttribute("class","");
            var fil = e.target.files;
            var formData = new FormData();
            formData.append('multipartFiles', fil[0], fil[0].name);
            axios.post('/jxzwfww/uploadFileToOss', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(res => {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x,
                    local_y: local_y,
                    localFrom: localFrom,
                    file: res.data[0]
                }
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: "post",
                    url: '/jxzwfww/' + url,
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                }).then(function (res) {
                    if(res.data.retCode == "000000"){
                        v[key] = fil[0].name;
                    }else{
                        v.maskFn("文件上传失败")
                    }
                })
            })
        },
        submit: function(){
            if(!v.idcard){
                v.maskFn("请先实名认证");
                return;
            }else if(!v.address){
                v.maskFn("请输入联系地址");
                return;
            }else if(!v.xmmc){
                v.maskFn("请输入项目名称");
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
                xm: v.realname,
                zjhm: v.idcard,
                lxdh: v.phoneNumber,
                lxdz: v.address,
                xmmc: v.xmmc
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: '/jxzwfww/submit',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                if(res.data.retCode == "000000"){
                    sessionStorage.setItem('sbh', res.data.responseBody.sbh)
                    sessionStorage.setItem('company', res.data.responseBody.company)
                    sessionStorage.setItem('materialArrStr', res.data.responseBody.materialArrStr)
                    sessionStorage.setItem('user', res.data.responseBody.user)
                    window.location.href = "/jxzwfww?page=result";
                }else {
                    v.maskFn("提交失败")
                }
            })
        },
        render: function (name) {
            window.location.href = "/jxzwfww?page=" + name;
        },
        maskFn: function (mgs) {
            v.masktime = mgs;
            setTimeout(function (){
                v.masktime = "";
            }, 1500);
            return;
        }
    }
})