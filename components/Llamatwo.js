import { useState } from 'react';


const Lamafunction = ({followingInput}) => {
  const [responseText, setResponseText] = useState('');

  const fetchData = async () => {
    try {
      const apiKey = process.env.API_KEY; // Accessing the API key from environment variables
      // const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

      console.log(followingInput + " " + "TLE");
      const response = await fetch("/api/lama", { // Use the API key in the fetch URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followingInput: followingInput,
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
      <button className='bg-white hover:bg-white-100 text-blue-400 hover:text-blue-500 font-bold py-2 px-4 rounded-md ml-5 mt-1 mr-10 border border-red-300' onClick={fetchData}>Check medicine combination with AI</button>
      <div>
        <textarea value={responseText} readOnly rows={10} cols={50} />
      </div>
    </div>
  );
};

export default Lamafunction;

