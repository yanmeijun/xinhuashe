validteCode();
/*if (citySRC) {
    document.getElementById("train_citySRC").src = citySRC;
} else {
    document.getElementById("train_citySRC").src = "./images/banner.png";
}*/
function validteCode() {
    var codes = new Array(5);       //用于存储随机验证码
    var colors = new Array("#FF0000", "0000FF", "#FF6600", "#006600", "#660000", "#990066", "#000000", "#6600CC", "#990099", "#CC0099");
    for (var i = 0; i < codes.length; i++) {//获取随机验证码
        codes[i] = Math.floor(Math.random() * 10);
    }
    var children = document.getElementById("divCode").childNodes;
    var spans = [];
    for (var i = 0, j = 0; i < children.length; i++) {
        if (children[i].nodeName == 'SPAN') {
            spans[j] = children[i];
            spans[j].innerHTML = codes[j];
            spans[j].style.color = colors[Math.floor(Math.random() * 10)];    //随机设置验证码颜色
            j++;
        }
    }
}
function chaxunFun() {//查询按钮的事件处理
    var chezhanInput = document.getElementById("cz");
    if (chezhanInput.disabled == false) {
        if (chezhanInput.value == "") {
            masktime("请输入车站信息！");
            chezhanInput.focus();
            return;
        } else {
            chezhanInput.value = chezhanInput.value.replace(/\s+/g, "");
        }
    }
    var chechiInput = document.getElementById("cc");
    if (chechiInput.value == "") {
        masktime("请输入车次信息！");
        chechiInput.focus();
        return;
    } else {
        chechiInput.value = chechiInput.value.replace(/\s+/g, "");
    }

    /*if (document.getElementById("yzm").value == '') {
        masktime("请输入验证码!");
        document.getElementById("yzm").focus();
        return;
    }
    var children = document.getElementById("divCode").childNodes;
    var rightCode = "";
    for (var i = 0, j = 0; i < children.length; i++) {
        if (children[i].nodeName == 'SPAN') {
            rightCode += children[i].innerHTML;
        }
    }
    if (document.getElementById("yzm").value != rightCode) {
        masktime("验证码不正确，请重新输入!");
        document.getElementById("yzm").focus();
        return false;
    }*/
    chezhanInput.value = chezhanInput.value.replace(/\s+/g, "");
    chechiInput.value = chechiInput.value.replace(/\s+/g, "");
    var cz = chezhanInput.value.replace("站","");
    var czEn = encodeURI(cz);//stono 90302
    czEn = czEn.replace(/%/g, "-"); //stono 90302
    var cc = chechiInput.value;
    var cxlx = 0;
    var cxlx0 = document.getElementById("cxlx0");
    if (cxlx0.classList.contains('active') == false) cxlx = 1;
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/train/trainLate');
    document.getElementById("dialogMask").style.display = "block";
    document.getElementById("dialog").style.display = "block";
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send('cz=' + cz + '&cc=' + cc + '&cxlx=' + cxlx + '&czEn=' + czEn +
        '&randomKey=' + randomKey + '&userID=' + userID + '&clientID=' + clientID + '&cityID=' + cityID +
        '&local_x=' + local_x + "&localFrom=" + localFrom +  '&local_y=' + local_y);
    xhr.onreadystatechange = function () {
        document.getElementById("dialogMask").style.display = "none";
        document.getElementById("dialog").style.display = "none";
        if (xhr.readyState == 4 && xhr.status == 200) {
            var responseText = JSON.parse(xhr.responseText);
            if (responseText.retCode == "000000") {
                var results = document.getElementById("results");
                results.innerHTML = responseText.responseBody.data;
                document.getElementById("results_div").style.display = "block"
            }else{
                masktime("网络异常");
                return;
            }
        }

    };
}
function radioSwitch(id) {
    var cxlxE = document.getElementById(id);
    var _cxlxE = document.getElementById(id == 'cxlx0' ? 'cxlx1' : 'cxlx0');
    if (cxlxE.classList.contains('active') == true) {
        cxlxE.classList.remove('active');
        _cxlxE.classList.add('active');
    } else {
        cxlxE.classList.add('active');
        _cxlxE.classList.remove('active');
    }
}
function masktime(mgs) {
    document.getElementById("masktime").innerHTML = mgs;
    document.getElementById("masktime").style.display = "block";
    setTimeout(function () {
        document.getElementById("masktime").style.display = "none";
    }, 2000)
    return
};