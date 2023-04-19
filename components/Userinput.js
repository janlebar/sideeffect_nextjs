import React, { useState } from 'react';
import Form from './Form';

function UserInput() {
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
        <Form
          key={index}
          urlInput={urlInput}
          onSubmit={(event) => handleSubmit(event, index)}
          onChange={(event) => handleChange(event, index)}
        />
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

export default UserInput;