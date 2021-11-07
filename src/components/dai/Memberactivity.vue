<!-- 会员活动 -->
<template>
	<el-form :inline="true" :model="formize" class="demo-form-inline" style="margin-top: 30px;">
		<!-- <el-form-item style="margin-left: 20px;">
			<el-input v-model="formize.memBalance"  placeholder="请输入余额"></el-input>
		</el-form-item> -->
		<el-form-item style="margin-left: 20px;">
			<el-select v-model="formize.memGrade" clearable placeholder="请选择会员等级">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		
		</el-form-item>
		<el-form-item>
			<el-button type="primary"  @click="onSubmit">搜索</el-button>
			<el-button type="primary"  @click="addCustomer">+活动</el-button>
			<!-- <el-button type="primary" icon="el-icon-edit" circle ></el-button> -->
	<!-- 		<el-button type="success" v-print="printObj">打印</el-button> -->
			<el-button @click="exportExcel">导出</el-button>
			
			<div id="loading" v-show="printLoading"></div>
		</el-form-item>
	</el-form>
	<el-table  :data="cheliang" style="width: 100%;margin-left: 20px;" align="center"
	id="printMe">
		<!-- <el-table-column label="编号" width="80">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.vehiid }}</span>
			</template>
		</el-table-column> -->
		<el-table-column label="活动名称" width="100">
			<template #default="scope">
				<!-- <el-color-picker v-model="formes.vehicolor" show-alpha :predefine="predefineColors">
				</el-color-picker> -->
				<div :style="{'background-color':`${scope.row.vehicolor}`}" style="width: 30px;height: 30px;margin-left: 8px;"></div>
			</template>
		</el-table-column>
		<el-table-column label="活动地点" width="130">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.vehiname }}</span>
			</template>
		</el-table-column>
		<el-table-column label="活动日期" width="100">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.vehigalleryful }}</span>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template #default="scope">
	
				<!-- <el-button size="mini" @click="edit(scope.row)">编辑</el-button> -->
				<el-button size="mini" type="danger" @click="stopstate(scope.row)">
					{{ scope.row.vehistate=='空闲' ? '停止':'开启'}}
				</el-button>
				<el-button size="mini" @click="drawers(scope.row)" type="primary" style="margin-left: 16px;">
					详情
				</el-button>
			</template>
		</el-table-column>
	</el-table>
	<!--  -->
	<el-drawer
	  title="获得详情"
	  v-model="drawer"
	  size="50%">
	 <!-- 内容-->
	</el-drawer>
	<el-pagination style="margin-left: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
		:current-page="currentPage4" :page-sizes="[2,4]" :page-size="pageSize"
		layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
	<!-- 新增会员活动 -->
	<el-dialog
	    v-model="dialogFormVisibles"
	    width="50%"
	    :before-close="handleClose">
		<div style="width: 100%; height: 10px; background-color: #00AAFF;"></div>
	    <el-form @submit.native.prevent :model="cc" :rules="formregular" style="margin-top: 40px;margin-left: 30px;">
			<el-form-item prop="apptheme" label="操作人:">
				     {{this.$store.state.empid}}
			</el-form-item>
			<el-form-item prop="apptheme" label="活动地点:" style="float: right;margin-top: -50px;">
			   <el-input type="text" style="width: 200px;"></el-input>
			</el-form-item>
			<el-form-item prop="apptheme" label="活动日期:">
				<el-date-picker
				     type="datetime"
					:disabledDate="dealDisabledDates"
				     placeholder="选择日期时间">
				   </el-date-picker>
			</el-form-item>
			<el-form-item prop="apptheme" label="活动主题:" style="float: right;margin-top: -50px;">
			   <el-input type="text" style="width: 200px;"></el-input>
			</el-form-item>
			<el-form-item prop="apptheme" label="参与人数:">
				     <el-span class="sjsumm"  style="width: 300px" >
						 {{fruitesisname.length}}
				     </el-span>	
			</el-form-item>
			<el-form-item prop="apptheme" label="活动类型:" style="float: right;margin-top: -50px;">
			   <el-select style="width: 200px;" v-model="value" placeholder="请选择">
			       <el-option
			         v-for="item in selectAllTypes"
			         :key="item.atypeId"
			         :label="item.atypeName"
			         :value="item.atypeName">
			       </el-option>
			     </el-select>
			</el-form-item>
				  <el-form-item  label="活动人员:">
						  <div v-for="ll in fruitesisname" >
						  	<div style="border-radius:10px;width: 15%;height: 30px;  
						  	background: rgba(89,139,240,.1);float: left;margin-left: 10px;
						  	text-align: center;">
						  		<span style="margin-top: -10px;font-size: 20px;">{{ll.crId.crName}}</span>
						  	</div>
						  </div>
						  <a
					  type="primary" @click="inner()"
					  style="margin-left: 10px;"><img src="../../../public/img/用户.png"></a>
				  </el-form-item>
	    </el-form>
	    <span slot="footer" class="dialog-footer">
	        <el-button @click="dialogFormVisibles = false">取 消</el-button>
	        <el-button type="primary" @click="dialogFormVisibles = false; install()">确 定</el-button>
	    </span>
			 
	</el-dialog>
	<!-- 人员页面-->
	 <el-dialog
	 style="margin-top: -50px;"
	      width="55%"
	      title="用户选择"
	      v-model="innerVisible"
	      append-to-body
	    >
			  <hr />
			  <!-- 用户搜索-->
			  <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px; margin-left: 20px;">
			  					<!--  <el-form-item style="width: 200px;">
			  					   <el-input  placeholder="搜索用户"></el-input>
			  					  </el-form-item>
			  					  <el-form-item>
			  						<el-button icon="el-icon-search" circle @click="onSubmit" ></el-button>
			  					  </el-form-item> -->
			  	</el-form>
				<!-- 隔壁选人 -->
				<div style="height: 300px;overflow-y:auto">
				<el-checkbox style="" :checked="selectMember.length===fruitIds.length && fruitIds.length"
					     :key="fruitIds" @click="checkedAll" >全选</el-checkbox> 
				
					 <div >
					    <div 
						style="width: 151px; height: 50px;
						border-radius:15px;float: left;margin-top: 10px;margin-left: 20px;"
						v-for="fruite in selectMember"
					         :key="fruite.memId"
					         class="fruiteList">
					      <input type="checkbox"
					             :checked="fruitIds.indexOf(fruite.memId)>=0"
					             name="checkboxinput"
					             class="input-checkbox"
					             @click="checkedOne(fruite)">
					      <label style="margin-left: 50px;">
						         <span style="margin-top: -10px;">{{fruite.crId.crName}}</span>
								 <img v-if="fruite.memGrade=='普通会员'" style="margin-left: 45px;" src="../../../public/img/普通会员.png" />
								 <img v-if="fruite.memGrade=='钻石会员'" style="margin-left: 45px;" src="../../../public/img/钻石会员.png" />
								 <img v-if="fruite.memGrade=='超级会员'" style="margin-left: 45px;" src="../../../public/img/超级会员.png" />
								 
						  </label>
					    </div>
					  </div>
					
					  <el-empty description="描述文字" v-show="showEmpty"></el-empty>
				</div>
				<hr />
				<div style="width: 100%; height: 300px; " >
					<!-- <p>已选择0人</p> -->
					<div v-for="ll in fruitIdes" >
						<div style="border-radius:10px;width: 20%;height: 30px;  
						background-color: #00AAFF; color: white;float: left;margin-left: 10px;
						margin-top: 10px;font-size: 20px;text-align: center;margin-top: 10px;">
							{{ll.crId.crName}}
						</div>
					</div>
					
				</div>
				<hr />
				<div style="height: 40px;">
					<el-button @click="okkadd()" style="float: right;width: 150px;height: 60px; font-size: 20px;
					background-color: #00AAFF;color: white;">确定</el-button>
				</div>
	    </el-dialog>
