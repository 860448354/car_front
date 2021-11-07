<template>
	<el-row style="margin: 15px;">
		<el-col :span="6">
			<el-input v-model="supplierName" placeholder="供货商名称" style="width: 200px;" />
		</el-col>
		<el-col :span="10">
			<el-button type="primary" style="width: 100px;" @click="getPurchase()">查询</el-button>
			<el-button type="primary" style="width: 100px;" @click="dialogFormVisible = true,payment()">付款</el-button>
		</el-col>
	</el-row>
	<el-row>
		<el-table :data="purchase" height="270px" @row-click="payment">
			<el-table-column fixed="" prop="purOrder" label="订单号" width="200px">
			</el-table-column>
			<el-table-column prop="supplierName" label="供货商名称" width="150px">
			</el-table-column>
			<el-table-column prop="storeName" label="仓库名" width="100px">
			</el-table-column>
			<el-table-column prop="purTime" label="采购日期" width="100px">
			</el-table-column>
			<el-table-column prop="sfName" label="采购员" width="150px">
			</el-table-column>
			<el-table-column prop="auditTime" label="交货日期" width="150px">
			</el-table-column>
			<el-table-column prop="purMoney" label="总金额" width="150px">
			</el-table-column>
			<el-table-column prop="purName" label="制单人" width="200px">
			</el-table-column>
			<el-table-column prop="purRemark" label="备注" width="100px">
			</el-table-column>
			<el-table-column prop="purState" label="状态" width="100px">
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
	<el-dialog title="付款" v-model="dialogFormVisible" width="30%" @close="clearForm()">
		<el-form :model="vendorAccount" label-width="80px">
			<el-form-item prop="purOrder" label="订单号">
				<el-input v-model="vendorAccount.purOrder" disabled ></el-input>
			</el-form-item>
			<el-form-item prop="vendorDue" label="应付金额">
				<el-input v-model="vendorAccount.vendorDue" disabled ></el-input>
			</el-form-item>
			<el-form-item prop="vendorReceived" label="付款金额">
				<el-input v-model="vendorAccount.vendorReceived"></el-input>
			</el-form-item>
			<el-form-item prop="vendorCoupon" label="优惠金额">
				<el-input v-model="vendorAccount.vendorCoupon"></el-input>
			</el-form-item>
			<el-form-item prop="vendorEnter" label="入账方式">
				<el-input v-model="vendorAccount.vendorEnter"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="clearForm()">取 消</el-button>
				<el-button type="primary" @click="getPayment()">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				purchase: [],
				dialogFormVisible: false,
				supplierName: '',
				purXq: [],
				vendorAccount: {
					purOrder: '',
					supplierName: '',
					vendorDue: 0,
					vendorReceived: 0,
					vendorCoupon: 0,
					vendorEnter: '',
					vendorType: '配件结算单',
					sfId: '',
					sfName: '',
				}
			}
		},
		methods: {
			getPurchase() {
				this.axios({
					url: '/account/vendor-account',
					params: {
						supplierName: this.supplierName
					}
				}).then((res) => {
					console.log("11111")
					console.log(res)
					this.purchase = res.data;
				}).catch(() => {})
			},
			payment(row) {
				this.purXq = row.purXq;
				this.vendorAccount.supplierName = row.supplierName;
				this.vendorAccount.vendorDue = row.purMoney;
				this.vendorAccount.purOrder = row.purOrder;
			},
			getPayment() {
				this.vendorAccount.sfId = this.$store.state.message.myStaff.sfId;
				this.vendorAccount.sfName = this.$store.state.message.myStaff.sfName;
				this.axios.post(
					'/account/add-vendorAccount',
					this.vendorAccount
				).then((res) => {
					if (res.data == 'ok') {
						this.$message.success("新增成功");
						this.vendorAccount.purOrder = '';
						this.vendorAccount.supplierName = '';
						this.vendorAccount.vendorDue = 0;
						this.vendorAccount.vendorReceived = 0;
						this.vendorAccount.vendorCoupon = 0;
						this.vendorAccount.vendorEnter = '';
						this.vendorAccount.vendorType = '';
						this.vendorAccount.sfId = '';
						this.dialogFormVisible = false;
						this.getPurchase();
						this.purXq = [];
					} else if (v.data == 'fail') {
						this.$message.error("新增失败");
					}
				}).catch(() => {})
			},
			clearForm() {
				this.vendorAccount.purOrder = '';
				this.vendorAccount.supplierName = '';
				this.vendorAccount.vendorDue = 0;
				this.vendorAccount.vendorReceived = 0;
				this.vendorAccount.vendorCoupon = 0;
				this.vendorAccount.vendorEnter = '';
				this.vendorAccount.vendorType = '';
				this.vendorAccount.sfId = '';
			}
		},
		created() {
			this.getPurchase();
		}
	}
</script>

<style>
</style>
