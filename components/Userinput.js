import React, { useState, useEffect } from 'react';
import Form from './Form';
// import RadarChart from './chart';

function UserInput(args) {
  let [data, setData] = useState([]);
  const [hasError, setError] = useState(false);
  const [urlInputs, setUrlInputs] = useState(['']);

  console.log(urlInputs + " " + "tuki");

  // When data changes call args.onData with new list of medicines
  useEffect(() => {
    // if (data.length == 0) return; napaka za data set data

    console.log("scraped data", data);

    args.onData(data);
  }, [data]);



  //delete button
  const handleClearData = (urlInputMedicine) => {
    debugger
    try {
      setData((data) => data.filter(sideEffects => !sideEffects.find(sideEffect => sideEffect.medicine == urlInputMedicine)));
      setUrlInputs(urlInputs => urlInputs.filter(urlInput => urlInput != urlInputMedicine));
    } catch (error) {
      setError(true);
      console.error('ERROR TLE');
      // Code to handle the exception, if needed
    }
  };


  
  // Function to handle fetching data from an API endpoint and updating the component state
  const handleScrape = async (urlInput) => {
    try {
      const response = await fetch(`/api/scrape?url=https://www.drugs.com/sfx/${urlInput}-side-effects.html`);
      if (!response.ok) {
        setError(true);
        return;
      }

      // tuki je output za json za izpis in za CHART KOMPONENTO samo prej //radar set data v scrape.js
      const scrapedData = await response.json();

      // data za medicine name
      for (const data of scrapedData) {
        data.medicine = urlInput.toString();
      }
      
   // appenda nove skrejpane simptome na list obstojecih skrejpanih simptomov
      setData((oldData) => [...oldData, scrapedData]);
      setError(false);
    } 
    catch (error) {
      setError(true);
      console.error(error);
    }
  };



  // isto k prej
  // Function to handle form submission for a given URL input and trigger data fetching
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

     // // THIS IS HOW MAKE A NEW LAYER TO CHART CAN BE MADE
    // const handleAddInput = () => {
    //   setUrlInputs((prevInputs) => [...prevInputs, '']);
    // };

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
  onClearData={handleClearData}
/>
      ))}
      {/* Button to add additional input fields */}
      <button className="bg-white hover:bg-white-100 text-blue-400 hover:text-blue-500 font-bold py-2 px-4 rounded-md ml-14 mt-1 mr-10 border border-red-300" onClick={handleAddInput}>Add Medicine</button>
      
      {/* Render the RadarChart component */}
      {/* <RadarChart data={data} /> */}







            {/* Če hočeš izpisat v rendru data: Map over the scraped data to render each set of data */}
            {/* {data.map((sideEffects, index) => (
        <div key={index}> */}
          {/* Map over each side effect data */}
          {/* {sideEffects.map((scrapedData, index) => (
            <div key={index}>
              <h2>{scrapedData.category}</h2>
              <b>{scrapedData.occurrence} ({scrapedData.from} to {scrapedData.to})</b>
              <br/> */}
              {/* Render symptoms if they exist */}
              {/* {scrapedData.symptoms && <b>{scrapedData.symptoms.join(", ")}</b>} */}
  
              {/* Render scraped HTML content (commented out) */}
              {/* <div dangerouslySetInnerHTML={{ __html: scrapedData.content }}></div> */}
            {/* </div>
          ))}
        </div> */}
      {/* ))} */}

      





    </div>
  );
}

export default UserInput;
