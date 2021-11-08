<template>
  <el-row style="margin-top: 20px">
    <el-button type="primary" style="margin-left: 20px" @click="clickDialog">新增采购单</el-button>
  </el-row>
  <el-tabs v-model="activeName" type="card" style="margin-top: 20px">
    <el-tab-pane label="待审核订单" name="first">
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
        <el-table-column label="操作">
          <template v-slot="v">
            <el-button type="primary" size="mini" @click="checkPur(v.row)">订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="已审核订单" name="second">
      <el-table
          :data="tableData2"
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
        <el-table-column label="采购">
          <template v-slot="x">
            <el-button type="primary" size="mini" @click="buy(x.row)">采购</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="v">
            <el-button type="primary" size="mini" @click="checkPur(v.row)">订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
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
  <el-dialog title="采购订单" v-model="dialogFormVisible" @close="closeDialogFormVisible">
    <el-form :model="form" label-width="80px">
      <el-form-item label="订单编号" style="width: 300px;float: left" >
        <el-input v-model="form.purOrder" autocomplete="off" disabled size="mini"></el-input>
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
        <el-input v-model="form.purName" autocomplete="off" disabled size="mini"></el-input>
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
      <el-form-item label="交货期限" style="width: 300px;float: left" >
        <el-date-picker v-model="form.auditTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD" type="date" placeholder="选择日期" size="mini">
        </el-date-picker>
      </el-form-item>
<!--      <el-form-item label="备注" style="width: 300px;" >
        <el-input v-model="form.purRemark" autocomplete="off" size="mini"></el-input>
      </el-form-item>-->
    </el-form>
    <el-table
        ref="multipleTable"
        :data="form.purXq"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="commName" label="配件名称"></el-table-column>
      <el-table-column prop="commSpe" label="配件规格"></el-table-column>
      <el-table-column prop="commCar" label="配件车型"></el-table-column>
      <el-table-column prop="commUnit" label="单位"></el-table-column>
      <el-table-column prop="commMoney" label="单价"></el-table-column>
      <el-table-column prop="commNum" label="数量">
        <template v-slot="s">
          <el-input-number v-model="s.row.commNum" controls-position="right" :min="1" size="mini"></el-input-number>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-button type="primary" @click="ensure">确 定</el-button>
    </template>
  </el-dialog>

</template>

<script>
import dayjs from "dayjs";
import {ElMessage} from "element-plus";
export default {
name: "purchase",
  data(){
    return{
      dialogFormVisible:false,
      checkPurDialog:false,
      tableData:[{
        purOrder:'',//订单号
        supplierName:'',//供货商
        storeName:'',//仓库
        purName:'',//制单人
        purTime:'',//制单日期
        sfName:'',//采购员
        auditTime:'',//交货期限
        purMoney:'',//总金额
        purState:''//审核状态
      }],
      tableData2:[{
        purOrder:'',//订单号
        supplierName:'',//供货商
        storeName:'',//仓库
        purName:'',//制单人
        purTime:'',//制单日期
        sfName:'',//采购员
        auditTime:'',//交货期限
        purMoney:'',//总金额
        purState:''//审核状态
      }],
      form:{
        purOrder:'',//订单号
        supplierName:'',//供货商
        storeName:'',//仓库
        purName:'',//制单人
        purTime:'',//制单日期
        sfName:'',//采购员
        purPer:'',//审核人
        auditTime:'',//交货期限
        purMoney:0,//总金额
        purRemark:'',//备注
        purXq:[{
          commName:'',
          commSpe:'',
          commCar:'',
          commUnit:'',
          commMoney:'',
          commNum:'',
          commSNum:''
        }],
      },
      multipleSelection:[{
        commNum:0
      }],
      commNum:'',
      supplier:[{
        supplierName:''
      }],
      store:[],
      staff:[],
      activeName:'first'
    }
  },methods:{
    clickDialog(){
      this.dialogFormVisible = true;
      this.form.purName = this.$store.state.message.myStaff.sfName;
      this.form.purTime = dayjs().format("YYYY-MM-DD");
      this.axios.get("hyj/getRandom").then(res=>{
        this.form.purOrder = res.request.response;
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    findSupplier(){
      this.axios.get('hyj/findAllSupplier').then(res=>{
        this.supplier = res.data;
      })
    },
    findStore(){
      this.axios.get("hyj/findAllStore").then(res=>{
        this.store = res.data;
      })
    },
    findCaiGou(){
      this.axios.get("hyj/findCaiGou").then(res=>{
        this.staff = res.data;
      })
    },
    findCommBySupplierName(){
      this.axios.post("hyj/findCommBySupplierName",this.form).then(res=>{
          this.form.purXq = res.data;
      })
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
              commNum:'',
              commSNum:''
            }],
      };
      this.findTable();
    },
    ensure(){
      this.form.purXq = this.multipleSelection
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.form.purMoney += this.multipleSelection[i].commNum * this.multipleSelection[i].commMoney;
      };
      this.axios.post("hyj/addPur",this.form).then(res=>{
        this.dialogFormVisible = false;
        ElMessage.success({
          message: '新增成功！',
          type: 'success',
        });
      });
    },
    findTable(){
      this.axios.get("hyj/findTable").then(res=>{
        this.tableData = res.data;
      });
      this.axios.get("hyj/findTable2").then(res=>{
        this.tableData2 = res.data;
      })
    },
    checkPur(v){
      this.checkPurDialog = true;
      this.form.purXq = v.purXq;
    },
    buy(x){
      this.axios.post("hyj/editState",x).then(res=>{
        /*ElMessage.success({
          message: '采购成功！',
          type: 'success',
        })*/
      })
    }
  },created() {
    this.findTable();
    this.findSupplier();
    this.findStore();
    this.findCaiGou();
  }
}
</script>

<style scoped>

</style>
