import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { DUMMY_DATA } from './Userinput'


function RadarChart() {
  const chartRef = useRef(null);
  let chart = null;

  useEffect(() => {
    buildChart();
    return () => {
      destroyChart();
    };
  }, []);

  const buildChart = () => {
    if (chartRef.current) {
      const myChartRef = chartRef.current.getContext('2d');
      if (chart) {
        destroyChart();
      }
      chart = new Chart(myChartRef, {
        type: 'radar',
        data: {
          labels: DUMMY_DATA.map(data => data.category),
          datasets: [
            {
              label: 'Dataset 1',
              data: DUMMY_DATA.map(data => data.occurrence),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            r: {
              ticks: {
                beginAtZero: true,
                max: 10,
              },
            },
          },
        },
      });
    }
  };

  const destroyChart = () => {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  };

  return (
    <canvas ref={chartRef}></canvas>
  );
}

export default RadarChart;
