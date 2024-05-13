<template>
 <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
   
    
    
  >
    <el-menu-item index="0">
      <img
        style="width: 60px"
        src="../assets/logo.png"
        alt="Delivery logo"
        
      />
      <div class="mainTitle">区块链物流表单系统</div>
    </el-menu-item>
    
    <div class="flex-grow" />
    
    <el-menu-item index="1">
      <el-icon>
        <!-- icon需要这样引入 -->
        <i-ep-Box />
      </el-icon>
      服务中心
    </el-menu-item>
    <el-menu-item index="2" @click="toUser">
      <el-icon>
        <i-ep-user />
      </el-icon>
      个人中心
    </el-menu-item>
  </el-menu>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const activeIndex = ref('0')
const router = useRouter()
function toService(){
  router.push('/user/userformlist')
}
function toUser(){
  router.push('/user/userinfo')
}

</script>
<style scoped>
.flex-grow {
 flex-grow: 1;
}
.mainTitle {
 font-size: 20px;
 font-weight: bold;
 
}
</style>
