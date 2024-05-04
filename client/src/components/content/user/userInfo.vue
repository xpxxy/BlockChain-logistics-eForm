<template>
  <div class="content">
    <el-row>
      <el-col :span="24" class="grid-cell">
        <el-card style="max-width: 100%" shadow="always">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-row :gutter="60">
            <el-col :span="9">
              <p class="text-item">用户名: {{ userInfo.userID }}</p>
              <p class="text-item">真实姓名: {{ userInfo.name }}</p>
            </el-col>
            <el-col :span="9">
              <p class="text-item">手机号: {{ userInfo.phone }}</p>
              <p class="text-item">区块链地址: {{ userInfo.address }}</p>
            </el-col>
            <el-col :span="6">
              <p class="text-item">注册时间: {{ userInfo.createdAt }}</p>
              <p class="text-item">用户类型: {{ userInfo.role }}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="24" class="grid-cell">
        <!-- <span>fuck</span> -->
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { aesDecrypt } from "../../../utils/utils";
const info = JSON.parse(
  aesDecrypt(localStorage.getItem("userSession"), "xpxxy")
);
// console.log(info)
const userInfo = reactive({
  userID: "",
  name: "",
  phone: "",
  role: "",
  address: "",
  createdAt: "",
});
onMounted(() => {
  userInfo.userID = info.userID;
  userInfo.name = info.name;
  userInfo.phone = info.phone;
  (userInfo.role = info.role), (userInfo.address = info.address);
  userInfo.createdAt = info.createdAt.slice(0, -14);
});
</script>
<style scoped lang="less">
.card-header {
  font-size: 16px;
}
.content {
  padding: 0.3%;
}
.body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, \5fae\8f6f\96c5\9ed1, Arial, sans-serif;
}
.text-item {
  font-size: 14px;
}
</style>