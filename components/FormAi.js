import React, { useState } from 'react';

const ClinicalTextClassification = () => {
  const [clinicalText, setClinicalText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/your-api-endpoint', {
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
      setResponse(data.response);
    } catch (error) {
      console.error(error);
      setResponse('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Clinical Text Classification</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="clinicalText">Enter Clinical Text:</label>
          <textarea
            id="clinicalText"
            name="clinicalText"
            value={clinicalText}
            onChange={(e) => setClinicalText(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Classify Text'}
          </button>
        </div>
      </form>
      {response && (
        <div>
          <h2>Classification Result:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default ClinicalTextClassification;
