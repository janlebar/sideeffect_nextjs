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
      console.log('Klic useEffect');
      // Pripravi graf ob prvem renderiranju in ob spremembi podatkov
      buildChart();
      
      // Počisti graf ob odstranitvi komponente
      return () => {
        console.log('Klic funkcije za čiščenje');
        destroyChart();
      };
    }, [data]);
  
    //This condition ensures that the chart is built only if the canvas element is available.
    const buildChart = () => {
      if (chartRef.current) {
        const myChartRef = chartRef.current.getContext('2d');
        
        // Uniči obstoječi graf, če obstaja
        if (chart) {
          destroyChart();
        }
        
        const categories = new Set(data.map((data) => data.category));
        const categoryData = {};
  
        // Izračunaj podatke za posamezno kategorijo
        categories.forEach((category) => {
          categoryData[category] = { occurrence: 0, datasets: [] };
        });
  
        data.forEach((data) => {
          const category = data.category;
          const occurrence = data.occurrence;
  
          if (categoryData[category]) {
            categoryData[category].occurrence += occurrence;
          } else {
            categoryData[category] = { occurrence, datasets: [] };
          }
  
          categoryData[category].datasets.push({
            label: `Podatkovni niz ${data.CattegoryId}`,
            data: [occurrence],
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            borderWidth: 1,
          });
        });
  
        const datasets = [];
  
        // Zgradi nize podatkov za graf
        Object.keys(categoryData).forEach((category) => {
          const { occurrence, datasets: categoryDatasets } = categoryData[category];
  
          datasets.push({
            label: `Kategorija ${category}`,
            data: [occurrence],
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            borderWidth: 1,
            stack: category,
            categoryDatasets,
          });
        });
  
        // Ustvari graf
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
      // Uniči obstoječi graf
      if (chart) {
        chart.destroy();
        chart = null;
      }
    };
  
    return <canvas ref={chartRef}></canvas>;
  }
  
  export default RadarChart;
  