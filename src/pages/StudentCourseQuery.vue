<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- <span>卡片名称</span> -->
      <el-form>
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
    </div>
    <el-table v-loading="loading" :data="grades" border style="width: 100%">
      <el-table-column prop="class.course.id" label="课程号">
      </el-table-column>
      <el-table-column prop="class.course.credit" label="学分">
      </el-table-column>
      <el-table-column prop="class.classID" label="班级号">
      </el-table-column>
      <el-table-column prop="class.teacher.name" label="教师名">
      </el-table-column>
      <el-table-column prop="class.course.name" sortable label="课程名">
      </el-table-column>
      <el-table-column prop="class.time" sortable label="上课时间">
      </el-table-column>
      <el-table-column prop="class.classroom" sortable label="上课地点">
      </el-table-column>
      <el-table-column prop="class.qTime" sortable label="答疑时间">
      </el-table-column>
      <el-table-column prop="class.qPlace" sortable label="答疑地点">
      </el-table-column>
    </el-table>
  </el-card>

</template>

<script>
export default {
  data() {
    return {
      grades: [],
      loading: false,
      term: '2018_1'
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
      this.$http.get(`/api/students/${this.$user.id}/classes?term=${this.term}`).then(resp => {
        // console.log(resp)
        this.loading = false
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
