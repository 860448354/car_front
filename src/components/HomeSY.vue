<template>
	<el-container>
	   <el-header>欢迎

	   <el-dropdown style="float: right;margin-top: 20px;">
	       <span class="tc">
	         设置<i class="el-icon-arrow-down el-icon--right"></i>
	       </span>
	       <template #dropdown>
	         <el-dropdown-menu>
	           <el-dropdown-item>修改</el-dropdown-item>
	           <el-dropdown-item >退出</el-dropdown-item>


	         </el-dropdown-menu>
	       </template>
	     </el-dropdown>
	   </el-header>

				  <!-- 视图区 -->


		<el-container>
			<!-- 菜单区 -->
			<el-aside width="200px" >
				 <el-menu
				      default-active="1"
				      class="el-menu-vertical-demo"
				      @open="handleOpen"
				      @close="handleClose">
				      <el-menu-item index="1">
				      		<i class="el-icon-location"></i>
				      		<span slot="title">
				      			<router-link to="/lunbo">首页</router-link>
				      		</span>
				      </el-menu-item>
				      <el-sub-menu index="2">
				        <template #title>
                  <el-icon><sell /></el-icon>
                  <span>采购</span>
                </template>
                <el-menu-item index="2-1">
                  <router-link to="/purchase">采购进货</router-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                  采购入库
                </el-menu-item>
				      </el-sub-menu>
				      <el-menu-item index="3" disabled>
				        <i class="el-icon-document"></i>
				        <span slot="title">导航三</span>
				      </el-menu-item>
				      <el-menu-item index="4">
				        <i class="el-icon-setting"></i>
				        <span slot="title">导航四</span>
				      </el-menu-item>
				    </el-menu>
			</el-aside>

			<el-container>
				<!-- 视图区 -->
				<el-main>

					<p v-if="tags.length==0?false:true" class="kjl">
						<el-tag v-for="tag in tags" :key="tag.name" closable
							:type="tag.type">
							{{tag.name}}
						</el-tag>
					</p>
					<router-view></router-view>
				</el-main>
				<!-- 版权归属 -->
				<el-footer>版权归属 ©EKKOLIST</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				tags: [],
				aa:'',
			}
		},
		methods: {
			 handleOpen(key, keyPath) {
			        console.log(key, keyPath);
			      },
			 handleClose(key, keyPath) {
			        console.log(key, keyPath);
			      }
		},
		mounted() {


		}
	}
</script>

<style scoped="scoped">


	* {
		padding: 0px;
		margin: 0px;
	}

	.el-tag{
		height: 40px;
		line-height: 40px;
	}

	html,
	body {
		height: 100%;
	}

	.kjl {
		height: 40px;
		background-color:white;
	}

	.el-header,
	.el-footer {
		background-color: #00aaff;
		color: white;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		/* background-color: #00aaff; */
		color: white;
		/* text-align: center; */
		line-height: 200px;
		min-height: 1000px;
	}

	.el-main {
		background-color: white;
		color: black;
		padding: 0px;
		overflow-x: hidden;/*关闭横向滚动条*/
		overflow-y: hidden;/*关闭竖向滚动条*/
		height: 100%;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
	a{
		text-decoration: none;
		color:black;
	}

	.el-tag[data-v-1fe69f35] {
	    height: 40px;
		width: 90px;
		text-align: center;
	    line-height: 40px;
		font-size: 13px;

	}
</style>
