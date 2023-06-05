import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getRandomColor } from './chart-color-scheme';

function RadarChart({ data }) {
  const chartRef = useRef(null);
  let chart = null;

  // useEffect is used to run code when the component mounts or when the 'data' prop changes
  useEffect(() => {
    buildChart();
    return () => {
      destroyChart();
    };
  }, [data]);

  // This function builds the RadarChart using Chart.js library
  const buildChart = () => {
    if (chartRef.current) {
      const myChartRef = chartRef.current.getContext('2d');
      if (chart) {
        destroyChart();
      }

      // Process the data and create datasets for the chart
      const categories = new Set(data.map((data) => data.category));
      const categoryData = {};

      categories.forEach((category) => {
        categoryData[category] = { occurrence: 0, datasets: [] };
      });

      data.forEach((data) => {
        const category = data.category;
        const occurrence = parseFloat(data.occurrence);

        if (categoryData[category]) {
          categoryData[category].occurrence += occurrence;
        } else {
          categoryData[category] = { occurrence, datasets: [] };
        }

        categoryData[category].datasets.push({
          label: `Dataset ${data.id}`,
          data: [occurrence],
          backgroundColor: getRandomColor(),
          borderColor: getRandomColor(),
          borderWidth: 1,
        });
      });

      const datasets = [];

      Object.keys(categoryData).forEach((category) => {
        const { occurrence, datasets: categoryDatasets } = categoryData[category];

        datasets.push({
          label: category,
          data: [occurrence],
          backgroundColor: getRandomColor(),
          borderColor: getRandomColor(),
          borderWidth: 1,
        });

        categoryDatasets.forEach((dataset) => {
          datasets.push(dataset);
        });
      });

      // Create the chart instance
      chart = new Chart(myChartRef, {
        type: 'radar',
        data: {
          labels: ['Occurrence'],
          datasets,
        },
        options: {
          // chart options
        },
      });
    }
  };

  // This function destroys the chart instance to prevent memory leaks
  const destroyChart = () => {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  };

  return <canvas ref={chartRef}></canvas>;
}

export default RadarChart;
