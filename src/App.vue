<template>
  <div id="app">
    <el-container>
      <el-header style="background: #99a9bf;">
        <top-nav></top-nav>
        <!-- <el-button-group style="">
          <el-button type="primary" @click="saveData">保存</el-button>
          <el-button type="primary" @click="readData">读取</el-button>
          <el-button type="primary" @click="dialogVisible = true">导出</el-button>
          <el-button type="primary" @click="clearData">清空</el-button>
        </el-button-group>
        <el-button-group style="">
          <el-tooltip effect="dark" content="在页面内打开选课系统" placement="bottom">
            <el-button type="primary" @click="dialogXkVisible = true">快捷选课</el-button>
          </el-tooltip>
          <el-button type="primary" @click="dialogAboutVisible = true">关于</el-button>
          <el-button type="primary" @click="shuhelper">返回SHUhelper</el-button>
        </el-button-group>
        <el-button type="success">已选学分:{{ credit }}</el-button> -->
      </el-header>
      <el-container>
        <el-aside width="200px">
          <aside-nav/>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-dialog title="17-18春季学期选课系统" :visible.sync="dialogXkVisible" width="80%">
        <el-row>
          <el-col :span="6">
            <ol>
              <li v-for="item in courseWaited" v-if="item.status=='已选入'">
                {{ item.course_name }},{{item.teacher_name}},{{item.course_no}},{{item.teacher_no}}
              </li>
            </ol>
          </el-col>
          <el-col :span="18">
            <iframe src="http://xk.autoisp.shu.edu.cn:8080/" width="100%" height="500"></iframe>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog title="分享课表" v-model="dialogShareVisible" size="small">
        <p align="center" v-if="code==''">链接生成中请耐心等待...</p>
        <p align="center" v-if="code!=''">短链接已生成，您现在可以在任何地方通过
          <a :href="'http://xk.shuhelper.cn/'+code" target="_blank">http://xk.shuhelper.cn/{{ code }}</a>访问您的课表，也可以将这个链接分享给他人。</p>
      </el-dialog>
      <el-dialog title="关于我们" :visible.sync="dialogAboutVisible" size="small">
        <p>排课助手(xk.shuhelper.cn)是SHUhelper的一部分，主要是为了解决排课过程中的困难而制作的小工具，主要实现了搜索课程并从心仪的课程中排列出一份完美的课表的功能。</p>
        <p> 欢迎关注我们的微信公众号 搜索：
          <span style="color:red;">shuhelper</span> 或扫描下方二维码</p>
        <p align="center">
          <img width="100" src="https://static.shuhelper.cn/mp.jpg">
        </p>
        <p align="center">
          <a href="https://github.com/cosformula/CourseSchedulingHelper" target="_blank">开源代码</a>
        </p>
        <p align="center">
          <img src="http://forthebadge.com/images/badges/built-with-love.svg" />
          <img src="http://forthebadge.com/images/badges/uses-js.svg" />
          <img src="http://forthebadge.com/images/badges/makes-people-smile.svg" />
        </p>
        <blockquote style="color:grey;">遇到问题请加qq群：
          <span style="color:red;">368238744</span> 反馈</blockquote>
        <blockquote style="color:grey;">Version 0.10.0 | admin@shuhelper.cn | SHUhelper 开发委员会</blockquote>
        <blockquote>
          <span style="color:red;">♥</span>
          <span style="color:grey;">Do have faith in what you're doing.</span>
        </blockquote>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogAboutVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="当前选课结果" :visible.sync="dialogVisible" size="tiny">
        <ol>
          <li v-for="item in courseWaited" v-if="item.status=='已选入'">
            {{ item.course_name }},{{item.teacher_name}},{{item.course_no}},{{item.teacher_no}}
          </li>
        </ol>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import Schedule from './components/Schedule.vue'
import AsideNav from './components/AsideNav.vue'
import TopNav from './components/TopNav.vue'
export default {
  components: {
    Schedule,
    AsideNav,
    TopNav
  },
  data() {
    return {
      dialogXkVisible: false,
      dialogAboutVisible: false,
      dialogVisible: false,
      dialogShareVisible: false,
      code: ''
    }
  },
  created: function() {
  },
  methods: {
  }
}
</script>

<style>
html body {
  font-family: Helvetica, sans-serif;
  margin: 0;
}
</style>
