import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RadarChartTwo = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];
    const data = [3, 5, 2, 7]; // Example data values for the labels

    const ctx = chartRef.current.getContext('2d');

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Dataset',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
          },
        ],
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 10,
          },
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default RadarChartTwo;