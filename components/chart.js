import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function RadarChart(props) {
  const chartRef = useRef();
  let chart = null;

  useEffect(() => {
    buildChart();
    return () => {
      destroyChart();
    };
  }, []);

  const buildChart = () => {
    const myChartRef = chartRef.current.getContext('2d');
    if (chart) {
      destroyChart();
    }
    chart = new Chart(myChartRef, {
      type: 'radar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [{
          label: 'Dataset 1',
          data: [props.data],
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
  };

  const destroyChart = () => {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  };

  return <canvas ref={chartRef} />;
}

export default RadarChart;
