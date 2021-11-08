<!-- 客户信息 -->
<template>
	<el-form :inline="true" :model="formize" class="demo-form-inline" style="margin-top: 30px;">
		<el-form-item style="margin-left: 20px;">
			<el-input v-model="formize.crName"  placeholder="请输入姓名"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary"  @click="onSubmit">搜索</el-button>
			<!--<el-button type="primary" icon="el-icon-edit" circle ></el-button> -->
	        <!--<el-button type="success" v-print="printObj">打印</el-button> -->
			<!-- <el-button @click="exportExcel">导出</el-button> -->
			
			<div id="loading" v-show="printLoading"></div>
		</el-form-item>
	</el-form>
	<el-table  :data="customer" style="width: 100%;margin-left: 20px;" align="center"
	id="printMe">
		<el-table-column label="客户编号" width="100">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.crId }}</span>
			</template>
		</el-table-column>
		<el-table-column label="客户姓名" width="120">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.crName }}</span>
			</template>
		</el-table-column>
		<el-table-column label="客户电话" width="140">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.crPhone }}</span>
			</template>
		</el-table-column>
		<el-table-column label="客户性别" width="100">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.crSex }}</span>
			</template>
		</el-table-column>
		<el-table-column label="身份证号" width="200">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.crIdNumber}}</span>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template #default="scope">
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
	<el-drawer
	  title="客户信息"
	  v-model="drawer"
	  size="50%">
	 <!-- 内容-->
	 <h3>客户信息</h3>
	 <div>
		 <div style="height: 180px;
		 width: 450px;box-shadow: darkgrey 10px 10px 30px 5px ;border-radius:10px;
		 margin-left: 40px;">
			<div>
				<img src="../../../public/img/用户默认头像.png" style="margin-top: 20px;margin-left: 20px;"/>
				<div style="margin-left: 160px;margin-top: -130px;">
				<p><span>{{lookmember.crName}}</span>
				<button style="border-color: currentcolor;
				float: right;margin-right: 20px;
				margin-top: -30px;" @click="addCus()"><img src="../../../public/img/用户.png" ></button>
				</p>
				<p><span>{{lookmember.crPhone}}</span></p>
				</div>
			</div>
		 </div>
		<div style="height: 180px;
		 margin-left: 580px;margin-top: -182px;" v-if="lookmember.crMember==0">
		 <el-button type="primary" @click="addMemberCus()" >升级会员</el-button>
		 </div>
		<el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 40px;margin-left: 40px;">
		    <el-tab-pane label="客户信息" name="first" >
				<div style="height:300px;overflow-y:auto">
				<el-descriptions title="用户信息">
				    <el-descriptions-item label="用户名">{{lookmember.crName}}</el-descriptions-item>
				    <el-descriptions-item label="手机号">{{lookmember.crPhone}}</el-descriptions-item>
				    <el-descriptions-item label="时间">{{lookmember.crTime}}</el-descriptions-item>
				    <el-descriptions-item label="备注">
				      <el-tag size="small">{{lookmember.crSex}}</el-tag>
				    </el-descriptions-item>
				    <el-descriptions-item label="身份证">{{lookmember.crIdNumber}}</el-descriptions-item>
				</el-descriptions>
				</div>
			</el-tab-pane>
		    <el-tab-pane label="消费记录" name="second" >
			<div style="height:300px;overflow-y:auto">
			<div class="block">
			  <el-timeline>
			    <el-timeline-item timestamp="2018/4/12" placement="top">
			      <el-card>
			        <h4>更新 Github 模板</h4>
			        <p>王小虎 提交于 2018/4/12 20:46</p>
			      </el-card>
			    </el-timeline-item>
			    <el-timeline-item timestamp="2018/4/3" placement="top">
			      <el-card>
			        <h4>更新 Github 模板</h4>
			        <p>王小虎 提交于 2018/4/3 20:46</p>
			      </el-card>
			    </el-timeline-item>
			    <el-timeline-item timestamp="2018/4/2" placement="top">
			      <el-card>
			        <h4>更新 Github 模板</h4>
			        <p>王小虎 提交于 2018/4/2 20:46</p>
			      </el-card>
			    </el-timeline-item>
			  </el-timeline>
			</div>
			</div>
			</el-tab-pane>
		</el-tabs>
	 </div>
	</el-drawer>
	<!-- 升级会员-->
	<el-dialog
	    v-model="dialogFormVisibles"
	    width="50%"
	    :before-close="handleClose">
		<div style="width: 100%; height: 10px; background-color: #00AAFF;"></div>
	    <el-form @submit.native.prevent :model="formadd" :rules="formregular" style="margin-top: 40px;margin-left: 30px;height: 400px;">
			<el-form-item  prop="apptheme" label="操作人:">
				      <el-tag style="width: 250px;margin-left: 15px;font-size: 17px;">{{this.$store.state.message.myStaff.sfName}}</el-tag>
			</el-form-item>
			<el-form-item  prop="apptheme" label="客户姓名:" style="float: right;margin-top: -50px;">
				   <el-tag style="width: 250px;font-size: 17px;">{{lookmember.crName}}</el-tag>
			</el-form-item>
			<el-form-item  prop="apptheme" label="电话号码:">
				      <el-tag style="width: 250px;font-size: 17px;">{{lookmember.crPhone}}</el-tag>
			</el-form-item>
			<el-form-item  prop="apptheme" label="客户身份证:" style="float: right;margin-top: -50px;">
				   <el-tag style="width: 250px;font-size: 17px;">{{lookmember.crIdNumber}}</el-tag>
			</el-form-item>
			<el-form-item  prop="apptheme" label="客户性别:">
				      <el-tag style="width: 250px;font-size: 17px;">{{lookmember.crSex}}</el-tag>
			</el-form-item>
			<div style="width: 100%; height: 10px; background-color: #00AAFF;"></div>
			<br />
			<el-form-item  prop="apptheme" label="申请日期:">
					  <span style="font-size: 20px;">{{formizes.chargeTimes}}</span>
			</el-form-item>
			<el-form-item  prop="apptheme" label="充值金额:" style="float: right;margin-top: -60px;">
				   <el-input type="number" v-model="formizes.sum" @blur.native.capture="testUser"
				   autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item  prop="apptheme" label="会员等级:">
				      <span style="font-size: 20px;">{{formizes.chargeMember}}</span>
			</el-form-item>
	    </el-form>
	    <span slot="footer" class="dialog-footer">
	        <el-button @click="dialogFormVisibles = false">取 消</el-button>
	        <el-button type="primary" @click=" instAll()">确 定</el-button>
	    </span>
			 
	</el-dialog>
	
	<!-- 修改客户信息 -->
	<el-dialog
	    v-model="dialogFormVisiblesize"
	    width="50%"
	    :before-close="handleClose">
		<div style="width: 100%; height: 10px; background-color: #00AAFF;"></div>
	    <el-form @submit.native.prevent :model="formadd" :rules="formregular" style="margin-top: 40px;margin-left: 30px;height: 400px;">
			<el-form-item  prop="apptheme" label="操作人:">
				
				      <el-tag style="width: 250px;margin-left: 15px;font-size: 17px;">{{this.$store.state.message.myStaff.sfName}}</el-tag>
			</el-form-item>
			<el-form-item  prop="apptheme" label="客户身份证:" style="float: right;margin-top: -50px;">
				   <el-tag style="width: 250px;font-size: 17px;">{{lookmember.crIdNumber}}</el-tag>
			</el-form-item>
			<el-form-item  prop="apptheme"  label="电话号码:">
				    <el-input type="text" v-model="lookmember.crPhone" style="width: 250px;font-size: 17px;"></el-input>
			</el-form-item>
			<el-form-item  prop="apptheme" label="客户姓名:" style="float: right;margin-top: -50px;">
				<el-input type="text" v-model="lookmember.crName" style="width: 250px;font-size: 17px;"></el-input>
			</el-form-item>
			<el-form-item  prop="apptheme" label="客户性别:">
				<el-select style="width: 250px;" v-model="lookmember.crSex" clearable placeholder="请选择会员等级">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
	    </el-form>
	    <span slot="footer" class="dialog-footer">
	        <el-button @click="dialogFormVisiblesize = false">取 消</el-button>
	        <el-button type="primary" @click=" updateAll()">确 定</el-button>
	    </span>
			 
	</el-dialog>
