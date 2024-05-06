<template>
    <div class="body">
        <div class="header">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
                <el-menu-item index="0">
                    <img style="width: 60px" src="../../assets/logo.png" alt="Delivery logo" />
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
                        <i-ep-ArrowLeftBold />
                    </el-icon>
                    返回登录
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <div class="contentBody">
                <el-form ref="ruleFormRef" :model="ruleForm" label-width="auto" style="max-width: 600px;" :rules="rules"
                    label-position="left" status-icon hide-required-asterisk>
                    <el-form-item>
                        <img style="width: 100px" src="../../assets/logo.png" alt="Delivery logo" />
                    </el-form-item>
                    <el-form-item label="您的用户名" prop="userID">
                        <el-input id="userID" placeholder="请输入您的用户名" v-model="ruleForm.userID">
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <i-ep-User />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="您的姓名" prop="name">
                        <el-input id="name" placeholder="请输入您的姓名" v-model="ruleForm.name">
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <i-ep-User />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="您的手机号" prop="phone">
                        <el-input id="phone" placeholder="请输入您的手机号" v-model="ruleForm.phone">
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <i-ep-Iphone />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="您的密码" prop="pw">
                        <el-input id="pw" placeholder="请输入您的密码6-20位，可以包含特殊字符" v-model="ruleForm.pw">
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <i-ep-Lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="您的角色" prop="role">
                            <el-radio-group id="role" v-model="ruleForm.role" size="default">
                                        <el-radio-button  value="user">
                                            <el-icon>
                                                <i-ep-Avatar />
                                            </el-icon>我是普通用户
                                        </el-radio-button>
                                        <el-radio-button  value="transit">
                                            <el-icon>
                                                <i-ep-Van />
                                            </el-icon>我是运输方
                                        </el-radio-button>
                            </el-radio-group>
                    </el-form-item>
                    <el-form-item class="button">
                        <el-button v-loading.fullscreen.lock="fullscreenLoading" @click="submit()" type="primary">
                            <template #icon>
                                <el-icon><i-ep-CircleCheck /></el-icon>
                            </template>
                            点击注册
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>




</template>
<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus'
const router = useRouter()
const activeIndex = ref('0')
const fullscreenLoading = ref(false)
const ruleForm = reactive({
    userID:'',
    phone:'',
    name:'',
    pw:'',
    role:''
})
const ruleFormRef = ref()
const rules = reactive({
    userID:[
        { required:true, message:'请输入您的用户名,长度在2-20位之间', trigger: "blur" },
        { min:2, max:20, message:"您的用户名长度应为2-20位之间", trigger:"blur"},
        { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{2,20}$/, message:"非法的用户名，请不要输入除_-以外的字符", trigger:"blur"}  
    ],
    phone:[
        { required: true, message: "请输入手机号", trigger: 'blur' },
        { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, message: "请输入正确的手机号", trigger: 'blur'},
        { len:11, message:"请输入正确的手机号", trigger: 'blur'}
    ],
    name:[
        {min:2, max:20, message:"您的姓名未输入正确", trigger: 'blur'}
    ],
    pw:[
        { required: true, message:"请输入密码", trigger:'blur' },
        { min:6,max:20, message:"密码的长度在6-20位之间", trigger:'blur'}
    ],
    role:[
        { required: true, message: "请选择您的身份", trigger: "blur"}
    ]
});

const toLogin=()=>{
    router.back()
}
const toMainPage=()=>{
    router.push('/')
}
/**
 * @description: 提交表单
 * @return {*} 返回结果
 * @requestType: 无
 */
function submit(){
    //开启加载遮罩
    fullscreenLoading.value = true
    //验证的回调函数
    ruleFormRef.value.validate(async (valid) => {
        if(valid){

          const options = {
            method: 'post',
            headers: {"content-type": "application/json"},
            data: ruleForm,
            url: '/api/adduser',
            // timeout: 5000
          };

          // console.log(options)
            //等待注册接口
            await axios(options).then(async res => {
                let data = res.data
                if (data.code == '1000') {
                    //将加载遮罩关闭
                    fullscreenLoading.value = false
                    //弹出提示
                    ElMessage.success("注册成功！即将前往个人中心")
                    await axios.post('/api/loginNoCaptcha',{"phone":ruleForm.phone,"pw":ruleForm.pw}).then(response=>{
                        if(response.data.code=='1000'){
                            localStorage.setItem('userSession', response.data.data )
                            
                            router.push('/user')
                            
                        }
                    })
                    
                    
                    
                }
            }).catch(err=>{
                fullscreenLoading.value = false
                ElMessage.error('注册失败，服务器开小差了')
            })
        }else{
            fullscreenLoading.value = false
            ElMessage.error("请检查表单是否正确！")
        }
    })
    //!不要使用axios发json的get 草你妈测半天
    
}

</script>
<style scoped lang="less">
.el-row {
  margin-bottom: 20px;
  text-align: center;
}
.body{
    background: url("../../assets/loginbg.jpg") no-repeat;
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
  align-items: flex-start;
  justify-content: center;
  border: 2px solid antiquewhite;
  border-radius: 8px;
  backdrop-filter: blur(60px);
  padding-top:0px;
  /* opacity: 25%; */

}
.contentBody{
    width: 500px;
    height: 60%;
}
/*深度选择器*/
::v-deep(.el-form-item__content)
{
        justify-content: center;
}

.el-radio-group{
    width: 100%;
    justify-content:space-between;
}
.el-radio-button{
    width: 50%;
    display: flex;
}
::v-deep(.el-radio-button__inner){
    flex:1
}
</style>