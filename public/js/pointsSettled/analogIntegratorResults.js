var payLegal = localStorage.getItem("payLega");//第3个得分
var qualif = localStorage.getItem("qualificat");//第一个得分
var education = localStorage.getItem("educationSum");//第4个得分
var resid = localStorage.getItem("resiTotalSum");//第5个积分
var entrent = localStorage.getItem("entrenTotalSum");//第6个积分
var paytaxet = localStorage.getItem("paytaxeTotalSum");//第7个积分
var age = localStorage.getItem("ageTotalSum");//第8个积分
var honor = localStorage.getItem("honorTotalSum");//第9个积分
var laeRecond = localStorage.getItem("LawTotalSum");//第10个积分
var sum = (Number(payLegal) + Number(qualif) + Number(education) + Number(resid) + Number(entrent) + Number(paytaxet) + Number(age) + Number(honor) + Number(laeRecond)).toFixed(2);
/*
 *返回按钮
 */
function back() {
    var url = "/pointsSettled?page=lawAbidingRecord&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
};
$('#payLegal').html(payLegal);
$('#qualif').html(qualif);
$('#education').html(education);
$('#resid').html(resid);
$('#entrent').html(entrent);
$('#paytaxet').html(paytaxet);
$('#age').html(age);
$('#honor').html(honor);
$('#laeRecond').html(laeRecond);
$('#total').html(sum);
/*
 *重新计算
 */
function again() {
    localStorage.removeItem("LawTota");
    localStorage.removeItem("payment");
    localStorage.removeItem("selects");
    localStorage.removeItem("unitDormitory");
    localStorage.removeItem("selecteds");
    localStorage.removeItem("selectedings");
    localStorage.removeItem("haveProperty");
    localStorage.removeItem("legalLease");
    localStorage.removeItem("read");
    localStorage.removeItem("LawTota");
    localStorage.removeItem("educationSum");
    localStorage.removeItem("falgsEnter");
    localStorage.removeItem("falgsTaxes");
    localStorage.removeItem("payDate");
    localStorage.removeItem("ageTotalSum");
    localStorage.removeItem("honorTotal");
    localStorage.removeItem("LawTota");
    localStorage.removeItem("selecte");
    localStorage.removeItem("selected");
    localStorage.removeItem("resiTotalSum");
    localStorage.removeItem("falgs");
    var url = "/pointsSettled?page=pointsSettled&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
/*
 *目前的最终积分击败了全国用户的占比
 */
const arr = ["50", "79.75", "64.50", "41", "25", "85", "29", "66.17", "41", "71", "73.21", "53.58", "42.75", "65.04", "60.38", "49.08", "61.08", "73.08", "61.04", "54.24", "64.04", "58.33", "18.04", "4.67", "19.79", "-23.67", "5.67", "-17.33"]
var arrShao = []
for (k in arr) {
    if (sum > arr[k]) {
        arrShao.push(arr[k]);
    }
}
;
var ratio = ((arrShao.length / arr.length) * 100).toFixed(2) + "%";
$('#ratio').html(ratio);