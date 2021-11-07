<template>
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">账号密码登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model.trim="loginForm.account"
                auto-complete="off" placeholder="账号">
        <i slot="prefix" class="el-input__icon el-icon-user"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码">
        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
      </el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;" @click="submitClick">登  录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {ElMessage} from 'element-plus'


//全局导入
const modules = import.meta.glob('../**/**.vue')

export default{
  data(){
    return {
      rules: {
        account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min:6,max:18,message:'密码长度在6-18之间',trigger:'blur'}
        ]
      },
      checked: true,
      loginForm: {
        account: 'admin',
        password: '123456'
      },
     
    }
  },
  methods: {
    /* 登录请求 */
    submitClick: function () {
      let user = undefined;
      let formatRoutes = [];
      let $this = this;
      // let data = qs.stringify(this.loginForm);
      //比对账号
      // this.ownerUser.forEach(u=>{
      //   if(u.account==this.loginForm.account &&
      //       u.password == this.loginForm.password){
      //     user = u;
      //   }
      // })
      console.log("进入submitClick方法")
	  
      this.axios.get("http://localhost:8166/user/login",{
		  params:{
			  use:this.loginForm.account,
			  pwd:this.loginForm.password,
		  }
	  })
          .then(res=>{
            console.log("后端返回的值",res)
			
			
            user = res.data.obj
            // console.log("routes",res.data)
            // formatRoutes = this.formatRoutes(res.data)
            console.log("user",JSON.stringify(user))
            console.log("routes",formatRoutes)
            if(user){
              // //调用状态管理器的同步方法，修改状态变量的值
              this.$store.commit("login",user);
			  this.$router.replace("/")
			  
			  // this.axios.get("http://localhost:8088/emp/id",{
				 //  params:{
					//   id:user.empid
				 //  }
			  // }).then(res=>{
				 //  console.log("登录后后台数据",res)
				 //   this.$store.state.juese=res.obj;
				 //   this.$store.state.empid=res.obj.empid;
				  
				   
				    
			  // })
			  
        

            }else{
              ElMessage.error({
                message:"密码或者账号错误，请重新尝试"
              })
            }
          })
          .catch(error=>{
            console.log(error)
          })

    },
	
    formatRoutes:function (routes) {
      let fmRoutes = [];
      routes.forEach(router=> {
        let {
          url,
          path,
          component,
          name,
          meta,
          iconCls,
          children
        } = router;
        if (children && children instanceof Array) {
          children = formatRoutes(children);
        }



        let fmRouter = {
          path: path,
          // component(resolve){
          // component:import('@/components/DynamicRouterTest/' + component + '.vue'),
          // component:()=>import('@/components/DynamicRouterTest/' + component + '.vue'),
          // component:()=>import('@/components/DynamicRouterTest/' + component + '.vue'),
          // component:()=>import(url),
          //component: ()=>import(`@/components/DynamicRouterTest/${component}.vue`),
          component:modules[`../components/DynamicRouterTest/${component}.vue`],
          name: name,
          iconCls: iconCls,
          meta: meta,
          children: children
        };

        fmRoutes.push(fmRouter);
      });
      console.log("DynamicRouter",fmRoutes)
      return fmRoutes;
    }
  },
  mounted() {

  }
}
</script>

<style scoped="scoped">
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  position: absolute;
  width: 350px;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_remember {
  margin: 0 0 35px 0;
  text-align: left;
}

.el-button--primary{
  background: linear-gradient(45deg,pink 20%,dodgerblue 100%);
  border: none;
}
.el-button--primary:hover{
  background: linear-gradient(135deg,dodgerblue 20%,pink 100%);
  border: none;
}
</style>
