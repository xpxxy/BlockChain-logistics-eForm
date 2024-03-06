
/*
 * @Author: xpxxy
 * @Description: 定义物流电子表单
 */
module.exports=( sequelize, Sequelize)=>{
    const FormInfo = require("./formInfo")(sequelize, Sequelize)
    const Form = sequelize.define("form",{
        logisticInfoAddr:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,

        },
        transitAddr:{
            type: Sequelize.STRING,
            allowNull:true,
        },
        transitContact:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        formAddr:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        status:{
            type: Sequelize.ENUM('on','off','delete'),
            allowNull:false,
            
        },
    
    })
    Form.belongsTo(FormInfo,{
        foreignKey:{
            name: "logisticsInfoID",
            allowNull: false,
        },
        references:{
            model: FormInfo,
            key: 'id'
        }
    })
}