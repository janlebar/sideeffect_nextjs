import { useState } from 'react';

const CurlResponse = () => {
  const [responseText, setResponseText] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://a2c93c98c9d0c56157ac8377-ollama.x-truder.net/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama2',
          prompt: 'What sydefects could be problematic using aspirin and viagra a the same time?',
          stream: false
        }),
      });

      const data = await response.json();
      // Truncate response text after encountering "done" property
      const truncatedResponseText = JSON.stringify(data, null, 2).split('"done"')[0] + '"done"';
      setResponseText(truncatedResponseText); // Set truncated response text
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button className='bg-white hover:bg-white-100 text-blue-400 hover:text-blue-500 font-bold py-2 px-4 rounded-md ml-5 mt-1 mr-10 border border-red-300' onClick={fetchData}>Fetch Data</button>
      <div>
        <textarea value={responseText} readOnly rows={10} cols={50} />
      </div>
    </div>
  );
};

export default CurlResponse;
