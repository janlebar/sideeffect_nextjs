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

    console.log(data);

    // {"kategorija1": [simptom1, simptom2], "kategoriaj2": [simptom1, simptom2]}
    const symptomsByMedicine = Object.groupBy(data, ({ url }) => url);
    const categories = new Set(data.map(({ category }) => category));

    //gradis DATASET
  
    let i = 0;
    const datasets = [];
    for (const [medicine, symptoms] of Object.entries(symptomsByMedicine)) {
      const occurrences = [];

      for (const category of categories) {
        const symptomForCategory = symptoms.find((symptom) => symptom.category === category);

        if (symptomForCategory) {
          occurrences.push(symptomForCategory.occurrence);
        } else {
          occurrences.push(0);
        }
      }

      datasets.push({
        label: `All sidefects for ${medicine}`,
        data: occurrences,
        backgroundColor: color[i % color.length], // Use the color based on the index (i) and the length of the colors array
        borderColor: color[i % color.length], // Use the same color for the border
        borderWidth: 1,
      });
  
      i++;
    }


    chart = new Chart(myChartRef, {
      type: 'radar',
      data: {
        labels: [...categories], // Pretvori množico kategorij v polje za oznake na grafikonu
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
