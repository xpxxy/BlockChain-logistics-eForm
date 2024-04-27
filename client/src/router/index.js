
import { createRouter, createWebHistory } from 'vue-router';

import home from '../components/home.vue';

const userMenu = [
    { path: '/user/info', title: "我的信息", icon: IconEpHouse, submenu: [{ path: '/user/info', title: '我的信息', icon: IconEpDocument }, { path: '/user/changeinfo', title: '修改个人信息', icon: IconEpEdit}], },
    { path: '/user/form', title: "运单信息", icon:IconEpTickets, submenu: [{ path: '/user/formlist', title: '我的运单', icon:IconEpFiles }, { path: '/user/searchform', title: '查询运单', icon:IconEpSearch }] },
    { path: '/user/searchProduct', title: '商品查询', icon: IconEpSearch, submenu: [] }
];
const transitMenu = [
    { path: '/transit/info', title: "我的信息", icon: IconEpHouse, submenu: [], },
];
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
            meta: { needLogin: true, menu:userMenu},
            redirect:"/user/info",
            component: () => import('../components/content/index.vue'),
            children: [
                {
                    path: 'info',
                    name: 'userInfo',
                    component: ()=> import('../components/content/user/userInfo.vue'),
                    
                },
                {
                    path: 'changeinfo',
                    name: 'changeinfo',
                    component: ()=> import('../components/content/user/changeInfo.vue'),
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
                },
                {
                    path: 'searchProduct',
                    name: 'searchProduct',
                    component: ()=> import('../components/content/user/searchProduct.vue'),
                }
            ]
        },
        {
            path:'/transit',
            name:'transit',
            meta:{needLogin:true, menu:transitMenu},
            component: ()=> import('../components/content/index.vue'),
            children:[
                {
                    path: 'info',
                    name: 'transitInfo',
                    component: ()=>import('../components/content/transit/transitInfo.vue'),
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