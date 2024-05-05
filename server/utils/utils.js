/*
 * @Author: xpxxy
 * @Date: 2024-02-03 23:44:20
 * @Description: 
 */
const CryptoJS = require('crypto-js')
/**
 * @description: 生成UUID
 * @return {*} UUID
 * 
 */
function uuid() {
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

/**
 * @description: 解决区块链地址前面一大堆0的函数
 * @param {*} address 地址
 * @return {*}返回处理后的字符串
 *  
 */
function addressToString( address){
     // 提取0x后面的部分  
     const hexValue = address.slice(2);  
     // 使用正则表达式匹配开头的连续0  
     const regex = /^0+/;  
     // 替换开头的连续0为空字符串  
     const result = hexValue.replace(regex, '');  
     // 将处理后的字符串与0x前缀重新组合  
     return '0x' + result;  
};
/**
 * @description: AES算法加密
 * @param {*} text 明文
 * @param {*} passphrase 密钥
 * @return {*}加密完成的字符串
 */
function aesEncrypt(text, passphrase) {  
    var ciphertext = CryptoJS.AES.encrypt(text, passphrase);
    return ciphertext.toString(); 
};
/**
 * @description: AES解密
 * @param {*} ciphertext 密文
 * @param {*} passphrase 密钥
 * @return {*} 解密后字符串
 */
function aesDecrypt(ciphertext, passphrase) {  
    var bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    return bytes.toString(CryptoJS.enc.Utf8); 
};
/**
 * @description: 一个工具函数，用于处理查询出来的form信息
 * @param {*} data 一个form信息数组
 * @return {*} 处理完成的数据
 */
function formDataProcess(data){
    //!深拷贝，非常关键不可缺少!!!
    const clonedData = JSON.parse(JSON.stringify(data));
    clonedData.forEach(logisticsInfo => {
        logisticsInfo.formAddr = logisticsInfo.forms[0].formAddr
        const updatedForms = logisticsInfo.forms.map(form => ({
            id: form.id,
            transitAddr: form.transitAddr,
            transitContact: form.transitContact,
            transitAddrInfo: form.transitAddrInfo
        }));
        logisticsInfo.forms = updatedForms;
        
    });
    return clonedData
};
function hidePhoneNumber(data){
    const clonedData = JSON.parse(JSON.stringify(data));
    clonedData.forEach(logisticsInfo => {
        //*最原始的方法。。。。XD
        logisticsInfo.senderContact = logisticsInfo.senderContact.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")
        logisticsInfo.receiverContact = logisticsInfo.receiverContact.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")
    })
    return clonedData;
}  
module.exports={
    uuid,
    addressToString,
    aesDecrypt,
    aesEncrypt,
    formDataProcess
}