<template>
	<el-row style="margin: 15px;">
		<el-col class="riqi" :span="10">
			起止日期
			<el-date-picker v-model="paymentTime" type="daterange" range-separator="至" start-placeholder="开始日期"
				end-placeholder="结束日期" @change="change">
			</el-date-picker>
		</el-col>
		<el-col :span="5">
			<el-input v-model="input" placeholder="供应商名称" style="width: 200px;" />
		</el-col>
		<el-col :span="4">
			<el-button type="primary" size="medium" style="width:100px;" @click="getData()">
				查询</el-button>
		</el-col>
	</el-row>
	<el-row>
		<el-table :data="tabledata" height="270px" @row-click="getPurOrders">
			<el-table-column fixed="" prop="purOrder" label="订单号" width="200px">
			</el-table-column>
			<el-table-column prop="supplierName" label="供货商名称" width="150px">
			</el-table-column>
			<el-table-column prop="vendorDate" label="结算日期" width="100px">
			</el-table-column>
			<el-table-column prop="vendorDue" label="应付金额" width="100px">
			</el-table-column>
			<el-table-column prop="vendorReceived" label="付款金额" width="150px">
			</el-table-column>
			<el-table-column prop="vendorCoupon" label="优惠金额" width="150px">
			</el-table-column>
			<el-table-column prop="vendorEnter" label="入账方式" width="150px">
			</el-table-column>
			<el-table-column prop="vendorType" label="单据类型" width="200px">
			</el-table-column>
			<el-table-column prop="staff.sfName" label="操作员" width="100px">
			</el-table-column>
		</el-table>
	</el-row>
	<el-row>
		<el-table :data="purXq" height="140px">
			<el-table-column prop="commName" label="配件名">
			</el-table-column>
			<el-table-column prop="commSpe" label="配件规格">
			</el-table-column>
			<el-table-column prop="commCar" label="配件车型">
			</el-table-column>
			<el-table-column prop="commUnit" label="配件单位">
			</el-table-column>
			<el-table-column prop="commMoney" label="配件单价">
			</el-table-column>
			<el-table-column prop="commNum" label="配件数量">
			</el-table-column>
		</el-table>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				tabledata: [],
				purXq:[],
				paymentTime: '',
				input: '',
				vendorAccount: {
					start: '',
					end: '',
					supplierName: ''
				}
			}
		},
		methods: {
			getData() {
				this.vendorAccount.supplierName = this.input;
				this.vendorAccount.start = this.paymentTime[0];
				this.vendorAccount.end = this.paymentTime[1];
				this.axios.post(
					'/account/sel-vendorAccount',
					this.vendorAccount
				).then((res) => {
					this.tabledata = res.data;
				}).catch(() => {})
			},
			getPurOrders(row){
				console.log(row.purchase.purXq)
				this.purXq = row.purchase.purXq;
			}
		},
		created() {
			this.getData();
		}
	}
</script>

<style>
</style>
