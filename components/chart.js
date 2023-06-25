import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getRandomColor } from './chart-color-scheme';

function RadarChart({ data }) {
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













    
    const groupByMedicine = {}; // Objekt za združevanje podatkov po zdravilu
    for (const entry of data) {
      if (!(entry.medicine in groupByMedicine)) {
        groupByMedicine[entry.medicine] = [];
      }

      groupByMedicine[entry.medicine].push(entry);
    }

    // assigns it a new Set object. The Set object is created by applying the map() method on the data array.
    const categories = new Set(data.map((data) => data.category)); // Množica unikatnih kategorij v podatkih

    const datasets = [];
    for (const [medicineName, symptoms] of Object.entries(groupByMedicine)) {
      const occurrences = {}; // Objekt za shranjevanje pojavnosti vsake kategorije
      for (const category of categories) {
        if (category in occurrences) continue; // Preskoči, če kategorija že obstaja v objektu occurrences
        const symptom = symptoms.find((symptom) => symptom.category === category);

        occurrences[category] = symptom ? symptom.occurrence : 0; // Nastavi vrednost pojavnosti, 
        //če simptom obstaja, sicer nastavi na 0
      }

      datasets.push({
        label: `Niz podatkov ${medicineName}`,
        //to spodi samo iz objekta pretvori v arej
        data: Object.values(occurrences),
        backgroundColor: getRandomColor(0.2), // Dobi naključno barvo za ozadje podatkovnega niza
        borderColor: getRandomColor(0.2), // Dobi naključno barvo za obrobo podatkovnega niza
        borderWidth: 1,
      });
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
