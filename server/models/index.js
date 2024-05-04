/*
 * @Author: xpxxy
 * @Date: 2024-01-22 11:08:02
 * @Description: 定义数据库实例的相关操作
 */

const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB, //数据库名称
    dbConfig.user, //数据库连接用户
    dbConfig.PASSWORD, //数据库密码
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    }
)


//db实例 方便在其他文件中的数据的获取，一次定义就行
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//挂载model
db.user = require('./user.js')(sequelize,Sequelize);
db.goods = require('./goods.js')(sequelize,Sequelize);
db.formInfo = require('./formInfo.js')(sequelize, Sequelize);
db.form = require('./form.js')(sequelize, Sequelize);
db.formInfo.hasMany(db.form);

module.exports= db