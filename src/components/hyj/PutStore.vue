<template>
  <el-table
      :data="tableData"
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{ textAlign: 'center' }"
      style="width: 100%">
    <el-table-column prop="purOrder" width="180px" label="订单号"></el-table-column>
    <el-table-column prop="supplierName" label="供货商"></el-table-column>
    <el-table-column prop="storeName" label="仓库"></el-table-column>
    <el-table-column prop="purName" label="制单人"></el-table-column>
    <el-table-column prop="purTime" label="制单日期"></el-table-column>
    <el-table-column prop="sfName" label="采购员"></el-table-column>
    <el-table-column prop="auditTime" label="交货期限"></el-table-column>
    <el-table-column prop="purMoney" label="总金额"></el-table-column>
    <el-table-column prop="purState" label="状态"></el-table-column>
    <el-table-column label="入库">
      <template v-slot="x">
        <el-button type="primary" size="mini">收货入库</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot="v">
        <el-button type="primary" size="mini" @click="checkPur(v.row)">订单详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="订单详情" v-model="checkPurDialog" @close="closeDialogFormVisible">
    <el-table
        :data="form.purXq"
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
name: "PutStore",
  data(){
    return{
      tableData:'',
      checkPurDialog:false,
      form: {
        purOrder: '',//订单号
        supplierName: '',//供货商
        storeName: '',//仓库
        purName: '',//制单人
        purTime: '',//制单日期
        sfName: '',//采购员
        purPer: '',//审核人
        auditTime: '',//交货期限
        purMoney: 0,//总金额
        purRemark: '',//备注
        purXq: [{
          commName: '',
          commSpe: '',
          commCar: '',
          commUnit: '',
          commMoney: '',
          commNum: ''
        }]
      }
    }
  },methods:{
    findPurD(){
      this.axios.get("hyj/findPurD").then(res=>{
        this.tableData = res.data;
      })
    },
    checkPur(v){
      this.checkPurDialog = true;
      this.form.purXq = v.purXq;
    },
    closeDialogFormVisible(){
        this.form ={
          purOrder:'',//订单号
          supplierName:'',//供货商
          storeName:'',//仓库
          purName:'',//制单人
          purTime:'',//制单日期
          sfName:'',//采购员
          purPer:'',//审核人
          auditTime:'',//交货期限
          purMoney:'',//总金额
          purRemark:'',//备注
          purXq:[{
            commName:'',
            commSpe:'',
            commCar:'',
            commUnit:'',
            commMoney:'',
            commNum:''
          }],
        };
      },
  },
  created() {
    this.findPurD()
  }
}
</script>

<style scoped>

</style>
