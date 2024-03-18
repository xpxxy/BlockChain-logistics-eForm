/*
 * @Author: xpxxy
 * @Description: 表单的所有定义
 */
module.exports = app =>{
    const formRouter = require("../controller/formController.js");
    var router = require("express").Router();
    router.post("/api/createLogisticsInfo", formRouter.createLogisticsInfo);
    router.get("/api/findOneLogisticsInfo", formRouter.findOneLogisticsInfo);
    router.get("/api/findAllLogisticsInfo", formRouter.findAllLogisticsInfo);
    // router.get("/api/testFind",formRouter.testFind);
    app.use('/', router);
    
}