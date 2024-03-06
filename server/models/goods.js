module.exports=(sequelize, Sequelize)=>{
    //Goods表的字段定义
   const Goods = sequelize.define("goods",{
       name: {
           type: Sequelize.STRING,
           allowNull: false
       },
       productionDate: {
           type: Sequelize.STRING,
           allowNull: false
       },
       expirationDate: {
           type: Sequelize.STRING,
           allowNull: false
       },
       productType:{
           type: Sequelize.STRING,
           allowNull: false
       },
       barcode:{
           type: Sequelize.STRING,
           allowNull: false,
           unique:true,
       },
       productAddr:{
           type: Sequelize.STRING(42),
           allowNull: false,
           unique:true,
           primaryKey:true,
           
       }
   })
   return Goods

}