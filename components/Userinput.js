"use client"

// Import necessary modules
import { useState } from 'react';

const AddMedicine = ({ onAddMedicine }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddMedicine = (event) => {
    event.preventDefault();
    onAddMedicine(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <p>Form</p>
      <form onSubmit={handleAddMedicine}>
        <label>
          Input Value:
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <button type="submit">Add medicine</button>
      </form>
    </div>
  );
};

const RemoveMedicine = ({ medicine, onRemoveMedicine }) => {
  const handleRemoveMedicine = () => {
    onRemoveMedicine(medicine);
  };

  return (
    <button onClick={handleRemoveMedicine}>Remove</button>
  );
};

const Listofmedicines = () => {
  const [medicines, setMedicines] = useState([]);

  const handleAddMedicine = (medicine) => {
    setMedicines((oldMedicines) => [...oldMedicines, medicine]);
  };

  const handleRemoveMedicine = (medicineToRemove) => {
    setMedicines((oldMedicines) =>
      oldMedicines.filter(medicine => medicine !== medicineToRemove)
    );
  };

  return (
    <div>
      <AddMedicine onAddMedicine={handleAddMedicine} />
      <div>
        <h3>Medicines List</h3>
        <ul>
          {medicines.map((medicine, index) => (
            <li key={index}>
              {medicine} 
              <RemoveMedicine 
                medicine={medicine} 
                onRemoveMedicine={handleRemoveMedicine} 
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Export the App component as the default export
export default Listofmedicines;
