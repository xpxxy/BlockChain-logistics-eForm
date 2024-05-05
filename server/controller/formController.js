/*
 * @Author: xpxxy
 * @Description: 表单头的controller
 */
const db = require('../models');
const webase = require('../config/WeBase');
const axios = require('axios');
const { Sequelize } = require('sequelize');
const { formDataProcess } = require('../utils/utils');
const FormInfo = db.formInfo;
const Form = db.form;
const Goods = db.goods;




/**
 * @description: 查找表单头信息接口，先查询库，再查链
 * @param {*} req 请求体
 * @param {*} res 响应体
 * @return {*} 
 * @requestType POST
 */
exports.findOneLogisticsInfo = async (req, res) => {
    const logisticsInfoAddr = req.body.logisticsInfoAddr;
    if (!logisticsInfoAddr) {
        res.status(400).send({
            message: "表单头地址不得为空！"
        })
        return;
    }
    FormInfo.findOne({
        where: { logisticsInfoAddr: logisticsInfoAddr }
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
exports.createLogisticsInfo = async (req, res) => {
    const logisticsInfo = {
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
        let address = await webase.createLogisticsInfo(token,logisticsInfo);
        logisticsInfo.logisticsInfoAddr = address;
    }catch(error){
        console.error("webase操作超时");
        return;
        
    };
    FormInfo.create(logisticsInfo,{include:[Goods]}).then(data =>{
        if(!logisticsInfo.logisticsInfoAddr){
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
exports.createForm = async (req, res) =>{
    const form = {
        logisticsInfoAddr: req.body.logisticsInfoAddr,
        transitAddr: req.body.transitAddr,
        transitContact: req.body.transitContact,
        transitAddrInfo: req.body.transitAddrInfo,
        logisticsInfoID:"",
        status:req.body.status,
        formAddr:"",
    }
    try{
        let token = await webase.getUserToken();
        let formAddr = await webase.createLogisticsForm(token, form)
        form.formAddr = formAddr;
    }
    catch(error){
        console.error("获取数据时出错"+error.message);

    }
    if(!form.formAddr){
        res.status(400).send({
            code:"400",
            message:"formAddr为空，请检查连接!"
        })
        return
    }
    FormInfo.findOne({attribute:["logisticsInfoID","logisticsInfoAddr"],where:{logisticsInfoAddr:form.logisticsInfoAddr}})
    Form.create(form,{include:{where}}).then(data=>{
        if(data.length !=0){
            res.status(200).send({
                code:"200",
                message:"ok!",
                data:data
            })
        }
    }).catch(err=>{
        res.status(500).send({
            code:"500",
            message:
                err.message || "数据库错误，检查console"
        })
    })

}

/**
 * @description: 查找所有的表单头信息
 * @param {*} req 请求头
 * @param {*} res 响应体
 * @return {*} 返回一个所有表单头的信息数组
 * @requestType POST
 */
exports.findAllLogisticsInfo =  async ( req, res) =>{
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
exports.findAllLogisticAddr = async (req, res) => {
    FormInfo.findAll({ attribute: "logisticsInfoAddr" }).then(data => {
        if (data.length != 0) {
            res.status(200).send({
                code: "200",
                message: "ok!",
                data: data,
            })
        }
        else {
            res.status(201).send({
                code: "201",
                message: "ok, but table no data"
            })
        }
    }).catch(err => {
        res.status(500).send({
            code: "500",
            message:
                err.message || "数据库出现问题，请检查console"
        })
    })
};
/**
 * @description: 获取表单信息（链上查询）
 * @param {*} req 请求体
 * @param {*} res 返回体
 * @return {*} 返回一个数组，第一部分是表单头信息，剩下的三组数据是中转方的溯源数据。
 * @requestType: get
 */
exports.getFormData = async (req, res)=>{
    const searchAddr = req.body.formAddr
    let formData = [];
    try{
        let token = await webase.getUserToken();
        let resData = await webase.getFormInfo(token,searchAddr);
        
        formData = resData;
        // res.status(200).send({
        //     data:formData
        // })
    }catch(err){
        //webase连接出错，一般这个时候后端已经抛出终止了
        res.status(200).send({
            code:"4005",
            message:"webase出错"
        })
        console.error(err.message);
    }
    // if(formData.length===1){
    //     //合约的参数不对，一般是信息填错了或者查询的数据不存在。
    //     res.status(200).send({
    //         code:"4004",
    //         message:"合约参数有误，请检查",
    //         data:formData
    //     })
    // }
    // let formAddr = formData[1];
    // let transitAddr = formData[2];
    // let transitContact = formData[3];
    // let transitAddrInfo = formData[4];
    // let insertData=[];
    // const form = {
    //     logisticsInfoAddr:"",
    //     transitAddr:"",
    //     transitContact:"",
    //     transitAddrInfo:"",
    //     formAddr:""
    // }
    // //&创建电子表单会自动添加一次transit,这时相当于第一任溯源中间人为发起方自己，所以不用担心数组越界。
    // for(var i = 0; i < transitAddr.length; i++){
    //     form.formAddr = formAddr;
    //     form.transitAddr = transitAddr[i];
    //     form.transitContact = transitContact[i];
    //     form.transitAddrInfo = transitAddrInfo[i];
    //     insertData.push(form)
    // }
    // if(insertData.length!=0){
    //     res.status(200).send({
    //         code:"4000",
    //         data:insertData
    //     })
    
    // }
    
   
};
/**
 * @description: 获取用户的表单信息
 * @param {*} req 请求体
 * @param {*} res 响应体
 * @return {*} 返回一个数组 格式：[{..., [],...},{..., [], ...}...]
 * @requestType: 
 */
exports.getUserForm = async (req, res) => {
    const userAddr = req.body.userAddr;
    FormInfo.findAll({
        where: { receiverAddr: userAddr },
        include: [
            {
                model: Form,
                attributes: ['id', 'transitAddr', 'transitContact', 'transitAddrInfo', 'formAddr'],
            },
            {
                model: Goods
            }
        ],
        order: [[{ model: Form }, 'id', 'ASC']],


    }).then(formInfoData => {
        if (formInfoData.length == 0) {
            res.status(200).send({
                code: "4001",
                message: "没有"
            })
        } else {
            //!注意深拷贝!!
            res.status(200).send({
                code: "4000",
                message: "ok!",
                data: formDataProcess(formInfoData)
            })
        }


    }).catch(err => {
        res.status(500).send({
            code: "500",
            message: err.message || "数据库报错！"
        })
    })
};



// exports.testFind = async (req, res)=>{
//     const formAddr = req.body.formAddr
//     try{
//         let token = await webase.getUserToken();
//         let formData = await webase.getFormInfo(token,formAddr);
//         res.status(200).send({
//             code:"4000",
//             message:"ok",
//             data:formData,
//         })

//     }catch(err){
//         console.error(err.message);
//     }
   
// }



