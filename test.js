function test(){
    let data ="[[\"嘻嘻嘻\", \"2023-1\", \"2024-1\", \"drink\", \"123\"], [\"嘻嘻\", \"2023-1\", \"2024-1\", \"drink\", \"123\"], [\"嘻\", \"2023-1\", \"2024-1\", \"drink\", \"123\"]]";
    let processed = JSON.parse(data);
    const commodityInfo = {
        name:"",
        productionDate:"",
        expirationDate:"",
        type:"",
        barcode:""
    }
    for(var i = 0; i<processed.length;i++){
        commodityInfo.name = processed[i][0];
        commodityInfo.productionDate = processed[i][1];
        commodityInfo.expirationDate = processed[i][2];
        commodityInfo.type = processed[i][3];
        commodityInfo.barcode = processed[i][4]
        console.log(commodityInfo)
    }
}
test();