<!-- 客户信息 -->
<template>
	<el-form :inline="true" :model="formize" class="demo-form-inline">
	
		<el-form-item style="margin-left: 20px;">
			<el-input v-model="formize.vehiname"  placeholder="请输入客户姓名"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="formize.vehinumberplate" placeholder="请输入客户等级"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button icon="el-icon-search" circle @click="onSubmit"></el-button>
			<el-button type="primary" icon="el-icon-edit" circle @click="addche()"></el-button>
	<!-- 		<el-button type="success" v-print="printObj">打印</el-button> -->
			<el-button @click="exportExcel">导出</el-button>
			<el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
			  查看客户信息
			</el-button>
			<div id="loading" v-show="printLoading"></div>
		</el-form-item>
	</el-form>
	<el-table  :data="cheliang" style="width: 100%;margin-left: 20px;" align="center"
	id="printMe">
		<el-table-column label="客户编号" width="80">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.vehiid }}</span>
			</template>
		</el-table-column>
		<el-table-column label="客户姓名" width="100">
			<template #default="scope">
				<!-- <el-color-picker v-model="formes.vehicolor" show-alpha :predefine="predefineColors">
				</el-color-picker> -->
				<div :style="{'background-color':`${scope.row.vehicolor}`}" style="width: 30px;height: 30px;margin-left: 8px;"></div>
			</template>
		</el-table-column>
		<el-table-column label="客户电话" width="130">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.vehiname }}</span>
			</template>
		</el-table-column>
		<el-table-column label="客户性别" width="100">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.vehigalleryful }}</span>
			</template>
		</el-table-column>
		<el-table-column label="累计消费次数" width="130">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.vehinewolder }}</span>
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
	<el-drawer
	  title="客户信息"
	  v-model="drawer"
	  size="50%">
	 <!-- 内容-->
	</el-drawer>
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
				<img src="../../public/img/用户默认头像.png" style="margin-top: 20px;margin-left: 20px;"/>
				<div style="margin-left: 160px;margin-top: -130px;">姓名</div>
			</div>
		 </div>
		 <div style="height: 180px;
		 width: 450px;box-shadow: darkgrey 10px 10px 30px 5px ;border-radius:10px;
		 margin-left: 580px;margin-top: -180px;">
		 <br />
		  <span style="margin-left: 20%;font-size: 20px;">累计消费次数</span>
		  <span style="margin-left: 20%;font-size: 20px;">余额</span>
		  <br><br>
		  <span style="margin-left: 25%;font-size: 40px;">0</span>
		  <span style="margin-left: 38%;font-size: 40px;">0</span>
		 </div>
		<el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 40px;margin-left: 40px;">
		    <el-tab-pane label="会员信息" name="first" >
				<div style="height:300px;overflow-y:auto">
				<el-descriptions title="用户信息">
				    <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
				    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
				    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
				    <el-descriptions-item label="备注">
				      <el-tag size="small">学校</el-tag>
				    </el-descriptions-item>
				    <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
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
</template>
 
<script>
export default {
  name: "",
  data() {
    return {
      formize: {},
	  pageNo: 1,
	  pageSize: 5,
	  total: 0,
	  drawer: false,
	  innerDrawer: false,
    };
  },
 methods: {
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
</style>