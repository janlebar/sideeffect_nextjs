import React, { useState } from 'react';

const ClinicalTextClassification = () => {
  const [clinicalText, setClinicalText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://a2c93c98c9d0c56157ac8377-ollama.x-truder.net/api/generate', {
        method: 'POST',
        body: JSON.stringify({ question: "What side effects could be problematic using aspirin and viagra at the same time?" }),
        headers: {
          'Content-Type': 'application/json',
        },
      });


      // curl https://a2c93c98c9d0c56157ac8377-ollama.x-truder.net/api/generate -d '{
      //   "model": "llama2",
      //   "prompt": "What sydefects could be problematic using aspirin and viagra a the same time?",     
      //   "stream": false
      // }'


      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResponse(data.response[0].label);
      // console.log(data.response);  
    } catch (error) {
      console.error(error);
      setResponse('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white hover:bg-white-100 text-blue-500 font-bold py-2 px-4 rounded-md ml mt-1 mr-10">
      <h1 className="text-2xl font-bold mb-4">AI Clinical interpretation</h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-white hover:bg-white-100 text-blue-400 font-bold py-2 px-4 rounded-md ml mt-1 mr-10">
          <label htmlFor="clinicalText" className="block font-semibold">
            Enter Clinical Text:
          </label>
          <textarea
            id="clinicalText"
            name="clinicalText"
            value={clinicalText}
            onChange={(e) => setClinicalText(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-white hover:bg-white-100 text-blue-400 hover:text-blue-500 font-bold py-2 px-4 rounded-md ml-5 mt-1 mr-10 border border-red-300  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Loading...' : 'Analise'}
          </button>
        </div>
      </form>
      {response && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Result:</h2>
          <pre className="mt-2 bg-gray-200 p-2 rounded">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default ClinicalTextClassification;