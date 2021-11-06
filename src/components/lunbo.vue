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

		<div class="sign-block">


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


		</div>

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
			
			csj(){
				// console.log("初始时间555666-",this.timelong+1)
				this.timelong=this.timelong+1000
				
				
				
				
				let atime=dayjs(this.timelong).format('YYYY-MM-DD dddd ')
				let btime=dayjs(this.timelong).format('HH:mm:ss A')
				// console.log("输出时间--------",btime)
				this.timess=btime
				this.date1= atime
				
				var wai=this;
				setTimeout(function(){//延时方法调自己
					wai.csj();				
				},1000);
				
				
			},
			
			
			cjb(){
				console.log("进入加班查考勤")
				this.axios.get("http://localhost:8088/check/work",{
					params:{
						empid:this.$store.state.empid
					}
				})
				.then(res=>{
					console.log("加班后台",res)
					
					if (res.data!=null) {
						console.log("后台数据测试", res.data);
						this.qianda="签到 "+res.data[0].time2.substring(11,19);
						this.state=res.data[0].checkStateByCheckid3.name2;
						
						
						this.qianda2="签到 "+res.data[1].time2.substring(11,19);
						this.state2=res.data[1].checkStateByCheckid3.name2;
						
						
						
						this.dkzt="加班终";
						
					
						
						
						// this.qianda2="签到 "+this.timess
						// this.state2=res.obj.name2;
					}else if(res.code==1){
						
					 // let sj=new Date(+new Date(res.obj.time2)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')+"";
						
						this.qianda="签到 "+res.obj.time2.substring(11,19)
						this.state=res.obj.checkStateByCheckid3.name2;
						this.dkzt="加班终";
					}
					
					
				})
			},
			
			cqj(){
				
				this.axios.get("http://localhost:8088/check/leave",{
					params:{
						empid:this.$store.state.empid
					}
				}).then(res=>{
					console.log("请假后台",res)
					
					if(res.data.length!=0){
						
						if(res.data[0].checkStateByCheckid3.name2=='请假（下午）'){
							console.log("输出1526")
							
							this.dkzt='签退2'
							this.qianda2='签到暂无进行打卡'
							this.state2='下班打卡'
						}
					}
					
				})
				
				
			},
			
			jb(){
				this.axios.get("http://localhost:8088/work/selectwork",{
					params:{
						id:this.$store.state.empid
					}
				}).then(res=>{
					console.log("加班数据",res)
					if(res.obj!=null){
						this.jbk=1
						this.jbdx=res.obj
						
						let time=new Date(res.obj.starttime)
						console.log("time1",time);
						console.log("比较",time<new Date())
						
						if(this.state2=='下班打卡'){
							this.qianda="加班打卡未开始";
							this.state='';
							
							
							this.dkzt="加班始";
							this.jbstart='加班始'+this.jbdx.starttime.substring(11,19)
							this.jbover='加班终'+this.jbdx.overtime.substring(11,19)
							
							this.cjb();
						
						}
					}
					
					
				})	
			},
			dk() {
				
				if(this.dkzt=="打卡"){
					console.log("第一次打卡22")
					
					this.axios.get("http://localhost:8088/check/daka", {
						params:{
							id: this.$store.state.empid
						}
						
					}).
					then(res => {
						console.log("后台数据", res);
					
						if (res.code == 1) {
							this.open1();
							this.qianda="签到 "+this.timess
							this.state=res.obj.name2;
						}
					})
					
					
					this.dkzt="签退";
					
				}else if(this.dkzt=="签退"){
					this.open();
					console.log("第二次打卡33")


					}
				else if(this.dkzt=="加班始"||this.dkzt=="加班终"){
					
					this.axios.post("http://localhost:8088/work/workes",this.$qs.stringify({
						empid:this.$store.state.empid
					}))
					.then(res=>{
						console.log("结果",res)
						if(res.code==1){
							this.dkzt="加班终";
								this.cjb();
						}
					})
					
					
				}else if(this.dkzt=='签退2'){
					console.log("下午放假状态")
					
					this.axios.get("http://localhost:8088/check/daka2", {
						params:{
							id: this.$store.state.empid
						}
						
					}).then(res=>{
						this.qianda2="签到 "+this.timess
						this.state2=res.obj.name2;
						this.dkzt='签退2'
					})
					
					
					
				}	
					
				console.log("qs是", this.$qs)
				console.log("打卡", this.$store.state.empid);
			
				

			},
			open1() {
				this.$notify({
					title: '打卡成功',
					message: '这是一条成功的提示消息',
					type: 'success'
				});
			},
			ce2(){
				// var now = new Date(.ajax({async: false}).getResponseHeader("Date"));
				// var a=new Date();			
				// var b= a.getHours();
				// var c=a.getMinutes();
				// var d=a.getSeconds();
				
				// var year=a.getFullYear();
				// var month=a.getMonth()+1;
				// var day=a.getDate();
				
				// var data= "星期" + "日一二三四五六".charAt(a.getDay());  
				
				
				
				
				// if(b<10){
				// 	b="0"+b;
				// }
				// if(c<10){
				// 	c="0"+c;
				// }
				// if(d<10){
				// 	d="0"+d;
				// }
				// this.timess=b+":"+c+":"+d;
				// this.date1=year+"年"+month+"月"+day+"日"+data;
				
				
				
				// console.log("确定初始时间")
				this.axios.get("http://localhost:8088/check/time").then(res=>{
					// console.log("输出时间",res)
					
					this.timelong=res
					// console.log("输出时间22---------------------------------",this.timelong)
				
				})
				
				
				
				
				var wai=this;
				setTimeout(function(){//延时方法调自己
					wai.ce2();		
							// 300000
				},300000);
				
			},
			
		
			
			 open() {
			        this.$confirm('确认是否早退, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning',
					  center: true
			        }).then(() => {
						
						this.axios.get("http://localhost:8088/check/daka", {
							params:{
								id: this.$store.state.empid
							}
							
						}).
						then(res => {
							console.log("二次打卡后台数据", res);
						
							if (res.code == 1) {
								this.open1();
								
								if(res.obj.name2=='下班打卡'&&this.jbk==1){
						
									this.dkzt="加班始";
									this.jbstart='加班始'+this.jbdx.starttime.substring(11,19)
									this.jbover='加班终'+this.jbdx.overtime.substring(11,19)
								}
								this.qianda2="签到 "+this.timess
								this.state2=res.obj.name2;
							}
						})
						
						
			          // this.$message({
			          //   type: 'success',
			          //   message: '打卡成功!'
			          // });
					  
					  
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消打卡'
			          });
			        });
			      },
				  clock(){
					  console.log("进入初次打卡状态");
					  this.axios.get("http://localhost:8088/check/dakace", {
						  params:{
							  	id: this.$store.state.empid
						  }
					  
					  }).
					  then(res => {
					  	console.log("后台数据", res);
					  
					  	if (res.data!=null) {
							console.log("后台数据测试", res.data);
							
							let time1=new Date(+new Date(res.data[0].time2)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')+"";
							this.qianda="签到 "+time1.substring(11,19);
							this.state=res.data[0].checkStateByCheckid3.name2;
							
							let time2=new Date(+new Date(res.data[1].time2)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')+"";
							this.qianda2="签到 "+time2.substring(11,19);
							this.state2=res.data[1].checkStateByCheckid3.name2;
							
							
							
							this.dkzt="签退";
							
							this.jb();
							
							
					  		// this.qianda2="签到 "+this.timess
					  		// this.state2=res.obj.name2;
					  	}else if(res.code==1){
							
						 // let sj=new Date(+new Date(res.obj.time2)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')+"";
							
							this.qianda="签到 "+res.obj.time2.substring(11,19)
							this.state=res.obj.checkStateByCheckid3.name2;
							this.dkzt="签退";
						}
					  })
					  
					  this.cqj();
					  
				  }
				  
				
			
		},
		mounted() {
			
			console.log("11223")
			 this.ce2();
			this.clock();
			this.cjb();
			this.csj()
			
			
			
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
