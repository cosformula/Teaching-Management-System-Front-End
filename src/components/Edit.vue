<template>
  <div class="edit container">
    <h1 class="page-header">编辑成绩</h1>
    <form v-on:submit="updateCustomer">
      <div class="well">
        <h4>学生成绩</h4>
        <div class="form-group">
          <label>平时成绩</label>
          <input type="text" class="form-control" v-model="tableData.dailyscore">
        </div>
        <div class="form-group">
          <label>期末成绩</label>
          <input type="text" class="form-control" v-model="tableData.finalscore">
        </div>
        <div class="form-group">
          <label>总评</label>
          <input type="text" class="form-control" v-model="tableData.finalscore">
        </div>
        <button type="submit" class="btn btn-primary">确认</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'edit',
  data() {
    return {
      tableData: {}
    }
  },

  components: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
