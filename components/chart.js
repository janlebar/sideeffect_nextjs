import React from 'react';
import ChartJS from 'chart.js/auto';

class RadarChart extends React.Component {
  chartRef = React.createRef();
  chart = null;

  componentDidMount() {
    this.buildChart();
  }

  buildChart() {
    const myChartRef = this.chartRef.current.getContext('2d');
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new ChartJS(myChartRef, {
      type: 'radar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [{
          label: 'Dataset 1',
          data: [3, 5, 2, 6, 7],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          r: {
            ticks: {
              beginAtZero: true,
              max: 10
            }
          }
        }
      }
    });
  }

  render() {
    return (
      <canvas ref={this.chartRef} />
    );
  }
}

export default RadarChart;
