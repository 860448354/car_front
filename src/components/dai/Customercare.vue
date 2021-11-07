<!--客户关怀 -->
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
			<el-button type="primary"  @click="addCustomer">+关怀</el-button>
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
	<!-- 新增关怀 -->
	<el-dialog
	    v-model="dialogFormVisibles"
	    width="50%"
	    :before-close="handleClose">
		<div style="width: 100%; height: 10px; background-color: #00AAFF;"></div>
	    <el-form @submit.native.prevent :model="cc" :rules="formregular" style="margin-top: 80px;margin-left: 30px;">
			<el-form-item prop="chargeTime"
			style="margin-top: -60px; "
			  label="关怀日期:"
			>
			<el-span class="sjsumm"  style="width: 300px" >
			</el-span>	
			</el-form-item>
			<el-form-item prop="apptheme" label="关怀主题:" style="float: right;margin-top: -50px;">
			   <el-input type="text" style="width: 200px;"></el-input>
			</el-form-item>
			<el-form-item prop="apptheme" label="执行人:">
				     <el-span class="sjsumm"  style="width: 300px" >
				     </el-span>	
			</el-form-item>
				  <el-form-item  label="关怀人员:">
						  <div v-for="ll in fruitesisname" >
						  	<div style="border-radius:10px;width: 15%;height: 30px;  
						  	background: rgba(89,139,240,.1);float: left;margin-left: 10px;
						  	margin-top: 10px;text-align: center;">
						  		{{ll.name2}}
						  	</div>
						  </div>
						  <a
					  type="primary" @click="innerVisible = true"
					  style="margin-left: 10px;"><img src="../../../public/img/用户.png"></a>
				  </el-form-item>
				  <el-form-item prop="apptheme" label="关怀内容:"><br>
				     <el-input type="textarea" style="width: 550px;"></el-input>
				  </el-form-item>
	    </el-form>
	    <span slot="footer" class="dialog-footer">
	        <el-button @click="dialogFormVisibles = false">取 消</el-button>
	        <el-button type="primary" @click="dialogFormVisibles = false; install()">确 定</el-button>
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
			  					  
			  					  <el-form-item style="width: 200px;">
			  					   <el-input  placeholder="搜索用户"></el-input>
			  					  </el-form-item>
			  					  <el-form-item>
			  						<el-button icon="el-icon-search" circle @click="onSubmit" ></el-button>
			  					  </el-form-item>
			  	</el-form>
				<!-- 部门角色查询 -->
					<el-tabs  @tab-click="handleClickes" style="margin-top:-50px;margin-left:  20px; font-size: 50px; width: 40%;">
						<el-tab-pane  label="部门" name="0"></el-tab-pane>
					</el-tabs>
				<!-- 隔壁选人 -->
				<div   style="width: 55%;float: right;margin-top: -100px;height: 300px;overflow-y:auto">
				<el-checkbox style="margin-left: -50px;" :checked="tableData.length===fruitIds.length && fruitIds.length"
					     :key="fruitIds"      @click="checkedAll" >全选</el-checkbox>
				  <!-- <div
				     :v-show="showEmpty==false?true:false"
				    >
				
					<el-checkbox-group v-model="tableData"  @change="handleCheckedCitiesChange">
					  <el-checkbox class="layers-item-selector">{{tableData}}</el-checkbox>
					</el-checkbox-group>
				    </div> -->
					 <div >
					    <div 
						style="width: 151px; height: 50px;
						border-radius:15px;float: left;margin-top: 10px;"
						v-for="fruite in tableData"
					         :key="fruite.empid"
					         class="fruiteList">
					      <input type="checkbox"
					             :checked="fruitIds.indexOf(fruite.empid)>=0"
					             name="checkboxinput"
					             class="input-checkbox"
					             @click="checkedOne(fruite)">
					      <label>{{fruite.name2}}</label>
					    </div>
					  </div>
					
					  <el-empty description="描述文字" v-show="showEmpty"></el-empty>
				</div>
				<div style="float:right;margin-top: -100px;width: 1px;height: 300px; background: darkgray;"></div>
				<!-- 树形结构 -->
				
				<div style="overflow-y:auto">
				  <el-tree
				  style="height: 200px; font-size: 30px; width: 50%;"
				  :data="data"
				  :props="defaultProps"
				 @node-click="handleNodeClick"
				></el-tree>
				</div>
				<hr />
				<div style="width: 100%; height: 300px; " >
					<p>已选择0人</p>
					<div v-for="ll in fruitIdes" >
						<div style="border-radius:10px;width: 20%;height: 30px;  
						background-color: #00AAFF; color: white;float: left;margin-left: 10px;
						margin-top: 10px;font-size: 20px;text-align: center;margin-top: 10px;">
							{{ll.name2}}
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
      formize: {},
	  pageNo: 1,
	  pageSize: 5,
	  total: 0,
	  drawer: false,
	  innerDrawer: false,
	  dialogFormVisibles:false,
	  innerVisible:false
    };
  },
 methods: {
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
	         this.tableData.forEach(item => {
	 			this.fruitIds.push(item.empid)
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
</style>