export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  


//   import React, { useState, useEffect} from 'react';

// export const getRandomColor = () => {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

// const ExportedColor = () => {
//   const [exportedColor, setExportedColor] = useState(null);

//   useEffect(() => {
//     const color = getRandomColor();
//     setExportedColor(color);
//   }, []);

//   return exportedColor; // Return the generated color here
// };

// export default ExportedColor;
