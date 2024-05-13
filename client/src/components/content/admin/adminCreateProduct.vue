<template>
  <div class="content">
    <el-card
      style="height: 100%; width: 100%"
      v-loading="loading"
      element-loading-text="请耐心等待区块链数据保存，这可能需要数秒钟的时间，请谅解"
    >
      <template #header>
        <div class="card-header">
          <span>商品信息登记入库</span>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <el-steps
            style="min-width: 40%"
            align-center
            :active="active"
            finish-status="success"
            process-status="finish"
          >
            <el-step title="第一步" description="填写商品基础信息">
              <template #icon>
                <el-icon>
                  <i-ep-DocumentAdd />
                </el-icon>
              </template>
            </el-step>
            <el-step title="第二步" description="确认商品信息">
              <template #icon>
                <el-icon>
                  <i-ep-Document />
                </el-icon>
              </template>
            </el-step>

          </el-steps>
        </el-col>
        <el-col :span="24"><br /></el-col>
        <el-col :span="10" :offset="7">
          <!-- 第一个表单 -->
          <el-form
            ref="senderFormRef"
            key="0"
            v-show="active === 0"
            :model="ruleForm"
            label-width="auto"
            :rules="senderRules"
            status-icon
            hide-required-asterisk
          >
            <h2>填写表单</h2>
            <el-form-item label="商品的全称" prop="name">
              <el-input
                id="name"
                placeholder="请输入商品名称"
                v-model="ruleForm.name"

              >
                <template #prefix>
                  <el-icon class="el-input__icon">
                      <i-ep-Goods />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="生产日期" prop="productionDate">
              <el-date-picker format="YYYY/MM/DD" value-format="YYYY-MM-DD" v-model="ruleForm.productionDate" type="date" placeholder="请输入生产日期" />


            </el-form-item>
            <el-form-item label="保质期至" prop="expirationDate">
              <el-date-picker format="YYYY/MM/DD" value-format="YYYY-MM-DD" v-model="ruleForm.expirationDate" type="date" placeholder="请输入保质期" />


            </el-form-item>
            <el-form-item label="条形码" prop="barcode">
              <el-input
                id="barcode"
                placeholder="请输入商品条码"
                v-model="ruleForm.barcode"
              >
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <i-ep-Coin />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="商品大致分类" prop="productType">
              <el-input
                id="productType"
                placeholder="请填写商品大致分类，详细分类可前往中国商品信息服务平台查询"
                v-model="ruleForm.productType"
              >
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <i-ep-Van />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-col :offset="11">
              <el-button @click="back"> 上一步 </el-button>
              <el-button @click="senderNext"> 下一步 </el-button>
            </el-col>
          </el-form>

          <!-- 第三个表单 -->
          <div key="1" v-show="active === 1">
            <el-descriptions
              :column="3"
              border
              title="表单基本信息"
              direction="vertical"
            >

              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon>
                      <i-ep-UserFilled />
                    </el-icon>
                    商品名称
                  </div>
                </template>
                {{ ruleForm.name }}
              </el-descriptions-item>
              <el-descriptions-item min-width="150px">
                <template #label>
                  <div class="cell-item" >
                    <el-icon>
                      <i-ep-Calendar/>
                    </el-icon>
                    商品生产日期
                  </div>
                </template>
                {{ ruleForm.productionDate }}
              </el-descriptions-item>
              <el-descriptions-item min-width="300px">
                <template #label>
                  <div class="cell-item">
                    <el-icon>
                      <i-ep-Calendar />
                    </el-icon>
                    商品保质期至
                  </div>
                </template>
                {{ ruleForm.expirationDate }}
              </el-descriptions-item>

              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon>
                      <i-ep-Tickets />
                    </el-icon>
                    商品类型
                  </div>
                </template>
                {{ ruleForm.productType }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon>
                      <i-ep-Coin />
                    </el-icon>
                    商品条码
                  </div>
                </template>
                {{ ruleForm.barcode }}
              </el-descriptions-item>

            </el-descriptions>

            <!-- <el-col :span='24'>
            请仔细阅读表单数据，一旦进行区块链操作所有数据将被记录并保存
          </el-col> -->
            <el-text class="mx-1" type="danger"
              >请仔细阅读您的表单数据！一旦进行提交操作，数据将上传至区块链保存并且将不可更改！</el-text
            >
            <el-col :span="24">
              <br />
            </el-col>
            <el-col :span="16" :offset="8">
              <el-button @click="back"> 上一步 </el-button>
              <el-button @click="openDialog" type="primary"> 提交 </el-button>
            </el-col>
          </div>
        </el-col>
      </el-row>

      <el-dialog v-model="dialogVisible" title="再次确认" width="500">
        <el-text class="mx-1" type="warning"
          >一旦提交，数据将不可更改是否提交？</el-text
        >
        <el-text class="mx-1" type="info"></el-text>

        <!-- <span>请仔细确认您的表单</span> -->
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消提交</el-button>
            <el-button type="primary" @click="submit">我已确认</el-button>
          </div>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { pcaTextArr } from "element-china-area-data"
import { aesDecrypt } from "@/utils/utils.js"
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter()
const info = JSON.parse( aesDecrypt(localStorage.getItem("userSession"), "xpxxy") );
const loading = ref(false);

const active = ref(0);
const ruleForm = reactive({
  name: "",
  productionDate:"",
  expirationDate:"",
  productType:"",
  barcode:"",

});
const senderFormRef = ref();
const receiverFormRef = ref();
const senderRules = reactive({
  name: [
    { required: true, message: "这是必填项目", trigger: "change" },
  ],
  productionDate: [
    { required: true, message: "这是必填项目", trigger: "change" },
  ],
  expirationDate: [
    { required: true, message: "这是必填项目", trigger: "change" },
  ],
  productType: [
    { required: true, message: "这是必填项目", trigger: "change" },
  ],
  barcode: [{ required: true, message: "这是必填项目", trigger: "blur" }],
});
const dialogVisible = ref(false);

function openDialog() {
  dialogVisible.value = true;
}
function submit() {
  dialogVisible.value = false;
  loading.value = true;
  console.log(ruleForm);
  axios.post("/api/addNewGoods",ruleForm).then(res=>{
    if(res.data.code=='3002'){
      loading.value = false
      ElMessage.success("商品入库成功！")
      router.push("/admin/adminAllProducts");
    }
    else{
      loading.value = false
      ElMessage.error("服务器开小差了，请稍后再试")
    }
  })
}
function handleSenderCascaderChange(value){
  // console.log(value);
  let area =''
  ruleForm.senderAddrInfo1.forEach((item) =>{
    area+=item;
  })
  ruleForm.senderAddrInfo = area;
  // console.log(area)
  
}
function handleReceiverCascaderChange(value){
  // console.log(value);
  let area =''
  ruleForm.receiverAddrInfo1.forEach((item) =>{
    area+=item;
  })
  ruleForm.receiverAddrInfo = area;
  // console.log(area)
  
}
function back() {
  if (active.value === 0) {
    ElMessage.warning("这是第一步,不能后退了");
  }
  if (active.value <= 2 && active.value > 0) {
    active.value--;
  }
}
function next(valid){
  if (valid) {
      if (active.value === 2) {
        ElMessage.warning("这是最后一步");
      }
      if (active.value >= 0 && active.value < 2) {
        active.value++;
      }
    } else {
      ElMessage.error("您尚未完成表单内容");
    }
}
function senderNext() {
  ruleForm.senderAddrInfo = ruleForm.senderAddrInfo+ruleForm.senderAddrInfo2
  senderFormRef.value.validate(async (valid) => {
    // console.log(ruleForm);
    next(valid)
    
  });
}
function receiverNext(){
  ruleForm.receiverAddrInfo = ruleForm.receiverAddrInfo+ruleForm.receiverAddrInfo2
  receiverFormRef.value.validate(async (valid) => {
    // console.log(ruleForm);
    next(valid)
  });
}
</script>

<style lang="less" scoped>
.content {
  padding: 0.3%;
}
.progressbar {
  width: 100%;
  display: inline-flex;

  justify-content: center;
}
.stepPanel {
  display: flex;
  width: 50%;
  //align-self: center;
  //align-items: center;
  justify-self: center;
  justify-content: center;
}

</style>
