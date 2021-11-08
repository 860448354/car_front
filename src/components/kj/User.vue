<template>
	<p>
		 <el-button type="primary" round  @click="dialogVisible = true">添加用户</el-button>
		 
		 <el-dialog
		   title="新增用户"
		   v-model="dialogVisible"
		   width="30%"
		   :before-close="handleClose"
		 >
		 
		  <div class="add">
			  <el-form ref="form" :model="form" label-width="80px">
				  
				
				<el-form-item label="部门岗位">
						  <el-cascader
						      v-model="form.dpid"
						      :options="options"
						      :props="props"
						      @change="handleChange">
						  		  
						  </el-cascader>
				</el-form-item>
				  
				  	  
				  <el-form-item label="用户名">
					  
					  <el-input v-model="form.user"></el-input>
					  
				  </el-form-item>
				  <el-form-item label="密码">
				  	
				  					  <el-input  v-model="form.pwd"></el-input>
				  					  
				  </el-form-item>
				
				  <el-form-item label="姓名">
				  					  
				  					  <el-input v-model="form.sfName"></el-input>
				  					  
				  </el-form-item>
				  <el-form-item label="电话">
				  					  
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
		       <el-button type="primary"  @click="onsubmit">确 定</el-button>
		     </span>
		   </template>
		 </el-dialog>
		 
	</p>
	
	<div>
		<el-table :data="tableData" style="width: 100%">
			
		   <el-table-column prop="sfName" label="姓名" width="180"> </el-table-column>
		   <el-table-column prop="" label="用户名" width="180"> 
				
				<template #default="scope">
					<span v-if="scope.row.myuser!=null">
						{{scope.row.myuser.uAccount}}
					</span>
				</template>
				
				</el-table-column>
		   
				
				<el-table-column prop="address" label="部门">
				 <template #default="scope" >
					 <span v-if="scope.row.mydept !=null">
						 {{scope.row.mydept.dtName}}
					 </span>
				 </template>
				</el-table-column>
				
				<el-table-column prop="address" label="职位">
				 <template #default="scope" >
					 <span v-if="scope.row.mypost !=null">
						 {{scope.row.mypost.ptName}}
					 </span>
				 </template>
				</el-table-column>
				
				
				  <el-table-column  label="性别">
					 <template #defalut="scope">
						  <span v-if="scope.row.sex !=null">
							  {{scope.row.sex}}
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
						<el-button>修改</el-button>
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
				  pwd:'123456'
			  },
			  dialogVisible:false,
	        tableData: [],
	      }
	    },
		methods:{
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
							console.log("对象0",v)
							
							let sex=v.sfCard.charAt(16)
							v.sfState=v.sfState==1?true:false;
							
							if(sex%2==0){
								v.sex='女'
							}else{
								v.sex='男'
							}
							
							
						})
						
						console.log("jjjj",res.data.data)
						
						this.tableData=res.data.data
					}
				})
			},
			handleChange(value) {
			       console.log("岗位选择",value);
								this.form.sfPtid=value[1];
								this.form.sfDpid=value[0];
								 console.log("部门选择",this.form.sfDpid);
								  console.log("岗位选择",this.form.sfPtid);
			     },
				 onsubmit(){
					console.log("提交",this.form)
					 this.dialogVisible = false
					 
					 this.axios.post("http://localhost:8166/staff/add",this.form).then(res=>{
						 console.log("成功",res)
						 if(res.data.code==1){
							 this.getStaff()
						 }
						 
					 })
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
