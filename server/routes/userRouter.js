/*
 * @Author: xpxxy
 * @Date: 2024-02-02 22:52:16
 * @Description: 
 */
module.exports = app =>{
    const userRouter = require("../controller/userController.js");
    var router = require("express").Router();
    router.post("/", userRouter.create);
    router.get("/",userRouter.login);
    app.use('/api/login',router);
    app.use('/api/adduser',router);
}