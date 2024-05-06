<template>
  <div class="content">
    <el-card style="height: 100%;width: 100%">
      <template #header>
        <div class="card-header">
          <span>电子运单创建</span>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <el-steps style="min-width:40%;" align-center :active="active" finish-status="success" process-status="finish">
            <el-step title="第一步" description="填写发件基础信息" >
              <template #icon>
                <el-icon>
                  <i-ep-DocumentAdd />
                </el-icon>
              </template>
            </el-step>
            <el-step title="第二步" description="填写收件基础信息">
              <template #icon>
                <el-icon>
                  <i-ep-Document />
                </el-icon>
              </template>
            </el-step>
            <el-step title="第三步" description="确认信息">
              <template #icon>
                <el-icon>
                  <i-ep-CircleCheck />
                </el-icon>
              </template>
            </el-step>
          </el-steps>
        </el-col>
        <el-col :span="24"><br></el-col>
        <el-col :span="10" :offset="7">
          <el-form ref="senderFormRef" key="0" v-show="active===0" :model="ruleForm" label-width="auto" :rules="senderRules" status-icon hide-required-asterisk>
            <h2>填写表单</h2>
            <el-form-item label="发件人区块链地址" prop="senderAddr" >
              <el-input id="senderAddr" placeholder="请输入发件人的区块链地址" v-model="ruleForm.senderAddr">
               <template #prefix>
                 <el-icon class="el-input__icon">
                   <i-ep-User />
                 </el-icon>
               </template>
              </el-input>
            </el-form-item>
            <el-form-item label="发件人手机号码" prop="senderContact" >
              <el-input id="senderContact" placeholder="请输入发件人的号码" v-model="ruleForm.senderContact">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <i-ep-User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="发件地址" prop="receiverAddrInfo" >
              <el-input id="receiverAddrInfo" placeholder="请输入发件地址" v-model="ruleForm.receiverAddrInfo">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <i-ep-Location />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="商品区块链地址" prop="productAddr">
              <el-input id="productAddr" placeholder="请输入商品地址" v-model="ruleForm.productAddr">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <i-ep-Location />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="快递公司名称" prop="logisticsCompanyName">
              <el-select id="logisticsCompanyName" placeholder="请输入商品地址" v-model="ruleForm.logisticsCompanyName">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <i-ep-Van />
                  </el-icon>
                </template>
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>


            <el-col :span="16" :offset="6">
              <el-button @click="back">
                上一步
              </el-button>
              <el-button @click="next">
                下一步
              </el-button>
            </el-col>
          </el-form>
          <el-form key="1" v-show="active===1" ref="receiverFormRef" :model="ruleForm" label-width="auto" :rules="receiverRules" status-icon hide-required-asterisk>
            <h2>填写表单</h2>
            <el-form-item label="收件人区块链地址" prop="receiverAddr">
              <el-input placeholder="请输入收件人的区块链地址" v-model="ruleForm.receiverAddr">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <i-ep-User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="收件人手机号码" prop="receiverContact">
              <el-input placeholder="请输入收件人的号码" v-model="ruleForm.receiverContact">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <i-ep-User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="收件地址" prop="receiverContact">
              <el-input placeholder="请输入收件地址">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <i-ep-Location />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-col :span="16" :offset="6">
              <el-button @click="back">
                上一步
              </el-button>
              <el-button @click="next">
                下一步
              </el-button>
            </el-col>
          </el-form>
          <el-descriptions :column="3" border key="2" v-show="active===2">
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <i-ep-UserFilled />
                  </el-icon>
                  收件人区块链地址
                </div>
              </template>
              {{ ruleForm.receiverAddr }}
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
              {{ ruleForm.senderAddr }}
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
              {{ ruleForm.receiverAddressInfo }}
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
              {{ ruleForm.senderAddr }}
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
              {{ ruleForm.senderContact }}
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
              {{ ruleForm.senderAddressInfo }}
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
              {{ ruleForm.productAddr }}
            </el-descriptions-item>
          </el-descriptions>


        </el-col>

      </el-row>






    </el-card>
  </div>
</template>

