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
			<!-- <el-button type="primary" icon="el-icon-edit" circle ></el-button> -->
	<!-- 		<el-button type="success" v-print="printObj">打印</el-button> -->
			<el-button @click="exportExcel">导出</el-button>
			
			<div id="loading" v-show="printLoading"></div>
		</el-form-item>
	</el-form>
	<el-table  :data="memberes" style="width: 100%;margin-left: 20px;" align="center"
	id="printMe">
		<!-- <el-table-column label="编号" width="80">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.vehiid }}</span>
			</template>
		</el-table-column> -->
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
		<el-table-column label="累计消费次数" width="130">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.memSum }}</span>
			</template>
		</el-table-column>
		<el-table-column label="会员积分" width="100">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.memIntegral }}</span>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template #default="scope">
				<el-button @click="addMember(scope.row)" type="primary" style="margin-left: 16px;">
				  查看会员信息
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
					<p>{{lookmember.crId.crName}}</p>
					<p>{{lookmember.crId.crPhone}}</p>
				</div>
			</div>
		 </div>
		 <div style="height: 180px;
		 width: 450px;box-shadow: darkgrey 10px 10px 30px 5px ;border-radius:10px;
		 margin-left: 580px;margin-top: -180px;">
		 <br />
		  <span style="margin-left: 20%;font-size: 20px;">累计消费次数</span>
		  <span style="margin-left: 20%;font-size: 20px;">余额</span>
		  <br><br>
		  <span style="margin-left: 25%;font-size: 40px;">{{lookmember.memSum}}</span>
		  <span style="margin-left: 38%;font-size: 40px;">{{lookmember.memIntegral}}</span>
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
	
	<el-dialog
	    title="会员充值"
	    v-model="dialogFormVisibles"
	    width="50%"
	    :before-close="handleClose">
		<hr>
		<!-- <el-table :data="dalit" style="border: none; border-right: none;border-left: none;">
			  <el-table-column prop=""  width="120" >物体名称：{{dalit.listname}}</el-table-column>
		</el-table> -->
		<el-form @submit.native.prevent style="height: 400px;">
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
			<span  style="margin-left: 15px;float: right;margin-top: 20px;">
					累计消费次数：<el-tag style="width: 150px;">{{addhuiyuans.memSum}}</el-tag>
			</span>
			<br />
			
			<div style="margin-top: 30px;width: 100%; height: 10px; background-color: #00AAFF;">
			</div>
			<el-form :rules="formregular" :model="formize" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="操作人:" style="margin-top: 10px; margin-left: 20px;">
				    <el-span class="sjsumm" v-model="formize.gooduntit"  style="width: 300px;color: red;" >
						 {{formize.gooduntit}}
					</el-span>
				</el-form-item>
				<el-form-item prop="chargeTime"
				style="margin-top: -60px; margin-left: 50%;"
				  label="申请日期:"
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
		options: [{
			value: '0',
			label: '钻石会员'
		}, {
			value: '1',
			label: '白金会员'
		}, {
			value: '2',
			label: '至尊会员'
		}],
      formize: {
		  chargeTime:'',
		  prozw:'',
		  chargeBalance:0,
		  chargeMenoy:0
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
	  addhuiyuans:{}
    };
  },
 methods: {
	 install(){
		 console.log("this?",this.addhuiyuans.crId.crId)
		this.axios.post("charge/insterall",{
			 chargeTime:this.formize.chargeTime,
			 chargeMenoy:this.formize.chargeMenoy,
			 chargeBalance:this.formize.chargeBalance,
			 chargeKhid:{crId:this.addhuiyuans.crId.crId}
		 }).then(res=>{
			 
		 })
	 },
	 testUser(){
		this.formize.chargeBalance = parseInt(this.formize.chargeMenoy) + parseInt(this.addhuiyuans.memBalance);
	 	this.smallToBIGes();
	 },
	 /* 计算金额为中文*/
	 smallToBIGes() {
	 	if(this.formize.chargeMenoy!=null){
	 		console.log("this.formize.chargeMenoy",this.formize.chargeMenoy)
	 		  let price = Math.abs(this.formize.chargeMenoy);
	 		    let fraction = ['角', '分'];
	 		    let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	 		    let unit = [['圆.', '万,', '亿,'], ['', '拾', '佰', '仟']];
	 		    let head = price < 0 ? '欠' : '';
	 		   
	 		    let upper = '';
	 		    for (let i = 0; i < fraction.length; i++) {
	 		      upper += (digit[Math.floor(price * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	 		    }
	 		    upper = upper || '整';
	 		    price = Math.floor(price);
	 		    for (let i = 0; i < unit[0].length && price > 0; i++) {
	 		      let p = '';
	 		      for (let j = 0; j < unit[1].length && price > 0; j++) {
	 		        p = digit[price % 10] + unit[1][j] + p;
	 		        price = Math.floor(price / 10);
	 		      }
	 		      upper = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + upper;
	 		    }
	 			   
	 		    this.formize.prozw = head + upper.replace(/(零.)*零圆/, '圆').replace(/(零.)+/g, '零').replace(/^整$/, '零圆整')
	 		    // console.log(head + upper.replace(/(零.)*零圆/, '圆').replace(/(零.)+/g, '零').replace(/^整$/, '零圆整'))
	 		     console.log("t67",this.formize.prozw)
	 				
	 	}
	 	
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
		 this.drawer = true
		 console.log("这位是row",this.lookmember)
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
		 this.dialogFormVisibles=true
		 this.getsjsum()
		 
	 },
	 handleClick(tab, event) {
	         console.log(tab, event);
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
  },
  mounted() {
  	/* 钩子函数 */
  	this.loadData();
  }
};
 
</script>
 
<style scoped="scoped">
	
</style>