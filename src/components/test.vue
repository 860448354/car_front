<template>
  {{test}}
</template>

<script>
export default {
name: "test",
  data(){
    return{
      test:[]
    }
  },methods:{
    tests(){
      this.axios.get("find").then(res=>{
        this.test = res.data;
      })
    }
  },created() {
    this.tests();
  }
}
</script>

<style scoped>

</style>
