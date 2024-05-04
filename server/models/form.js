
/*
 * @Author: xpxxy
 * @Description: 定义物流电子表单
 */
module.exports=( sequelize, Sequelize)=>{
    const FormInfo = require("./formInfo")(sequelize, Sequelize)
    const Form = sequelize.define("form",{
        logisticsInfoAddr:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: false,

        },
        transitAddr:{
            type: Sequelize.STRING,
            allowNull:true,
        },
        transitContact:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        transitAddrInfo:{
            type: Sequelize.STRING,
            allowNull:true,
        },
        formAddr:{
            type: Sequelize.STRING,
            allowNull: false,
            
        },
        status:{
            type: Sequelize.ENUM('on','off','delete'),
            allowNull:false,
            defaultValue:'on',
            
        },
    
    })
    // Form.belongsTo(FormInfo,{
    //     foreignKey:{
    //         name: "logisticsInfoID",
    //         allowNull: false,
    //     },
    //     references:{
    //         model: FormInfo,
    //         key: 'id'
    //     }
    // })
    return Form
}