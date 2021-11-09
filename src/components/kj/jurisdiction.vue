<template>

	<p>
		<el-button type="primary" round @click="dialogVisible = true">添加角色</el-button>
		
		
		<el-dialog
		  title="新增角色"
		  v-model="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <p>
			  <el-form v-model="form">
				  <el-form-item label="角色名称">
				  				  <el-input v-model="juesname"></el-input>
				  </el-form-item>
			  </el-form>
			
			  
		  </p>
		  
		  
		  <template #footer>
		    <span class="dialog-footer">
		      <el-button @click="dialogVisible = false">取 消</el-button>
		      <el-button type="primary"  @click="onsubmit">确 定</el-button>
		    </span>
		  </template>
		  </el-dialog >
			  
			  
			  <el-dialog
			    title="关联用户"
			    v-model="dialogVisible2"
			    width="30%"
			    :before-close="handleClose">
			    <p>
			  	  <el-form v-model="form">
			  		  <el-form-item label="用户名称">
			  		  		<el-select placeholder="请选择用户" v-model="useid">
								<el-option v-for=" v in options" :label="v.sfName" :value="v.sfId"></el-option>
							</el-select>
			  		  </el-form-item>
			  	  </el-form>
			  	
			  	  
			    </p>
			    
			    
			    <template #footer>
			      <span class="dialog-footer">
			        <el-button @click="dialogVisible2 = false">取 消</el-button>
			        <el-button type="primary"  @click="onsubmit2">确 定</el-button>
			      </span>
			    </template>
			    </el-dialog >
					
					
					<el-dialog
					  title="移除用户"
					  v-model="dialogVisible3"
					  width="30%"
					  :before-close="handleClose">
					  <p>
						  <el-form v-model="form">
							  <el-form-item label="用户名称">
							  		<el-select placeholder="请选择移除用户" v-model="useid">
													<el-option v-for=" v in options" :label="v.sfName" :value="v.sfId"></el-option>
												</el-select>
							  </el-form-item>
						  </el-form>
						
						  
					  </p>
					  
					  
					  <template #footer>
					    <span class="dialog-footer">
					      <el-button @click="dialogVisible2 = false">取 消</el-button>
					      <el-button type="primary"  @click="onsubmit2">确 定</el-button>
					    </span>
					  </template>
					  </el-dialog >
		
	</p>

	<div>
		<el-drawer custom-class="chou" v-model="drawer" :direction="direction" :before-close="handleClose"
			destroy-on-close size="40%">
			<template #title>
				{{rname}}
				权限
			</template>
			<p>
				<el-button type="primary" @click="authorization">授权</el-button>
			</p>
			
			
			
			
			
			
			<div class="yitou">
				<!-- <template v-for="(a,i) in cityOptions2"> -->
				
					<el-tree :data="data" 
					ref="tree"
					show-checkbox 
					node-key="jid" 
					:default-expanded-keys="[2, 3]"
					:default-checked-keys="roles" 
					:props="defaultProps">
					</el-tree>
				<!-- </template> -->
			</div>
		</el-drawer>

	</div>

	<div>

		<el-table :data="tableData" style="width: 100%">

			<el-table-column prop="rname" label="角色名" width="180"> </el-table-column>
			<el-table-column prop="" label="用户名" width="880">

				<template #default="scope">
					<span v-if="scope.row.myStaff!=null">
						<span v-for="sf in scope.row.myStaff">
							
							<el-button style="margin: 5px;" type="info" plain>{{sf.sfName}}</el-button>
							
						</span>
						
					</span>
				</template>

			</el-table-column>


			

			


	


			
			<el-table-column label="操作">

				<template #default="scope">
					<span>
						
						<el-dropdown trigger="click" v-if="scope.row.myStaff.length!=0 ">
						  <span class="el-dropdown-link">
							  <el-button type="danger" >移除用户</el-button>
						    <i class="el-icon-arrow-down el-icon--right"></i>
						  </span>
						  <template #dropdown>
						    <el-dropdown-menu >
								
						      <el-dropdown-item v-for="sf in scope.row.myStaff" @click="deleUser(scope.row.rid,sf.sfId,sf.sfName)">{{sf.sfName}}</el-dropdown-item>
						    
						    </el-dropdown-menu>
						  </template>
						</el-dropdown>
						
						
						<el-button type="success"  @click="setUser(scope.row.rid)">关联用户</el-button>
						<el-button type="primary" @click="setJurisdiction(scope.row.rid,scope.row.rname)" >权限设置</el-button>
						
						
						
					</span>
				</template>

			</el-table-column>
		</el-table>

	</div>

</template>

