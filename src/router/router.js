import VueRouter from 'vue-router'//路由
import Vue from 'vue'
Vue.use(VueRouter)
const routes=[
    {
        path:'/',
        component:()=>import('@/views/system/login/login'),

    },
    {
        path:'/login',
        component:()=>import('@/views/system/login/login'),

    },
    {
        path: "/menu",
        name:"menu",
        redirect: "/menu/monitor",
        component:()=>import('@/views/system/menu/menu'),
        children: [
            {
                path:'monitor',
                component: ()=>import('@/views/system/monitor/monitor'),
                meta: {
                    requireAuth: true
                },
            },

        ]
    }
]
const router=new VueRouter({
    routes,
    mode: 'history',//不用加#,
});
//登录拦截
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth){
        if (sessionStorage.getItem("token")!=null&&sessionStorage.getItem("token")!==""){
            next();
        }else {
            next('/login');
        }
    }else {
        next();
    }
});
export default router
