/*
 * @Author: xpxxy
 * @Date: 2024-02-04 22:21:52
 * @Description: 实现商品相关的接口
 * 
 * 
 */
const db = require("../models");
const webase = require("../config/WeBase");
const Goods = db.goods;




//查找商品信息
/**
 * @description: 查找单个商品信息接口，先查询数据库有无，再去查链上
 * @param {*} req 请求体
 * @param {*} res 响应体
 * @return {*}
 * @requestType POST
 */
exports.findOneGoods = async (req, res)=>{
    const goodsName = req.body.name;
    if(!goodsName){
        res.status(400).send({
            message: "商品名称不得为空！",
        })
        return;
    }
    //^ 没有做重名检查（懒）默认查找第一个出现的，假如有两个香飘飘，返回第一个
    Goods.findOne({
        // attributes:['name'],
        where: { name: goodsName  }
    }).then(data =>{
        //*检查数据是否找到
        if (data.length!=0) {
            res.status(200).send({
                code: '200',
                message: "ok!",
                data: data
            })
            return
        }
        else{
            
            res.status(201).send({
                code: '201',
                message: "没找到！",
            })
            return
        }
       
    }).catch(err =>{
    //*数据库出错     
        res.status(500).send({
            code: '500',
            message:
                err.message || "查找商品时出错，请查看console"
        })
    })
    

    
    
    
}
exports.webasefindOneGoods= async (req,res)=>{
    const productAddr = req.body.productAddr;
    if(!productAddr){
        res.status(400).send({
            message:"addres cant be empty!"
        })
    }
    try{
        let token = await webase.getUserToken();
        let response = await webase.findOneGoods(token, productAddr);
        
        if(response != null){
            res.status(200).send({
                code:"200",
                message:"ok!",
                data:response,
            })
            return
        }
        else{
            res.status(201).send({
                code:"201",
                message:"OK...but no data"
            })
        }
    }
    catch(error){
        console.error("error!")
    }
    
}
/**
 * @description: 查询所有商品信息数据（数据库），一般不会去直接查webase慢且性能消耗大
 * @param {*} req 请求体
 * @param {*} res 返回体
 * @return {*}
 * @requestType GET
 */
exports.findAllGoods = async (req, res)=>{
    // const goods = {
    //    name:"",
    //    produceDate:"",
    //    expireDate:"",
    //    type:"",
    //    barcode:"",
    //    productAddr:"", 
    // }
    Goods.findAll().then(data =>{
        if(data != null){
            res.status(200).send({
                code:"200",
                message:"ok!",
                data:data,
            })
            return
        }
        else{
            res.status(201).send({
                code:"201",
                message:"table doesnt have any data!",
                
            })
            return
        }
    }).catch(err =>{
        res.status(500).send({
            message:
                err.message || "连接数据库时出错，请查看console",
        })
    })
}

/**
 * @description: 添加商品信息，返回链上地址
 * @param {*} req 请求体，包含商品信息
 * @param {*} res 响应体
 * @return {*}
 * @requestType: 
 */
exports.addNewGoods = async (req, res)=>{
    // let address = "";
    const product = {
        name: req.body.name,
        productionDate: req.body.productionDate,
        expirationDate: req.body.expirationDate,
        productType: req.body.productType,
        barcode: req.body.barcode,
        productAddr:"",
    }
    try{
        let token = await webase.getUserToken();
        let address = await webase.storeProduct(token,product);
        product.productAddr = address;
    }catch(error){
        console.log("webase操作超时")
        return
    }
    Goods.create(product).then(data =>{
        if(!product.productAddr){
            res.status(400).send({
                code:"400",
                message:"插入地址为空，请检查webase连接"
            })
            return
        }
        else{
            res.status(200).send({
                code:"200",
                message:"创建成功！",
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
} 