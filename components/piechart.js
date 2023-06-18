import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getRandomColor } from './chart-color-scheme';

function PieChart({ data }) { // Accept 'data' as a prop
  const chartRef = useRef(null);
  let chart = null;

  useEffect(() => {
    buildChart();
    return () => {
      destroyChart();
    };
  }, [data]); // Trigger useEffect when 'data' prop changes

  const buildChart = () => {
    if (chartRef.current) {
      const myChartRef = chartRef.current.getContext('2d');
      if (chart) {
        destroyChart();
      }

      // Initialize arrays for labels and datasets
      const labels = [];
      const datasets = [];

      // Populate labels and datasets arrays
      data.forEach((data) => {
        labels.push(`Dataset ${data.CattegoryId}`);
        datasets.push({
          data: [data.occurrence],
          backgroundColor: getRandomColor(),
          borderColor: getRandomColor(),
          borderWidth: 1,
        });
      });

      // Create a new Pie chart
      chart = new Chart(myChartRef, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: datasets.map((dataset) => dataset.data[0]),
              backgroundColor: datasets.map((dataset) => dataset.backgroundColor),
              borderColor: datasets.map((dataset) => dataset.borderColor),
              borderWidth: datasets.map((dataset) => dataset.borderWidth),
            },
          ],
        },
        options: {},
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

export default PieChart;
