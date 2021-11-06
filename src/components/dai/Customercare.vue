<!--客户关怀 -->
<template>
	<el-form :inline="true" :model="formize" class="demo-form-inline">
	
		<el-form-item style="margin-left: 20px;">
			<el-input v-model="formize.vehiname"  placeholder="请输入活动主题"></el-input>
		</el-form-item>
		<!-- <el-form-item>
			<el-input v-model="formize.vehinumberplate" placeholder="请输入会员等级"></el-input>
		</el-form-item> -->
		<el-form-item>
			<el-button icon="el-icon-search" circle @click="onSubmit"></el-button>
			<el-button type="primary" icon="el-icon-edit" circle @click="addche()"></el-button>
	<!-- 		<el-button type="success" v-print="printObj">打印</el-button> -->
			<el-button @click="exportExcel">导出</el-button>
			<el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
			  查看客户关怀信息
			</el-button>
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
		<el-table-column label="序号" width="100">
			<template #default="scope">
				<!-- <el-color-picker v-model="formes.vehicolor" show-alpha :predefine="predefineColors">
				</el-color-picker> -->
				<div :style="{'background-color':`${scope.row.vehicolor}`}" style="width: 30px;height: 30px;margin-left: 8px;"></div>
			</template>
		</el-table-column>
		<el-table-column label="关怀主题" width="130">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.vehiname }}</span>
			</template>
		</el-table-column>
		<el-table-column label="联系人" width="100">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.vehigalleryful }}</span>
			</template>
		</el-table-column>
		<el-table-column label="日期" width="130">
			<template #default="scope">
				<span style="margin-left: 10px">{{ scope.row.vehiname }}</span>
			</template>
		</el-table-column>
		<el-table-column label="执行人" width="100">
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