// SPDX-License-Identifier: MIT
pragma solidity ^0.6.10;
pragma experimental ABIEncoderV2;

// Importing LogisticsInfo and CommodityInfo contracts
import "./LogisticsInfo.sol";
import "./CommodityInfo.sol";

contract LogisticsForm {
    struct Form {
        address logistics;
        address[] transit;
        string[] contact;
        string[] transitAddrInfo;
    }

    mapping(address => Form) public forms;
    address[] public formAddresses;

    // Reference to LogisticsInfo contract
    LogisticsInfo public logisticsInfo;

    // Reference to CommodityInfo contract
    CommodityInfo public commodityInfo;

    constructor(address _logisticsInfoAddress, address _commodityInfoAddress) public {
        logisticsInfo = LogisticsInfo(_logisticsInfoAddress);
        commodityInfo = CommodityInfo(_commodityInfoAddress);
    }

    event FormCreated(address indexed formAddress, address indexed logisticsAddress);

    function createLogisticsForm(address _logisticsAddress, address _transitAddress, string memory _transitContact, string memory _transitAddrInfo) public returns (address) {
        require(_logisticsAddress != address(0), "物流表单头信息不得为空！");
        require(_transitAddress != address(0), "中转方区块链地址不得为空！");
        require(bytes(_transitContact).length > 0, "中转方联系方式不得为空！");
        require(bytes(_transitAddrInfo).length > 0, "中转方地址信息不得为空！");
    
        address formAddress = address(bytes20(keccak256(abi.encodePacked(msg.sender, block.timestamp))));
    
        Form storage newForm = forms[formAddress];
        newForm.logistics = _logisticsAddress;
        newForm.transit.push(_transitAddress);
        newForm.contact.push(_transitContact);
        newForm.transitAddrInfo.push(_transitAddrInfo);
    
        formAddresses.push(formAddress);
    
        emit FormCreated(formAddress, _logisticsAddress);
    
        return formAddress;
    }

    
    function getFormInfo(address _formAddress) public view returns (string memory, string memory, string memory, string memory, string memory) {
        Form storage form = forms[_formAddress];
        string memory logisticsInfoJson = logisticsInfo.getLogisticsInfo(form.logistics);
        string memory formAddr = string(
            abi.encodePacked(
                '{',
                '"formAddr":"', toString(_formAddress), '",',
                '}'
            )
        );
        
        uint256 length = form.transit.length;
        string[] memory transitAddresses = new string[](length);
        string[] memory transitContacts = new string[](length);
        string[] memory transitAddrInfos = new string[](length);
    
        for (uint256 i = 0; i < length; i++) {
            transitAddresses[i] = toString(form.transit[i]);
            transitContacts[i] = form.contact[i];
            transitAddrInfos[i] = form.transitAddrInfo[i];
        }
    
        string memory transitAddressesJson = toJson(transitAddresses, "transitAddresses");
        string memory transitContactsJson = toJson(transitContacts, "transitContacts");
        string memory transitAddrInfosJson = toJson(transitAddrInfos, "transitAddrInfos");
    
        return (logisticsInfoJson, formAddr ,transitAddressesJson, transitContactsJson, transitAddrInfosJson);
    }


    function getAllForms() public view returns (address[] memory) {
        return formAddresses;
    }

    function updateLogisticsForm(address _formAddress, address _transitAddress, string memory _transitContact, string memory _transitAddrInfo) public {
        Form storage form = forms[_formAddress];
        require(form.logistics != address(0), "Form address does not exist");

        form.transit.push(_transitAddress);
        form.contact.push(_transitContact);
        form.transitAddrInfo.push(_transitAddrInfo);
    }

    // Expose CommodityInfo functions

    function storeProductInfo(string memory _name, string memory _productionDate, string memory _expiryDate, string memory _type, string memory _barcode) public returns (address) {
        return commodityInfo.storeProduct(_name, _productionDate, _expiryDate, _type, _barcode);
    }

    function getProductInfo(address _productAddress) public view returns (string memory) {
        return commodityInfo.getProductInfo(_productAddress);
    }

    function getAllProducts() public view returns (string[] memory, address[] memory) {
        return commodityInfo.getAllProductsInfo();
    }


    // Expose LogisticsInfo functions

    function createLogisticsInfo(address _senderAddress, string memory _logisticsCompanyName, string memory _senderAddressInfo, string memory _senderContact, address _receiverAddress, address _productAddress, string memory _receiverAddressInfo, string memory _receiverContact) public returns (address) {
        return logisticsInfo.storeLogisticsInfo(_senderAddress, _logisticsCompanyName, _senderAddressInfo, _senderContact, _receiverAddress, _productAddress, _receiverAddressInfo, _receiverContact);
    }

    function getLogisticsInfo(address _logisticsAddress) public view returns (string memory) {
        return logisticsInfo.getLogisticsInfo(_logisticsAddress);
    }

    function getAllLogisticsAddresses() public view returns (address[] memory) {
        return logisticsInfo.getAllLogisticsAddresses();
    }
    function getAllLogisticsInfo() public view returns (string[] memory, address[] memory){
        return logisticsInfo.getAllLogisticsInfo();
    }

    // Helper function to convert address to string
    function toString(address _addr) internal pure returns(string memory) {
        bytes32 value = bytes32(uint256(_addr));
        bytes memory alphabet = "0123456789abcdef";
    
        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3+i*2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }
    
    
    function toJson(string[] memory _values, string memory _key) internal pure returns(string memory) {
        bytes memory jsonStringBytes = abi.encodePacked(
            '{"', _key, '": ['
        );
    
        for (uint256 i = 0; i < _values.length; i++) {
            jsonStringBytes = abi.encodePacked(
                jsonStringBytes,
                '"', _values[i], '"'
            );
            
            if (i < _values.length - 1) {
                jsonStringBytes = abi.encodePacked(jsonStringBytes, ',');
            }
        }
        jsonStringBytes = abi.encodePacked(jsonStringBytes, "] }");
    
        // Convert the resulting bytes to a string
        string memory jsonString = string(jsonStringBytes);
        return jsonString;
    }
    
}
