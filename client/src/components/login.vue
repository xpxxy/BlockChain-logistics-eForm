<script>
import { axios } from axios

// function testFunc(){
//     window
// };
export default{
    data(){
        loginForm:{
            userID:"",
            pw:"",
        }
    }

};

</script>

<template>
    <input  v-model="loginForm.userID"/>
    <input  v-model="loginForm.pw"/>


</template>