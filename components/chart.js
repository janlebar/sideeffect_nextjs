import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


function RadarChart({ data, color }) {
  const chartRef = useRef(null); // Sklic na element platna (canvas)
  let chart = null; // Sklic na primer grafikona

  // useEffect(() => {
  //   buildChart();
  //   return () => {
  //     destroyChart();
  //   };
  // }, [data]);

  useEffect(() => {
    console.log('Klic useEffect');
    buildChart(); // Kličemo funkcijo buildChart, ko se komponenta inicializira ali 
    //ko se spremeni prop 'data'

    return () => {
      console.log('Klic funkcije za čiščenje');
      destroyChart(); // Kličemo funkcijo destroyChart, ko se komponenta odstrani ali 
      //ko se spremeni prop 'data'
    };

    
  }, [data]);







  const buildChart = () => {
    if (!chartRef.current) return; // Prekini, če referenca chartRef ni na voljo (platno ni izrisano)
    const myChartRef = chartRef.current.getContext('2d'); // Pridobi 2D kontekst platna


    // Uniči obstoječi grafikon, če že obstaja
    if (chart) {
      destroyChart(); 
    }
    
    //HERE FIRST DATA COMES IN
    // Create a set of categories
    const categories = new Set(); // Množica unikatnih kategorij v podatkih
    for (const symptoms of data) {
      for (const symptom of symptoms) {
        categories.add(symptom.category);
      }
    }
    // NAJPREJ PRAZEN AREJ KI GA NAFILAS
    const datasets = [];



    //gradis DATASET
  
    let i = 0;

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
    
      console.log(medicineName);
    
      datasets.push({
        label: `Niz podatkov ${medicineName}`,
        data: Object.values(occurrences),
        backgroundColor: color[i % color.length], // Use the color based on the index (i) and the length of the colors array
        borderColor: color[i % color.length], // Use the same color for the border
        borderWidth: 1,
      });
    
      i++;
    }
    





    chart = new Chart(myChartRef, {
      type: 'radar',
      data: {
        labels: Array.from(categories), // Pretvori množico kategorij v polje za oznake na grafikonu
        datasets: datasets, // Dodeli sestavljene podatkovne nize grafikonu
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
      chart.destroy(); // Uniči obstoječi primer grafikona
      chart = null;
    }
  };

  return <canvas ref={chartRef}></canvas>; // Izriši element platna in dodeli mu chartRef kot referenco
}

export default RadarChart;
