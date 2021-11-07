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
		
	<el-table :data="custList" style="width: 100%">
		<el-table-column type="expand">
			<template #default="props">
				<el-table :data="props.row.crCar" style="width: 100%">
					<el-table-column prop="" label="" />
					<el-table-column prop="carNumber" label="车牌号" />
					<el-table-column prop="carType" label="车辆品牌" />
					<el-table-column prop="carState" label="维修状态" />

					<el-table-column label="操作" align="center" width="400">
						<template #default="scope">

							<el-button size="mini" type="danger" @click="confirmDispatching(scope.$index, scope.row)">
								确认派工
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>

		</el-table-column>

		<el-table-column prop="crName" label="客户姓名" align="center" />
		<el-table-column prop="crPhone" label="客户电话" align="center" />
		<el-table-column prop="crIdNumber" label="客户身份证号" align="center" />
		<el-table-column prop="crSex" label="客户性别" align="center" />
		<el-table-column prop="crTime" label="登记时间" align="center" />
		<el-table-column label="操作" align="center" width="400">
			<template #default="scope">

				<el-button size="mini" type="danger" @click="deleteCust(scope.$index, scope.row)">
					删除
				</el-button>
			</template>
		</el-table-column>
	</el-table>



	<el-dialog title="派工" v-model="dialogVisible">


		<el-form :model="tanChuanFuZhi">
			<el-row>
				<el-col :span="8">
					<el-form-item label="车牌号" :label-width="formLabelWidths">
						{{tanChuanFuZhi.carNumber}}
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="车辆类型" :label-width="formLabelWidths">
						{{tanChuanFuZhi.carType}}
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="状态" :label-width="formLabelWidths">
						{{tanChuanFuZhi.carState}}
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div style="margin-bottom: 20px;"><span>派工时间：{{paiGongTime}}</span></div>
		<div>请选择维修工：</div>
		<el-form-item>
			<el-select v-model="staffByDp.sfId">
				<el-option v-for="sta in staffByDp" :key="sta.sfId" :label="sta.sfName" :value="sta.sfId">
				</el-option>
			</el-select>
		</el-form-item>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="insertPai()">确 定</el-button>
			</span>

		</template>

	</el-dialog>



</template>

<script>
	import dayjs from 'dayjs'
	export default {
		data() {
			return {
				custList: [],
				staffByDp: [],
				dialogVisible: false,
				tanChuanFuZhi: {},
				paiGongTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
				logInput:[],
				dispat:{}
			}
		},
		methods: {
			selectPage() {
				let carCustVo = {
					 crName:this.dispat.custName, //客户姓名
					 crPhone:this.dispat.custPhone,//客户电话号
					 crIdNumber:this.dispat.crNum,//客户身份证号
					 crSex:this.dispat.sex,//客户性别
					pageSize: 1000,
					pageNo: 1
				}
				this.axios.post("customer/selectPage", carCustVo).then(res => {
					console.log(res.data.list, "分页查询")
					this.custList = res.data.list;
				})
			},
			confirmDispatching(index, row) {
				console.log(row, "这是选择的")
				this.axios.get("staff/selectDp").then(res => {
					console.log(res.data, "这是员工信息")
					this.staffByDp = res.data;
					this.tanChuanFuZhi = row;
					this.dialogVisible = true;
				})

			},
			insertPai() {
				console.log(this.staffByDp.sfId, "设施")
				console.log(this.tanChuanFuZhi.carNumber,"这是车牌号")
				console.log(this.tanChuanFuZhi.carType,"这是车牌号")
				console.log(this.paiGongTime,"这是车牌号")
				console.log(this.tanChuanFuZhi.carId,"这是车牌号")
				console.log(this.tanChuanFuZhi.carMessageId,"这是车牌号")
				
				let maintVo = {
						 sfId:this.staffByDp.sfId,
					     carMessageId:this.tanChuanFuZhi.carMessageId,
					     paiGongTime:this.paiGongTime
					}
				
				this.axios.post("maint/insertMaint",maintVo).then(res=>{
					console.log(res,"这是啥啊")
				})
			},
			deleteCust(index,row){
				console.log(row.crId,"这是点击的客户信息")
			
				this.axios.get("customer/deleteCust",{
					params:{
						crId:row.crId
					}
				}).then(res=>{
					console.log(res,"这是删除")
					this.selectPage();
				})
			}
		},
		mounted() {
			this.selectPage();
		}
	}
</script>

<style scoped="scoped">
	.inp{
		width: 300px;
		margin: 20px 0 20px 50px;
	}
</style>
