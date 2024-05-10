/*
 * @Author: xpxxy
 * @Date: 2024-02-20 21:57:47
 * @Description: 商品的所有路由定义
 */
module.exports = app =>{
    const goodsRouter = require("../controller/goodsController.js");
    var router = require("express").Router();
    router.post("/api/findOneGoods", goodsRouter.findOneGoods);
    router.get("/api/findAllGoods", goodsRouter.findAllGoods);
    router.post("/api/addNewGoods", goodsRouter.addNewGoods);
    router.post("/api/changeProductStatus", goodsRouter.changeProductStatus);
    router.get("/api/getAllOnProducts", goodsRouter.getAllOnGoods)
    app.use('/', router);
    
}