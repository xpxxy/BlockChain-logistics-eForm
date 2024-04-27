/*
 Navicat Premium Data Transfer

 Source Server         : delivery
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : deliverydb

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 31/03/2024 14:49:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for forminfos
-- ----------------------------
DROP TABLE IF EXISTS `forminfos`;
CREATE TABLE `forminfos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `senderAddr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `logisticsCompanyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `senderAddressInfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `senderContact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `receiverAddr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `receiverAddressInfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `receiverContact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `logisticsInfoAddr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productAddr` varchar(42) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'on',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `logisticsInfoAddr`(`logisticsInfoAddr` ASC) USING BTREE,
  INDEX `productAddr`(`productAddr` ASC) USING BTREE,
  CONSTRAINT `forminfos_ibfk_1` FOREIGN KEY (`productAddr`) REFERENCES `goods` (`productAddr`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of forminfos
-- ----------------------------

-- ----------------------------
-- Table structure for forms
-- ----------------------------
DROP TABLE IF EXISTS `forms`;
CREATE TABLE `forms`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `logisticsInfoAddr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `transitAddr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `transitContact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `formAddr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `logisticsInfoID` int NOT NULL,
  `status` enum('on','off','delete') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `formAddr`(`formAddr` ASC) USING BTREE,
  UNIQUE INDEX `logisticInfoAddr`(`logisticsInfoAddr` ASC) USING BTREE,
  INDEX `logisticsInfoID`(`logisticsInfoID` ASC) USING BTREE,
  CONSTRAINT `forms_logisticsInfoID_foreign_idx` FOREIGN KEY (`logisticsInfoID`) REFERENCES `forminfos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of forms
-- ----------------------------

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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'on',
  PRIMARY KEY (`productAddr`) USING BTREE,
  UNIQUE INDEX `productAddr`(`productAddr` ASC) USING BTREE,
  UNIQUE INDEX `barcode`(`barcode` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('测试商品1', '2024-1-1', '2025-1-1', '测试物品', '123321', '0x123', '2024-03-06 23:46:28', '2024-03-28 08:48:43', 'on');
INSERT INTO `goods` VALUES ('香飘飘', '2024-1-1', '2025-1-1', '饮料', '321', '0xef5248d1692f359c78d723447a314b3a73242a34', '2024-03-06 16:04:12', '2024-03-06 16:04:12', 'on');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pw` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` bigint NOT NULL,
  `role` enum('admin','user','transit') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'on',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'xpxxy', '123321', '吕兆轩', '0x93cea6ace626a64615443caeaac14293bd60895d', 18707035092, 'admin', '2024-02-28 16:58:27', '2024-02-28 16:58:30', 'on');
INSERT INTO `users` VALUES (2, 'i_drive', '123321', '轩兆吕', '0x51db6208fb4514fad7cf1cbb9ab96eaec31ad548', 18779344371, 'transit', '2024-02-28 16:59:14', '2024-02-28 16:59:16', 'on');
INSERT INTO `users` VALUES (3, 'test_user', '123321', '兆轩吕', '0x94b5b5a2cac42e8f7270d3e27c677910b4b6c00d', 18807877979, 'user', '2024-02-28 09:00:20', '2024-02-28 09:00:20', 'on');
INSERT INTO `users` VALUES (4, 'xpxxy2', 'aw123321', '吕轩兆', '0x87878b1f3879c96a348a5bfe1d3e95db4bab962e', 18779344370, 'user', '2024-03-16 16:59:42', '2024-03-27 15:26:04', 'off');
INSERT INTO `users` VALUES (5, 'xpxxy3', 'aw123321', '轩吕兆', '0xca0ca079c119af7fd425d152d7b0c1bf52eb0315', 18779344175, 'transit', '2024-03-16 17:09:32', '2024-03-27 15:36:38', 'on');

SET FOREIGN_KEY_CHECKS = 1;
