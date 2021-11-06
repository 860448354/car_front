<template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="日收支汇总" name="first">
			<el-row style="margin: 15px;">
				<el-col class="riqi" :span="10">
					起止日期
					<el-date-picker v-model="paymentTime" type="daterange" range-separator="至" start-placeholder="开始日期"
						end-placeholder="结束日期" @change="change">
					</el-date-picker>
				</el-col>
				<el-col :span="6">
					<el-button type="primary" size="medium" style="width:100px;">
						查询</el-button>
				</el-col>
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
		</el-tab-pane>
		<el-tab-pane label="日收支明细" name="second">
			<el-row style="margin: 15px;">
				<el-col class="riqi" :span="10">
					起止日期
					<el-date-picker v-model="paymentTime" type="daterange" range-separator="至" start-placeholder="开始日期"
						end-placeholder="结束日期" @change="change">
					</el-date-picker>
				</el-col>
				<el-col :span="6">
					<el-button type="primary" size="medium" style="width:100px;">
						查询</el-button>
				</el-col>
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
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				tabledata:[],
				paymentTime:''
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event)
			},
		},
	}
</script>

<style>
</style>
