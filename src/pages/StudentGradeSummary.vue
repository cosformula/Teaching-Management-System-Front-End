<template>
  <el-card class="box-card">
    <el-table v-loading="loading" :data="grades" border style="width: 100%">
      <el-table-column prop="class.course.id" label="课程号">
      </el-table-column>
      <el-table-column prop="class.course.credit" label="学分">
      </el-table-column>
      <el-table-column prop="class.classID" label="班级号">
      </el-table-column>
      <el-table-column prop="class.teacher.name" label="教师名">
      </el-table-column>
      <el-table-column prop="class.teacher.id" label="教师号">
      </el-table-column>
      <el-table-column prop="class.term" label="学期">
      </el-table-column>
      <el-table-column prop="class.course.name" sortable label="课程名">
      </el-table-column>
      <el-table-column prop="grade_1" sortable label="成绩">
      </el-table-column>
      <el-table-column prop="point" sortable label="绩点">
      </el-table-column>
    </el-table>
    <el-button style="float:right;margin:10px;">GPA: {{gpa}}</el-button>
  </el-card>

</template>

<script>
export default {
  data() {
    return {
      grades: [],
      term: '2018_1',
      loading: false,
      gpa: 0
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
    readData() {
      this.loading = true
      this.$http.get(`/api/students/${this.$user.id}/classes`).then(resp => {
        // console.log(resp)
        this.loading = false
        this.gpa = resp.data.gpa
        this.grades = resp.data.classes
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
