<template>
	<el-row style="margin: 15px;">
		<el-col :span="6">
			<el-input v-model="crName" placeholder="客户名称" style="width: 200px;" />
		</el-col>
		<el-col :span="6">
			<el-input v-model="carNumber" placeholder="车牌号" style="width: 200px;" />
		</el-col>
		<el-col :span="10">
			<el-button type="primary" style="width: 100px;" @click="getData()">查询</el-button>
			<el-button type="primary" style="width: 100px;" @click="dialogFormVisible = true">收款</el-button>
		</el-col>
	</el-row>
	<el-row>
		<el-table :data="tabledata" height="270px" @row-click="payment">
			<el-table-column fixed="" prop="ccId" label="单号">
			</el-table-column>
			<el-table-column prop="completedCarId.carCust.crName" label="客户名称">
			</el-table-column>
			<el-table-column prop="completedCarId.carNumber" label="车牌号">
			</el-table-column>
			<el-table-column prop="completedCarId.carType" label="车型">
			</el-table-column>
			<el-table-column prop="maintenanceAmount" label="维修价格">
			</el-table-column>
			<el-table-column prop="completedTime" label="完工时间">
			</el-table-column>
			<el-table-column prop="empWx.sfName" label="维修员">
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
	<el-dialog title="收款" v-model="dialogFormVisible" width="30%" @close="clearForm()">
		<el-form :model="customerAccount" label-width="80px" ref="customerAccount" :rules="customerAccounts">
			<el-form-item prop="ccId" label="业务单号">
				<el-input v-model="customerAccount.ccId" disabled></el-input>
			</el-form-item>
			<el-form-item prop="accountDue" label="应付金额">
				<el-input v-model="customerAccount.accountDue" disabled></el-input>
			</el-form-item>
			<el-form-item prop="accountReceived" label="付款金额">
				<el-input type="number" v-model="customerAccount.accountReceived" @keydown="handleInput2"></el-input>
			</el-form-item>
			<el-form-item prop="accountEnter" label="入账方式">
				<el-input v-model="customerAccount.accountEnter"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="clearForm(),dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="getPayment()">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				tabledata: [],
				dialogFormVisible: false,
				maintenancePickings:[],
				crName:'',
				carNumber:'',
				customerAccount: {
					ccId: '',
					crId:'',
					accountDue: 0,
					accountReceived: 0,
					accountCoupon: 0,
					accountMoney: 0,
					accountEnter: '',
					accountType: '修理结算单',
					sfId: '',
					sfName: '',
				},
				account:{
					crName:'',
					carNumber:''
				},
				customerAccounts: {
					customerReceived: [{
						required: true,
						message: '请输入付款金额',
						trigger: 'blur'
					}],
					customerEnter: [{
						required: true,
						message: '请输入入账方式',
						trigger: 'blur'
					}],
				}
			}
		},
		methods:{
			getData(){
				this.account.crName = this.crName;
				this.account.carNumber = this.carNumber;
				this.axios.post(
					'/account/sel-confirm',
					this.account
				).then((res) => {
					console.log("1111")
					console.log(res.data)
					this.tabledata = res.data;
				}).catch(() => {})
			},
			payment(row){
				this.maintenancePickings = row.completedCarId.maintenancePickings;
				this.customerAccount.accountDue = row.maintenanceAmount;
				this.customerAccount.ccId = row.ccId;
				this.customerAccount.crId = row.completedCarId.carCust.crId;
			},
			getPayment() {
				this.customerAccount.sfId = this.$store.state.message.myStaff.sfId;
				this.customerAccount.sfName = this.$store.state.message.myStaff.sfName;
				this.$refs['customerAccount'].validate((valid) => {
					if (valid) {
						if (this.customerAccount.accountReceived == this.customerAccount.accountDue) {
							this.axios.post(
								'/account/add-customerAccount',
								this.customerAccount
							).then((res) => {
								if (res.data == 'ok') {
									this.$message.success("新增成功");
									this.customerAccount.ccId = '';
									this.customerAccount.crId = '';
									this.customerAccount.accountDue = 0;
									this.customerAccount.accountReceived = 0;
									this.customerAccount.accountCoupon = 0;
									this.customerAccount.accountMoney = 0;
									this.customerAccount.accountEnter = '';
									this.customerAccount.accountType = '';
									this.customerAccount.sfId = '';
									this.dialogFormVisible = false;
									this.getData();
									this.purXq = [];
								} else if (v.data == 'fail') {
									this.$message.error("新增失败");
								}
							}).catch(() => {})
						} else if (this.customerAccount.accountReceived < this.customerAccount.accountDue) {
							this.$message.error("不可低于实际应付金额");
						} else if (this.customerAccount.accountReceived > this.customerAccount.accountDue) {
							this.$message.error("不可高于实际应付金额");
						}
					} else {
						this.$message.error("请输入必填项");
						return false;
					}
				})
			},
			clearForm() {
				this.customerAccount.ccId = '';
				this.customerAccount.crId = '';
				this.customerAccount.accountDue = 0;
				this.customerAccount.accountReceived = 0;
				this.customerAccount.accountCoupon = 0;
				this.customerAccount.accountMoney = 0;
				this.customerAccount.accountEnter = '';
				this.customerAccount.accountType = '';
				this.customerAccount.sfId = '';
			}
		},
		created() {
			this.getData();
		}
	}
</script>

<style>
</style>
