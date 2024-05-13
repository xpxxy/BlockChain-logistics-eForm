<template>
  <div class="content">
    <el-card style="height: 100%">
      <template #header>
        <div class="card-header">
          <span>更改运单状态</span>
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
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Van />
                          </el-icon>
                          承运公司
                        </div>
                      </template>
                      {{ props.row.logisticsCompanyName }}
                    </el-descriptions-item>
                    <el-descriptions-item >
                      <template #label>
                        <div class="cell-item">
                          <el-icon>
                            <i-ep-Compass />
                          </el-icon>
                          当前业务状态
                        </div>
                      </template>
                      <el-tag v-if="props.row.status==='on'" type="success">正在进行当中</el-tag>
                      <el-tag v-if="props.row.status==='off'" type="info">表单已结束</el-tag>
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
                    content="这里是商品信息详情,点击条形码数据可以前往中国商品服务平台查询更加详细的信息"
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
            <el-table-column prop="formAddr" label="中转方区块链地址" />
            <el-table-column prop="receiverAddr" label="收件人区块链地址" />
            <el-table-column prop="productAddr" label="商品区块链地址" />
            <el-table-column prop="createdAt" label="表单创建时间" />
            <el-table-column prop="status" label="表单当前状态">
              <template #default={row}>
                <el-tag v-if="row.status==='on'" type="success">状态正常</el-tag>
                <el-tag v-if="row.status==='off'" type="info">停用</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="操作">
              <template #default={row}>
                <el-button v-if="row.status==='off'" disabled  type="danger" >已被停用不可操作</el-button>
                <el-button v-if="row.status==='on'"  @click="handleStop(row)" type="danger" >结束表单</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableData.length"
      />
      <el-dialog
        v-model="dialogVisible"
        title="中转方信息表单填写"
        width="600"
        :show-close="false"
        :close-on-click-modal="false"
      >
      <el-row>
        <el-col>
          <el-form :rules="Rules" ref="transitFormRef" :model="transitForm" label-width="auto">
          <el-form-item label="中转方区块链地址" prop="transitAddr">
            <el-input v-model="transitForm.transitAddr" placeholder="请填入区块链地址">
              <template #prefix>
                    <el-icon class="el-input__icon">
                      <i-ep-Coin />
                    </el-icon>
                  </template>
            </el-input>  
          </el-form-item>
          <el-form-item label="中转方联系电话" prop="transitContact" >
            <el-input v-model="transitForm.transitContact" placeholder="请填入电话号码">
              <template #prefix>
                    <el-icon class="el-input__icon">
                      <i-ep-Phone />
                    </el-icon>
                  </template>
            </el-input> 
              
          </el-form-item>
          <el-form-item label="中转地址" prop="transitAddrInfo">
              <div style="display:flex; flex-warp:nowarp; width:100%">
                <el-cascader placeholder="请选择" style="width: 70%" size="default" :options="pcaTextArr" v-model="transitForm.transitAddrInfo1" @change="handleCascaderChange"></el-cascader>
                <el-input id="transitAddrInfo" placeholder="请输入详细地址" v-model="transitForm.transitAddrInfo2">
                  <template #prefix>
                    <el-icon class="el-input__icon">
                      <i-ep-Location />
                    </el-icon>
                  </template>
                </el-input>
              </div>
            </el-form-item>
        </el-form>
        </el-col>
        
      </el-row>
        
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消操作</el-button>
            <el-button type="primary" @click="show"> 确认操作 </el-button>
          </div>
        </template>
      </el-dialog>
    </el-card>
  </div>



</template>
<script setup>
import axios from "axios";
import { aesDecrypt, aesEncrypt } from "@/utils/utils";
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted ,computed} from "vue";
import { pcaTextArr } from "element-china-area-data"


const emptyText = ref("");
const empty = ref(false);

const info = JSON.parse(
  aesDecrypt(localStorage.getItem("userSession"), "xpxxy")
);
const loading = ref(true);
const dialogVisible =ref(false)
const tableData = ref([]);
const transitForm = reactive({
  formAddr: "",
  transitAddr:"",
  transitContact:"",
  transitAddrInfo:"",
  transitAddrInfo1:[],
  transitAddrInfo2:""
})
const transitFormRef = ref();
const Rules = reactive({
  transitAddr:[ { required: true, message: "这是必填项目", trigger: "change" }],
  transitContact:[{ required: true, message: "这是必填项目", trigger: "change" }],
  transitAddrInfo: [
    { required: true, message: "这是必填项目", trigger: "change" },
  ],
  transitAddrInfo1: [
    { required: true, message: "这是必填项目", trigger: "change" },
  ],
  transitAddrInfo2: [
    { required: true, message: "这是必填项目", trigger: "change" },
  ]
});


onMounted(() => {
  axios.post("/api/getTransitForm", { userAddr: info.address }).then((res) => {
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
  }).catch(err=>{
    loading.value = false;
    ElMessage.error("超时")
  });
});
function handleStop(row){
  transitForm.formAddr = row.formAddr;
  transitForm.logisticsInfoAddr = row.logisticsInfoAddr;
  dialogVisible.value = true;

}
function handleCascaderChange(value){
  let area =''
  transitForm.transitAddrInfo1.forEach((item) =>{
    area+=item;
  })
  transitForm.transitAddrInfo = area;
}
function show(){
  
  transitForm.transitAddrInfo = transitForm.transitAddrInfo+transitForm.transitAddrInfo2
  transitFormRef.value.validate(async (valid) => {
    if(valid){
      submit()
    }
    else{
      ElMessage.error("请先完成表单")
    }
  });
}
function emptyForm(){
          transitForm.formAddr="",
          transitForm.transitAddr="",
          transitForm.transitAddrInfo="",
          transitForm.transitContact="",
          transitForm.transitAddrInfo1=[],
          transitForm.transitAddrInfo2="",
          transitForm.logisticsInfoAddr=""
}
const submit = () => {
  ElMessageBox.confirm('请再次确认您的数据正确无误，一旦更新将存储且不可修改！','提示',{
    confirmButtonText:'确定并提交',
    cancelButtonText:'不，我还需要修改',
    type:"warning",
    showClose:'false',
    beforeClose:(action, instance, done)=>{
      if(action ==='cancel'){
        ElMessage.info("取消")
      };
      done();
    }
  }).then(action=>{
    if(action === 'confirm'){
      const loadingInstance = ElLoading.service({text:"正在更新中"})
      dialogVisible.value = false;
      axios.post('/api/changeFormStatus', transitForm).then(res=>{
        if(res.data.code==='4009'){
          axios.post("/api/getTransitForm", { userAddr: info.address }).then(response=>{
            if(response.data.code == '4000'){
              tableData.value = response.data.data;
              loadingInstance.close()
              ElMessage.success("更新成功！")
              emptyForm()
            }else{
              loadingInstance.close();
              ElMessage.error("更新列表时出错！")
            }
          })
        }else{
          loadingInstance.close()
          ElMessage.error("服务器出错了")
        }
      }).catch(err=>{
        // console.log(err)
        loadingInstance.close();
        ElMessage.error("出错了")
      })
    }
  })
    
    
   
}


function get(value){
  window.open("https://www.gds.org.cn/#/barcodeList/index?type=barcode&keyword="+value)
  // console.log(value)
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