<script>
	import qs from 'qs'
	 import { defineComponent } from 'vue'
	  import { ElMessage } from 'element-plus'
	
	
	export default {
		data() {
			return {
				drawer: false,
				direction: 'rtl',
				checkAll: false,
				tableData:[],
				isIndeterminate: true,
				cityOptions2: [],
				data: [],
				defaultProps: {
					children: 'myJurisdiction',
					label: 'jname'
				},
				roles:[],
			dialogVisible:false,
			dialogVisible2:false,
			juesname:'',
			rname:'',
			useid:'',
			options:[],
			rid:'',


			}
		},
		methods: {
			  open1() {
			          ElMessage.success({
			            message: '恭喜你 授权成功',
			            type: 'success',
			          })
			        },
					open2() {
					        ElMessage.success({
					          message: '恭喜你 新增成功',
					          type: 'success',
					        })
					      },
			
			getStaff(){
				this.axios.get("http://localhost:8166/staff/all").then(res=>{
					console.log("拿到路由",res)
					if(res.data.code==1){			
						console.log("jjjj",res.data.data)						
						this.options=res.data.data
					}
				})
			},
			
			getJurisdiction() { //查所有权限

				this.axios.get("http://localhost:8166/juris/all").then(res => {
					console.log("权限数据", res)
					if (res.data.code == 1) {
						this.cityOptions2 = res.data.data
						this.data=res.data.data
						/* res.data.data.forEach((v, i) => {
							console.log("v", v)
							let acc = "arr" + i
							v.img = {
								acc: []
							}
						}) */

						console.log("数组", res.data.data)

					}
				})

			},

			handleClose(done) {
				this.$confirm('确认关闭？')
					.then((_) => {
						done()
						this.roles=[]
					})
					.catch((_) => {})
			},
			authorization(){
				console.log("进入授权")
				console.log("父节点",this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
				
				let fjie=this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
				console.log("角色id",this.rid)
				
				console.log(this.$refs.tree.getCheckedKeys(true), "+***********", this.roles)
				
				// let qsdate=qs.stringify({rid:this.rid,juris:12})
				
				this.axios.post("http://localhost:8166/rolejuris/add/"+this.rid,fjie).then(res=>{
					console.log("拿到权限",res)
					this.open1()
					this.drawer=false
				})
				
				
			},
			onsubmit(){
				
				console.log("增加角色")
				 let qsdate=qs.stringify({name:this.juesname})
				console.log("登录",qsdate)
				this.axios.post("http://localhost:8166/role/add",qsdate).then(res=>{
					console.log("角色数据",res)
					if(res.data.code==1){
						this.dialogVisible = false
						this.open2()
						this.getRole();
						
					}
				})
			},
			getRole(){
				
				this.axios.get("http://localhost:8166/role/all").then(res=>{
					console.log("角色结果",res)
					
					if(res.data.code==1){
						this.tableData=res.data.data
					}
					
					
				})
			},
			setJurisdiction(rid,rname){
				this.drawer=true
				console.log("进入",rid)
				console.log("手术室",rname)
				this.rid=rid
				this.rname=rname;
				
				this.axios.get("http://localhost:8166/juris/rid",{
					params:{
						rid:rid,
					}
				}).then(res=>{
					console.log("权限数据",res)
					if(res.data.code==1){
						let arr=[];
						res.data.data.forEach((v)=>{
							arr.push(v.jid)
						})
						this.roles=arr
						
					}
					
				})
				
			},
			setUser(rid){
				console.log("角色id",rid)
				this.dialogVisible2=true
				this.rid=rid
				this.useid=''
				
				
			},
			onsubmit2(){
				console.log("角色id",this.rid)
				this.dialogVisible2=false
				
				console.log("用户id",this.useid)
				let qsdate=qs.stringify({staffid:this.useid,roleid:this.rid})
				
				this.axios.post("http://localhost:8166/staffrole/add",qsdate).then(res=>{
					console.log("新增",res);
					if(res.data.code==1){
						this.getRole();
					}
				})
				
			},
			deleUser(rid,sfid,rname){
				console.log("移除",rid)
				console.log("移除用户",sfid)
				
				this.$confirm('确认移除  '+rname+'  用户？')
					.then((_) => {
						
						console.log("删除23333")
						
						let qsdate=qs.stringify({staffid:sfid,roleid:rid})
						
						this.axios.post("http://localhost:8166/staffrole/dele",qsdate).then(res=>{
							console.log("新增",res);
							if(res.data.code==1){
								this.getRole();
								
							}
						})
						
						done()
						
					})
					.catch((_) => {
						console.log("放弃")
					})
				
			},

		},
		mounted() {
			this.getJurisdiction();
			this.getRole();
			this.getStaff();
		}
	}
</script>

<style scoped="scoped">
	.chou {
		height: 100%;
	}


	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.box-card {
		width: 100%;
	}

	.yi {
		float: left;
		list-style: none;
		border: 1px solid black;

	}

	.yi li {
		width: 50px;
		height: 50px;
		float: left;
	}

	.yitou {
		border: 1px solid red;

	}

	dl dd {
		float: left;
	}
</style>
