[![pkm3XHP.png](https://s21.ax1x.com/2024/05/13/pkm3XHP.png)](https://imgse.com/i/pkm3XHP) 



# 区块链电子物流商品表单系统 
#### Fisco Bcos based Commodity e-form system


本系统是基于Vue+Express+FiscoBocs打造的区块链电子物流表单系统。

### 其主要实现了以下功能：

   1.登记物流数据上链保存；
  
   2.商品信息数据上链保存；

   3.追踪物流中间环节数据，物流的中途的转运运输数据将被追踪溯源，并以表格形式列出；

   4.基本的用户管理；

   5.对商品数据和物流表单数据的基本管理，包括创建、更新、终止、和状态管理。

## 部署系统：

  理论上可以全程Linux部署,但最终为了演示方便和使用ubuntu server部署区块链，最后选择了Windows + Linux 混合。
  
## 部署要求：

|软件|版本|
|-|-|
|NodeJS|18+|
|NPM|9.6+|

前后端运行基础需要的软件包：

|包名|版本|
|-|-|
|express|4.18.2+|
|vite|4.2.1+|

其他的软件包均通过NPM 管理

***

## 部署过程：

### 前端部署：
前端依次执行:
```
cd /client
npm install
```
等待安装完成后,服务器将在localhost:8000启动，请确保该端口没有被占用。
```
npm run dev
```
### 后端部署：
进入server目录，修改/config下的db.js 将数据库连接改为你的配置

```
module.exports={
    HOST: "localhost" , #你的连接地址
    user: "root",       #使用的用户
    PASSWORD: "123321", #密码
    DB: "deliveryDB",   #数据库名字
    dialect: "mysql",   #连接的数据库类型
}
```
sql文件已给出

进入同文件下的webase.js 修改头部的几个变量
```
const account = "";               #webase的用户
const accountPwd = "";            #密码的pwd，在webase执行一次登录即可在浏览器的F12中获取到
const groupId = '';               #操作的集群
const contractAddr = "";          #合约的地址
const xpxxy = "";                 #调用合约的用户
```
在server目录下开启终端执行：
```
npm install
```
待安装完成后执行：
```
node app.js
```
需要保证3000端口不被占用，如果占用修改app.js的端口。
## 区块链端部署：
参考webase的官方文档完整部署章节[WeBaseDoc](https://webasedoc.readthedocs.io/zh-cn/lab/docs/WeBASE/install.html)
部署完成后需要修改两个文件：
1.webase-node-mgr的conf下的application.yml:
```
....
Spring:
       ....
        url:....     #最后面加上&useSSL=false
....
enableVerficationCode: false
```
同理在webase-sign的conf下的同名文件的spring下的字段也是一样的

若是虚拟机，请开放虚拟机端口5000-5004

若是远程服务器，请修改webase.js的内的各项接口的连接地址

合约的部署可在webase浏览器端直接完成，不在赘述
## 合约部署：
### 部署顺序：
```
1.CommodityInfo.sol
2.LogisticsInfo.sol
3.LogisticsForm.sol
```
