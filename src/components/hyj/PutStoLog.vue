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
      <el-button type="primary" size="mini">订单详情</el-button>
    </el-table-column>
  </el-table>
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
      }]
    }
  },
  methods:{
    findPutStoLog(){
      this.axios.get("hyj/findPutStoLog").then(res=>{
        this.tableData = res.data;
      })
    }
  },
  created() {
    this.findPutStoLog()
  }
}
</script>

<style scoped>

</style>
