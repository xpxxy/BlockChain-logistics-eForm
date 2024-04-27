/*
 * @Author: xpxxy
 * @Date: 2024-01-22 16:52:57
 * @Description: 定义用户表的相关操作
 */
module.exports=(sequelize, Sequelize)=>{
     //user表的字段定义
    const User = sequelize.define("user",{
        userID: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name:{
            type: Sequelize.STRING(20),
            allowNull: false
        },
        pw: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.BIGINT(11),
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM('admin','user','transit'),
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('on','off'),
            allowNull: false,
            defaultValue: 'on',
        }
    })
    return User

}