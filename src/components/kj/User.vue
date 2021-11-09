<template>
	<p>
		 <el-button type="primary" round  @click="add">添加用户</el-button>
		 
		 <el-dialog
		   :title="titl"
		   v-model="dialogVisible"
		   width="30%"
		   :before-close="handleClose"
		 >
		 
		  <div class="add">
			  
			  <el-form ref="form" :model="form" label-width="80px" :rules="formregular">
				  
				
				<el-form-item label="部门岗位">
						  <el-cascader
						      v-model="dpos"
						      :options="options"
						      :props="props"
						      @change="handleChange">
						  		  
						  </el-cascader>
				</el-form-item>
				  
				  	  
				  <el-form-item v-if="usid==1" label="用户名">
					  
					  <el-input v-model="form.user"></el-input>
					  
				  </el-form-item>
				  <el-form-item v-if="pwdid==1" label="密码">
				  	
				  					  <el-input  v-model="form.pwd"></el-input>
				  					  
				  </el-form-item>
				
				  <el-form-item label="姓名">
				  					  
				  					  <el-input v-model="form.sfName"></el-input>
				  					  
				  </el-form-item>
				  <el-form-item label="电话" prop="sfPhone">
				  					  
				  					  <el-input v-model="form.sfPhone"></el-input>
				  					  
				  </el-form-item>
				  <el-form-item label="身份证">
				  					  
				  					  <el-input v-model="form.sfCard"></el-input>
				  					  
				  </el-form-item>
				  
				  
			  </el-form>
			  
		  </div>
		   
		   
		   
		   <template #footer>
		     <span class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary"  @click="onsubmit('form')">{{buton==1?'新增':'修改'}}</el-button>
		     </span>
		   </template>
		 </el-dialog>
		 
	</p>
	
	<div>
		<el-table :data="tableData" style="width: 100%"  >
			
		   <el-table-column prop="sfName" label="姓名" width="180"> </el-table-column>
		   <el-table-column prop="" label="用户名" width="180"> 
				
				<template #default="scope">
					<span v-if="scope.row.myuser!=null">
						{{scope.row.myuser.uAccount}}
					</span>
				</template>
				
				</el-table-column>
		   
				
				<el-table-column  label="部门">
				 <template #default="scope" >
					 <span v-if="scope.row.mydept !=null">
						 {{scope.row.mydept.dtName}}
					 </span>
				 </template>
				</el-table-column>
				
				<el-table-column  label="职位">
				 <template #default="scope" >
					 <span v-if="scope.row.mypost !=null">
						 {{scope.row.mypost.ptName}}
					 </span>
				 </template>
				</el-table-column>
				
				
				  <el-table-column  prop="sex" label="性别">
					 <template #defalut="scope">
						  <span v-if="scope.row.sex !=null">
							  {{scope.row}}
						  </span>
					  </template>
					  
				  </el-table-column>
				  
				  
				   <el-table-column prop="sfPhone" label="电话"> </el-table-column>
				   <el-table-column  label="状态"> 
				   
				   <template #default="scope">
					   <span>
					   	
					   	 <el-switch
						 
					   	    v-model="scope.row.sfState"
					   	    active-color="#13ce66"
					   	    inactive-color="#ff4949"
					   	    active-text="启动"
					   	    inactive-text="停用"
					   		@click="updatState(scope.row.sfId,scope.row.sfState)"
					   	  />
					   	
					   </span>
				   </template>
						
				   </el-table-column>
				    <el-table-column  label="操作">
						
						<template #default="scope">
							<el-button @click="xiu(scope.row)">修改</el-button>
						</template>
						
						</el-table-column>
		 </el-table>
	</div>
	
	
	
</template>

