import React from 'react';
import Buttons from './Buttons';

function Form({ urlInput, onSubmit, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Enter drug name:
        <input type="text" value={urlInput} onChange={onChange} />
      </label>
      <button type="submit">Scrape Data</button>
      <Buttons/>
    </form>
  );
}

export default Form;