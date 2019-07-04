/*var v = new Vue({
    el: "#administrativeDivisions",
    data: {
        isCode: true,
        masktimeFalse: false,
        masktime: "",
        keyword: ""
    },
    methods: {
        tabSwitch: function (isCode) {
            if (isCode) {
                // v.isCode = true;
                document.getElementById("code_show").style.display = "block"
                document.getElementById("keyword_hide").style.display = "block"
                document.getElementById("code_content").style.display = "block"
                document.getElementById("code_hide").style.display = "none"
                document.getElementById("keyword_show").style.display = "none"
                document.getElementById("keyword_content").style.display = "none"
            } else {
                // v.isCode = false;
                document.getElementById("code_show").style.display = "none"
                document.getElementById("keyword_hide").style.display = "none"
                document.getElementById("code_content").style.display = "none"
                document.getElementById("code_hide").style.display = "block"
                document.getElementById("keyword_show").style.display = "block"
                document.getElementById("keyword_content").style.display = "block"
            }
        },
        renderCode: function () {
            var province = document.getElementById("provinceTrigger").getAttribute("data_id"),
                provinceName = document.getElementById("provinceTrigger").innerHTML,
                city = document.getElementById("cityTrigger").getAttribute("data_id"),
                county = document.getElementById("countyTrigger").getAttribute("data_id");
            var code = county ? county : (city ? city : province);
            if (!code) {
                v.masktimeFalse = true;
                v.masktime = "请选择地区！";
                setTimeout(function () {
                    v.masktimeFalse = false;
                }, 1500);
                return;
            }
            window.location.href = "/administrativeDivisions?page=resultPage&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&code=" + code + "&provinceName=" + provinceName
        },
        renderKeyword: function () {
            var keyword = v.keyword;
            if (!keyword) {
                v.masktimeFalse = true;
                v.masktime = "请输入关键字！";
                setTimeout(function () {
                    v.masktimeFalse = false;
                }, 1500);
                return;
            }
            window.location.href = "/administrativeDivisions?page=resultPage&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&keyword=" + keyword
        }
    }
})*/


var v = new Vue({
    el: "#administrativeDivisions",
    data: {
        isCode: true,
        masktimeFalse: false,
        masktime: "",
        keyword: ""
    },
    methods: {
        renderCode: function () {
            var province = document.getElementById("provinceTrigger").getAttribute("data_id"),
                provinceName = document.getElementById("provinceTrigger").innerHTML,
                city = document.getElementById("cityTrigger").getAttribute("data_id"),
                county = document.getElementById("countyTrigger").getAttribute("data_id");
            /*var code = county ? county : (city ? city : province);*/
            if (!province) {
                v.masktimeFalse = true;
                v.masktime = "请选择地区！";
                setTimeout(function () {
                    v.masktimeFalse = false;
                }, 1500);
                return;
            }
            window.location.href = "/administrativeDivisions?page=resultPage&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&shengji=" + province + "&diji=" + city+ "&xianji=" + county;
        },
        renderKeyword: function () {
            var keyword = v.keyword;
            if (!keyword) {
                v.masktimeFalse = true;
                v.masktime = "请输入关键字！";
                setTimeout(function () {
                    v.masktimeFalse = false;
                }, 1500);
                return;
            }
            window.location.href = "/administrativeDivisions?page=resultPage&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&keyword=" + keyword
        }
    }
})
