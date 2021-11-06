import HomeSY from '@/components/HomeSY.vue'
import lunbo from '@/components/lunbo.vue'

let routes=[
	{
		path:'/',
		component:HomeSY,
		name:'HomeSY',
		meta:{
			title:"OAlunbo首页"
		},
		children:[
			{
				path:'/lunbo',
				component:lunbo,
				name:'lunbo',
				meta:{
					title:"lunbo首页"
				},
			},
			{
				path:'/purchase',
				component:()=>import("../components/hyj/purchase.vue"),
				name:'purchase',
				meta:"采购进货"
			}
		],
	}
]

/* 导入路由中的相关模块 */
import {createRouter,createWebHistory} from 'vue-router'
//import purchase from "../components/hyj/purchase";

/* 创建路由对象 */
let router = createRouter({
	history:createWebHistory(),
	routes
})

/* 导出路由对象 */
export default router
