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
    }
    console.log(req.body)
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
        phone: req.body.phone
    };
    if(user.status === 'on'){
        await User.update({ status: 'off' }, { where: { [Op.and]: [{ status: 'on' }, { phone: user.phone }] } }).then(data => {
            // console.log(data);
            if (data[0] === 1) {
                res.status(200).send({
                    code: "200",
                    message: "修改成功！"
                })
            }
            else {
                res.status(400).send({
                    code: '400',
                    message: "请勿重复修改！"
                })
            }

        }).catch(err => {
            res.status(500).send({
                code: "500",
                message:
                    err.message || "数据库连接出错"
            })
        })
        return  
    }else if(user.status === 'off'){
        await User.update({ status: 'on' }, { where: { [Op.and]: [{ status: 'off' }, { phone: user.phone }] } }).then(data => {
            // console.log(data);
            if (data[0] === 1) {
                res.status(200).send({
                    code: "200",
                    message: "修改成功！"
                })
            }
            else {
                res.status(400).send({
                    code: '400',
                    message: "请勿重复修改！"
                })
            }

        }).catch(err => {
            res.status(500).send({
                code: "500",
                message:
                    err.message || "数据库连接出错"
            })
        })
        return  
    }else{
        res.status(400).send({
            code:"400",
            message:"你的参数有问题"
        })
        return;
    }
    
}    
