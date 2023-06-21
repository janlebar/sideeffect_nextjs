import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { getRandomColor } from './chart-color-scheme';

const RadarChartTwo = () => {

      const chartRef = useRef(null);
      const chartInstanceRef = useRef(null);
    
      useEffect(() => {
        const config = {
          type: 'radar',
          data: {
            labels: [
              'Eating',
              'Drinking',
              'Sleeping',
              'Designing',
              'Coding',
              'Cycling',
              'Running'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [65, 59, 90, 81, 56, 55, 40],
              fill: true,
              backgroundColor: getRandomColor(0.2),
              borderColor: getRandomColor(0.2),
              pointBackgroundColor: getRandomColor(),
              pointBorderColor: getRandomColor(),
              pointHoverBackgroundColor:  getRandomColor(),
              pointHoverBorderColor:  getRandomColor(),
            }, {
              label: 'My Second Dataset',
              data: [28, 48, 40, 19, 96, 27, 100],
              fill: true,
              backgroundColor: getRandomColor(0.2),
              borderColor: getRandomColor(0.2),
              pointBackgroundColor: getRandomColor(),
              pointBorderColor:  getRandomColor(),
              pointHoverBackgroundColor:  getRandomColor(),
              pointHoverBorderColor:  getRandomColor(),
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            }
          }
        };
    
        const ctx = chartRef.current.getContext('2d');
    
        // Destroy the existing chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
    
        // Create a new chart instance
        chartInstanceRef.current = new Chart(ctx, config);
    
        // Clean up the chart instance when the component unmounts
        return () => {
          if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
            chartInstanceRef.current = null;
          }
        };
      }, []);
    
      return <canvas ref={chartRef} />;
    };

    

export default RadarChartTwo;