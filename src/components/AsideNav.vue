<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
  <el-menu :router="true" default-active="/student/select" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">学生</span>
      </template>
      <el-menu-item-group>
        <!-- <span slot="title">常用功能</span> -->
        <el-menu-item index="/student/select">选课退课</el-menu-item>
        <el-menu-item index="/student/course-query">课程查询</el-menu-item>
        <el-menu-item index="/student/grade-query">成绩查询</el-menu-item>
        <el-menu-item index="/student/grade-summary">成绩大表</el-menu-item>
        <el-menu-item index="/student/grade-trends">绩点走势</el-menu-item>
      </el-menu-item-group>
      <!-- <el-menu-item-group title="分组2">

        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">教师</span>
      </template>
      <el-menu-item-group>
        <!-- <span slot="title">常用功能</span> -->
        <el-menu-item index="/teacher/t-course-query">我的开课</el-menu-item>
        <el-menu-item index="/teacher/grade-manage">成绩登记</el-menu-item>
        <el-menu-item index="/teacher/grade-sta">成绩统计</el-menu-item>
      </el-menu-item-group>
      <!-- <el-menu-item-group title="分组2">

        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">管理员</span>
      </template>
      <el-menu-item-group>
        <!-- <span slot="title">常用功能</span> -->
        <el-menu-item index="/manager/teacher-manage">教师管理</el-menu-item>
        <el-menu-item index="/manager/student-manage">学生管理</el-menu-item>
        <el-menu-item index="/manager/course-manage">课程管理</el-menu-item>
        <el-menu-item index="/manager/class-manage">开课管理</el-menu-item>
        <!-- <el-menu-item index="/manager/select-manage">选课管理</el-menu-item> -->
        <!-- <el-menu-item index="/manager/grade-manage">成绩管理</el-menu-item> -->
        <el-menu-item index="/manager/grade-stat">成绩统计</el-menu-item>
      </el-menu-item-group>
      <!-- <el-menu-item-group title="分组2">

        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
    </el-submenu>
    <!-- <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item> -->
    <!-- <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item> -->
  </el-menu>

</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
