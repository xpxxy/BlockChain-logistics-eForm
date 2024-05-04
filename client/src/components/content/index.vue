<template>
    <div class="header">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
            <el-menu-item index="0">
                <img style="width: 60px" src="@/assets/logo.png" alt="Delivery logo" />
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
            <el-sub-menu index="2">
                <template #title>
                    <img :src="picSrc" />
                </template>
                <el-popconfirm title="是否退出登录" confirm-button-text="是的" cancel-button-text="不" :icon="InfoFilled"
                    icon-color="#626AEF" @confirm="quit">
                    <template #reference>
                        <el-menu-item>
                            退出登录
                        </el-menu-item>
                    </template>
                </el-popconfirm>
            </el-sub-menu>
        </el-menu>
    </div>
    <div class="content">
        <el-row style="height: 100%">
            <el-col :span="3">
                <div class="navtitle">
                    业务中心
                </div>

                <el-menu text-color="white" background-color="#001428" :unique-opened="true" style="height:100%">
                    <template v-for="item of menu">
                        <!-- 一级菜单 -->
                        <template v-if="item.submenu.length === 0">
                            <el-menu-item :index="item.path" @click="handleRoute(item.path)">
                                <el-icon>
                                    <component :is="item.icon"></component>
                                </el-icon>
                                <span>{{ item.title }}</span>
                            </el-menu-item>
                        </template>
                        <template v-else>
                            <el-sub-menu :index="item.path">
                                    
                                <template #title>

                                    <el-icon>
                                        <component :is="item.icon"></component>
                                    </el-icon>
                                    <span>{{ item.title }}</span>
                                </template>
                                <template v-for="subitem of item.submenu">
                                    <el-menu-item :index="subitem.path" @click="handleRoute(subitem.path)">
                                        <el-icon>
                                            <component :is="subitem.icon"></component>
                                        </el-icon>
                                        <span>{{ subitem.title }}</span>
                                    </el-menu-item>
                                </template>
                            </el-sub-menu>
                        </template>
                    </template>
                </el-menu>
            </el-col>
            <el-col :span="21">
                <RouterView />
            </el-col>
        </el-row>
    </div>

</template>
<script setup>
import { aesDecrypt } from '../../utils/utils';
import { RouterView } from 'vue-router';
import { ref, reactive, onBeforeMount } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import axios from 'axios'
const router = useRouter()
//用户信息
const info = JSON.parse(aesDecrypt(localStorage.getItem('userSession'), 'xpxxy'))
//开发使用。最终版请删掉console
// console.log(info)

//用户头像图片
const picSrc = ref(
    "https://ui-avatars.com/api/?background=random&rounded=true&size=32&name=" + info.userID
)

const activeIndex = ref('0')
let menu = []
onBeforeMount(()=>{
    const route = useRoute();
    menu = route.meta.menu
    // console.log(userMenu);
})
const handleRoute = (route) => {
    router.push(route)
}
const toMainPage = () => {
    router.push('/')
}
function quit() {
    axios.post('/api/logout').then(res=>{
        if(res.data.code==='2006'){
            localStorage.removeItem('userSession');
            ElMessage.success('退出登录成功！');
            router.push('/');
            
        }
    })
    
}   
</script>
<style lang="less">
.content{
    height: 100%
}
.flex-grow {
    flex-grow: 1;
}

// .el-menu-item.is-active{
//     background-color: #409eff;

// }
.el-menu {
    padding-right: 6px;

}

.el-menu-item {

    font-weight: bold;
}

.el-sub-menu {
    /*深度选择器*/

    :deep(.el-sub-menu__title) {
        border-radius: 6px;

    }

}

.title {
    text-align: center;
}

// .el-col.el-col-3{
//     background-color: #348ce3;
// }
.navtitle {
    padding: 10px;
    text-align: left;
    font-weight: bold;
    background-color: #24374a;
    color: antiquewhite;



}
</style>