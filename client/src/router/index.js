
import { createRouter, createWebHistory } from 'vue-router';
import { aesDecrypt} from "@/utils/utils";
import home from '../components/home.vue';
import {ElMessage} from "element-plus";
const userMenu = [
    { path: '/user/info', title: "我的信息", icon: IconEpHouse, submenu: [{ path: '/user/userinfo', title: '我的信息', icon: IconEpDocument }, { path: '/user/userchangeinfo', title: '修改个人信息', icon: IconEpEdit }], },
    { path: '/user/form', title: "运单信息", icon: IconEpTickets, submenu: [{ path: '/user/userformlist', title: '我的运单', icon: IconEpFiles }, { path: '/user/usersearchform', title: '查询运单', icon: IconEpSearch }] },
    { path: '/user/product', title: '商品数据', icon: IconEpBox, submenu: [{ path: '/user/userallproducts', title: '当前在库商品', icon: IconEpBox },{ path: '/user/usersearchproduct', title: '查询商品', icon: IconEpSearch }]}
];
const transitMenu = [
    { path: '/transit/info', title: "我的信息", icon: IconEpHouse, submenu: [{ path: '/transit/transitinfo', title: '我的信息', icon: IconEpDocument }, { path: '/transit/transitchangeinfo', title: '修改个人信息', icon: IconEpEdit }] },
    { path: '/transit/form', title: "运单中心", icon: IconEpTickets, submenu: [{ path: '/transit/transitformList', title: '我创建的运单', icon: IconEpFiles }, { path: '/transit/transitattendformList', title: '我参与的运单', icon: IconEpFiles }, { path: '/transit/transitcreateform', title: '创建表单', icon: IconEpEdit }, { path: '/transit/transitsearchform', title: '搜索表单', icon: IconEpSearch }, { path: '/transit/transitupdateform', title: '更新表单', icon: IconEpEditPen }, { path: '/transit/transitchangeformstatus', title: '更新状态', icon: IconEpEdit }] },
    { path: '/transit/goods', title: '商品数据', icon: IconEpGoods, submenu: [{ path: '/transit/transitallproducts', title: '当前在库商品', icon: IconEpBox }, { path: '/transit/transitsearchproduct', title: '查询商品', icon: IconEpSearch }] },
];
const adminMenu = [
    { path: '/admin/info', title: "我的信息", icon: IconEpHouse, submenu: [{ path: '/admin/admininfo', title: '我的信息', icon: IconEpDocument }, ] },
    { path: '/admin/form', title: "运单中心", icon: IconEpTickets, submenu: [{ path: '/admin/adminallformList', title: '库内运单', icon: IconEpFiles },{path: '/admin/admincreateform', title: '创建表单', icon: IconEpEdit },{path: '/admin/adminsearchform', title: '搜索表单', icon: IconEpSearch }]},
    { path: '/admin/goods',title: '商品数据', icon: IconEpGoods, submenu:[{ path: '/admin/adminallproducts', title: '当前在库商品', icon: IconEpBox },{ path: '/admin/admincreateproduct', title: '商品入库', icon: IconEpEditPen },{ path: '/admin/adminsearchproduct', title: '查询商品', icon: IconEpSearch }]},
    {path:'/admin/adminmanage',title:'用户管理',icon:IconEpManagement,submenu:[]}
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
            path:'/adminlogin',
            name:'adminLogin',
            component:()=>import('../components/content/admin/adminLogin.vue')
        },
        {
            path: '/user',
            name: 'user',
            meta: { needLogin: true, menu: userMenu, role: 'user' },
            redirect: "/user/userinfo",
            component: () => import('../components/content/index.vue'),
            children: [
                {
                    path: 'userinfo',
                    name: 'userInfo',
                    component: () => import('../components/content/user/userInfo.vue'),

                },
                {
                    path: 'userchangeinfo',
                    name: 'userChangeInfo',
                    component: () => import('../components/content/user/userChangeInfo.vue'),
                },
                {
                    path: 'userformlist',
                    name: 'userFormList',
                    component: () => import('../components/content/user/userFormList.vue'),
                },
                {
                    path: 'usersearchform',
                    name: 'userSearchForm',
                    component: () => import('../components/content/user/userSearchForm.vue'),
                },
                {
                    path: 'usersearchproduct',
                    name: 'userSearchProduct',
                    component: () => import('../components/content/user/userSearchProduct.vue'),
                },
                {
                    path: 'userallproducts',
                    name: 'userAllProducts',
                    component: () => import('../components/content/user/userAllProducts.vue'),
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
                    path: 'transitinfo',
                    name: 'transitInfo',
                    component: () => import('../components/content/transit/transitInfo.vue'),
                },
                {
                    path: 'transitchangeinfo',
                    name: 'transitChangeInfo',
                    component: () => import('../components/content/transit/transitChangeInfo.vue')
                },
                {
                    path: 'transitformlist',
                    name: 'transitFormList',
                    component: () => import('../components/content/transit/transitFormList.vue')
                },
                {
                    path: 'transitattendformlist',
                    name: 'transitAttendFormList',
                    component: ()=>import('../components/content/transit/transitAttendFormList.vue')
                },
                {
                    path: 'transitcreateform',
                    name: 'transitCreateForm',
                    component: () => import('../components/content/transit/transitCreateForm.vue'),
                },
                {
                    path: 'transitsearchform',
                    name: 'transitSearchForm',
                    component: () => import('../components/content/transit/transitSearchForm.vue'),
                },
                {
                    path: 'transitupdateform',
                    name: 'transitUpdateForm',
                    component: () => import('../components/content/transit/transitUpdateForm.vue'),
                },
                {
                    path: 'transitsearchproduct',
                    name: 'transitSearchProduct',
                    component: () => import('../components/content/transit/transitSearchProduct.vue'),
                },
                {
                    path: 'transitallproducts',
                    name: 'transitAllProducts',
                    component: () => import('../components/content/transit/transitAllProducts.vue'),
                },
                {
                    path: 'transitchangeformstatus',
                    name: 'transitChangeFormStatus',
                    component: () => import('../components/content/transit/transitChangeFormStatus.vue'),
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            meta: { needLogin: true, menu: adminMenu, role: 'admin' },
            component: () => import('../components/content/index.vue'),
            children: [
                {
                    path: 'admininfo',
                    name: 'adminInfo',
                    component: () => import('../components/content/admin/adminInfo.vue'),
                },
                {
                    path: 'adminallformlist',
                    name: 'adminAllFormList',
                    component: ()=>import('../components/content/admin/adminAllFormList.vue')
                },
                {
                    path: 'admincreateform',
                    name: 'adminCreateForm',
                    component: () => import('../components/content/admin/adminCreateForm.vue'),
                },
                {
                    path: 'adminsearchform',
                    name: 'adminSearchForm',
                    component: () => import('../components/content/admin/adminSearchForm.vue'),
                },
                {
                    path: 'adminsearchproduct',
                    name: 'adminSearchProduct',
                    component: () => import('../components/content/admin/adminSearchProduct.vue'),
                },
                {
                    path: 'adminallproducts',
                    name: 'adminAllProducts',
                    component: () => import('../components/content/admin/adminAllProducts.vue'),
                },
                {
                    path: 'adminchangeformstatus',
                    name: 'adminChangeFormStatus',
                    component: () => import('../components/content/admin/adminChangeFormStatus.vue'),
                },
                {
                    path: 'admincreateproduct',
                    name: 'adminCreateProduct',
                    component: () => import('../components/content/admin/adminCreateProduct.vue'),
                },
                {
                    path: 'adminmanage',
                    name: 'adminManage',
                    component: () => import('../components/content/admin/adminManage.vue'),
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