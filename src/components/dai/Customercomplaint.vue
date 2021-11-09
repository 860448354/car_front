<!-- 客户投诉 -->
<template>
	<el-form :inline="true" :model="formize" class="demo-form-inline" style="margin-top: 30px;">
		<el-form-item style="margin-left: 20px;">
			<el-input v-model="formize.comName"  placeholder="请输入关怀主题"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary"  @click="onSubmit">搜索</el-button>
			<el-button type="primary"  @click="addCustomer">+投诉</el-button>
	<!-- 		<el-button type="success" v-print="printObj">打印</el-button> -->
			<!-- <el-button @click="exportExcel">导出</el-button> -->

			<div id="loading" v-show="printLoading"></div>
		</el-form-item>
	</el-form>
	<el-table  :data="complaintes" style="width: 100%;margin-left: 20px;" align="center"
	id="printMe">
		<el-table-column label="序号" width="100">
			<template #default="scope">
				<span >{{ scope.row.comId }}</span>
			</template>
		</el-table-column>
		<el-table-column label="投诉主题" width="130">
			<template #default="scope">
				<span >{{ scope.row.comName }}</span>
			</template>
		</el-table-column>
		<el-table-column label="分类" width="100">
			<template #default="scope">
				<span >{{ scope.row.comType.complainName}}</span>
			</template>
		</el-table-column>
		<el-table-column label="对应客户" width="130">
			<template #default="scope">
				<span >{{ scope.row.comCustomer.crName}}</span>
			</template>
		</el-table-column>
		<el-table-column label="日期" width="120">
			<template #default="scope">
				<span >{{scope.row.comTime}}</span>
			</template>
		</el-table-column>
		<el-table-column label="紧急程度" width="130">
			<template #default="scope">
				<span >{{scope.row.comEmer.emerName}}</span>
			</template>
		</el-table-column>
		<el-table-column label="投诉人" width="100">
			<template #default="scope">
				<span >{{scope.row.comCustomer.crName}}</span>
			</template>
		</el-table-column>
		<el-table-column label="处理结果" width="100">
			<template #default="scope">
				<span >{{ scope.row.comResult}}</span>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template #default="scope">
				<el-button v-if="scope.row.comResult=='未处理'" @click="updateMember(scope.row)" type="success">
				  已处理
				</el-button>
				<el-button @click="addMember(scope.row)" type="primary">
				  查看详情
				</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-pagination style="margin-left: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
		:current-page="currentPage4" :page-sizes="[2,4]" :page-size="pageSize"
		layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
	<!-- 新增投诉 -->
	<el-dialog
	    v-model="dialogFormVisibles"
	    width="50%"
	    :before-close="handleClose">
		<h3>新增投诉</h3>
		<div style="width: 100%; height: 10px; background-color: #00AAFF;"></div>

	    <el-form @submit.native.prevent :model="formadd" :rules="formregular" style="margin-top: 20px;margin-left: 30px;">
			<el-form-item prop="comName" label="投诉原因:" style="">
			   <el-input type="text" v-model="formadd.comName"></el-input>
			</el-form-item>
			<el-form-item prop="apptheme" label="处理人:">
				     <el-span class="sjsumm"  style="width: 300px;font-size: 17px;margin-left: 10px;" >
						 {{this.$store.state.message.myStaff.sfName}}
				     </el-span>
			</el-form-item>
			<el-form-item prop="comTime" label="投诉日期:" style="float: right;margin-top: -53px;">
				<el-date-picker
				v-model="formadd.comTime"
				     type="datetime"
					:disabledDate="dealDisabledDates"
				     placeholder="选择日期时间">
				   </el-date-picker>
			</el-form-item>

			<el-form-item prop="customervalue" label="投诉人:">
			   <el-select style="width: 200px;margin-left: 18px;" v-model="customervalue" placeholder="请选择">
			   <el-option
			     v-for="item in selectCustomers"
			     :key="item.crId"
			     :label="item.crName"
			     :value="item.crId">
			   </el-option>
			   </el-select>
			</el-form-item>
			<el-form-item prop="staffvalue"  label="接待人:" style="float: right;margin-top: -50px;">
				<el-select style="width: 200px;" v-model="staffvalue" placeholder="请选择">
				<el-option
				  v-for="item in selectAllEmps"
				  :key="item.sfId"
				  :label="item.sfName"
				  :value="item.sfId">
				</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="emersvalue" label="紧急程度:">
			   <el-select style="width: 200px;" v-model="emersvalue" placeholder="请选择">
			   	<el-option
			   	  v-for="item in selectEmers"
			   	  :key="item.emerId"
			   	  :label="item.emerName"
			   	  :value="item.emerId">
			   	</el-option>
			   	</el-select>
			</el-form-item>
			<el-form-item prop="typevalue" label="投诉类型:" style="float: right;margin-top: -50px;">
				<el-select style="width: 200px;" v-model="typevalue" placeholder="请选择">
					<el-option
					  v-for="item in selectTypes"
					  :key="item.complainId"
					  :label="item.complainName"
					  :value="item.complainId">
					</el-option>
					</el-select>
			</el-form-item>
				  <el-form-item prop="apptheme" label="备注:"><br>
				     <el-input type="textarea" style="width: 550px;" v-model="formadd.comRemark"></el-input>
				  </el-form-item>
	    </el-form>
	    <span slot="footer" class="dialog-footer">
	        <el-button @click="dialogFormVisibles = false">取 消</el-button>
	        <el-button type="primary" @click="insterComplaint()">确 定</el-button>
	    </span>

	</el-dialog>
	<el-drawer
			  title="投诉信息"
			  v-model="drawer"
			  size="40%">
			 <!-- 内容-->
			 <h3>投诉信息</h3>
			 <el-form @submit.native.prevent style="height: 400px;" :rules="formregular">,
			 	<span style="margin-left: 20px;">
			 			投诉主题：<el-tag style="width: 150px; margin-top: 20px;">{{lookmember.comName}}</el-tag>
			 	</span>
			 	<span  style="margin-left: 15px;float: right;margin-top: 20px;">
			 			分类：<el-tag style="width: 150px; ">{{lookmember.comType.complainName}}</el-tag>
			 	</span>
			 	<br />
			 	<span  style="margin-left: 15px;float: right;margin-top: 20px;">
			 			日期：<el-tag style="width: 150px;">{{lookmember.comTime}}</el-tag>
			 	</span>
				<span style="margin-left: 20px;">
						紧急程度：<el-tag style="width: 150px; margin-top: 20px;">{{lookmember.comEmer.emerName}}</el-tag>
				</span>
         <br>
				<span  style="float: right;margin-top: 20px;margin-left: 15px;">
						投诉人：<el-tag style="width: 150px;">{{lookmember.comCustomer.crName}}</el-tag>
				</span>
				<br>
				<span style="margin-left: 20px;">
						处理结果：<el-tag style="width: 150px; ">{{lookmember.comResult}}</el-tag>
				</span>
			 </el-form>
			</el-drawer>
