import Index from './pages/Index.vue'
import StudentSelect from './pages/StudentSelect.vue'
import StudentCourseQuery from './pages/StudentCourseQuery.vue'
import StudentGradeQuery from './pages/StudentGradeQuery.vue'
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
  },
  {
    path: '/student/grade-query',
    component: StudentGradeQuery
  },
  {
    path: '/student/grade-summary',

    component: StudentCourseQuery
  },
  {
    path: '/student/grade-trends',
    component: StudentCourseQuery
  },
  {
    path: '/teacher/new-class',
    component: StudentCourseQuery
  },
  {
    path: '/teacher/course-query',
    component: StudentCourseQuery
  },
  {
    path: '/teacher/grade-manage',
    component: StudentCourseQuery
  },
  {
    path: '/teacher/grade-state',
    component: StudentCourseQuery
  },
  {
    path: '/manager/teacher-manage',
    component: StudentCourseQuery
  },
  {
    path: '/manager/student-manage',
    component: StudentCourseQuery
  },

  {
    path: '/manager/course-manage',
    component: StudentCourseQuery
  },
  {
    path: '/manager/grade-manage',
    component: StudentCourseQuery
  },
  {
    path: '/manager/grade-stat',
    component: StudentCourseQuery
  },








]

export default routes
