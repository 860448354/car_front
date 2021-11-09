<template>
	<el-form :model="dispat">
			<el-input class="inp" v-model="dispat.carNumber" placeholder="车牌号"></el-input>
			<el-input class="inp" v-model="dispat.carType" placeholder="类型"></el-input>
			<el-input class="inp" v-model="dispat.staffName" placeholder="维修员"></el-input>
			<el-button class="but1" @click="selectConCom()">
				查询
			</el-button>
		</el-form>
	
	
	<el-table :data="conComList" style="width: 100%">
		<el-table-column prop="completedTime" label="时间" align="center" />
		<el-table-column prop="completedCarId.carNumber" label="车牌号" align="center" />
		<el-table-column prop="completedCarId.carType" label="车辆类型" align="center" />
		<el-table-column prop="empWx.sfName" label="维修员" align="center" />
		<el-table-column prop="maintenanceAmount" label="总金额" align="center" />
		
		<el-table-column label="操作" align="center">
			<template #default="scope">
				<el-button size="mini" type="danger" @click="confirmDispatching(scope.$index, scope.row)">
					确定
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		data() {
			return {
				conComList:[],
				dispat:{}
			}
		},
		methods: {
			selectConCom(){
				
				console.log(this.dispat.carNum,"这是个什么东西")
				let comVo = {
					carType:this.dispat.carType,
				    carNumber:this.dispat.carNumber,
					staffName:this.dispat.staffName
				}
				console.log(comVo)
				this.axios.post("comple/selectCon",comVo).then(res=>{
					console.log(res.data,"这个是确认完工信息")
					this.conComList = res.data;
				})
			},
			
			confirmDispatching(index,row){
				alert("确认维修完成")
				console.log(row,"我是你的")
				this.axios.get("car/updateCar",{
					params:{
						upState:"已完成",
						 carId:row.completedCarId.carMessageId
						
					}
				}).then(res=>{
					
				})
			}
			

		},
		mounted() {
			this.selectConCom();
			
		}
	}
</script>

<style scoped="scoped">
	.inp{
		width: 300px;
		margin: 20px 0 20px 50px;
	}
</style>
