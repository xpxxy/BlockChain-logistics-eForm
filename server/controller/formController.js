/*
 * @Author: xpxxy
 * @Description: 表单头的controller
 */
const db = require('../models');
const webase = require('../config/WeBase');
const axios = require('axios');
// const { Sequelize } = require('sequelize');
const { formDataArrayProcess, hidePhoneNumber,formDataObjProcess } = require('../utils/utils');
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
 * @description: 创建表单
 * @param {*} req 请求体 一个object
 * @param {*} res 响应体
 * @return {*} 返回表单头的地址
 * @requestType POST
 */
exports.createForm = async (req, res) => {
    const logisticsInfo = {
        senderAddr: req.body.senderAddr,
        logisticsCompanyName: req.body.logisticsCompanyName,
        senderAddressInfo: req.body.senderAddrInfo,
        senderContact: req.body.senderContact,
        receiverAddr: req.body.receiverAddr,
        receiverAddressInfo: req.body.receiverAddrInfo,
        receiverContact: req.body.receiverContact,
        productAddr: req.body.productAddr,
        logisticsInfoAddr: "",

    };
    console.log(logisticsInfo)
    const formData = {
        logisticsInfoAddr:"",
        formAddr:"",
        transitAddr:req.body.senderAddr,
        transitContact: req.body.senderContact,
        transitAddrInfo: req.body.senderAddrInfo,
        formInfoId:''
    }
    try{
        let token = await webase.getUserToken();
        let infoAddress = await webase.createLogisticsInfo(token,logisticsInfo);
        logisticsInfo.logisticsInfoAddr = infoAddress;
        formData.logisticsInfoAddr = infoAddress;
        let formAddress = await webase.createLogisticsForm(token, formData);
        formData.formAddr = formAddress;
    }catch(error){
        console.error("webase操作超时");
        return;
        
    };
    await FormInfo.create(logisticsInfo,{include:[Goods]}).then(data =>{
        if(!logisticsInfo.logisticsInfoAddr){
            res.status(400).send({
                code:"400",
                message:"插入的表头地址为空，请检查webase连接"
            })
            
        }
    }).catch(err=>{
        res.status(500).send({
            message:
                err.message || "连接数据库时出错，请查看console"
        })
        return
    })
    FormInfo.findOne({
        attributes:['id'],where:{logisticsInfoAddr:logisticsInfo.logisticsInfoAddr}
    }).then(data=>{
        if(!data){
            res.status(500).send({
                code:"500",
                message:"竞争冒险，id虽然被插入但来不及被下面的函数捕获"
            })
        }else{
            console.log(data.id)
            formData.formInfoId = data.id;
            Form.create(formData).then(result =>{
                res.status(200).send({
                    code:'4000',
                    message:'创建成功！'
                })
                return
            }).catch(err=>{
                res.status(500).send({
                    code: "500",
                    message: "数据插入出现异常！"
                })
                return
            })
                
            
            
        }
    })
    
    
};
// exports.createForm = async (req, res) =>{
//     const form = {
//         logisticsInfoAddr: req.body.logisticsInfoAddr,
//         transitAddr: req.body.transitAddr,
//         transitContact: req.body.transitContact,
//         transitAddrInfo: req.body.transitAddrInfo,
//         logisticsInfoID:"",
//         status:req.body.status,
//         formAddr:req.body.formAddr,

//     }
//     // try{
//     //     let token = await webase.getUserToken();
//     //     let formAddr = await webase.createLogisticsForm(token, form)
//     //     form.formAddr = formAddr;
//     // }
//     // catch(error){
//     //     console.error("获取数据时出错"+error.message);

