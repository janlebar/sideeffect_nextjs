import React from 'react';
import Buttons from './Buttons';

function Form({ urlInput, onSubmit, onChange }) {
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
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md" type="submit">
        Scrape Data
      </button>
      <Buttons />
    </form>
  );
}

export default Form;
