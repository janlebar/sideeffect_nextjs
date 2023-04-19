// import React, { useState } from 'react';

// export default function Form({ handleScrape, onAddInput }) {
//   const [urlInput, setUrlInput] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     handleScrape(urlInput);
//   };

//   const handleChange = (event) => {
//     setUrlInput(event.target.value);
//   };

//   const handleAddInput = () => {
//     onAddInput(urlInput);
//     setUrlInput('');
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Enter drug name:
//           <input type="text" value={urlInput} onChange={handleChange} />
//         </label>
//         <button type="submit">Scrape Data</button>
//       </form>
//       <button onClick={handleAddInput}>Add Input</button>
//     </div>
//   );
// }

import { useState } from 'react';

function Userinput() {
  const [data, setData] = useState([]);
  const [urlInputs, setUrlInputs] = useState(['']);

  const handleScrape = async (urlInput) => {
    const response = await fetch(`/api/scrape?url=https://www.drugs.com/sfx/${urlInput}-side-effects.html`);
    const scrapedData = await response.json();
    setData((prevData) => [...prevData, scrapedData]);
  };

  const handleSubmit = (event, index) => {
    event.preventDefault();
    handleScrape(urlInputs[index]);
  };

  const handleChange = (event, index) => {
    const newUrlInputs = [...urlInputs];
    newUrlInputs[index] = event.target.value;
    setUrlInputs(newUrlInputs);
  };

  const handleAddInput = () => {
    setUrlInputs((prevInputs) => [...prevInputs, '']);
  };

  return (
    <div>
      {urlInputs.map((urlInput, index) => (
        <form key={index} onSubmit={(event) => handleSubmit(event, index)}>
          <label>
            Enter drug name:
            <input type="text" value={urlInput} onChange={(event) => handleChange(event, index)} />
          </label>
          <button type="submit">Scrape Data</button>
        </form>
      ))}
      <button onClick={handleAddInput}>Add Input</button>
      {data.map((scrapedData, index) => (
        <div key={index}>
          <h2>{scrapedData.title}</h2>
          <p>{scrapedData.description}</p>
          <div dangerouslySetInnerHTML={{ __html: scrapedData.html }}></div>
        </div>
      ))}
    </div>
  );
}

export default Userinput;

// // Uvozimo useState hook iz knjižnice React
// import { useState } from 'react';

// // Definiramo komponento Form
// function Form() {

//   // Inicializiramo dve stanji (data in urlInputs) z uporabo hook useState
//   const [data, setData] = useState([]);
//   const [urlInputs, setUrlInputs] = useState(['']);

//   // Definiramo pomožno funkcijo, handleScrape, ki pridobi podatke iz določenega URL-ja
//   const handleScrape = async (urlInput) => {
//     // Naredimo klic API-ja na določeni URL in počakamo na odgovor
//     const response = await fetch(`/api/scrape?url=https://www.drugs.com/sfx/${urlInput}-side-effects.html`);
//     // Pretvorimo podatke odgovora v obliko JSON
//     const scrapedData = await response.json();
//     // Dodamo pridobljene podatke v stanje data z uporabo funkcije setData
//     setData((prevData) => [...prevData, scrapedData]);
//   };

//   // Definiramo pomožno funkcijo, handleSubmit, za obdelavo dogodka oddaje obrazca
//   const handleSubmit = (event, index) => {
//     // Preprečimo privzeto vedenje oddaje obrazca
//     event.preventDefault();
//     // Kličemo funkcijo handleScrape z imenom zdravila na določenem indeksu v polju urlInputs
//     handleScrape(urlInputs[index]);
//   };

//   // Definiramo pomožno funkcijo, handleChange, za obdelavo sprememb v vhodnih poljih
//   const handleChange = (event, index) => {
//     // Ustvarimo kopijo polja urlInputs z uporabo operatorja širjenja
//     const newUrlInputs = [...urlInputs];
//     // Posodobimo vrednost na določenem indeksu z vrednostjo iz dogodka cilja
//     newUrlInputs[index] = event.target.value;
//     // Posodobimo stanje urlInputs s tem novim poljem z uporabo funkcije setUrlInputs
//     setUrlInputs(newUrlInputs);
//   };

//   // Definiramo pomožno funkcijo, handleAddInput, za dodajanje dodatnega vhodnega polja
//   const handleAddInput = () => {
//     // Dodamo prazen niz na konec polja urlInputs z uporabo funkcije setUrlInputs
//     setUrlInputs((prevInputs) => [...prevInputs, '']);
//   };

//   // Return a JSX block that includes the input fields and scraped data
//   return (
//     <div>
//       {/* Map over the urlInputs array and create a form for each input */}
//       {urlInputs.map((urlInput, index) => (
//         <form key={index} onSubmit={(event) => handleSubmit(event, index)}>
//           <label>
//             Enter drug name:
//             {/* Create an input field for the drug name and add an event listener for changes */}
//             <input type="text" value={urlInput} onChange={(event) => handleChange(event, index)} />
//           </label>
//           {/* Create a button to trigger the form submission */}
//           <button type="submit">Scrape Data</button>
//         </form>
//       ))}
//       {/* Create a button to add another input field */}
//       <button onClick={handleAddInput}>Add Input</button>
//       {/* Map over the data array and display the scraped data */}
//       {data.map((scrapedData, index) => (
//         <div key={index}>
//           <h2>{scrapedData.title}</h2>
//           <p>{scrapedData.description}</p>
//           {/* Display the HTML data using the dangerouslySetInnerHTML attribute */}
//           <div dangerouslySetInnerHTML={{ __html: scrapedData.html }}></div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Export the Form component as the default export
// export default Form;