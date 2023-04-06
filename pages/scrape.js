// import { useState } from 'react'

// export default function MyComponent() {
//   const [data, setData] = useState(null)
//   const [urlInput, setUrlInput] = useState('')

//   const handleScrape = async () => {
//     const response = await fetch(`/api/scrape?url=https://www.drugs.com/${urlInput}#side-effects`)
//     const scrapedData = await response.json()
//     setData(scrapedData)
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     handleScrape()
//   }

//   const handleChange = (event) => {
//     setUrlInput(event.target.value)
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Enter drug name:
//           <input type="text" value={urlInput} onChange={handleChange} />
//         </label>
//         <button type="submit">Scrape Data</button>
//       </form>
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
  const [data, setData] = useState([])
  const [urlInputs, setUrlInputs] = useState([''])

  const handleScrape = async (urlInput) => {
    const response = await fetch(`/api/scrape?url=https://www.drugs.com/${urlInput}#side-effects`)
    const scrapedData = await response.json()
    setData((prevData) => [...prevData, scrapedData])
  }

  const handleSubmit = (event, index) => {
    event.preventDefault()
    handleScrape(urlInputs[index])
  }

  const handleChange = (event, index) => {
    const newUrlInputs = [...urlInputs]
    newUrlInputs[index] = event.target.value
    setUrlInputs(newUrlInputs)
  }

  const handleAddInput = () => {
    setUrlInputs((prevInputs) => [...prevInputs, ''])
  }

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event, 0)}>
        <label>
          Enter drug name:
          <input type="text" value={urlInputs[0]} onChange={(event) => handleChange(event, 0)} />
        </label>
        <button type="submit">Scrape Data</button>
      </form>
      {data[0] && (
        <div>
          <h2>{data[0].title}</h2>
          <p>{data[0].description}</p>
        </div>
      )}
      {urlInputs.slice(1).map((urlInput, index) => (
        <form key={index} onSubmit={(event) => handleSubmit(event, index + 1)}>
          <label>
            Enter drug name:
            <input type="text" value={urlInput} onChange={(event) => handleChange(event, index + 1)} />
          </label>
          <button type="submit">Scrape Data</button>
        </form>
      ))}
      <button onClick={handleAddInput}>Add Input</button>
      {data.slice(1).map((scrapedData, index) => (
        <div key={index}>
          <h2>{scrapedData.title}</h2>
          <p>{scrapedData.description}</p>
        </div>
      ))}
    </div>
  )
}
