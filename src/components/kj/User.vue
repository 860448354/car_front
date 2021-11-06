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
					  
					  <el-input v-model="form.name"></el-input>
					  
				  </el-form-item>
				  <el-form-item label="密码">
				  					  
				  					  <el-input placeholder="请输入密码" show-password v-model="form.name"></el-input>
				  					  
				  </el-form-item>
				  <el-form-item label="重复密码">
				  					  
				  					  <el-input placeholder="请输入密码" show-password v-model="form.name"></el-input>
				  					  
				  </el-form-item>
				  <el-form-item label="姓名">
				  					  
				  					  <el-input v-model="form.name"></el-input>
				  					  
				  </el-form-item>
				  <el-form-item label="电话">
				  					  
				  					  <el-input v-model="form.name"></el-input>
				  					  
				  </el-form-item>
				  <el-form-item label="身份证">
				  					  
				  					  <el-input v-model="form.name"></el-input>
				  					  
				  </el-form-item>
				  
				  
			  </el-form>
			  
		  </div>
		   
		   
		   
		   <template #footer>
		     <span class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		     </span>
		   </template>
		 </el-dialog>
		 
	</p>
	
	 <el-table :data="tableData" style="width: 100%">
	
	    <el-table-column prop="date" label="姓名" width="180"> </el-table-column>
	    <el-table-column prop="name" label="用户名" width="180"> </el-table-column>
	    <el-table-column prop="address" label="职位"> </el-table-column>
		 <el-table-column prop="address" label="邮箱"> </el-table-column>
		  <el-table-column prop="address" label="性别"> </el-table-column>
		   <el-table-column prop="address" label="电话"> </el-table-column>
		   <el-table-column prop="address" label="操作"> </el-table-column>
	  </el-table>
	
</template>

<script>
	  export default {
	    data() {
	      return {
			  options:[],
			  form:{
				  name:'',
			  },
			  dialogVisible:true,
	        tableData: [
	          {
	            date: '2016-05-02',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1518 弄',
	          },
	          {
	            date: '2016-05-04',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1517 弄',
	          },
	          {
	            date: '2016-05-01',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1519 弄',
	          },
	          {
	            date: '2016-05-03',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1516 弄',
	          },
	        ],
	      }
	    },
		methods:{
			getDept(){//找下拉中列表方法
			console.log('submit!触发class');			
						this.axios.get("http://localhost:8166/dept/all").
						then(res=>{
							console.log("后台数据", res);								
								let arr=[];								
							if (res.code == 1) {							
							res.data.forEach(item=>{
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
		},
		mounted() {
			this.getDept();
		}
	  }
	
</script>

<style scoped="scoped">
	.add{
		
	}
	
</style>
