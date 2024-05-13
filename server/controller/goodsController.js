/*
 * @Author: xpxxy
 * @Date: 2024-02-04 22:21:52
 * @Description: 实现商品相关的接口
 * 
 * 
 */
const { Op } = require("sequelize");
const db = require("../models");
const webase = require("../config/WeBase");
const { aesDecrypt, changeTimeFormat } = require("../utils/utils");
const QueryString = require("qs");

const Goods = db.goods;
const FormInfo = db.formInfo;




//查找商品信息
/**
 * @description: 查找单个商品信息接口，先查询数据库有无，再去查链上
 * @param {*} req 请求体 接收JSON,name:查询的商品名称，在库商品支持模糊查询，非在库商品请提供全称
 * @param {*} res 响应体
 * @return {*}返回商品的数据
 * @requestType POST
 */
exports.findOneGoods = async (req, res)=>{
    const goodsName = JSON.parse(aesDecrypt(req.body.data,"xpxxy")).name;
    // console.log(goodsName);
    let productInfo = []
    let productAddr = []
    let product = {}
    if(!goodsName){
        res.status(400).send({
            code:"3003",
            message: "商品名称不得为空！",
        })
        return;
    }
    //^ 没有做重名检查（懒）默认查找第一个出现的，假如有两个香飘飘，返回第一个
    await Goods.findOne({
        where: { name: {[Op.like]: `%${ goodsName }%` }}
    }).then( async data =>{
        // console.log(data)
        //*检查数据是否找到
        if (data === null) {
            //*数据库没找到去链上找（费时间）
            try{
                let token = await webase.getUserToken();
                let response = await webase.getAllProducts(token);
                // console.log(response)
                productInfo = response[0]
                productAddr = response[1]
            }catch(error){
                res.status(200).send({
                    code:"3001",
                    message:"您所求商品即不在库内也不在链上，请检查您的输入"
                })
                // console.error(error)
            }
            //*对拿到的商品列表进行检索，然后查找是否有符合的项目
            for(var i=0;i< productInfo.length;i++){

                //*如果找到了，则将它存入数据库
                if(productInfo[i].name == goodsName ){
                    product = productInfo[i]
                    product.productAddr = productAddr[i]
                    await Goods.create(product).then(data=>{
                        if(data !=null ){
                            res.status(200).send({
                                code: "3000",
                                message: "查找成功！",
                                data: data
                            })
                            return
                        }
                    }).catch(err=>{
                        res.status(500).send({
                            code:"500",
                            message:"数据库出错" || err.message
                        })
                        return
                    })
                    
                }
            }

            //^如通过了上面的语句都没找到那确定该数据不存在
            res.status(200).send({
                code:"3001",
                message:"没有找到有关您所查询的数据"
            })
            return

        }
        //*数据库内直接就有这个数据
        else{
            //!检查是否停用
            if(data.status === 'off'){
                res.status(200).send({
                    code:"3001",
                    message:"没有找到有关您所查询的数据,请检查您的输入是否正确"
                })
                return
            }
            else{
                res.status(200).send({
                    code: '3000',
                    message: "ok！",
                    data: data
                })
                return
            }

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

/**
 * @description: 查询所有商品信息数据（数据库），一般不会去直接查webase慢且性能消耗大
 * @param {*} req 请求体
 * @param {*} res 返回体
 * @return {*}
 * @requestType GET
 */
exports.findAllGoods = async (req, res)=>{
    Goods.findAll().then(data =>{
        if(data != null){
            res.status(200).send({
                code:"3000",
                message:"ok!",
                data:changeTimeFormat(data),
            })
            return
        }
        else{
            res.status(200).send({
                code:"3001",
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
};
exports.getAllOnGoods = async (req, res)=>{
    Goods.findAll().then(data =>{
        if(data != null){
            res.status(200).send({
                code:"3000",
                message:"ok!",
                data:data,
            })
            return
        }
        else{
            res.status(200).send({
                code:"3001",
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
            res.status(500).send({
                code:"500",
                message:"插入地址为空，请检查webase连接"
            })

        }
        else{
            res.status(200).send({
                code:"3002",
                message:"创建成功！",
                // data:data
            })

        }
    }).catch(err=>{
        res.status(500).send({
            message:
                err.message || "连接数据库时出错，请查看console"
            
        })
        return
    })
}

/**
 * @description: 修改商品状态将检查商品是否被订单占用
 * @param {*} req {productAddr：修改的商品地址。status：商品当前状态}
 * @param {*} res 响应体
 * @return {*} 返回修改信息
 * @requestType: 
 */
exports.changeProductStatus = async (req, res) => {

    const product = {
        status: req.body.status,
        productAddr: req.body.productAddr
    };
  
        //*检查商品是否参与了订单
        await FormInfo.findAll({
            where:{[Op.and]: [{ status: 'on' }, { productAddr: product.productAddr }]}

        }).then(data=>{
            // console.log(data)
            //!若有则说明被占用，不得修改
            if(data.length != 0 ){
                res.status(200).send({
                    code:"3006",
                    message:"当前商品被运单占用，不得修改状态"
                })
                return
            }else{
                //*没有则允许修改，然检查商品要怎么改，是启用改停用还是反之
                if(product.status === 'on'){
                    Goods.update({ status: 'off' }, { where: { [Op.and]: [{ status: 'on' }, { productAddr: product.productAddr }] } }).then(()=>{
                        res.status(200).send({
                            code:"3005",
                            message:"修改成功！已停用"
                            
                        })
                        return
                    })
                }
                else{
                    Goods.update({ status: 'on' }, { where: { [Op.and]: [{ status: 'off' }, { productAddr: product.productAddr }] } }).then(()=>{
                        res.status(200).send({
                            code:"3005",
                            message:"修改成功！已启用"
                        })
                        return
                    })
                }
                
            }
        }).catch(err=>{
            res.status(500).send({
                code:"500",
                message:err
            })
        })
    
} 
exports.testcase= async (req,res)=>{
    const productName = req.body.name
    let productInfo = []
    let productAddr = []
    let product = {}
    try{
        let token = await webase.getUserToken();
        let response = await webase.getAllProducts(token);
        productInfo = response[0]
        productAddr = response[1]
    }
    catch(error){
        console.error(error)
    }
    for(var i=0;i< productInfo.length;i++){
        if(productInfo[i].name == '213'){
            product = productInfo[i]
            product.productAddr = productAddr[i]
        }
    }
    console.log(product)
    await Goods.create(product).then(data=>{
        console.log(data)
        res.status(200).send({
            message:"ok"
        })
    }).catch(err=>{
        res.status(500).send({
            message:err
        })
    })
    
}