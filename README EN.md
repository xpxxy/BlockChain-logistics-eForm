[![pkm3XHP.png](https://s21.ax1x.com/2024/05/13/pkm3XHP.png)](https://imgse.com/i/pkm3XHP) 



# Blockchain e-logistics commodity e-form system 
#### Fisco Bcos based Commodity e-form system


This system is a blockchain e-form system based on Vue+Express+FiscoBocs.

### It mainly realizes the following functions:

   1. Upload and save the registered logistics data;
  
   2. Upload and save commodity information data;

   3. tracking logistics intermediate data, the transshipment transportation data in the middle of logistics will be tracked and traced, and listed in the form of a table;

   4. Basic user management;

   5. Basic management of commodity data and logistics form data, including creation, update, termination, and status management.

## Deploying the system:

  Theoretically, Linux can be deployed throughout the whole process, but in the end, for the convenience of demonstration and the use of ubuntu server to deploy the blockchain, we finally chose Windows + Linux hybrid.
  
## Deployment requirements:

|Software|Version
|-|-|NodeJS|18
|NodeJS|18+|
|NPM|9.6+|

Packages needed to run the base of the front and back end:

|Package Name|Version|
|-|-|
|express|4.18.2+||vite|4.2.2+||vite
|vite|4.2.1+|

All other packages are managed through NPM

***

### Deployment process:

### Front-end deployment:
The front-end executes in turn.
```
cd /client
npm install
```
Wait for the installation to complete and the server will start on localhost:8000, make sure this port is not occupied.
```
npm run dev
```
### Backend deployment:
Go to the server directory and modify db.js under /config to change the database connection to your configuration.

```
module.exports={
    HOST: “localhost”, # your connection address
    user: “root”, # the user to use
    PASSWORD: “123321”, #Password
    DB: “deliveryDB”, #database name
    dialect: “mysql”, #type of database to connect to
}
``
The sql file is given

Go to webase.js under the same file and change a few variables in the header
```
const account = “”; #webase user
const accountPwd = “”; #Pwd of the password, which can be retrieved in F12 of the browser by performing a login in webase.
const groupId = ''; #The cluster of the operation
const contractAddr = “”; #Address of the contract
const xpxxy = “”; #User calling the contract
``''
Enable terminal execution in the server directory:
``
npm install
```
Wait for the installation to complete and then execute:
```
node app.js
```
Need to make sure that port 3000 is not occupied, if it is occupied modify the port of app.js.
## Blockchain side deployment:
Refer to webase's official documentation for the complete deployment chapter [WeBaseDoc](https://webasedoc.readthedocs.io/zh-cn/lab/docs/WeBASE/install.html)
Two files need to be modified after deployment is complete:
1. application.yml under conf of webase-node-mgr.
``
....
Spring.
       ....
        url:....     # Add &useSSL=false at the end
....
enableVerficationCode: false
``
The same goes for the fields under spring in the file with the same name under webase-sign's conf.

If it is a virtual machine, please open the virtual machine port 5000-5004.

If it is a remote server, please modify the connection address of each interface in webase.js.

The deployment of the contract can be done directly in the webase browser.
## Contract deployment:
### Deployment sequence:
```
1.CommodityInfo.sol
2.LogisticsInfo.sol
3.LogisticsForm.sol
```

Translated with DeepL.com (free version)
