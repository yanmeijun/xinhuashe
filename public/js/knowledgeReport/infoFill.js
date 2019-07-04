var v = new Vue({
    el: "#infoFill",
    data: {
        name: '',
        idCard: '',
        mobile: '',
        masktime: '',
        dialogMask: false
    },
    methods: {
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
                callback: function(){
                    // var data_id = document.getElementById("area").getAttribute("data_id");
                    // var text = document.getElementById("area").innerHTML;
                    // if(data_id.split(" ")[1] == "0"){
                    //     document.getElementById("area").innerHTML = text.split(" ")[0];
                    // }
                }
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        submit: function(){
            if (!v.name.trim()) {
                v.maskFn("举报人姓名不能为空");
                return;
            }else if(/[^a-zA-Z\u4E00-\u9FA5·]/.test(v.name.trim())){
                v.maskFn("姓名只允许包含英文·或汉字");
                return;
            }
            if (!v.idCard.trim()) {
                v.maskFn("请输入身份证号");
                return;
            }else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(v.idCard.trim()))){
                v.maskFn("份证号码格式不正确");
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
            window.sessionStorage.setItem("name", v.name)
            window.sessionStorage.setItem("idCard", v.idCard)
            window.sessionStorage.setItem("mobile", v.mobile)
            window.sessionStorage.setItem("areaCode", data_id)
            window.sessionStorage.setItem("area", document.getElementById("area").innerHTML)
            window.location.href = "/knowledgeReport?page=bInfoFill&randomKey=" + randomKey + "&userID=" + userID
                + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom
                + "&local_y=" + local_y;
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