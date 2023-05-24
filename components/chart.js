import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function RadarChart({ data }) {
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
    
    const labels = data.map(item => item.category);
    const chartData = data.map(item => item.occurrence);
    const backgroundColors = data.map(item => 'rgba(255, 99, 132, 0.2)');
    const borderColors = data.map(item => 'rgba(255, 99, 132, 1)');
    
    chart = new Chart(myChartRef, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Dataset 1',
          data: chartData,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
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

  return (
    <canvas ref={chartRef} />
  );
}

export default RadarChart;
