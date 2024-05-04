<template>
    <div class="content">
        <el-card style="height: 100%;">
            <template #header>
                <div class="card-header">
                    <span>运单数据列表</span>
                </div>
            </template>
            <el-row>
                <el-col :span="24">
                    <el-table v-loading="loading" :data="tableData" style="width: 100%;" height="600px" stripe :border="true">
                        <template #empty>
                            <p>{{emptyText}}</p>
                        </template>
                        <el-table-column prop="id" label="表单序号" />
                        <el-table-column prop="logisticsInfoAddr" label="表单头地址" />
                        <el-table-column prop="forms" label="中转方区块链地址列表" />
                        <el-table-column prop="forms.transitContact" label="中装方联系方式列表" />
                        <!-- <el-table-column prop="transitAddrInfo" label="中装方地址信息列表" />
                        <el-table-column prop="formAddr" label="表单地址" width="400" />
                        <el-table-column prop="button" label="查看详情" /> -->
                        
                    </el-table>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script setup>
import axios from 'axios';
import { aesDecrypt, aesEncrypt} from '@/utils/utils';
import { ElMessage } from 'element-plus';
import { ref, reactive, onMounted } from 'vue';

const emptyText=ref('');
const empty = ref(false)

const info = JSON.parse(aesDecrypt(localStorage.getItem('userSession'),'xpxxy'))
const loading = ref(true)
const tableData = ref([
    ])
onMounted(() => {
    // loading.value=true;
    
    axios.post('/api/getUserForm',{'userAddr':'0x123'}).then(res=>{
        if(res.data.code == '4001'){
            ElMessage.info("暂时没有表单数据");
            emptyText.value = '暂无数据'; 
            
            loading.value = false;
            return;
        }
        if(res.data.code == '4000'){
            tableData.value = res.data.data;
            loading.value = false;
            
        }
    })
})

</script>
<style scoped lang="less">
.content{
    padding: 0.3%;
    
}
</style>