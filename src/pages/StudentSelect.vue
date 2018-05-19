<template>
  <el-row style="padding:0;">
    <el-col :xs="16" :md="16" style="min-height:700px;height:90vh;max-height:1000px;">
      <el-tabs type="border-card" :tab-position="'top'" style="height:700px;">
        <el-tab-pane label="待选课程">
          <waitcourse :courseWaited="courseWaited" @addSchedule="addSchedule" @delCourse="delCourse" />
        </el-tab-pane>
        <el-tab-pane label="搜索课程">
          <searchcourse @addCourse="addCourse" />
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :xs="8" :md="8" style="min-height:700px;height:700px;max-height:1000px;">
      <schedule :task-detail="courseSelected" @showDetail="showDetail" />
    </el-col>
  </el-row>
</template>

<script>
import Schedule from '../components/Schedule.vue'
import Waitcourse from '../components/Waitcourse.vue'
import Searchcourse from '../components/Searchcourse.vue'

export default {
  components: {
    Schedule,
    Waitcourse,
    Searchcourse
  },
  data() {
    return {
      courseWaited: [],
      dialogXkVisible: false,
      dialogAboutVisible: false,
      dialogVisible: false,
      dialogShareVisible: false,
      code: ''
    }
  },
  created: function() {
    var code = this.getCode()
    if (code == null) {
      this.readData()
    } else {
      this.pull(code)
    }
  },
  computed: {
    credit: function() {
      var credit = 0
      for (var i = this.courseWaited.length - 1; i >= 0; i--) {
        if (this.courseWaited[i].status == '已选入') {
          credit += parseInt(this.courseWaited[i].credit)
        }
      }
      return credit
    },
    timeTable: function() {
      var table = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
      for (var i = this.courseWaited.length - 1; i >= 0; i--) {
        if (this.courseWaited[i].status == '已选入') {
          var timelist = this.coursetimeToNum(this.courseWaited[i].time)
          for (var j = timelist.length - 1; j >= 0; j--) {
            var day = timelist[j].day
            for (var x = timelist[j].Start; x <= timelist[j].End; x++) {
              table[day][x] = 1
            }
          }
        }
      }
      return table
    },
    courseSelected: function() {
      console.log('courseSelected')
      var selected = [[], [], [], [], []]
      for (var i = this.courseWaited.length - 1; i >= 0; i--) {
        if (this.courseWaited[i].status == '已选入') {
          var timelist = this.coursetimeToNum(this.courseWaited[i].time)
          var color = ['#2B2E4A', '#521262', '#903749', '#53354A', '#40514E', '#537780']
          var course = this.courseWaited[i]
          var rancolor = color[~~(Math.random() * color.length)]
          for (var j = timelist.length - 1; j >= 0; j--) {
            var time = timelist[j]
            var item = {
              day: time.day,
              Start: time.Start,
              End: time.End,
              coursename: course.course_name,
              courseno: course.course_no,
              teachname: course.teacher_name,
              teachno: course.teacher_no,
              status: course.status,
              styleObj: {
                height: (time.End - time.Start + 1) * 7.7 + '%',
                top: (time.Start - 1) * 7.69 + '%',
                backgroundColor: rancolor
              }
            }
            selected[time.day].push(item)
          }
        }
      }
      return selected
    }
  },
  methods: {
    getCode: function() {
      return decodeURIComponent((new RegExp('n/' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
    },
    pull: function(code) {
      this.$http
        .get('/api/pull?code=' + code)
        .then(response => {
          this.courseWaited = response.data
          this.$message({
            message: '已成功拉取云端的数据',
            type: 'success'
          })
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    push: function() {
      this.dialogShareVisible = true
      this.code = ''
      this.$http
        .post('/api/push', JSON.stringify(this.courseWaited))
        .then(response => {
          this.$message({
            message: '已成功推送数据到云端',
            type: 'success'
          })
          this.code = response.data
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    showDetail: function(course) {
      this.$confirm('从课表中删除' + course.coursename + course.teachname + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delCourse(course)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addCourse: function(course) {
      var conflict = false
      for (var i = this.courseWaited.length - 1; i >= 0; i--) {
        if (this.courseWaited[i].course_no == course.course_no && this.courseWaited[i].teacher_no == course.teacher_no) {
          conflict = true
          break
        }
      }
      if (conflict) {
        this.$message({
          message: '已经加入过此课程',
          type: 'warning'
        })
      } else {
        this.$set(course, 'status', '待加入')
        this.courseWaited.push(course)
        this.$message({
          message: '已将此课程加入待选课程列表',
          type: 'success'
        })
      }
    },
    coursetimeToNum(time) {
      var patt = /([\u4e00|\u4e8c|\u4e09|\u56db|\u4e94])([0-9]+)-([0-9]+)\s*(?:([\u5355|\u53cc|])|\((?:([0-9]+)-([0-9]+)\u5468)\)|\((?:([0-9]+),([0-9]+)\u5468)\))*/
      var timelist = []
      var str = time
      while (patt.test(str)) {
        var coursetime = patt.exec(str)
        str = str.replace(patt, '')
        var item = {
          day: parseInt(cn_num[coursetime[1]] - 1),
          Start: parseInt(coursetime[2]),
          End: parseInt(coursetime[3])
        }
        timelist.push(item)
      }
      return timelist
    },
    locateCourse(course) {
      for (var i = this.courseWaited.length - 1; i >= 0; i--) {
        if (this.courseWaited[i].course_no == course.course_no && this.courseWaited[i].teacher_no == course.teacher_no) {
          return i
        }
      }
      return -1
    },
    addSchedule: function(course) {
      //检测待加入的课程是否有冲突
      var index = this.locateCourse(course)
      var conflict = false
      var timelist = this.coursetimeToNum(this.courseWaited[index].time)
      for (var i = timelist.length - 1; i >= 0; i--) {
        for (var j = timelist[i].Start; j <= timelist[i].End; j++) {
          if (this.timeTable[timelist[i].day][j] != 0) {
            conflict = true
          }
        }
      }
      if (conflict) {
        this.$message({
          message: '课程时间冲突！',
          type: 'warning'
        })
      } else {
        this.$set(this.courseWaited[index], 'status', '已选入')
        this.$message({
          message: '已将此课程加入课程表',
          type: 'success'
        })
      }
    },
    delCourse: function(course) {
      var index = this.locateCourse(course)
      console.log('delcourse')
      if (course.status == '已选入') {
        this.$set(this.courseWaited[index], 'status', '待加入')
      } else {
        this.courseWaited.splice(index, 1)
      }
      this.$message({
        message: '已成功删除该课程',
        type: 'success'
      })
    },
    saveData() {
      var courseWaited = JSON.stringify(this.courseWaited)
      localStorage.setItem('courseWaited', courseWaited)
      this.$message({
        message: '已成功保存当前状态',
        type: 'success'
      })
    },
    readData() {
      if (JSON.parse(localStorage.getItem('courseWaited'))) {
        this.courseWaited = JSON.parse(localStorage.getItem('courseWaited'))
        this.$message({
          message: '已成功读取上次的数据',
          type: 'success'
        })
      } else {
        this.$message({
          message: '无数据',
          type: 'warning'
        })
      }
    },
    clearData() {
      this.$confirm('此操作将删除目前的选课结果且无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.courseWaited = []
          timetableinit()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    shuhelper() {
      window.open('https://www.shuhelper.cn/')
    }
  }
}
</script>
