<template>

	<p>
		<el-button type="primary" round @click="dialogVisible = true">添加角色</el-button>
		<el-button type="primary" round @click="drawer = true">权限设置</el-button>

	</p>

	<div>
		<el-drawer custom-class="chou" v-model="drawer" :direction="direction" :before-close="handleClose"
			destroy-on-close size="40%">
			<template #title>
				角色名
				权限
			</template>

			<div class="yitou">
				<!-- <template v-for="(a,i) in cityOptions2"> -->
					<el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]"
						:default-checked-keys="[5]" :props="defaultProps">
					</el-tree>
				<!-- </template> -->
			</div>
		</el-drawer>

	</div>

	<div>

		<el-table :data="tableData" style="width: 100%">

			<el-table-column prop="sfName" label="角色名" width="180"> </el-table-column>
			<el-table-column prop="" label="用户名" width="180">

				<template #default="scope">
					<span v-if="scope.row.myuser!=null">
						{{scope.row.myuser.uaccount}}
					</span>
				</template>

			</el-table-column>


			<el-table-column prop="address" label="部门">
				<template #default="scope">
					<span v-if="scope.row.mydept !=null">
						{{scope.row.mydept.dtName}}
					</span>
				</template>
			</el-table-column>

			<el-table-column prop="address" label="职位">
				<template #default="scope">
					<span v-if="scope.row.mypost !=null">
						{{scope.row.mypost.ptName}}
					</span>
				</template>
			</el-table-column>


			<el-table-column label="性别">
				<template #defalut="scope">
					<span v-if="scope.row.sex !=null">
						{{scope.row.sex}}
					</span>
				</template>

			</el-table-column>


			<el-table-column prop="sfPhone" label="电话"> </el-table-column>
			<el-table-column label="操作">

				<template #default="scope">
					<span>

						<el-button type="primary">权限设置</el-button>

					</span>
				</template>

			</el-table-column>
		</el-table>

	</div>

</template>

<script>
	const cityOptions = ['上海', '北京', '广州', '深圳']
	export default {
		data() {
			return {
				drawer: true,
				direction: 'rtl',
				checkAll: false,
				checkedCities0: [{
						acc: []
					}, {
						acc: []
					}, {
						acc: []
					}, {
						acc: []
					},


				],
				cities: cityOptions,
				isIndeterminate: true,
				cityOptions2: [],

				data: [],
				defaultProps: {
					children: 'myJurisdiction',
					label: 'jname'
				}


			}
		},
		methods: {
			getJurisdiction() { //查所有权限

				this.axios.get("http://localhost:8166/juris/all").then(res => {
					console.log("权限数据", res)
					if (res.data.code == 1) {
						this.cityOptions2 = res.data.data
						this.data=res.data.data
						/* res.data.data.forEach((v, i) => {
							console.log("v", v)
							let acc = "arr" + i
							v.img = {
								acc: []
							}
						}) */

						console.log("数组", res.data.data)

					}
				})

			},

			handleClose(done) {
				this.$confirm('确认关闭？')
					.then((_) => {
						done()
					})
					.catch((_) => {})
			},
			handleCheckAllChange(val) {
				console.log("全选切换", val)
				this.checkedCities = val ? cityOptions : []
				this.isIndeterminate = false
			},
			handleCheckedCitiesChange(value) {
				console.log("选择的值", value)
				let checkedCount = value.length
				this.checkAll = checkedCount === this.cities.length
				this.isIndeterminate =
					checkedCount > 0 && checkedCount < this.cities.length
			},



		},
		mounted() {
			this.getJurisdiction();
		}
	}
</script>

<style scoped="scoped">
	.chou {
		height: 100%;
	}


	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.box-card {
		width: 100%;
	}

	.yi {
		float: left;
		list-style: none;
		border: 1px solid black;

	}

	.yi li {
		width: 50px;
		height: 50px;
		float: left;
	}

	.yitou {
		border: 1px solid red;

	}

	dl dd {
		float: left;
	}
</style>
