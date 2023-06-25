import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getRandomColor } from './chart-color-scheme';

function RadarChart({ data }) {
  const chartRef = useRef(null);
  let chart = null;

  // useEffect(() => {
  //   buildChart();
  //   return () => {
  //     destroyChart();
  //   };
  // }, [data]);


  useEffect(() => {
    // This useEffect hook is used to run code when the component mounts or when the 'data' prop changes
    console.log('useEffect called');
    buildChart2();
    
    return () => {
      // Cleanup function called when the component unmounts or when the 'data' prop changes
      console.log('Cleanup function called');
      destroyChart();
    };
  }, [data]);

  const buildChart2 = () => {
    if (!chartRef.current) return;
    if (chart) {
      destroyChart();
    }

    const myChartRef = chartRef.current.getContext('2d');

    const groupByMedicine = {};
    for (const entry of data) {
      if (!(entry.medicine in groupByMedicine)) {
        groupByMedicine[entry.medicine] = [];
      }

      groupByMedicine[entry.medicine].push(entry);
    }

    console.log(data);

    const categories = new Set(data.map((data) => data.category));

    const datasets = [];
    for (const [medicineName, symptoms] of Object.entries(groupByMedicine)) {
      const occurrences = {};
      for (const category of categories) {
        if (category in occurrences) continue;
        const symptom = symptoms.find((symptom) => symptom.category == category);

        occurrences[category] = symptom.occurrence;
      }

      datasets.push({
        label: `Dataset ${medicineName}`,
        data: Object.values(occurrences),
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1,
      });
    }

    console.log(datasets);

    chart = new Chart(myChartRef, {
      type: 'radar',
      data: {
        labels: Array.from(categories),
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
  };


  const buildChart = () => {
    if (chartRef.current) {
      const myChartRef = chartRef.current.getContext('2d');
      if (chart) {
        destroyChart();
      }
      console.log(data);
      const categories = new Set(data.map((data) => data.category));
      const categoryData = {};

      // Initialize categoryData object with category as keys
      categories.forEach((category) => {
        categoryData[category] = { occurrence: 0, datasets: [] };
      });

      // Calculate total occurrence for each category and create datasets
      data.forEach((data) => {
        const category = data.category;
        const occurrence = data.occurrence;

        if (categoryData[category]) {
          // Category already exists, add the occurrence to the existing value
          categoryData[category].occurrence += occurrence;
        } else {
          // Category does not exist, create a new entry
          categoryData[category] = { occurrence, datasets: [] };
        }

        categoryData[category].datasets.push({
          label: `Dataset ${data.CattegoryId}`,
          data: [occurrence],
          backgroundColor: getRandomColor(),
          borderColor: getRandomColor(),
          borderWidth: 1,
        });
      });

      const datasets = [];

      // Combine occurrence for each category and create stacked dataset
      Object.keys(categoryData).forEach((category) => {
        const { occurrence, datasets: categoryDatasets } = categoryData[category];

        datasets.push({
          label: `Category ${category}`,
          data: [occurrence],
          backgroundColor: getRandomColor(),
          borderColor: getRandomColor(),
          borderWidth: 1,
          stack: category, // Assign the category as the stack to stack datasets together
          categoryDatasets, // Store individual datasets for later reference
        });
      });

      console.log(categories, datasets)

      chart = new Chart(myChartRef, {
        type: 'radar',
        data: {
          labels: Array.from(categories),
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