/*
 * @Author: xpxxy
 * @Date: 2024-01-28 22:56:06
 * @Description: 
 * 实现webase相关的接口，并暴露出去
 * 1.webase登录（获取管理员访问的token）
 * 2.用户链上操作
 */



//*开发需要，使用默认root用户来访问webase接口，实际生产请使用设置自动重连获取临时cookie
//webase: admin Xpxxy123
const account = "admin";
const accountPwd = "ad3ebe5b756160942b0dff687e687df2ec615d3be6f8dcecf30536a5bdc935fb";
//智能合约地址
const contractAddr = "0xb2c7b791d168cbe410243ba50792cef47b75414d";
//合约部署者/调用合约人
const xpxxy = "0x93cea6ace626a64615443caeaac14293bd60895d";
const contractID = 200003;
const contractAbi = [{"inputs":[{"internalType":"address","name":"_logisticsInfoAddress","type":"address"},{"internalType":"address","name":"_commodityInfoAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"formAddress","type":"address"},{"indexed":true,"internalType":"address","name":"logisticsAddress","type":"address"}],"name":"FormCreated","type":"event"},{"inputs":[],"name":"commodityInfo","outputs":[{"internalType":"contract CommodityInfo","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_logisticsAddress","type":"address"},{"internalType":"address","name":"_transitAddress","type":"address"},{"internalType":"string","name":"_transitContact","type":"string"}],"name":"createLogisticsForm","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_senderAddress","type":"address"},{"internalType":"string","name":"_logisticsCompanyName","type":"string"},{"internalType":"string","name":"_senderAddressInfo","type":"string"},{"internalType":"string","name":"_senderContact","type":"string"},{"internalType":"address","name":"_receiverAddress","type":"address"},{"internalType":"address","name":"_productAddress","type":"address"},{"internalType":"string","name":"_receiverAddressInfo","type":"string"},{"internalType":"string","name":"_receiverContact","type":"string"}],"name":"createLogisticsInfo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"formAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"forms","outputs":[{"internalType":"address","name":"logistics","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllForms","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllLogisticsAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllProducts","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllProductsAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_formAddress","type":"address"}],"name":"getFormInfo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_logisticsAddress","type":"address"}],"name":"getLogisticsInfo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_productAddress","type":"address"}],"name":"getProductInfo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"logisticsInfo","outputs":[{"internalType":"contract LogisticsInfo","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_productionDate","type":"string"},{"internalType":"string","name":"_expiryDate","type":"string"},{"internalType":"string","name":"_type","type":"string"},{"internalType":"string","name":"_barcode","type":"string"}],"name":"storeProductInfo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_formAddress","type":"address"},{"internalType":"address","name":"_transitAddress","type":"address"},{"internalType":"string","name":"_transitContact","type":"string"}],"name":"updateLogisticsForm","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const qs = require("qs");
const axios = require("axios");
const utils = require("../utils/utils.js")

/**
 * @description: 获取webase登录的token
 * @return {*} token:登录所需的登录专用token
 * @requestType:get 
 */


//坑中坑，axios异步操作导致then后的异步的赋值没有被返回
async function getWeBaseloginToken() {
    try {
        var res = await axios.get('http://localhost:5000/mgr/WeBASE-Node-Manager/account/pictureCheckCode');
        var token = res.data.data.token;
        return token
    } catch (error) {
        console.error("获取webase登录验证token出错" + error.message);
        // throw error;
    };
    // return token//异步的操作
}

/**
 * @description: webase root用户登录返回用户token
 * @param {*} pictoken：上一步获取的登录token
 * @return {*} userToken:用户最终所有操作需要使用的AuthorizationToken
 * @requestType:POST 
 */
async function webaselogin(pictoken) {
    var userToken = "";
    var logindata = { 'account': account, 'accountPwd': accountPwd };
    var options = {
        method: 'POST',
        headers: { 'Content-type': 'application/x-www-form-urlencoded', 'Token': pictoken },
        data: qs.stringify(logindata),
        url: 'http://127.0.0.1:5000/mgr/WeBASE-Node-Manager/account/login?checkCode=8888',
    };
    try {
        var res = await axios(options)
        userToken = res.data.data.token;
        return userToken;

    } catch (error) {
        console.error("获取webase用户token失败" + error.message);
        // throw error;
    };
    
    
}
async function getUserToken(){
    try{
        var pictoken = await getWeBaseloginToken();
        var userToken = await webaselogin(pictoken);
        return userToken
    }catch (error){
        console.log("获取用户token失败")
    }
       
} 
/**
 * @description: webase新增用户（私钥）
 * @param {*} token 用户要用的管理员token
 * @param {*} data  req.body 一个{userID,pw,role,phone}
 * @return {*} address 用户的地址
 * @requestType: POST
 */

//!重要的事情再说一遍，token要他妈的加空格 -200块血的教训   --2024/2/3。
async function webaseAddNewUser(token, data){
    
    var address = "";
    var options = {
        method: 'POST',
        headers: { "content-type":"application/json", 'AuthorizationToken': 'Token '+token},
        data: {'groupId': "1",'description':data.role,'userName': data.userID, 'account': 'admin' },
        url: 'http://127.0.0.1:5001/WeBASE-Node-Manager/user/userInfo',
    };
    // console.log(options.headers)
    try{
        var res =await axios(options) //*非常关键，异步数据转同步拿
         //console.log('res',res.data);
        address = res.data.data.address;
        return address;
    }catch (error) {
        // console.log(error.data)
        console.error("webase添加用户失败");
        // throw error;
    
    }
}

/**
 * @description: 获取用户列表的接口
 * @param {*} token 一切操作要用的管理员用户token,和查询的参数(用户名或者私钥地址)
 * @return {*} 返回一个包含用户信息的列表;
 * @requestType GET
 */
async function searchUser(token,data){
    // var userList={};
    var options={
        method:'get',
        url:'http://127.0.0.1:5001/WeBASE-Node-Manager/user/userList/1/1/10',
        headers:{'AuthorizationToken': 'Token '+token },
    }
    try{
        var res = axios(options)
        var userList = res.data;
        return userList;
        console.log("search");
    }catch(error){
        // console.log("baocuo"+error)
    }
    
}


/**
 * @description: 查找单个商品信息
 * @param {*} token 用户token
 * @param {*} data userAddr用户地址，productAddr商品地址
 * @return {*} 返回商品的信息，需要用json.parse
 * @requestType POST 
 */
async function findOneGoods(token,data){
    var options={
        method:"post",
        url:"http://127.0.0.1:5001/WeBASE-Node-Manager/contract/transaction",
        headers:{'AuthorizationToken': 'Token '+token, "content-type":"application/json"},
        // maxRedirects:1,
        data:
            {
                "groupId": 1,
                "user":xpxxy,//传入的交易用户
                "contractName":"LogisticsForm",//调用的合约名
                "funcName":"getProductInfo",//调用的合约方法
                "funcParam":[data],
                "contractAbi": contractAbi,
                "contractId": contractID,
                "contractAddress":contractAddr,//合约地址
            }
        
    }
    try{
        let res = await axios(options);
        let productInfo = JSON.parse(res.data.data[0]);
        console.log(productInfo)
        return productInfo;
    }
    catch(error){
        console.error("报错！");
    }
    
}

/**
 * @description: 在链上存储商品
 * @param {*} token 用户token
 * @param {*} data 商品数据，必须按照顺序填写：name,productionDate,expirationDate,productType,barcode
 * @return {*} 返回区块链地址
 * @requestType POST
 */
async function storeProduct(token,data){
    var options={
        method:"post",
        url:"http://127.0.0.1:5001/WeBASE-Node-Manager/contract/transaction",
        headers:{'AuthorizationToken': 'Token '+token, "content-type":"application/json"},
        data:
            {
                "groupId": 1,
                "user": xpxxy,//传入的交易用户
                "contractName": "LogisticsForm",//调用的合约名
                "funcName": "storeProductInfo",//调用的合约方法
                "funcParam": [data.name, data.productionDate, data.expirationDate, data.productType, data.barcode],
                "contractAbi": contractAbi,
                "contractId": contractID,
                "contractAddress": contractAddr,//合约地址
            }
        
    }
    try{
        let res = await axios(options);
        let productAddr = res.data.data.output;
        console.log(res.data)
        return utils.addressToString(productAddr);
    }catch(error){
        console.error(error);
    }
}
/**
 * @description: 在链上存储物流表单头信息
 * @param {*} token 用户操作token
 * @param {*} data 物流表单所需信息
 * @return {*} 返回链上地址
 * @requestType POST
 */
async function createLogisticsInfo(token, data){
    var options = {
        method:"post",
        url:"http://127.0.0.1:5001/WeBASE-Node-Manager/contract/transaction",
        headers:{'AuthorizationToken': 'Token '+token, "content-type":"application/json"},
        data:
            {
                "groupId": 1,
                "user": xpxxy,//传入的交易用户
                "contractName": "LogisticsForm",//调用的合约名
                "funcName": "createLogisticsInfo",//调用的合约方法
                "funcParam": [data.senderAddr, data.logisticsCompanyName, data.senderAddressInfo, data.senderContact, data.receiverAddr, data.productAddr, data.receiverAddressInfo, data.receiverContact],
                "contractAbi": contractAbi,
                "contractId": contractID,
                "contractAddress": contractAddr,//合约地址
            }
    }
    try{
        let res = await axios(options);
        let LogisticsInfoAddr = res.data.data.output;
        console.log(res.data)
        return utils.addressToString(LogisticsInfoAddr);
    }
    catch(error){
        console.error("webase服务连接出错"+error)
    }
};
/**
 * @description: 创建电子表单
 * @param {*} token 用户token
 * @param {*} data 数据，包含表单头的地址，后续中转方的地址和联系方式
 * @return {*} 返回表单的地址
 * @requestType POST
 */
async function createLogisticsForm(token,data){
    var options = {
        method:"post",
        url:"http://127.0.0.1:5001/WeBASE-Node-Manager/contract/transaction",
        headers:{'AuthorizationToken': 'Token '+token, "content-type":"application/json"},
        data:
            {
                "groupId": 1,
                "user": xpxxy,//传入的交易用户
                "contractName": "LogisticsForm",//调用的合约名
                "funcName": "createLogisticsForm",//调用的合约方法
                "funcParam": [data.LogisticsInfoAddr, data.transitAddr, data.transitContact],
                "contractAbi": contractAbi,
                "contractId": contractID,
                "contractAddress": contractAddr,//合约地址
            }
    }
    try{
        let res = await axios(options);
        let formAddr = res.data.data.output;
        console.log(res.data)
        return utils.addressToString(formAddr);
    }
    catch(error){
        console.error("webase连接错误"+error)
    }
};
/**
 * @description: 获取表单头信息
 * @param {*} token 用户token
 * @param {*} data 表单头地址
 * @return {*} 返回表单头信息，JSON
 * @requestType POST
 */
async function getLogisticsInfo(token,data){
    var options = {
        method:'post',
        url:"http://127.0.0.1:5001/WeBASE-Node-Manager/contract/transaction",
        headers:{'AuthorizationToken': 'Token '+token, "content-type":"application/json"},
        data:
            {
                "groupId": 1,
                "user": xpxxy,//传入的交易用户
                "contractName": "LogisticsForm",//调用的合约名
                "funcName": "getLogisticsInfo",//调用的合约方法
                "funcParam": [data.LogisticsInfoAddr],
                "contractAbi": contractAbi,
                "contractId": contractID,
                "contractAddress": contractAddr,//合约地址
            }
    };
    try{
        let res = await axios(options);
        let logisticsInfo = JSON.parse(res.data.data[0]);
        return logisticsInfo;
    }catch(error){
        console.error("webase参数错误"+error);
    }
};
/**
 * @description: 获取一个电子表单的所有信息
 * @param {*} token 用户token
 * @param {*} data 这个表单的地址
 * @return {*} 返回这个表单的所有信息 JSON
 * @requestType POST
 */
async function getLogisticsForm(token,data){
    var options = {
        method:'post',
        url:"http://127.0.0.1:5001/WeBASE-Node-Manager/contract/transaction",
        headers:{'AuthorizationToken': 'Token '+token, "content-type":"application/json"},
        data:
            {
                "groupId": 1,
                "user": xpxxy,//传入的交易用户
                "contractName": "LogisticsForm",//调用的合约名
                "funcName": "getFormInfo",//调用的合约方法
                "funcParam": [data.formAddr],
                "contractAbi": contractAbi,
                "contractId": contractID,
                "contractAddress": contractAddr,//合约地址
            }
    };
    try{
        let res = await axios(options);
        let formInfo = JSON.parse(res.data.data[0]);
        return formInfo;
    
    }catch(error){
        console.error("webase参数出错"+error);

    }
};
/**
 * @description: 获取链上所有的商品信息 //!不建议经常使用，性能开销大且gas消耗高
 * @param {*} token 用户token
 * @param {*} data  无特殊参数
 * @return {*} 返回一个JSON数组包含所有的商品信息
 * @requestType POST
 */
async function getAllProducts(token,data){
    var options = {
        method:'post',
        url:"http://127.0.0.1:5001/WeBASE-Node-Manager/contract/transaction",
        headers:{'AuthorizationToken': 'Token '+token, "content-type":"application/json"},
        data:
            {
                "groupId": 1,
                "user": xpxxy,//传入的交易用户
                "contractName": "LogisticsForm",//调用的合约名
                "funcName": "getAllProducts",//调用的合约方法
                "funcParam": [],
                "contractAbi": contractAbi,
                "contractId": contractID,
                "contractAddress": contractAddr,//合约地址
            }
    };
}


module.exports = {
    getUserToken,
    webaseAddNewUser,
    searchUser,
    findOneGoods,
    storeProduct,
    createLogisticsInfo,
    getLogisticsInfo,
    getLogisticsForm,
    getAllProducts,
    

};