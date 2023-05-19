import React, { useState } from 'react';
import Form from './Form';

function UserInput(args) {

  // Set up state variables for the scraped data and the URL inputs
  let [data, setData] = useState([]);
  const [hasError, setError] = useState(false);
  const [urlInputs, setUrlInputs] = useState(['']);

  // Function to handle scraping data from a given URL input
  const handleScrape = async (urlInput) => {
    const response = await fetch(`/api/scrape?url=https://www.drugs.com/sfx/${urlInput}-side-effects.html`);
    if (!response.ok) {
      setError(true);
      return;
    }

    // tuki je output za json za izpis in za CHART KOMPONENTO samo prej //radar set data v scrape.js
    const scrapedData = await response.json();

    // appenda nove skrejpane simptome na list obstojecih skrejpanih simptomov
    setData(oldData => [...oldData, scrapedData]);
    setError(false);

    args.onData(scrapedData);
  };

  // Function to handle form submission for a given URL input
  const handleSubmit = (event, index) => {
    event.preventDefault();
    handleScrape(urlInputs[index]);
  };

  // Function to handle changes to the URL input field
  const handleChange = (event, index) => {
    const newUrlInputs = [...urlInputs];
    newUrlInputs[index] = event.target.value;
    setUrlInputs(newUrlInputs);
  };

  // Function to add a new URL input field
  const handleAddInput = () => {
    setUrlInputs((prevInputs) => [...prevInputs, '']);
  };

  if (hasError) {
    return <a>Fetch Error</a>;
  }

  return (
    <div>
      {/* Map over the URL inputs to render a Form component for each */}
      {urlInputs.map((urlInput, index) => (
        <Form
          key={index}
          urlInput={urlInput}
          onSubmit={(event) => handleSubmit(event, index)}
          onChange={(event) => handleChange(event, index)}
        />
      ))}
      {/* Button to add a new URL input field */}
      <button onClick={handleAddInput}>Add Input</button>
      {/* Map over the scraped data to render each set of data */}
      {data.map((sideEffects, index) =>
        <div key={index}>
          {sideEffects.map((scrapedData, index) => (
            <div key={index}>
              <h2>{scrapedData.category}</h2>
              <b>{scrapedData.occurance} ({scrapedData.from} to {scrapedData.to})</b>
              <br/>
              <b>{scrapedData.symptoms.join(", ")}</b>
              {/* Use dangerouslySetInnerHTML to render the scraped HTML */}
              {/*<div dangerouslySetInnerHTML={{ __html: scrapedData.content }}></div>*/}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserInput;


