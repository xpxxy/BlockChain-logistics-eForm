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
                    <el-table :data="tableData" style="width: 100%;" height="600px" stripe :border="true">
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
const tableData = ref([])
function search() {
    let content = {
        data:aesEncrypt(JSON.stringify(searchContent),'xpxxy')
    }
    axios.post('/api/findOneGoods', content).then(res => {
        if (res.data.code == '3000') {
            
            tableData.value.push(res.data.data)
            ElMessage.success("查询成功！")
            // console.log(tableData)
        }
        if(res.data.code == '3001'){
            ElMessage.info("未查询到您输入商品信息")
        }
    })
}
function clear(){
    tableData.value = []
}
</script>
<style scoped lang="less">
.content{
    padding: 0.3%;
    
}
</style>