<template>
  <div @keyup.enter="onQueryClick">
    <el-form :inline="true" size="small" ref="queryForm" :model="search" label-width="70px">
      <el-form-item label="工号" prop="id">
        <el-input v-model="search.id"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="search.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetFields">
          重置
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onQueryClick">
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDialogVisible=true" type="primary">
          新建
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" highlight-current-row border max-height="600">
      <el-table-column prop="id" label="工号">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="dept" label="部门">
      </el-table-column>
      <!-- <el-table-column label="查看">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">开设课程</el-button>
        </template>
      </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next, jumper" :page-size="10" :total="total" :current-page="page" @current-change="handlePageCurrentChange">
    </el-pagination>
    <el-dialog title="新建" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addForm" :model="form" label-width="80px">
        <el-form-item label="教师号" prop="id">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="教师名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label='学院' prop="dept">
          <el-input v-model="form.dept"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="addDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="`教师号：${editForm.id}`" :visible.sync="editDialogVisible" width="30%">
      <el-form ref="addForm" :model="editForm" label-width="80px">
        <el-form-item label="教师号" prop="id">
          <el-input v-model="editForm.id"></el-input>
        </el-form-item>
        <el-form-item label="教师名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label='学院' prop="dept">
          <el-input v-model="editForm.dept"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onEditSubmit">修改</el-button>
          <el-button @click="editDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addDialogVisible: false,
      tableData: [],
      search: {
        id: '',
        name: ''
      },
      form: {
        id: '',
        name: '',
        dept: ''
      },
      editForm: {
        id: '',
        name: '',
        dept: ''
      },
      page: 1,
      currentRow: null,
      editDialogVisible: false,
      scroll: true,
      total: 0,
      searchQueryIsDirty: false
    }
  },
  created: function() {
    this.query()
  },
  watch: {
    form: {
      handler: function() {
        this.searchQueryIsDirty = true
        this.onFormChange()
      },
      deep: true
    }
  },
  methods: {
    handleDelete(index, row) {
      console.log(row)
      this.$confirm('此操作将永久删除该教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`/api/teachers/${row.id}`).then(resp => {
            console.log(resp)
            this.query()
            this.$message({ message: '删除成功' })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleEdit(index, row) {
      this.editForm = row
      this.editDialogVisible = true
    },
    handlePageCurrentChange(val) {
      this.page = val
      // this.tableData = []
      this.query()
    },
    onQueryClick() {
      this.page = 1
      this.query()
    },
    resetFields() {
      this.$refs['queryForm'].resetFields()
    },
    onEditSubmit() {
      this.$http.put(`/api/teachers/${this.editForm.id}`, this.editForm).then(resp => {
        this.editDialogVisible = false
        this.$message({ message: '修改成功' })
        this.query()
      })
    },
    onSubmit() {
      this.$http
        .post('/api/teachers/', this.form)
        .then(resp => {
          console.log(this.$refs)
          this.$refs['queryForm'].resetFields()
          this.$refs['addForm'].resetFields()
          this.addDialogVisible = false
          this.$message({ message: '新建成功' })
          this.page = 1
          this.query()
        })
        .catch(err => {
          console.log(err)
        })
    },
    query() {
      this.$http.get(`/api/teachers/?id=${this.search.id}&name=${this.search.name}&page=${this.page}&perPage=10`).then(response => {
        this.tableData = response.data.teachers
        this.total = response.data.total
      })
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    addWait(index, row) {
      this.$emit('addCourse', row)
    }
  }
}
</script>
