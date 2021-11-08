<!--客户关怀 -->
<template>
	<el-form :inline="true" :model="formize" class="demo-form-inline" style="margin-top: 30px;">
		<el-form-item style="margin-left: 20px;">
			<el-input v-model="formize.custTheme"  placeholder="请输入关怀主题"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary"  @click="onSubmit">搜索</el-button>
			<el-button type="primary"  @click="addCustomer">+关怀</el-button>
			<!-- <el-button type="primary" icon="el-icon-edit" circle ></el-button> -->
	<!-- 		<el-button type="success" v-print="printObj">打印</el-button> -->
			<el-button @click="exportExcel">导出</el-button>
			
			<div id="loading" v-show="printLoading"></div>
		</el-form-item>
	</el-form>
	<el-table  :data="activitynewes" style="width: 100%;margin-left: 20px;" align="center"
	id="printMe">
		<!-- <el-table-column label="编号" width="80">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.vehiid }}</span>
			</template>
		</el-table-column> -->
		<el-table-column label="序号" width="100">
			<template #default="scope">
				<span >{{ scope.row.custId }}</span>
			</template>
		</el-table-column>
		<el-table-column label="关怀主题" width="150">
			<template #default="scope">
				<span >{{ scope.row.custTheme }}</span>
			</template>
		</el-table-column>
		<el-table-column label="关怀类型" width="180">
			<template #default="scope">
				<span v-for="(item,i) in scope.row.custType">{{item}}</span>
			</template>
		</el-table-column>
		<el-table-column label="日期" width="180">
			<template #default="scope">
				<span >{{ scope.row.custTime }}</span>
			</template>
		</el-table-column>
		<el-table-column label="执行人" width="150">
			<template #default="scope">
				<span v-for="(item,i) in scope.row.activityEmpid">{{ item }}</span>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template #default="scope">
				<span v-for="(item,i) in scope.row.custType">
					<el-button size="mini"
					@click="drawers(scope.row)" 
					v-if="item=='回访' && scope.row.custState==0"
					type="success" style="margin-left: 16px;">
					   完成回访
					</el-button>
						 <el-button size="mini"
						 @click="insaddes(scope.row)" 
						 v-if="item=='回访' && scope.row.custState==1"
						 type="success" style="margin-left: 16px;">
						    +回访记录
						 </el-button>
					<el-button v-if="item=='回访'"  size="mini" @click="drawersizeing(scope.row)" type="success" style="margin-left: 16px;">
						 	 	回访详情
					</el-button>
					<el-button v-if="item=='生日' || item=='节假日' || item=='其他'"  size="mini" @click="drawersize(scope.row)" type="primary" style="margin-left: 16px;">
						 	查看详情
                 	</el-button>
				</span>
				
				
			</template>
		</el-table-column>
	</el-table>
	<el-pagination style="margin-left: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
		:current-page="currentPage4" :page-sizes="[2,4]" :page-size="pageSize"
		layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
	<!-- 新增关怀 -->
	<el-dialog
	    v-model="dialogFormVisibles"
	    width="50%"
	    :before-close="handleClose">
		<h3>新增关怀</h3>
		<div style="width: 100%; height: 10px; background-color: #00AAFF;"></div>
	    <el-form @submit.native.prevent :model="formadd" :rules="formregular" style="margin-top: 20px;margin-left: 30px;">
			<el-form-item prop="apptheme" label="活动日期:" >
				<el-date-picker
				    v-model="formadd.custTime"
				     type="datetime"
					:disabledDate="dealDisabledDates"
				     placeholder="选择日期时间">	
				   </el-date-picker>
			</el-form-item>
			<el-form-item prop="apptheme" label="关怀主题:" style="float: right;margin-top: -60px;">
			   <el-input type="text" style="width: 200px;"
			   v-model="formadd.custTheme"
			   ></el-input>
			</el-form-item>
			<el-form-item prop="apptheme" label="执行人:">
				     <el-span class="sjsumm"  style="width: 300px;font-size: 17px;margin-left: 10px;" >
						 {{this.$store.state.message.myStaff.sfName}}
				     </el-span>	
			</el-form-item>
			<el-form-item prop="apptheme" label="活动类型:" style="float: right;margin-top: -50px;">
			   <el-select style="width: 200px;" v-model="value" placeholder="请选择">
			       <el-option
			         v-for="item in caretypes"
			         :key="item.ctypeId"
			         :label="item.ctypeName"
			         :value="item.ctypeId">
			       </el-option>
			     </el-select>
			</el-form-item>
				  <el-form-item  label="关怀人员:">
						  <div v-for="ll in fruitesisname" >
						  	<div style="border-radius:10px;width: 15%;height: 30px;  
						  	background: rgba(89,139,240,.1);float: left;margin-left: 10px;
						  	margin-top: 10px;text-align: center;">
						  		{{ll.crName}}
						  	</div>
						  </div>
						  <a
					  type="primary" @click="inner()"
					  style="margin-left: 10px;"><img src="../../../public/img/用户.png"></a>
				  </el-form-item>
				  <el-form-item prop="apptheme" label="关怀内容:"><br>
				     <el-input type="textarea" v-model="formadd.custContent" style="width: 550px;"></el-input>
				  </el-form-item>
	    </el-form>
	    <span slot="footer" class="dialog-footer">
	        <el-button @click="dialogFormVisibles = false">取 消</el-button>
	        <el-button type="primary" @click="instAll()">确 定</el-button>
	    </span>
			 
	</el-dialog>
	<!-- 人员申请页面-->
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
	 					         :key="fruite.crId"
	 					         class="fruiteList">
	 					      <input type="checkbox"
	 					             :checked="fruitIds.indexOf(fruite.crId)>=0"
	 					             name="checkboxinput"
	 					             class="input-checkbox"
	 					             @click="checkedOne(fruite)">
	 					      <label style="margin-left: 50px;">
	 						         <span style="font-size: 20px;">{{fruite.crName}}</span>
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
	 							{{ll.crName}}
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
		  title="关怀信息"
		  v-model="drawer"
		  size="40%">
		 <!-- 内容-->
		 <h3>关怀信息</h3>
		 <el-form @submit.native.prevent style="height: 400px;">
		 	<span style="margin-left: 20px;">
		 			关怀主题：<el-tag style="width: 150px; margin-top: 20px;">{{addMemberes.custTheme}}</el-tag>
		 	</span>
		 	<span  style="margin-left: 15px;float: right;margin-top: 20px;">
		 			关怀时间：<el-tag style="width: 150px; ">{{addMemberes.custTime}}</el-tag>
		 	</span>
		 	<br />
