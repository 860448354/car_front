<template>
	<el-row style="margin: 15px;">
		<el-col class="riqi" :span="10">
			起止日期
			<el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期"
				end-placeholder="结束日期" @change="change">
			</el-date-picker>
		</el-col>
		<el-col :span="5">
			<el-input v-model="crName" placeholder="客户名称" style="width: 200px;" />
		</el-col>
		<el-col :span="5">
			<el-input v-model="carNumber" placeholder="车牌" style="width: 200px;" />
		</el-col>
		<el-col :span="4">
			<el-button type="primary" size="medium" style="width:100px;" @click="getData()">
				查询</el-button>
		</el-col>
	</el-row>
	<el-row>
		<el-table :data="tabledata" height="270px" @row-click="getAccount">
			<el-table-column fixed="" prop="ccId" label="单号">
			</el-table-column>
			<el-table-column prop="confirmCompleted.completedCarId.carCust.crName" label="供货商名称">
			</el-table-column>
			<el-table-column prop="accountDate" label="结算日期">
			</el-table-column>
			<el-table-column prop="accountDue" label="应付金额">
			</el-table-column>
			<el-table-column prop="accountReceived" label="付款金额">
			</el-table-column>
			<el-table-column prop="accountCoupon" label="优惠金额">
			</el-table-column>
			<el-table-column prop="accountEnter" label="入账方式">
			</el-table-column>
			<el-table-column prop="accountType" label="单据类型">
			</el-table-column>
			<el-table-column prop="staff.sfName" label="操作员">
			</el-table-column>
		</el-table>
	</el-row>
	<el-row>
		<el-table :data="maintenancePickings" height="140px">
			<el-table-column prop="commPicking.repeCommName" label="配件名">
			</el-table-column>
			<el-table-column prop="commPicking.repeCommSpe" label="配件规格">
			</el-table-column>
			<el-table-column prop="commPicking.repeCommCar" label="配件车型">
			</el-table-column>
			<el-table-column prop="commPicking.repeCommUnit" label="配件单位">
			</el-table-column>
			<el-table-column prop="commPicking.repeCommMoney" label="配件单价">
			</el-table-column>
			<el-table-column prop="pickingNum" label="配件数量">
			</el-table-column>
		</el-table>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				tabledata: [],
				value: '',
				crName: '',
				carNumber: '',
				customerAccount: {
					start: '',
					end: '',
					crName: '',
					carNumber: ''
				},
				maintenancePickings: []
			}
		},
		methods: {
			getData() {
				this.customerAccount.carNumber = this.carNumber;
				this.customerAccount.crName = this.crName;
				if (this.value != null) {
					this.customerAccount.start = this.value[0];
					this.customerAccount.end = this.value[1];
				}
				this.axios.post(
					'/account/sel-customerAccount',
					this.customerAccount
				).then((res) => {
					console.log(res.data)
					this.tabledata = res.data;
				}).catch(() => {})
			},
			getAccount(row) {
				this.maintenancePickings = row.confirmCompleted.completedCarId.maintenancePickings;
			},
			//清空日期框
			change(value) {
				if (value == null) this.value = '' // value = [] 
			},
		},
		created() {
			this.getData();
		}
	}
</script>

<style>
</style>
