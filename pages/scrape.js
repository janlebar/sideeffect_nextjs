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