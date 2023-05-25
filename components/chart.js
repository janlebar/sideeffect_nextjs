import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DUMMY_DATA = [
  {
    id: 'm1',
    category: 'Dyspepsia',
    occurrence: '10',
  },
  {
    id: 'm2',
    category: 'Increased bleeding tendencies',
    occurrence: '10',
  },
];

function RadarChart() {
  const chartRef = useRef();
  let chart = null;

  useEffect(() => {
    buildChart();
    return () => {
      destroyChart();
    };
  }, []);

  console.log(DUMMY_DATA);

  const buildChart = () => {
    const myChartRef = chartRef.current.getContext('2d');
    if (chart) {
      destroyChart();
    }
    chart = new Chart(myChartRef, {
      type: 'radar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [3, 5, 2, 6, 7],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
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

  const destroyChart = () => {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  };

  return (
    <section>
      <ul>
        {DUMMY_DATA.map((sideEffect) => (
          <React.Fragment key={sideEffect.id}>
            <li>{sideEffect.category}</li>
            <li>{sideEffect.occurrence}</li>
          </React.Fragment>
        ))}
      </ul>
      <canvas ref={chartRef} />
    </section>
  );
}

export default RadarChart;
