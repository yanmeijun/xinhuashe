import crypto from 'crypto';
/**
 * 使用md5加密
 */
export const getmd5 = (str) =>{
  if (!str) {
    return str;
  }
  var md5 = crypto.createHash("md5");
  md5.update(str);
  str = md5.digest('hex');
  return str;
};
/*
* 验证身份证格式
* @param  {string}  idCard [身份证数据]
* @return {Boolean}  [true 格式正确  false 格式不正确]
*/
export const validateIdCard = (idCard)=>{
  //15位和18位身份证号码的正则表达式
  // var regIdCard = /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X|x])$)/;
  var regIdCard =/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  //如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length == 18) {
      var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }
      var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17);//得到最后一位身份证号码
      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          return true;
          //alert("恭喜通过验证啦！");

        } else {
          return false;
          //maskTip("身份证号码错误！");
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          //alert("恭喜通过验证啦！");
          return true;
        } else {
          //maskTip("身份证号码错误！");
          return false;

        }
      }
    }else{
      //maskTip("身份证号码错误！");
      return false;
    }
  } else {
    //alert("身份证格式不正确!");
    //maskTip("身份证号码错误！");
    return false;
  }
};
/*
* 校验特殊字符
* @param  {string}  str
* @return {Boolean}  [true 格式正确  false 格式不正确]
*/
export const checkCharacter = (str) => {
   var  pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
   if(pattern.test(str)){
     return false;
   }else{
     return true;
   }
};
/*
 *@author ymj
 *@effect替换成手机号和身份证号成***
 *@params [string] str, frontLen, endLen
 *@call手机：plusXing(MOBILE, 3, 4)  身份证：plusXing(SFCODE, 2, 2)
 * @returns [true 代表正确 false 代表格式错误]
 */
export const plusXing =(str, frontLen, endLen)=>{
  if (str != "") {
    var len = str.length - frontLen - endLen;
    var xing = '';
    for (var i = 0; i < len; i++) {
      xing += '*';
    }
    return str.substr(0, frontLen) + xing + str.substr(str.length - endLen);
  } else {
    return "";
  }
}
export const checkFileName = (file) => {
  var pattern = new RegExp("[`~!￥%@#$^&*()=|{}':;',\\[\\].<>?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
  const fileName = file.name.slice(0,file.name.lastIndexOf("."));
  if(pattern.test(fileName)){
    return false;
  }else{
    return true;
  }
};