//     // }
//     if(!form.formAddr){
//         res.status(400).send({
//             code:"400",
//             message:"formAddr为空，请检查连接!"
//         })
//         return
//     }
//     FormInfo.findOne({attribute:["logisticsInfoID","logisticsInfoAddr"],where:{logisticsInfoAddr:form.logisticsInfoAddr}})
//     Form.create(form,{include:{where}}).then(data=>{
//         if(data.length !=0){
//             res.status(200).send({
//                 code:"200",
//                 message:"ok!",
//                 data:data
//             })
//         }
//     }).catch(err=>{
//         res.status(500).send({
//             code:"500",
//             message:
//                 err.message || "数据库错误，检查console"
//         })
//     })

// }

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
                attributes: ['id', 'transitAddr', 'transitContact', 'transitAddrInfo', 'formAddr', 'createdAt'],
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
                data: formDataArrayProcess(formInfoData)
            })
        }


    }).catch(err => {
        res.status(500).send({
            code: "500",
            message: err.message || "数据库报错！"
        })
    })
};
exports.getAllForm = async (req, res) => {
    FormInfo.findAll({
        include: [
            {
                model: Form,
                attributes: ['id', 'transitAddr', 'transitContact', 'transitAddrInfo', 'formAddr', 'createdAt'],
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
            res.status(200).send({
                code: "4000",
                message: "ok!",
                data: formDataArrayProcess(formInfoData)
            })
        }


    }).catch(err => {
        res.status(500).send({
            code: "500",
            message: err.message || "数据库报错！"
        })
    })
};
exports.getAttendForm = async (req, res) => {
    const Addr = req.body.address;
    const promises = [];
    //先从form表查询是否有中转的记录
    await Form.findAll({
        attributes:['logisticsInfoAddr'],
        distinct: ['logisticsInfoAddr'],
        where:{transitAddr:Addr}
    }).then(result=>{
        // console.log(result)
        //查询出存在中转数据则获得forminfoAddr去查formInfo执行联合查询
        if(!result){
          res.status(200).send({
            code:"4001",
            message:"没有中转数据"
          })
        }else{
            result.forEach( form => {
                promises.push(
                    FormInfo.findOne({
                        where: { logisticsInfoAddr: form.logisticsInfoAddr },
                        include: [
                            {
                                model: Form,
                                attributes: ['id', 'transitAddr', 'transitContact', 'transitAddrInfo', 'formAddr', 'createdAt'],
                            },
                            {
                                model: Goods
                            }
                        ],
                        order: [[{ model: Form }, 'id', 'ASC']],
                    }).then(formInfoData => formDataObjProcess(formInfoData))
                    
                );
            });
            Promise.all(promises).then(FinalResult=>{
                res.status(200).send({
                    code:'4000',
                    data:FinalResult
                });
            }).catch(err=>{
                res.status(500).send({
                    code:"500",
                    message:err.message|| "服务器内部错误"
                });
            });
        }
    }).catch(err=>{
        res.status(500).send({
            code:"500",
            message:"查询form数据发生错误！",
            error:err.message
        })
    })
    
};
/**
 * @description: 通过表单地址搜索表单信息，接受一个表单的地址和搜索的用户，若所搜索的表单不是用户相关的则手机号等信息将被处理打码
 * @param {*} req 
 * @param {*} res
 * @return {*}
 * @requestType: 
 */
exports.searchFormData = async(req, res)=>{
    const searchContent = {
        searchData: req.body.searchData,
        userAddr: req.body.userAddr
    }
    FormInfo.findAll({
        where: { logisticsInfoAddr: searchContent.searchData },
        include: [
            {
                model: Form,
                attributes: ['id', 'transitAddr', 'transitContact', 'transitAddrInfo', 'formAddr', 'createdAt'],
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
            if(formInfoData[0].receiverAddr!== searchContent.userAddr){
                res.status(200).send({
                    code: "4000",
                    message:"ok!",
                    data:hidePhoneNumber(formDataArrayProcess(formInfoData))
                })
            }else{
                res.status(200).send({
                    code: "4000",
                    message: "ok!",
                    data: formDataArrayProcess(formInfoData)
                })
            }
           
        }


    }).catch(err => {
        res.status(500).send({
            code: "500",
            message: err.message || "数据库报错！"
        })
    })

};
exports.getTransitForm = async (req, res) => {
    const userAddr = req.body.userAddr;
    FormInfo.findAll({
        where: { senderAddr: userAddr },
        include: [
            {
                model: Form,
                attributes: ['id', 'transitAddr', 'transitContact', 'transitAddrInfo', 'formAddr', 'createdAt'],
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
                data: formDataArrayProcess(formInfoData)
            })
        }


    }).catch(err => {
        res.status(500).send({
            code: "500",
            message: err.message || "数据库报错！"
        })
    })
};
exports.updateForm = async (req, res)=>{
    let working = false;
    const transitData={
        logisticsInfoAddr: req.body.logisticsInfoAddr,
        transitAddr: req.body.transitAddr,
        transitContact: req.body.transitContact,
        transitAddrInfo: req.body.transitAddrInfo,
        formAddr: req.body.formAddr
    }
    // console.log(transitData)
    try{
        let token = await webase.getUserToken();
        let res = await webase.updateForm(token, transitData)
        if(res =='Success'){
            working = true;
        }
        else{
            working = false;
        }
    }catch(error){
        console.error(error)
        return;
    };
    if(working){
        console.log(working);
        
        await FormInfo.findOne({
            attributes:['id'],
            where:{logisticsInfoAddr: transitData.logisticsInfoAddr}
        }).then(result=>{
            transitData.formInfoId = result.id
            console.log(transitData);
            Form.create(transitData).then(createResult=>{
                console.log(createResult)
                if(createResult.length!=0){
                    res.status(200).send({
                        code:"4007",
                        message:"更新成功！",
                        data:createResult
                    })
                }else{
                    res.status(200).send({
                        code:"4008",
                        message:"失败"
                    })
                }

                }).catch(err=>{
                    console.error(err.message);
                    res.status(200).send({
                        code:"500",
                        message:"数据库错误",
                        error:err.message

                    })
            }).catch(error=>{
                console.error(error.message);
                res.status(200).send({
                    code:"500",
                    message:"数据库错误",
                    error:error.message
                })
            })
        })
    }
}
exports.chengeFormStatus = async (req, res)=>{
    let working = false;
    const transitData={
        logisticsInfoAddr: req.body.logisticsInfoAddr,
        transitAddr: req.body.transitAddr,
        transitContact: req.body.transitContact,
        transitAddrInfo: req.body.transitAddrInfo,
        formAddr: req.body.formAddr
    }
    // console.log(transitData)
    try{
        let token = await webase.getUserToken();
        let res = await webase.updateForm(token, transitData)
        if(res =='Success'){
            working = true;
        }
        else{
            working = false;
        }
    }catch(error){
        console.error(error)
        return;
    };
    if(working){
        console.log(working);
        await FormInfo.findOne({
            attributes:['id'],
            where:{logisticsInfoAddr: transitData.logisticsInfoAddr}
        }).then(async result=>{
            transitData.formInfoId = result.id
            console.log(transitData);
            await Form.create(transitData).then(async response => {
                try {
                    await Form.update(
                        { status: 'off' },
                        { where: { logisticsInfoAddr: transitData.logisticsInfoAddr } }
                        
                    )
                    await FormInfo.update(
                        { status: "off" },
                        { where: { logisticsInfoAddr: transitData.logisticsInfoAddr } }
                    )
                } catch (err) {
                    res.status(200).send({
                        code: "4006",
                        message: "修改失败"
                    })
                };
                res.status(200).send({
                    code:"4009",
                    message:"修改成功！"
                })
            }).catch(err=>{
                res.status(500).send({
                    code:"500",
                    message:"尝试更新物流中转方出错！"
                })
            })
            
            
            
        })
    }else{
        res.status(500).send({
            code:"4004",
            message:"webase错误"
        })
    }
}




