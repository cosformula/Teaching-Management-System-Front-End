import Index from './pages/Index.vue'
import StudentSelect from './pages/StudentSelect.vue'
import StudentCourseQuery from './pages/StudentCourseQuery.vue'
import StudentGradeQuery from './pages/StudentGradeQuery.vue'
import TCourseQuery from './pages/TCourseQuery.vue'
import ScoreRegistration from './pages/ScoreRegistration.vue'
import GradeSummary from './pages/GradeSummary.vue'
import GradeTrends from './pages/GradeTrends.vue'
import Edit from './components/Edit.vue'
import GradeStat from './pages/GradeStat.vue'
import MCourseManage from './pages/MCourseManage.vue'
import MStudentManage from './pages/MStudentManage.vue'
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

    component: GradeSummary
  },
  {
    path: '/student/grade-trends',
    component: GradeTrends
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
    component: ScoreRegistration
  },
  {
    path: '/teacher/grade-sta',
    component: GradeStat
  },
  {
    path: '/manager/teacher-manage',
    component: MStudentManage
  },
  {
    path: '/manager/student-manage',
    component: MStudentManage

  },

  {
    path: '/manager/course-manage',
    component: MCourseManage
  },
  {
    path: '/manager/grade-manage',
    component: StudentCourseQuery
  },
  {
    path: '/manager/grade-stat',
    component: StudentCourseQuery
  },
  {
    path: '/teacher/t-course-query',
    component: TCourseQuery
  },
  {
    path: '/edit/:course:stuno',
    component: Edit
  }
]

export default routes
