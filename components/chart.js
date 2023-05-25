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

      const datasets = [];

      // Generate random color for each dataset
      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

      // Add dataset for each id number
      DUMMY_DATA.forEach((data) => {
        datasets.push({
          label: `Dataset ${data.id}`,
          data: [data.occurrence], // You can modify this based on your data structure
          backgroundColor: getRandomColor(),
          borderColor: getRandomColor(),
          borderWidth: 1,
        });
      });

      chart = new Chart(myChartRef, {
        type: 'radar',
        data: {
          labels: DUMMY_DATA.map((data) => data.category),
          datasets: datasets,
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

  return <canvas ref={chartRef}></canvas>;
}

export default RadarChart;
