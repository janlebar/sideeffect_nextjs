
// import { useState } from 'react'

// export default function MyComponent() {
//   const [data, setData] = useState([])
//   const [urlInputs, setUrlInputs] = useState([''])
//   const [html, setHtml] = useState('')

//   const handleScrape = async (urlInput) => {
//     const response = await fetch(`/api/scrape?url=https://www.drugs.com/${urlInput}#side-effects`)
//     const scrapedData = await response.json()
//     setData((prevData) => [...prevData, scrapedData])
//     setHtml(scrapedData.html)
//   }

//   const handleSubmit = (event, index) => {
//     event.preventDefault()
//     handleScrape(urlInputs[index])
//   }

//   const handleChange = (event, index) => {
//     const newUrlInputs = [...urlInputs]
//     newUrlInputs[index] = event.target.value
//     setUrlInputs(newUrlInputs)
//   }

//   const handleAddInput = () => {
//     setUrlInputs((prevInputs) => [...prevInputs, ''])
//   }

//   return (
//     <div>
//       <form onSubmit={(event) => handleSubmit(event, 0)}>
//         <label>
//           Enter drug name:
//           <input type="text" value={urlInputs[0]} onChange={(event) => handleChange(event, 0)} />
//         </label>
//         <button type="submit">Scrape Data</button>
//       </form>
//       {data[0] && (
//         <div>
//           <h2>{data[0].title}</h2>
//           <p>{data[0].description}</p>
//           <div dangerouslySetInnerHTML={{ __html: html }}></div>
//         </div>
//       )}
//       {urlInputs.slice(1).map((urlInput, index) => (
//         <form key={index} onSubmit={(event) => handleSubmit(event, index + 1)}>
//           <label>
//             Enter drug name:
//             <input type="text" value={urlInput} onChange={(event) => handleChange(event, index + 1)} />
//           </label>
//           <button type="submit">Scrape Data</button>
//         </form>
//       ))}
//       <button onClick={handleAddInput}>Add Input</button>
//       {data.slice(1).map((scrapedData, index) => (
//         <div key={index}>
//           <h2>{scrapedData.title}</h2>
//           <p>{scrapedData.description}</p>
//           <div dangerouslySetInnerHTML={{ __html: scrapedData.html }}></div>
//         </div>
//       ))}
//     </div>
//   )
// }




// import React, { useState } from 'react';
// import Userinput from '../components/Userinput';

// export default function MyComponent() {
//   const [inputs, setInputs] = useState(['']);
//   const [data, setData] = useState([]);
//   const [html, setHtml] = useState('');

//   const handleScrape = async (urlInput) => {
//     const response = await fetch(`/api/scrape?url=https://www.drugs.com/${urlInput}#side-effects`);
//     const scrapedData = await response.json();
//     setData((prevData) => [...prevData, scrapedData]);
//     setHtml(scrapedData.html);
//   };

//   const handleAddInput = (urlInput) => {
//     setInputs((prevInputs) => [...prevInputs, urlInput]);
//   };

//   return (
//     <div>
//       {inputs.map((urlInput, index) => (
//         <Userinput key={index} handleScrape={handleScrape} onAddInput={handleAddInput} />
//       ))}
//       {data.map((scrapedData, index) => (
//         <div key={index}>
//           {scrapedData && (
//             <>
//               <h2>{scrapedData.title}</h2>
//               <p>{scrapedData.description}</p>
//               <div dangerouslySetInnerHTML={{ __html: scrapedData.html }}></div>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useState } from 'react';
import Userinput from '../components/Userinput';

export default function MyComponent() {
  // Definiramo spremenljivke stanja z uporabo hooka useState
  const [inputs, setInputs] = useState(['']); // seznam vnosa
  const [data, setData] = useState([]); // seznam pridobljenih podatkov
  const [html, setHtml] = useState(''); // niz HTML

  // Definiramo asinhrono funkcijo, ki obdela pridobivanje podatkov iz URL-ja
  const handleScrape = async (urlInput) => {
    // Opravimo GET zahtevo na API končno točko na strežniku
    const response = await fetch(`/api/scrape?url=https://www.drugs.com/${urlInput}#side-effects`);
    // Razčlenimo JSON odgovor, da pridobimo podatke
    const scrapedData = await response.json();
    // Posodobimo seznam pridobljenih podatkov z dodajanjem novega pridobljenega podatka
    setData((prevData) => [...prevData, scrapedData]);
    // Posodobimo niz HTML z uporabo HTML lastnosti pridobljenih podatkov
    setHtml(scrapedData.html);
  };

  // Definiramo funkcijo, ki obdela dodajanje novega vnosa
  const handleAddInput = (urlInput) => {
    // Posodobimo seznam vnosov z dodajanjem novega vnosa
    setInputs((prevInputs) => [...prevInputs, urlInput]);
  };

  // Renderiramo JSX komponento
  return (
    <div>
      {inputs.map((urlInput, index) => (
        // Renderiramo komponento Userinput za vsak vnos, ki sprejme funkciji handleScrape in handleAddInput kot propse
        <Userinput key={index} handleScrape={handleScrape} onAddInput={handleAddInput} />
      ))}
      {data.map((scrapedData, index) => (
        // Renderiramo pridobljene podatke za vsak URL v seznamu data
        <div key={index}>
          {scrapedData && (
            <>
              <h2>{scrapedData.title}</h2>
              <p>{scrapedData.description}</p>
              {/* Renderiramo niz HTML pridobljenih podatkov z uporabo propa dangerouslySetInnerHTML */}
              <div dangerouslySetInnerHTML={{ __html: scrapedData.html }}></div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}