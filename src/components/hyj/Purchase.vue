<template>
  <el-row style="margin-top: 20px">
    <el-button type="primary" style="margin-left: 20px" @click="dialogFormVisible = true">新增采购单</el-button>
  </el-row>
  <el-dialog title="采购订单" v-model="dialogFormVisible">
    <el-form :model="form" label-width="80px">
      <el-form-item label="订单名称" >
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="供货商" >
        <el-select v-model="form.supplierName" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
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
        purTime:'',//采购日期
        sfId:'',//采购员
        purPer:'',//审核员
        auditTime:'',//审核日期
        purMoney:'',//总金额
        purRemark:''//备注
      }
    }
  },methods:{

  },created() {

  }
}
</script>

<style scoped>

</style>
