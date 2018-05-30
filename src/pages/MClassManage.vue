<template>
  <div @keyup.enter="onQueryClick">
    <el-form :inline="true" size="small" ref="queryForm" :model="search" label-width="70px">
      <el-form-item label="课程号" prop="courseID">
        <el-input v-model="search.courseID"></el-input>
      </el-form-item>
      <el-form-item label="课程名" prop="courseName">
        <el-input v-model="search.courseName"></el-input>
      </el-form-item>
      <el-form-item label="教师号" prop="teacherID">
        <el-input v-model="search.teacherID"></el-input>
      </el-form-item>
      <el-form-item label="学期" prop="term">
        <el-input v-model="search.term"></el-input>
      </el-form-item>
      <el-form-item label="校区" prop="campus">
        <el-input v-model="search.campus"></el-input>
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
      <el-table-column prop="course.id" label="课程号" width="90">
      </el-table-column>
      <el-table-column prop="course.name" label="班级号">
      </el-table-column>
      <el-table-column prop="classID" label="教师号" width="60">
      </el-table-column>
      <el-table-column prop="teacher.name" label="教师" width="80">
      </el-table-column>
      <el-table-column prop="teacher.id" label="教师号" width="80">
      </el-table-column>
      <el-table-column prop="term" label="学期" width="80">
      </el-table-column>
      <el-table-column prop="enroll" label="人数" width="60">
      </el-table-column>
      <el-table-column prop="capacity" label="容量" width="60">
      </el-table-column>
      <el-table-column prop="campus" label="校区" width="60">
      </el-table-column>
      <el-table-column prop="time" label="时间">
      </el-table-column>
      <el-table-column prop="classroom" label="地点">
      </el-table-column>
      <!-- <el-table-column prop="username" label="用户名">
      </el-table-column> -->
      <!-- <el-table-column label="查看">
        <template slot-scope="scope">
          <el-button size="mini" @click="onStudentsOpen(scope.$index, scope.row)">选课学生</el-button>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next, jumper" :page-size="10" :total="total" :current-page="page" @current-change="handlePageCurrentChange">
    </el-pagination>
    <!-- <el-dialog title="新建" :visible.sync="studentsDialogVisible" width="100%">
      <class-students :classID="classID"></class-students>
    </el-dialog>     -->
    <el-dialog title="新建" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addForm" :model="form" label-width="80px">
        <el-form-item label="课程号" prop="courseID">
          <el-input v-model="form.courseID"></el-input>
        </el-form-item>
        <el-form-item label="班级号" prop="classID">
          <el-input v-model="form.classID"></el-input>
        </el-form-item>
        <el-form-item label="教师号" prop="teacherID">
          <el-input v-model="form.teacherID"></el-input>
        </el-form-item>
        <el-form-item label='学期' prop="term">
          <el-input v-model="form.term"></el-input>
        </el-form-item>
        <el-form-item label='时间' prop="time">
          <el-input v-model="form.time"></el-input>
        </el-form-item>
        <el-form-item label='容量' prop="capacity">
          <el-input v-model="form.capacity"></el-input>
        </el-form-item>
        <el-form-item label='地点' prop="classroom">
          <el-input v-model="form.classroom"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="addDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="`课程号：${editForm.id}`" :visible.sync="editDialogVisible" width="30%">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <!-- <el-form-item label="课程号" prop="courseID">
          <el-input v-model="editForm.courseID"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="班级号" prop="classID">
          <el-input v-model="editForm.classID"></el-input> -->
        <!-- </el-form-item> -->
        <el-form-item label="教师号" prop="teacherID">
          <el-input v-model="editForm.teacherID"></el-input>
        </el-form-item>
        <el-form-item label='学期' prop="term">
          <el-input v-model="editForm.term"></el-input>
        </el-form-item>
        <el-form-item label='时间' prop="time">
          <el-input v-model="editForm.time"></el-input>
        </el-form-item>
        <el-form-item label='容量' prop="capacity">
          <el-input v-model="editForm.capacity"></el-input>
        </el-form-item>
        <el-form-item label='地点' prop="classroom">
          <el-input v-model="editForm.classroom"></el-input>
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
        courseID: '',
        courseName: '',
        teacherID: '',
        term: '',
        campus: ''
      },
      form: {
        classID: '',
        teacherID: '',
        capacity: '',
        courseID: '',
        term: '',
        classroom: '',
        time: '',
        campus: ''
      },
      editForm: {
        classID: '',
        teacherID: '',
        capacity: '',
        courseID: '',
        term: '',
        classroom: '',
        time: '',
        campus: ''
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
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`/api/classes/${row.id}`).then(resp => {
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
      this.$http.put(`/api/classes/${this.editForm.id}`, this.editForm).then(resp => {
        this.editDialogVisible = false
        this.$message({ message: '修改成功' })
        this.query()
      })
    },
    onSubmit() {
      this.$http
        .post('/api/classes/', this.form)
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
      let search = this.search
      this.$http
        .get(
          `/api/classes/?teacherID=${search.teacherID}&campus=${search.campus}&term=${search.term}&courseID=${search.courseID}&courseName=${
            search.courseName
          }&page=${this.page}&perPage=10`
        )
        .then(response => {
          this.tableData = response.data.classes
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
