<!-- 会员活动 -->
<template>
	<el-form :inline="true" :model="formize" class="demo-form-inline" style="margin-top: 30px;">
		<el-form-item style="margin-left: 20px;">
			<el-input v-model="formize.actiName"  placeholder="请输入活动名称"></el-input>
		</el-form-item>
		<el-form-item style="margin-left: 20px;">
			<el-select v-model="formize.actiState" clearable placeholder="请选择会员等级">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		
		</el-form-item>
		<el-form-item>
			<el-button type="primary"  @click="onSubmit">搜索</el-button>
			<el-button type="primary"  @click="addCustomer">+活动</el-button>
			<!-- <el-button type="primary" icon="el-icon-edit" circle ></el-button> -->
	<!-- 		<el-button type="success" v-print="printObj">打印</el-button> -->
			<!-- <el-button @click="exportExcel">导出</el-button> -->
			
			<div id="loading" v-show="printLoading"></div>
		</el-form-item>
	</el-form>
	<el-table  :data="activitynewes" style="width: 100%;margin-left: 20px;" align="center"
	id="printMe">
	<el-table-column label="状态" width="100">
			<template #default="scope">
				<span :style="{
					'color':(scope.row.actiState=='未开始' ? 'palegreen'
					:scope.row.actiState == '已开始'?'skyblue'
					:scope.row.actiState == '已结束'?' orange':'orangered'),'font-size':'18px'
				}">{{ scope.row.actiState }}</span>
			</template>
	</el-table-column>
		<el-table-column label="序号" width="100">
				<template #default="scope">
					<span >{{ scope.row.actiId }}</span>
				</template>
		</el-table-column>
		<el-table-column label="活动名称" width="120">
				<template #default="scope">
					<span >{{ scope.row.actiName }}</span>
				</template>
		</el-table-column>
		<el-table-column label="活动地点" width="130">
			<template #default="scope">
				<span >{{ scope.row.actiSite }}</span>
			</template>
		</el-table-column>
		<el-table-column label="活动日期" width="140">
			<template #default="scope">
				<span >{{ scope.row.actiTime }}</span>
			</template>
		</el-table-column>
		<el-table-column label="发起人" width="140">
			<template #default="scope">
				<span >
				{{ scope.row.activityEmpid.sfName }}
				</span>
			</template>
		</el-table-column>
		<el-table-column label="活动名称" width="140">
			<template #default="scope">
				<span >{{ scope.row.typId.atypeName }}</span>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template #default="scope">
				<el-button size="mini" @click="addStare(scope.row)"
				 v-if="scope.row.actiState=='未开始'"
				 type="success" style="margin-left: 16px;">
					开始活动
				</el-button>
				<el-button size="mini" @click="addEnd(scope.row)" 
				v-if="scope.row.actiState=='已开始'"
				type="danger" style="margin-left: 16px;">
					结束活动
				</el-button>
				<el-button size="mini" @click="addMember(scope.row)" type="primary" style="margin-left: 16px;">
					详情
				</el-button>
			</template>
		</el-table-column>
	</el-table>
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
	    <el-form @submit.native.prevent :model="formadd" :rules="formregular" style="margin-top: 40px;margin-left: 30px;">
			<el-form-item  prop="apptheme" label="操作人:">
				      {{this.$store.state.message.myStaff.sfName}}
			</el-form-item>
			<el-form-item  prop="apptheme" label="活动地点:" style="float: right;margin-top: -50px;">
			   <el-input type="text" v-model="formadd.actiSite" style="width: 200px;"></el-input>
			</el-form-item>
			<el-form-item prop="apptheme" label="活动日期:" >
				<el-date-picker
				     v-model="formadd.actiTime"
				     type="datetime"
					:disabledDate="dealDisabledDates"
				     placeholder="选择日期时间">
				   </el-date-picker>
			</el-form-item>
			<el-form-item  prop="apptheme" label="活动主题:" style="float: right;margin-top: -50px;">
			   <el-input v-model="formadd.actiName" type="text" style="width: 200px;"></el-input>
			</el-form-item>
			<el-form-item prop="apptheme" label="参与人数:">
				     <el-span v-model="formadd.actiPeoplesum" class="sjsumm"  style="width: 300px" >
						 {{fruitesisname.length}}人
				     </el-span>	
			</el-form-item>
			<el-form-item prop="apptheme" label="活动类型:" style="float: right;margin-top: -50px;">
			   <el-select style="width: 200px;" v-model="value" placeholder="请选择">
			       <el-option
			         v-for="item in selectAllTypes"
			         :key="item.atypeId"
			         :label="item.atypeName"
			         :value="item.atypeId">
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
	        <el-button type="primary" @click=" instAll()">确 定</el-button>
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
		<el-drawer
		  title="活动信息"
		  v-model="drawer"
		  size="40%">
		 <!-- 内容-->
		 <h3>活动信息</h3>
		 <el-form @submit.native.prevent style="height: 400px;">
		 	<span style="margin-left: 20px;">
		 			活动主题：<el-tag style="width: 150px; margin-top: 20px;">{{addMemberes.actiName}}</el-tag>
		 	</span>
		 	<span  style="margin-left: 15px;float: right;margin-top: 20px;">
		 			活动地点：<el-tag style="width: 150px;">{{addMemberes.actiSite}}</el-tag>
		 	</span>
		 	<br />
		 	<span style="margin-left: 20px;">
		 			活动时间：<el-tag style="width: 150px; margin-top: 20px;">{{addMemberes.actiTime}}</el-tag>
		 	</span>
		 	<span  style="margin-left: 15px;float: right;margin-top: 20px;">
		 			活动状态：<el-tag style="width: 150px;">{{addMemberes.actiState}}元</el-tag>
		 	</span>
		 	<br />
		 	<span style="margin-left: 40px;">
		 			发起人：<el-tag style="width: 150px; margin-top: 20px;">{{addMemberes.activityEmpid.sfName}}</el-tag>
		 	</span>
		 	<span  style="margin-left: 15px;float: right;margin-top: 20px;">
		 			活动类型：<el-tag style="width: 150px;">{{addMemberes.typId.atypeName}}</el-tag>
		 	</span>
		 	<br />
			<br />
			<span>
				活动参与人员：<br />
				<div style="margin-left: 90px;">
					<span v-for="(item,i) in participantes" >
						<el-button style="color: #00AAFF;border-radius: 30px;margin-left: 20px;background-color: lightgray;">{{item.panMemId.crName}}</el-button>
					</span>
				</div>
			</span>
		 </el-form>
		</el-drawer>
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
	  value:"",
	  formadd:{},
	  activitynewes:[],
	  pageNo: 1,
	  pageSize: 3,
	  total: 0,
	  ii:1,
	  iis:2,
	  addMemberes:{},
	  participantes:[],
	  options: [{
	  	value: '0',
	  	label: '未开始'
	  }, {
	  	value: '1',
	  	label: '已开始'
	  }, {
	  	value: '2',
	  	label: '已结束'
	  }],
    };
  },
 methods: {
	
	 
	 /* 结束活动*/
	 addEnd(row){
	 		 this.$confirm('是否结束该活动?', '提示', {
	 		 	confirmButtonText: '确定',
	 		 	cancelButtonText: '取消',
	 		 	type: 'warning'
	 		 }).then(() => {
	 		 	//调用post请求
	 		 	this.axios.post("/activitynew/update",{
	 		 		actiId:row.actiId,
	 		 		actiState:this.iis
	 		 	}).then(res => {
	 		 		this.loadData();
	 		 	})
	 		 }).catch(() => {
	 		 	this.$message({
	 		 		type: 'info',
	 		 		message: '已取消停用'
	 		 	});
	 		 });
	 },
	 /* 开始活动*/
	 addStare(row){
		 this.$confirm('是否开启该活动?', '提示', {
		 	confirmButtonText: '确定',
		 	cancelButtonText: '取消',
		 	type: 'warning'
		 }).then(() => {
		 	//调用post请求
		 	this.axios.post("/activitynew/update",{
		 		actiId:row.actiId,
		 		actiState:this.ii
		 	}).then(res => {
		 		this.loadData();
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
	 /* 根据id查询活动用户*/
	 participant(){
		 console.log("rhis",this.addMemberes.actiId)
		 this.axios.get("/customercare/select}"+this.addMemberes.actiId).then(res=>{
		    this.participantes=res.data;
			console.log("this is",this.participantes)
		 })
	 },
	 /* 查看详情*/
	 addMember(row){
		 this.drawer=true
		 this.addMemberes={...row}
		 this.participant()
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
	 	this.axios.get("activitynew/search", {
	 			params: params,
	 		})
	 		.then(res => {
	 			this.activitynewes = res.data.list;
	 			this.total = res.data.total;
	 		})
	 },
	 /* 新增活动*/
	 instAll(){
		this.dialogFormVisibles = false;
		var actiStates="0";
		this.axios.post("/activitynew/inster",{
			actiName:this.formadd.actiName,
			actiSite:this.formadd.actiSite,
			actiPeoplesum:this.fruitesisname.length,
			actiTime:this.formadd.actiTime,
			actiState:actiStates,
			typId:{atypeId:this.value},
			activityUid:{uId:this.$store.state.message.uid},
			fruitesis:this.fruitesis
		}).then(res=>{
			this.loadData()
		})
	 },
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