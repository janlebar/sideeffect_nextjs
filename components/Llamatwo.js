import { useState } from 'react';
const Lamafunction = ({followingInput}) => {
  const [responseText, setResponseText] = useState('');

  const fetchData = async () => {
    try {
      console.log(followingInput + " " + "TLE");
      const response = await fetch('https://a2c93c98c9d0c56157ac8377-ollama.x-truder.net/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama2',
          prompt: `What sydefects could be problematic using these madicines ${followingInput} at the same time?`,
          stream: false
        }),
      });

      const data = await response.json();
      const text = data["response"];

      // Extract text between "response" and "done"
      //    const responseData = JSON.stringify(data, null, 2);
      //const startIndex = responseData.indexOf('"response"') + '"response"'.length;
      //const endIndex = responseData.indexOf('"done"');
      //const truncatedResponseText = responseData.substring(startIndex, endIndex);
      
      setResponseText(text.trim()); // Set trimmed response text
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

export default Lamafunction;

