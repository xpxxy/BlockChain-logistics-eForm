const data = [
    {
        "id": 1,
        "senderAddr": "0x125",
        "logisticsCompanyName": "顺丰",
        "senderAddressInfo": "江西省南昌市",
        "senderContact": 187,
        "receiverAddr": "0x123",
        "receiverAddressInfo": "上海市",
        "receiverContact": 188,
        "logisticsInfoAddr": "0x666",
        "status": "on",
        "createdAt": "2024-05-02T19:00:02.000Z",
        "updatedAt": "2024-05-02T19:00:05.000Z",
        "productAddr": "0x92c30b3c88a77eb7960d4484b8faade616a8ef41",
        "forms": [
            {
                "id": 1,
                "transitAddr": "0x111",
                "transitContact": "123",
                "transitAddrInfo": "浙江省金华市",
                "formAddr": "0x233"
            },
            {
                "id": 2,
                "transitAddr": "0x112",
                "transitContact": "124",
                "transitAddrInfo": "浙江省杭州市",
                "formAddr": "0x233"
            }
        ],
        "good": {
            "name": "脉动",
            "productionDate": "2024-1-1",
            "expirationDate": "2025-1-3",
            "productType": "drink",
            "barcode": "123",
            "productAddr": "0x92c30b3c88a77eb7960d4484b8faade616a8ef41",
            "status": "on",
            "createdAt": "2024-04-22T12:31:46.000Z",
            "updatedAt": "2024-04-22T12:31:46.000Z"
        }
    },
    {
        "id": 2,
        "senderAddr": "0x144",
        "logisticsCompanyName": "韵达",
        "senderAddressInfo": "江西省南昌市",
        "senderContact": 128,
        "receiverAddr": "0x123",
        "receiverAddressInfo": "浙江省",
        "receiverContact": 188,
        "logisticsInfoAddr": "0x777",
        "status": "on",
        "createdAt": "2024-05-04T11:07:17.000Z",
        "updatedAt": "2024-05-04T11:07:19.000Z",
        "productAddr": "0xd22373828adfe429c6dd84957239af41a6111350",
        "forms": [
            {
                "id": 3,
                "transitAddr": "0x8988",
                "transitContact": "189",
                "transitAddrInfo": "浙江省衢州市",
                "formAddr": "0x234"
            }
        ],
        "good": {
            "name": "testproduct",
            "productionDate": "12",
            "expirationDate": "312",
            "productType": "231",
            "barcode": "231",
            "productAddr": "0xd22373828adfe429c6dd84957239af41a6111350",
            "status": "on",
            "createdAt": "2024-04-22T12:45:36.000Z",
            "updatedAt": "2024-04-22T12:45:36.000Z"
        }
    }
]

// 遍历每个物流信息对象
function formDataProcess(clonedData){
    
    
            // 深拷贝数据，避免直接修改数据库返回的实例
            clonedData.forEach(logisticsInfo => {
                
                const updatedForms = logisticsInfo.forms.map(form => ({
                    transitAddr: form.transitAddr,
                    transitContact: form.transitContact,
                    transitAddrInfo: form.transitAddrInfo
                }));
            
                logisticsInfo.forms = updatedForms;
                
                
                
            });
    
        return clonedData
        
    
}  

console.log(formDataProcess(data));