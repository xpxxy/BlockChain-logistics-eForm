<template>
    <div class="content">
        <el-row>
            <el-col :span="24" class="grid-cell">
                <el-card style="max-width: 100%" shadow="always">
                    <template #header>
                        <div class="card-header">
                            <span>基本信息修改</span>
                        </div>
                    </template>
                    <el-row :gutter="60">
                        <el-col :span="24">
                            <el-form style="max-width: 600px;" label-width="auto">
                                <el-form-item label="手机号" prop="phone">
                                    <el-input id="phone" v-model="userInfo.phone">
                                        <template #prefix>
                                            <el-icon class="el-input__icon">
                                                <i-ep-Iphone />
                                            </el-icon>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="用户名" prop="userID">
                                    <el-input id="userID" v-model="userInfo.userID">
                                        <template #prefix>
                                            <el-icon class="el-input__icon">
                                                <i-ep-User />
                                            </el-icon>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="userID">
                                    <el-input id="userID" v-model="userInfo.pw" show-password>
                                        <template #prefix>
                                            <el-icon class="el-input__icon">
                                                <i-ep-Lock />
                                            </el-icon>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="真实姓名" prop="name">
                                    <el-input id="userID" v-model="userInfo.name">
                                        <template #prefix>
                                            <el-icon class="el-input__icon">
                                                <i-ep-UserFilled />
                                            </el-icon>
                                        </template>
                                    </el-input>
                                </el-form-item>
                            </el-form>

                        </el-col>
                        <el-col :span="4"></el-col>
                        <el-col :span="3">
                            <el-button v-loading.fullscreen.lock="fullscreenLoading" @click="submit()" type="primary">
                                <template #icon>
                                    <el-icon><i-ep-CircleCheck /></el-icon>
                                </template>
                                提交修改
                            </el-button>
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
import {ref, reactive, onMounted} from 'vue'
import axios from 'axios'
import { aesDecrypt } from '../../../utils/utils';
const info = JSON.parse(aesDecrypt(localStorage.getItem('userSession'),'xpxxy'))
// console.log(info)
const userInfo = reactive({
    userID:'',
    pw:'',
    name:'',
    phone:'',
    status:'',
    createdAt:''

})
onMounted(()=>{
    userInfo.userID = info.userID
    userInfo.pw = info.pw
    userInfo.name = info.name
    userInfo.phone = info.phone
    userInfo.status = info.status
})


</script>
<style scoped lang="less">
.card-header{
    font-size: 16px;
}
.content{
    padding: 0.3%;
    
}
.body{
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, \5fae\8f6f\96c5\9ed1, Arial, sans-serif;
}
.text-item{
    font-size: 14px;
    
} 
</style>