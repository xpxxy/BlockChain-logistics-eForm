区块链电子物流商品表单系统
Fisco Bcos based Commodity e-form system

System requirement:
  Windows:
    NodeJS
  Linux:
    ubuntu 22.0+
 Run App:
 ```
   cd /client npm run dev // run client APP (Vue)
   cd /server node app    // run server
  ```
  open your linux system then 
   ```
    su
    cd webase-deploy
    mysql -utest -p yourpassword //if you have already autostarted with bootup, just ignore it
    python3 deploy.py startAll  //start your webase nodes system
  ```
 DONT FORGET TO OPEN YOUR PORT FOR HTTP REQUEST BETWEEN WINDOWS AND LINUX 
 i set my VM net mode to NAT and open 5000-5004 port for webase, so you can access webase through localhost:5000-5004 on windows platform.
 WEBase need to disable verification code, just to check out webase official docs [webase Doc](https://webasedoc.readthedocs.io/zh-cn/latest/docs/WeBASE/install.html#webase-web)
