/*
 * @Author: xpxxy
 * @Description: 
 *  用户相关操作的controller
 *  实现接口：
 *          1.登录注册
 *          2.   
 */

const { Op } = require("sequelize");
//挂载db的model
const db = require("../models");
//实例化用户的表
const User = db.user;
const FormInfo = db.formInfo;
const webase = require("../config/WeBase");
// const { where } = require("sequelize");
const utils = require("../utils/utils.js")
const svgCaptcha = require('svg-captcha');
const {response} = require("express");




/**
 * @description: 响应前端创建用户请求并将数据写入数据库，并发送成功或者失败提示
 * @param {*} req 请求体，json的用户名和密码（userID,pw）
 * @param {*} res
 * @return {*}  
 * @requestType POST
 */
//用户注册接口
exports.create= async (req,res)=>{
    let address="";
    try{
        let token = await webase.getUserToken();
        let response = await webase.webaseAddNewUser(token,req.body);
        address = response;
    }catch(error){
        res.status(500).send({
            code:"1001",
            message:"webase错误"
        })
        console.log("webase用户操作失败");
    }
    if(!req.body.userID){
       res.status(400).send({
            code:"1002",
            message: "用户的名称不得为空！"
       });
       return;
    }
    if(!req.body.pw){
        res.status(400).send({
            code:"1002",
            message: "用户的密码不得为空！"
        });
        return;
     }
     if(!req.body.phone){
        res.status(400).send({
            code:"1002",
            message: "用户的手机号不得为空！"
        });
        return;
     }
    const user = {
        userID: req.body.userID,
        name: req.body.name,
        pw: req.body.pw,
        phone:req.body.phone,
        address: address,
        role:req.body.role,
        status: 'on'
    };
    await User.create(user).then(data =>{
        
        if(data.length!=0){
            res.status(200).send({
                code: '1000',
                message: "ok!",
                data: data,
            })
        }
    }).catch(err =>{
        res.status(500).send({
            code:"500",
            message: 
                err.message || "创建用户出错，请查看console"
        })
    })
    
};
/**
 * @description: 用户登录接口，查询数据库用户，成功返回登录token凭证(AES加密后，密钥xpxxy)
 * @param {*} req 接受json {phone:手机号,pw:密码}
 * @param {*} res 200 400
 * @return {*} UUID
 * @requestType: GET
 */
exports.login= async (req,res)=>{
    const user = {
        phone:req.body.phone,
        pw:req.body.pw,
        captcha: req.body.captcha.toLowerCase()
    }
    // console.log(req.body);
    // console.log(req.session)
    if(user.captcha!==req.session.captcha.toLowerCase()){
        res.status(200).send({
            code:"2005",
            message:"验证码错误！"
        })

        return;
    }
    // req.session.captcha;
    if(!user.phone){
        res.status(400).send({
            code:"2001",
            message: "用户的手机号不得为空！"
        });
        return;
    }
    if(!req.body.pw){
         res.status(400).send({
            code:"2001",
            message: "用户的密码不得为空！"
         });
         return;
    }
    await User.findAll({
        where: { phone: user.phone}
    }).then(data =>{
        //判断是否存在
        if(data.length === 0){
            res.status(200).send({
                code:'2003',
                message:"用户不存在",
            })
            return
        }
        else{
            //判断是否停用
            if (data[0].status === 'off') {
                res.status(200).send({
                    code: '2004',
                    message: "登录失败,已停用的用户，请联系管理员",
                })
                return
            }
            //判断是否密码错误
            if(data[0].pw === user.pw ){
                let info = JSON.stringify(data[0])
                console.log(info)
                res.status(200).send({
                    code: "2000",
                    message: "登录成功！",
                    data: utils.aesEncrypt(info, 'xpxxy')

                })
                return
            }else{
                res.status(200).send({
                    code:"2002",
                    message:"密码错误"
                })
            }
        }
    //一般是数据库出错        
    }).catch(err =>{
        console.log(err)
        res.status(500).send({
            code:"500",
            message:"数据库出错",
            data:err
        })
    })
};
exports.loginButnocaptcha= async (req,res)=>{
    const user = {
        phone:req.body.phone,
        pw:req.body.pw,
     
    }
    // console.log(req.body);
    // console.log(req.session)
   
    // req.session.captcha;
    if(!user.phone){
        res.status(400).send({
            code:"2001",
            message: "用户的手机号不得为空！"
        });
        return;
    }
    if(!req.body.pw){
         res.status(400).send({
            code:"2001",
            message: "用户的密码不得为空！"
         });
         return;
    }
    await User.findAll({
        where: { phone: user.phone}
    }).then(data =>{
        //判断是否存在
        if(data.length === 0){
            res.status(200).send({
                code:'2003',
                message:"用户不存在",
            })
            return
        }
        else{
            //判断是否停用
            if (data[0].status === 'off') {
                res.status(200).send({
                    code: '2004',
                    message: "登录失败,已停用的用户，请联系管理员",
                })
                return
            }
            //判断是否密码错误
            if(data[0].pw === user.pw ){
                let info = JSON.stringify(data[0])
                console.log(info)
                res.status(200).send({
                    code: "2000",
                    message: "登录成功！",
                    data: utils.aesEncrypt(info, 'xpxxy')

                })
                return
            }else{
                res.status(200).send({
                    code:"2002",
                    message:"密码错误"
                })
            }
        }
    //一般是数据库出错        
    }).catch(err =>{
        console.log(err)
        res.status(500).send({
            code:"500",
            message:"数据库出错",
            data:err
        })
    })
};
exports.adminLogin= async (req,res)=>{
    const user = {
        phone:req.body.phone,
        pw:req.body.pw,
     
    }
    if(!user.phone){
        res.status(400).send({
            code:"2001",
            message: "用户的手机号不得为空！"
        });
        return;
    }
    if(!req.body.pw){
         res.status(400).send({
            code:"2001",
            message: "用户的密码不得为空！"
         });
         return;
    }
    await User.findAll({
        where: { phone: user.phone, role:'admin'}
    }).then(data =>{

            if(data[0].pw === user.pw ){
                let info = JSON.stringify(data[0])
                console.log(info)
                res.status(200).send({
                    code: "2000",
                    message: "登录成功！",
                    data: utils.aesEncrypt(info, 'xpxxy')

                })
                return
            }else{
                res.status(200).send({
                    code:"2002",
                    message:"密码错误"
                })
            }
        
    //一般是数据库出错        
    }).catch(err =>{
        console.log(err)
        res.status(500).send({
            code:"500",
            message:"数据库出错",
            data:err
        })
    })
};
/**
 * @description: 退出登录清除session
 * @param {*} req 请求体
 * @param {*} res 响应体
 * @return {*}
 * @requestType: post
 */
