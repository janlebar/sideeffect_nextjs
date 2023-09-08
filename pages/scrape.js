import React, { useState } from 'react';
import Userinput from '../components/Userinput';
import MainNavigation from '../components/layout/MainNavigation';
import RadarChart from '../components/chart';
import PieChart from '../components/piechart';
import Card from "../components/ui/Card";
// import FormAi from "../components/FormAi"

const color = [
  'rgba(0, 204, 255, 1)',   // Aqua Blue
  'rgba(226, 252, 214, 1)', // Light Green
  'rgba(20, 150, 127, 1)',  // Teal
  'rgba(9, 93, 126, 1)',    // Dark Blue
  'rgba(204, 236, 238, 1)', // Light Blue
  'rgba(241, 249, 255, 1)', // Pale Blue
  'rgba(255, 255, 0, 1)',   // Yellow
  'rgba(255, 102, 102, 1)', // Coral
  'rgba(255, 153, 0, 1)',   // Orange
  'rgba(255, 204, 204, 1)', // Light Pink
  'rgba(255, 51, 51, 1)',   // Red
  'rgba(153, 153, 255, 1)', // Lavender
  'rgba(204, 153, 255, 1)', // Purple
  'rgba(102, 204, 255, 1)', // Sky Blue
  'rgba(255, 0, 255, 1)',   // Magenta
  'rgba(0, 0, 255, 1)',     // Blue
  'rgba(0, 128, 128, 1)'    // Teal Green
];

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
          <RadarChart data={data} color={color}/>
        )}
      </Card>
      <Card>
        {!ifempty(data) ? (
          <PieChart data={data} color={color}/>
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