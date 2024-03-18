/*
 * @Author: xpxxy
 * @Date: 2024-01-21 10:19:27
 * @Description: 
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors')
var corsOptions = {
  origin:"http://localhost:8000"
};
// const axios = require('axios');
//创建Express的入口
var app = express();

var http = require('http');
var server = http.createServer(app);


app.use(cors(corsOptions))
//body-parser中间件解析数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//数据库连接
const db = require("./models");
//sequelize自带的异步同步方法
db.sequelize.sync();   

// ^ {alter:true}:自动改表但是外键会重复创建
// !{force:true}:强制改表，会先drop再create

//挂载路由
require("./routes/userRouter")(app)
require("./routes/goodsRouter")(app)
require("./routes/formRouter")(app)





app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



server.listen('3000', ()=>{
  console.log("server on, now listening localhost:3000");
});

