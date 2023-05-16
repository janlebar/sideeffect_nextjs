import React from 'react';

function Buttons() {
  return (
    <div className="card bg-white p-4 shadow-md rounded-md"> 
      <div className="flex justify-end">
        <button className="btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md" type="button">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Buttons;