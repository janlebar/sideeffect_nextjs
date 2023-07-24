import React, { useState } from 'react';
import Userinput from '../components/Userinput';
import MainNavigation from '../components/layout/MainNavigation';
import RadarChart from '../components/chart';
import PieChart from '../components/piechart';
import Card from "../components/ui/Card";


// import FormAi from "../components/FormAi"
const color = [
  'rgba(255, 255, 0, 1)',       // Safety Yellow
  'rgba(255, 102, 0, 1)',       // Blaze Orange
  'rgba(50, 205, 50, 1)',       // Lime Green
  'rgba(255, 0, 0, 1)',         // Bright Red
  'rgba(255, 20, 147, 1)',      // Neon Pink
  'rgba(51, 153, 255, 1)',      // High-Visibility Blue
  'rgba(204, 255, 102, 1)',     // Fluorescent Green
  'rgba(0, 153, 204, 1)',       // Electric Blue
  'rgba(255, 102, 0, 1)',       // Traffic Cone Orange
  'rgba(255, 102, 204, 1)',     // Hi-Viz Pink
  'rgba(255, 204, 0, 1)',       // Day-Glo Yellow
  'rgba(0, 255, 0, 1)',         // Neon Green
  'rgba(255, 165, 0, 1)',       // Bright Orange
  'rgba(204, 0, 0, 1)',         // Signal Red
  'rgba(255, 102, 0, 1)',       // Caution Orange
  'rgba(204, 255, 0, 1)',       // Fluo Yellow-Green
  'rgba(204, 0, 0, 1)',         // Warning Red
  'rgba(153, 51, 255, 1)',      // Vibrant Purple
  'rgba(255, 20, 147, 1)',      // Hot Pink
  'rgba(255, 165, 0, 1)',       // Solar Flare (Bright, intense orange)
  'rgba(255, 0, 255, 1)',        // Magenta
  'rgba(255, 153, 51, 1)',       // Tangerine
  'rgba(0, 204, 102, 1)',        // Emerald Green
  'rgba(153, 0, 204, 1)',        // Electric Purple
  'rgba(204, 204, 0, 1)',        // Neon Yellow
  'rgba(102, 204, 255, 1)',      // Sky Blue
  'rgba(255, 0, 102, 1)',        // Rose Red
  'rgba(0, 102, 204, 1)',        // Cornflower Blue
  'rgba(255, 102, 102, 1)',      // Coral Pink
  'rgba(0, 204, 255, 1)',        // Aqua Blue
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