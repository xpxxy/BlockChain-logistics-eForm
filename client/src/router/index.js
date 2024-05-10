
import { createRouter, createWebHistory } from 'vue-router';
import { aesDecrypt} from "@/utils/utils";
import home from '../components/home.vue';
import {ElMessage} from "element-plus";
const userMenu = [
    { path: '/user/info', title: "我的信息", icon: IconEpHouse, submenu: [{ path: '/user/info', title: '我的信息', icon: IconEpDocument }, { path: '/user/changeinfo', title: '修改个人信息', icon: IconEpEdit }], },
    { path: '/user/form', title: "运单信息", icon: IconEpTickets, submenu: [{ path: '/user/formlist', title: '我的运单', icon: IconEpFiles }, { path: '/user/searchform', title: '查询运单', icon: IconEpSearch }] },
    { path: '/user/product', title: '商品数据', icon: IconEpBox, submenu: [{ path: '/user/allproducts', title: '当前在库商品', icon: IconEpBox },{ path: '/user/searchproduct', title: '查询运单', icon: IconEpSearch }]}
];
const transitMenu = [
    { path: '/transit/info', title: "我的信息", icon: IconEpHouse, submenu: [{ path: '/transit/info', title: '我的信息', icon: IconEpDocument }, { path: '/transit/changeinfo', title: '修改个人信息', icon: IconEpEdit }] },
    { path: '/transit/form', title: "运单中心", icon: IconEpTickets, submenu: [{ path: '/transit/formList', title: '我创建的运单', icon: IconEpFiles }, {path: '/transit/attendformList', title: '我参与的运单', icon: IconEpFiles}, {path: '/transit/createform', title: '创建表单', icon: IconEpEdit },{path: '/transit/searchform', title: '搜索表单', icon: IconEpSearch },{path: '/transit/updateform', title: '更新表单', icon: IconEpEditPen }]}
];
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../components/LR/login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../components/LR/register.vue')
        },
        {
            path: '/user',
            name: 'user',
            meta: { needLogin: true, menu: userMenu, role: 'user' },
            redirect: "/user/info",
            component: () => import('../components/content/index.vue'),
            children: [
                {
                    path: 'info',
                    name: 'userInfo',
                    component: () => import('../components/content/user/userInfo.vue'),

                },
                {
                    path: 'changeinfo',
                    name: 'changeinfo',
                    component: () => import('../components/content/user/changeInfo.vue'),
                },
                {
                    path: 'formlist',
                    name: 'formlist',
                    component: () => import('../components/content/user/formList.vue'),
                },
                {
                    path: 'searchform',
                    name: 'searchform',
                    component: () => import('../components/content/user/searchForm.vue'),
                },
                {
                    path: 'searchproduct',
                    name: 'searchProduct',
                    component: () => import('../components/content/user/searchProduct.vue'),
                },
                {
                    path: 'allproducts',
                    name: 'allProducts',
                    component: () => import('../components/content/user/allproducts.vue'),
                }
            ]
        },
        {
            path: '/transit',
            name: 'transit',
            meta: { needLogin: true, menu: transitMenu, role: 'transit' },
            component: () => import('../components/content/index.vue'),
            children: [
                {
                    path: 'info',
                    name: 'transitInfo',
                    component: () => import('../components/content/transit/TransitInfo.vue'),
                },
                {
                    path: 'changeinfo',
                    name: 'changeinfo',
                    component: () => import('../components/content/transit/TransitChangeinfo.vue')
                },
                {
                    path: 'formlist',
                    name: 'transitFormList',
                    component: () => import('../components/content/transit/TransitFormList.vue')
                },
                {
                    path: 'attendformlist',
                    name: 'attendFormList',
                    component: ()=>import('../components/content/transit/AttendTransitFormList.vue')
                },
                {
                    path: 'createform',
                    name: 'createForm',
                    component: () => import('../components/content/transit/createForm.vue'),
                },
                {
                    path: 'searchform',
                    name: 'searchForm',
                    component: () => import('../components/content/transit/searchForm.vue'),
                },
                {
                    path: 'updateform',
                    name: 'updateForm',
                    component: () => import('../components/content/transit/updateForm.vue'),
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    let userSession = localStorage.getItem("userSession");
    let info = '';
    if(userSession){
        info = JSON.parse(
            aesDecrypt(localStorage.getItem("userSession"), "xpxxy")
        );
    }
    if (to.matched.some(item => item.meta.needLogin)) {
        if(!userSession){
            ElMessage.info("请先登录！");
            next({path: '/login'});

        }
        if(userSession && info.role && info.role !== to.meta.role){
            console.log(info.role, to.meta.role);
            // alert("你当前无权访问")
            // console.log(from.path);
            ElMessage.info("你当前无权访问其他组别的页面")
            next({path: '/login'});
            return
        }
    }
    next()
})

export default router