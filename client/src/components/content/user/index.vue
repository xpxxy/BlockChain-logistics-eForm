<template>

        <div class="header">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
                <el-menu-item index="0">
                    <img style="width: 60px" src="../../../assets/logo.png" alt="Delivery logo" />
                    <div class="mainTitle">区块链物流表单系统</div>
                </el-menu-item>

                <div class="flex-grow" />

                <el-menu-item index="1" @click="toMainPage">
                    <el-icon>
                        <!-- icon需要这样引入 -->
                        <i-ep-HomeFilled />
                    </el-icon>
                    返回首页
                </el-menu-item>
                <el-sub-menu index="2" >
                    <template #title>
                        123
                    </template>
                    <el-menu-item > 
                        退出登录
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
    <el-row>
        <el-col :span="3">
            <h5 class="mb-2">业务中心</h5>
            <el-menu 
            
            :unique-opened="true">
                <template v-for="item of userMenu">
                    <!-- 一级菜单 -->
                    <template v-if="item.submenu.length === 0">
                        <el-menu-item :index="item.path" @click="handleRoute(item.path)">
                            <span>{{ item.title }}</span>
                        </el-menu-item>
                    </template>
                    <template v-else>
                        <el-sub-menu :index="item.path">
                            <template #title>
                                <span>{{ item.title }}</span>
                            </template>
                            <template v-for="subitem of item.submenu">
                                <el-menu-item :index="subitem.path" @click="handleRoute(subitem.path)">
                                    <span>{{ subitem.title }}</span>
                                </el-menu-item>
                            </template>
                        </el-sub-menu>
                    </template>
                </template>
            </el-menu>
        </el-col>
        <el-col :span="21">
            <RouterView/>
        </el-col>
    </el-row>


</template> 
<script setup>
import { aesDecrypt } from '../../../utils/utils';
import { RouterView } from 'vue-router';
import { ref , reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
//自定义表单
// const picSrc = reactive({
//     picSrc='https://ui-avatars.com/api/?name='+
// })
// const info = localStorage.getItem('userSession')
// var decrypted = aesDecrypt(info,'xpxxy')
// console.log(JSON.parse(decrypted))
// console.log(info)
const activeIndex = ref('0')
const userMenu = [
    {path:'/user/info', title: "我的信息", submenu:[],},
    {path:'/user/form', title: "运单信息", submenu:[{path:'/user/formlist',title:'我的运单'},{path:'/user/searchform',title:'查询运单'}]},
]
let handleRoute = (route)=>{
    // console.log(route)
    router.push(route)
}
const toMainPage=()=>{
    router.push('/')
}   
</script>
<style scoped lang="less">
.flex-grow {
    flex-grow: 1;
}
// .el-menu-item.is-active{
//     background-color: #409eff;

// }
.el-menu{
    padding-right: 6px;
    
}


.el-sub-menu{
    /*深度选择器*/
    
    :deep(.el-sub-menu__title){
         border-radius: 6px;
         
    }
   
}
.title{
    text-align: center;
}
</style>