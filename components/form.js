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

function Form() {
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

export default Form;
