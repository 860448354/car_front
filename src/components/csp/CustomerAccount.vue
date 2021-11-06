<template>
	<el-row style="margin: 15px;">
		<el-col :span="6">
			<el-input v-model="input" placeholder="客户名称" style="width: 200px;" />
		</el-col>
		<el-col :span="6">
			<el-input v-model="input" placeholder="车牌号" style="width: 200px;" />
		</el-col>
		<el-col :span="10">
			<el-button type="primary" style="width: 100px;">查询</el-button>
			<el-button type="primary" style="width: 100px;" @click="dialogFormVisible = true">收款</el-button>
		</el-col>
	</el-row>
	<el-row>
		<el-table :data="tabledata" height="270px">
			<el-table-column fixed="" prop="recordsNo" label="就诊记录号" width="200px">
			</el-table-column>
			<el-table-column prop="outpatientName" label="姓名" width="150px">
			</el-table-column>
			<el-table-column prop="outpatientSex" label="性别" width="100px">
			</el-table-column>
			<el-table-column prop="outpatientAge" label="年龄" width="100px">
			</el-table-column>
			<el-table-column prop="medicalName" label="科室" width="150px">
			</el-table-column>
			<el-table-column prop="staffName" label="医师" width="150px">
			</el-table-column>
			<el-table-column prop="prescriptionDate" label="项目日期" width="150px">
			</el-table-column>
			<el-table-column prop="prescriptionNo" label="项目号" width="200px">
			</el-table-column>
			<el-table-column prop="dosis" label="副数" width="100px">
			</el-table-column>
			<el-table-column prop="sumMoney" label="本单应收" width="100px">
			</el-table-column>
		</el-table>
	</el-row>
	<el-row>
		<el-table :data="tabledata" height="140px">
			<el-table-column prop="typeId" label="费用名">
			</el-table-column>
			<el-table-column prop="drugId" label="项目编号">
			</el-table-column>
			<el-table-column prop="drugName" label="项目名称">
			</el-table-column>
			<el-table-column prop="standardName" label="规格">
			</el-table-column>
			<el-table-column prop="drugBig" label="单位">
			</el-table-column>
			<el-table-column prop="aggregate" label="数量">
			</el-table-column>
			<el-table-column prop="dose" label="克数">
			</el-table-column>
			<el-table-column prop="drugSelling" label="单价">
			</el-table-column>
			<el-table-column prop="subtotal" label="金额">
			</el-table-column>
		</el-table>
	</el-row>
	<el-dialog title="收款" v-model="dialogFormVisible" width="30%" >
				<el-form :model="payment" label-width="80px">
					<el-form-item prop="paymentNo" label="收费编号">
					</el-form-item>
					<el-form-item prop="paymentMoney" label="应收金额">
					</el-form-item>
					<el-form-item prop="paymentSum" label="优惠金额">
						<el-input v-model="paymentSum" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item prop="paymentSmall" label="收款金额">
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button>取 消</el-button>
						<el-button type="primary">确 定</el-button>
					</span>
				</template>
			</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				tabledata: [],
				dialogFormVisible:false
			}
		}
	}
</script>

<style>
</style>
