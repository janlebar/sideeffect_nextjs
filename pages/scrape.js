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

import { useState } from 'react';

export default function MyComponent() {
  const [html, setHtml] = useState('');

  const handleScrape = async () => {
    const response = await fetch('/api/scrape?url=https://www.drugs.com/aspirin.html#side-effects');
    const scrapedData = await response.text();
    setHtml(scrapedData);
  };

  return (
    <div>
      <button onClick={handleScrape}>Scrape Data</button>
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
}
