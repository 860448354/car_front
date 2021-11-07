<template>
	<el-form :model="dispat">
			<el-input class="inp" v-model="dispat.custName" placeholder="请输入客户名"></el-input>
			<el-input class="inp" v-model="dispat.custPhone" placeholder="电话号码"></el-input>
			<el-input class="inp" v-model="dispat.crNum" placeholder="请输入身份证"></el-input>
			<el-input class="inp" v-model="dispat.sex" placeholder="性别"></el-input>
			<el-button class="but1" @click="selectPage()">
				查询
			</el-button>
		</el-form>
	<el-table :data="maintList" style="width: 100%">
		<el-table-column prop="customer.crName" label="客户姓名" align="center" />
	<el-table-column prop="staff.sfName" label="维修工姓名" align="center" />
	<el-table-column prop="dispatchingState" label="派工状态" align="center" />
	<el-table-column prop="dispatchingTime" label="派工时间" align="center" />
	<el-table-column prop="carMessage.carNumber" label="车牌号" align="center" />
	<el-table-column prop="carMessage.carType" label="车辆名称" align="center" />
	<el-table-column prop="moneyMaint" label="派工金额" align="center" />
	<el-table-column label="操作" align="center" >
		<template #default="scope">
	
			<el-button size="mini" type="danger" @click="confirmDispatching(scope.$index, scope.row)">
				领料
			</el-button>
		</template>
	</el-table-column>
	</el-table>
	
</template>

<script>
	export default {
		data() {
			return {
				maintList:[],
				dispat:{}
			}
		},
		methods: {
			selectMaint(){
				this.axios.get("maint/all").then(res=>{
					console.log(res.data,"这是查询所有的派工")
					this.maintList = res.data;
				})
			}
		},
		mounted() {
			this.selectMaint();
		}
	}
</script>

<style scoped="scoped">
	.inp{
		width: 300px;
		margin: 20px 0 20px 50px;
	}
</style>
