import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)
// import VueResource from 'vue-resource'
Vue.use(ElementUI)
// Vue.use(VueResource)
const instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
  headers: {
    // 'X-Custom-Header': 'foobar'
  }
});
const router = new VueRouter({
  routes
})

Vue.prototype.$http = instance
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
