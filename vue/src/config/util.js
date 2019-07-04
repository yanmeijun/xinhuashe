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
