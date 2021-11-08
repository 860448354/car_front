<!-- 会员信息 -->
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
			
			<div id="loading" v-show="printLoading"></div>
		</el-form-item>
	</el-form>
	<el-table  :data="memberes" style="width: 100%;margin-left: 20px;" align="center"
	id="printMe">
		<el-table-column label="会员姓名" width="100">
				<template #default="scope">
					<span style="margin-left: 10px">
					  {{scope.row.crId.crName}}
					  </span>
				</template>
		</el-table-column>
		<el-table-column label="会员等级" width="130">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.memGrade }}</span>
			</template>
		</el-table-column>
		<el-table-column label="会员余额" width="100">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.memBalance }}元</span>
			</template>
		</el-table-column>
		<el-table-column label="会员办理时间" width="180">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.memTime }}</span>
			</template>
		</el-table-column>
		<el-table-column label="会员性别" width="100">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.crId.crSex }}</span>
			</template>
		</el-table-column>
		<el-table-column label="电话号码" width="130">
			<template #default="scope">
				<span>{{ scope.row.crId.crPhone }}</span>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template #default="scope">
				<el-button @click="addMember(scope.row)" type="primary" style="margin-left: 16px;">
				  查看详情
				</el-button>
				<el-button @click="addhuiyuan(scope.row)" type="primary" style="margin-left: 16px;">
				  会员充值
				</el-button>
			</template>
		</el-table-column>
	</el-table>
	<!-- 分页 -->
	<el-pagination style="margin-left: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
		:current-page="currentPage4" :page-sizes="[2,4]" :page-size="pageSize"
		layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
	<el-drawer
	  title="会员信息"
	  v-model="drawer"
	  size="70%">
	 <!-- 内容-->
	 <h3>会员信息</h3>
	 <div>
		 <div style="height: 180px;
		 width: 450px;box-shadow: darkgrey 10px 10px 30px 5px ;border-radius:10px;
		 margin-left: 40px;">
			<div>
				<img src="../../../public/img/用户默认头像.png" style="margin-top: 20px;margin-left: 20px;"/>
				<div style="margin-left: 160px;margin-top: -130px;">
					<p><span style="margin-top: -20px;">{{lookmember.crId.crName}}</span>
					 <img v-if="lookmember.memGrade=='普通会员'" style="margin-left: 100px;margin-top: -15px;" src="../../../public/img/普通会员.png" />
					 <img v-if="lookmember.memGrade=='钻石会员'" style="margin-left: 100px;margin-top: -15px;" src="../../../public/img/钻石会员.png" />
					 <img v-if="lookmember.memGrade=='超级会员'" style="margin-left: 100px;margin-top: -15px;" src="../../../public/img/超级会员.png" />
					</p>
					<p>{{lookmember.crId.crPhone}}</p>
				</div>
			</div>
		 </div>
		 <div style="height: 180px;
		 width: 450px;box-shadow: darkgrey 10px 10px 30px 5px ;border-radius:10px;
		 margin-left: 580px;margin-top: -180px;">
		 <br />
		  <span style="margin-left: 20%;font-size: 20px;">累计充值费用</span>
		  <span style="margin-left: 20%;font-size: 20px;">余额</span>
		  <br><br>
		  <span style="margin-left: 20%;font-size: 40px;color: orange;">{{lookmember.memBalancedsum}}</span>
		  <span style="margin-left: 25%;font-size: 40px;color: orange;">{{lookmember.memBalance}}</span>
		 </div>
		<el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 40px;margin-left: 40px;">
		    <el-tab-pane label="会员信息" name="first" >
				<div style="height:300px;overflow-y:auto">
				<el-descriptions title="用户信息">
				    <el-descriptions-item label="用户名">{{lookmember.crId.crName}}</el-descriptions-item>
				    <el-descriptions-item label="手机号">{{lookmember.crId.crPhone}}</el-descriptions-item>
				    <el-descriptions-item label="会员等级">{{lookmember.memGrade}}</el-descriptions-item>
				    <el-descriptions-item label="性别">
				      <el-tag size="small">{{lookmember.crId.crSex}}</el-tag>
				    </el-descriptions-item>
				    <el-descriptions-item label="会员办理时间">{{lookmember.memTime}}</el-descriptions-item>
				</el-descriptions>
				</div>
			</el-tab-pane>
			<!-- 充值 -->
			<el-tab-pane label="充值记录" name="menoy" >
			<div style="height:300px;overflow-y:auto" >
			<div class="block" >
			  <el-timeline >
			    <el-timeline-item  placement="top" v-for="(item,i) in selectAllByIdes">
			      <el-card>
			        <h4>{{item.chargeTime}}</h4>
			        <p>充值了<span style="color: orange;font-size: 20px;">{{item.chargeMenoy}}</span>元</p>
					<p>当时账户余额<span style="color: orange;font-size: 20px;">{{item.chargeBalance}}</span>元</p>
			      </el-card>
			    </el-timeline-item>
			  </el-timeline>
			</div>
			</div>
			</el-tab-pane>
		</el-tabs>
	 </div>
	</el-drawer>
	
	<el-dialog
	    title="会员充值"
	    v-model="dialogFormVisibles"
	    width="50%"
	    :before-close="handleClose">
		<hr>
		<!-- <el-table :data="dalit" style="border: none; border-right: none;border-left: none;">
			  <el-table-column prop=""  width="120" >物体名称：{{dalit.listname}}</el-table-column>
		</el-table> -->
		<el-form @submit.native.prevent style="height: 400px;" >
			<span style="margin-left: 75px;">
					姓名：<el-tag style="width: 150px; margin-top: 20px;">{{addhuiyuans.crId.crName}}</el-tag>
			</span>
			<span  style="margin-left: 15px;float: right;margin-top: 20px;">
					电话号码：<el-tag style="width: 150px;">{{addhuiyuans.crId.crPhone}}</el-tag>
			</span>
			<br />
			<span style="margin-left: 48px;">
					会员等级：<el-tag style="width: 150px; margin-top: 20px;">{{addhuiyuans.memGrade}}</el-tag>
			</span>
			<span  style="margin-left: 15px;float: right;margin-top: 20px;">
					会员余额：<el-tag style="width: 150px;">{{addhuiyuans.memBalance}}元</el-tag>
			</span>
			<br />
			<span style="margin-left: 20px;">
					会员办理时间：<el-tag style="width: 150px; margin-top: 20px;">{{addhuiyuans.memTime}}</el-tag>
			</span>
			<br />
			
			<div style="margin-top: 30px;width: 100%; height: 10px; background-color: #00AAFF;">
			</div>
			<el-form :rules="formregular"  :model="formize" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="操作人:" style="margin-top: 10px; margin-left: 20px;">
				    <el-span class="sjsumm" v-model="formize.gooduntit"  style="width: 300px;" >
						 {{this.$store.state.message.myStaff.sfName}}
					</el-span>
				</el-form-item>
				<el-form-item prop="chargeTime"
				style="margin-top: -60px; margin-left: 50%;"
				  label="充值日期:"
				>
				<el-span class="sjsumm" v-model="formize.chargeTime"  style="width: 300px" >
								   {{formize.chargeTime}}
				</el-span>
				 <!-- <el-input style="width: 20%;" type="age" v-model="formize.time" autocomplete="off"></el-input> -->
				</el-form-item>
			  <el-form-item prop="chargeMenoy"
			  style="margin-top: 15px;margin-left: 20px;"
			    label="充值金额:">
			    <el-input style="width: 20%;" type="number" 
				v-model="formize.chargeMenoy" autocomplete="off"
				placeholder="输入数字"
				@blur.native.capture="testUser"></el-input>
			  </el-form-item>
				<div style="margin-left: 20px;">
					<span >充值之后金额</span>
					<div style="border-bottom:2px solid #00457D;width: 20%;margin-top: -20px;margin-left: 105px;">
					{{formize.chargeBalance}}元
					</div>
				</div>
			</el-form>
		</el-form>
	    <span slot="footer" class="dialog-footer">
	        <el-button @click="dialogFormVisibles = false">取 消</el-button>
	        <el-button type="primary" @click="dialogFormVisibles = false; install()">确 定</el-button>
	    </span>
	</el-dialog>
