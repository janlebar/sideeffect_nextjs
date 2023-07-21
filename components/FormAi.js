// import React, { useState } from 'react';

// function FormAi({ handleSubmit, handleInputChange }) {
//   const [clinicalText, setClinicalText] = useState(""); // Define the clinicalText state variable

//   const handleInputChange = (event) => {
//     setClinicalText(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Implement the code to send the clinical text to the backend
//     // for processing with ClinicalBERT and receive the predictions.
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           rows="5"
//           cols="50"
//           value={clinicalText}
//           onChange={handleInputChange}
//         />
//         <button type="submit">Get Prediction</button>
//       </form>
//       <div>
//         <h2>Prediction:</h2>
//         <p>{prediction}</p>
//       </div>
//     </div>
//   );
// };

// export default FormAi;