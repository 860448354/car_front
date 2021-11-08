<template>
	
	<el-table :data="pickingList" style="width: 100%">
		<el-table-column prop="commPicking.repeCommName" label="派件名称" align="center" />
		<el-table-column prop="commPicking.repeCommSpe" label="单位" align="center" />
		<el-table-column prop="commPicking.repeCommMoney" label="单价" align="center" />
		<el-table-column prop="dispatching.carMessage.carNumber" label="车牌号" align="center" />
		<el-table-column prop="dispatching.carMessage.carType" label="车辆类型" align="center" />
		<el-table-column prop="dispatching.dispatchingTime" label="领料时间" align="center" />
		<el-table-column prop="dispatching.staff.sfName" label="维修员" align="center" />
		
	</el-table>
</template>

<script>
	export default {
		data() {
			return {
				pickingList:[],
				mainint:{}
			}
		},
		methods: {
			selectPicking() {
				this.axios.post("picking/selectList").then(res => {
					console.log("能不能",res.data)
					this.pickingList = res.data;
				})
			}
			
	
		},
		mounted() {
			this.selectPicking();
			
		}
	}
</script>

<style scoped="scoped">
	.inp {
		width: 300px;
		margin: 20px 0 20px 50px;
	}
</style>
