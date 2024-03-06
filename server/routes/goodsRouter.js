/*
 * @Author: xpxxy
 * @Date: 2024-02-20 21:57:47
 * @Description: 
 */



module.exports = app =>{
    const goodsRouter = require("../controller/goodsController.js");
    var router = require("express").Router();
    router.post("/api/findOneGoods", goodsRouter.findOneGoods);
    router.get("/api/findAllGoods", goodsRouter.findAllGoods);
    router.post("/api/addNewGoods", goodsRouter.addNewGoods);
    app.use('/', router);
    // app.use('/', router);
    // app.use('/', router);
    
}