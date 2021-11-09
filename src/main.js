import { createApp } from 'vue'
import App from './App.vue'
import home from '@/components/HomeSY.vue'
import Element from 'element-plus';
import router from './router/index'
/* 2、导入axios */
import axios from '@/axios/index.js'
import store from '@/store/index.js'


import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'http://localhost:8166/';
//ElementUI改中文
import locale from "element-plus/lib/locale/lang/zh-cn"
import 'element-plus/theme-chalk/index.css'


//给路由对象添加导航卫士
router.beforeEach((to,from,next)=>{
    console.log("to去哪里",to)
    console.log("from来自哪里",from)
    // console.log("next",next)
	
	let route=store.state.routes;
	

	
	
    if(to.name=="login"){//去登录页面，放行
        next();
        return;
    }
	
	
	if(to.fullPath=='/'){
		
		//检查状态管理器中的对象值
		let name = store.state.user.name
		if(!name || name=="未登录"){			
		    next("/login");
		}else{
		    // initMenu(router,store);
		    next();
		}
		
	}
	
	
	if(route!=null){
		let luyou=0;
		route.forEach(v=>{
			if(v.url===to.fullPath){
				console.log("匹配成功")
				luyou=1
			}
		})
		
		if(luyou==1){
			next();
		}else{
			console.log("权限不足回到首页")
			 next("/login");
		}
		
	}
	
	console.log("可以去的路由对象",route)
	
	
	
	
   
	
	
	
})


createApp(App).
use(Element,{locale}).
use(router).
use(VueAxios,axios).use(store)
.mount('#app')