exports.logout = async (req, res) => {
    req.session.destroy();
    res.status(200).send({
        code:"2006",
        message:"退出成功！"
    })
}






/**
 * @description: 修改用户的账户状态
 * @param {*} req 请求体 接受json {status:"用户的当前状态"，phone:"用户手机号"}
 * @param {*} res 响应体 200成功 400入参错误
 * @return {*}返回结果
 * @requestType: post
 */
exports.changeStatus = async (req, res) => {

    //* mode: on represent off->on
    //*       off represent on ->off
    const user = {
        status: req.body.status,
        phone: req.body.phone,
    };
    if(user.status==='on'){
        await FormInfo.findOne({
            attributes:['receiverContact', 'senderContact','status'],
            where:{[Op.or]:[{receiverContact:user.phone},{senderContact:user.phone}],status:'on'}
        }).then(async response =>{
            if(!response){
                res.status(200).send({
                    code:"2008",
                    message:"状态不可更改"
                })
            }else{
                User.update({status:'off'},{where:{phone:user.phone}}).then(()=>{
                    res.status(200).send({
                        code:"2007",
                        message:"修改成功！"
                    })
                })
            }
        })
    }else {
        User.update({status:'on'},{where:{phone:user.phone}}).then(()=>{
            res.status(200).send({
                code:"2007",
                message:"修改成功！"
            })
        })
    }



} 
/**
 * @description: 验证码服务接口
 * @param {*} req 无
 * @param {*} res 
 * @return {*}返回验证码的svg和值
 * @requestType: get
 */    
exports.getCaptcha = async (req,res)=>{
    const captcha = svgCaptcha.create({
        size:4,
        noise:4,
        fontSize:50,
        width:100,
        height:35,
        color:false
    });
    req.session.captcha = captcha.text;
    console.log(req.session)
    // res.type('svg')
    res.status(200).send({
        data:captcha.data
    })
    return;
}
exports.getAllUser = async (req, res)=>{
    await User.findAll({
        attributes:['id','userID','name','address', 'phone', 'role', 'status', 'createdAt']
    }).then(response=>{
        if(response.length!==0){
            res.status(200).send({
                code:"2000",
                message:"ok",
                data:response
            })
        }else{
            res.status(200).send({
                code:"2003",
                message:"没有数据",
            })
        }
    }).catch(err=>{
        res.status(500).send({code:"500",message:err.message})
    })
}
exports.changeInfo = async (req, res)=>{
    await User.update({pw:req.body.pw},{where:{phone:req.body.phone}}).then(()=>{
        res.status(200).send({
            code:"2000",
            message:"OK"
        })
    })
}
