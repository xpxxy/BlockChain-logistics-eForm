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
// const axios = require('axios');
//创建Express的入口
var app = express();

var http = require('http');
var server = http.createServer(app);


//body-parser中间件解析数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//跨域请求
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    req.method == "OPTIONS" ? res.send(200) : next()
  })

//数据库连接
const db = require("./models");
//sequelize自带的异步同步方法
db.sequelize.sync();   

// ^ {alter:true}:自动改表但是外键会重复创建
// !{force:true}:强制改表，会先drop再create

//挂载路由
require("./routes/userRouter")(app)
require("./routes/goodsRouter")(app)






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

server.listen('3000', ()=>{
  console.log("server on, now listening localhost:3000");
});

