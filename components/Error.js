import React from 'react';

const CustomPrompt = ({ message, onClose }) => {
  return (
    <div className="custom-prompt">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CustomPrompt;