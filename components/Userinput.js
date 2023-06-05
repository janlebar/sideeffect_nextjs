import React, { useState } from 'react';
import Form from './Form';
import RadarChart from './chart';

function UserInput(args) {
  const [data, setData] = useState([]);
  const [hasError, setError] = useState(false);
  const [urlInputs, setUrlInputs] = useState(['']);

  // Function to handle fetching data from an API endpoint and updating the component state
  const handleScrape = async (urlInput) => {
    try {
      const response = await fetch(`/api/scrape?url=https://www.drugs.com/sfx/${urlInput}-side-effects.html`);
      if (!response.ok) {
        setError(true);
        return;
      }
      const scrapedData = await response.json();
      setData((oldData) => [...oldData, scrapedData]);
      setError(false);
      args.onData(scrapedData);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  // Function to handle form submission and trigger data fetching
  const handleSubmit = (event, index) => {
    event.preventDefault();
    handleScrape(urlInputs[index]);
  };

  // Function to handle input changes in the form
  const handleChange = (event, index) => {
    const newUrlInputs = [...urlInputs];
    newUrlInputs[index] = event.target.value;
    setUrlInputs(newUrlInputs);
  };

  // Function to add additional input fields for URLs
  const handleAddInput = () => {
    setUrlInputs((prevInputs) => [...prevInputs, '']);
  };

  if (hasError) {
    return <a>Fetch Error</a>;
  }

  return (
    <div>
      {/* Render form inputs */}
      {urlInputs.map((urlInput, index) => (
        <Form
          key={index}
          urlInput={urlInput}
          onSubmit={(event) => handleSubmit(event, index)}
          onChange={(event) => handleChange(event, index)}
        />
      ))}
      {/* Button to add additional input fields */}
      <button onClick={handleAddInput}>Add Input</button>
      {/* Render the RadarChart component */}
      <RadarChart data={data} />
    </div>
  );
}

export default UserInput;