<script>
	import qs from 'qs'
	
	  export default {
	    data() {
	      return {
			  value2:'',
			  options:[],
			  form:{
				  sfName:'',
				  sfPhone:'',
				  sfCard:'',
				  sfDpid:'',
				  sfPtid:'',
				  user:'',
				  pwd:'123456',
				  sfId:'',
				  
			  },
			  dialogVisible:false,
	        tableData: [],
			dpos:'',
			titl:'新增用户',
			buton:1,
			usid:1,
			pwdid:1,
			formregular:{
				sfPhone:[
					{
						required:true,
						message:"请输入",
						trigger:"blur",
						},
						{
							pattern:/^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
							message:'请输入正确的格式',
							trigger:"blur",
						}
				],
				
			},
			
	      }
	    },
		methods:{
			add(){
				
				Object.keys(this.form).forEach(k=>this.form[k]='');
				this.buton=1
				this.dialogVisible = true
				this.usid=1
				this.pwdid=1
			},
			getDept(){//找下拉中列表方法
			console.log('submit!触发class');			
						this.axios.get("http://localhost:8166/dept/all").
						then(res=>{
							console.log("后台部门数据", res);								
								let arr=[];								
							if (res.data.code == 1) {							
							res.data.data.forEach(item=>{
								console.log("+++",item)								
								var dept={
									label:item.dtName,
									children:[],
									value:item.dtId
								}								
								if(item.mypost){
									// obj.children=.									
									item.mypost.forEach(item=>{
										console.log("---",item)
										let cc={
											label:item.ptName,
											value:item.ptId
										}
										dept.children.push(cc)
										
										
									})
									
									
								}
								arr.push(dept)
								
								
								
							})
						
							this.options=arr;
							
							}
						})
						
						
						
			},
			getStaff(){
				this.axios.get("http://localhost:8166/staff/all").then(res=>{
					console.log("拿到路由",res)
					if(res.data.code==1){
						
						res.data.data.forEach(v=>{
							console.log("对象1999",v)
							
							let sex=v.sfCard.charAt(15)
							console.log("性别",sex)
							v.sfState=v.sfState==1?true:false;
							
							if(sex%2==0){
								v.sex='女'
							}else{
								v.sex='男'
							}
							console.log("sex222",v.sex)
							
							
						})
						
						console.log("jjjj",res.data.data)
						
						this.tableData=res.data.data
					}
				})
			},
			handleChange(value) {
			       console.log("岗位选择",value);
				   console.log("岗位选择",this.dpos);
								this.form.sfPtid=value[1];
								this.form.sfDpid=value[0];
								 console.log("部门选择",this.form.sfDpid);
								  console.log("岗位选择",this.form.sfPtid);
			     },
				 onsubmit(duix){
					 
					 
					 
					 
					 this.$refs[duix].validate((valid)=>{
					 				 if (valid) {   // 如果校验通过，请求接口，允许提交表单
					 				             
					 							console.log("触发 成功++++++++++")
					 							 
												 if(this.buton==1){
												 						 console.log("提交",this.form)
												 						  this.dialogVisible = false
												 						  
												 						  this.axios.post("http://localhost:8166/staff/add",this.form).then(res=>{
												 						 	 console.log("成功",res)
												 						 	 if(res.data.code==1){
												 						 		 this.getStaff()
												 						 	 }
												 						 	 
												 						  })
												 }else{
												 						 console.log("修改",this.form)
												 						 this.titl="新增用户"
												 						 this.buton=1;
												 						 
												 						 this.axios.post("http://localhost:8166/staff/update",this.form).then(res=>{
												 							 console.log("拿到数据",res)
												 							 if(res.data.code==1){
												 								 
												 								 this.getStaff()
												 							 }
												 						 })
												 						 
												 						 
												 						  this.dialogVisible = false
												 }
												 
					 							 
					 							 
					 				           } else {   //校验不通过
					 						   console.log("触发 失败++++++++++")
					 						   
					 						   alert('请确定数据正确');
					 				             return false;
					 							 }
					 
					 });
					 
					 
					 
					 
					 
					 
					
				 },
				 
				 
				 
				 updatState(sfid,stateid){
					 
					 
					 
					 console.log("员工主键"+sfid);
					 console.log("员工状态"+stateid);
					 
					 let state=stateid==true?1:0;
					 console.log("员工状态zz"+state);
					 
					 let date={
						 stateid:state,
						 sid:sfid,
					 }
					 
					 let qsdate=qs.stringify(date)
					 
					 this.axios.put("http://localhost:8166/staff/upda",qsdate).then(res=>{
						 
					 })
					 
				 },
				 xiu(value){
					 
					 this.titl="修改用户"
					 this.buton=0;
					 this.usid=0
					 this.pwdid=0
					 
					 this.dialogVisible=true
					 console.log("修改",value)
					 this.form.sfId=value.sfId;
					 this.form.sfName=value.sfName
					 this.form.sfPhone=value.sfPhone
					 this.form.sfCard=value.sfCard
					 this.form.user=value.myuser.uAccount
					 this.form.sfDpid=value.mydept.dtId;
					 this.form.sfPtid=value.mypost.ptId
					 this.form.pwd=123456
					 this.dpos=[value.mydept.dtId,value.mypost.ptId]
					 
				 }
				 
				 
		},
		mounted() {
			this.getDept();
			this.getStaff();
			
		}
	  }
	
</script>

<style scoped="scoped">
	.add{
		
	}
	
</style>
