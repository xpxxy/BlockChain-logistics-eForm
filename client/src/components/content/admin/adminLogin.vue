<template>
    <div class="body">
        <div class="header">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
                <el-menu-item index="0">
                    <img style="width: 60px" src="@/assets/logo.png" alt="Delivery logo" />
                    <div class="mainTitle">区块链物流表单系统</div>
                </el-menu-item>

                <div class="flex-grow" />

                <el-menu-item index="1" @click="toMainPage">
                    <el-icon>
                        <!-- icon需要这样引入 -->
                        <i-ep-HomeFilled />
                    </el-icon>
                    返回首页
                </el-menu-item>
                <el-menu-item index="2" @click="toLogin">
                    <el-icon>
                        <i-ep-Tools />
                    </el-icon>
                    普通用户登录
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <div class="contentBody">
                <el-form ref="ruleFormRef" :model="ruleForm" label-width="auto" style="max-width: 600px;" :rules="rules"
                    label-position="left" status-icon hide-required-asterisk>
                    <el-form-item>
                        <img style="width: 100px" src="@/assets/logo.png" alt="Delivery logo" />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input id="phone" placeholder="您的手机号" maxlength="11" v-model="ruleForm.phone">
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <i-ep-Iphone />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pw">
                        <el-input id="pw" placeholder="您的密码" show-password v-model="ruleForm.pw">
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <i-ep-Lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="button">
                        <el-button v-loading.fullscreen.lock="fullscreenLoading" @click="submit()" type="primary">
                            <template #icon>
                                <el-icon><i-ep-CircleCheck /></el-icon>
                            </template>
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>




</template>
<script setup>
import { ref, reactive, onBeforeMount} from 'vue'
import { aesDecrypt } from '@/utils/utils';
import axios from 'axios'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
const router = useRouter()
const activeIndex = ref('0')
const ruleForm = reactive({
    phone:'',
    pw:'',
    captcha:''
})
const ruleFormRef = ref()
const captcha = reactive({
    src:""
})
const rules = reactive({
    phone:[
        { required: true, message: "请输入手机号", trigger: 'blur' },
        { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, message: "请输入正确的手机号", trigger: 'blur'},
        { len:11, message:"请输入正确的手机号", trigger: 'blur'}
    ],
    pw:[
        { required: true, message:"请输入密码", trigger:'blur' },
        { min:6,max:20, message:"密码的长度在6-20位之间", trigger:'blur'}
    ]
})
const toLogin=()=>{
    router.push('/login')
}
const toMainPage=()=>{
    router.back('/')
}
const fullscreenLoading = ref(false)
function submit(){
    //设置加载遮罩
    fullscreenLoading.value = true
    ruleFormRef.value.validate((valid) => {
        if(valid){
            var options = {
                method: 'post',
                headers: { "content-type": "application/json" },
                data: ruleForm,
                url: '/api/adminlogin',
            }
            axios(options).then(res => {
                let data = res.data
                if(data.code =='2000'){
                    localStorage.setItem('userSession', data.data)
                    fullscreenLoading.value = false
                    ElMessage.success("登录成功！")
                    router.push('/admin')
                }
                if (data.code == '2002'){
                    fullscreenLoading.value = false
                    ElMessage.error("密码错误！")
                    
                }
            }).catch(err=>{
                fullscreenLoading.value = false
                ElMessage.error('登录失败，服务器开小差了')
            })
        }else{
            fullscreenLoading.value = false;
            ElMessage.info('您的表单完成了吗？')
        }
    })
    
}
</script>
<style scoped lang="less">
.el-row {
  margin-bottom: 20px;
  text-align: center;
}
.body{
    background: url("@/assets/loginbg.jpg") no-repeat;
    background-size: cover;
    height: 850px;
    
}

.flex-grow {
 flex-grow: 1;
}
.content{
  display: flex;
  width: 50%;
  height: 500px;
  margin-left: 25%;
  margin-top: 5%;
  align-items: center;
  justify-content: center;
  border: solid 2px;
  border-color: antiquewhite;
  border-radius: 8px;
  backdrop-filter: blur(60px);
  padding-top:0px;
  /* opacity: 25%; */

}
.contentBody{
    width: 500px;
    height: 40%;
}
/*深度选择器*/
::v-deep(.el-form-item__content)
{
        justify-content: center;
}
.captchabox{
    height: 35px;
}

</style>