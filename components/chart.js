import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { DUMMY_DATA } from './Userinput';
import { getRandomColor } from './chart-color-scheme';

function RadarChart() {
  const chartRef = useRef(null);
  let chart = null;

  useEffect(() => {
    buildChart();
    return () => {
      destroyChart();
    };
  }, []);

  console.log(DUMMY_DATA);

  const buildChart = () => {
    if (chartRef.current) {
      const myChartRef = chartRef.current.getContext('2d');
      if (chart) {
        destroyChart();
      }

      const categories = new Set(DUMMY_DATA.map((data) => data.category));
      const categoryData = {};

      // Initialize categoryData object with category as keys
      categories.forEach((category) => {
        categoryData[category] = { occurrence: 0, datasets: [] };
      });

      // Calculate total occurrence for each category and create datasets
      DUMMY_DATA.forEach((data) => {
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
          label: `Dataset ${data.id}`,
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


// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// function RadarChart(args) {
//   const chartRef = useRef();
//   let chart = null;

//   useEffect(() => {
//     buildChart();
//     return () => {
//       destroyChart();
//     };
//   }, []);

//   console.log(args.data);

//   const buildChart = () => {
//     const myChartRef = chartRef.current.getContext('2d');
//     if (chart) {
//       destroyChart();
//     }
//     chart = new Chart(myChartRef, {
//       type: 'radar',
//       data: {
//         labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
//         datasets: [{
//           label: 'Dataset 1',
//           data: [3, 5, 2, 6, 7],
//           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           r: {
//             ticks: {
//               beginAtZero: true,
//               max: 10
//             }
//           }
//         }
//       }
//     });
//   };

//   const destroyChart = () => {
//     if (chart) {
//       chart.destroy();
//       chart = null;
//     }
//   };

//   return (
//     <canvas ref={chartRef} />
//   );
// }

// export default RadarChart;
