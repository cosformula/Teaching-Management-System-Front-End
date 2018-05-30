<template>
  <div id="app">
    <el-container>
      <el-header style="background: #99a9bf;">
        <el-row style="height:100%;" justify="space-between" type="flex" align="middle">
          <el-col :span="6">
            <div class="grid-content" style="font-size:20px;color:white;">
              上海大学教务系统
              <!-- <div style="color:black;">上海大学排课助手
                <span style="color:grey;font-size:0.8rem;"> 17-18年春</span>
              </div> -->
            </div>
          </el-col>
          <!-- <el-col :span="12">
            <div class="grid-content">测试 </div>
          </el-col> -->
          <el-col :span="6" style="text-align:right;color:white;">
            <!--<div class="grid-content">登录</div>-->
            <el-button type="primary" @click="loginDialogVisible=true">{{$user.id}}</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="210px">
          <el-menu :router="true" default-active="/student/select" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1" v-if="$user.type==='student'">
              <template slot="title">
                <span slot="title">学生</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/student/select">选课退课</el-menu-item>
                <el-menu-item index="/student/course-query">课程查询</el-menu-item>
                <el-menu-item index="/student/grade-query">成绩查询</el-menu-item>
                <el-menu-item index="/student/grade-summary">成绩大表</el-menu-item>
                <el-menu-item index="/student/grade-trends">绩点走势</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2" v-if="$user.type==='teacher'">
              <template slot="title">
                <span slot="title">教师</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/teacher/my-course">我的开课</el-menu-item>
                <el-menu-item index="/teacher/grade-manage">成绩登记</el-menu-item>
                <el-menu-item index="/teacher/grade-stat">成绩统计</el-menu-item>
              </el-menu-item-group>

            </el-submenu>
            <el-submenu index="3" v-if="$user.type==='admin'">
              <template slot="title">
                <span slot="title">管理员</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/manager/teacher-manage">教师管理</el-menu-item>
                <el-menu-item index="/manager/student-manage">学生管理</el-menu-item>
                <el-menu-item index="/manager/course-manage">课程管理</el-menu-item>
                <el-menu-item index="/manager/class-manage">开课管理</el-menu-item>
                <!-- <el-menu-item index="/manager/select-manage">选课管理</el-menu-item> -->
                <!-- <el-menu-item index="/manager/grade-manage">成绩管理</el-menu-item> -->
                <el-menu-item index="/manager/grade-stat">成绩统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>

        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-dialog title="登陆" :visible.sync="loginDialogVisible">
        <el-form :model="form">
          <el-form-item label="账户名">
            <el-input v-model="form.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="loginDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onLogin">确 定</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import Schedule from './components/Schedule.vue'
import AsideNav from './components/AsideNav.vue'
// import TopNav from './components/TopNav.vue'
export default {
  components: {
    Schedule,
    AsideNav
  },
  data() {
    return {
      dialogXkVisible: false,
      dialogAboutVisible: false,
      dialogVisible: false,
      dialogShareVisible: false,
      loginDialogVisible: false,
      code: '',
      form: {
        id: '',
        password: ''
      }
    }
  },
  created: function() {},
  methods: {
    onLogin() {
      this.$user.id = this.form.id
      if (this.$user.id === '00000000') {
        this.$user.type = 'admin'
      } else if (parseInt(this.$user.id) <= 11000000) {
        this.$user.type = 'teacher'
      } else {
        this.$user.type = 'student'
      }
      this.loginDialogVisible = false
    }
  }
}
</script>

<style>
html body {
  font-family: Helvetica, sans-serif;
  margin: 0;
}
</style>
