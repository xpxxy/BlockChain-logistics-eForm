// SPDX-License-Identifier: MIT
pragma solidity ^0.6.10;
pragma experimental ABIEncoderV2;

contract CommodityInfo {
    struct Product {
        string name;
        string productionDate;
        string expirationDate;
        string productType;
        string barcode;
    }

    mapping(address => Product) public products;
    address[] public productAddresses;

    event ProductStored(address indexed productAddress, string name, string productionDate, string expirationDate, string productType, string barcode);

    function storeProduct(string memory _name, string memory _productionDate, string memory _expirationDate, string memory _productType, string memory _barcode) public returns (address) {
        Product memory newProduct = Product({
            name: _name,
            productionDate: _productionDate,
            expirationDate: _expirationDate,
            productType: _productType,
            barcode: _barcode
        });

        address productAddress = address(bytes20(keccak256(abi.encodePacked(msg.sender, block.timestamp))));

        products[productAddress] = newProduct;
        productAddresses.push(productAddress);

        emit ProductStored(productAddress, _name, _productionDate, _expirationDate, _productType, _barcode);

        return productAddress;
    }

    function getProductInfo(address _productAddress) public view returns (string memory) {
        Product storage product = products[_productAddress];

        string memory jsonString = string(
            abi.encodePacked(
                '{"name":"', product.name,
                '","productionDate":"', product.productionDate,
                '","expirationDate":"', product.expirationDate,
                '","productType":"', product.productType,
                '","barcode":"', product.barcode,
                '"}'
            )
        );

        return jsonString;
    }
    //非常前端的思想.....实际上返回会被套两层的JSON，为了键值对不择手段了属于是...
    //直接返回数据反正也是按顺序取的只不过后端要花点力气遍历出来再定义数据罢了，因为结构是这样的：[[name, productDate, ...], [name, productionDate]....]
    function getAllProductsInfo() public view returns (string[] memory, address[] memory) {
        uint256 length = productAddresses.length;
        string [] memory result = new string[](length);
        for (uint256 i = 0; i < length; i++) {
            result[i] = getProductInfo(productAddresses[i]);
        }
        return (result, productAddresses);
    }

}