<script setup>
import {ref, reactive} from "vue";
import {ElMessage} from "element-plus";
const loading = ref(false);
const active = ref(0);
const ruleForm = reactive({
  senderAddr:'',
  senderContact:'',
  senderAddrInfo:'',
  receiverAddr:'',
  receiverContact:'',
  receiverAddrInfo:'',
  logisticsCompanyName:'',
  productAddr:'',
});
const senderFormRef = ref();
const receiverFormRef = ref();
const senderRules = reactive({
  senderAddr:[
    { max:42, message: "请输入正确的地址", trigger: "blur" },
    { required:true, message:'这是必填项目', trigger:'blur' },
  ],
  senderContact:[
    { required: true, message: "请输入手机号", trigger: 'blur' },
    { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, message: "请输入正确的手机号", trigger: 'blur'},
    { len:11, message:"请输入正确的手机号", trigger: 'blur'}
  ],
  senderAddrInfo:[
    { required:true, message:'这是必填项目', trigger:'blur' },
  ],
  logisticsCompanyName:[
    { required:true, message:'这是必填项目', trigger:'blur' },
  ],
  productAddr:[
    { required:true, message:'这是必填项目', trigger:'blur' },
  ]
})
const receiverRules = reactive({
  receiverAddr:[
    { required:true, message:'这是必填项目', trigger:'blur' },
  ],
  receiverContact:[
    { required: true, message: "请输入手机号", trigger: 'blur' },
    { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, message: "请输入正确的手机号", trigger: 'blur'},
    { len:11, message:"请输入正确的手机号", trigger: 'blur'}
  ],
  receiverAddrInfo:[
    { required:true, message:'这是必填项目', trigger:'blur' },
  ],
})
const options=reactive([
  {
    "value": "圆通速递",
    "label": "圆通速递"
  },
  {
    "value": "申通快递",
    "label": "申通快递"
  },
  {
    "value": "韵达速递",
    "label": "韵达速递"
  },
  {
    "value": "中通快递",
    "label": "中通快递"
  },
  {
    "value": "顺丰速运",
    "label": "顺丰速运"
  },
  {
    "value": "京东快递",
    "label": "京东快递"
  },
  {
    "value": "中国邮政",
    "label": "中国邮政"
  },
  {
    "value": "极兔速递",
    "label": "极兔速递"
  },
  {
    "value": "EMS",
    "label": "EMS"
  },
  {
    "value": "天天快递",
    "label": "天天快递"
  },
  {
    "value": "宅急送",
    "label": "宅急送"
  },
  {
    "value": "如风达",
    "label": "如风达"
  },
  {
    "value": "AAAE全球专递",
    "label": "AAAE全球专递"
  },
  {
    "value": "百世快递",
    "label": "百世快递"
  },
  {
    "value": "DHL中国件",
    "label": "DHL中国件"
  },
  {
    "value": "佳吉快运",
    "label": "佳吉快运"
  },
  {
    "value": "跨越速递",
    "label": "跨越速递"
  },
  {
    "value": "快捷快递",
    "label": "快捷快递"
  },
  {
    "value": "民航快递",
    "label": "民航快递"
  },
  {
    "value": "圣安物流",
    "label": "圣安物流"
  },
  {
    "value": "盛辉物流",
    "label": "盛辉物流"
  },
  {
    "value": "TNT",
    "label": "TNT"
  },
  {
    "value": "UPS",
    "label": "UPS"
  },
  {
    "value": "万象物流",
    "label": "万象物流"
  },
  {
    "value": "新邦物流",
    "label": "新邦物流"
  },
  {
    "value": "信丰物流",
    "label": "信丰物流"
  },
  {
    "value": "优速物流",
    "label": "优速物流"
  },
  {
    "value": "远成物流",
    "label": "远成物流"
  },
  {
    "value": "运通中港速递",
    "label": "运通中港速递"
  },
  {
    "value": "中铁物流",
    "label": "中铁物流"
  },
  {
    "value": "德邦快递",
    "label": "德邦快递"
  }
])

function submit(ruleForm){

}





function back(){
  if (active.value===0){
    ElMessage.warning("这是第一步,不能后退了")
  }
  if(active.value<=2 && active.value>0){
    active.value--;
  }
}
function next(){
  senderFormRef.value.validate(async (valid) => {
    console.log(ruleForm)
    if(valid){
      if(active.value===2){
        ElMessage.warning("这是最后一步");
      }
      if(active.value>=0 && active.value<2){
        active.value++;
      }
    }
    else{
      ElMessage.error("您尚未完成表单内容")
    }
  })


}
</script>

<style lang="less" scoped>
.content {

  padding: 0.3%;

}
.progressbar {
  width:100%;
  display: inline-flex;

  justify-content: center;
}
.stepPanel{
  display: flex;
  width: 50%;
  //align-self: center;
  //align-items: center;
  justify-self: center;
  justify-content: center;
}


</style>
