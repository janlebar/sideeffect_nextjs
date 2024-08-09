// "use client"

// // Import necessary modules
// import { useState } from 'react';

// const AddMedicine = ({ onAddMedicine }) => {
//   const [inputValue, setInputValue] = useState('');

//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleAddMedicine = (event) => {
//     event.preventDefault();
//     onAddMedicine(inputValue);
//     setInputValue('');
//   };

//   return (
//     <div>
//       <p>Form</p>
//       <form onSubmit={handleAddMedicine}>
//         <label>
//           Input Value:
//           <input type="text" value={inputValue} onChange={handleChange} />
//         </label>
//         <button type="submit">Add medicine</button>
//       </form>
//     </div>
//   );
// };

// const RemoveMedicine = ({ medicine, onRemoveMedicine }) => {
//   const handleRemoveMedicine = () => {
//     onRemoveMedicine(medicine);
//   };

//   return (
//     <button onClick={handleRemoveMedicine}>Remove</button>
//   );
// };

// const Listofmedicines = () => {
  
//   const [medicines, setMedicines] = useState([]);

//   const handleAddMedicine = (medicine) => {
//     setMedicines((oldMedicines) => [...oldMedicines, medicine]);
//   };

//   const handleRemoveMedicine = (medicineToRemove) => {
//     setMedicines((oldMedicines) =>
//       oldMedicines.filter(medicine => medicine !== medicineToRemove)
//     );
//   };





//   return (
//     <div>
//       <AddMedicine onAddMedicine={handleAddMedicine} />
//       <div>
//         <h3>Medicines List</h3>
//         <ul>
//           {medicines.map((medicine, index) => (
//             <li key={index}>
//               {medicine} 
//               <RemoveMedicine 
//                 medicine={medicine} 
//                 onRemoveMedicine={handleRemoveMedicine} 
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// // Export the App component as the default export
// export default Listofmedicines;



// const handleScrape = async (urlList) => {
//   try {
//     const response = await fetch('/api/scrape', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ urls: urlList }),
//     });

//     const scrapedData = await response.json();
//     setData((prevData) => [...prevData, ...scrapedData]); // Add all scraped data to the state
//   } catch (error) {
//     console.error('Failed to scrape the list of URLs:', error);
//   }
// };


// Import necessary modules
import { useState } from 'react';

const AddMedicine = ({ onAddMedicine }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddMedicine = (event) => {
    event.preventDefault();
    onAddMedicine(inputValue);
    setInputValue(''); // Clear the input field after adding the medicine
  };

  return (
    <div>
      <p>Form</p>
      <form onSubmit={handleAddMedicine}>
        <label>
          Input Value:
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <button type="submit">Add medicine</button>
      </form>
    </div>
  );
};

const RemoveMedicine = ({ medicine, onRemoveMedicine }) => {
  const handleRemoveMedicine = () => {
    onRemoveMedicine(medicine);
  };

  return (
    <button onClick={handleRemoveMedicine}>Remove</button>
  );
};

const Listofmedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [scrapedData, setScrapedData] = useState([]);

  const handleAddMedicine = (medicine) => {
    setMedicines((oldMedicines) => [...oldMedicines, medicine]);
  };

  const handleRemoveMedicine = (medicineToRemove) => {
    setMedicines((oldMedicines) =>
      oldMedicines.filter((medicine) => medicine !== medicineToRemove)
    );
  };

  const handleScrape = async (urlList) => {
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: urlList }),
      });

      const scrapedData = await response.json();
      setScrapedData((prevData) => [...prevData, ...scrapedData]); // Add all scraped data to the state
    } catch (error) {
      console.error('Failed to scrape the list of URLs:', error);
    }
  };

  const handleScrapeClick = () => {
    if (medicines.length > 0) {
      handleScrape(medicines); // Call handleScrape with the list of medicines
      console.log(scrapedData);
    } else {
      console.log('No medicines to scrape');
    }
  };

  return (
    <div>
      <AddMedicine onAddMedicine={handleAddMedicine} />
      <div>
        <h3>Medicines List</h3>
        <ul>
          {medicines.map((medicine, index) => (
            <li key={index}>
              {medicine}
              <RemoveMedicine
                medicine={medicine}
                onRemoveMedicine={handleRemoveMedicine}
              />
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleScrapeClick}>Scrape</button> {/* Scrape button */}
      {scrapedData.length > 0 && (
        <div>
          <h3>Scraped Data</h3>
          {/* Display scraped data */}
          <pre>{JSON.stringify(scrapedData, null, 2)}</pre> 
        </div>
      )}
    </div>
  );
};


// Export the App component as the default export
export default Listofmedicines;
