<template>
	<div class="block">
		<span class="demonstration"></span>
		<el-carousel trigger="click" height="300px">
			<el-carousel-item v-for="item in 4" :key="item">
				<h3 class="small">{{ item }}</h3>
			</el-carousel-item>
		</el-carousel>
	</div>
	<el-card class="box-card">
		<div class="text item">
			<div class="times">
				
				<span class="time">{{timess}} </span>
				<span class="date">{{date1}}</span>
			</div>
		</div>

		<!-- <div class="sign-block">


			<el-button class="btn" @click="dk()" type="success">{{dkzt}}</el-button>
			<p class="pth"> <img class="imgs" src="../../public/ku.png" /> <span class="work">{{jbstart}} </span>
				<span class="clock">{{qianda}}
				</span> <span class="sign-error">{{state}}</span>
			</p>
			<el-divider></el-divider>
			<p class="pth"> <img class="imgs" src="../../public/xiao.png"> <span class="work">{{jbover}} </span>
				<span class="clock">{{qianda2}}
				</span> <span class="sign-error">{{state2}}</span>
			</p>


		</div> -->

	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				state: "上班打卡",
				timess:"",
				qianda:"签到暂无进行打卡",
				date1:"",
				dkzt:"打卡",
				state2:"下班打卡",
				qianda2:"签到暂无进行打卡",
				jbk:'',
				jbstart:'上班: 08:30',
				jbover:'下班: 17:00',
				jbdx:{},
				timelong:'',
			}
		},
		methods: {
			
			
		
			
			
				
			
		},
		mounted() {
			
			
			
		}
		
	}
</script>

<style scoped="scoped">
	* {
		padding: 0px;
		margin: 0px;
		font-size: 0.875rem;

	}

	.times {
		padding: 10px;
	}

	.box-card {
		height: 300px;
		width: 30%;
		float: right;
		margin-top: -300px;
	}

	.time {
		font-size: 30px;
		color: #333;
		margin-right: 16px;
	}

	.date {
		font-size: 20px;
		color: #999;
		margin-right: 10px;
	}

	.sign-block {
		padding: 8px;
		border-radius: 5px;
		background: #f6f6f6;
	}

	.btn {
		margin-top: 27.5px;
		width: 60px;
		height: 60px;
		float: right;
		line-height: 40px;
		border-radius: 35px;

	}

	.el-divider--horizontal {
		width: 75%;
	}

	.sign-error {
		color: red;
		border-radius: 3px;
		border: 1px solid red;
		font-size: 12px;
		margin-left: 10px;
	}

	.pth {
		line-height: 55px;
	}

	.work {
		vertical-align: middle;
		color: #999;
		padding-right: 10px;
	}

	.clock {
		vertical-align: middle;
	}

	.imgs {
		vertical-align: middle;
	}

	.block {
		width: 70%;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>
