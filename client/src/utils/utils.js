/*
 * @Author: xpxxy
 * @Date: 2024-02-03 23:44:20
 * @Description: 
 */
import CryptoJS from'crypto-js' 
/**
 * @description: 生成UUID
 * @return {*} UUID
 * 
 */
export function uuid() {
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

/**
 * @description: 解决区块链地址前面一大堆0的函数
 * @param {*} address 地址
 * @return {*}返回处理后的字符串
 *  
 */
export function addressToString( address){
     // 提取0x后面的部分  
     const hexValue = address.slice(2);  
     // 使用正则表达式匹配开头的连续0  
     const regex = /^0+/;  
     // 替换开头的连续0为空字符串  
     const result = hexValue.replace(regex, '');  
     // 将处理后的字符串与0x前缀重新组合  
     return '0x' + result;  
}
export function aesEncrypt(text, passphrase) {  
    var ciphertext = CryptoJS.AES.encrypt(text, passphrase);
    return ciphertext.toString(); 
}  
export function aesDecrypt(ciphertext, passphrase) {  
    var bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    return bytes.toString(CryptoJS.enc.Utf8); 
}  