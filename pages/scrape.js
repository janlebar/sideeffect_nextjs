import React, { useState } from 'react';
import Userinput from '../components/Userinput';
import MainNavigation from '../components/layout/MainNavigation';
import RadarChart from '../components/chart';
import PieChart from '../components/piechart';
import Card from "../components/ui/Card";
// import FormAi from "../components/FormAi"

export default function MyComponent() {
  const [data, setData] = useState();

  function onData(data) {
    setData(data);
  }


  function ifempty(data) {
    return !data || data.length === 0; // Check if data is undefined or has length 0
  }


  return (
    <div>
      <MainNavigation />
      <Userinput onData={onData}  />
      <Card>
        {ifempty(data) ? (
          <p>No data available for RadarChart</p>
        ) : (
          <RadarChart data={data} />
        )}
      </Card>
      <Card>
        {!ifempty(data) ? (
          <PieChart data={data} />
        ) : (
          <p>No data available for RadarChart</p>
        )}
      </Card>
      {/* <Card>
      <FormAi/>
      </Card> */}
    </div>

  );
}