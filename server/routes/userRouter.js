/*
 * @Author: xpxxy
 * @Date: 2024-02-02 22:52:16
 * @Description: 
 */
module.exports = app =>{
    const userRouter = require("../controller/userController.js");
    var router = require("express").Router();
   
    router.get("/api/captcha",userRouter.getCaptcha);
    router.post('/api/logout', userRouter.logout);
    router.post("/api/login", userRouter.login);
    router.post("/api/loginNoCaptcha", userRouter.loginButnocaptcha);
    //!不要使用axios发json的get 草你妈测半天
    router.post("/api/adduser",userRouter.create);
    router.post("/api/changeStatus", userRouter.changeStatus);
    app.use('/',router);
   
}