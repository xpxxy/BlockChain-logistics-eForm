<template>
  <div class="content">
    <el-card style="height: 100%">
      <template #header>
        <div class="card-header">
          <span>当前在库商品数据列表</span>
        </div>
      </template>
      <el-row>
        <el-col :span="24">
          <el-table
            v-loading="loading"
            :data="paginatedData"
            style="width: 100%"
            height="750px"
            stripe
            :border="true"
          >
            <template #empty>
              <p>{{ emptyText }}</p>
            </template>
            <el-table-column prop="name" label="商品名称" />
            <el-table-column prop="productAddr" label="商品区块链地址" />
            <el-table-column prop="productionDate" label="商品生产日期" />
            <el-table-column prop="expirationDate" label="商品保质期至" />
            <el-table-column prop="productType" label="商品类别" />
            <el-table-column prop="barcode" label="商品条码">
                <template #default={row}>
                    <el-tag @click="display(row.barcode)" type="primary">{{row.barcode}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="当前状态">
                <template #default={row}>
                    <el-tag v-if="row.status==='on'" type="success">状态正常</el-tag>
                    <el-tag v-if="row.status==='off'" type="info">停用</el-tag>
                </template>
                
            </el-table-column>
            <el-table-column prop="createdAt" label="入库时间" />
            
            
          </el-table>
        </el-col>
      </el-row>
      <el-pagination
          background

          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="totalItems"
      />
    </el-card>
    <el-dialog
    v-model="dialogVisible"
    title="确认"
    width="500"
  ><div style="display:flex;align-items:center"><img src="@/assets/gs1_logo.png" />您即将前往中国商品信息服务平台查询条码数据，是否确认？</div>
    
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="go">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>
<script setup>
import axios from "axios";
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted, computed } from "vue";

const dialogVisible = ref(false)
const emptyText = ref("");
const empty = ref(false);
const loading = ref(true);
const tableData = ref([]);
const searchBarcode = ref('');
onMounted(() => {
  axios.get("/api/findAllGoods").then((res) => {
    if (res.data.code == "3001") {
      ElMessage.info("暂时没有商品数据");
      emptyText.value = "暂无数据";
      loading.value = false;
      return;
    }
    if (res.data.code == "3000") {
      tableData.value = res.data.data;
      loading.value = false;
    }
  }).catch(err=>{
    loading.value = false;
    ElMessage.error("超时")
  });
});
function go(){
  window.open("https://www.gds.org.cn/#/barcodeList/index?type=barcode&keyword="+searchBarcode.value)
}
function display(value){
    dialogVisible.value = true;
    searchBarcode.value = value;
}
const totalItems = computed(() => tableData.value.length); 
const pageSize = ref(8); // 每页显示的条目数  
const currentPage = ref(1); // 当前页码 
const paginatedData = computed(() => {  
      const start = (currentPage.value - 1) * pageSize.value;  
      const end = start + pageSize.value;  
      return tableData.value.slice(start, end);  
    });
function handleCurrentChange(newPage) {  
      currentPage.value = newPage;  
}  
</script>
<style scoped lang="less">
.content {
  padding: 0.3%;
}
.expandCard {
  padding: 1%;
}
// p {
//   // font-family:'Resource Han Rounded CN Normal';
//   font-size: 14px;
//   // font-weight: bold;
// }
h3 {
  display: inline-block;
}
</style>