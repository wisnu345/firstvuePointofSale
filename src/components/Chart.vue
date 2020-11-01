<template>
  <div>
    <div class="col">
      <canvas id="my-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      bar: null,
      dataChart: [],
      chartLabel: []
    }
  },
  methods: {
    renderChart () {
      this.bar = new Chart(document.getElementById('my-chart'), {
        type: 'line',
        data: {
          labels: this.chartLabel,
          datasets: [
            {
              label: 'This Month',
              fill: false,
              borderColor: '#00F1FF',
              data: this.dataChart
            }
          ]
        },
        options: {
          legend: {
            display: true,
            position: 'bottom'
          },
          scales: {
            xAxes: [{
              display: false
            }]
          },
          elements: {
            line: {
              tension: 0
            }
          }
        }
      })
    },
    ...mapActions({
      gethistory: 'history/getHistory'
    })
  },
  mounted () {
    this.gethistory().then((response) => {
    //   console.log(this.history)
      this.history.map(e => {
        this.dataChart.push(e.amount)
        this.chartLabel.push(e.date)
      })
      this.renderChart()
    })
  },
  computed: {
    ...mapGetters({
      history: 'history/getHistory'
    })
  }
}
</script>
