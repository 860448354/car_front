<template>
	<el-form :model="mainint">
		<el-input class="inp" v-model="mainint.custName" placeholder="请输入客户名"></el-input>
		<el-input class="inp" v-model="mainint.custEmpName" placeholder="维修工姓名"></el-input>
		<el-input class="inp" v-model="mainint.custCarId" placeholder="车牌号"></el-input>
		<el-input class="inp" v-model="mainint.custCarType" placeholder="车辆名称"></el-input>
		<el-button class="but1" @click="selectMaint()">
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
		<el-table-column prop="materialCost" label="材料费用" align="center" />
		<el-table-column label="操作" align="center">
			<template #default="scope">

				<el-button size="mini" type="danger" @click="confirmDispatching(scope.$index, scope.row)">
					{{scope.row.materialCost > 0?"生成付款单" : scope.row.materialCost == 0?"领料":"领料"}}
				</el-button>
			</template>
		</el-table-column>
	</el-table>


	<el-dialog title="材料" v-model="dialogVisible">
		<el-select v-model="store2" style="margin-top: 20px;margin-left: 20px" @change="test" placeholder="请选择">
			<el-option v-for="item in store" :key="item.storeName" :label="item.storeName" :value="item.storeName">
			</el-option>
		</el-select>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="repeCommName" label="材料名称" />
			<el-table-column prop="repeCommMoney" label="单价" />
			<el-table-column prop="repeCommUnit" label="单位" />
			<el-table-column prop="repeCommNum" label="数量" />

			<el-table-column label="数量" align="center">
				<template v-slot="scope">
					<el-input v-model="scope.row.numberSu" type="number"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template #default="scope">
					<el-button size="mini" type="danger" @click="insetNumber(scope.$index, scope.row)">
						添加
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="insetPicking()" v-if="ifLing">确 定</el-button>
			</span>

		</template>
	</el-dialog>



</template>

<script>
	import dayjs from 'dayjs'
	export default {
		data() {
			return {
				maintList: [],
				mainint: {},
				dialogVisible: false,
				tableData: [],
				ifLing: false,
				lingQu: [],
				store2: '一号仓库',
				store: [{
					storeName: ''
				}],
				mdId: null,
				money:0
			}
		},
		methods: {
			selectMaint() {
				let maintVo = {
					custName: this.mainint.custName,
					custEmpName: this.mainint.custEmpName,
					custCarId: this.mainint.custCarId,
					custCarType: this.mainint.custCarType
				}
				this.axios.post("maint/all", maintVo).then(res => {
					console.log(res.data, "这是查询所有的派工")
					this.maintList = res.data;
				})
			},
			confirmDispatching(index, row) {
				console.log(row,"11111111111111111111111111111111111111111111111")
			
				if(row.materialCost>0){
					
					let almoney = row.materialCost+row.moneyMaint
					alert('生成付费单')
					console.log("新增主键",row.carMessage.carMessageId)
					this.axios.get("comple/insertComp",{
						params:{
							carMessageId:row.carMessage.carMessageId
							, 
							alMoney:almoney
							, 
							sfId:row.staff.sfId
						}
					}).then(res=>{
						console.log(res,"=================")
					})
					
				}
				
				
				
				
				
				if(row.materialCost==0){
					this.dialogVisible = true;
					this.mdId = row.mdId
				}
			},
			selectComm() {
				this.axios({
					url: "hyj/findRe",
					params: {
						store: this.store2
					}
				}).then(res => {
					this.tableData = res.data
					console.log(this.tableData, "这是数据")
				})
			},
			insetNumber(index, row) {
				if (row.numberSu > 0) {
					this.lingQu.push(row)
					this.ifLing = true;
				}

			},
			insetPicking() {
				console.log(this.lingQu, "这是领取材料的信息")
					this.money = 0.00;
				this.lingQu.forEach(i => {
					console.log(i, "这是遍历领取的值")
					this.money = this.money + (i.repeCommMoney*i.numberSu)
					console.log(i.repeCommId, "这是遍历领取的id")
					console.log(i.numberSu, "这是遍历领取的数量")
					this.axios.get("picking/insertPick", {
						params: {
							mdId: this.mdId,
							lpId: i.repeCommId,
							pickingNum: i.numberSu
						}
					}).then(res => {
						console.log(res, "这是维修派工主键")
						
					})
					
				})
				this.axios.get("maint/updateDis",{
					params:{
						money:this.money,
						mdId:this.mdId
					}
				}).then(res=>{
					this.selectMaint();
				})
				console.log("money",this.money)
				this.dialogVisible = false;

			},
			test() {
				this.axios({
					url: "hyj/findRe",
					params: {
						store: this.store2
					}
				}).then(res => {
					this.tableData = res.data
					console.log(this.tableData, "---------------------------------------")
				})
			},
			findStore() {
				this.axios.get("hyj/findAllStore").then(res => {
					this.store = res.data;
				})
			},


			
		},
		mounted() {
			this.selectMaint();
			this.selectComm();
			this.findStore();
			this.test();
			
		}
	}
</script>

<style scoped="scoped">
	.inp {
		width: 300px;
		margin: 20px 0 20px 50px;
	}
</style>
