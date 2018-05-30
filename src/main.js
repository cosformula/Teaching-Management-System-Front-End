import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import routes from './routes'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(VueRouter)
Vue.use(ElementUI)
const instance = axios.create({
  // baseURL: 'http://localhost:5000',
  // timeout: 1000,
  headers: {
    // 'X-Custom-Header': 'foobar'
  }
});
Vue.prototype.$http = instance
Vue.prototype.$user = {
  // id: '10008080',
  id: '15121604',
  type: 'student'
}

const router = new VueRouter({
  routes
})

//Vue.prototype.$http = instance
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
