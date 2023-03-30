import React, { useState } from 'react';
import { useRouter } from 'next/router';

function PrescriptionForm() {
    const [prescriptionOne, setPrescriptionOne] = useState('');
    const [prescriptionTwo, setPrescriptionTwo] = useState('');
  
    const router = useRouter();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // submit the form data to the server or perform some other action
      router.push(`/prescriptions/${prescriptionOne}/${prescriptionTwo}`);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="prescriptionOne">Prescription One:</label>
        <input
          type="text"
          id="prescriptionOne"
          value={prescriptionOne}
          onChange={(e) => setPrescriptionOne(e.target.value)}
        />
  
        <label htmlFor="prescriptionTwo">Prescription Two:</label>
        <input
          type="text"
          id="prescriptionTwo"
          value={prescriptionTwo}
          onChange={(e) => setPrescriptionTwo(e.target.value)}
        />
  
        <button type="submit">Submit</button>
      </form>
    );
  }
  
  export default PrescriptionForm;
  