</template>
 
<script>
export default {
  name: "",
  data() {
    return {
		formregular:{
			chargeMenoy:[
				{
					required:true,
					message:"请输入",
					trigger:"blur",
					},
			],
		},
		options: [{
			value: '0',
			label: '普通会员'
		}, {
			value: '1',
			label: '钻石会员'
		}, {
			value: '2',
			label: '超级会员'
		}],
      formize: {
		  chargeTime:'',
		  chargeBalance:0,
		  chargeMenoy:0,
		  memBalancedsum:0
	  },
	  pageNo: 1,
	  pageSize: 3,
	  total: 0,
	  drawer: false,
	  innerDrawer: false,
	  activeName: 'first',
	  forms:{},
	  dialogFormVisibles:false,
	  memberes:[],
	  lookmember:{},
	  addhuiyuans:{},
	  selectAllByIdes:{},
	  empid:0
    };
  },
 methods: {
	 /* 查询*/
	 selectConCom(){
	 	let comVo = {
	 	}
	 	console.log(comVo)
	 	this.axios.post("comple/selectCon",comVo).then(res=>{
	 		console.log(res.data,"这个是确认完工信息")
	 		this.conComList = res.data;
	 	})
	 },
	 
	 /* 修改*/
	 updatebym(){
		 this.formize.memBalancedsum = parseInt(this.formize.chargeMenoy) + parseInt(this.addhuiyuans.memBalancedsum);
		 if(this.addhuiyuans.memBalancedsum<=1500){
			 var memGrade="0";
			 this.axios.post("/charge/updatebym",{
						 memId:this.addhuiyuans.memId,
						 memBalance:this.formize.chargeBalance,
						 memBalancedsum:this.formize.memBalancedsum,
						 memGrade:memGrade
			}) 
		 }else if(this.addhuiyuans.memBalancedsum>=1500&&this.addhuiyuans.memBalancedsum<=3000){
			 var memGrade="1";
			 this.axios.post("/charge/updatebym",{
			 			 memId:this.addhuiyuans.memId,
			 			 memBalance:this.formize.chargeBalance,
			 			 memBalancedsum:this.formize.memBalancedsum,
			 			 memGrade:memGrade
			 }) 
		 }else{
		     var memGrade="2";
		     this.axios.post("/charge/updatebym",{
		     			 memId:this.addhuiyuans.memId,
		     			 memBalance:this.formize.chargeBalance,
		     			 memBalancedsum:this.formize.memBalancedsum,
		     			 memGrade:memGrade
		     }) 
		 }
		
	 },
	 /* 新增*/
	 install(){
		 console.log("this is ?",this.empid)
		this.axios.post("charge/insterall",{
			 chargeTime:this.formize.chargeTime,
			 chargeMenoy:this.formize.chargeMenoy,
			 chargeBalance:this.formize.chargeMenoy,
			 chargeKhid:{crId:this.addhuiyuans.crId.crId},
			 chargeUserid:{uId:this.$store.state.message.uid}
		 }).then(res=>{
			this.updatebym();
			 this.loadData();
		 })
	 },
	 testUser(){
		this.formize.chargeBalance = parseInt(this.formize.chargeMenoy) + parseInt(this.addhuiyuans.memBalance);
		
	 },
	
	 /* 获取当前时间*/
	 getsjsum(){
	 	var a=new Date();	
	 	var year=a.getFullYear();
	 	var month=a.getMonth()+1;
	 	var day=a.getDate();
	 	this.formize.chargeTime=year+"年"+month+"月"+day+"日";
	 },
	 /* 查看详情*/
	 addMember(row){
		 this.lookmember={...row}
		 this.selectAllById()
		 this.selectConCom()
		 this.drawer = true
		 console.log("这位是row",this.lookmember)
	 },
	 /* 查询会员充值记录/charge/selectall/{{id}}*/
	 selectAllById(){
		 console.log("这位是crid",this.lookmember.crId.crId);
		 this.axios.get("/charge/selectall/"+this.lookmember.crId.crId).then(res=>{
			 this.selectAllByIdes=res.data;
			 console.log("who this",this.selectAllByIdes)
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
	 	this.axios.get("member/search", {
	 			params: params,
	 		})
	 		.then(res => {
				console.log("memberes",res)
	 			this.memberes = res.data.list;
	 			this.total = res.data.total;
				console.log("memberes",this.memberes)
	 		})
	 },
	 /* 查询*/
	 onSubmit() {
	 	this.loadData();
	 },
	 /* 会员充值*/
	 addhuiyuan(row){
		 this.addhuiyuans={...row}
		 this.empid=this.$store.state.empid
		 console.log("who this?",this.empid)
		 this.dialogFormVisibles=true
		 this.getsjsum()
		 
	 },
	 handleClick(tab, event) {
	         console.log(tab, event);
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