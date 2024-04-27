
/*
 * @Author: xpxxy
 * @Description:定义物流信息表 
*/
module.exports=( sequelize, Sequelize )=>{
    const Goods = require("./goods")(sequelize, Sequelize)
    const FormInfo = sequelize.define("formInfo",{
        senderAddr:{
            type: Sequelize.STRING(42),
            allowNull: false
        },
        logisticsCompanyName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        senderAddressInfo:{
            type: Sequelize.STRING(42),
            allowNull: false
        },
        senderContact:{
            type: Sequelize.BIGINT(11),
            allowNull: false
        },
        receiverAddr:{
            type: Sequelize.STRING(42),
            allowNull: false
        },
        receiverAddressInfo:{
            type: Sequelize.STRING,
            allowNull: false
        },
        receiverContact:{
            type: Sequelize.BIGINT(42),
            allowNull: false
        },
        logisticsInfoAddr:{
            type: Sequelize.STRING(42),
            allowNull: false,
            unique:true,
        },
        status: {
            type: Sequelize.ENUM('on','off'),
            allowNull: false,
            defaultValue: 'on',
        }
        
        
    })
    //& 一般不建议拿业务相关字段作为外键，但是我这里是有需要所以这样做
    FormInfo.belongsTo(Goods,{
        foreignKey:{
            name:'productAddr', 
            allowNull:false,
            
        },
        references: {  
            model: Goods, // 关联到 Goods 模型  
            key: 'productAddr' // 关联到 Goods 模型的 productAddr 字段  
        }  
    })
    return FormInfo
}