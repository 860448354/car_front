
let routes=[
	{
		path:'/',
		component:()=>import("@/components/HomeSY.vue"),
		name:'HomeSY',
		meta:{
			title:"OAlunbo首页"
		},
		children:[
			{
				path:'/lunbo',
				component:()=>import("@/components/lunbo.vue"),
				name:'lunbo',
				meta:{
					title:"lunbo首页"
				},
			},
			{
				path:'/purchase',
				component:()=>import("../components/hyj/Purchase.vue"),
				name:'purchase',
				meta:"采购进货"
			},
			{
				path: '/customer',
				component: () => import('../components/czh/Customer.vue'),
				name: '客户接待',
				meta: {
					title: "客户接待"
				}
			},
			{
				path: '/user',
				component: () => import('../components/kj/User.vue'),
				name: '用户设置',
				meta: {
					title: "用户设置",
					},
					
			},
			{
				path: '/customerAccount',
				component: () => import('../components/csp/CustomerAccount.vue'),
				name: '客户结算',
				meta: {
					title: "客户结算"
				}
			},
			{
				path: '/member',
				component: () => import('@/components/dai/Membermanagement.vue'),
				name: '会员管理',
				meta: {
					title: "会员管理"
				}
			}
			
		],
	},
	{
		path:'/login',
		component:()=>import("@/components/Login.vue"),
		name:'login',
		meta:{
			title:"登录"
		}
	}
]

/* 导入路由中的相关模块 */
import {createRouter,createWebHistory} from 'vue-router'

/* 创建路由对象 */
let router = createRouter({
	history:createWebHistory(),
	routes
})

/* 导出路由对象 */
export default router
