// Importing React and useState hook from React library and Userinput component from components folder
import React, { useState } from 'react';
import Userinput from '../components/Userinput';
import MainNavigation from '../components/layout/MainNavigation';
import RadarChart from '../components/chart';

// Component function declaration
export default function MyComponent() {

  const [data, setData] = useState();
//chart set data
  function onData(data) {
    setData(data);
  }
  

  // Rendering the component
  return (

    <div>
          <MainNavigation />
          {/* Tle pokliče funkcijo iz userinput if fetch json in seta v FUNKCIJO:function onData(data) {
    setData(data); iz tu gre set data v radar chart KOMPONENTO: <RadarChart data={data}/>*/}
        <Userinput onData={onData} />
        <RadarChart data={data}/>
    </div>
  );
}


