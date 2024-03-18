/*
 * @Author: xpxxy
 * @Description: 
 *  用户相关操作的controller
 *  实现接口：
 *          1.登录注册
 *          2.   
 */


//挂载db的model
const db = require("../models");
//实例化用户的表
const User = db.user;
const webase = require("../config/WeBase");
// const { where } = require("sequelize");
const utils = require("../utils/utils.js")



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
        // console.log('token',token);
        // console.log(address);
    }catch(error){
        console.log("webase用户操作失败");
    }
    if(!req.body.userID){
       res.status(400).send({
        message: "用户的名称不得为空！"
       });
       return;
    }
    if(!req.body.pw){
        res.status(400).send({
         message: "用户的密码不得为空！"
        });
        return;
     }
     if(!req.body.phone){
        res.status(400).send({
         message: "用户的手机号不得为空！"
        });
        return;
     }
    const user = {
        userID: req.body.userID,
        pw: req.body.pw,
        phone:req.body.phone,
        address: address,
        role:req.body.role
    };
    await User.create(user).then(data =>{
        
        if(data.length!=0){
            res.status(200).send({
                code: '200',
                message: "ok!",
                data: data,
            })
        }
    }).catch(err =>{
        res.status(500).send({
            message: 
                err.message || "创建用户出错，请查看console"
        })
    })
    
};
/**
 * @description: 用户登录接口，查询数据库用户，成功返回登录token凭证(UUID)
 * @param {*} req
 * @param {*} res
 * @return {*} UUID
 * @requestType: GET
 */
exports.login= async (req,res)=>{
    const user = {
        phone:req.body.phone,
        pw:req.body.pw,
    }
    console.log(req.body)
    if(!user.phone){
        res.status(400).send({
         message: "用户的手机号不得为空！"
        });
        return;
    }
    if(!req.body.pw){
         res.status(400).send({
          message: "用户的密码不得为空！"
         });
         return;
    }
        
     
    User.findAll({
        where: { phone: user.phone ,pw: user.pw}
    }).then(data =>{
        // console.log(data)
        if(data!=null){
            let info = JSON.stringify(data[0])
            console.log(info)
            res.status(200).send({
                code:"200",
                message:"登录成功！",
                // UUID:utils.uuid(),
                data: utils.aesEncrypt(info,'xpxxy')

            })
            return
        }
        else{
            res.status(201).send({
                code:"201",
                message:"登录失败！",
                // UUID:utils.uuid(),
                // data:data
            })
            return
        }
    }).catch(err =>{
        console.log(err)
        res.status(500).send({
            code:"500",
            message:"数据库出错",
            data:err
        })
    })
};    
