<template>
  <el-row style="padding:0;">
    <el-col :xs="24" :md="24" style="min-height:700px;height:90vh;max-height:1000px;">
      <scorers @addCourse="addCourse" />
    </el-col>
  </el-row>
</template>

<script>
// import Schedule from '../components/Schedule.vue'
// import Waitcourse from '../components/Waitcourse.vue'
import Scorers from '../components/Scorers.vue'

export default {
  components: {
    // Schedule,
    // Waitcourse,
    Scorers
  },
  data() {
    return {
    }
  },
}
</script>
