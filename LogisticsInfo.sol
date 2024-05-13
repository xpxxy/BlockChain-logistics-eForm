// SPDX-License-Identifier: MIT
pragma solidity ^0.6.10;
pragma experimental ABIEncoderV2;
// Importing CommodityInfo contract
import "./CommodityInfo.sol";

contract LogisticsInfo {
    struct Logistics {
        address senderAddress;
        string logisticsCompanyName;
        string senderAddressInfo;
        string senderContact;
        address receiverAddress;
        address productAddress;
        string receiverAddressInfo;
        string receiverContact;
    }

    mapping(address => Logistics) public logisticsForms;
    address[] public logisticsAddresses;

    // Reference to CommodityInfo contract
    CommodityInfo public commodityInfo;

    constructor(address _commodityInfoAddress) public {
        commodityInfo = CommodityInfo(_commodityInfoAddress);
    }

    event LogisticsStored(address indexed logisticsAddress, address indexed productAddress);

    function storeLogisticsInfo(address _senderAddress, string memory _logisticsCompanyName, string memory _senderAddressInfo, string memory _senderContact, address _receiverAddress, address _productAddress, string memory _receiverAddressInfo, string memory _receiverContact) public returns (address) {
        require(_senderAddress != address(0), "Sender address cannot be zero");
        require(_receiverAddress != address(0), "Receiver address cannot be zero");
        require(_productAddress != address(0), "Product address cannot be zero");
        require(bytes(_receiverAddressInfo).length > 0, "Receiver address info cannot be empty");

        Logistics memory newLogistics = Logistics({
            senderAddress: _senderAddress,
            logisticsCompanyName: _logisticsCompanyName,
            senderAddressInfo: _senderAddressInfo,
            senderContact: _senderContact,
            receiverAddress: _receiverAddress,
            productAddress: _productAddress,
            receiverAddressInfo: _receiverAddressInfo,
            receiverContact: _receiverContact
        });

        address logisticsAddress = address(bytes20(keccak256(abi.encodePacked(msg.sender, block.timestamp))));
        logisticsAddresses.push(logisticsAddress);
        logisticsForms[logisticsAddress] = newLogistics;

        emit LogisticsStored(logisticsAddress, _productAddress);

        return logisticsAddress;
    }

    function getLogisticsInfo(address _logisticsAddress) public view returns (string memory) {
        Logistics storage logistics = logisticsForms[_logisticsAddress];
        require(logistics.productAddress != address(0), "Logistics address does not exist");

        string memory productInfo = commodityInfo.getProductInfo(logistics.productAddress);

        string memory result = string(
            abi.encodePacked(
                '{',
                '"senderAddress":"', toString(logistics.senderAddress), '",',
                '"logisticsCompanyName":"', logistics.logisticsCompanyName, '",',
                '"senderAddressInfo":"', logistics.senderAddressInfo, '",',
                '"senderContact":"', logistics.senderContact, '",',
                '"receiverAddress":"', toString(logistics.receiverAddress), '",',
                '"receiverAddressInfo":"', logistics.receiverAddressInfo, '",',
                '"receiverContact":"', logistics.receiverContact, '",',
                '"productInfo":', productInfo,
                '}'
            )
        );
        return result;
    }

    function getAllLogisticsAddresses() public view returns (address[] memory) {
        return logisticsAddresses;
    }
    
    function getAllLogisticsInfo() public view returns (string[] memory, address[] memory){
        uint256 length = logisticsAddresses.length;
        string [] memory result = new string[](length);
        for (uint256 i = 0; i < length; i++) {
            result[i] = getLogisticsInfo(logisticsAddresses[i]);
        }
        return (result, logisticsAddresses);
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
}
