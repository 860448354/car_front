<template>
  <el-select v-model="store2" style="margin-top: 20px;margin-left: 20px" @change="test" placeholder="请选择">
    <el-option
        v-for="item in store"
        :key="item.storeName"
        :label="item.storeName"
        :value="item.storeName">
    </el-option>
  </el-select>
  <el-table
      :data="tableData"
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{ textAlign: 'center' }"
      style="width: 100%">
    <el-table-column prop="storeName" label="仓库名称">
      <template v-slot:default="r">
        {{r.row.store[0].storeName}}
      </template>
    </el-table-column>
    <el-table-column prop="supplierName" label="供货商"></el-table-column>
    <el-table-column prop="repeCommName" label="配件名称"></el-table-column>
    <el-table-column prop="repeCommSpe" label="配件规格"></el-table-column>
    <el-table-column prop="repeCommCar" label="车型"></el-table-column>
    <el-table-column prop="repeCommUnit" label="单位"></el-table-column>
    <el-table-column prop="repeCommNum" label="数量"></el-table-column>
  </el-table>
</template>

<script>
export default {
name: "Repe",
  data(){
    return{
      tableData:[{
        storeName:'',
        supplierName:'',
        commName:'',
        commSpe:'',
        commCar:'',
        CommUnit:'',
        commNum:'',
        comms:[{
          supplierName:''
        }],
        store:[{
          storeName:''
        }]
      }],
      store:[{
        storeName:''
      }],
      store2:'一号仓库'
    }
  },
  methods:{
    findStore(){
      this.axios.get("hyj/findAllStore").then(res=>{
        this.store = res.data;
      })
    },
    test(){
      this.axios({url:"hyj/findRe",params:{store:this.store2}}).then(res=>{
        this.tableData = res.data
      })
    }
  },
  created() {
    this.findStore();
    this.test()
  }
}
</script>

<style scoped>

</style>
