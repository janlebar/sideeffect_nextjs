import { useState } from 'react'

export default function MyComponent() {
  const [data, setData] = useState(null)

  const handleScrape = async () => {
    const response = await fetch('/api/scrape?url=https://www.drugs.com/aspirin.html#side-effects')
    const scrapedData = await response.json()
    setData(scrapedData)
  }

  return (
    <div>
      <button onClick={handleScrape}>Scrape Data</button>
      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      )}
    </div>
  )
}