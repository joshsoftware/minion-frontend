// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require('chartist')

const loadAverageChart = {
  data: {
    labels: ['1 minute', '5 minutes', '15 minutes'],
    series: [[1, 1, 1]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 50,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }
}

module.exports = {
  loadAverageChart
}