</template>

<script>
export default {
  name: "",
  data() {
    return {
		formregular:{
			comName:[
				{
					required:true,
					message:"请输入",
					trigger:"blur",
					},
			],
			comTime:[
				{
					required:true,
					message:"请输入",
					trigger:"blur",
					},
			],
			customervalue:[
				{
					required:true,
					message:"请输入",
					trigger:"blur",
					},
			],
			staffvalue:[
				{
					required:true,
					message:"请输入",
					trigger:"blur",
					},
			],
			emersvalue:[
				{
					required:true,
					message:"请输入",
					trigger:"blur",
					},
			],
			typevalue:[
				{
					required:true,
					message:"请输入",
					trigger:"blur",
					},
			]
		},
      formize: {},
	  pageNo: 1,
	  pageSize: 5,
	  total: 0,
	  drawer: false,
	  innerDrawer: false,
	  dialogFormVisibles:false,
	  selectAllEmps:[],
	  staffvalue:"",
	  selectCustomers:[],
	  customervalue:"",
	  selectEmers:[],
	  emersvalue:"",
	  selectTypes:[],
	  typevalue:"",
	  formadd:{},
	  comResults:"未处理",
	  comResultes:"已处理",
	  complaintes:[],
	  lookmember:{}
    };
  },
 methods: {
	 /* 修改/complaint/update*/
	 updateMember(row){
		 this.$confirm('确定已经处理！', '提示', {
		 	confirmButtonText: '确定',
		 	cancelButtonText: '取消',
		 	type: 'warning'
		 }).then(() => {
		 	//调用post请求
		 	this.axios.post("/complaint/update",{
		 				 comId:row.comId,
		 				 comResult:this.comResultes
		 	}).then(res=>{
		 				 this.loadData()
		 	})
		 }).catch(() => {
		 	this.$message({
		 		type: 'info',
		 		message: '已取消停用'
		 	});
		 });

	 },
	 /* 查询*/
	 onSubmit() {
	 	this.loadData();
	 },
	 /* 查看详情*/
	 addMember(row){
	 		 this.lookmember={...row}
	 		 this.drawer = true
	 		 console.log("这位是row",this.lookmember)
	 },
	 /* /complaint/instercomplaint新增投诉记录*/
	 insterComplaint(){
		 this.axios.post("/complaint/instercomplaint",{
			 comName:this.formadd.comName,
			 comTime:this.formadd.comTime,
			 comResult:this.comResults,
			 comRemark:this.formadd.comRemark,
			 comSta:{sfId:this.$store.state.empid},
			 comCustomer:{crId:this.customervalue},
			 comType:{complainId:this.typevalue},
			 comEmer:{emerId:this.emersvalue}
		 }).then(res=>{
			 this.dialogFormVisibles = false
			 this.loadData()

		 })
	 },
	 /* 分页查询*/
	 loadData() {
	 	let params = {
	 		...this.formize
	 	}; /* 这个部分最终要组合成后台的ModelAttribute指定的对象 */
	 	params["pageNo"] = this.pageNo;
	 	params["pageSize"] = this.pageSize;
	 	console.log("par", params);
	 	//get请求传参的方式不要忘记params的键
	 	this.axios.get("/complaint/search", {
	 			params: params,
	 		})
	 		.then(res => {
	 			this.complaintes = res.data.list;
	 			this.total = res.data.total;
	 				console.log("this.is",this.complaintes)
	 		})
	 },
	 /* /complaint/selectType 查询类型*/
	 selectType(){
		 this.axios.get("/complaint/selectType").then(res=>{
			 this.selectTypes=res.data
		 })
	 },
	 /* /complaint/selectemer查询紧急程度*/
	 selectEmer(){
		 this.axios.get("/complaint/selectemer").then(res=>{
			 this.selectEmers=res.data
		 })
	 },
	 /* /complaint/selectcustomer查询所有客户*/
	 selectCustomer(){
		this.axios.get("/complaint/selectcustomer").then(res=>{
					 this.selectCustomers=res.data
		})
	 },
	 /* 查询所有员工*/
	 selectAllEmp(){
		 this.axios.get("/complaint/selectstaff").then(res=>{
			 this.selectAllEmps=res.data
		 })
	 },
	 /* 新增投诉*/
	 addCustomer(){
		 this.dialogFormVisibles=true
		 this.selectAllEmp()
		 this.selectCustomer()
		 this.selectEmer()
		 this.selectType()
	 },
	 handleSizeChange(size) {
	 	this.pageSize = size;
		this.loadData()
	 },
	 handleCurrentChange(currNo) {
	 	this.pageNo = currNo;
		this.loadData()
	 },
	 handleClose(done) {
	    this.$confirm('还有未保存的工作哦确定关闭吗？')
	           .then(_ => {
	             done();
	           })
	           .catch(_ => {});
	       }
  },
  mounted() {
  	/* 钩子函数 */
  	this.loadData();
  }
};

</script>

<style scoped="scoped">
</style>
