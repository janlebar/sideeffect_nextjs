// Importing React and useState hook from React library and Userinput component from components folder
import React, { useState } from 'react';
import Userinput from '../components/Userinput';
import MainNavigation from '../components/layout/MainNavigation';

// Component function declaration
export default function MyComponent() {
  

  // Rendering the component
  return (

    <div>
          <MainNavigation />
        <Userinput />
    </div>
  );
}


