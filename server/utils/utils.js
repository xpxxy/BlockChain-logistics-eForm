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
 * @description: 一个工具函数，用于处理查询出来的form信息，适用于findAll类型的查询
 * @param {*} data 一个form信息数组
 * @return {*} 处理完成的数据
 */
function formDataArrayProcess(data){
    //!深拷贝，非常关键不可缺少!!!
    const clonedData = JSON.parse(JSON.stringify(data));
    clonedData.forEach(logisticsInfo => {
        logisticsInfo.formAddr = logisticsInfo.forms[0].formAddr;
        logisticsInfo.createdAt = (new Date(logisticsInfo.createdAt)).toLocaleString();
        logisticsInfo.updatedAt = (new Date(logisticsInfo.createdAt)).toLocaleString();
        const updatedForms = logisticsInfo.forms.map(form => ({
            id: form.id,
            transitAddr: form.transitAddr,
            transitContact: form.transitContact,
            transitAddrInfo: form.transitAddrInfo,
            createdAt: (new Date(form.createdAt)).toLocaleString()

        }));
        logisticsInfo.forms = updatedForms;
        
    });
    return clonedData
};
/**
 * @description: 一个工具函数，用于处理查询出来的form信息，适用于findOne类型的查询
 * @param {*} data 一个对象
 * @return {*}
 */
function formDataObjProcess(data){
    const clonedData = JSON.parse(JSON.stringify(data)); // 深拷贝对象
    clonedData.formAddr = clonedData.forms[0].formAddr
    clonedData.createdAt = (new Date(clonedData.createdAt)).toLocaleString()
    clonedData.updatedAt = (new Date(clonedData.updatedAt)).toLocaleString()
const updatedForms = clonedData.forms.map(form => ({
    transitAddr: form.transitAddr,
    transitContact: form.transitContact,
    transitAddrInfo: form.transitAddrInfo,
    createdAt:(new Date(form.createdAt)).toLocaleString()
}));
clonedData.forms = updatedForms;
return clonedData
}
/**
 * @description: 一个工具函数，用来隐藏手机号中间4位
 * @param {*} data
 * @return {*}
 */
function hidePhoneNumber(data){
    const clonedData = JSON.parse(JSON.stringify(data));
    clonedData.forEach(logisticsInfo => {
        //*最原始的方法。。。。XD
        logisticsInfo.senderContact = String(logisticsInfo.senderContact).replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")
        logisticsInfo.receiverContact = String(logisticsInfo.receiverContact).replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")
    })
    return clonedData;
}
function changeTimeFormat(data){
    const clonedData = JSON.parse(JSON.stringify(data)); // 深拷贝对象
    clonedData.forEach(product=>{
        product.createdAt = (new Date(product.createdAt)).toLocaleString()
        product.updatedAt = (new Date(product.updatedAt)).toLocaleString()
    })
    return clonedData
} 
module.exports={
    uuid,
    addressToString,
    aesDecrypt,
    aesEncrypt,
    formDataArrayProcess,
    formDataObjProcess,
    hidePhoneNumber,
    changeTimeFormat
}