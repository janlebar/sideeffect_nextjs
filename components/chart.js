import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


function RadarChart({ data, getRandomColor }) {
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
    for (const symptoms of data) { // Iterate over each scraped medicine
      const medicineName = symptoms[0].medicine;//VZAMEVA PRVI SIMPTOM IN ZA NJEM IME (0=PRVI)

      //OCCURENCES 
      // We create occurences for each category
      const occurrences = {}; // Objekt za shranjevanje pojavnosti vsake kategorije
      for (const symptom of symptoms) { // Iterate over each symptom for medicine

        //POGLEDAVA CE ZE OSTAJAJO KLJUCI TOREJ occurrences V OBJEKTU Z VSEMI SIDEEFFECTA ZA VSE
        for (const category of categories) {
          //POGLEDAVA CE ZE OSTAJAJO KLJUCI TOREJ occurrences V OBJEKTU Z VSEMI SIDEEFFECTA
          if (category in occurrences) continue; // Preskoči, če kategorija že obstaja v objektu occurrences
          const symptom = symptoms.find((symptom) => symptom.category === category);
  
          if (symptom) {
            occurrences[category] = symptom.occurrence;
          } else {
            occurrences[category] = 0;
          }
          //occurrences[category] = symptom ? symptom.occurrence : 0; // Nastavi vrednost pojavnosti, 
          //če simptom obstaja, sicer nastavi na 0
        }
      }



      
      
      console.log(medicineName);

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
