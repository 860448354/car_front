<template>

	
	<el-row>
		<el-col :span="9">
			<div class="grid-content bg-purple">
			</div>
		</el-col>
		<el-col :span="2">
			<div class="grid-content bg-purple">
				<h1 style="color: #606266" id="hotel_two">客户招待</h1>
			</div>
		</el-col>
		<el-col :span="4">
			<div class="grid-content bg-purple">
			</div>
		</el-col>
	</el-row>
	<div style="margin: 100px 0px 50px 80px; font-size: 20px; border-bottom: 1px solid  black; width: 70%;">客户信息</div>
	<el-form ref="form" :model="forms" label-width="80px">
		
		<el-row>
			<el-col :span="1">
				<div class="grid-content bg-purple">
				</div>
			</el-col>

			<el-col :span="5">
				<el-form-item label="客户编号">
					<el-input v-model="forms.crId" disabled placeholder="提交后自动生成"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="1">
				<div class="grid-content bg-purple">
				</div>
			</el-col>
			<el-col :span="5">
				<el-form-item label="客户姓名">
					<el-input v-model="forms.crName" placeholder="请输入姓名"></el-input>
				</el-form-item>

			</el-col>
			<el-col :span="1">
				<div class="grid-content bg-purple">
				</div>
			</el-col>
			<el-col :span="5">
				<el-form-item label="客户电话">
					<el-input v-model="forms.crPhone" placeholder="请输入电话号码"></el-input>
				</el-form-item>

			</el-col>
		</el-row>
		<el-row>
			<el-col :span="1">
				<div class="grid-content bg-purple">
				</div>
			</el-col>
			<el-col :span="5">
				<el-form-item label="身份证号">
					<el-input v-model="forms.crIdNumber"  placeholder="输入客户性别"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="1">
				<div class="grid-content bg-purple">
				</div>
			</el-col>
			<el-col :span="5">
				<el-form-item label="客户性别">
					<el-input v-model="forms.crSex"  placeholder="输入客户性别"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="1">
				<div class="grid-content bg-purple">
				</div>
			</el-col>
			<el-col :span="5">
				<el-form-item label="登记时间">
					<el-input v-model="forms.crTime" disabled placeholder="登记时间"></el-input>
				</el-form-item>

			</el-col>
		</el-row>
	</el-form>
	
	
	
	
	<div style="width: 90%; margin: auto;">
		<div style="margin: 100px 0px 50px 0px; font-size: 20px; border-bottom: 1px solid  black;">车辆信息</div>
		
		<el-button size="mini" @click="addTable()">添加详情</el-button>
	
	<el-table :data="worktableData" style="width: 90%">
		<el-table-column label="车牌号" width="400" align="center">
			<template #default="scope">
				<el-input v-model="scope.row.carNumber" :readonly="flags"></el-input>
			</template>
		</el-table-column>
		<el-table-column label="车辆型号" width="400" align="center">
			<template #default="scope">
				<el-input v-model="scope.row.carType" :readonly="flags"></el-input>
			</template>
		</el-table-column>
		<el-table-column label="操作" align="center" width="400">
			<template #default="scope">
	
				<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
				</el-button>
			</template>
		</el-table-column>
	</el-table>
	</div>
	<div style="width:71%; margin: auto; margin-top: 50px;">
		<div style="margin-left: 380px;">
			<el-button type="primary" size="mini" @click="insertReimbur()">新增</el-button>
		</div>
		
	</div>
	
</template>

<script>
	import dayjs from 'dayjs'
	export default {
		data() {
			return {
				forms: {
					crTime:dayjs().format("YYYY-MM-DD HH:mm:ss")
				},
				worktableData:[]
			}
		},
		methods:{
			//车辆新增一行
			addTable() {
				
				let obj = {
					carNumber: '',
					carType: '',
					
				}
				this.worktableData.push(obj);
			
			},
			//车辆删除一行
			handleDelete(index, row) {
				console.log(index, row);
				this.worktableData.splice(index, 1);
			},
			insertReimbur(){
				console.log(this.worktableData,"这是车辆")
				console.log(this.forms.crTime,"123");
				let CarCustVo = {
						 crId:this.forms.crId, //客户id
					     crName:this.forms.crName, //客户姓名
					     crPhone:this.forms.crPhone,//客户电话号
					     crIdNumber:this.forms.crIdNumber,//客户身份证号
					     crSex:this.forms.crSex,//客户性别
					     crTime:this.forms.crTime,//登记时间
					     carMessages:this.worktableData
				}
				
				this.axios.post("customer/insertCustAndCar",CarCustVo).then(res=>{
						console.log(res,"000000000")
					
				})
			}
		}

	}
</script>

<style>
</style>

