<template>
  <el-row style="padding:0 0 0px 0;height:calc(100vh - 90px);">
    <el-col :xs="8" :md="8" style="height:100%;">
      <schedule :task-detail="courseSelected" @showDetail="showDetail" />
    </el-col>
    <el-col :xs="16" :md="16">
      <el-tabs type="border-card" :tab-position="'top'" style="height:calc(100vh - 90px);">
        <el-tab-pane label="待选课程">
          <waitcourse :courseWaited="courseWaited" @addSchedule="addSchedule" @delCourse="delCourse" />
          <el-button style="margin-top:10px;" @click="submitCourses">提交课表</el-button>
          <!-- <el-button style="margin-top:10px;">重置课表</el-button> -->
        </el-tab-pane>
        <el-tab-pane label="搜索课程">
          <searchcourse @addCourse="addCourse" />
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import Schedule from '../components/Schedule.vue'
import Waitcourse from '../components/Waitcourse.vue'
import Searchcourse from '../components/Searchcourse.vue'
var cnNum = {
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5
}
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
    // var code = this.getCode()
    this.readData()
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
    courseSubmit: function() {
      let ids = []
      for (var i = this.courseWaited.length - 1; i >= 0; i--) {
        if (this.courseWaited[i].status == '已选入') {
          ids.push(this.courseWaited[i].id)
        }
      }
      return ids
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
            for (var x = timelist[j].start; x <= timelist[j].end; x++) {
              table[day][x] = 1
            }
          }
        }
      }
      return table
    },
    courseSelected: function() {
      var selected = [[], [], [], [], []]
      for (var i = this.courseWaited.length - 1; i >= 0; i--) {
        if (this.courseWaited[i].status == '已选入') {
          var timelist = this.coursetimeToNum(this.courseWaited[i].time)
          var color = ['#2B2E4A', '#521262', '#903749', '#53354A', '#40514E', '#537780', '#3765a4', '#76a5a4', '#579870', '#e391b4', '#b8954e']
          var course = this.courseWaited[i]
          let colorIndex = Math.abs(this.hashCode(course.course.name) % color.length)
          var rancolor = color[colorIndex]
          for (var j = timelist.length - 1; j >= 0; j--) {
            var time = timelist[j]
            var item = {
              id: course.id,
              day: time.day,
              start: time.start,
              end: time.end,
              course: course.course,
              teacher: course.teacher,
              status: course.status,
              classID: course.classID,
              styleObj: {
                height: (time.end - time.start + 1) * 7.7 + '%',
                top: (time.start - 1) * 7.69 + '%',
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
    hashCode: function(s) {
      var h = 0,
        l = s.length,
        i = 0
      if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0
      return h
    },
    showDetail: function(course) {
      this.$confirm('从课表中删除' + course.course.name + course.teacher.name + ', 是否继续?', '提示', {
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
        if (this.courseWaited[i].course.id == course.course.id && this.courseWaited[i].classID == course.classID) {
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
          day: parseInt(cnNum[coursetime[1]] - 1),
          start: parseInt(coursetime[2]),
          end: parseInt(coursetime[3])
        }
        timelist.push(item)
      }
      return timelist
    },
    locateCourse(course) {
      for (var i = this.courseWaited.length - 1; i >= 0; i--) {
        if (this.courseWaited[i].course.id == course.course.id && this.courseWaited[i].classID == course.classID) {
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
        for (var j = timelist[i].start; j <= timelist[i].end; j++) {
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
    readLocal() {
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
    readData() {
      this.$http.get(`/api/students/${this.$user.id}/classes?term=2018_1`).then(resp => {
        console.log(resp)
        let classes = resp.data.classes
        for (let item of classes) {
          item.class.status = '已选入'
          this.courseWaited.push(item.class)
        }
      })
    },
    submitCourses() {
      this.$http
        .post(`/api/students/${this.$user.id}/classes?term=2018_1`, {
          courses: this.courseSubmit
        })
        .then(resp => {
          this.$message({
            type: 'success',
            message: '提交选课成功!'
          })
        })
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
    }
  }
}
</script>
