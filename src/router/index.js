
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
				path: '/customerCurrent',
				component: () => import('../components/csp/CustomerCurrent.vue'),
				name: '客户往来账',
				meta: {
					title: "客户往来账"
				}
			},
			{
				path: '/vendorAccount',
				component: () => import('../components/csp/VendorAccount.vue'),
				name: '供货商结算',
				meta: {
					title: "供货商结算"
				}
			},
			{
				path: '/vendorCurrent',
				component: () => import('../components/csp/VendorCurrent.vue'),
				name: '供货商往来账',
				meta: {
					title: "供货商往来账"
				}
			},
			{
				path: '/dailyAccount',
				component: () => import('../components/csp/DailyAccount.vue'),
				name: '日结账单',
				meta: {
					title: "日结账单"
				}
			},
			{
				path: '/member',
				component: () => import('@/components/dai/Membermanagement.vue'),
				name: '会员管理',
				meta: {
					title: "会员管理"
				}
			},
			{
				path: '/care',
				component: () => import('@/components/dai/Customercare.vue'),
				name: '客户关怀',
				meta: {
					title: "客户关怀"
				}
			},
			{
				path: '/plaint',
				component: () => import('@/components/dai/Customercomplaint.vue'),
				name: '客户投诉',
				meta: {
					title: "客户投诉"
				}
			},
			{
				path: '/activity',
				component: () => import('@/components/dai/Memberactivity.vue'),
				name: '活动管理',
				meta: {
					title: "活动管理"
				}
			},
			{
				path: '/agement',
				component: () => import('@/components/dai/Customermanagement.vue'),
				name: '客户管理',
				meta: {
					title: "客户管理"
				}
			},
			{
				path: '/dispatching',
				component: () => import('@/components/czh/MaintenanceDispatching.vue'),
				name: '维修派工',
				meta: {
					title: "维修派工"
				}
			},{
				path: '/jurisdiction',
				component: () => import('@/components/kj/jurisdiction.vue'),
				name: '权限设置',
				meta: {
					title: "权限设置"
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
