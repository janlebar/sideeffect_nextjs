
// import React, { useState } from 'react';
// import Userinput from '../components/Userinput';
// // import './styles/scrape.css';
// // import styles from './styles/scrape.module.css';


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


// Importing React and useState hook from React library and Userinput component from components folder
import React, { useState } from 'react';
import Userinput from '../components/Userinput';
import MainNavi

// Component function declaration
export default function MyComponent() {
  // Initializing state variables using useState hook
  const [inputs, setInputs] = useState(['']);
  //const [html, setHtml] = useState('');

  // Function to handle adding input URL
  const handleAddInput = (urlInput) => {
    // Updating the state of the component with the new input URL
    setInputs((prevInputs) => [...prevInputs, urlInput]);
  };

  // Rendering the component
  return (
    <div>
      {/* Mapping over input URLs to render Userinput component for each */}
      {inputs.map((urlInput, index) => (
        <Userinput key={index} onAddInput={handleAddInput} />
      ))}
    </div>
  );
}
