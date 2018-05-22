

<template>

          <div class="charts" align="center">
           <div id="myChart" :style="{width: '500px', height: '500px'}"></div>
          </div>
</template>

<script>

  export default {
	mounted(){
    this.drawLine();
  },
 methods: {
    drawLine(){
		let myChart = this.$echarts.init(document.getElementById('myChart'))
       myChart.setOption({
            title: { text: '绩点走势' },
           tooltip: {},
          xAxis: {
        type: 'category',
        data: ['大一秋季', '大一冬季', '大一春季', '大二秋季', '大二冬季', '大二春季']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [3.5, 3.6, 3.8, 3.5, 3.3, 3.2],
        type: 'line'
    }]
          

        })
      }

    }
   



  }

</script>

<style scoped>

</style>
