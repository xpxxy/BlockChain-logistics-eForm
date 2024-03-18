
import { createRouter, createWebHistory } from 'vue-router';

import home from '../components/home.vue';
const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/login',
            name: 'login',
            component:()=>import('../components/LR/login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component:()=>import('../components/LR/register.vue')
        },
        {
            path: '/user',
            name: 'user',
            meta: { needLogin: true },
           
            component: () => import('../components/content/user/index.vue'),
            children: [
                {
                    path: 'info',
                    name: 'userInfo',
                    component: ()=> import('../components/content/user/userInfo.vue'),
                    // meta: {}
                },
                {
                    path: 'formlist',
                    name: 'formlist',
                    component: ()=> import('../components/content/user/formList.vue'),
                },
                {
                    path: 'searchform',
                    name: 'searchform',
                    component: ()=> import('../components/content/user/searchForm.vue'),
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next)=>{
    let userSeesion = localStorage.getItem("userSession");
    if(to.matched.some(item=>item.meta.needLogin)){
        if(userSeesion){
            next();
            return;
        }
        alert("no user logon");
        if(!userSeesion && to.name === 'login'){
            next();
        }
        if(!userSeesion && to.name !== 'login'){
            next({name: 'login'});
        }
    }else{
        next();
    }
})

export default router