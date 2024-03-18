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
DONE
