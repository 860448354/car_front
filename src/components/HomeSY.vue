<template>
	<el-container>
	   <el-header>欢迎

	   <el-dropdown style="float: right;margin-top: 20px;">
	       <span class="tc">
	         设置<i class="el-icon-arrow-down el-icon--right"></i>
	       </span>
	       <template #dropdown>
	         <el-dropdown-menu>
	           <el-dropdown-item>修改</el-dropdown-item>
	           <el-dropdown-item @click="quit" >退出</el-dropdown-item>


	         </el-dropdown-menu>
	       </template>
	     </el-dropdown>
	   </el-header>

				  <!-- 视图区 -->

		<el-container>
			<!-- 菜单区 -->
			<el-aside width="200px" >
				
				 <el-menu
				      default-active="1"
					  :unique-opened="true"
				      class="el-menu-vertical-demo">
					  
					  
           <router-link to="/lunbo">
				      <el-menu-item index="100">
				      		<i class="el-icon-location"></i>
				      		<span slot="title">
				      			首页
				      		</span>
				      </el-menu-item>
           </router-link>
		   
				<template v-for="(v,i) in templates">
					
					<el-sub-menu :index="i" >
						
					        <template #title>
					  <i class="el-icon-s-shop"></i>
					  <span>{{v.jname}}</span>
							</template>
							
							<template v-if="v.myJurisdiction!=null">
								<router-link v-for="(value,index) in v.myJurisdiction" :to="value.url">
								  <el-menu-item :index="i+'-'+index">
								     <span class="tit"></span> {{value.jname}}
								  </el-menu-item>
								</router-link>
							</template>
							
					
					
					
					
					      </el-sub-menu>
					
				</template>
		   
	<!-- 	   <el-sub-menu index="101">
			   <template #title>
			     <i class="el-icon-s-shop"></i>
			     <span>测试赛所所所所所所</span>
			   </template>
		   </el-sub-menu>
		   
		   
				      <el-sub-menu index="2">
				        <template #title>
                  <i class="el-icon-s-shop"></i>
                  <span>采购</span>
                </template>
                <router-link to="/purchase">
                  <el-menu-item index="2-1">
                    采购进货
                  </el-menu-item>
                </router-link>
                <router-link to="/putstore">
                  <el-menu-item index="2-2">
                    采购入库
                  </el-menu-item>
                </router-link>
				      </el-sub-menu>
					  
           <el-sub-menu index="3">
                        <template #title>
                          <el-icon><icon-menu /></el-icon>维修管理
                        </template>
                        <el-menu-item-group>
                          <router-link to="/customer">
                            <el-menu-item index="3-1">客户接待</el-menu-item>
                          </router-link>
                          <router-link to="/dispatching">
                            <el-menu-item index="3-2">维修派工</el-menu-item>
                          </router-link>
           			   <router-link to="/dispatchingrecord">
           			     <el-menu-item index="3-3">派工列表</el-menu-item>
           			   </router-link>
					   <router-link to="/confirm">
					     <el-menu-item index="3-4">确认完工</el-menu-item>
					   </router-link>
					   <router-link to="/prcking">
					     <el-menu-item index="3-5">材料详情</el-menu-item>
					   </router-link>
                        </el-menu-item-group>
                      </el-sub-menu>
					  
           <el-sub-menu index="4">
             <template #title>
               <i class="el-icon-location"></i>
               财务
             </template>
             <el-menu-item-group>
               <router-link to="/customerAccount">
                 <el-menu-item index="4-1">客户结算</el-menu-item>
               </router-link>
			   <router-link to="/customerCurrent">
			     <el-menu-item index="4-2">客户往来账</el-menu-item>
			   </router-link>
			   <router-link to="/vendorAccount">
                 <el-menu-item index="4-3">供货商结算</el-menu-item>
               </router-link>
               <router-link to="/vendorCurrent">
                 <el-menu-item index="4-4">供货商往来账</el-menu-item>
               </router-link>
               <router-link to="/dailyAccount">
                 <el-menu-item index="4-5">日结账单</el-menu-item>
               </router-link>
             </el-menu-item-group>
           </el-sub-menu>
		   
           <el-sub-menu index="5">
             <template #title>
               <i class="el-icon-location"></i>
               客户管理
             </template>
             <el-menu-item-group>
               <router-link to="/member">
                 <el-menu-item index="5-1">会员管理</el-menu-item>
               </router-link>
               <router-link to="/plaint">
                 <el-menu-item index="5-2">客户投诉</el-menu-item>
               </router-link>
               <router-link to="/agement">
                 <el-menu-item index="5-3">客户管理</el-menu-item>
               </router-link>
               <router-link to="/care">
                 <el-menu-item index="5-4">客户关怀</el-menu-item>
               </router-link>
			   <router-link to="/activity">
			     <el-menu-item index="5-5">会员活动</el-menu-item>
			   </router-link>
             </el-menu-item-group>
           </el-sub-menu>
		   
           <el-sub-menu index="6">
             <template #title>
               <i class="el-icon-location"></i>
               权限
             </template>
             <el-menu-item-group>
               <router-link to="user">
                 <el-menu-item index="6-1">操作员设置</el-menu-item>
               </router-link>
               <router-link to="jurisdiction">
                 <el-menu-item index="6-2">操作权限设置</el-menu-item>
               </router-link>
             </el-menu-item-group>
           </el-sub-menu>
		   
           <el-sub-menu index="7">
             <template #title>
               <i class="el-icon-location"></i>
               库存管理
             </template>
             <el-menu-item-group>
               <router-link to="/repe">
                 <el-menu-item index="7-1">库存</el-menu-item>
               </router-link>
               <router-link to="/putstolog">
                 <el-menu-item index="7-2">入库记录</el-menu-item>
               </router-link>
             </el-menu-item-group>
           </el-sub-menu> -->
		   
		   
		   
		   
				    </el-menu>
					
					
					
			</el-aside>

			<el-container>
				<!-- 视图区 -->
				<el-main>
					<p v-if="tags.length==0?false:true" class="kjl">
						<el-tag v-for="tag in tags" :key="tag.name" closable
							:type="tag.type">
							{{tag.name}}
						</el-tag>
					</p>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
	
	import qs from 'qs'
	export default {
		data() {
			return {
				tags: [],
				aa:'',
				templates:[],
			}
		},
		methods: {
			quit(){
				this.$store.state.user.name='未登录'
				this.$router.replace("/login")
				// this.$router.replace("/")
			},
			ce(){
				console.log("存入员工",this.$store.state)
				console.log("存入员工222",this.$store.state.message)
				this.axios.get("http://localhost:8166/role/sfid",{
					params:{
						sfid:this.$store.state.message.myStaff.sfId
					}
				}).then(res=>{
					console.log("存数据",res)
					if(res.data.code==1){
						let rids=[]
						res.data.data.forEach(v=>{
							rids.push(v.rid)
						})
						
						console.log("实际数组",rids)
						
						
						
						this.axios.post("http://localhost:8166/juris/rids",rids).then(res2=>{
							console.log("权限数组",res2)
							if(res2.data.code==1){
								this.templates=res2.data.data
								
								
								this.axios.post("http://localhost:8166/juris/rides",rids).then(res3=>{
									console.log("路由数组",res3)
									
									if(res3.data.code==1){
										
										res3.data.data.push({url: "/lunbo"});
										
										this.$store.commit("initMenu",res3.data.data)
										
										console.log("存状态管理路由",res3.data.data)
									}
									
									
		
									
								})
								
								
							}
						})
					}
					
					
					
					
				})
			}
		},
		mounted() {
			this.ce();
		}
	}
</script>

<style scoped="scoped">
	* {
		padding: 0px;
		margin: 0px;
	}
	.el-tag{
		height: 40px;
		line-height: 40px;
	}
	html,
	body {
		height: 100%;
	}
	.kjl {
		height: 40px;
		background-color:white;
	}
	.el-header,
	.el-footer {
		background-color: #00aaff;
		color: white;
		text-align: center;
		line-height: 60px;
	}
	.el-aside {
		/* background-color: #00aaff; */
		color: white;
		/* text-align: center; */
		line-height: 200px;
	}
	.el-main {
		background-color: white;
		color: black;
		padding: 0px;
		overflow-x: hidden;/*关闭横向滚动条*/
		overflow-y: hidden;/*关闭竖向滚动条*/
		height: 100%;
	}
	body>.el-container {
		margin-bottom: 40px;
	}
	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}
	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
	a{
		text-decoration: none;
		color:black;
	}
	.el-tag[data-v-1fe69f35] {
	    height: 40px;
		width: 90px;
		text-align: center;
	    line-height: 40px;
		font-size: 13px;
	}
	.tit{
		margin-left: 30px;
		
	}
</style>
