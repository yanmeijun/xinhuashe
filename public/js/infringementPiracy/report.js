var base64Content = "";
var v = new Vue({
    data: {
        citySRC: "../../images/infringementPiracy/banner.png",
        dialogMask: "",
        realName: "",
        masktime: "",
        phone: "",
        email: "",
        privateOrCompany: "",//单位或个人
        factOrClue: "",//事实与线索
        VerificatCode: "",
        veriCodeSrc: "/images/refreshCode.png",
        organization: "",//化名
        address: "",//通讯地址
        postCode: "",//邮政编码
        kaipu_file: "",//
        wzbaxx: "",//网站备案信息
        wzmcjwz: "",//网站名称及网址
        dxdz: "",//详细地址
        fax: "",//联系电话
        uploadName: "",
        upDownSlide: false,
        upSlide: true,
        upDownSlide1: false,
        upSlide1: true,
        upDownSlide3: false,
        upSlide3: true
    },
    created: function () {

    },
    mounted: function () {
        this.getveriCode()
    },
    methods: {
        /*
         *输入不正确的查询语句提示语
         */
        maskFn: function (mgs) {
            v.masktime = mgs;
            setTimeout(function () {
                v.masktime = "";
            }, 1500);
            return;

        },
        back: function () {
            var url = "/infringementPiracy?page=infringementPiracy&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        },
        submitReport: function () {
            var regExpression = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            var regPhone = /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
            var regMobile = /^((0\d{2,3}-\d{7,8})|(1[35847]\d{9}))$|([0-9]{4}-[0-9]{3}-[0-9]{3})/;
            v.realName=v.realName.trim();
            v.phone=v.phone.trim();
            v.email=v.email.trim();
            v.VerificatCode=v.VerificatCode.trim();
            if (!v.realName) {
                v.maskFn("请输入真实姓名");
                return;
            }
            ;
            if (!v.phone) {
                v.maskFn("请输入联系电话");
                return;
            } else if (!regPhone.test(v.phone) && !regMobile.test(v.phone)) {
                v.maskFn("电话格式错误");
                return;
            }
            ;
            if (!v.email) {
                v.maskFn("请输入电子邮件");
                return;
            } else if (!regExpression.test(v.email)) {
                v.maskFn("电子邮件格式错误");
                return;
            } else if (v.email.indexOf(" ") != -1) {
                v.maskFn("电子邮件有空格");
                return;
            }
            ;
            if (!v.privateOrCompany) {
                v.maskFn("单位或个人名称");
                return;
            }
            ;
            if (!v.factOrClue) {
                v.maskFn("请输入事实与线索");
                return;
            }
            ;
            if (!v.VerificatCode) {
                v.maskFn("请输入验证码");
                return;
            }
            ;
            v.dialogMask = true;
            v.getDate();
        },
        maskFn: function (mgs) {
            if (mgs.length > 16 && mgs.length <= 32) {
                this.masktime = mgs;
                this.$nextTick(function () {
                    document.getElementById("masktime").style.lineHeight = '20px';
                    document.getElementById("masktime").style.height = '50px';
                    document.getElementById("masktime").style.padding = '5px';
                })
            } else if (mgs.length > 32) {
                this.masktime = mgs;
                this.$nextTick(function () {
                    document.getElementById("masktime").style.lineHeight = '20px';
                    document.getElementById("masktime").style.height = '70px';
                    document.getElementById("masktime").style.padding = '5px';
                })
            } else {
                this.masktime = mgs;
                this.$nextTick(function () {
                    document.getElementById("masktime").style.lineHeight = '49px';
                    document.getElementById("masktime").style.height = '49px';
                    document.getElementById("masktime").style.padding = '0px';
                })
            }
            setTimeout(function () {
                v.masktime = "";
            }, 1500);
            return;
        },
        getDate: function () {
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                realName: v.realName,//真实姓名
                phone: v.phone,//联系电话
                email: v.email,//电子邮件
                title: v.privateOrCompany,//单位或个人
                content: v.factOrClue,//事实与线索
                code: v.VerificatCode,//验证码
                organization: v.organization,//化名
                address: v.address,//通讯地址
                postCode: v.postCode,//邮政编码
                kaipu_file: v.kaipu_file,//附件
                wzbaxx: v.wzbaxx,//网站备案信息
                wzmcjwz: v.wzmcjwz,//网站名称及网址
                dxdz: v.dxdz,//详细地址
                fax: v.fax//联系电话
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: '/infringementPiracy/infringementPiracySearch',
                data: JSON.stringify(parameters),
                async: true,
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = "";
                if (res.data.retCode == "000000") {
                    v.maskFn(res.data.responseBody.data);
                    v.getveriCode();
                    return;
                } else {
                    v.maskFn(res.data.responseBody.errorMsg);
                    return;
                }
            }).catch(function (err) {
                v.dialogMask = "";
                console.log(err)
            })
        },
        getveriCode: function () {
            this.veriCodeSrc = "/images/yanzm.gif";
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,
                localFrom:localFrom,
                local_y: local_y
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: '/infringementPiracy/infringementPiracyVerification',
                data: JSON.stringify(parameters),
                async: true,
                contentType: 'application/json'
            }).then(function (res) {
                if (res.status == 200) {
                    v.veriCodeSrc = res.data;
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        // 上传文件之前的钩子，参数为上传的文件
        beforeUpload: function (files) {
            var fileType =['jpg','txt','doc','xls','ppt','pdf','zip','rar','JPG','TXT','DOC','XLS','PPT','PDF','ZIP','RAR','jpeg'];
            var fileSize;
            var file=document.getElementById("file");
            var filePath =document.getElementById("file").value;
            var reader=new FileReader();
            var ext = filePath.substr(filePath.lastIndexOf('.') + 1,filePath.length);
            var name = filePath.substring(filePath.lastIndexOf('\\') + 1);
            var fileName=document.getElementById("file").files.name;
            if(fileName && fileName[0]){
                fileSize = document.getElementById("file")[0].size;
            }
            if (!Array.prototype.indexOf) {
                Array.prototype.indexOf = function(elt /*, from*/)
                {
                    var len = v.length >>> 0;
                    var from = Number(arguments[1]) || 0;
                    from = (from < 0)
                        ? Math.ceil(from)
                        : Math.floor(from);
                    if (from < 0)
                        from += len;

                    for (; from < len; from++)
                    {
                        if (from in v &&
                            v[from] === elt)
                            return from;
                    }
                    return -1;
                };
            };
            if(fileType.indexOf(ext.toLowerCase())<0){
                v.maskFn("您上传文件类型有误,请重新上传！");
                v.uploadName="";
                v.kaipu_file="";
                document.getElementById("file").value="";
                return false;
            }else if(fileSize > (2 * 1024 * 1024)){
                v.maskFn("您上传文件过大,请重新上传！");
                v.uploadName="";
                v.kaipu_file="";
                document.getElementById("file").value="";
                return false;
            }else{
                reader.onloadend= function(){
                    console.log("加载结束");
                    //图片读取完成，上传ajax
                    var imgBase64=reader.result;
                    //base64Content=encodeURI(imgBase64);
                    //console.log(encodeURI(base64Content))
                    base64Content=encodeURI(imgBase64).split(",")[1];
                };
                reader.readAsText(document.getElementById("file").files[0],"utf-8");//发起异步请求
                v.uploadName=name;
                v.kaipu_file=name
            }
        },
        upDownSlides: function (ind) {
            if (ind == "2") {
                v.upDownSlide = v.upDownSlide == false ? v.upDownSlide = true : v.upDownSlide = false;
                v.upSlide = v.upSlide == false ? v.upSlide = true : v.upSlide = false;
            } else if (ind == "1") {
                v.upDownSlide1 = v.upDownSlide1 == false ? v.upDownSlide1 = true : v.upDownSlide1 = false;
                v.upSlide1 = v.upSlide1 == false ? v.upSlide1 = true : v.upSlide1 = false;
            } else if (ind == "3") {
                v.upDownSlide3 = v.upDownSlide3 == false ? v.upDownSlide3 = true : v.upDownSlide3 = false;
                v.upSlide3 = v.upSlide3 == false ? v.upSlide3 = true : v.upSlide3 = false;
            }

        }
    }
}).$mount('#infringementReportMax')