<!-- 		 	<span  style="margin-left: 15px;float: right;margin-top: 20px;">
		 			活动状态：<el-tag style="width: 150px;">{{addMemberes.actiState}}元</el-tag>
		 	</span> -->
		 	<br />	
		 	<span style="margin-left: 40px;">
		 			发起人：<el-tag style="width: 150px; margin-top: 20px;">{{addMemberes.activityEmpid.sfName}}</el-tag>
		 	</span>
		 	<span  style="margin-left: 15px;float: right;margin-top: 20px;">
		 			关怀内容：<el-tag style="width: 150px;">{{addMemberes.custContent}}</el-tag>
		 	</span>
		 	<br />
			<br />
			<div style="width: 100%; height: 10px; background-color: #00AAFF;"></div>
			<br />
			<br />
			<span>
				关怀人员：<br />
				<div style="margin-left: 90px;">
					<span v-for="(item,i) in participantes" >
						<span v-for="is in item.cares">
							<el-button style="color: #00AAFF;border-radius: 30px;margin-left: 20px;background-color: lightgray;margin-top: 10px;">
								{{is.careCus.crName}}
							</el-button>
						</span>
							
					</span>
				</div>
			</span>
		 </el-form>
		</el-drawer>
		<!-- 回访 -->
		<el-drawer
		  v-model="drawerers"
		  :with-header="false"
		  size="100%">
		  
		 <div style=" height: 600px;overflow-y: auto; overflow-x:hidden; ">
			 <p>
			 	  <button @click="drawerers=false"
			 	  style="width: 100px; height: 50px;background-color: #00AAFF;color: white;text-align: center;
			 	  font-size: 20px;border-color: transparent;float: right;margin-right: 10px;">关闭</button>
			 <button
			 	  style="width: 100px; height: 50px;background-color: orangered;color: white;text-align: center;
			 	  font-size: 20px;border-color: transparent;float: right;margin-right: 10px;"
			 	  @click="addclientreview()">完成</button>
			   </p>
			<div style="width: 80%; margin-left: 10%;">
				<p> <span style="font-size: 25px; color:#213764;margin-left: 46%;">回访记录单</span></p>
				<p><span style="font-size: 18px; color:#213764;margin-left: 45%;">Return visit to record</span></p>
				
				<div style="width: 100%; height: 10px; background-color: #00AAFF;"></div>
				<br>
				<p><span style="font-size: 20px; color:#213764;">基本信息</span></p>
				<el-form @submit.native.prevent style="height: 350px;">
						 	<span style="margin-left: 20px;margin-left: 20%;">
						 			回访主题：<el-tag style="width: 150px; margin-top: 20px;">{{insaddesfrom.custTheme}}</el-tag>
						 	</span>
						 	<span  style="margin-left: 15px;float: right;margin-top: 20px;margin-right: 20%;">
						 			回访时间：<el-tag style="width: 150px; ">{{insaddesfrom.custTime}}</el-tag>
						 	</span>
						 	<br />
						 	<br />	
						 	<span style="margin-left: 40px;margin-left: 21%;">
						 			负责人：<el-tag style="width: 150px; margin-top: 20px;">{{insaddesfrom.activityEmpid.sfName}}</el-tag>
						 	</span>
						 	<span  style="margin-left: 15px;float: right;margin-top: 20px;margin-right: 20%;">
						 			回访内容：<el-tag style="width: 150px;">{{insaddesfrom.custContent}}</el-tag>
						 	</span>
						 	<br />
							<br />
							<div style="width: 100%; height: 10px; background-color: #00AAFF;"></div>
							<br />
							<br />
							<span>
								<p><span style="font-size: 20px; color:#213764;">回访人员</span></p>
								<div style="margin-left: 90px;">
									<span v-for="(item,i) in participantesize" >
										<span v-for="is in item.cares">
											<el-button style="color: #00AAFF;border-radius: 30px;margin-left: 20px;background-color: lightgray;margin-top: 10px;">
												{{is.careCus.crName}}
											</el-button>
										</span>
									</span>
								</div>
							</span>
						 </el-form>
				<hr style="border:0.2px dashed #213764; ">
				<div>
					<br>
					<p><span style="font-size: 20px; color:#213764;">回访记录</span></p>
					<el-input v-model="clientreviews.revResult" type="textarea" :autosize="{ minRows: 8  }" placeholder="请输入内容"  >
					</el-input>
				</div>
				<hr style="border: 3px solid gainsboro;border-radius: 5px;background-color: gainsboro;" >
				<br />
			</div>
		 </div>
		</el-drawer>
		<!-- 回访信息 -->
		<el-drawer
				  title="回访信息"
				  v-model="drawering"
				  size="40%">
				 <!-- 内容-->
				 <h3>关怀信息</h3>
				 <el-form @submit.native.prevent style="height: 400px;">
				 	<span style="margin-left: 20px;">
				 			回访主题：<el-tag style="width: 150px; margin-top: 20px;">{{addMemberesing.custTheme}}</el-tag>
				 	</span>
				 	<span  style="margin-left: 15px;float: right;margin-top: 20px;">
				 			回访时间：<el-tag style="width: 150px; ">{{addMemberesing.custTime}}</el-tag>
				 	</span>
				 	<br />
				 	<br />	
				 	<span style="margin-left: 40px;">
				 			发起人：<el-tag style="width: 150px; margin-top: 20px;">{{addMemberesing.activityEmpid.sfName}}</el-tag>
				 	</span>
				 	<span  style="margin-left: 15px;float: right;margin-top: 20px;">
				 			回访内容：<el-tag style="width: 150px;">{{addMemberesing.custContent}}</el-tag>
				 	</span>
				 	<br />
					<br />
					<div style="width: 100%; height: 10px; background-color: #00AAFF;"></div>
					<br />
					<br />
					<span>
						回访人员：<br />
						<div style="margin-left: 90px;">
							<span v-for="(item,i) in participantesing" >
								<span v-for="is in item.cares">
									<el-button style="color: #00AAFF;border-radius: 30px;margin-left: 20px;background-color: lightgray;margin-top: 10px;">
										{{is.careCus.crName}}
									</el-button>
								</span>
									
							</span>
						</div>
					</span>
					<span>
						回访反馈：<br />
						<div style="margin-left: 90px;" v-for="(item,i) in clientreviewings">
							<span style="color: orange;">{{item.revResult}}</span>
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
	  selectMember:[],
	  fruitIds: [],
	  fruitIdes: [],
	  fruitesis:[],
	  fruitesisname:[],
	  checkAll: false,
	  formadd:{},
	  activitynewes:[],
	  caretypes:[],
	  value:'',
	  addMemberes:{},
	  participantes:[],
	  iis:1,
	  drawerers:false,
	  insaddesfrom:[],
	  participantesize:[],
	  clientreviews:{},
	  iiss:3,
	  drawering:false,
	  addMemberesing:false,
	  participantesing:[],
	  clientreviewings:[]
    };
  },
 methods: {
	 /* /clientreview/select查询回访记录*/
	 clientreviewing(){
		 this.axios.get("/clientreview/select/"+this.addMemberesing.custId).then(res=>{
			 this.clientreviewings=res.data
			 console.log("hgdjf",this.clientreviewings)
		 })
	 },
	  /* 新增回访记录/clientreview/inster*/
	  addclientreview(){
		  this.$confirm('确定提交回访记录！', '提示', {
		  	confirmButtonText: '确定',
		  	cancelButtonText: '取消',
		  	type: 'warning'
		  }).then(() => {
		  	//调用post请求
			this.axios.post("/clientreview/inster",{
						  revTime:this.insaddesfrom.custTime,
						  revResult:this.clientreviews.revResult,
						  revCare:{custId:this.insaddesfrom.custId}
			 }).then(res=>{
						  this.loadData()
						  this.drawersizess()
						  this.drawerers=false;
			})
		  }).catch(() => {
		  	this.$message({
		  		type: 'info',
		  		message: '已取消停用'
		  	});
		  });
	  },
	  /* 修改*/
	  drawersizess(){
	  		 	this.axios.post("/customercare/uapdate",{
	  		 		custId:this.insaddesfrom.custId,
	  		 		custState:this.iiss
	  		 	}).then(res => {
	  		 		this.loadData();
	  		 	})
	  },
	 /* 新增回访记录*/
	 insaddes(row){
		 this.drawerers=true
		 this.insaddesfrom={...row}
		 this.participants()
	 },
	 /* 修改*/
	 drawers(row){
		 this.$confirm('确定回访已完成！', '提示', {
		 	confirmButtonText: '确定',
		 	cancelButtonText: '取消',
		 	type: 'warning'
		 }).then(() => {
		 	//调用post请求
		 	this.axios.post("/customercare/uapdate",{
		 		custId:row.custId,
		 		custState:this.iis
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
	 /* 根据id查询活动用户*/
	 participants(){
	 		 console.log("rhis",this.insaddesfrom.custId)
	 		 this.axios.get("/customercare/select/"+this.insaddesfrom.custId).then(res=>{
	 		    this.participantesize=res.data;
	 			console.log("this is",this.participants)
	 		 })
	 },
	 /* 根据id查询活动用户*/
	 participant(){
	 		 console.log("rhis",this.addMemberes.custId)
	 		 this.axios.get("/customercare/select/"+this.addMemberes.custId).then(res=>{
	 		    this.participantes=res.data;
	 			console.log("this is",this.participantes)
	 		 })
	 },
	 /* 查看回访详情*/
	 drawersizeing(row){
		 this.drawering=true;
		 this.addMemberesing={...row}
		 this.participanting()
		 this.clientreviewing()
	 },
	 /* 查看详情*/
	 drawersize(row){
		 this.drawer=true;
		 this.addMemberes={...row}
		 this.participant()
	 },
	 /* 查询*/
	 onSubmit() {
	 	this.loadData();
	 },
	 /* 根据id查询活动用户*/
	 participanting(){
	 		 console.log("rhis",this.addMemberesing.custId)
	 		 this.axios.get("/customercare/select/"+this.addMemberesing.custId).then(res=>{
	 		    this.participantesing=res.data;
	 		 })
	 },
	/* 客户关怀类型*/
	careType(){
		this.axios.get("/caretype/select").then(res=>{
			this.caretypes=res.data
			console.log("this is",this.caretypes)
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
	 	this.axios.get("/customercare/search", {
	 			params: params,
	 		})
	 		.then(res => {
	 			this.activitynewes = res.data.list;
	 			this.total = res.data.total;
				console.log("this",this.activitynewes)
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
	 /* 新增关怀*/
	 instAll(){
			this.dialogFormVisibles = false;
			var state="0"
			console.log("this is",this.$store.state.empid)
			this.axios.post("/customercare/inster",{
				custTime:this.formadd.custTime,
				custTheme:this.formadd.custTheme,
				custContent:this.formadd.custContent,
				custState:state,
				custCzrid:{uId:this.$store.state.empid},
				custType:{ctypeId:this.value},
				fruitesis:this.fruitesis
			}).then(res=>{
				this.loadData()
			})
	 		
	 },
	 inner(){
	 		this.innerVisible = true
	 		this.selectAllMem()
	 },
	 /* 查询所有客户信息*/
	 selectAllMem(){
	 		 this.axios.get("/member/selectcus").then(res=>{
	 			 this.selectMember=res.data
	 			 console.log("this is",res.data)
	 		 })
	 },
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
	    checkedAll (e) {
	       this.isCheckedAll = e.target.checked;
	 	  console.log("furue",this.isCheckedAll )
	       if (this.isCheckedAll) {//全选时
	         this.fruitIds = []
	         this.selectMember.forEach(item => {
	 			this.fruitIds.push(item.crId)
	           this.fruitIdes.push(item)
	         })
	       } else {
	         this.fruitIds = []
	 		this.fruitIdes=[]
	       }
	     },
	 /* 新增关怀*/
	 addCustomer(){
		 this.dialogFormVisibles=true
		 this.careType()
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
	.el-textarea__inner{
	    height: 250px;
	    overflow-y: auto;
	 }
</style>