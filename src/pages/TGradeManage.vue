<template>
  <div @keyup.enter="onQueryClick">
    <el-form :inline="true" size="small">
      <el-form-item label="选择学期">
        <el-select v-model="term" placeholder="选择学期">
          <el-option label="17-18秋" value="2017_1"></el-option>
          <el-option label="17-18冬" value="2017_2"></el-option>
          <el-option label="17-18春" value="2017_3"></el-option>
          <el-option label="17-18夏" value="2017_4"></el-option>
          <el-option label="18-19秋" value="2018_1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择课程">
        <el-select v-model="classIndex" placeholder="选择课程">
          <el-option v-for="(_class,index) in classes" :key="_class.id" :label="_class.course.name+_class.classID" :value="index"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="students" highlight-current-row border max-height="600">
      <el-table-column prop="student.id" label="学号" width="100">
      </el-table-column>
      <el-table-column prop="student.name" label="学生姓名">
      </el-table-column>
      <el-table-column prop="grade_1" label="平时成绩" width="80">
      </el-table-column>
      <el-table-column prop="grade_2" label="期末成绩" width="80">
      </el-table-column>
      <el-table-column prop="grade" label="总评" width="80">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="'提交成绩'" :visible.sync="editDialogVisible" width="30%">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label='平时成绩' prop="grade_1">
          <el-input v-model="editForm.grade_1"></el-input>
        </el-form-item>
        <el-form-item label='期末成绩' prop="grade_2">
          <el-input v-model="editForm.grade_2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onEditSubmit">提交</el-button>
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
      term: '2018_1',
      classes: [],
      classIndex: null,
      editForm: {
        grade_1: 0,
        grade_2: 0
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
    this.readData()
  },
  computed: {
    students: function() {
      if (this.classes[this.classIndex]) {
        return this.classes[this.classIndex].students
      } else {
        return []
      }
    }
  },
  watch: {
    form: {
      handler: function() {
        this.searchQueryIsDirty = true
        this.onFormChange()
      },
      deep: true
    },
    term: function(newVal, oldVal) {
      this.readData()
    }
  },
  methods: {
    readData() {
      this.$http.get(`/api/teachers/${this.$user.id}/classes?term=${this.term}`).then(resp => {
        // console.log(resp)
        this.classes = resp.data.classes
      })
    },
    handleDelete(index, row) {
      console.log(row)
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`/api/courses/${row.id}`).then(resp => {
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
      console.log(row)
      this.editDialogVisible = true
    },
    handlePageCurrentChange(val) {
      this.page = val
      this.tableData = []
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
      this.$http.put(`/api/students/${this.editForm.student.id}/classes/${this.editForm.class_id}`, this.editForm).then(resp => {
        this.editDialogVisible = false
        this.$message({ message: '修改成功' })
        this.readData()
      })
    },
    onSubmit() {
      this.$http
        .post('/api/courses/', this.form)
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
      this.$http
        .get(
          `/api/courses/?credit=${this.search.credit}&id=${this.search.id}&name=${this.search.name}&dept=${this.search.dept}&page=${
            this.page
          }&perPage=10`
        )
        .then(response => {
          this.tableData = response.data.courses
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
