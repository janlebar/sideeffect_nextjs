import React, { useState, useEffect } from 'react';
import Form from './Form';
// import RadarChart from './chart';

function UserInput(args) {
  // State for scraped data
  let [data, setData] = useState([]);

  // State for error handling
  const [hasError, setError] = useState(false);
 // LAMA PART   // console.log(args.krneki);
  const [urlInputs, setUrlInputs] = useState(['']);

  // useEffect to trigger onData function when data changes
  useEffect(() => {
    console.log(data + "userinput")
    args.onData(data);
  }, [data]);

 // LAMA PART 
  useEffect(() => {
    args.onUrlInputsChanged(urlInputs);
  }, [urlInputs]);

  // Function to handle clearing data for a specific URL input
  const handleClearData = (urlInputMedicine) => {
    try {
      setData((data) => data.filter(sideEffects => !sideEffects.find(sideEffect => sideEffect.medicine === urlInputMedicine)));
      setUrlInputs(urlInputs => urlInputs.filter(urlInput => urlInput !== urlInputMedicine));
    } catch (error) {
      setError(true);
      console.error('ERROR TLE');
    }
  };

  // Function to handle fetching data from an API endpoint
  const handleScrape = async (urlInput) => {
    try {
      const response = await fetch(`/api/scrape?url=https://www.drugs.com/sfx/${urlInput}-side-effects.html`);
      if (!response.ok) {
        setError(true);
        return;
      }

      const scrapedData = await response.json();
      for (const data of scrapedData) {
        data.medicine = urlInput.toString();
      }
      
      setData((oldData) => [...oldData, scrapedData]);
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  // Function to handle form submission
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

  // Render error message if there's an error
  if (hasError) {
    return <a>Fetch Error</a>;
  }

  // Render the component
  return (
    <div>
      {/* Render form inputs */}
      {urlInputs.map((urlInput, index) => (
        <Form
          key={index}
          urlInput={urlInput}
          onSubmit={(event) => handleSubmit(event, index)}
          onChange={(event) => handleChange(event, index)}
          onClearData={handleClearData}
        />
      ))}
      {/* Button to add additional input fields */}
      <button className="bg-white hover:bg-white-100 text-blue-400 hover:text-blue-500 font-bold py-2 px-4 rounded-md ml-14 mt-1 mr-10 border border-red-300" onClick={handleAddInput}>Add Medicine</button>
    </div>
  );
}

export default UserInput;
