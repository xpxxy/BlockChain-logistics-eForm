/*
 * @Author: xpxxy
 * @Description: 表单头的controller
 */
const db = require('../models');
const webase = require('../config/WeBase');
const FormInfo = db.formInfo;




/**
 * @description: 查找表单头信息接口，先查询库，再查链
 * @param {*} req 请求体
 * @param {*} res 响应体
 * @return {*} 
 * @requestType POST
 */
exports.findOneLogisticInfo = async (req, res) => {
    const logisticsInfoAddr = req.body.logisticsInfoAddr;
    if (!logisticsInfoAddr) {
        res.status(400).send({
            message: "表单头地址不得为空！"
        })
        return;
    }
    FormInfo.findOne({
        where: { logisticInfoAddr: logisticsInfoAddr }
    }).then(data => {
        if (data.length != 0) {
            res.status(200).send({
                code: "200",
                message: "ok!",
                data: data
            })
            return
        }
        else {
            res.status(201).send({
                code: "201",
                message: "没找到！"
            })
            return
        }
    }).catch(err => {
        res.status(500).send({
            code: "500",
            message:
                err.message || "查找信息时出错，请查看console"

        })
    })

};
/**
 * @description: 创建表单头
 * @param {*} req 请求体
 * @param {*} res 响应体
 * @return {*} 返回表单头的地址
 * @requestType POST
 */
exports.createLogisticInfo = async (req, res) => {
    const logisticInfo = {
        senderAddr: req.body.senderAddr,
        logisticsCompanyName: req.body.logisticsCompanyName,
        senderAddressInfo: req.body.senderAddressInfo,
        senderContact: req.body.senderContact,
        receiverAddr: req.body.receiverAddr,
        receiverAddressInfo: req.body.receiverAddressInfo,
        receiverContact: req.body.receiverContact,
        productAddr: req.body.productAddr,
        logisticsInfoAddr: '',
        
    };
    try{
        let token = await webase.getUserToken();
        let address = await webase.createLogisticsInfo(token,logisticInfo);
        logisticInfo.logisticsInfoAddr = address;
    }catch(error){
        console.error("webase操作超时");
        return;
        
    };
    FormInfo.create(logisticInfo).then(data =>{
        if(!logisticInfo.logisticsInfoAddr){
            res.status(400).send({
                code:"400",
                message:"插入的表头地址为空，请检查webase连接"
            })
            return
        }
        else{
            res.status(200).send({
                code:"200",
                message:"ok!",
                data:data
            })
            return
        }
    }).catch(err=>{
        res.status(500).send({
            message:
                err.message || "连接数据库时出错，请查看console"
        })
        return
    })
};
/**
 * @description: 查找所有的表单头信息
 * @param {*} req 请求头
 * @param {*} res 响应体
 * @return {*} 返回一个所有表单头的信息数组
 * @requestType POST
 */
exports.findAllLogisticInfo =  async ( req, res) =>{
    FormInfo.findAll().then(data =>{
        if(data.length != 0){
            res.status(200).send({
                code:"200",
                message:"ok",
                data:data
            })
            return
        }
        else{
            res.status(201).send({
                code:"201",
                message:"ok, but table no data"
            })
            return
        }
    }).catch(err=>{
        res.status(500).send({
            code:"500",
            message:
                err.message || "连接数据库出错，请检查console"
        })
        return
    })
};
/**
 * @description: 查询所有表单头的信息地址
 * @param {*} req 请求头
 * @param {*} res 响应体
 * @return {*} 返回所有表单头的信息地址数组
 * @requestType POST
 */
exports.findAllLogisticAddr = async (req, res)=>{
    FormInfo.findAll({attribute:"logisticsInfoAddr"}).then(data=>{
        if(data.length != 0){
            res.status(200).send({
                code:"200",
                message:"ok!",
                data:data,
            })
        }
        else{
            res.status(201).send({
                code:"201",
                message:"ok, but table no data"
            })
        }
    }).catch(err=>{
        res.status(500).send({
            code:"500",
            message:
                err.message || "数据库出现问题，请检查console"
        })
    })
};




