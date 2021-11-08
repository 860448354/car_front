/* 导入vuex的相关函数 */
import {createStore} from 'vuex'

/* 创建store对象 */
let store = createStore({
	/* 状态管理 */
	state:{
		user:{
			name:"未登录"
		},
		message:[],
		index:0,
		empid:1,
		tags:[],		
		routes:[],
		juese:{},
		tags:[],
		routes:[],
		aa:'',

	},
	/* 同步函数：修改状态中的变量 */
	mutations:{
		/* 同步函数的默认参数是state */
		initMenu(state, menus){
			//将获取的菜单信息，装载到routes对象中
			state.routes = menus;
		},
		login(state,user){
			//参数user和state.user中存在相同的key--name
			 // state.user = {...user};
			if(user.uAccount!=null){
				console.log("拿到属于22",user)
				state.user.name='登录'
				state.empid=user.uId
				console.log("拿到属于33",state.empid)
				state.message={...user}
			}
			window.localStorage.setItem('user',JSON.stringify(user))
		},
		loginOut(state){
			window.localStorage.removeItem('user');
			state.routes = [];
		},

	},
	/* 异步函数 */
	actions:{
		
	},
	/*getter选择器：对state的状态变量做筛选和处理 
	  getter选择器的方法必须包含默认参数，state，表示当前状态对象
	  该参数必须放在函数的第一位
	*/
	getters:{
	
	}
})
/* 导出 */
export default store