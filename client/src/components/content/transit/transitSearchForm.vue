<template>
  <div class="content">
    <el-card style="height: 100%">
      <template #header>
        <div class="card-header">
          <span>查询运单</span><br/>
          <el-text type="info" size="small">本页面将通过区块链地址查询电子运单</el-text>
        </div>
      </template>
      <el-row>
        <el-col :span="18">
                    <el-input v-model="searchContent.searchData" placeholder="请输入表单头的区块链地址码" />
                </el-col>
                <el-col :span="5" :push="1">
                    <el-button type="primary" @click="searchForm">搜索</el-button>
                    <el-button type="default" @click="clear">清除列表数据</el-button>
                </el-col>
        <el-col :span="24"><br/></el-col>
        <el-col :span="24">
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            :data="tableData"
            style="width: 100%"
            height="750px"
            stripe
            :border="true"
          >
            <template #empty>
              <p>{{ emptyText }}</p>
            </template>
            <el-table-column type="expand">
              <template #default="props">
                <div class="expandCard">
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="这里是电子表单的信息头"
                    placement="right"
                  >
                    <h3>表单头信息</h3>
                  </el-tooltip>
                  <el-descriptions :column="3" border>
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-UserFilled />
                          </el-icon>
                          收件人区块链地址
                        </div>
                      </template>
                      {{ props.row.receiverAddr }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Iphone />
                          </el-icon>
                          收件人联系方式
                        </div>
                      </template>
                      {{ props.row.receiverContact }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-LocationFilled />
                          </el-icon>
                          收货地址
                        </div>
                      </template>
                      {{ props.row.receiverAddressInfo }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Van />
                          </el-icon>
                          发件人区块链地址
                        </div>
                      </template>
                      {{ props.row.senderAddr }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Cellphone />
                          </el-icon>
                          发件人联系方式
                        </div>
                      </template>
                      {{ props.row.senderContact }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Office-building />
                          </el-icon>
                          发货地址
                        </div>
                      </template>
                      {{ props.row.senderAddressInfo }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Coin />
                          </el-icon>
                          表单头区块链地址
                        </div>
                      </template>
                      {{ props.row.logisticsInfoAddr }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Tickets />
                          </el-icon>
                          中转信息区块链地址
                        </div>
                      </template>
                      {{ props.row.formAddr }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Box />
                          </el-icon>
                          商品信息区块链地址
                        </div>
                      </template>
                      {{ props.row.productAddr }}
                    </el-descriptions-item>
                    <el-descriptions-item min-width="100">
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Compass />
                          </el-icon>
                          当前业务状态
                        </div>
                      </template>
                      <el-tag v-if="props.row.status==='on'" type="success">正在进行当中</el-tag>
                      <el-tag v-if="props.row.status==='off'" type="info">正在进行当中</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Clock />
                          </el-icon>
                          表单创建时间
                        </div>
                      </template>
                      {{ props.row.createdAt }}
                    </el-descriptions-item>
                  </el-descriptions>

                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="这里是商品信息详情,点击条码可以前往中国商品信息服务平台进一步查询细节信息"
                    placement="right"
                  >
                    <h3>商品基本信息</h3>
                  </el-tooltip>
                  <el-descriptions :column="5" border direction="vertical">
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Box />
                          </el-icon>
                          商品名称信息
                        </div>
                      </template>
                      {{ props.row.good.name }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Calendar />
                          </el-icon>
                          商品生产日期
                        </div>
                      </template>
                      {{ props.row.good.productionDate }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Calendar />
                          </el-icon>
                          商品保质期至
                        </div>
                      </template>
                      {{ props.row.good.expirationDate }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Memo />
                          </el-icon>
                          商品类别
                        </div>
                      </template>
                      {{ props.row.good.productType }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Postcard />
                          </el-icon>
                          商品条码
                        </div>
                      </template>
                      <span @click="get(props.row.good.barcode)">{{ props.row.good.barcode }}</span>
                    </el-descriptions-item>
                  </el-descriptions>

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
                    <el-table-column label="更新时间" prop="createdAt" />
                  </el-table>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="70" prop="id" label="表单ID" />
            <el-table-column prop="logisticsInfoAddr" label="表单头区块链地址" />
            <el-table-column prop="formAddr" label="中转信息区块链地址" />
            <el-table-column prop="receiverAddr" label="收件人区块链地址" />
            <el-table-column prop="productAddr" label="商品区块链地址" />
            <el-table-column prop="createdAt" label="表单创建时间" />
          </el-table>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableData.length"
      />
    </el-card>
  </div>
</template>
<script setup>
import axios from "axios";
import { aesDecrypt, aesEncrypt } from "@/utils/utils";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
const info = JSON.parse(
  aesDecrypt(localStorage.getItem("userSession"), "xpxxy")
);
const emptyText = ref("");
const searchContent = reactive({
  searchData:"",
  userAddr:info.address
});


const loading = ref(false);
const tableData = ref([]);



function searchForm(searchData){
    //加载遮罩
    loading.value = true
  axios.post("/api/searchForm", searchContent ).then((res) => {
   if (res.data.code == "4000") {
        loading.value = false;
        ElMessage.success("查询成功！")
        tableData.value = res.data.data;
      
    }
    else {
        loading.value = false;
        ElMessage.info("未找到您提供的表单信息")
        
    }
  });
};
function clear(){
    tableData.value = []
    ElMessage.success("清除成功！")
}
function get(value){
  window.open("https://www.gds.org.cn/#/barcodeList/index?type=barcode&keyword="+value)
  
}
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
h3 {
  display: inline-block;
}
</style>