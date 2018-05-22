<template>
	<el-card class="box-card">
	<div slot="header" class="clearfix">
		<!-- <span>卡片名称</span> -->
		<el-dropdown>
			<span class="el-dropdown-link">
				选择课程
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>黄金糕</el-dropdown-item>
				<el-dropdown-item>狮子头</el-dropdown-item>
				<el-dropdown-item>螺蛳粉</el-dropdown-item>
				<el-dropdown-item disabled>双皮奶</el-dropdown-item>
				<el-dropdown-item divided>蚵仔煎</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="courseno"
      label="课程号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="coursename"
      label="课程名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="stuno"
      label="学号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="stuname"
      label="学生姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="dailyscore"
      label="平时成绩"
      width="120">
    </el-table-column>
    <el-table-column
      prop="dailyscore"
      label="期末成绩"
      width="120">
    </el-table-column>
		<el-table-column
			prop="totalscore"
			label="总评"
			width="120">
		</el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <router-link class="btn btn-primary" v-bind:to="'/edit/'+tableData.courseno+tableData.stuno">
        	编辑
        </router-link>
      </template>
    </el-table-column>
  </el-table>
	</el-card>
</template>

<script>
  export default {
		name:'tableData',
		 data() {
      return {
        tableData: []
      }
    },
    methods: {
			fetchTabledata(){
				this.$http.get("http://localhost:3000/tableData").then(function(response){this.tableData = response.body})
			}
    },
    
			created(){
				this.fetchTabledata();
		}
   
  }
</script>