<template>
  <el-table
      :data="putSto.purchase.purXq"
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{ textAlign: 'center' }"
      style="width: 100%">
    <el-table-column prop="commName" label="配件名称"></el-table-column>
    <el-table-column prop="commSpe" label="配件规格"></el-table-column>
    <el-table-column prop="commCar" label="配件车型"></el-table-column>
    <el-table-column prop="commUnit" label="单位"></el-table-column>
    <el-table-column prop="commMoney" label="单价"></el-table-column>
    <el-table-column prop="commNum" label="购买数量"></el-table-column>
    <el-table-column prop="commSNum" width="200px" label="实际数量">
      <template v-slot="y">
        <el-input-number
            v-model="y.row.commSNum"
            controls-position="right"
            size="mini"
            :min="0"></el-input-number>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
name: "Repe"
}
</script>

<style scoped>

</style>
