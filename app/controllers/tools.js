const crypto = require('crypto'),
    fs = require('fs'),
    config = require('../../config');
// const iv = new Buffer(config.get("system.crypt.iv"), "utf8"),
// secretKey = config.get("system.crypt.secretKey");

function encrypt(data) {
    let secretKey = crypto.createHash("md5").update(config.get("system.crypt.secretKey")).digest("hex");
    secretKey = new Buffer.from(secretKey, "hex");
    let cipher = crypto.createCipheriv("aes-128-cbc", secretKey, new Buffer.from(config.get("system.crypt.iv"), "utf8")),
        coder = [];
    coder.push(cipher.update(data, "utf8", "hex"));
    coder.push(cipher.final("hex"));
    return coder.join("");
}

/**
 * aes-128-ecb对称解密
 * @param {String} data，解密的密文
 * @param {String} secretKey，密钥
 * @param {Buffer} iv，向量，16位字节数组
 * @return {String} 明文
 * @api public
 */
function decrypt(data) {
    // console.log(secretKey)
    let secretKey = crypto.createHash("md5").update(config.get("system.crypt.secretKey")).digest("hex");
    secretKey = new Buffer.from(secretKey, "hex");
    let cipher = crypto.createDecipheriv("aes-128-cbc", secretKey, new Buffer.from(config.get("system.crypt.iv"), "utf8")),
        coder = [];
    coder.push(cipher.update(data, "hex", "utf8"));
    coder.push(cipher.final("utf8"));
    return coder.join("");
}

// var iv = new Buffer("abcdefgh12345678","utf8");
// var key = "我是密钥";
// var aes_cbc1 = encrypt("hello，我来自nodejs",key, iv);
// var aes_cbc2 = decrypt(aes_cbc1,key, iv);
// console.log("密文："+ aes_cbc1," / 明文："+aes_cbc2);
//
// var aes_cbc3 = cbcDecrypt("a35e0e7ed17002ae620f3c879fcbbe7cf81394257ca877c3d0c4543fd6437e46",key, iv);
// console.log("明文："+aes_cbc3);


exports.encrypt = encrypt;
exports.decrypt = decrypt;
// var key = decrypt("579aa5517288fcb3e73cf0b6149173e185c6edb8aabfa801ab93157bfc805e5311ddc61da1183d496c20686846958d73670a8f595360a2430a6525c48ce4871f8d2435bf5c3a46d743cb148323bcfe86c83a945800be7bce4487141a6c413a38b3e8845094c6d00f82f8fad9c7ce1f2f946661f5fcbe854b7852d71167aeee8105a79eb83ff01bcf7bf33990aa11ccb3ac35cb673e85b8654559bc06387dae30")
// console.log(key);
// var key1=JSON.parse(key);
// console.log("11111111111111111111111");
// console.log(key1)
// console.log(key1["vDate"])
// console.log(encrypt(text))
// console.log(decrypt(encrypt(text)))
// var cityName="北京市";
// cityName = cityName.replace(cityName[cityName.length-1],"")
// console.log(cityName)
// var b = "北";
// console.log(b.indexOf(cityName))
// var cityID = "112000";
// var cityNum = cityID[0] + cityID[1] + "0000"
// console.log(cityNum)
// console.log(Date.parse(new Date()))
// console.log(new Date())





