import React, { useState } from 'react';

const ClinicalTextClassification = () => {
  const [clinicalText, setClinicalText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    //   const res = await fetch('/api/your-api-endpoint', {
      const res = await fetch('http://localhost:3000/api/apiAi', {
        method: 'POST',
        body: JSON.stringify({ clinicalText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

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
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Clinical Text Classification</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
            className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Loading...' : 'Classify Text'}
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