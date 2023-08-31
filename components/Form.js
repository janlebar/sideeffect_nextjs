import React from 'react';

function Form({ urlInput, onSubmit, onChange, onClearData }) {
  return (
    <form className="bg-white p-6 shadow-md rounded-md" onSubmit={onSubmit}>
      <label className="block mb-4">
        Enter drug name:
        <input
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          type="text"
          value={urlInput}
          onChange={onChange}
        />
      </label>
      <button className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md" type="submit">
        Look for side effect
      </button>
      <button className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-md ml-4" onClick={() => onClearData(urlInput)}>
        Clear Data
      </button>
    </form>
  );
}

export default Form;

