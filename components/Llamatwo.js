import { useState } from 'react';

const MyComponent = () => {
  const [response, setResponse] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch('https://a2c93c98c9d0c56157ac8377-ollama.x-truder.net/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama2',
          prompt: 'What sydefects could be problematic using aspirin and viagra a the same time?',
          stream: false
        })
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
