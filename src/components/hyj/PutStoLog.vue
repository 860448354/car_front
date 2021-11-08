<template>
  <el-table
      :data="tableData"
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{ textAlign: 'center' }"
      style="width: 100%">
    <el-table-column prop="putStoNum" label="入库单号"></el-table-column>
    <el-table-column prop="putStoName" label="经办人"></el-table-column>
    <el-table-column prop="putStoTime" label="入库时间"></el-table-column>
    <el-table-column label="操作">
      <template v-slot="v">
        <el-button type="primary" size="mini" @click="checkPut(v.row)">订单详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="订单详情" v-model="checkPutDialog">
    <el-table
        :data="tableData[0].putXq"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
        style="width: 100%">
      <el-table-column prop="commName" label="配件名称"></el-table-column>
      <el-table-column prop="commSpe" label="配件规格"></el-table-column>
      <el-table-column prop="commCar" label="配件车型"></el-table-column>
      <el-table-column prop="commUnit" label="单位"></el-table-column>
      <el-table-column prop="commMoney" label="单价"></el-table-column>
      <el-table-column prop="commNum" label="数量"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
name: "PutStoLog",
  data(){
    return{
      tableData:[{
        putStoNum:'',
        putStoName:'',
        putStoTime:'',
        putXq:[{
          putXqId: '',
          supplierName: '',
          commName: '',
          commSpe: '',
          commCar: '',
          commUnit: '',
          commMoney: '',
          putStoId: '',
          commNum: ''
        }]
      }],
      checkPutDialog:false
    }
  },
  methods:{
    findPutStoLog(){
      this.axios.get("hyj/findPutStoLog").then(res=>{
        this.tableData = res.data;
        console.log(res.data)
      })
    },
    checkPut(v){
      this.checkPutDialog = true;

      this.tableData[0].putXq = v.putXq;
    }
  },
  created() {
    this.findPutStoLog()
  }
}
</script>

<style scoped>

</style>
