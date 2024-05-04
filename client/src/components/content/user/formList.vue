<template>
  <div class="content">
    <el-card style="height: 100%">
      <template #header>
        <div class="card-header">
          <span>运单数据列表</span>
        </div>
      </template>
      <el-row>
        <el-col :span="24">
          <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%"
            height="600px"
            stripe
            :border="true"
          >
            <template #empty>
              <p>{{ emptyText }}</p>
            </template>
            <el-table-column type="expand">
              <template #default="props">
                <div class="expandCard">
                  <h3>表单头信息</h3>
                  <el-row :gutter="20">
                    <el-col :span="7">
                      <p>发件人区块链地址：{{ props.row.senderAddr }}</p>
                      <p>发件人联系方式：{{ props.row.senderContact }}</p>
                      <p>发件地址：{{ props.row.senderAddressInfo }}</p>
                      <p>承运公司：{{ props.row.logisticsCompanyName }}</p>
                    </el-col>
                    <el-divider direction='vertical'/>
                    <el-col :span="7">
                      <p>收件人区块链地址：{{ props.row.receiverAddr }}</p>
                      <p>收件人件人联系方式：{{ props.row.receiverContact }}</p>
                      <p>收件地址：{{ props.row.receiverAddressInfo }}</p>
                    </el-col>
                    <el-col :span="7">
                      <p>表单头区块链地址：{{ props.row.logisticsInfoAddr }}</p>
                      <p>表单区块链地址：{{ props.row.formAddr }}</p>
                      <p>商品区块链地址：{{ props.row.productAddr }}</p>
                    </el-col>
                  </el-row>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="这里是中转方的信息列表，自上到下为中转经过的实际顺序"
                    placement="right"
                  >
                  <h3>中转方溯源信息</h3>
                  </el-tooltip>
                  
                  <el-table :data="props.row.forms" :border="true">
                    <el-table-column
                      label="中转方区块链地址"
                      prop="transitAddr"
                    />
                    <el-table-column
                      label="中转方联系方式"
                      prop="transitContact"
                    />
                    <el-table-column label="中转地址" prop="transitAddrInfo" />
                  </el-table>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="表单序号" />
            <el-table-column prop="logisticsInfoAddr" label="表单头地址" />
            <el-table-column prop="formAddr" label="表单地址" />
            <el-table-column prop="receiverAddr" label="收件人地址" />
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script setup>
import axios from "axios";
import { aesDecrypt, aesEncrypt } from "@/utils/utils";
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";

const emptyText = ref("");
const empty = ref(false);

const info = JSON.parse(
  aesDecrypt(localStorage.getItem("userSession"), "xpxxy")
);
const loading = ref(true);
const tableData = ref([]);
onMounted(() => {
  axios.post("/api/getUserForm", { userAddr: "0x123" }).then((res) => {
    if (res.data.code == "4001") {
      ElMessage.info("暂时没有表单数据");
      emptyText.value = "暂无数据";
      loading.value = false;
      return;
    }
    if (res.data.code == "4000") {
      tableData.value = res.data.data;
      loading.value = false;
    }
  });
});
</script>
<style scoped lang="less">
.content {
  padding: 0.3%;
}
.expandCard {
  padding: 2%;
}
p {
  // font-family:'Resource Han Rounded CN Normal';
  font-size: 14px;
  // font-weight: bold;
}
h3{
  display: inline-block;
}
</style>