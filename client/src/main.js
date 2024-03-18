import { createApp } from 'vue'
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";

import './style.css'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router)
// app.use(axios)
app.mount('#app')
