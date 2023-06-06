import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getRandomColor } from './chart-color-scheme';

function RadarChart({ data }) {
  const chartRef = useRef(null);
  let chart = null;

  // useEffect is used to run code when the component mounts or when the 'data' prop changes
  // useEffect(() => {
  //   buildChart();
  //   return () => {
  //     destroyChart();
  //   };
  // }, [data]);


  
    useEffect(() => {
      // This useEffect hook is used to run code when the component mounts or when the 'data' prop changes
      console.log('useEffect called');
      buildChart();
      
      return () => {
        // Cleanup function called when the component unmounts or when the 'data' prop changes
        console.log('Cleanup function called');
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
  
        // Initialize categoryData object with occurrence and datasets arrays for each category
        categories.forEach((category) => {
          categoryData[category] = { occurrence: 0, datasets: [] };
        });
  
        // Calculate the occurrence and create datasets for each category
        data.forEach((data) => {
          const category = data.category;
          const occurrence = parseFloat(data.occurrence);
  
          if (categoryData[category]) {
            // Add to the existing occurrence if the category already exists
            categoryData[category].occurrence += occurrence;
          } else {
            // Create a new entry in categoryData for the category
            categoryData[category] = { occurrence, datasets: [] };
          }
  
          // Create a new dataset and add it to the respective category's datasets array
          categoryData[category].datasets.push({
            label: `Dataset ${data.id}`,
            data: [occurrence],
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            borderWidth: 1,
          });
        });
  
        const datasets = [];
  
        // Convert the categoryData object into an array of datasets
        Object.keys(categoryData).forEach((category) => {
          const { occurrence, datasets: categoryDatasets } = categoryData[category];
  
          // Create a dataset for the category's overall occurrence
          datasets.push({
            label: category,
            data: [occurrence],
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            borderWidth: 1,
          });
  
          // Add all the datasets for the category
          categoryDatasets.forEach((dataset) => {
            datasets.push(dataset);
          });
        });
  
        console.log(data);
  
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
  
