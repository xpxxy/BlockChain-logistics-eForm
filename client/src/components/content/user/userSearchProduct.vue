<template>
    <div class="content">
        <el-card style="height: 100%;">
            <el-row>
                <el-col :span="18">
                    <el-input v-model="searchContent.name" placeholder="请输入商品支持模糊查询库内商品，若不在库则请输入全称" />
                </el-col>
                <el-col :span="5" :push="1">
                    <el-button type="primary" @click="search">搜索</el-button>
                    <el-button type="default" @click="clear">清除列表数据</el-button>
                </el-col>
                <el-col :span="24"><br/></el-col>
                <el-col :span="24">
                    <el-table v-loading="loading" element-loading-text="正在查询，请稍后。若当前库中不存在则可能需要执行链上查询，这可能需要数秒完成，请耐心等待" :data="tableData" style="width: 100%;" height="600px" stripe :border="true">
                        <el-table-column prop="name" label="商品名称" />
                        <el-table-column prop="productType" label="类别" />
                        <el-table-column prop="productionDate" label="生产日期" />
                        <el-table-column prop="expirationDate" label="保质期" />
                        <el-table-column prop="barcode" label="条形码" />
                        <el-table-column prop="productAddr" label="商品区块链信息" width="400" />


                        <template #empty>
                            <el-empty style="user-select: none;" description="暂无数据" />
                        </template>
                    </el-table>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script setup>
import axios from 'axios';
import { aesDecrypt, aesEncrypt} from '../../../utils/utils';
import { ElMessage } from 'element-plus';
import { ref, watch, reactive } from 'vue';

const searchContent = reactive({
    name: ""
})
const loading = ref(false)
const tableData = ref([])
function search() {
    loading.value = true;
    let content = {
        data:aesEncrypt(JSON.stringify(searchContent),'xpxxy')
    }
    axios.post('/api/findOneGoods', content).then(res => {
        if (res.data.code == '3000') {
            loading.value = false;
            tableData.value.push(res.data.data)
            ElMessage.success("查询成功！")
            // console.log(tableData)
        }
        if(res.data.code == '3001'){
            loading.value = false;
            ElMessage.info(res.data.message)
        }
    }).catch(err=>{
        loading.value = false;
        ElMessage.error("出错了，请联系管理员")
    })
}
function clear(){
    tableData.value = []
    ElMessage.success("清除成功！")
}
</script>
<style scoped lang="less">
.content{
    padding: 0.3%;
    
}
</style>