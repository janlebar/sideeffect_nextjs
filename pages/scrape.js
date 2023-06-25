import React, { useState } from 'react';
import Userinput from '../components/Userinput';
import MainNavigation from '../components/layout/MainNavigation';
import RadarChart from '../components/chart';
import PieChart from '../components/piechart';
import RadarChartTwo from '../components/radarchart';
import Card from "../components/ui/Card";

export default function MyComponent() {
  const [data, setData] = useState();

  function onData(data) {
    setData(data);
  }

  return (
    <div>
      <MainNavigation />
      <Userinput onData={onData} />
      <Card>
        {data ? (
          <RadarChart data={data} />
        ) : (
          <p>No data available for RadarChart</p>
        )}
      </Card>
      <Card>
        {data ? (
          <PieChart data={data} />
        ) : (
          <p>No data available for RadarChart</p>
        )}
      </Card>
      <Card>
        
      <RadarChartTwo data={data?.medicineName} />
      </Card>

    </div>
  );
}