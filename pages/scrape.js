// import { useState } from 'react'

// export default function MyComponent() {
//   const [data, setData] = useState(null)

//   const handleScrape = async () => {
//     const response = await fetch('/api/scrape?url=https://www.drugs.com/aspirin.html#side-effects')
//     const scrapedData = await response.json()
//     setData(scrapedData)
//   }

//   return (
//     <div>
//       <button onClick={handleScrape}>Scrape Data</button>
//       {data && (
//         <div>
//           <h2>{data.title}</h2>
//           <p>{data.description}</p>
//         </div>
//       )}
//     </div>
//   )
// }

// import { useState } from 'react';

// export default function MyComponent() {
//   const [html, setHtml] = useState('');

//   const handleScrape = async () => {
//     const response = await fetch('/api/scrape?url=https://www.drugs.com/aspirin.html#side-effects');
//     const scrapedData = await response.text();
//     setHtml(scrapedData);
//   };

//   return (
//     <div>
//       <button onClick={handleScrape}>Scrape Data</button>
//       {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { useRouter } from 'next/router';

// function PrescriptionForm() {
//   const [prescriptionOne, setPrescriptionOne] = useState('');
//   const [prescriptionTwo, setPrescriptionTwo] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = `https://www.drugs.com/${prescriptionOne}-${prescriptionTwo}.html`;
//     const response = await fetch(`/api/scrape?url=${url}`);
//     const scrapedData = await response.text();
//     // submit the form data to the server or perform some other action
//     router.push(`/prescriptions/${prescriptionOne}/${prescriptionTwo}`);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="prescriptionOne">Prescription One:</label>
//       <input
//         type="text"
//         id="prescriptionOne"
//         value={prescriptionOne}
//         onChange={(e) => setPrescriptionOne(e.target.value)}
//       />

//       <label htmlFor="prescriptionTwo">Prescription Two:</label>
//       <input
//         type="text"
//         id="prescriptionTwo"
//         value={prescriptionTwo}
//         onChange={(e) => setPrescriptionTwo(e.target.value)}
//       />

//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default PrescriptionForm;

// import React, { useState } from 'react';
// import { useRouter } from 'next/router';

// function PrescriptionForm() {
//   const [prescriptionOne, setPrescriptionOne] = useState('');

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = `https://www.drugs.com/${prescriptionOne}.html`;
//     const response = await fetch(`/api/scrape?url=${url}`);
//     const scrapedData = await response.text();
//     // submit the form data to the server or perform some other action
//     router.push(`/prescriptions/${prescriptionOne}`);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="prescriptionOne">Prescription One:</label>
//       <input
//         type="text"
//         id="prescriptionOne"
//         value={prescriptionOne}
//         onChange={(e) => setPrescriptionOne(e.target.value)}
//       />

//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default PrescriptionForm;

import { useState } from 'react'

export default function MyComponent() {
  const [data, setData] = useState(null)
  const [urlInput, setUrlInput] = useState('aspirin.html')

  const handleScrape = async () => {
    const response = await fetch(`/api/scrape?url=https://www.drugs.com/${urlInput}#side-effects`)
    const scrapedData = await response.json()
    setData(scrapedData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleScrape()
  }

  const handleChange = (event) => {
    setUrlInput(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter drug name:
          <input type="text" value={urlInput} onChange={handleChange} />
        </label>
        <button type="submit">Scrape Data</button>
      </form>
      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      )}
    </div>
  )
}