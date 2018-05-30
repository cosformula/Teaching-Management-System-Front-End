

<template>

  <div class="charts" align="center">
    <div id="myChart" :style="{width: '500px', height: '500px'}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      terms: [],
      points: []
    }
  },
  mounted() {
    // this.drawLine()
  },
  created() {
    this.$http.get(`/api/students/${this.$user.id}/trends`).then(resp => {
      this.terms = resp.data.terms
      this.points = resp.data.points
      this.drawLine()
    })
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: { text: '绩点走势' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.terms
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.points,
            type: 'line'
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
</style>
