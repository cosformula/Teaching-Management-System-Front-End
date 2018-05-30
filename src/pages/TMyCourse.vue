<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form >
        <el-form-item label="选择学期">
          <el-select v-model="term" placeholder="选择学期">
            <el-option label="17-18秋" value="2017_1"></el-option>
            <el-option label="17-18冬" value="2017_2"></el-option>
            <el-option label="17-18春" value="2017_3"></el-option>
            <el-option label="17-18夏" value="2017_4"></el-option>
            <el-option label="18-19秋" value="2018_1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="onNewClassClick">新开课程</el-button>
    </div>
    <el-table v-loading="loading" :data="classes" highlight-current-row border max-height="600">
      <el-table-column prop="course.name" label="课程名" width="150">
      </el-table-column>
      <el-table-column prop="course.id" label="课程号" width="100">
      </el-table-column>
      <el-table-column prop="classID" label="班级号" width="100">
      </el-table-column>
      <el-table-column prop="course.credit" label="学分" width="80">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="150">
      </el-table-column>
      <el-table-column prop="classroom" label="教室" width="150">
      </el-table-column>
      <el-table-column prop="capacity" label="容量" width="100">
      </el-table-column>
      <el-table-column prop="campus" label="校区" width="100">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button slot="reference" size="small" @click="onPopoverClick(scope.row)">选课名单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible">
      <el-table :data="students">
        <el-table-column property="student.id" label="学号"></el-table-column>
        <el-table-column property="student.name" label="姓名"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="新建" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addForm" :model="form" label-width="80px">
        <el-form-item label="课程号" prop="courseID">
          <el-input v-model="form.courseID"></el-input>
        </el-form-item>
        <el-form-item label="班级号" prop="classID">
          <el-input v-model="form.classID"></el-input>
        </el-form-item>
        <el-form-item label="教师号" prop="teacherID">
          <el-input disabled v-model="form.teacherID"></el-input>
        </el-form-item>
        <el-form-item label='学期' prop="term">
          <el-input disabled v-model="form.term"></el-input>
        </el-form-item>
        <el-form-item label='校区' prop="time">
          <el-input v-model="form.campus"></el-input>
        </el-form-item>
        <!-- <el-form-item label='容量' prop="capacity">
          <el-input v-model="form.capacity"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label='地点' prop="classroom">
          <el-input v-model="form.classroom"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="addDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      classes: [],
      term: '2018_1',
      dialogVisible: false,
      addDialogVisible: false,
      loading: false,
      form: {
        classID: '',
        teacherID: this.$user.id,
        capacity: 70,
        courseID: '',
        term: '2018_1',
        classroom: '',
        time: '',
        campus: ''
      }
    }
  },
  watch: {
    term: function(newVal, oldVal) {
      this.readData()
    }
  },
  created() {
    this.readData()
  },
  methods: {
    onSubmit() {
      this.$http
        .post('/api/classes/', this.form)
        .then(resp => {
          console.log(this.$refs)
          this.$refs['addForm'].resetFields()
          this.addDialogVisible = false
          this.$message({ message: '新建成功' })
          this.readData()
          // this.page = 1
          // this.query()
        })
        .catch(err => {
          console.log(err)
        })
    },
    onNewClassClick() {
      this.addDialogVisible = true
    },
    onPopoverClick(row) {
      this.students = row.students
      this.dialogVisible = true
    },
    readData() {
      this.loading = true
      this.$http.get(`/api/teachers/${this.$user.id}/classes?term=${this.term}`).then(resp => {
        // console.log(resp)
        this.loading = false
        this.classes = resp.data.classes
      })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
}
</script>
