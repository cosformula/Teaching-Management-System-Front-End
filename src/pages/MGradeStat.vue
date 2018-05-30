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
    <div class="charts" align="center">
      <div id="myChart" :style="{width: '500px', height: '500px'}"></div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value4: ''
    }
  },
  mounted() {
    this.drawLine()
  },

  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: { text: '绩点走势' },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: ['3.7-4.0', '3.3-3.7', '3.0-3.3', '2.0-3.0', '1.0-2.0']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '3.7-4.0' },
              { value: 1530, name: '3.3-3.7' },
              { value: 234, name: '3.0-3.3' },
              { value: 135, name: '2.0-3.0' },
              { value: 210, name: '1.0-2.0' }
            ]
          }
        ]
      })
    }
  }
}
</script>
