

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getRandomColor } from './chart-color-scheme';

function PieChart({ data }) {
  const chartRef = useRef(null);
  let chart = null;

  useEffect(() => {
    buildChart();
    return () => {
      destroyChart();
    };
  }, [data]);

  const buildChart = () => {
    if (!chartRef.current) return;
    const myChartRef = chartRef.current.getContext('2d');

    if (chart) {
      destroyChart();
    }
    
    const categories = new Set();
    for (const symptoms of data) {
      for (const symptom of symptoms) {
        categories.add(symptom.category);
      }
    }
    
    const datasets = [];
    for (const symptoms of data) {
      const medicineName = symptoms[0].medicine;

      const occurrences = {};
      for (const symptom of symptoms) {
        for (const category of categories) {
          if (category in occurrences) continue;
          const symptom = symptoms.find((symptom) => symptom.category === category);

          if (symptom) {
            occurrences[category] = symptom.occurrence;
          } else {
            occurrences[category] = 0;
          }
        }
      }
      
      datasets.push({
        label: `Niz podatkov ${medicineName}`,
        data: Object.values(occurrences),
        backgroundColor: Array.from(categories).map(() => getRandomColor(0.2)),
        borderColor: Array.from(categories).map(() => getRandomColor(0.2)),
        borderWidth: 1,
      });
    }
    
    chart = new Chart(myChartRef, {
      type: 'pie',
      data: {
        labels: Array.from(categories),
        datasets: datasets,
      },
    });
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