</template>
 
<script>
export default {
  name: "",
  data() {
    return {
		options: [{
			value: '男',
			label: '男'
		}, {
			value: '女',
			label: '女'
		}],
	  formizes:{
		 chargeTimes:"",
		 chargeTime:new Date(),
		 chargeMember:"",
		 chargeSum:0,
		 chargeMembering:0
	  },
      formize: {
		  
	  },
	  pageNo: 1,
	  pageSize: 5,
	  total: 0,
	  drawer: false,
	  innerDrawer: false,
	  customer:[],
	  lookmember:{},
	  lookmemberes:{},
	  activeName:"first",
	  dialogFormVisibles:false,
	  dialogFormVisiblesize:false
    };
  },
 methods: {
	 /* 查询*/
	 onSubmit() {
	 	this.loadData();
	 },
	 /* 修改客户*/
	 updateAll(){
		 this.dialogFormVisiblesize=false;
		 this.drawer=false;
		 console.log("this is??",this.lookmember)
		 this.axios.post("/member/updataByCustomer",{
			 crId:this.lookmember.crId,
			 crPhone:this.lookmember.crPhone,
			 crName:this.lookmember.crName,
			 crSex:this.lookmember.crSex
		 }).then(res=>{
			 this.loadData()
		 })
	 },
	 addCus(){
		 this.dialogFormVisiblesize=true;
		 
	 },
	 /* 新增会员*/
	 instAll(){
		 this. dialogFormVisibles=false;
		 this.drawer=false;
		 this.axios.post("/member/inster",{
			 memGrade:this.formizes.chargeMembering,
			 memTime:this.timeStr(this.formizes.chargeTime),
			 memBalance:this.formizes.sum,
			 memBalancedsum:this.formizes.sum,
			 crId:{crId:this.lookmember.crId},
			 memZkid:{berdId:this.formizes.chargeSum}
		 }).then(res=>{
			 this.loadData();
		 })
	 },
	 /* 判断会员等级*/
	 testUser(){
		 console.log("this id",this.formizes.sum)
		if(this.formizes.sum<=1500){
			 this.formizes.chargeMember="普通会员"
			 this.formizes.chargeSum=1
			 this.formizes.chargeMembering=0
		 }else if(this.formizes.sum>=1500&&this.formizes.sum<=3000){
			 this.formizes.chargeMember="钻石会员"
			 this.formizes.chargeSum=2
			 this.formizes.chargeMembering=1
		 }else{
			 this.formizes.chargeMember="超级会员"
			 this.formizes.chargeSum=3
			 this.formizes.chargeMembering=2
		 }
	 },
	 /* 获取当前时间*/
	 getsjsum(){
	 	var a=new Date();	
	 	var year=a.getFullYear();
	 	var month=a.getMonth()+1;
	 	var day=a.getDate();
		this.formizes.chargeTimes=year+"年"+month+"月"+day+"日";
		
	 },
	 timeStr(dataStr, ff) { //转时间的方法
	  				var date = new Date(dataStr);
	  				var y = date.getFullYear();
	  				var m = date.getMonth() + 1;
	  				m = m < 10 ? ('0' + m) : m;
	  				var d = date.getDate();
	  				d = d < 10 ? ('0' + d) : d;
	  				var h = date.getHours();
	  				h = h < 10 ? ('0' + h) : h;
	  				//获得分
	  				var mm = date.getMinutes()
	  				mm = mm < 10 ? ('0' + mm) : mm;
	  				//获得秒
	  				var ss = date.getSeconds()
	  				ss = ss < 10 ? ('0' + ss) : ss;
	  				if (!ff) {
	  					return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss;
	  				} else {
	  					return y + '-' + m + '-' + d
	  				}
	  			},
	 /* 升级会员*/
	 addMemberCus(){
		 this.$confirm('是否将'+this.lookmember.crName+'升级为会员?', '提示', {
		 	confirmButtonText: '确定',
		 	cancelButtonText: '取消',
		 	type: 'warning'
		 }).then(() => {
			 this.dialogFormVisibles=true
			 this.getsjsum()
		 	//调用post请求
		 }).catch(() => {
		 	this.$message({
		 		type: 'info',
		 		message: '已取消停用'
		 	});
		 });
	 },
	 /* 查看详情*/
	 addMember(row){
	 		 this.lookmember={...row}
	 		 this.drawer = true
	 		 console.log("这位是row",this.lookmember)
	 },
	 /* 查询所有*/
	 loadData() {
	 	let params = {
	 		...this.formize
	 	}; /* 这个部分最终要组合成后台的ModelAttribute指定的对象 */
	 	params["pageNo"] = this.pageNo;
	 	params["pageSize"] = this.pageSize;
	 	console.log("par", params);
	 	//get请求传参的方式不要忘记params的键
	 	this.axios.get("member/searches", {
	 			params: params,
	 		})
	 		.then(res => {
	 			this.customer = res.data.list;
	 			this.total = res.data.total;
				console.log("this.is",this.customer)
	 		})
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