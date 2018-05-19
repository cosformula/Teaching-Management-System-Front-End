import Index from './pages/Index.vue'
import StudentSelect from './pages/StudentSelect.vue'
import StudentCourseQuery from './pages/StudentCourseQuery.vue'

const routes = [{
    path: '/',
    component: Index
  },
  {
    path: '/student/select',
    component: StudentSelect
  }, {
    path: '/student/course-query',
    component: StudentCourseQuery
  }
]

export default routes
