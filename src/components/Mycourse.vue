<template>
<div  @keyup.enter="onsubmit" >
   
    <el-table
    :data="tableData"
    highlight-current-row
    border
    max-height="600">
        
    <el-table-column label="操作" width="150" >
      <template scope="scope">
        <el-popover
    
     trigger="click">
  <el-table :data="gridData">
    <el-table-column width="150" property="stuno" label="学号"></el-table-column>
    <el-table-column width="100" property="name" label="姓名"></el-table-column>
  </el-table>
  <el-button slot="reference" size="small">查看选课学生</el-button>
</el-popover>
      </template>
    </el-table-column>
    <el-table-column
		  prop="course_na"
      label="课程名"
      width="150">
     
    </el-table-column>
    <el-table-column
		  prop="teacher_na"
      label="教师"
      width="80">
     
    </el-table-column>
    <el-table-column
      prop="course_no"
      label="课程号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="credit"
      label="学分"
      width="80">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时间"
      width="150">
    </el-table-column>
    <el-table-column
		  prop="nub"
      label="人数"
      width="100">
      
    </el-table-column>
    <el-table-column
      prop="campus"
      label="校区"
      width="100">
    </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next, jumper" :page-size="50" :total="total" :current-page="page" @current-change="handlePageCurrentChange">
    </el-pagination>
  
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
				  course_na:'数据库',
					teacher_na:'宋波',
					course_no:'1000',
					credit:'3',
					time:'星期五 3-4',
					nub:'35',
					campus:'宝山校区',
				
				
				
			}
			],
			gridData: [{
          stuno: '15121000',
          name: '王小虎',
 
        }, {
          stuno: '15121000',
          name: '王小虎',
   
        }, {
          stuno: '15121000',
          name: '王小虎',
   
        }, {
          stuno: '15121000',
          name: '王小虎',
 
        }],
      form: {
        courseno: '',
        coursename: '',
        teachname: '',
        credit: '',
        coursetime: '',
        campus: ''
      },
      page: 1,
      currentRow: null,
      scroll: true,
      total: 0,
      searchQueryIsDirty: false
    }
  },
  created: function() {
    this.query()
  },
  watch: {
    form: {
      handler: function() {
        this.searchQueryIsDirty = true
        this.onFormChange()
      },
      deep: true
    }
  },
  methods: {
    getSummaries(param) {
          const { columns, data } = param
          const sums = []
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '总价'
              return
            }
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
              sums[index] += ' 元'
            } else {
              sums[index] = 'N/A'
            }
          })
    
          return sums
        }
  }
}
</script>
