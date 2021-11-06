<template>
  <el-row style="margin-top: 20px">
    <el-button type="primary" style="margin-left: 20px" @click="dialogFormVisible = true">新增采购单</el-button>
  </el-row>
  <el-dialog title="采购订单" v-model="dialogFormVisible" @close="closeDialogFormVisible">
    <el-form :model="form" label-width="80px">
      <el-form-item label="订单编号" style="width: 300px;float: left" >
        <el-input v-model="form.name" autocomplete="off" disabled size="mini"></el-input>
      </el-form-item>
      <el-form-item label="供货商" style="float: left">
        <el-select v-model="form.supplierName" @change="findCommBySupplierName" placeholder="请选择" size="mini" >
          <el-option
              v-for="item in supplier"
              :key="item.supplierName"
              :label="item.supplierName"
              :value="item.supplierName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="制单人" style="width: 300px;float: left" >
        <el-input v-model="form.purTime" autocomplete="off" disabled size="mini"></el-input>
      </el-form-item>
      <el-form-item label="制单日期" style="width: 300px;float: left" >
        <el-input v-model="form.purTime" autocomplete="off" disabled size="mini"></el-input>
      </el-form-item>
      <el-form-item label="采购仓库" style="float: left">
        <el-select v-model="form.storeName" placeholder="请选择" size="mini">
          <el-option
              v-for="item in store"
              :key="item.storeName"
              :label="item.storeName"
              :value="item.storeName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采购员" style="float: left">
        <el-select v-model="form.sfName" placeholder="请选择" size="mini">
          <el-option
              v-for="item in staff"
              :key="item.sfName"
              :label="item.sfName"
              :value="item.sfName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总金额" style="width: 300px;float: left" >
        <el-input v-model="form.purMoney" autocomplete="off" disabled size="mini"></el-input>
      </el-form-item>
      <el-form-item label="交货期限" style="width: 300px;float: left" >
        <el-date-picker v-model="form.auditTime" type="date" placeholder="选择日期" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" style="width: 300px;" >
        <el-input v-model="form.purRemark" autocomplete="off" size="mini"></el-input>
      </el-form-item>
    </el-form>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="commName" label="配件名称"></el-table-column>
      <el-table-column prop="commSpe" label="配件规格"></el-table-column>
      <el-table-column prop="commCar" label="配件车型"></el-table-column>
      <el-table-column prop="commUnit" label="单位"></el-table-column>
      <el-table-column prop="commMoney" label="单价"></el-table-column>
      <el-table-column prop="commNum" label="数量">
        <el-input-number v-model="commNum" size="mini"></el-input-number>
      </el-table-column>
    </el-table>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
      >确 定</el-button
      >
    </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
name: "purchase",
  data(){
    return{
      dialogFormVisible:false,
      form:{
        purOrder:'',//订单号
        supplierName:'',//供货商
        storeName:'',//仓库
        purName:'',//制单人
        purTime:'',//制单日期
        sfName:'',//采购员
        purPer:'',//审核人
        auditTime:'',//交货期限
        purMoney:'',//总金额
        purRemark:''//备注
      },
      tableData:[{
        commName:'',
        commSpe:'',
        commCar:'',
        commUnit:'',
        commMoney:'',
        commNum:''
      }],
      multipleSelection:'',
      commNum:'',
      supplier:[{
        supplierName:''
      }],
      store:[],
      staff:[]
    }
  },methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    findSupplier(){
      this.axios.get('findAllSupplier').then(res=>{
        this.supplier = res.data;
      })
    },
    findStore(){
      this.axios.get("findAllStore").then(res=>{
        this.store = res.data;
      })
    },
    findCaiGou(){
      this.axios.get("findCaiGou").then(res=>{
        this.staff = res.data;
      })
    },
    findCommBySupplierName(){
      //this.supplierName = this.form.supplierName;
      this.axios.post("findCommBySupplierName",this.form).then(res=>{
          this.tableData = res.data;
      })
    },closeDialogFormVisible(){
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
            purRemark:''//备注
      }
    }
  },created() {
    this.findSupplier();
    this.findStore();
    this.findCaiGou();
  }
}
</script>

<style scoped>

</style>
