/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : deliverydb

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 14/05/2024 00:10:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for forminfos
-- ----------------------------
DROP TABLE IF EXISTS `forminfos`;
CREATE TABLE `forminfos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `senderAddr` varchar(42) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `logisticsCompanyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `senderAddressInfo` varchar(42) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `senderContact` bigint NOT NULL,
  `receiverAddr` varchar(42) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `receiverAddressInfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `receiverContact` bigint NOT NULL,
  `logisticsInfoAddr` varchar(42) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'on',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productAddr` varchar(42) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `logisticsInfoAddr`(`logisticsInfoAddr` ASC) USING BTREE,
  INDEX `productAddr`(`productAddr` ASC) USING BTREE,
  CONSTRAINT `forminfos_ibfk_1` FOREIGN KEY (`productAddr`) REFERENCES `goods` (`productAddr`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of forminfos
-- ----------------------------
INSERT INTO `forminfos` VALUES (10, '0xa0614c21c97cd7f99cf092eece3a75b1df06fd63', '中通快递', '江西省南昌市东湖区江西师范大学', 18779344175, '0x23392e3ffeb10222d1c1c0c0f0de3d707a4f8988', '江西省上饶市信州区天佑大道161号', 18707035093, '0x584e049091cbf640a268f31300a886f2deaa5168', 'off', '2024-05-12 01:13:42', '2024-05-12 01:24:25', '0x2563a6b3c814283a9deb515c5310e66b7916279c');
INSERT INTO `forminfos` VALUES (11, '0xa0614c21c97cd7f99cf092eece3a75b1df06fd63', '圆通速递', '江西省南昌市东湖区江西师范大学', 18779344175, '0x49eec6bb11e5059b0ab3de3570f6b64a89446e0b', '江西省吉安市吉州区某某大街100号', 18779344001, '0xc7e5d31f329dcbd6a12159b8accb12e229c5e6fc', 'on', '2024-05-12 01:16:46', '2024-05-12 01:16:46', '0x263debff8c407e92d446ee62273055bcd27aba57');
INSERT INTO `forminfos` VALUES (12, '0xa0614c21c97cd7f99cf092eece3a75b1df06fd63', '韵达速递', '江西省南昌市东湖区江西师范大学', 18779344175, '0x49eec6bb11e5059b0ab3de3570f6b64a89446e0b', '上海市市辖区徐汇区化工四村', 18779344001, '0x80b0836484b0a59ebe01c9a4af69a590a45e78aa', 'on', '2024-05-12 01:17:57', '2024-05-12 01:17:57', '0xfd92813a38216183fe9c3478f4060a9e2494d33');

-- ----------------------------
-- Table structure for forms
-- ----------------------------
DROP TABLE IF EXISTS `forms`;
CREATE TABLE `forms`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `logisticsInfoAddr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `transitAddr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `transitContact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `transitAddrInfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `formAddr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('on','off','delete') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'on',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `formInfoId` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `formInfoId`(`formInfoId` ASC) USING BTREE,
  CONSTRAINT `forms_ibfk_2` FOREIGN KEY (`formInfoId`) REFERENCES `forminfos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of forms
-- ----------------------------
INSERT INTO `forms` VALUES (25, '0x584e049091cbf640a268f31300a886f2deaa5168', '0xa0614c21c97cd7f99cf092eece3a75b1df06fd63', '18779344175', '江西省南昌市东湖区江西师范大学', '0xa625d4a508bc6afb758bb8dcd7ea144127bd29ec', 'off', '2024-05-12 01:13:42', '2024-05-12 01:24:25', 10);
INSERT INTO `forms` VALUES (26, '0xc7e5d31f329dcbd6a12159b8accb12e229c5e6fc', '0xa0614c21c97cd7f99cf092eece3a75b1df06fd63', '18779344175', '江西省南昌市东湖区江西师范大学', '0xd97e201803b22176b2eb7412b54be1411efc602f', 'on', '2024-05-12 01:16:46', '2024-05-12 01:16:46', 11);
INSERT INTO `forms` VALUES (27, '0x80b0836484b0a59ebe01c9a4af69a590a45e78aa', '0xa0614c21c97cd7f99cf092eece3a75b1df06fd63', '18779344175', '江西省南昌市东湖区江西师范大学', '0x4572db588bf83a2f7179613e1c95596a051f7eed', 'on', '2024-05-12 01:17:57', '2024-05-12 01:17:57', 12);
INSERT INTO `forms` VALUES (28, '0x80b0836484b0a59ebe01c9a4af69a590a45e78aa', '0xcc81387e6dbbcecf9fef35d8e73703dec9372a08', '18707035094', '浙江省金华市武义县韵达集散中心', '0x4572db588bf83a2f7179613e1c95596a051f7eed', 'on', '2024-05-12 01:21:30', '2024-05-12 01:21:30', 12);
INSERT INTO `forms` VALUES (29, '0x584e049091cbf640a268f31300a886f2deaa5168', '0xa0614c21c97cd7f99cf092eece3a75b1df06fd63', '18779344175', '江西省上饶市信州区菜鸟驿站', '0xa625d4a508bc6afb758bb8dcd7ea144127bd29ec', 'off', '2024-05-12 01:24:25', '2024-05-12 01:24:25', 10);

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `productionDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `expirationDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `productType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `barcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `productAddr` varchar(42) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'on',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productAddr`) USING BTREE,
  UNIQUE INDEX `barcode`(`barcode` ASC) USING BTREE,
  UNIQUE INDEX `productAddr`(`productAddr` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('农夫果园30%混合果汁饮料-桃 450ml', '2024-05-01', '2025-05-01', '即饮型果汁饮料（耐储存）', '06921168594511', '0x2563a6b3c814283a9deb515c5310e66b7916279c', 'on', '2024-05-12 01:06:27', '2024-05-12 01:06:27');
INSERT INTO `goods` VALUES ('脉动运动饮料（雪柚味）500ML', '2024-05-01', '2026-07-02', '即饮型运动饮料类补液', '06902538007206', '0x263debff8c407e92d446ee62273055bcd27aba57', 'on', '2024-05-12 01:02:55', '2024-05-12 01:02:55');
INSERT INTO `goods` VALUES ('尖叫多肽型运动饮料550ml', '2024-05-01', '2026-05-01', '即饮型调味饮料', '06921168504015', '0xfb555312e5beac940a330aac51bc0ad7cf456a44', 'on', '2024-05-12 01:04:15', '2024-05-12 01:04:15');
INSERT INTO `goods` VALUES ('香飘飘好料系列红豆奶茶', '2024-05-01', '2027-05-01', '咖啡茶替代品', '6938888888615', '0xfd92813a38216183fe9c3478f4060a9e2494d33', 'on', '2024-05-12 01:00:10', '2024-05-12 01:00:17');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pw` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` bigint NOT NULL,
  `role` enum('admin','user','transit') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'on',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'xpxxy', '吕兆轩', 'aw123321', '0x89e4dd8f5133a951817976704dc0fc6c541b1456', 18707035092, 'admin', 'on', '2024-04-21 21:35:45', '2024-04-21 21:35:49');
INSERT INTO `users` VALUES (2, 'xpxxxx', '123', 'aw123321', '0x123', 18779344370, 'user', 'off', '2024-05-02 17:51:28', '2024-05-11 11:49:59');
INSERT INTO `users` VALUES (3, 'DinAn', '定安', 'aw123321', '0xa0614c21c97cd7f99cf092eece3a75b1df06fd63', 18779344175, 'transit', 'on', '2024-05-05 16:58:56', '2024-05-05 16:58:56');
INSERT INTO `users` VALUES (4, 'im_user', '抚顺', 'aw123321', '0x49eec6bb11e5059b0ab3de3570f6b64a89446e0b', 18779344001, 'user', 'on', '2024-05-06 01:39:53', '2024-05-11 11:27:38');
INSERT INTO `users` VALUES (5, 'i_drive', '鞍山', 'aw123321', '0x204baa7a14ff2e3acfe6ce615f078058855ff8ea', 18779344002, 'transit', 'on', '2024-05-06 01:40:47', '2024-05-06 01:40:50');
INSERT INTO `users` VALUES (6, 'lzx', '吕某某', 'aw123321', '0x23392e3ffeb10222d1c1c0c0f0de3d707a4f8988', 18707035093, 'user', 'on', '2024-05-12 00:57:21', '2024-05-12 00:57:21');
INSERT INTO `users` VALUES (7, '我是运输方', '吕兆兆轩', 'aw123321', '0xcc81387e6dbbcecf9fef35d8e73703dec9372a08', 18707035094, 'transit', 'on', '2024-05-12 01:18:56', '2024-05-12 01:18:56');

SET FOREIGN_KEY_CHECKS = 1;