</template>
 
<script>
export default {
  name: "",
  data() {
    return {
	  dealDisabledDates(time) {
	  		return time.getTime() <= (new Date()).getTime();
	  			},
      formize: {},
	  pageNo: 1,
	  pageSize: 5,
	  total: 0,
	  drawer: false,
	  innerDrawer: false,
	  dialogFormVisibles:false,
	  innerVisible:false,
	  fruitIds: [],
	  fruitIdes: [],
	  checkAll: false,
	  selectMember:[],
	  fruitesisname:[],
	  fruitesis:[],
	  selectAllTypes:[],
	  value:""
	   
    };
  },
 methods: {
	 /* 查询活动类型*/
	 selectAllType(){
		 this.axios.get("/activity/select").then(res=>{
			 this.selectAllTypes=res.data
			 console.log("this is?",this.selectAllTypes)
		 })
	 },
	 /*回显 */
	 okkadd(){
	 	for(var i=0;i<this.fruitIdes.length;i++){
	 		this.fruitesis[i]=this.fruitIdes[i]
	 		this.fruitesisname[i]=this.fruitIdes[i]
	 	}
	 	this.innerVisible=false
	 	
	 },
	 /* 单选*/
	 checkedOne (fruitId) {
	       let idIndex = this.fruitIds.indexOf(fruitId)
	       if (idIndex >= 0) {//如果已经包含就去除
	         this.fruitIds.splice(idIndex, 1)
	 		this.fruitIdes.splice(idIndex, 1)
	       } else {//如果没有包含就添加
	        this.fruitIds.push(fruitId)
	 		this.fruitIdes.push(fruitId)
	       }
	     },
		 /* 多选*/
	    checkedAll (e) {
	       this.isCheckedAll = e.target.checked;
	 	  console.log("furue",this.isCheckedAll )
	       if (this.isCheckedAll) {//全选时
	         this.fruitIds = []
	         this.selectMember.forEach(item => {
	 			this.fruitIds.push(item.memId)
	           this.fruitIdes.push(item)
	         })
	       } else {
	         this.fruitIds = []
	 		this.fruitIdes=[]
	       }
	     },
	 inner(){
		this.innerVisible = true
		this.selectAllMem()
	 },
	 /* 查询所有会员信息*/
	 selectAllMem(){
		 this.axios.get("/member/selectall").then(res=>{
			 this.selectMember=res.data
			 console.log("this is",res.data)
		 })
	 },
	 /* 新增活动*/
	 addCustomer(){
		 this.selectAllType();
	 	 this.dialogFormVisibles=true
	 },
	 handleSizeChange(size) {
	 	this.pageSize = size;
	 },
	 handleCurrentChange(currNo) {
	 	this.pageNo = currNo;
	 },
	 handleClose(done) {
	    this.$confirm('还有未保存的工作哦确定关闭吗？')
	           .then(_ => {
	             done();
	           })
	           .catch(_ => {});
	       }
  }
};
 
</script>
 
<style scoped="scoped">
	.input-checkbox {
	  width: 40px;
	  height: 40px;
	  -webkit-appearance: none;
	  position: absolute;
	  outline: none;
	  border: none;
	  content: url("../../../public/img/24gf-portraitMaleInfo3.png");
	    
	 
	}
	.input-checkbox:checked{
	   content: url("../../../public/img/用户头像-男.png");
	}
</style>