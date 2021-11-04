import {
    createRouter,
    createWebHistory
} from 'vue-router'

//定义组件，定义路由
const routes = [
    //定义一级
    {
        name:'Test',
        path:'/test',
        component:() => import('/src/components/test.vue'),
        meta:'测试'
    }
]

//创建Router路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})
//给路由实例定义一个对外引用（注入路由）
export default router

